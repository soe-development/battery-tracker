import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddButton = () => {
  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowGreenButton"}
      startIcon={<AddIcon />}
    />
  );
};

export default AddButton;
