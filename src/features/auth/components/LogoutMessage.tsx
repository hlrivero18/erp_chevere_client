import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type LogoutMessageType = {
    open: boolean;
    onOpen: (open: boolean) => void;
};

const LogoutMessage = ({ open, onOpen }: LogoutMessageType) => {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sesión expirada</DialogTitle>
          <DialogDescription>
            Tu sesión ha expirado. Por favor, inicia sesión de nuevo.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutMessage;