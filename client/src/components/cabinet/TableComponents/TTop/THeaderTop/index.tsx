import { useContext, useRef, useEffect, useState } from "react";
import TableContext from "@/context/cabinet/TableContext";
import { getTableState } from "@/store/TableState";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TextField,
} from "@mui/material";

// Определение типа данных столбца
interface ColumnData {
  name: string;
  label: string;
  width?: string | number;
  maxWidth?: string | number;
  colspan: number;
  rowspan: number;
  sort?: boolean;
  filter?: boolean;
}

// Пропсы компонента
interface THeaderTopProps {
  activeTable: string;
}

const THeaderTop = ({ activeTable }: THeaderTopProps) => {
  const {
    setFiltersTopTable,
    filtersTopTable,
    orderTopTable,
    setOrderTopTable,
    orderByTopTable,
    setOrderByTopTable,
  } = useContext(TableContext);

  const { headColumnData, rcspan } = getTableState(activeTable);

  const [headerHeight, setHeaderHeight] = useState<number>(35);
  const headerRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headColumnData, headerHeight, rcspan]);

  const handleColumnSort = (property: string) => {
    const isAsc = orderByTopTable === property && orderTopTable === "asc";
    setOrderTopTable(isAsc ? "desc" : "asc");
    setOrderByTopTable(property);
  };

  const handleFilterChange =
    (column: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFiltersTopTable((filters: Record<string, string>) => ({
        ...filters,
        [column]: event.target.value,
      }));
    };

  return (
    <TableHead>
      <TableRow
        ref={headerRef}
        className="tableRowUpper"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#fff",
        }}
      >
        {headColumnData?.map((column: ColumnData) => (
          <TableCell
            key={column.name}
            sx={{
              width: column.width,
              maxWidth: column.maxWidth,
              textAlign: column.colspan > 1 ? "center" : "justify",
            }}
            onClick={() => handleColumnSort(column.name)}
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
        <TableRow
          className="tableRowUpper"
          sx={{
            position: "sticky",
            top: headerHeight,
            zIndex: 1,
            backgroundColor: "#fff",
          }}
        >
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
        sx={{
          position: "sticky",
          top:
            (rcspan || headerHeight > 35 ? 57 : headerHeight) + "px !important",
          zIndex: 1,
          backgroundColor: "#fff",
        }}
      >
        {headColumnData?.map((column: ColumnData, index: number) => (
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
                className="filterTextField"
                onChange={handleFilterChange(column.name)}
              />
            )}

            {rcspan && index === 1 && (
              <>
                <TextField
                  key={column.name + "inputFilter"}
                  size="small"
                  label={"Пошук по " + column.label}
                  className="filterTextField"
                  onChange={handleFilterChange(column.name)}
                />
              </>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default THeaderTop;
