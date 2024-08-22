import { Button } from "@mui/material";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";

const DeleteButton = () => {
  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowRedButton"}
      startIcon={<DeleteOutlineTwoToneIcon />}
    />
  );
};

export default DeleteButton;
