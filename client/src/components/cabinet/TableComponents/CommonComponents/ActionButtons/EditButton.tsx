import { Button } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const EditButton = () => {
  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowGreenButton"}
      startIcon={<EditTwoToneIcon />}
    />
  );
};

export default EditButton;
