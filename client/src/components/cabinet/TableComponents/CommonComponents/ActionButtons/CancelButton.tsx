import { Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const CancelButton = ({ setNewRow }: any) => {
  const handleClick = () => {
    setNewRow({ status: false, name: "" });
  };

  return (
    <Button
      variant="contained"
      size="small"
      className="rowModifyButtons rowRedButton"
      startIcon={<CancelOutlinedIcon />}
      onClick={handleClick}
    />
  );
};

export default CancelButton;
