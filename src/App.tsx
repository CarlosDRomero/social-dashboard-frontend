import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { cn } from "./cn";
import DashboardWrapper from "./dashboards/dashboard-wrapper";
import FacebookDashboard from "./dashboards/facebook-dashboard";

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
  const [query, setQuery] = useState("");

  const [hasSearch, setHasSearch] = useState(false)
  


  const fetchFacebookData = async (search: string) => {
    try {
      // const response = await axios.get(`/api/facebook?query=${search}`);

      const fakeData: FacebookStats = {
        mentions: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 400),
        reactions: Math.floor(Math.random() * 900),
      };

    } catch (err) {
      console.error("Error obteniendo datos:", err);
    } finally {
    }
  };

  // Manejo de búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setHasSearch(true)
    fetchFacebookData(query);
    
  };
  const handleQueryChange = (v: string) => {
    setQuery(v.toLowerCase().replaceAll(" ", ""))
  }
  return (
    <div className={cn("w-full mx-auto p-6 transition-all", {
      "h-dvh flex flex-col justify-center items-center": !hasSearch
    })}>
      {/* —————— Barra de búsqueda —————— */}
      <h1 className={cn("font-bold text-5xl text-center my-5 transition-all", {
        "text-2xl": hasSearch
      })}>Bienvenido al SocialDashBoard 🔎</h1>
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 gap-3 h-14 w-full"
      >
          <input
            type="text"
            placeholder="Escribe lo que deseas buscar..."
            value={query}
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

      {hasSearch && <>
        <FacebookDashboard search={query}/>
      </>}

      {/* —————— Dashboard —————— */}
      {!false && false && (
        <div className="space-y-12">
          <h2 className="text-2xl font-semibold text-center">
            Resultados para: <span className="text-blue-600">{query}</span>
          </h2>

          {/* ——————————————————————————
              GRÁFICO: BARRAS
          —————————————————————————— */}
          <DashboardWrapper title="Prueba" isError={false} isLoading={false} isSuccess={true}>
            <p>Pruebaaa</p>
          </DashboardWrapper>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">Estadísticas generales</h3>

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
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">
              Distribución de Interacciones
            </h3>

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
        </div>
      )}
    </div>
  );
}
