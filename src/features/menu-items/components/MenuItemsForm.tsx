import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import type { MenuItem, MenuItemCreateRequest } from '../types/menu-items.types';
import { createMenuItemResponse, updateMenuItemResponse } from '../api/menu-items.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MenuItemForm = ({ menuItem = null }: { menuItem?: MenuItem }) => {
  const [formData, setFormData] = useState<MenuItemCreateRequest>({
    name: menuItem?.name ?? '',
    description: menuItem?.description ?? '',
    price: menuItem?.price ?? 0.00,
    isAvailable: menuItem?.isAvailable ?? true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = menuItem ? await updateMenuItemResponse(menuItem.id, formData) : await createMenuItemResponse(formData);
      if (response.success) {
        setFormData({
          name: '',
          description: '',
          price: 0.00,
          isAvailable: true,
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

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

      <Button type="submit" className="w-full">
        {menuItem ? 'Editar item' : 'Crear item'}
      </Button>

    </form>
  );
};

export default MenuItemForm;