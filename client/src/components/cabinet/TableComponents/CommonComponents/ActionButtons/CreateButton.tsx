import TableContext from "@/context/cabinet/TableContext";
import { Button } from "@mui/material";
import { useContext } from "react";

const CreateButton = ({ name }: { name: string }) => {
  const { newRow, setNewRow, editRow } = useContext(TableContext);

  return (
    <Button
      size={"small"}
      className={"rowGreenButton"}
      sx={{ backgroundColor: "secondary.light", m: "0 !important" }}
      onClick={() => {
        setNewRow({ status: true, name: name });
      }}
      disabled={newRow.status || editRow.status}
    >
      Додати запис
    </Button>
  );
};

export default CreateButton;
