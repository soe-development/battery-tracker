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

  const handleDelete = async () => {
    const result = await deleteEntry(nameTable, row.id);
    setSnackbarState({
      type: result.status === 201 ? "success" : "error",
      mainText:
        result.status === 201
          ? "Дані успішно видалено!"
          : "Не можливо видалити запис! Запис задіяно!",
      helperText: result.status === 201 ? "" : result.message,
    });
    setOpenSnackbar(true);
    setUpdate((prev) => !prev);
  };

  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowRedButton"}
      startIcon={<DeleteOutlineTwoToneIcon />}
      onClick={handleDelete}
      disabled={newRow.status || editRow.status}
    />
  );
};

export default DeleteButton;
