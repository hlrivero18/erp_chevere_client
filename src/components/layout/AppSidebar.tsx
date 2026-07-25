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
import { Home, Package, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';

const AppSidebar = () => {
    const routes = [
        {name: "Dashboard", path: "/dashboard", icon: <Home />},
        {name: "Menu", path: "/menu-items", icon: <Package />},
        {name: "Pedidos", path: "/pedidos", icon: <ShoppingCart />},
    ]
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
                <SidebarMenuButton>
                Cerrar sesión
                </SidebarMenuButton>
            </SidebarMenuItem>

            </SidebarMenu>

        </SidebarFooter>

        </Sidebar>
    );
};

export default AppSidebar;