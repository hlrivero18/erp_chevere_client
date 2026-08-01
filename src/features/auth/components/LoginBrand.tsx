import logoDark from "../../../assets/logos/FOFull.png"
import logoLight from "../../../assets/logos/FCFull.png"
import { useTheme } from 'next-themes';

const LoginBrand = () => {
    const { theme } = useTheme();

    return (
        <div>
            <figure className="max-w-[300px]">
               <img src={theme === 'dark' ? logoDark : logoLight} alt="logo del local" /> 
            </figure>
            <h1 className="text-xl font-bold">Bienvenido al sistema de gestión</h1>
            <p className="text-muted-foreground">Plataforma integral para el monitoreo, análisis y reportes de indicadores de rendimiento comercial</p>
            
        </div>
    );
};

export default LoginBrand;