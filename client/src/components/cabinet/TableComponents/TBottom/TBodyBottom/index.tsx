import { TableBody, TableRow, TableCell } from "@mui/material";
import { useContext, useState } from "react";
import TableContext from "@/context/cabinet/TableContext";
import { getTableState } from "@/store/TableState";
import ActionButtons from "../../CommonComponents/ActionButtons";
import { applyFilters, compare } from "../../CommonComponents/tfunctions";
import TNewRow from "./TNewRow";

const TBodyBottom = ({ activeTable }: { activeTable: string }) => {
  const {
    rowsBottomTable,
    filtersBottomTable,
    orderBottomTable,
    orderByBottomTable,
    newRowBottomTable,
  } = useContext(TableContext);

  const [selectedRowNumber, setSelectedRowNumber] = useState<number | null>(
    null
  );

  const { exceptionKeyColumn } = getTableState(activeTable);

  const sortedAndFilteredRows = rowsBottomTable
    .filter((row) => applyFilters(row, filtersBottomTable))
    .sort((a, b) => compare(a, b, orderBottomTable, orderByBottomTable));

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
                {row[key]}
              </TableCell>
            ))}
          {!exceptionKeyColumn?.includes("actions") && (
            <TableCell sx={{ padding: "4px 15px", fontSize: 16 }}>
              <ActionButtons activeTable={activeTable} row={row} />
            </TableCell>
          )}
        </TableRow>
      ))}
      {newRowBottomTable && <TNewRow />}
    </TableBody>
  );
};

export default TBodyBottom;
