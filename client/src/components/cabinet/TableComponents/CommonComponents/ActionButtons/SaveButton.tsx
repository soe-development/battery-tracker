import { Button } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const SaveButton = () => {
  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons, rowGreenButton"}
      startIcon={<SaveOutlinedIcon />}
    />
  );
};

export default SaveButton;
