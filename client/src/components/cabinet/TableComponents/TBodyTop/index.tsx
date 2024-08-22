import { getDataTable, getDataTableById } from "@/api/table";
import { modifyTableData } from "@/context/cabinet/modifyTableData";
import { TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TableContext from "@/context/cabinet/TableContext";
import { getTableState } from "@/store/TableState";
import ActionButtons from "../ActionButtons";
import TRowExpandble from "../TRowExpandble";

const TBodyTop = ({ activeTable }: { activeTable: string }) => {
  const { filters, order, orderBy } = useContext(TableContext);
  const [rows, setRows] = useState([]);

  const [selectedRowNumber, setSelectedRowNumber] = useState<number | null>(
    null
  );

  const { exceptionKeyColumn, expandbleRow } = getTableState(activeTable);

  const applyFilters = (row: any) =>
    Object.keys(filters).every((key) =>
      filters[key]
        ? String(row[key]).toLowerCase().includes(filters[key].toLowerCase())
        : true
    );

  const compare = (a: any, b: any) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    }
    return a[orderBy] < b[orderBy] ? 1 : -1;
  };

  const sortedAndFilteredRows = rows.filter(applyFilters).sort(compare);

  useEffect(() => {
    getDataTable(activeTable)
      .then(({ data }) => {
        console.log(data);
        setRows(modifyTableData(data));
      })
      .catch(() => setRows([]));
  }, [activeTable]);

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
