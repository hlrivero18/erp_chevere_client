import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import LogoutMessage from '../components/LogoutMessage';

const LoginPage = () => {
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  const handleOpenLogout = (open: boolean) => {
    setOpenLogout(open);
    localStorage.removeItem('logoutReason');
  };

  useEffect(() => {
    if (localStorage.getItem('logoutReason')) {
      setOpenLogout(true);
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted">
      <LoginForm />
      <LogoutMessage open={openLogout} onOpen={handleOpenLogout} />
    </main>
  );
};

export default LoginPage;