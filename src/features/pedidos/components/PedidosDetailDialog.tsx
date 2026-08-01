import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import type { Pedido, PedidoFormData } from '../types/pedidos.types';
import { Receipt } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import PedidosCreateDialog from './PedidosCreateDialog';
import { useState } from 'react';

const PedidosDetailDialog = ({ pedido }: { pedido: Pedido }) => {

    const [open, setOpen] = useState<boolean>(false);

    const parseFormDataEdit: PedidoFormData = {
        description: pedido.descripcion,
        metodoPago: pedido.metodoPago,
        estado: pedido.estado,
        menuItems: pedido.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.precio / item.cantidad,
            cantidad: item.cantidad,
            total: item.precio,
            subTotal: item.precio * 0.79
        }))
    }

    return (
        <Dialog>

            <DialogTrigger render={<Button variant="outline" size="xs"/>}>
                    Ver detalle
                {/* </Button> */}
            </DialogTrigger>

            <DialogContent className="lg:max-w-[600px]">

                <DialogHeader className='border-b border-gray-400 pb-4 dark:border-gray-700'>
                    <DialogTitle>
                        <div className="flex items-center gap-2.5 flex-wrap">
                            <div className="h-9 flex items-center justify-center">
                                <Receipt className="h-5 w-5 stroke-[1.75]" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                Detalle del pedido #{pedido.id}
                            </h2>
                            <Badge variant={
                                pedido.estado === "Pendiente" ? "Pendiente" :
                                    pedido.estado === "Cobrado" ? "Cobrado" :
                                        pedido.estado === "Cancelado" ? "Cancelado" : "default"
                            }>{pedido.estado}</Badge>
                            <PedidosCreateDialog
                                formDataEdit={parseFormDataEdit}
                                idEdit={pedido.id}
                                open={open}
                                setOpen={setOpen}
                            />
                        </div>
                    </DialogTitle>

                    <DialogDescription render={<p className='text-xs font-semibold text-muted-foreground'/>}>
                        Fecha: {new Date(pedido.createdAt).toLocaleDateString('es-AR')} {new Date(pedido.createdAt).toLocaleTimeString('es-AR')}
                    </DialogDescription>

                </DialogHeader>

                <div className=''>
                    <p>Metodo de pago: {pedido.metodoPago}</p>
                    <p>Creado por: {pedido.createdBy.name} {pedido.createdBy.lastName}</p>

                    <div className='border bg-zinc-50 dark:bg-black rounded-xl border-gray-400 p-3 dark:border-gray-700'>
                        <ScrollArea className="flex-1 pr-1 max-h-[250px]">
                            {pedido.items.map((item) => (
                                <div key={item.id} className='my-2 flex items-center justify-between'>
                                    <span className='text-xs font-mono'>{item.name} X {item.cantidad}</span>                                   
                                    <span className='text-xs font-mono'>${item.precio}</span>
                                </div>
                            ))}
                        </ScrollArea>

                        {/* <div className="pt-4 mt-auto border-t border-zinc-200 dark:border-zinc-800 space-y-4"> */}
                        <div className="space-y-1.5 text-sm pt-2 mt-3 border-t-2 border-gray-400 dark:border-gray-700">
                            <div className="flex justify-between text-zinc-500">
                                <span>Subtotal</span>
                                <span className="font-mono">${pedido.subTotal}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                                    ${pedido.total}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className='font-semibold mt-2 text-xs'>Notas adicionales: {pedido.descripcion || 'No posee nota adicional'}</p>

                </div>


            </DialogContent>

        </Dialog>
    );
};

export default PedidosDetailDialog;