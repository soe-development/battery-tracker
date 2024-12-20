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
import { createNotificationsEntry } from "@/api/notification";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";

interface ITableContext {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  activeTable: string;

  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;

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

  editRow: any;
  setEditRow: Dispatch<SetStateAction<any>>;

  openSnackbar: boolean;
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>;

  snackbarState: any;
  setSnackbarState: Dispatch<SetStateAction<any>>;

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

  startDateGlobalFilter: any;
  setStartDateGlobalFilter: Dispatch<SetStateAction<any>>;
  endDateGlobalFilter: any;
  setEndDateGlobalFilter: Dispatch<SetStateAction<any>>;
}

const TableContext = createContext<ITableContext>({
  loading: false,
  setLoading: () => {},
  activeTable: "",

  update: true,
  setUpdate: () => {},

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

  editRow: {},
  setEditRow: () => {},

  openSnackbar: false,
  setOpenSnackbar: () => {},

  snackbarState: {},
  setSnackbarState: () => {},

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

  startDateGlobalFilter: "",
  setStartDateGlobalFilter: () => {},

  endDateGlobalFilter: "",
  setEndDateGlobalFilter: () => {},
});

export const TableContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const tab = getTab();

  const [activeTable] = useState<string>(tab);

  const [update, setUpdate] = useState<boolean>(true);

  // Состояния для верхней таблицы
  const [rowsTopTable, setRowsTopTable] = useState<any[]>([]);
  const [filtersTopTable, setFiltersTopTable] = useState(
    getTableState(tab).initialFilters
  );
  const [pageTopTable, setPageTopTable] = useState(0);
  const [rowsPerPageTopTable, setRowsPerPageTopTable] = useState(100);
  const [orderByTopTable, setOrderByTopTable] = useState<string>("rowNumber");
  const [orderTopTable, setOrderTopTable] = useState<string>("asc");

  const [newRow, setNewRow] = useState<any>({
    status: false,
    name: "",
  });

  const [editRow, setEditRow] = useState<any>({
    status: false,
    name: "",
    row: {},
  });

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const [snackbarState, setSnackbarState] = useState<any>({
    type: "",
    mainText: "",
    helperText: "",
  });

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

  const [loading, setLoading] = useState(false);

  const [startDateGlobalFilter, setStartDateGlobalFilter] = useState(
    dayjs("2000-01-01")
  );
  const [endDateGlobalFilter, setEndDateGlobalFilter] = useState(
    dayjs(new Date())
  );

  const refetchTable = useCallback(async (activeTable: string) => {
    const abortController = new AbortController();

    try {
      const { data } = await getData(activeTable);
      setLoading(true);
      setRowsTopTable(modifyTableData(data));
    } catch (error) {
      console.error(error);
      setRowsTopTable([]); // Обрабатываем ошибку
    } finally {
      abortController.abort();
      setLoading(false);
    }
  }, []);

  const refetchTableById = useCallback(
    async (activeTable: string) => {
      try {
        const { data } = await getDataById(activeTable, activeAddId);
        setLoading(true);
        setRowsBottomTable(modifyTableData(data));
      } catch {
        setRowsBottomTable([]);
      } finally {
        setLoading(false);
      }
    },
    [activeAddId]
  );

  return (
    <TableContext.Provider
      value={{
        loading,
        setLoading,
        activeTable,
        update,
        setUpdate,
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

        editRow,
        setEditRow,

        snackbarState,
        setSnackbarState,

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

        startDateGlobalFilter,
        setStartDateGlobalFilter,
        endDateGlobalFilter,
        setEndDateGlobalFilter,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContext;
