import { TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useContext, useState } from "react";
import TableContext from "@/context/cabinet/TableContext";
import { getTableState } from "@/store/TableState";
import ActionButtons from "../../CommonComponents/ActionButtons";
import { applyFilters, compare } from "../../CommonComponents/tfunctions";
import TRowExpandble from "../../CommonComponents/TRowExpandble";

const TBodyTop = ({ activeTable }: { activeTable: string }) => {
  const {
    rowsTopTable,
    filtersTopTable,
    pageTopTable,
    rowsPerPageTopTable,
    orderTopTable,
    orderByTopTable,
  } = useContext(TableContext);

  const [selectedRowNumber, setSelectedRowNumber] = useState<number | null>(
    null
  );

  const { exceptionKeyColumn, expandbleRow } = getTableState(activeTable);

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
              <Typography sx={{ fontWeight: 600 }}>{row.name}</Typography>
            </TableCell>
            <TableCell>
              <ActionButtons activeTable={activeTable} />
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
                  {row[key]}
                </TableCell>
              ))}
            <TableCell sx={{ padding: "4px 15px", fontSize: 16 }}>
              <ActionButtons activeTable={activeTable} />
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  );
};

export default TBodyTop;
