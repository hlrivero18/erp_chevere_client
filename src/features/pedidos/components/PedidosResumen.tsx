import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import type { MenuItemFormData, PedidoFormData } from "../types/pedidos.types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"

const PedidosResumen = ({
    formData,
    setFormData,
    totales,
    onDeleteItem,
    onsubmit,
    isSubmitting
}: {
    formData: PedidoFormData;
    setFormData: (data: PedidoFormData) => void;
    totales: { total: number; subTotal: number }
    onDeleteItem: (id: number) => void;
    onsubmit: () => void;
    isSubmitting: boolean;
}) => {

    const handleUpdateQuantity = (item: MenuItemFormData, quantity: number) => {

        const isSelected = formData.menuItems.find((mitem) => mitem.id === item.id);

        if (isSelected) {
            const newCantidad = isSelected.cantidad + quantity

            if (newCantidad <= 0) {
                onDeleteItem(item.id)
            } else {
                setFormData({
                    ...formData, menuItems: formData.menuItems.map((mitem) => mitem.id === item.id ? { ...mitem, cantidad: newCantidad } : mitem)
                })
            }
        }
    };

    return (
        <div className="w-full  bg-zinc-50/50 dark:bg-zinc-900/20 p-4 flex flex-col justify-between">
            <div className="flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Resumen
                    </h3>
                    <Badge className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                        {formData.menuItems.reduce((acc, item) => acc + item.cantidad, 0)} items
                    </Badge>
                </div>
            </div>
            <ScrollArea className="flex-1 pr-1 max-h-[250px]">
                {formData.menuItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12 text-zinc-400 space-y-2">
                        <ShoppingBag className="h-10 w-10 stroke-[1.2]" />
                        <p className="text-sm">El pedido está vacío.</p>
                        <p className="text-xs text-zinc-400">Selecciona items del catálogo para comenzar.</p>
                    </div>
                ) : (
                    <div className="space-y-2.5 pr-2">
                        {formData.menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col gap-2"
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <span className="text-sm font-medium leading-snug">
                                        {item.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => onDeleteItem(item.id)}
                                        className="text-zinc-400 hover:text-red-500 transition-colors p-0.5"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>

                                {/* Controles de Cantidad y Precio */}
                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-md bg-zinc-50 dark:bg-zinc-950">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 rounded-r-none"
                                            onClick={() => handleUpdateQuantity(item, -1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>

                                        <span className="w-8 text-center text-xs font-mono font-medium">
                                            {item.cantidad}
                                        </span>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 rounded-l-none"
                                            onClick={() => handleUpdateQuantity(item, 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <span className="text-sm font-mono font-semibold">
                                        ${(item.price * item.cantidad).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>
            <div className="pt-4 mt-auto border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-zinc-500">
                        <span>Subtotal</span>
                        <span className="font-mono">${totales.subTotal}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400">
                            ${totales.total}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <DialogClose
                        render={
                            <Button
                                type="button"
                                variant="outline"
                                className="w-1/3"
                                data-slot="dialog-close"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </Button>
                        }
                    />
                    {/* <Button
                        type="button"
                        variant="outline"
                        className="w-1/3"
                        data-slot="dialog-close"
                    // onClick={onClose}
                    >
                        Cancelar
                    </Button> */}

                    <Button
                        type="button"
                        className="w-2/3"
                        // disabled={selectedItems.length === 0 || isSubmitting}
                        onClick={onsubmit}
                    >
                        Confirmar Pedido
                    </Button>
                </div>
            </div>
        </div>
    )

}

export default PedidosResumen