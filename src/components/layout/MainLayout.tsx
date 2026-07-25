import { Outlet } from 'react-router';

import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import AppSidebar from './AppSidebar';

const MainLayout = () => {
  return (
    <SidebarProvider>

      <AppSidebar />

      <main className="flex-1">

        <SidebarTrigger />

        <div className="p-6">
          <Outlet />
        </div>

      </main>

    </SidebarProvider>
  );
};

export default MainLayout;