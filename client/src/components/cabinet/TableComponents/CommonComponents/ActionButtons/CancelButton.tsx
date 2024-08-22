import { Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const CancelButton = () => {
  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<CancelOutlinedIcon />}
    />
  );
};

export default CancelButton;
