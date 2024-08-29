import { getTableState } from "@/store/TableState";
import AddButton from "./AddButton";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const ActionButtons = ({
  activeTable,
  row,
}: {
  activeTable: string;
  row: [];
}) => {
  const { actionMode } = getTableState(activeTable);
  const isEditMode = false;

  return actionMode === "add" ? (
    <AddButton row={row} />
  ) : isEditMode ? (
    <>
      <SaveButton />
      <CancelButton />
    </>
  ) : (
    <>
      <EditButton />
      <DeleteButton />
    </>
  );
};

export default ActionButtons;