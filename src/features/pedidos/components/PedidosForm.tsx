import { useEffect, useState } from "react";
import type { PedidoCreateRequest } from "../types/pedidos.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MenuItemSelector from "./MenuItemSelector";
import type { MenuItem } from "@/features/menu-items/types/menu-items.types";
import { getMenuItemsResponse } from "@/features/menu-items/api/menu-items.api";
import { createPedidosResponse } from "../api/pedidos.api";


const PedidosForm = () => {
    const [formData, setFormData] = useState<PedidoCreateRequest>({
        description: '',
        menuItems: []
    })

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const fetchMenuItems = async () => {
        const response = await getMenuItemsResponse();
        if (response.success) {
            setMenuItems(response.data.data);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await createPedidosResponse(formData);
            if (response.success) {
                setFormData({
                    description: '',
                    menuItems: []
                })

            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);
    return (
        <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="space-y-2">
                <Label htmlFor="description">
                    Descripción
                </Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="Descripción del pedido"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
            <MenuItemSelector
                menuItems={menuItems}
                selectedItems={formData.menuItems}
                onSelectionChange={(selectedItems) => setFormData({ ...formData, menuItems: selectedItems })}
            />
            <Button type="submit" className="w-full">
                Crear pedido
            </Button>
        </form>
    );
};

export default PedidosForm;