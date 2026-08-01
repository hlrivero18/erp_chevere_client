import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { loginRequest } from '../api/auth.api';
import { useNavigate } from 'react-router';
import { saveToken } from '../services/auth.service';
import { toast } from 'sonner';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import logoDark from '../../../assets/logos/FOFull.png'
import logoLight from '../../../assets/logos/FCFull.png'
import { useTheme } from 'next-themes';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { isDesktop } = useBreakpoint();
    const { theme } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await loginRequest(formData);
            if (res.success) {
                saveToken(res);
                navigate('/');
                toast.success('Inicio de sesión exitoso');
            }
        } catch (error) {
            toast.error('Credenciales incorrectas');
        }
    };
    return (
        <Card className="shadow-xl w-full max-w-md">
            <CardHeader className='text-center'>
                {!isDesktop && (
                    <figure className="max-w-[300px] m-auto mb-4">
                        <img src={theme === 'dark' ? logoDark : logoLight} alt="logo" />
                    </figure>
                )}
                <CardTitle className='text-2xl font-bold'>
                    {!isDesktop ? 'Bienvenido al sistema de gestión' : 'Inicia sesión'}
                </CardTitle>

                <CardDescription className='r'>
                    Ingresa tus credenciales para acceder al sistema.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Correo electrónico
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            className='rounded-sm'
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Contraseña
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            className='rounded-sm'
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Iniciar sesión
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;