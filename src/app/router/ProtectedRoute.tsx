import { Navigate, Outlet } from 'react-router';
import { isAuthenticated } from '@/features/auth/services/auth.service';

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;