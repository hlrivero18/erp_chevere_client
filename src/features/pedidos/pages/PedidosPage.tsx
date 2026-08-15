import { Button } from '@/components/ui/button';
import PedidosTable from '../components/PedidosTable';
import { Link } from 'react-router';

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

                <div>
                    <Link
                    to="/pedidos/nuevo"
                    >
                        <Button>
                            Nuevo pedido
                        </Button>
                    </Link>
                </div>

            </div>

            <PedidosTable />

        </div>
    );
};

export default PedidosPage;