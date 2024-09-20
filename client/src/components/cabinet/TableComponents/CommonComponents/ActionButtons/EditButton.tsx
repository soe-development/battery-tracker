import { Button } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import TableContext from "@/context/cabinet/TableContext";
import { useContext } from "react";

const EditButton = ({
  row,
  activeTable: nameTable,
}: {
  row: any;
  activeTable: any;
}) => {
  const { newRow, setEditRow } = useContext(TableContext);

  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowGreenButton"}
      startIcon={<EditTwoToneIcon />}
      onClick={() => {
        setEditRow({ status: true, name: nameTable, row: row });
      }}
      disabled={newRow.status}
    />
  );
};

export default EditButton;
