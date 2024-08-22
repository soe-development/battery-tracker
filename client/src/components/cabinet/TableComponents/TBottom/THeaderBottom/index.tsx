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

const THeaderBottom = ({ activeTable }: { activeTable: string }) => {
  const {
    setFiltersBottomTable,
    orderBottomTable,
    setOrderBottomTable,
    orderByBottomTable,
    setOrderByBottomTable,
  } = useContext(TableContext);

  const { headColumnData, rcspan } = getTableState(activeTable);

  const handleColumnSort = (property: any) => {
    const isAsc = orderByBottomTable === property && orderBottomTable === "asc";
    const newOrder = isAsc ? "desc" : "asc";

    if (["asc", "desc"].includes(newOrder)) {
      setOrderBottomTable(newOrder);
      setOrderByBottomTable(property);
    }
  };

  const handleFilterChange =
    (column: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFiltersBottomTable((filters: any) => ({
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
                active={orderByBottomTable === column.name}
                direction={
                  orderByBottomTable === column.name
                    ? (orderBottomTable as "asc" | "desc")
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

export default THeaderBottom;
