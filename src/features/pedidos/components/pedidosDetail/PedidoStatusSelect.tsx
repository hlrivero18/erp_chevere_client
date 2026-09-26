import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
// Asegúrate de tener la utilidad 'cn' de shadcn, si no, puedes concatenar los strings directamente
import { cn } from "@/lib/utils";
import type { PedidoStatusRequest } from "../../types/pedidos.types";
import { updatePedidoStatusResponse } from "../../api/pedidos.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface PedidoStatusSelectProps {
    estado: string;
    idPedido: number;
}

const PedidoStatusSelect = ({ estado, idPedido }: PedidoStatusSelectProps) => {

    const getBadgeStyles = (status: string) => {
        switch (status) {
            case "Pendiente":
                return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30 dark:hover:bg-amber-500/30";
            case "Cobrado":
                return "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 dark:hover:bg-emerald-500/30";
            case "Cancelado":
                return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30 dark:hover:bg-red-500/30";
            default:
                return "bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-700";
        }
    };

    const queryClient = useQueryClient();

    const mutationUpdate = useMutation({
        mutationFn: ({ id, data }: { id: number; data: PedidoStatusRequest }) =>
            updatePedidoStatusResponse(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pedidos'] });
            toast.success("Estado actualizado con éxito");
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Error al actualizar el estado";
            toast.error(errorMessage);
        }
    });

    const onEstadoChange = (nuevoEstado: string) => {
        if (nuevoEstado === estado) return;

        mutationUpdate.mutate({
            id: idPedido,
            data: { estado: nuevoEstado }
        });
    };

    return (
        <Select
            value={estado}
            onValueChange={onEstadoChange}
            disabled={mutationUpdate.isPending}
        >
            <SelectTrigger
                className={cn(
                    "h-7 w-auto px-3 py-1 text-xs font-bold rounded-full border transition-colors shadow-none focus:ring-0 focus:ring-offset-0 gap-1.5 [&>svg]:h-3.5 [&>svg]:w-3.5",
                    getBadgeStyles(estado),
                    mutationUpdate.isPending && "opacity-50 cursor-not-allowed"
                )}
            >
                <SelectValue placeholder="Estado" />
            </SelectTrigger>

            <SelectContent align="center" className="min-w-[120px]">
                <SelectItem
                    value="Pendiente"
                    className="text-xs font-medium focus:bg-amber-50 focus:text-amber-900 dark:focus:bg-amber-950 dark:focus:text-amber-400"
                >
                    Pendiente
                </SelectItem>
                <SelectItem
                    value="Cobrado"
                    className="text-xs font-medium focus:bg-emerald-50 focus:text-emerald-900 dark:focus:bg-emerald-950 dark:focus:text-emerald-400"
                >
                    Cobrado
                </SelectItem>
                <SelectItem
                    value="Cancelado"
                    className="text-xs font-medium focus:bg-red-50 focus:text-red-900 dark:focus:bg-red-950 dark:focus:text-red-400"
                >
                    Cancelado
                </SelectItem>
            </SelectContent>
        </Select>
    );
};

export default PedidoStatusSelect;