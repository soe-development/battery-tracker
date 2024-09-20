import { Button } from "@mui/material";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { deleteEntry } from "@/api/table/table";
import TableContext from "@/context/cabinet/TableContext";
import { useContext } from "react";

const DeleteButton = ({
  row,
  activeTable: nameTable,
}: {
  row: any;
  activeTable: any;
}) => {
  const { setUpdate, setSnackbarState, setOpenSnackbar, newRow, editRow } =
    useContext(TableContext);

  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowRedButton"}
      startIcon={<DeleteOutlineTwoToneIcon />}
      onClick={() => {
        deleteEntry(nameTable, row.id).finally(() => {
          setUpdate((prev: boolean) => {
            return !prev;
          });
          setSnackbarState({
            type: "success",
            mainText: "Дані успішно видалено!",
            helperText: "",
          });
          setOpenSnackbar(true);
        });
      }}
      disabled={newRow.status || editRow.status}
    />
  );
};

export default DeleteButton;
