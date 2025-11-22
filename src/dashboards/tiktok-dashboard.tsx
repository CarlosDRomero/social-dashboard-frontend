import { useQuery } from "react-query"
import DashboardWrapper, { type DashboardProps } from "./dashboard-wrapper"
import { fetchApi } from "../services/fetch-api"
import { formatNumber } from "chart.js/helpers"
import KPIs from "./KPIs"
import type { TikTokData } from "../models/tiktok"
import ReactApexChart from "react-apexcharts"

interface TikTokDashboardProps extends DashboardProps {
}

const TikTokDashboard = ({search}: TikTokDashboardProps) => {
  const {isSuccess, isLoading, isError, data} = useQuery<TikTokData[]>(["tiktok", search],{
    queryFn: () => fetchApi("tiktok", search),
    refetchOnWindowFocus: false,
  })
  let engagement
  if (data) {
    console.log(data)
    engagement = data.map(d =>
                (d.digg_count || 0) +
                (d.comment_count || 0) +
                (Number(d.share_count) || 0) +
                (d.collect_count || 0));
  }
  
          
  return (
    <DashboardWrapper title="TikTok" isError = {isError} isLoading = {isLoading} isSuccess = {isSuccess}>
      { data?.length &&
        <>
          <header>
            <KPIs kpiMap={{
              "Cantidad de Posts": formatNumber(data.length, "es"),
              "TikTok con más likes": <a className="underline hover:text-blue-400" href={data.filter(max => max.digg_count === Math.max(...data.map(p=>p.digg_count || 0)))[0].url}>{formatNumber(Math.max(...data.map(p=>p.digg_count || 0)), "es")}</a>,
              "Duracion promedio": `${
                formatNumber(data.reduce((p, c) => p + (c.video_duration? c.video_duration : c.carousel_images.length * 5), 0) / data.length, "es")
              }s`,
              "Vistas": formatNumber(data.reduce((p, c) => p + c.play_count, 0), "es"),
              "Vistas promedio": formatNumber(data.reduce((p, c) => p + c.play_count, 0) / data.length, "es"),
              "Likes": formatNumber(data.reduce((p, c) => p + c.digg_count, 0), "es"),
              "Likes promedio": formatNumber(data.reduce((p, c) => p + c.digg_count, 0) / data.length, "es"),
              "Veces compartido": formatNumber(data.reduce((p, c) => p + Number(c.share_count),0), "es"),
              "Veces compartido promedio": formatNumber(data.reduce((p, c) => p + Number(c.share_count) ,0) / data.length, "es"),
              "Guardados": formatNumber(data.reduce((p, c) => p + (c.collect_count || 0), 0), "es"),
              "Guardados promedio": formatNumber(data.reduce((p, c) => p + (c.collect_count || 0), 0) / data.length, "es"),
              "Comentarios": formatNumber(data.reduce((p, c) => p + (c.comment_count || 0), 0) / data.length, "es"),
              "Comentarios promedio": formatNumber(data.reduce((p, c) => p + (c.comment_count || 0), 0) / data.length, "es"),
              }}/>
          </header>
          <article className="*:my-4">
            <h3 className="font-bold text-4xl w-full">
              Likes por Post
            </h3>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <ReactApexChart
                type="donut"
                height={350}
                series={data.map(post => post.digg_count || 0)}
                options={{
                  labels: data.map((post, index) => `${index + 1}`),
                  legend: { position: "bottom" },
                  tooltip: {
                    y: {
                      formatter: (value: number) => value.toLocaleString("es")
                    }
                  }
                }}
              />
            </div>
            <h3 className="font-bold text-4xl w-full">
              Vistas por Post
            </h3>

            <div className="bg-white p-6 rounded-2xl shadow-md">
             <ReactApexChart
                type="bar"
                height={350}
                series={[
                  {
                    name: "Vistas",
                    data: data.map((d) => d.play_count || 0),
                  },
                ]}
                options={{
                  chart: { id: "plays-chart" },
                  plotOptions: { bar: { horizontal: true } },
                  xaxis: {
                    
                    categories: data.map((_, i) => `Post ${i + 1}`),
                  },
                }}
              />
            </div>
            <h3 className="font-bold text-4xl w-full">
              Interacciones por Post
            </h3>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <ReactApexChart
                type="line"
                height={350}
                series={[
                  {
                    name: "Likes",
                    data: data.map((d) => Number(d.digg_count) || 0),
                  },
                  {
                    name: "Guardados",
                    data: data.map((d) => Number(d.collect_count) || 0),
                  },
                  {
                    name: "Compartidos",
                    data: data.map((d) => Number(d.share_count) || 0),
                  },
                  {
                    name: "Comentarios",
                    data: data.map((d) => Number(d.comment_count) || 0),
                  }
                ]}
                options={{
                  stroke: { curve: "straight" },
                  xaxis: { categories: data.map((_, i) => i+1) }
                }}
              />
            </div>
            
            {engagement && <><h3 className="font-bold text-4xl w-full">
              Engagement total
            </h3>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              {
              <ReactApexChart
                type="line"
                height={350}
                series={[
                  {
                    data: engagement,
                  },
                ]}
                options={{
                  stroke: { curve: "straight" },
                  xaxis: { categories: data.map((_, i) => i+1) }
                }}
              />}
              </div></>}
          </article>
        </>
      }
    </DashboardWrapper>
  )
}

export default TikTokDashboard