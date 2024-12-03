import { getTableState } from "@/store/TableState";
import AddButton from "./AddButton";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import TableContext from "@/context/cabinet/TableContext";
import { useContext } from "react";

const ActionButtons = ({
  activeTable,
  nameTable,
  row,
}: {
  activeTable: string;
  nameTable: string;
  row: any;
}) => {
  const { editRow } = useContext(TableContext);
  const { actionMode } = getTableState(activeTable);

  const isEditMode =
    editRow.name === (nameTable || activeTable) && editRow.row.id === row.id
      ? editRow.status
      : null;

  return actionMode === "add" ? (
    <AddButton row={row} />
  ) : isEditMode ? (
    <>
      <SaveButton />
      <CancelButton />
    </>
  ) : actionMode === "add;edit;delete" ? (
    <>
      <AddButton row={row} />
      <EditButton row={row} activeTable={nameTable || activeTable} />
      <DeleteButton row={row} activeTable={nameTable || activeTable} />
    </>
  ) : actionMode === "delete" ? (
    <>
      <DeleteButton row={row} activeTable={nameTable || activeTable} />
    </>
  ) : (
    <>
      <EditButton row={row} activeTable={nameTable || activeTable} />
      <DeleteButton row={row} activeTable={nameTable || activeTable} />
    </>
  );
};

export default ActionButtons;
