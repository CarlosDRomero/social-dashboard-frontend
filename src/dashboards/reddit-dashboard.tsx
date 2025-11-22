import { useQuery } from "react-query"
import DashboardWrapper, { type DashboardProps } from "./dashboard-wrapper"
import { fetchApi } from "../services/fetch-api"
import type { RedditData } from "../models/reddit"
import { formatNumber } from "chart.js/helpers"
import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react"
import KPIs from "./KPIs"
import { groupBy } from "./helpers"

const RedditDashboard = ({search}: DashboardProps) => {

  const [lineData, setLineData] = useState<any>(null)

  const {isSuccess, isLoading, isError ,data} = useQuery<RedditData[]>(["reddit", search],{
    queryFn: () => fetchApi("reddit", search),
    refetchOnWindowFocus: false
  })
  const stats = data?.reduce((p, c) => ({ comments: p.comments + c.comments, mentions: p.mentions + c.mentions, reactions: p.reactions + c.reactions }), {comments: 0, mentions: 0, reactions: 0})

  useEffect(()=> {
    if (isSuccess){
      const grouped = groupBy<RedditData>(data, "publishedAt", [], (date) => {
  return new Date(date).toISOString().split("T")[0];
});
    
    const labels = Object.keys(grouped).sort();
    console.log(labels.length)
    console.log(labels.map(d => grouped[d].comments))
    setLineData({
      labels,
      series:[
        {
          name: "Reacciones",
          data: labels.map(d => grouped[d].reactions),
        },
        {
          name: "Comentarios",
          data: labels.map(d => grouped[d].comments),
        },
        {
          name: "Menciones",
          data: labels.map(d => grouped[d].mentions),
          color: "red"
        }
      ]
      
      })
    }
  }, [data])


  return (
    <DashboardWrapper title="Reddit" isError = {isError} isLoading = {isLoading} isSuccess = {isSuccess}>
      {isSuccess && stats && lineData && data.length &&
        <>
          <header>
            <KPIs kpiMap={{
              "Cantidad de Posts": formatNumber(data.length, "es"),
              "Post más reciente": new Date(data[0].publishedAt).toLocaleDateString(),
              "Interacciones totales": formatNumber(data.reduce((p, c) => p + c.comments + c.mentions + c.reactions, 0), "es"),
              "Interacciones promedio": formatNumber(data.reduce((p, c) => p + c.comments + c.mentions + c.reactions, 0) / data.length, "es"),
              "Menciones totales": formatNumber(data.reduce((p, c) => p + c.mentions, 0), "es"),
              "Reacciones totales": formatNumber(data.reduce((p, c) => p + c.reactions, 0), "es"),
              "Comentarios totales": formatNumber(data.reduce((p, c) => p + c.comments, 0), "es"),
              "Menciones promedio": formatNumber(data.reduce((p, c) => p + c.mentions, 0) / data.length, "es"),
              "Reacciones promedio": formatNumber(data.reduce((p, c) => p + c.reactions, 0) / data.length, "es"),
              "Comentarios promedio": formatNumber(data.reduce((p, c) => p + c.comments, 0) / data.length, "es"),
            }}/>
          </header>
          <article className="*:my-4">
            <h3 className="font-bold text-4xl w-full">Estadísticas generales</h3>
            <div className="bg-white p-6 rounded-2xl shadow-md">

                <ReactApexChart
                  type="bar"
                  height={350}
                  series={[
                    {
                      name: "Cantidad",
                      data: [stats.mentions, stats.comments, stats.reactions],
                    },
                  ]}
                  options={{
                    chart: { id: "fb-stats" },
                    xaxis: {
                      categories: ["Menciones", "Comentarios", "Reacciones"],
                    },
                    colors: ["#2563eb"],
                  }}
                />
              </div>

              {/* ——————————————————————————
                  GRÁFICO: DONA
              —————————————————————————— */}
              <h3 className="font-bold text-4xl w-full">
                  Distribución de Interacciones
                </h3>
              <div className="bg-white p-6 rounded-2xl shadow-md">
                

                <ReactApexChart
                  type="donut"
                  height={350}
                  series={[
                    stats.mentions,
                    stats.comments,
                    stats.reactions,
                  ]}
                  options={{
                    labels: ["Menciones", "Comentarios", "Reacciones"],
                    legend: { position: "bottom" },
                  }}
                />
              </div>
              <div>
                <ReactApexChart
                
                  type = "line"
                  height={350}
                  series = {lineData.series}
                  options={{
                    labels: lineData.labels,
                    legend: { position: "bottom" },
                    stroke: {width: 2}
                  }}
                />
              </div>
          </article>
        </>
      }
      
    </DashboardWrapper>
  )
}

export default RedditDashboard