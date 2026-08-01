import { DollarSign, ShoppingBag } from "lucide-react"
import DashboardCard from "../components/DashboardCard"
import { useQuery } from '@tanstack/react-query';
import { getReportesGenerales } from "../api/dashboard.api";

const DashboardPage = () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString();
    const day = today.getDate().toString();

    const dataToday = useQuery({
        queryKey: ['reportes-generales-hoy', year, month, day],
        queryFn: () => getReportesGenerales(year, month.toString(), day.toString()),
    })

    const dataMonth = useQuery({
        queryKey: ['reportes-generales-mes', year, month],
        queryFn: () => getReportesGenerales(year, month.toString()),
    })
    
    return (
        <div className="flex-1 overflow-auto p-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <DashboardCard
                    title="Ventas del Día"
                    value={dataToday.data?.data?.totalPagado}
                    sells={dataToday.data?.data?.ventasTotales}
                    icon={<DollarSign/>}
                    color="bg-green-500/20"
                />
                <DashboardCard
                    title="Ventas del mes"
                    value={dataMonth.data?.data?.totalPagado}
                    sells={dataMonth.data?.data?.ventasTotales}
                    icon={<ShoppingBag/>}
                    color="bg-blue-500/20"
                />
                {/* <DashboardCard
                    title="Clientes Nuevos"
                    value={12}
                    icon="users"
                    color="text-purple-500"
                />
                <DashboardCard
                    title="Stock Bajo"
                    value={8}
                    icon="alert-triangle"
                    color="text-orange-500"
                /> */}
            </div>

        </div>
    )
}

export default DashboardPage