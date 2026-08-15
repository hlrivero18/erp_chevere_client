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
import { Calendar, CheckCircle2, CreditCard, FileText, ShoppingBag, Tag, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import PedidosCreateDialog from './PedidosCreateDialog';
import { useState } from 'react';
import {calTotales} from '../utils/PedidosUtils';

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

    const formatoMoneda = (monto) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(monto);
    };

    const totales = calTotales(pedido)

    console.log(totales)

    return (
        <Dialog>

            <DialogTrigger render={<Button variant="outline" size="xs" />}>
                Ver detalle
            </DialogTrigger>

            <DialogContent className="sm:max-w-[800px] sm:max-h-[700px] gap-2">

                <DialogHeader className='border-b border-gray-400 pb-4 dark:border-gray-700'>
                    <DialogTitle>
                        <div className="flex items-center gap-2.5 flex-wrap">
                            <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 text-yellow-700 flex items-center justify-center font-bold text-xl shrink-0">
                                <ShoppingBag size={24} className="text-yellow-600" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                Pedido #{pedido.id}
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

                    <DialogDescription render={<div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm mt-1"></div>}>
                        <Calendar size={14} className="text-slate-400" /> Fecha: {new Date(pedido.createdAt).toLocaleDateString('es-AR')} {new Date(pedido.createdAt).toLocaleTimeString('es-AR')}
                    </DialogDescription>

                </DialogHeader>

                {/* Info general */}
                <div className=''>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-white rounded-xl shadow-xs text-slate-600">
                                <CreditCard size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium">Método de pago</p>
                                <p className="text-sm font-semibold text-slate-800">{pedido.metodoPago}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-white rounded-xl shadow-xs text-slate-600">
                                <User size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium">Atendido por</p>
                                <p className="text-sm font-semibold text-slate-800 capitalize">{pedido.createdBy.name} {pedido.createdBy.lastName}</p>
                            </div>
                        </div>
                    </div>

                    {/* Productos y totales */}
                    <ScrollArea className='h-[300px]'>
                        <div className='mt-2'>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    Productos ({pedido.items.reduce((acc, item) => acc + item.cantidad, 0)})
                                </h3>
                            </div>

                            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-white">
                                {pedido.items.map((item) => (
                                    <div key={item.id} className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-lg bg-slate-100 font-bold text-slate-700 text-sm flex items-center justify-center shrink-0">
                                                {item.cantidad}x
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right font-bold text-sm text-slate-800">
                                            {formatoMoneda(item.precio)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div><div className="bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-100 space-y-2.5">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-slate-800">{formatoMoneda(pedido.total)}</span>
                            </div>

                            {pedido.descuento > 0 && (
                                <div className="flex justify-between text-sm text-emerald-600 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Tag size={14} /> Descuento aplicado
                                    </span>
                                    <span>-{formatoMoneda(totales.descuento)}</span>
                                </div>
                            )}

                            {pedido.recargo > 0 && (
                                <div className="flex justify-between text-sm text-red-600 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Tag size={14} /> Recargo aplicado
                                    </span>
                                    <span>+{formatoMoneda(totales.recargo)}</span>
                                </div>
                            )}

                            {pedido.envio > 0 && (
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Costo de envío</span>
                                    <span className="font-medium text-slate-800">{formatoMoneda(pedido.envio)}</span>
                                </div>
                            )}

                            <div className="pt-3 border-t border-slate-200/80 flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total</p>
                                    <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                                        <CheckCircle2 size={12} /> Pagado con {pedido.metodoPago}
                                    </p>
                                </div>
                                <span className="text-2xl font-black text-emerald-600">
                                    {formatoMoneda(totales.conCargos)}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                                <FileText size={14} /> Notas Adicionales
                            </label>
                            <div className="p-3.5 bg-amber-50/60 border border-amber-100 rounded-xl text-sm text-amber-900/80 leading-relaxed italic">
                                {pedido.descripcion ? <span>"{pedido.descripcion}"</span> : <span>No hay notas adicionales</span>}
                            </div>
                        </div>
                    </ScrollArea>
                </div>

            </DialogContent>

        </Dialog >
    );
};

export default PedidosDetailDialog;