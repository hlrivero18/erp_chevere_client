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
import { useState } from 'react';
import type { PedidoCreateRequest, PedidoFormData } from '../types/pedidos.types';
import { createPedidosResponse, updatePedidosResponse } from '../api/pedidos.api';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { validatePedidosFormData } from '../validators/PedidosFormValidator';
import { Edit } from 'lucide-react';
import PedidoResumen from './PedidoResumen';
import { calTotales } from '../utils/PedidosUtils';

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
    recargo: formDataEdit?.recargo || null,
    envio: formDataEdit?.envio || null,
    descuento: formDataEdit?.descuento || null,
    menuItems: formDataEdit?.menuItems || []
  })

  const queryClient = useQueryClient();

  const handleTotales = calTotales(null, formData);
  
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
        recargo: null,
        envio: null,
        descuento: null,
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

    const totales = handleTotales;

    const parseformData: PedidoCreateRequest = {
      description: formData.description,
      metodoPago: formData.metodoPago,
      estado: formData.estado,
      menuItems: formData.menuItems.map((item) => {
        return {
          id: item.id,
          quantity: item.cantidad
        }
      }),
      total: totales.total,
      subTotal: totales.subTotal,
      envio: formData.envio || 0,
      descuento: formData.descuento || 0,
      recargo: formData.recargo || 0,
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

      <DialogContent className="sm:max-w-[850px] sm:max-h-[600px] overflow-y-auto ">

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
          <PedidoResumen
            formData={formData}
            setFormData={setFormData}
            totales={handleTotales}
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