import api from "@/lib/axios";
import type { PedidosResponse, PedidoCreateRequest, PedidoCreateResponse, PedidoStatusRequest } from "../types/pedidos.types";

export const getPedidosResponse = async (page: number = 1, search?: string, startDate?: string, endDate?: string): Promise<PedidosResponse> => {
    const response = await api.get<PedidosResponse>('/pedidos/', {
        params: {
            page,
            limit: 8,
            search,
            startDate,
            endDate
        }
    });
    return response.data;
}

export const createPedidosResponse = async (data: PedidoCreateRequest): Promise<PedidoCreateResponse> => {
    const response = await api.post<PedidoCreateResponse>('/pedidos/', data);
    return response.data;
}

export const updatePedidosResponse = async (id: number, data: PedidoCreateRequest): Promise<PedidoCreateResponse> => {
    const response = await api.put<PedidoCreateResponse>(`/pedidos/` + id, data);
    return response.data;
}

export const updatePedidoStatusResponse = async (id: number, data: PedidoStatusRequest): Promise<PedidoCreateResponse> => {
    const response = await api.put<PedidoCreateResponse>(`/pedidos/status/` + id, data);
    return response.data;
}