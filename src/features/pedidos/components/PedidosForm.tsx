import type { PedidoFormData } from "../types/pedidos.types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MenuItemSelector from "./MenuItemSelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const PedidosForm = ({
    formData,
    setFormData,
    onsubmit
}: {
    formData: PedidoFormData;
    setFormData: (formData: PedidoFormData) => void;
    onsubmit: () => void;
}) => {
    return (
        <form className="space-y-4" onSubmit={onsubmit}>

            <div className="grid grid-cols-2 gap-4">

                <div className="space-y-2">
                    <Label htmlFor="metodoPago">
                        Método de pago*
                    </Label>

                    <Select
                        id="metodoPago"
                        value={formData.metodoPago}
                        onValueChange={(value) => setFormData({ ...formData, metodoPago: value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar método de pago" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Efectivo">Efectivo</SelectItem>
                            <SelectItem value="Transferencia">Transferencia</SelectItem>
                            <SelectItem value="Debito">Tarjeta Débito</SelectItem>
                            <SelectItem value="Credito">Tarjeta Crédito</SelectItem>
                            <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="estado">
                        Estado*
                    </Label>

                    <Select
                        id="estado"
                        value={formData.estado}
                        onValueChange={(value) => setFormData({ ...formData, estado: value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                            <SelectItem value="Cobrado">Cobrado</SelectItem>
                            {/* <SelectItem value="Cancelado">Cancelado</SelectItem> */}
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <MenuItemSelector
                selectedItems={formData.menuItems}
                onSelectionChange={(selectedItems) => setFormData({ ...formData, menuItems: selectedItems })}
            />
            <div className="space-y-2">
                <Label htmlFor="description">
                    Notas
                </Label>
                <Textarea
                    id="description"
                    placeholder="Notas adicionales del pedido"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

        </form>
    );
};

export default PedidosForm;