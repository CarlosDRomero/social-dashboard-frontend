import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { cn } from "./cn";
import DashboardWrapper from "./dashboards/dashboard-wrapper";
import FacebookDashboard from "./dashboards/facebook-dashboard";
import RedditDashboard from "./dashboards/reddit-dashboard";
import TikTokDashboard from "./dashboards/tiktok-dashboard";
import InstagramDashboard from "./dashboards/ig-dashboard";

// ————————————————————————
// Tipos de datos
// ————————————————————————
interface FacebookStats {
  mentions: number;
  comments: number;
  reactions: number;
}

// ————————————————————————
// Componente Principal
// ————————————————————————

export default function App() {
  const [liveQuery, setLiveQuery] = useState("");
  const [query, setQuery] = useState("")
  const [hasSearch, setHasSearch] = useState(false)

  useEffect(()=> {
    if (!liveQuery)
      setHasSearch(false)
  }, [liveQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveQuery.trim()) return;
    setHasSearch(true)

    setQuery(liveQuery)
  };
  const handleQueryChange = (v: string) => {
    setLiveQuery(v.toLowerCase().replaceAll(" ", ""))
  }
  return (
    <div className={cn("w-full mx-auto transition-all p-0", {
      "h-dvh flex flex-col justify-center items-center": !hasSearch
    })}>
      {/* —————— Barra de búsqueda —————— */}
      <h1 className={cn("font-bold text-4xl text-center my-5 transition-all", {
        "text-2xl": hasSearch
      })}>Bienvenido al SocialDashBoard 🔎</h1>
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 gap-3 h-14 w-full"
      >
          <input
            type="text"
            placeholder="Escribe lo que deseas buscar..."
            value={liveQuery}
            minLength={3}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-2/3 px-4 py-3 text-lg border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

        <button
          type="submit"
          className="px-6 py-3 text-lg bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 active:scale-95 transition-all w-24"
          >
          Buscar
        </button>
      </form>
      
      {hasSearch &&<>
        <h2 className="text-2xl font-semibold text-center">
          Resultados para: <span className="text-blue-600">{liveQuery}</span>
        </h2>
        <FacebookDashboard search={query}/>
        <TikTokDashboard search={query} />
        <InstagramDashboard search={query} />
        <RedditDashboard search={query}/>
      </>}

      {/* —————— Dashboard —————— */}
      {!false && false && (
        <div className="space-y-12">
          

          {/* ——————————————————————————
              GRÁFICO: BARRAS
          —————————————————————————— */}
          <DashboardWrapper title="Prueba" isError={false} isLoading={false} isSuccess={true}>
            <p>Pruebaaa</p>
          </DashboardWrapper>
          
        </div>
      )}
    </div>
  );
}
