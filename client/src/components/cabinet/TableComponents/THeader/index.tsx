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

const THeader = ({ activeTable }: { activeTable: string }) => {
  const { setFilters, order, setOrder, orderBy, setOrderBy } =
    useContext(TableContext);

  const { headColumnData, rcspan } = getTableState(activeTable);

  const handleColumnSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";

    if (["asc", "desc"].includes(newOrder)) {
      setOrder(newOrder);
      setOrderBy(property);
    }
  };

  const handleFilterChange =
    (column: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((filters: any) => ({
        ...filters,
        [column]: event.target.value,
      }));
    };

  useEffect(() => {
    console.log(headColumnData);
  }, [headColumnData]);

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
                active={orderBy === column.name}
                direction={
                  orderBy === column.name ? (order as "asc" | "desc") : "asc"
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

export default THeader;
