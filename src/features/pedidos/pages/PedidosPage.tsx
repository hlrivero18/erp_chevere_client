import PedidosTable from '../components/PedidosTable';
import PedidosCreateDialog from '../components/PedidosCreateDialog';

const PedidosPage = () => {

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

            <PedidosTable />

        </div>
    );
};

export default PedidosPage;