"use client";

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
import { getData, getDataById } from "@/api/table/table";

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

  newRow: any;
  setNewRow: Dispatch<SetStateAction<any>>;

  helperText: any;
  setHelperText: Dispatch<SetStateAction<any>>;

  openSnackbar: boolean;
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>;

  activeAddId: number;
  setActiveAddId: Dispatch<SetStateAction<number>>;

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

  newRowBottomTable: any;
  setNewRowBottomTable: Dispatch<SetStateAction<any>>;

  refetchTable: (activeTable: string) => Promise<void>;

  refetchTableById: (activeTable: string) => Promise<void>;
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

  newRow: {},
  setNewRow: () => {},

  helperText: {},
  setHelperText: () => {},

  openSnackbar: false,
  setOpenSnackbar: () => {},

  activeAddId: 0,
  setActiveAddId: () => {},

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

  newRowBottomTable: {},
  setNewRowBottomTable: () => {},

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

  const [newRow, setNewRow] = useState<any>({
    status: false,
    name: "",
  });

  const [helperText, setHelperText] = useState<any>("");

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const [activeAddId, setActiveAddId] = useState<number>(0);

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

  const [newRowBottomTable, setNewRowBottomTable] = useState<any>({
    status: false,
    name: "",
  });

  const refetchTable = useCallback(async (activeTable: string) => {
    try {
      const { data } = await getData(activeTable);
      setRowsTopTable(modifyTableData(data));
    } catch {
      setRowsTopTable([]);
    }
  }, []);

  const refetchTableById = useCallback(
    async (activeTable: string) => {
      try {
        const { data } = await getDataById(activeTable, activeAddId);
        setRowsBottomTable(modifyTableData(data));
      } catch {
        setRowsBottomTable([]);
      }
    },
    [activeAddId]
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

        newRow,
        setNewRow,

        helperText,
        setHelperText,

        openSnackbar,
        setOpenSnackbar,

        activeAddId,
        setActiveAddId,

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

        newRowBottomTable,
        setNewRowBottomTable,

        refetchTable,
        refetchTableById,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;
