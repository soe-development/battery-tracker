import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContext from "@/context/cabinet/TableContext";
import { useContext } from "react";

const AddButton = ({ row }: { row: any }) => {
  const { setActiveAddId, newRow, editRow } = useContext(TableContext);

  const handleClick = () => {
    setActiveAddId(row.id);
  };

  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowGreenButton"}
      startIcon={<AddIcon />}
      onClick={handleClick}
      disabled={newRow.status || editRow.status}
    />
  );
};

export default AddButton;
