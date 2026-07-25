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

export type PedidosResponse = ApiResponse<{
  data: Pedido[];
  meta: PaginationMeta;
}>;

export interface PedidoCreateRequest {
  description: string;
  menuItems: number[];
}

export type PedidoCreateResponse = ApiResponse<{
  data: Pedido;
}>;