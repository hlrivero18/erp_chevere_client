import api from "@/lib/axios";
import type { ReportesGeneralesResponse } from "../types/dashboard.types";

export const getReportesGenerales = async (year: string, month: string, day?: string): Promise<ReportesGeneralesResponse> => {
    const response = await api.get<ReportesGeneralesResponse>('/reportes/?', {
        params: {
            year,
            month,
            day
        }
    });
    return response.data;
}
