import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import LogoutMessage from '../components/LogoutMessage';
import LoginBrand from '../components/LoginBrand';
import { useBreakpoint } from '@/hooks/useBreakPoint';

const LoginPage = () => {
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const { isDesktop } = useBreakpoint();

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
    <main className="p-4 flex min-h-screen items-center justify-center bg-muted">

      {isDesktop ?
        <div className="flex items-center gap-4">
          <LoginBrand />
          <div className="w-1/2">
            <LoginForm />
          </div>
        </div>
        :
        <LoginForm />
      }
      <LogoutMessage open={openLogout} onOpen={handleOpenLogout} />

    </main>
  );
};

export default LoginPage;