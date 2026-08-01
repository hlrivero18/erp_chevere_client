import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { removeToken } from '@/features/auth/services/auth.service';
import ThemeToggle from '@/features/theme/components/ThemeToggle';
import { Home, Package, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import logoDark from '../../assets/logos/PNFO.png'
import logoLight from '../../assets/logos/PNFC.png'
import { useTheme } from 'next-themes';

const AppSidebar = () => {
    const routes = [
        { name: "Dashboard", path: "/dashboard", icon: <Home /> },
        { name: "Menu", path: "/menu-items", icon: <Package /> },
        { name: "Pedidos", path: "/pedidos", icon: <ShoppingCart /> },
    ]
    const navigate = useNavigate();
    const { theme } = useTheme();
    
    return (
        <Sidebar>

            <SidebarContent>

                <SidebarGroup>

                    <SidebarGroupLabel className='p-4 text-xl flex flex-1 items-center gap-2 hover:text-primary'>
                        <Link className='flex items-center gap-2' to={'/'}>
                            {theme == 'dark' ? 
                            <img className='w-8' src={logoDark} alt="logo del local" />
                            :
                            <img className='w-8' src={logoLight} alt="logo del local" />
                            }
                            
                            ERP Chévere
                        </Link>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>

                        <SidebarMenu>

                            {routes.map((route, idx) => (
                                <SidebarMenuItem key={idx}>
                                    <SidebarMenuButton >
                                        <Link className='flex flex-1 items-center gap-2 dark:hover:text-primary' to={route.path}>
                                            {route.icon} {route.name}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>

                <SidebarMenu>

                    <SidebarMenuItem>
                        <ThemeToggle />
                        <SidebarMenuButton onClick={() => { removeToken(); navigate("/login"); }}>
                            Cerrar sesión
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>

            </SidebarFooter>

        </Sidebar>
    );
};

export default AppSidebar;