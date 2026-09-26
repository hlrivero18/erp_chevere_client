import type { ApiResponse } from "@/types/api.types"

export interface MetricaVenta {
    total: number;
    diferenciaPorcentaje: number;
}

export interface PeriodoVentas {
    cantidad: MetricaVenta;
    dinero: MetricaVenta;
}

export interface MetodoPagoStats {
    metodo: string;
    totalDinero: number;
    porcentajeDelTotal: number;
}

export interface ProductoMasVendido {
    id: number;
    name: string;
    cantidad: number;
}

export interface ReporteGeneral {
    ventasDia: PeriodoVentas;
    ventasSemana: PeriodoVentas;
    ventasMes: PeriodoVentas;
    topMetodosPago: MetodoPagoStats[];
    topProductos: ProductoMasVendido[];
}


export type ReportesGeneralesResponse = ApiResponse<ReporteGeneral>;