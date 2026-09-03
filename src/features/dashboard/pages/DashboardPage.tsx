import { DollarSign, ShoppingBag } from "lucide-react"
import DashboardCard from "../components/DashboardCard"
import { useQuery } from '@tanstack/react-query';
import { getReportesGenerales } from "../api/dashboard.api";

const DashboardPage = () => {
    const reportesGenerales = useQuery({
        queryKey: ['reportes-generales'],
        queryFn: () => getReportesGenerales(),
    })

    // console.log(reportesGenerales.data)
    
    return (
        <div className="flex-1 overflow-auto p-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <DashboardCard
                    title="Ventas del Día"
                    value={reportesGenerales.data?.data.ventasHoy.totalVentas}
                    sells={reportesGenerales.data?.data.ventasHoy.totalPedidos}
                    porcent={reportesGenerales.data?.data.ventasHoy.diferenciaPorcentaje}
                    icon={<DollarSign/>}
                    color="bg-green-500/20"
                />
                <DashboardCard
                    title="Ventas del mes"
                    value={reportesGenerales.data?.data.ventasMesActual.totalVentas}
                    sells={reportesGenerales.data?.data.ventasMesActual.totalPedidos}
                    porcent={reportesGenerales.data?.data.ventasMesActual.diferenciaPorcentaje}
                    icon={<ShoppingBag/>}
                    color="bg-blue-500/20"
                />

            </div>

        </div>
    )
}

export default DashboardPage