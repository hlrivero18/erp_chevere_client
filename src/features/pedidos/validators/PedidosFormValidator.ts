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
    })).min(1, "Debe haber al menos un item"),
    envio: z.number().min(0, "El envio debe ser mayor o igual a 0").optional(),
    descuento: z.number().min(0, "El descuento debe ser mayor o igual a 0").max(100, "El descuento debe ser menor o igual a 100").optional(),
    recargo: z.number().min(0, "El recargo debe ser mayor o igual a 0").max(100, "El recargo debe ser menor o igual a 100").optional(),
})


export const validatePedidosFormData = (formData: PedidoFormData) => {
    if (formData.envio == null) {
        formData.envio = 0;
    }
    if (formData.descuento == null) {
        formData.descuento = 0;
    }
    if (formData.recargo == null) {
        formData.recargo = 0;
    }
    const validation = pedidoSchema.safeParse(formData);

    if (!validation.success) {
        validation.error.issues.forEach((issue) => {
            toast.error(issue.message);
        });
        return false;
    }

    return true;
}