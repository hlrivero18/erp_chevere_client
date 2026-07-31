import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { getPedidosResponse } from '../api/pedidos.api';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import PedidosDetailDialog from './PedidosDetailDialog';
import { Badge } from '@/components/ui/badge';

// interface PedidosTableProps {
//   pedidos: Pedido[];
// }

const PedidosTable = () => {
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
    queryKey: ['pedidos', page, searchTerm],
    queryFn: () => getPedidosResponse(page, searchTerm),
  });

  const pedidos = data?.data.data ?? [];
  const totalPages = data?.data.meta.totalPages ?? 0;
  const totalItems = data?.data.meta.total ?? 0;

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
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Metodo de pago</TableHead>
            <TableHead>Creado por</TableHead>
            <TableHead>Nota</TableHead>
            <TableHead className="text-right">
              Acción
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pedidos.map((pedido) => (
            <TableRow key={pedido.id}>

              <TableCell className="font-medium">
                #{pedido.id}
              </TableCell>
              
              <TableCell>
                {new Date(pedido.createdAt).toLocaleDateString('es-AR')}
              </TableCell>

              <TableCell>
                {Number(pedido.total).toFixed(2)}
              </TableCell>

              <TableCell>
                <Badge variant={
                  pedido.estado === "Pendiente" ? "Pendiente" :
                  pedido.estado === "Cobrado" ? "Cobrado" :
                  pedido.estado === "Cancelado" ? "Cancelado" : "default"
                  }>
                  {pedido.estado}
                </Badge>
              </TableCell>

              <TableCell>
                {pedido.metodoPago}
              </TableCell>

              <TableCell>
                {pedido.createdBy.name}{' '}
                {pedido.createdBy.lastName}
              </TableCell>

              <TableCell>
                {pedido.descripcion || '-'}
              </TableCell>

              <TableCell className="text-right">
                <PedidosDetailDialog pedido={pedido} />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className='bg-white dark:bg-zinc-900/40 hover:bg-white'>
            <TableCell colSpan={8} className=''>
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

export default PedidosTable;