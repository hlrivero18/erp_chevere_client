import type { MenuItem } from '../types/menu-items.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface MenuItemTableProps {
  menuItems: MenuItem[];
}

const MenuItemTable = ({ menuItems }: MenuItemTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {menuItems.map((menuItem) => (
            <TableRow key={menuItem.id}>
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
                {menuItem.isAvailable}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenuItemTable;