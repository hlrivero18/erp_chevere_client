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
import type { MenuItem } from '../types/menu-items.types';

type MenuItemCreateDialogProps = {
  menuItem?: MenuItem | null;
};

const MenuItemCreateDialog = ({
  menuItem = null,
}: MenuItemCreateDialogProps) => {
  return (
    <Dialog>

      <DialogTrigger 
        render={
          <Button 
            size={menuItem ? 'xs' : 'default'}
            variant={menuItem ? 'outline' : 'default'}
          />
        }
      >
        { menuItem ? 'Editar' : 'Nuevo item'}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader>
          <DialogTitle>
            {menuItem ? 'Editar item' : 'Crear item'}
          </DialogTitle>

          <DialogDescription>
            {menuItem ? 'Completa los datos para editar un item.' : 'Completa los datos para registrar un nuevo item.'}
          </DialogDescription>
        </DialogHeader>

        <MenuItemForm menuItem={menuItem} />

      </DialogContent>

    </Dialog>
  );
};

export default MenuItemCreateDialog;