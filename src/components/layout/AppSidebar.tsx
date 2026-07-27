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
import { Home, Package, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const AppSidebar = () => {
    const routes = [
        {name: "Dashboard", path: "/dashboard", icon: <Home />},
        {name: "Menu", path: "/menu-items", icon: <Package />},
        {name: "Pedidos", path: "/pedidos", icon: <ShoppingCart />},
    ]
    const navigate = useNavigate();
    return (
        <Sidebar>

        <SidebarContent>

            <SidebarGroup>

            <SidebarGroupLabel>
                ERP Chévere
            </SidebarGroupLabel>

            <SidebarGroupContent>

                <SidebarMenu>

                    {routes.map((route, idx) => (
                        <SidebarMenuItem key={idx}>
                            <SidebarMenuButton>
                                <Link to={route.path}>
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
                <SidebarMenuButton onClick={() => {removeToken(); navigate("/login");}}>
                Cerrar sesión
                </SidebarMenuButton>
            </SidebarMenuItem>

            </SidebarMenu>

        </SidebarFooter>

        </Sidebar>
    );
};

export default AppSidebar;