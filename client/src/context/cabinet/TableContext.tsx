"use client";

import { getDataTable, getDataTableById } from "@/api/table";
import { getTableState } from "@/store/TableState";
import {
  Dispatch,
  SetStateAction,
  FC,
  PropsWithChildren,
  useState,
  useCallback,
  createContext,
} from "react";
import { getTab } from "./getTab";
import { modifyTableData } from "./modifyTableData";

interface ITableContext {
  activeTable: string;

  // Состояния для верхней таблицы
  rowsTopTable: any[];
  setRowsTopTable: Dispatch<SetStateAction<any[]>>;
  filtersTopTable: any;
  setFiltersTopTable: Dispatch<SetStateAction<any>>;
  pageTopTable: number;
  setPageTopTable: Dispatch<SetStateAction<number>>;
  rowsPerPageTopTable: number;
  setRowsPerPageTopTable: Dispatch<SetStateAction<number>>;
  orderByTopTable: string;
  setOrderByTopTable: Dispatch<SetStateAction<string>>;
  orderTopTable: string;
  setOrderTopTable: Dispatch<SetStateAction<string>>;

  // Состояния для нижней таблицы
  rowsBottomTable: any[];
  setRowsBottomTable: Dispatch<SetStateAction<any[]>>;
  filtersBottomTable: any;
  setFiltersBottomTable: Dispatch<SetStateAction<any>>;
  pageBottomTable: number;
  setPageBottomTable: Dispatch<SetStateAction<number>>;
  rowsPerPageBottomTable: number;
  setRowsPerPageBottomTable: Dispatch<SetStateAction<number>>;
  orderByBottomTable: string;
  setOrderByBottomTable: Dispatch<SetStateAction<string>>;
  orderBottomTable: string;
  setOrderBottomTable: Dispatch<SetStateAction<string>>;

  refetchTable: (activeTable: string) => Promise<void>;

  refetchTableById: (activeTable: string, id: number) => Promise<void>;
}

const TableContext = createContext<ITableContext>({
  activeTable: "",

  // Верхняя таблица
  rowsTopTable: [],
  setRowsTopTable: () => [],
  filtersTopTable: {},
  setFiltersTopTable: () => {},
  pageTopTable: 0,
  setPageTopTable: () => {},
  rowsPerPageTopTable: 50,
  setRowsPerPageTopTable: () => {},
  orderByTopTable: "rowNumber",
  setOrderByTopTable: () => {},
  orderTopTable: "asc",
  setOrderTopTable: () => {},

  // Нижняя таблица
  rowsBottomTable: [],
  setRowsBottomTable: () => [],
  filtersBottomTable: {},
  setFiltersBottomTable: () => {},
  pageBottomTable: 0,
  setPageBottomTable: () => {},
  rowsPerPageBottomTable: 50,
  setRowsPerPageBottomTable: () => {},
  orderByBottomTable: "rowNumber",
  setOrderByBottomTable: () => {},
  orderBottomTable: "asc",
  setOrderBottomTable: () => {},

  refetchTable: async () => {},
  refetchTableById: async () => {},
});

export const TableContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const tab = getTab();

  const [activeTable] = useState<string>(tab);

  // Состояния для верхней таблицы
  const [rowsTopTable, setRowsTopTable] = useState<any[]>([]);
  const [filtersTopTable, setFiltersTopTable] = useState(
    getTableState(tab).initialFilters
  );
  const [pageTopTable, setPageTopTable] = useState(0);
  const [rowsPerPageTopTable, setRowsPerPageTopTable] = useState(50);
  const [orderByTopTable, setOrderByTopTable] = useState<string>("rowNumber");
  const [orderTopTable, setOrderTopTable] = useState<string>("asc");

  // Состояния для нижней таблицы
  const [rowsBottomTable, setRowsBottomTable] = useState<any[]>([]);
  const [filtersBottomTable, setFiltersBottomTable] = useState(
    getTableState(tab).initialFilters
  );
  const [pageBottomTable, setPageBottomTable] = useState(0);
  const [rowsPerPageBottomTable, setRowsPerPageBottomTable] = useState(50);
  const [orderByBottomTable, setOrderByBottomTable] =
    useState<string>("rowNumber");
  const [orderBottomTable, setOrderBottomTable] = useState<string>("asc");

  const refetchTable = useCallback(async (activeTable: string) => {
    try {
      const { data } = await getDataTable(activeTable);
      setRowsTopTable(modifyTableData(data));
    } catch {
      setRowsTopTable([]);
    }
  }, []);

  const refetchTableById = useCallback(
    async (activeTable: string, id: number) => {
      try {
        const { data } = await getDataTableById(activeTable, id);
        setRowsBottomTable(modifyTableData(data));
      } catch {
        setRowsBottomTable([]);
      }
    },
    []
  );

  return (
    <TableContext.Provider
      value={{
        activeTable,
        rowsTopTable,
        setRowsTopTable,
        filtersTopTable,
        setFiltersTopTable,
        pageTopTable,
        setPageTopTable,
        rowsPerPageTopTable,
        setRowsPerPageTopTable,
        orderByTopTable,
        setOrderByTopTable,
        orderTopTable,
        setOrderTopTable,

        rowsBottomTable,
        setRowsBottomTable,
        filtersBottomTable,
        setFiltersBottomTable,
        pageBottomTable,
        setPageBottomTable,
        rowsPerPageBottomTable,
        setRowsPerPageBottomTable,
        orderByBottomTable,
        setOrderByBottomTable,
        orderBottomTable,
        setOrderBottomTable,

        refetchTable,
        refetchTableById,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;
