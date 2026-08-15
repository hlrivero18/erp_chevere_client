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
import { BookOpenText, Home, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import logoDark from '../../assets/logos/PNFO.png'
import logoLight from '../../assets/logos/PNFC.png'
import { useTheme } from 'next-themes';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const AppSidebar = () => {
    const routes = [
        { name: "Dashboard", path: "/", icon: <Home /> },
        { name: "Menu", path: "/menu-items", icon: <BookOpenText /> },
    ]

    const folder = [
        {
            name: "Pedidos",
            icon: <ShoppingCart />,
            items: [
                {
                    title: "Listado de pedidos",
                    url: "/pedidos",
                },
                {
                    title: "Nuevo pedido",
                    url: "/pedidos/nuevo",
                },
            ]
        },
    ]
    const navigate = useNavigate();
    const { theme } = useTheme();

    return (
        <Sidebar className='border-r-slate-300 dark:border-r-slate-900'>

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

                            {folder.map((item, idx) => (
                                <SidebarMenuItem key={idx}>
                                    <Collapsible>
                                        <CollapsibleTrigger>
                                            <SidebarMenuButton>
                                                {item.icon} {item.name}
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenu>
                                                {item.items.map((subItem, subIdx) => (
                                                    <SidebarMenuItem key={subIdx}>
                                                        <SidebarMenuButton>
                                                            <Link className='flex flex-1 items-center gap-2 dark:hover:text-primary' to={subItem.url}>
                                                                {subItem.title}
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ))}
                                            </SidebarMenu>
                                        </CollapsibleContent>

                                    </Collapsible>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>

                <SidebarMenu>
                    <SidebarMenuItem>
                        {/* <SidebarMenuButton className='m-0 p-0'> */}
                        <ThemeToggle />
                        {/* </SidebarMenuButton> */}
                    </SidebarMenuItem>

                    <SidebarMenuItem>
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