import { TableBody, TableRow, TableCell, TextField } from "@mui/material";
import { useContext, useState } from "react";
import TableContext from "@/context/cabinet/TableContext";
import { getTableState, tabs } from "@/store/TableState";
import ActionButtons from "../../CommonComponents/ActionButtons";
import { applyFilters, compare } from "../../../../../utils/tfunctions";

const TBodyBottom = ({ activeTable }: { activeTable: string }) => {
  const {
    rowsBottomTable,
    filtersBottomTable,
    orderBottomTable,
    orderByBottomTable,
    editRow,
    setEditRow,
  } = useContext(TableContext);

  const [selectedRowNumber, setSelectedRowNumber] = useState<number | null>(
    null
  );

  const { exceptionKeyColumn, editableFields } = getTableState(activeTable);

  const sortedAndFilteredRows = rowsBottomTable
    .filter((row) => applyFilters(row, filtersBottomTable))
    .sort((a, b) => compare(a, b, orderBottomTable, orderByBottomTable));

  console.log(editRow);

  return (
    <TableBody>
      {sortedAndFilteredRows.map((row: any, index: number) => (
        <TableRow
          key={index}
          onClick={() => setSelectedRowNumber(row.rowNumber)}
          selected={selectedRowNumber === row.rowNumber}
          hover
        >
          {Object.keys(row)
            .filter((key) => !exceptionKeyColumn?.includes(key))
            .map((key) => (
              <TableCell key={key} sx={{ padding: "4px 15px", fontSize: 16 }}>
                {editRow.row.id === row.id &&
                editableFields.includes(key) &&
                !tabs.includes(activeTable) ? (
                  <TextField
                    defaultValue={editRow.row[key]}
                    size={"small"}
                    sx={{ width: "100%", backgroundColor: "secondary.light" }}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditRow((prevEditRow: any) => {
                        const updatedRow = {
                          ...prevEditRow.row,
                          [key]: newValue,
                        };
                        return {
                          ...prevEditRow,
                          row: updatedRow,
                        };
                      });
                    }}
                  />
                ) : (
                  row[key]
                )}
              </TableCell>
            ))}
          {!exceptionKeyColumn?.includes("actions") && (
            <TableCell sx={{ padding: "4px 15px", fontSize: 16 }}>
              <ActionButtons
                activeTable={activeTable}
                row={row}
                nameTable={row.nameTable || ""}
              />
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TBodyBottom;
