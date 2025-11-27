import { useState } from "react";
import ConfirmDialog from "../components/Common/ConfirmDialog";

interface UseConfirmDialogProps {
  title?: string;
  message?: string;
  onConfirm?: () => void;
}
export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<UseConfirmDialogProps>({});

  const openConfirmDialog = (opts: UseConfirmDialogProps) => {
    setOptions(opts);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (options.onConfirm) options.onConfirm();
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  const ConfirmDialogComponent = (
    <ConfirmDialog
      open={open}
      title={options.title}
      message={options.message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { ConfirmDialogComponent, openConfirmDialog };
}
