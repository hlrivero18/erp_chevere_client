import type { PaginationMeta, ApiResponse } from '@/types/api.types';

export interface PedidoUser {
  id: string;
  name: string;
  lastName: string;
}

export interface Pedido {
  id: number;
  total: string;
  subTotal: string;
  descripcion: string;
  estado: string;
  createdBy: PedidoUser;
  createdAt: string;
  updatedAt: string;
  updatedBy: PedidoUser | null;
}

export interface PedidoFormData {
  description: string;
  menuItems: MenuItemFormData[];
}

export interface MenuItemFormData {
    id: number;
    name: string;
    price: number;
    cantidad: number;
    total: number;
    subTotal: number;
}

export type PedidosResponse = ApiResponse<{
  data: Pedido[];
  meta: PaginationMeta;
}>;

export interface MenuItemPedido {
  id: number;
  quantity: number;
}

export interface PedidoCreateRequest {
  description: string;
  menuItems: MenuItemPedido[];
}

export type PedidoCreateResponse = ApiResponse<{
  data: Pedido;
}>;