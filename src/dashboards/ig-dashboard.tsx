import { useQuery } from "react-query"
import DashboardWrapper, { type DashboardProps } from "./dashboard-wrapper"
import { fetchApi } from "../services/fetch-api"
import { formatNumber } from "chart.js/helpers"
import KPIs from "./KPIs"
import type { IgData } from "../models/ig"
import ReactApexChart from "react-apexcharts"

interface IgDashboardProps extends DashboardProps {
}

const InstagramDashboard = ({search}: IgDashboardProps) => {
  const {isSuccess, isLoading, isError,data} = useQuery<IgData[]>(["instagram", search],{
    queryFn: () => fetchApi("instagram", search),
    refetchOnWindowFocus: false
  })
  return (
    <DashboardWrapper title="Instagram" isError = {isError} isLoading = {isLoading} isSuccess = {isSuccess}>
      { data?.length &&
      <>
        <header>
        <KPIs kpiMap={{
          "Cantidad de Posts": formatNumber(data.length, "es"),
          "Likes totales": formatNumber(data.reduce((p, c) => p + c.likesCount, 0), "es"),
          "Likes promedio": formatNumber(data.reduce((p, c) => p + c.likesCount, 0) / data.length, "es"),
          "Comentarios totales": formatNumber(data.reduce((p, c) => p + (c.commentsCount || 0) ,0), "es"),
          "Comentarios totales promedio": formatNumber(data.reduce((p, c) => p + (c.commentsCount || 0), 0) / data.length, "es"),
          "Duración total": formatNumber(data.reduce((p, c) => p + (c.videoDuration || 0), 0), "es"),
          "Duración total promedio": formatNumber(data.reduce((p, c) => p + (c.videoDuration || 0), 0) / data.length, "es"),
          "# de personas que empezó el video": formatNumber(data.reduce((p, c) => p + c.videoPlayCount, 0), "es"),
          "# de personas que terminó el video": formatNumber(data.reduce((p, c) => p + c.videoViewCount, 0) / data.length, "es"),
          "Reel con más likes": formatNumber(Math.max(...data.map(p=>p.likesCount || 0)), "es"),
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
                series={data.map(post => post.likesCount || 0)}
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
              Comentarios por Post
            </h3>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <ReactApexChart
                type="bar"
                height={450}
                series={[
                  { name: "Comentarios", data: data.map(p => p.commentsCount) }
                ]}
                options={{
                  plotOptions: { bar: { horizontal: true } },
                  xaxis: { categories: data.map((_, i) => `${i+1}`) }
                }}
              />
            </div>
            <h3 className="font-bold text-4xl w-full">
              # de personas que empezaron el video
            </h3>

            <div className="bg-white p-6 rounded-2xl shadow-md">
            <ReactApexChart
              type="line"
              height={350}
              series={[
                { name: "Rating Count", data: data.map(p => p.videoPlayCount || 0) },
              ]}
              options={{
                stroke: { curve: "smooth" },
                xaxis: { categories: data.map((_, i) => i+1) }
              }}
            />
            </div>
          </article>
      </>
      }
    </DashboardWrapper>
  )
}

export default InstagramDashboard