import {
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import TableContext from "@/context/cabinet/TableContext";
import { getTableState, tabs } from "@/store/TableState";
import ActionButtons from "../../CommonComponents/ActionButtons";
import { applyFilters, compare } from "../../../../../utils/tfunctions";
import TRowExpandble from "../../CommonComponents/TRowExpandble";

const TBodyTop = ({ activeTable }: { activeTable: string }) => {
  const {
    rowsTopTable,
    filtersTopTable,
    pageTopTable,
    rowsPerPageTopTable,
    orderTopTable,
    orderByTopTable,
    editRow,
    setEditRow,
  } = useContext(TableContext);

  const [selectedRowNumber, setSelectedRowNumber] = useState<number | null>(
    null
  );

  const { exceptionKeyColumn, expandbleRow, editableFields } =
    getTableState(activeTable);

  const sortedAndFilteredRows = rowsTopTable
    .filter((row) => applyFilters(row, filtersTopTable))
    .sort((a, b) => compare(a, b, orderTopTable, orderByTopTable))
    .slice(
      pageTopTable * rowsPerPageTopTable,
      pageTopTable * rowsPerPageTopTable + rowsPerPageTopTable
    );

  return (
    <TableBody>
      {sortedAndFilteredRows.map((row: any, index: number) =>
        expandbleRow ? (
          <TRowExpandble key={index} row={row} activeTable={activeTable}>
            <TableCell>
              {editRow.name === row.nameTable && editRow.row.id === row.id ? (
                <TextField
                  defaultValue={editRow.row.name}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setEditRow((prevEditRow: any) => {
                      const updatedRow = {
                        ...prevEditRow.row,
                        name: newValue,
                      };
                      return {
                        ...prevEditRow,
                        row: updatedRow,
                      };
                    });
                  }}
                  size={"small"}
                  sx={{ width: "100%", backgroundColor: "secondary.light" }}
                >
                  {editRow.row.name}
                </TextField>
              ) : (
                <Typography sx={{ fontWeight: 600 }}>{row.name}</Typography>
              )}
            </TableCell>
            <TableCell>
              <ActionButtons
                activeTable={activeTable}
                row={row}
                nameTable={row.nameTable}
              />
            </TableCell>
          </TRowExpandble>
        ) : (
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
                  tabs.includes(row.nameTable || activeTable) ? (
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
        )
      )}
    </TableBody>
  );
};

export default TBodyTop;
