import type { ApiResponse } from "@/types/api.types"

export interface ReporteGeneral {
    ventasMesActual: {
        totalPedidos: number,
        totalVentas: string,
        diferenciaPorcentaje: number
    },
    ventasHoy: {
        totalPedidos: number,
        totalVentas: string,
        diferenciaPorcentaje: number
    }
}

export type ReportesGeneralesResponse = ApiResponse<ReporteGeneral>