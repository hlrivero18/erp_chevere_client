import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import type { MenuItem, MenuItemCreateRequest } from '../types/menu-items.types';
import { createMenuItemResponse, updateMenuItemResponse } from '../api/menu-items.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const MenuItemForm = ({ menuItem = null }: { menuItem?: MenuItem }) => {
  const [formData, setFormData] = useState<MenuItemCreateRequest>({
    name: menuItem?.name ?? '',
    description: menuItem?.description ?? '',
    price: menuItem?.price ?? 0.00,
    isAvailable: menuItem?.isAvailable ?? true,
  });

  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: createMenuItemResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['menu-items']
      });
      setFormData({
        name: '',
        description: '',
        price: 0,
        isAvailable: true,
      });
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: {
      id: number;
      data: MenuItemCreateRequest;
    }) => updateMenuItemResponse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['menu-items'],
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (menuItem) {
      mutationUpdate.mutate({
        id: menuItem.id,
        data: formData
      });

      return;
    }

    mutationCreate.mutate(formData);
  };

  const isSubmitting = mutationCreate.isPending || mutationUpdate.isPending;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      <div className="space-y-2">
        <Label htmlFor="name">
          Nombre
        </Label>

        <Input
          id="name"
          placeholder="Nombre del producto"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Descripción
        </Label>

        <Input
          id="description"
          placeholder="Descripción del producto"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label htmlFor="price">
            Precio
          </Label>

          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isAvailable">
            Estado
          </Label>

          <Select
            id="isAvailable"
            value={formData.isAvailable == true ? "Activo" : "Inactivo"}
            onValueChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                isAvailable: value === "Activo" ? true : false,
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? menuItem
            ? 'Actualizando...'
            : 'Creando...'
          : menuItem
            ? 'Actualizar item'
            : 'Crear item'}
      </Button>

    </form>
  );
};

export default MenuItemForm;