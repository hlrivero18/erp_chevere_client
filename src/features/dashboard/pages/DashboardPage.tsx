import { Calendar, DollarSign, Package, ShoppingBag } from "lucide-react"
import DashboardCard from "../components/DashboardCard"
import { useQuery } from '@tanstack/react-query';
import { getReportesGenerales } from "../api/dashboard.api";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
    const reportesGenerales = useQuery({
        queryKey: ['reportes-generales'],
        queryFn: () => getReportesGenerales(),
    })

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    const paymentMethodsData = reportesGenerales.data?.data.topMetodosPago?.map((item) => ({
        name: item.metodo,
        value: item.porcentajeDelTotal,
        totalDinero: item.totalDinero
    })) || [];

    // console.log(reportesGenerales.data)

    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Análisis de Desempeño</h1>
                    <p className="text-slate-500 text-sm mt-1">Monitorea tus métricas clave y el comportamiento de las ventas.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <DashboardCard
                    title="Ventas del Día"
                    value={reportesGenerales.data?.data.ventasDia.dinero.total}
                    sells={reportesGenerales.data?.data.ventasDia.cantidad.total}
                    porcent={reportesGenerales.data?.data.ventasDia.dinero.diferenciaPorcentaje}
                    icon={<DollarSign />}
                    color="bg-green-500/20"
                />
                <DashboardCard
                    title="Ventas de la semana"
                    value={reportesGenerales.data?.data.ventasSemana.dinero.total}
                    sells={reportesGenerales.data?.data.ventasSemana.cantidad.total}
                    porcent={reportesGenerales.data?.data.ventasSemana.dinero.diferenciaPorcentaje}
                    icon={<ShoppingBag />}
                    color="bg-blue-500/20"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* --- SECCIÓN INFERIOR: Top Productos --- */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Top Productos Más Vendidos</h3>
                            <p className="text-xs text-slate-500 mt-1">Top 5 basado en volumen de ventas mensual</p>
                        </div>
                    </div>

                    <div className="px-6 py-2">
                        {/* Asumiendo que tus datos vienen en data.topProductos */}
                        {reportesGenerales.data?.data.topProductos?.slice(0, 5).map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors px-2 rounded-lg -mx-2">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
                                        ${index === 0 ? 'bg-amber-100 text-amber-600' :
                                            index === 1 ? 'bg-slate-200 text-slate-600' :
                                                index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
                                    >
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{product.name}</h4>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">{product.cantidad} uds.</p>
                                    <p className="text-sm text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                                        <Package size={14} /> Vendidas
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Estado vacío por si aún no hay ventas */}
                        {(!reportesGenerales.data?.data.topProductos || reportesGenerales.data?.data.topProductos.length === 0) && (
                            <div className="text-center py-8 text-slate-500 text-sm">
                                Aún no hay productos vendidos en este periodo.
                            </div>
                        )}
                    </div>
                </div>


                <div className="grid grid-cols-1 gap-3">
                    <DashboardCard
                        title="Ventas del mes"
                        value={reportesGenerales.data?.data.ventasMes.dinero.total}
                        sells={reportesGenerales.data?.data.ventasMes.cantidad.total}
                        porcent={reportesGenerales.data?.data.ventasMes.dinero.diferenciaPorcentaje}
                        icon={<Calendar />}
                        color="bg-violet-500/20"
                    />
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex-1 flex flex-col">

                        <div>
                            <h3 className="font-bold text-slate-800">Medios de Pago</h3>
                            <p className="text-xs text-slate-500">Distribución mensual</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center min-h-[200px] mt-4">
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={paymentMethodsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value" // Utiliza el porcentajeDelTotal que mapeamos como 'value'
                                        nameKey="name"  // Utiliza el metodo que mapeamos como 'name'
                                        stroke="none"
                                    >
                                        {paymentMethodsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number, name: string, props: any) => {
                                            // Formatear a moneda local (Ajusta la moneda si es necesario)
                                            const dineroFormateado = new Intl.NumberFormat('es-AR', {
                                                style: 'currency',
                                                currency: 'ARS'
                                            }).format(props.payload.totalDinero);

                                            // Retorna lo que se mostrará en el tooltip: [Valor a mostrar, Etiqueta]
                                            return [`${value}% (${dineroFormateado})`, 'Proporción'];
                                        }}
                                        contentStyle={{
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                        wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>



        </main>

    )
}

export default DashboardPage