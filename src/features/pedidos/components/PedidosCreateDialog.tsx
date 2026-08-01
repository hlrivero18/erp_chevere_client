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
import { createPedidosResponse, updatePedidosResponse } from '../api/pedidos.api';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { validatePedidosFormData } from '../validators/PedidosFormValidator';
import { Edit } from 'lucide-react';

interface PedidosCreateDialogProps {
  formDataEdit?: PedidoFormData | null
  idEdit?: number | null
  open?: boolean
  setOpen?: (value: boolean) => void
}

const PedidosCreateDialog = ({ formDataEdit, idEdit, open, setOpen }: PedidosCreateDialogProps) => {
  const [formData, setFormData] = useState<PedidoFormData>({
    description: formDataEdit?.description || '',
    metodoPago: formDataEdit?.metodoPago || '',
    estado: formDataEdit?.estado || '',
    menuItems: formDataEdit?.menuItems || []
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
        metodoPago: '',
        estado: '',
        menuItems: []
      })
      toast.success("Pedido creado con éxito");
    },
    onError: () => {
      toast.error("Error al crear el pedido");
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: {
      id: number;
      data: PedidoCreateRequest;
    }) => updatePedidosResponse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pedidos']
      });
      setOpen(false);
      toast.success("Pedido actualizado con éxito");
    },
    onError: () => {
      toast.error("Error al actualizar el pedido");
    }
  });

  const handleSubmit = async () => {

    if (!validatePedidosFormData(formData)) {
      return;
    }

    const parseformData: PedidoCreateRequest = {
      description: formData.description,
      metodoPago: formData.metodoPago,
      estado: formData.estado,
      menuItems: formData.menuItems.map((item) => {
        return {
          id: item.id,
          quantity: item.cantidad
        }
      })
    }

    if (!formDataEdit) {
      console.log('create', formDataEdit)
      mutationCreate.mutate(parseformData);
    } else {
      console.log('edit', formDataEdit)
      mutationUpdate.mutate({ id: idEdit, data: parseformData });
    }

  }

  const isSubmitting = mutationCreate.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger render={<Button
        size={formDataEdit ? 'icon' : 'default'}
      />}>
        {formDataEdit ? <Edit /> : 'Nuevo Pedido'}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[850px]">

        <DialogHeader>
          <DialogTitle>
            {formDataEdit ? 'Editar Pedido' : 'Crear Pedido'}
          </DialogTitle>

          <DialogDescription>
            {formDataEdit ? 'Completa los datos para editar el pedido.' : 'Completa los datos para registrar un nuevo pedido.'}
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 '>
          <PedidosForm
            isEdit={formDataEdit != null}
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