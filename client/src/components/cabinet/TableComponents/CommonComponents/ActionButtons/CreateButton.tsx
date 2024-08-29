import TableContext from "@/context/cabinet/TableContext";
import { Button } from "@mui/material";
import { useContext } from "react";

const CreateButton = () => {
  const { setNewRowBottomTable } = useContext(TableContext);
  const handleClick = () => {
    setNewRowBottomTable(true);
  };
  return (
    <Button
      size={"small"}
      className={"rowGreenButton"}
      sx={{ backgroundColor: "secondary.light", m: "0 !important" }}
      onClick={handleClick}
    >
      Додати запис
    </Button>
  );
};

export default CreateButton;
