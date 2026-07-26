import api from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { MenuItem, MenuItemCreateRequest, MenuItemsResponse } from "../types/menu-items.types";

export const getMenuItemsResponse = async (page: number = 1, search?: string): Promise<MenuItemsResponse> => {
    const response = await api.get<MenuItemsResponse>('/menu-items', {
        params: {
            page,
            limit: 8,
            search
        }
    });
    return response.data;
}


export const createMenuItemResponse = async (data: MenuItemCreateRequest): Promise<ApiResponse<MenuItem>> => {
    const response = await api.post<ApiResponse<MenuItem>>('/menu-items/', data);
    return response.data;
}

export const updateMenuItemResponse = async (id: number, data: MenuItemCreateRequest): Promise<ApiResponse<MenuItem>> => {
    const response = await api.put<ApiResponse<MenuItem>>('/menu-items/' + id, data);
    return response.data;
}