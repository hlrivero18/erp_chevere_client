import api from "@/lib/axios";
import type { PedidosResponse, PedidoCreateRequest, PedidoCreateResponse } from "../types/pedidos.types";

export const getPedidosResponse = async (page: number = 1, search?: string): Promise<PedidosResponse> => {
    const response = await api.get<PedidosResponse>('/pedidos/', {
        params: {
            page,
            limit: 8,
            search
        }
    });
    return response.data;
}

export const createPedidosResponse = async (data: PedidoCreateRequest): Promise<PedidoCreateResponse> => {
    const response = await api.post<PedidoCreateResponse>('/pedidos/', data);
    return response.data;
}
