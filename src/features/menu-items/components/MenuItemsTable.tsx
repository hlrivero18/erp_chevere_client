import { Button } from '@/components/ui/button';
import type { MenuItem } from '../types/menu-items.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import parseAvailable from '../services/parseAvailable';
import { Badge } from '@/components/ui/badge';
import MenuItemCreateDialog from './MenuItemsCreateDialog';


interface MenuItemTableProps {
  menuItems: MenuItem[];
}

const MenuItemTable = ({ menuItems }: MenuItemTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {menuItems.map((menuItem, index) => (
            <TableRow key={menuItem.id}>
              <TableCell className="font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium">
                {menuItem.name}
              </TableCell>

              <TableCell>
                {menuItem.description}
              </TableCell>

              <TableCell>
                {menuItem.price}
              </TableCell>

              <TableCell>
                <Badge variant={parseAvailable(menuItem.isAvailable) === 'Activo' ? 'success' : 'error'}>
                  {parseAvailable(menuItem.isAvailable)}
                </Badge>
              </TableCell>  
              <TableCell>
                <MenuItemCreateDialog menuItem={menuItem} />
                {/* <Button
                  size='xs'
                  variant='outline'
                >
                  Editar
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenuItemTable;