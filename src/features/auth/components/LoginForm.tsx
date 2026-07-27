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

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
        <Card className="w-full max-w-md">
        <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>

            <CardDescription>
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