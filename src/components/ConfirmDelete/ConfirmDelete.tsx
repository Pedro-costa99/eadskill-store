import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDeleteFormProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteForm: React.FC<ConfirmDeleteFormProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Excluir Produto</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
          Tem certeza que deseja excluir este produto?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          size="small"
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          size="small"
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteForm;
