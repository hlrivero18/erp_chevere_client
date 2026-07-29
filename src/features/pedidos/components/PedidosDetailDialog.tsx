import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import type { Pedido } from '../types/pedidos.types';
import { Receipt } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PedidosDetailDialog = ({ pedido }: { pedido: Pedido }) => {

    return (
        <Dialog>

            <DialogTrigger>
                <Button variant="outline" size="xs">
                    Ver detalle
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[850px]">

                <DialogHeader className='border-b border-gray-400 pb-4 dark:border-gray-700'>
                    <DialogTitle>
                        <div className="flex items-center gap-2.5 flex-wrap">
                            <div className="h-9 flex items-center justify-center">
                                <Receipt className="h-5 w-5 stroke-[1.75]" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                Detalle del pedido #{pedido.id}
                            </h2>
                            <Badge className='text-sm px-4' variant={pedido.estado === 'Pendiente' ? 'Pendiente' : pedido.estado === 'Cobrado' ? 'Cobrado' : 'Cancelado'}>
                                {pedido.estado}
                            </Badge>
                        </div>
                    </DialogTitle>

                    <DialogDescription>
                        <p className='text-xs font-semibold text-muted-foreground'>Fecha: {new Date(pedido.createdAt).toLocaleDateString('es-AR')} {new Date(pedido.createdAt).toLocaleTimeString('es-AR')}</p>
                    </DialogDescription>

                </DialogHeader>

                <div className=''>

                    <p>Descripción: {pedido.descripcion || 'No posee Nota adicional'}</p>
                    <p>Estado: {pedido.estado}</p>
                    <p>Metodo de pago: {pedido.metodoPago}</p>
                    <p>Creado por: {pedido.createdBy.name} {pedido.createdBy.lastName}</p>
                    

                    <div className='border bg-zinc-50 rounded-xl border-gray-400 p-3 dark:border-gray-700'>
                        {pedido.items.map((item) => (
                            <div key={item.id} className='flex items-center justify-between'>
                                <span>{item.name}</span>
                                <span className='bg-amber-100 border px-2 py-1 rounded-full font-bold'>{item.cantidad}</span>
                                <span className='text-muted-foreground font-semibold'>{item.precio}</span>
                            </div>
                        ))}
                        <p>Total: {Number(pedido.total).toFixed(2)}</p>
                        <p>SubTotal: {Number(pedido.subTotal).toFixed(2)}</p>
                    </div>


                </div>


            </DialogContent>

        </Dialog>
    );
};

export default PedidosDetailDialog;