import { Button } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TableContext from "@/context/cabinet/TableContext";
import { useContext } from "react";
import { editEntry } from "@/api/table/table";
import { getTableState } from "@/store/TableState";
import { isNotEmptyField } from "@/utils/validation";

const SaveButton = () => {
  const { editRow, setEditRow, setUpdate, setSnackbarState, setOpenSnackbar } =
    useContext(TableContext);

  const { editableFields, headColumnData } = getTableState(editRow.name);

  const validateFields = (updatedRow: Record<string, any>) => {
    const errors: string[] = [];

    const isValid = Object.entries(updatedRow).every(([key, value]) => {
      if (!editableFields.includes(key)) return true;

      const fieldInfo = headColumnData.find(
        (element: any) => element.name === key
      );

      if (!fieldInfo || !isNotEmptyField(value as string)) {
        errors.push(fieldInfo?.label ?? key);
        return false;
      }
      return true;
    });

    return { isValid, errors };
  };

  const handleClick = () => {
    const updatedRow = { ...editRow.row };
    delete updatedRow.rowNumber;

    const { isValid, errors } = validateFields(updatedRow);

    if (isValid) {
      editEntry(editRow.name, updatedRow).then(() => {
        setUpdate((prev) => !prev);
        setEditRow({ status: false, name: "", row: {} });
        setSnackbarState({
          type: "success",
          mainText: "Дані успішно збережено!",
          helperText: "",
        });
        setOpenSnackbar(true);
      });
    } else {
      setSnackbarState({
        type: "error",
        mainText: (
          <>
            Не всі обов&apos;язкові поля заповнені! <br /> Поля, які не
            заповнені:
          </>
        ),
        helperText: errors.join("; ") + ";",
      });
      setOpenSnackbar(true);
    }
  };

  return (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowGreenButton"}
      startIcon={<SaveOutlinedIcon />}
      onClick={handleClick}
    />
  );
};

export default SaveButton;
