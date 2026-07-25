import type { Pedido } from '../types/pedidos.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

interface PedidosTableProps {
  pedidos: Pedido[];
}

const PedidosTable = ({ pedidos }: PedidosTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Creado por</TableHead>
            <TableHead>Fecha</TableHead>
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
                {pedido.descripcion || '-'}
              </TableCell>

              <TableCell>
                {Number(pedido.subTotal).toFixed(2)}
              </TableCell>

              <TableCell>
                {Number(pedido.total).toFixed(2)}
              </TableCell>

              <TableCell>
                {pedido.estado}
              </TableCell>

              <TableCell>
                {pedido.createdBy.name}{' '}
                {pedido.createdBy.lastName}
              </TableCell>

              <TableCell>
                {new Date(pedido.createdAt).toLocaleDateString('es-PE')}
              </TableCell>

              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  Ver detalle
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PedidosTable;