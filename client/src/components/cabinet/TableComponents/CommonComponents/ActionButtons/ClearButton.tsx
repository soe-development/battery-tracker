import TableContext from "@/context/cabinet/TableContext";
import { Button } from "@mui/material";
import { useContext } from "react";

const ClearButton = () => {
  const { setActiveAddId, newRow, editRow } = useContext(TableContext);
  const handleClick = () => {
    setActiveAddId(0);
  };
  return (
    <Button
      size={"small"}
      className={"rowRedButton"}
      sx={{ backgroundColor: "secondary.light", m: "0 !important" }}
      onClick={handleClick}
      disabled={newRow.status || editRow.status}
    >
      Очистити
    </Button>
  );
};

export default ClearButton;
