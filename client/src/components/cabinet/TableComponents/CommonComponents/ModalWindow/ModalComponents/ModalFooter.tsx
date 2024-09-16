import React from "react";
import { Box, Button } from "@mui/material";

interface ModalFooterProps {
  onClick: () => void;
  loading: boolean;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClick, loading }) => (
  <Box sx={{ pt: 2 }}>
    <Button
      variant={"contained"}
      sx={{ m: "0 !important" }}
      onClick={onClick}
      fullWidth
      disabled={loading}
    >
      Додати запис
    </Button>
  </Box>
);

export default ModalFooter;
