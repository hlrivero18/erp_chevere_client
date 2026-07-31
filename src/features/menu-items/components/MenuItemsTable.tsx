import { Button } from '@/components/ui/button';

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
import { useState } from 'react';
import { getMenuItemsResponse } from '../api/menu-items.api';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const MenuItemTable = () => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handlePageChange = (newPage: number) => {
    const nextPage = page + newPage;
    if (nextPage >= 1 && nextPage <= totalPages) {
      setPage(nextPage);
    }
  };

  const {
    data,
    // isLoading,
    // isError,
    // error
  } = useQuery({
    queryKey: ['menu-items', page, searchTerm],
    queryFn: () => getMenuItemsResponse(page, searchTerm),
  });

  const menuItems = data?.data.data ?? [];
  const totalPages = data?.data.meta.totalPages ?? 0;
  const totalItems = data?.data.meta.total ?? 0;

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error: {error?.message}</div>;
  // }

  return (
    <div className="bg-white p-4 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">

      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className='relative w-1/3'>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            type='search'
            placeholder='Buscar menu por nombre...'
            className='pl-9 text-sm w-full rounded-md border-2 border-zinc-200 dark:border-zinc-800'
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
            <TableHead className="text-right">
              Acción
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {menuItems.map((menuItem, index) => (
            <TableRow key={menuItem.id}>
              <TableCell className="font-medium">
                {(page - 1) * 8 + index + 1}
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
                <Badge variant={parseAvailable(menuItem.isAvailable) === 'Activo' ? 'Cobrado' : 'Cancelado'}>
                  {parseAvailable(menuItem.isAvailable)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <MenuItemCreateDialog menuItem={menuItem} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className='bg-white dark:bg-zinc-900/40 hover:bg-white'>
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