import TableContext from "@/context/cabinet/TableContext";
import { Button } from "@mui/material";
import { useContext } from "react";

const CreateButton = ({ name }: { name: string }) => {
  const { setNewRow } = useContext(TableContext);

  return (
    <Button
      size={"small"}
      className={"rowGreenButton"}
      sx={{ backgroundColor: "secondary.light", m: "0 !important" }}
      onClick={() => {
        setNewRow({ status: true, name: name });
      }}
    >
      Додати запис
    </Button>
  );
};

export default CreateButton;
