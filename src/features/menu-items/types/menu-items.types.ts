import type { ApiResponse, PaginationMeta } from '@/types/api.types';

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: User;
    updatedBy?: User | null;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
}

export interface MenuItemCreateRequest {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

export interface MenuItemUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  isAvailable?: boolean;
}

export type MenuItemsResponse = ApiResponse<{
  data: MenuItem[];
  meta: PaginationMeta;
}>;