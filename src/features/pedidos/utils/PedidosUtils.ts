import type { Pedido, PedidoFormData, PedidosCalTotales } from "../types/pedidos.types";


const calTotales = (pedido?: Pedido, pedidoForm?: PedidoFormData): PedidosCalTotales => {

    const source = pedidoForm ?? pedido;
    if (!source) throw new Error("Se requiere pedido o pedidoForm");

    const items = pedidoForm
        ? pedidoForm.menuItems.map(i => ({ precio: i.price, cantidad: i.cantidad }))
        : pedido!.items.map(i => ({ precio: i.precio / i.cantidad, cantidad: i.cantidad }));


    const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const subTotal = total * 0.79;
    const recargo = total * (source.recargo ?? 0) / 100;
    const descuento = total * (source.descuento ?? 0) / 100;
    const conCargos = (total + recargo - descuento) + source.envio;
    
    return { total, subTotal, conCargos, descuento, recargo };
}

const truncarTexto = (texto: string, maxCaracteres: number = 100): string => {
    if (texto.length <= maxCaracteres) return texto;
    return texto.slice(0, maxCaracteres) + "...";
};

export { calTotales, truncarTexto };