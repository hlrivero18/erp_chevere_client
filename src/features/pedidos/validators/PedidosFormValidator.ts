import type { PedidoFormData } from "../types/pedidos.types";
import { z } from "zod";
import { toast } from "sonner";

const pedidoSchema = z.object({
    description: z.string().optional(),
    metodoPago: z.string().min(1, "Selecciona un método de pago"),
    estado: z.string().min(1, "Selecciona un estado"),
    menuItems: z.array(z.object({
        id: z.number(),
        cantidad: z.number().min(1, "La cantidad debe ser mayor a 0")
    })).min(1, "Debe haber al menos un item")
})


export const validatePedidosFormData = (formData: PedidoFormData) => {
    const validation = pedidoSchema.safeParse(formData);

    if (!validation.success) {
        validation.error.issues.forEach((issue) => {
            toast.error(issue.message);
        });
        return false;
    }

    return true;
}