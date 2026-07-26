import { Button } from '@/components/ui/button';
import type { MenuItem } from '../types/menu-items.types';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import parseAvailable from '../services/parseAvailable';
import { Badge } from '@/components/ui/badge';
import MenuItemCreateDialog from './MenuItemsCreateDialog';
import { useEffect, useState } from 'react';
import { getMenuItemsResponse } from '../api/menu-items.api';
import { Input } from '@base-ui/react';
import { Search, X } from 'lucide-react';


// interface MenuItemTableProps {
//   menuItems: MenuItem[];
// }

const MenuItemTable = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadMenuItems = async () => {
    try {

      const response = await getMenuItemsResponse(page, searchTerm);
      if (response.success) {
        setMenuItems(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotalItems(response.data.meta.total);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (newPage: number) => {
    const nextPage = page + newPage;
    if (nextPage >= 1 && nextPage <= totalPages) {
      setPage(nextPage);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, [page,searchTerm]);
  return (
    <div className="bg-white p-4 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">

      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className='relative w-1/3'>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            type='search'
            placeholder='Buscar menu por nombre...'
            className='pl-9 text-sm w-full p-2 rounded-md border-2 border-zinc-200 dark:border-zinc-800'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant='ghost'
              size='sm'
              className='absolute right-2.5 top-2.5 h-4 w-4'
              onClick={() => setSearchTerm('')}
            >
              <X />
            </Button>
          )}
        </div>
      </div>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className='bg-white hover:bg-white'>
            <TableCell colSpan={6} className=''>
              <div className="flex items-center justify-between">

                {/* Total de elementos */}
                <span className="text-sm text-muted-foreground">
                  Total: {totalItems} elementos
                </span>

                {/* Navegación */}
                <div className="flex items-center gap-2">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(-1)}
                  >
                    Anterior
                  </Button>

                  <span className="text-sm">
                    Página {page} de {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                  >
                    Siguiente
                  </Button>

                </div>

              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default MenuItemTable;