import TableContext from "@/context/cabinet/TableContext";
import { getTableState } from "@/store/TableState";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Button,
} from "@mui/material";
import { useContext } from "react";

const THeaderBottom = ({ activeTable }: { activeTable: string }) => {
  const {
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

  return (
    <TableHead>
      <TableRow className="tableRowUpper" sx={{ p: "0 !important" }}>
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
    </TableHead>
  );
};

export default THeaderBottom;
