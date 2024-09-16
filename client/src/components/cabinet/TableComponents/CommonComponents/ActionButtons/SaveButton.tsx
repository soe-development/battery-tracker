import { Button } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const SaveButton = ({ setNewRow }: any) => {
  const handleClick = () => {
    setNewRow({ status: false, name: "" });
  };

  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowGreenButton"}
      startIcon={<SaveOutlinedIcon />}
      onClick={handleClick}
    />
  );
};

export default SaveButton;
