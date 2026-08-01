import type { ApiResponse } from "@/types/api.types"

export interface ReporteGeneral {
    ventasTotales: number
    totalPagado: string
}

export type ReportesGeneralesResponse = ApiResponse<ReporteGeneral>