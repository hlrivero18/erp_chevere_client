import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import type { Pedido, PedidoFormData } from '../../types/pedidos.types';
import { Calendar, CheckCircle2, CreditCard, FileText, ShoppingBag, Tag, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import PedidosCreateDialog from '../PedidosCreateDialog';
import { useState } from 'react';
import { calTotales } from '../../utils/PedidosUtils';
import PedidoStatusSelect from './PedidoStatusSelect';

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
        })),
        envio: pedido.envio,
        descuento: pedido.descuento,
        recargo: pedido.recargo
    }

    const formatoMoneda = (monto: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(monto);
    };

    const totales = calTotales(pedido)

    return (
        <Dialog>

            <DialogTrigger render={<Button variant="outline" size="xs" />}>
                Ver detalle
            </DialogTrigger>

            <DialogContent className="sm:max-w-[800px] sm:max-h-[700px] gap-2 dark:bg-zinc-950 dark:border-zinc-800">

                <div className="absolute right-14 top-4 z-50">
                    <PedidosCreateDialog
                        formDataEdit={parseFormDataEdit}
                        idEdit={pedido.id}
                        open={open}
                        setOpen={setOpen}
                    />
                </div>
                <DialogHeader className='border-b border-zinc-200 dark:border-zinc-800 pb-4'>

                    <div className="flex items-center gap-2.5 flex-wrap">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 text-yellow-700 dark:text-yellow-500 flex items-center justify-center font-bold text-xl shrink-0">
                            <ShoppingBag size={24} className="text-yellow-600 dark:text-yellow-500" />
                        </div>

                        <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Pedido #{pedido.id}
                        </DialogTitle>

                        {/* <Badge variant={
                            pedido.estado === "Pendiente" ? "Pendiente" :
                                pedido.estado === "Cobrado" ? "Cobrado" :
                                    pedido.estado === "Cancelado" ? "Cancelado" : "default"
                        }>{pedido.estado}</Badge> */}
                        <PedidoStatusSelect
                            estado={pedido.estado}
                            idPedido={pedido.id}
                        />

                    </div>

                    <DialogDescription className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-2">
                        <Calendar size={14} className="text-zinc-400 dark:text-zinc-500" />
                        Fecha: {new Date(pedido.createdAt).toLocaleDateString('es-AR')} {new Date(pedido.createdAt).toLocaleTimeString('es-AR')}
                    </DialogDescription>

                </DialogHeader>

                {/* Info general */}
                <div className=''>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-50/80 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl shadow-sm text-zinc-600 dark:text-zinc-300">
                                <CreditCard size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Método de pago</p>
                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{pedido.metodoPago}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl shadow-sm text-zinc-600 dark:text-zinc-300">
                                <User size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Atendido por</p>
                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 capitalize">{pedido.createdBy.name} {pedido.createdBy.lastName}</p>
                            </div>
                        </div>
                    </div>

                    {/* Productos y totales */}
                    <ScrollArea className='h-[300px]'>
                        <div className='mt-2'>
                            <div className="flex items-center justify-between mb-3 mt-2">
                                <h3 className="text-xs font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                                    Productos ({pedido.items.reduce((acc, item) => acc + item.cantidad, 0)})
                                </h3>
                            </div>

                            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 border border-zinc-100 dark:border-zinc-800/60 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950/50">
                                {pedido.items.map((item) => (
                                    <div key={item.id} className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-700 dark:text-zinc-300 text-sm flex items-center justify-center shrink-0">
                                                {item.cantidad}x
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{item.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right font-bold text-sm text-zinc-800 dark:text-zinc-200">
                                            {formatoMoneda(item.precio)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 md:p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 space-y-2.5 mt-4">
                            <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                                <span>Subtotal</span>
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">{formatoMoneda(pedido.total)}</span>
                            </div>

                            {pedido.descuento > 0 && (
                                <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Tag size={14} /> Descuento aplicado
                                    </span>
                                    <span>-{formatoMoneda(totales.descuento)}</span>
                                </div>
                            )}

                            {pedido.recargo > 0 && (
                                <div className="flex justify-between text-sm text-red-600 dark:text-red-400 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Tag size={14} /> Recargo aplicado
                                    </span>
                                    <span>+{formatoMoneda(totales.recargo)}</span>
                                </div>
                            )}

                            {pedido.envio > 0 && (
                                <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                                    <span>Costo de envío</span>
                                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{formatoMoneda(pedido.envio)}</span>
                                </div>
                            )}

                            <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-800 flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Total</p>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-500 font-medium flex items-center gap-1 mt-0.5">
                                        <CheckCircle2 size={12} /> Pagado con {pedido.metodoPago}
                                    </p>
                                </div>
                                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                    {formatoMoneda(totales.conCargos)}
                                </span>
                            </div>
                        </div>

                        {pedido.descripcion && (
                            <div className="space-y-1.5 mt-4">
                                <label className="text-xs font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
                                    <FileText size={14} /> Notas Adicionales
                                </label>
                                <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-xl text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed italic">
                                    <span>"{pedido.descripcion}"</span>
                                </div>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog >
    );


};

export default PedidosDetailDialog;