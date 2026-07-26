import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import PedidosForm from './PedidosForm';
import PedidosResumen from './PedidosResumen';
import { useState } from 'react';
import type { PedidoCreateRequest, PedidoFormData } from '../types/pedidos.types';
import { createPedidosResponse } from '../api/pedidos.api';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const PedidosCreateDialog = () => {
  const [formData, setFormData] = useState<PedidoFormData>({
    description: '',
    menuItems: []
  })

  const queryClient = useQueryClient();

  const handleTotales = (): { total: number; subTotal: number } => {
    const total = formData.menuItems.map((item) => item.price * item.cantidad).reduce((a, b) => a + b, 0);
    const subTotal = total * 0.79
    return { total, subTotal };
  }

  const handleDeleteItem = (id: number) => {
    const newMenuItems = formData.menuItems.filter((item) => item.id !== id);
    setFormData({ ...formData, menuItems: newMenuItems });
  }

  const mutationCreate = useMutation({
    mutationFn: createPedidosResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pedidos']
      });
      setFormData({
        description: '',
        menuItems: []
      })
    },
  });

  const handleSubmit = async () => {

    const parseformData: PedidoCreateRequest = {
      description: formData.description,
      menuItems: formData.menuItems.map((item) => {
        return {
          id: item.id,
          quantity: item.cantidad
        }
      })
    }

    mutationCreate.mutate(parseformData);
  }

  const isSubmitting = mutationCreate.isPending;

  return (
    <Dialog>

      <DialogTrigger render={<Button />}>
        Nuevo Pedido
      </DialogTrigger>

      <DialogContent className="sm:max-w-[850px]">

        <DialogHeader>
          <DialogTitle>
            Crear Pedido
          </DialogTitle>

          <DialogDescription>
            Completa los datos para registrar un nuevo pedido.
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 '>
          <PedidosForm
            formData={formData}
            setFormData={setFormData}
            onsubmit={handleSubmit}
          />
          <PedidosResumen
            formData={formData}
            setFormData={setFormData}
            totales={handleTotales()}
            onDeleteItem={handleDeleteItem}
            onsubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

      </DialogContent>

    </Dialog>
  );
};

export default PedidosCreateDialog;