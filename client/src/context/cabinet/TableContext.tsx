"use client";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getTab } from "./getTab";
import { getDataTable } from "@/api/table";
import { getTableState } from "@/store/TableState";
import { modifyTableData } from "./modifyTableData";

interface ITableContext {
  activeTable: string;
  setActiveTable: Dispatch<SetStateAction<string>>;
  // rows: any[];
  // setRows: Dispatch<SetStateAction<any[]>>;
  // refetchTable: () => void;
  filters: any;
  setFilters: Dispatch<SetStateAction<any>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
}

const TableContext = createContext<ITableContext>({
  activeTable: "",
  setActiveTable: () => {},
  // rows: [],
  // setRows: () => [],
  // refetchTable: () => {},
  filters: {},
  setFilters: () => {},
  page: 0,
  setPage: () => {},
  rowsPerPage: 50,
  setRowsPerPage: () => {},
  orderBy: "rowNumber",
  setOrderBy: () => {},
  order: "asc",
  setOrder: () => {},
});

export const TableContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const tab = getTab();

  const [activeTable, setActiveTable] = useState(tab);
  // const [rows, setRows] = useState<any[]>([]);
  const [filters, setFilters] = useState(getTableState(tab).initialFilters);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [orderBy, setOrderBy] = useState<string>("rowNumber");
  const [order, setOrder] = useState<string>("asc");

  // const refetchTable = useCallback(() => {
  //   getDataTable(activeTable)
  //     .then(({ data }) => setRows(modifyTableData(data)))
  //     .catch(() => setRows([]));
  // }, [activeTable]);

  // useEffect(() => {
  //   refetchTable();
  // }, [refetchTable]);

  return (
    <TableContext.Provider
      value={{
        activeTable,
        setActiveTable,
        // rows,
        // setRows,
        // refetchTable,
        filters,
        setFilters,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        orderBy,
        setOrderBy,
        order,
        setOrder,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;
