import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import MenuItemForm from './MenuItemsForm';

const MenuItemCreateDialog = () => {
  return (
    <Dialog>

      <DialogTrigger render={<Button />}>
        Nuevo item
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader>
          <DialogTitle>
            Crear item
            </DialogTitle>

          <DialogDescription>
            Completa los datos para registrar un nuevo item.
          </DialogDescription>
        </DialogHeader>

        <MenuItemForm />

      </DialogContent>

    </Dialog>
  );
};

export default MenuItemCreateDialog;