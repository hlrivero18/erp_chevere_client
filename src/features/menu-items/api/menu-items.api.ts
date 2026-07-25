import api from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { MenuItem, MenuItemCreateRequest, MenuItemsResponse } from "../types/menu-items.types";

export const getMenuItemsResponse = async (): Promise<MenuItemsResponse> => {
    const response = await api.get<MenuItemsResponse>('/menu-items');
    return response.data;
}


export const createMenuItemResponse = async (data: MenuItemCreateRequest): Promise<ApiResponse<MenuItem>> => {
    const response = await api.post<ApiResponse<MenuItem>>('/menu-items/', data);
    return response.data;
}