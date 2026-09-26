interface DashboardCardProps {
    title: string
    value: string | number
    icon: React.JSX.Element
    color?: string,
    sells?: string | number
    porcent?:number
}

const DashboardCard = ({ title, value, icon, color, sells, porcent }: DashboardCardProps) => {
    
    let periodoAnterior = "";

    switch(title){
        case "Ventas del Día":
            periodoAnterior = "ayer";
            break;
        case "Ventas de la semana":
            periodoAnterior = "la semana anterior";
            break;
        case "Ventas del mes":
            periodoAnterior = "el mes anterior";
            break;
    };    
    
    return (
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-2 relative overflow-hidden group">
            <div className={`absolute right-0 top-0 w-24 h-24 ${color} rounded-bl-full`} />
            <div className="flex items-center justify-between">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
                {icon}
            </div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {sells} Ventas totales
                {porcent !== undefined && 
                <span className={`${porcent > 0 ? 'text-green-500' : (porcent === 0 ? 'text-gray-500' : 'text-red-500')} font-medium flex items-center`}>
                    <i data-lucide="trending-up" className="w-3 h-3 mr-1"></i> {porcent}%
                </span>
                }vs. {periodoAnterior}
            </p>
        </div>
    )
}

export default DashboardCard