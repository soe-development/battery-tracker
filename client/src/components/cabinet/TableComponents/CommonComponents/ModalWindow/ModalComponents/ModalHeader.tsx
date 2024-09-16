import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalHeaderProps {
  onClose: () => void;
  title: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose, title }) => (
  <Box sx={{ mb: 3 }}>
    <IconButton
      sx={{ position: "absolute", top: 8, right: 8 }}
      onClick={onClose}
    >
      <CloseIcon />
    </IconButton>
    <Box sx={{ textAlign: "center", mb: 2 }}>{title}</Box>
  </Box>
);

export default ModalHeader;
