import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import type { MenuItemCreateRequest } from '../types/menu-items.types';
import { createMenuItemResponse } from '../api/menu-items.api';

const MenuItemForm = () => {
  const [formData, setFormData] = useState<MenuItemCreateRequest>({
    name: '',
    description: '',
    price: 0.00,
    isAvailable: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const response = await createMenuItemResponse(formData);
      if(response.success){
        // toast.success('Item creado exitosamente');
        setFormData({
          name: '',
          description: '',
          price: 0.00,
          isAvailable: true,
        });
      }
    }catch(error){
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

        {/* <div className="space-y-2">
          <Label htmlFor="stock">
            Stock
          </Label>

          <Input
            id="stock"
            type="number"
            min="0"
            placeholder="0"
          />
        </div> */}

      </div>

      <Button type="submit" className="w-full">
        Crear producto
      </Button>

    </form>
  );
};

export default MenuItemForm;