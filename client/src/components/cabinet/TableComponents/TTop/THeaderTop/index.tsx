import TableContext from "@/context/cabinet/TableContext";
import { getTableState } from "@/store/TableState";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { useContext, useEffect } from "react";

const THeaderTop = ({ activeTable }: { activeTable: string }) => {
  const {
    setFiltersTopTable,
    orderTopTable,
    setOrderTopTable,
    orderByTopTable,
    setOrderByTopTable,
  } = useContext(TableContext);

  const { headColumnData, rcspan } = getTableState(activeTable);

  const handleColumnSort = (property: any) => {
    const isAsc = orderByTopTable === property && orderTopTable === "asc";
    const newOrder = isAsc ? "desc" : "asc";

    if (["asc", "desc"].includes(newOrder)) {
      setOrderTopTable(newOrder);
      setOrderByTopTable(property);
    }
  };

  const handleFilterChange =
    (column: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFiltersTopTable((filters: any) => ({
        ...filters,
        [column]: event.target.value,
      }));
    };

  return (
    <TableHead>
      <TableRow className="tableRowUpper">
        {headColumnData?.map((column: any) => (
          <TableCell
            key={column.name}
            sx={{ width: column.width, maxWidth: column.maxWidth }}
            onClick={() => {
              handleColumnSort(column.name);
            }}
            className="tableCellUpper"
            rowSpan={column.rowspan}
            colSpan={column.colspan}
          >
            {column.sort ? (
              <TableSortLabel
                active={orderByTopTable === column.name}
                direction={
                  orderByTopTable === column.name
                    ? (orderTopTable as "asc" | "desc")
                    : "asc"
                }
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
      {rcspan && (
        <TableRow className="tableRowUpper" sx={{ top: "33px !important" }}>
          <TableCell className="tableCellUpper" sx={{ width: 20 }}>
            Структурний підрозділ
          </TableCell>
          <TableCell className="tableCellUpper" sx={{ width: 20 }}>
            Назва
          </TableCell>
          <TableCell className="tableCellUpper" sx={{ width: 20 }}>
            Напруга
          </TableCell>
        </TableRow>
      )}

      <TableRow
        className="tableRowFilter"
        sx={{ top: rcspan ? "66px !important" : "inherit" }}
      >
        {headColumnData?.map((column: any) => (
          <TableCell
            key={column.name + "filter"}
            sx={{ maxWidth: column.maxWidth }}
            className="tableCellLower"
            colSpan={column.colspan}
          >
            {column.filter && (
              <TextField
                key={column.name + "inputFilter"}
                size="small"
                label={"Пошук по " + column.label}
                className={"filterTextField"}
                onChange={handleFilterChange(column.name)}
              />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default THeaderTop;