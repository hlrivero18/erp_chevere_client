import { useEffect, useState } from 'react';
import PedidosTable from '../components/PedidosTable';

import type { Pedido } from '../types/pedidos.types';
import { getPedidosResponse } from '../api/pedidos.api';
import PedidosCreateDialog from '../components/PedidosCreateDialog';

const PedidosPage = () => {

    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    // const [loading, setLoading] = useState(false);

    const loadPedidos = async () => {
        try {
            const response = await getPedidosResponse();
            if (response.success) {
                setPedidos(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadPedidos();
    }, []);

    return (
        <div className="space-y-6">

            <div className='flex items-center justify-between'>
                
                <div>
                    <h1 className="text-2xl font-semibold">
                        Pedidos
                    </h1>
                    <p className="text-muted-foreground">
                        Consulta y gestiona los pedidos registrados.
                    </p>
                </div>

                <PedidosCreateDialog/>

            </div>

            <PedidosTable pedidos={pedidos} />

        </div>
    );
};

export default PedidosPage;