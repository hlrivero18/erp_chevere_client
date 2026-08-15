import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import PedidosForm from "../components/PedidosForm";
import { useState } from "react";
import type { PedidoCreateRequest, PedidoFormData } from "../types/pedidos.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPedidosResponse, updatePedidosResponse } from "../api/pedidos.api";
import { toast } from "sonner";
import { validatePedidosFormData } from "../validators/PedidosFormValidator";
import PedidoResumen from "../components/PedidoResumen";

interface PedidosCreateDialogProps {
    formDataEdit?: PedidoFormData | null
    idEdit?: number | null
}

const PedidosCreate = ({ formDataEdit, idEdit }: PedidosCreateDialogProps) => {
    const [formData, setFormData] = useState<PedidoFormData>({
        description: formDataEdit?.description || '',
        metodoPago: formDataEdit?.metodoPago || '',
        estado: formDataEdit?.estado || '',
        envio: formDataEdit?.envio || null,
        descuento: formDataEdit?.descuento || null,
        menuItems: formDataEdit?.menuItems || []
    })

    const queryClient = useQueryClient();

    const handleTotales = (): { total: number; subTotal: number, conEnvio: number, conDescuento: number, totalDesEnvio: number } => {
        const total = formData.menuItems.map((item) => item.price * item.cantidad).reduce((a, b) => a + b, 0);
        const subTotal = total * 0.79;
        const conEnvio = total + formData.envio;
        const porcentaje = formData.descuento != 0 ? formData.descuento / 100 : 0;
        const conDescuento = total - (total * porcentaje);
        const totalDesEnvio = (conDescuento) + formData.envio;
        return { total, subTotal, conEnvio, conDescuento, totalDesEnvio };
    }

    const handleDeleteItem = (id: number) => {
        const newMenuItems = formData.menuItems.filter((item) => item.id !== id);
        setFormData({ ...formData, menuItems: newMenuItems });
    }

    const mutationCreate = useMutation({
        mutationFn: createPedidosResponse,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['pedidos']
            });
            setFormData({
                description: '',
                metodoPago: '',
                estado: '',
                menuItems: [],
                envio: null,
                descuento: null,
            })
            toast.success("Pedido creado con éxito");
        },
        onError: () => {
            toast.error("Error al crear el pedido");
        }
    });

    const mutationUpdate = useMutation({
        mutationFn: ({ id, data }: {
            id: number;
            data: PedidoCreateRequest;
        }) => updatePedidosResponse(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['pedidos']
            });
            toast.success("Pedido actualizado con éxito");
        },
        onError: () => {
            toast.error("Error al actualizar el pedido");
        }
    });

    const handleSubmit = async () => {

        const totales = handleTotales();

        if (!validatePedidosFormData(formData)) {
            return;
        }

        const parseformData: PedidoCreateRequest = {
            description: formData.description,
            metodoPago: formData.metodoPago,
            estado: formData.estado,
            menuItems: formData.menuItems.map((item) => {
                return {
                    id: item.id,
                    quantity: item.cantidad
                }
            }),
            total: totales.conDescuento,
            subTotal: totales.subTotal,
            envio: formData.envio || 0,
            descuento: formData.descuento || 0
        }

        if (!formDataEdit) {
            mutationCreate.mutate(parseformData);
        } else {
            mutationUpdate.mutate({ id: idEdit, data: parseformData });
        }

    }

    const isSubmitting = mutationCreate.isPending;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 dark:bg-slate-900 dark:text-slate-100">
            {/* Header Superior */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-4">
                    <Link to={'/pedidos'}>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors dark:hover:bg-slate-800">
                            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Crear Pedido</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Completa los datos para registrar un nuevo pedido.</p>
                    </div>
                </div>
            </header>

            <div className='grid grid-cols-2 p-4 gap-4'>
                <PedidosForm
                    isEdit={formDataEdit != null}
                    formData={formData}
                    setFormData={setFormData}
                    onsubmit={handleSubmit}
                />
                <PedidoResumen
                    formData={formData}
                    setFormData={setFormData}
                    totales={handleTotales()}
                    onDeleteItem={handleDeleteItem}
                    onsubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </div>

        </div>
    );
};

export default PedidosCreate;