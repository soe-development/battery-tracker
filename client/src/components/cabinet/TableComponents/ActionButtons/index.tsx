import { Button, styled } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddIcon from "@mui/icons-material/Add";
import { getTableState } from "@/store/TableState";

const ActionButtons = ({ activeTable }: { activeTable: string }) => {
  console.log(activeTable);
  const { actionMode } = getTableState(activeTable);
  const isEditMode = false;

  return actionMode === "add" ? (
    <Button
      variant="contained"
      size="small"
      className={"rowModifyButtons rowGreenButton"}
      startIcon={<AddIcon />}
    />
  ) : isEditMode ? (
    <>
      <Button
        variant="contained"
        size="small"
        className={"rowModifyButtons, rowGreenButton"}
        startIcon={<SaveOutlinedIcon />}
      />
      <Button
        variant="contained"
        size="small"
        startIcon={<CancelOutlinedIcon />}
      />
    </>
  ) : (
    <>
      <Button
        variant="contained"
        size="small"
        className={"rowModifyButtons rowGreenButton"}
        startIcon={<EditTwoToneIcon />}
      />
      <Button
        variant="contained"
        size="small"
        className="rowModifyButtons rowRedButton"
        startIcon={<DeleteOutlineTwoToneIcon fontSize="large" />}
      />
    </>
  );
};

export default ActionButtons;
