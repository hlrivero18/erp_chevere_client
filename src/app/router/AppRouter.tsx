import { Routes, Route } from 'react-router';

import LoginPage from '@/features/auth/pages/LoginPage';
import MenuItemsPage from '@/features/menu-items/pages/MenuItemsPage';

import ProtectedRoute from './ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';
import PedidosPage from '@/features/pedidos/pages/PedidosPage';

const AppRouter = () => {
  return (
    <Routes>

      {/* Rutas públicas */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={null}
          />
          <Route
            path="/menu-items"
            element={<MenuItemsPage />}
          />
          <Route
            path="/pedidos"
            element={<PedidosPage />}
          />
        </Route>

      </Route>

    </Routes>
  );
};

export default AppRouter;