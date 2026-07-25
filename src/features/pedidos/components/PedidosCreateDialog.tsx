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

const PedidosCreateDialog = () => {
  return (
    <Dialog>

      <DialogTrigger render={<Button />}>
        Nuevo Pedido
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader>
          <DialogTitle>
            Crear Pedido
            </DialogTitle>

          <DialogDescription>
            Completa los datos para registrar un nuevo pedido.
          </DialogDescription>
        </DialogHeader>

        <PedidosForm />

      </DialogContent>

    </Dialog>
  );
};

export default PedidosCreateDialog;