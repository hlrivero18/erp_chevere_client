import type { PedidoFormData } from "../types/pedidos.types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MenuItemSelector from "./MenuItemSelector";


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
        <form className="space-y-6" onSubmit={onsubmit}>

            <div className="space-y-2">
                <Label htmlFor="description">
                    Descripción
                </Label>
                <Textarea
                    id="description"
                    placeholder="Descripción del pedido"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
            <MenuItemSelector
                selectedItems={formData.menuItems}
                onSelectionChange={(selectedItems) => setFormData({ ...formData, menuItems: selectedItems })}
            />
            
        </form>
    );
};

export default PedidosForm;