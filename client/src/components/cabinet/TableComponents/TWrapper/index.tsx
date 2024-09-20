import React, { useRef, useEffect, useState, useContext } from "react";
import { Box, TableContainer, Paper, Table, Typography } from "@mui/material";
import TPagination from "../TTop/TPaginationTop";
import TBodyTop from "../TTop/TBodyTop";
import TBodyBottom from "../TBottom/TBodyBottom";
import THeaderTop from "../TTop/THeaderTop";
import TableContext from "@/context/cabinet/TableContext";
import THeaderBottom from "../TBottom/THeaderBottom";
import { getTableState } from "@/store/TableState";
import ClearButton from "../CommonComponents/ActionButtons/ClearButton";
import CreateButton from "../CommonComponents/ActionButtons/CreateButton";

const TWrapper = ({
  topTable,
  bottomTable,
}: {
  topTable: string;
  bottomTable: string | boolean;
}) => {
  const { refetchTable, refetchTableById, activeAddId, newRow, update } =
    useContext(TableContext);
  const tableContainer1Ref = useRef<HTMLDivElement>(null);
  const tableContainer2Ref = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState<number>(0);

  const { staticHeight } = getTableState(topTable);

  const {
    name: nameBottomTable,
    exceptionKeyColumn: bottomTableExceptionKeyColumn,
  } = bottomTable
    ? getTableState(bottomTable as string)
    : { name: "", exceptionKeyColumn: [] };

  useEffect(() => {
    const updateInitialHeight = () => {
      const windowHeight = window.innerHeight;
      const newTableHeight = bottomTable
        ? (windowHeight - (staticHeight || 288)) / 2
        : windowHeight - (staticHeight || 288);
      setTableHeight(newTableHeight);
      if (tableContainer1Ref.current) {
        tableContainer1Ref.current.style.height = `${newTableHeight}px`;
      }
      if (bottomTable && tableContainer2Ref.current) {
        tableContainer2Ref.current.style.height = `${newTableHeight}px`;
      }
    };

    updateInitialHeight();
    window.addEventListener("resize", updateInitialHeight);
    return () => window.removeEventListener("resize", updateInitialHeight);
  }, [bottomTable, staticHeight]);

  useEffect(() => {
    const resizer = resizerRef.current;
    const tableContainer1 = tableContainer1Ref.current;
    const tableContainer2 = tableContainer2Ref.current;
    const tableWrapper = document.querySelector(".table-wrapper");

    const resizeTables = (e: MouseEvent) => {
      if (!tableContainer1 || !tableContainer2 || !tableWrapper) return;
      const wrapperRect = tableWrapper.getBoundingClientRect();
      const minHeight = 100;
      const maxHeight =
        wrapperRect.height - minHeight - (resizer?.clientHeight || 0);

      const newHeight1 = Math.min(
        Math.max(e.clientY - wrapperRect.top, minHeight),
        maxHeight
      );
      const newHeight2 =
        wrapperRect.height - newHeight1 - (resizer?.clientHeight || 0);

      tableContainer1.style.height = `${newHeight1}px`;
      tableContainer2.style.height = `${newHeight2}px`;
    };

    const stopResize = () => {
      document.removeEventListener("mousemove", resizeTables);
      document.removeEventListener("mouseup", stopResize);
    };

    const startResize = () => {
      document.addEventListener("mousemove", resizeTables);
      document.addEventListener("mouseup", stopResize);
    };

    resizer?.addEventListener("mousedown", startResize);
    return () => resizer?.removeEventListener("mousedown", startResize);
  }, []);

  useEffect(() => {
    refetchTable(topTable);
  }, [refetchTable, topTable, newRow, update]);

  useEffect(() => {
    if (typeof bottomTable === "string") {
      refetchTableById(bottomTable);
    }
  }, [refetchTableById, bottomTable, newRow, update]);

  return (
    <Box sx={{ p: 1, maxHeight: "70vh" }} className="table-wrapper">
      <TableContainer
        component={Paper}
        ref={tableContainer1Ref}
        sx={{
          userSelect: "none",
          height: `${tableHeight}px`,
          overflow: "auto",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <THeaderTop activeTable={topTable} />
          <TBodyTop activeTable={topTable} />
        </Table>
      </TableContainer>
      <Box ref={resizerRef}>
        <TPagination activeTable={topTable} />
      </Box>
      {bottomTable && (
        <TableContainer
          component={Paper}
          ref={tableContainer2Ref}
          sx={{
            userSelect: "none",
            overflow: "auto",
            height: `${tableHeight}px`,
          }}
        >
          <Box
            sx={{
              backgroundColor: "primary.light",
              borderBottom: "1px solid #e0e0e0",
              borderLeft: "1px solid #e0e0e0",
              borderRight: "1px solid #e0e0e0",
              display: "flex",
              borderRadius: 0,
            }}
          >
            <Box
              sx={{
                alignContent: "center",
                px: 2,
                borderRight: "1px solid #e0e0e0",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                {nameBottomTable}
              </Typography>
            </Box>
            {activeAddId > 0 && (
              <>
                {!bottomTableExceptionKeyColumn?.includes("actions") && (
                  <Box
                    sx={{
                      borderRight: "1px solid #e0e0e0",
                      p: "4px",
                      alignContent: "center",
                    }}
                  >
                    <CreateButton name={bottomTable as string} />
                  </Box>
                )}

                <Box
                  sx={{
                    borderRight: "1px solid #e0e0e0",
                    p: "4px",
                    alignContent: "center",
                  }}
                >
                  <ClearButton />
                </Box>
              </>
            )}
          </Box>
          <Table stickyHeader aria-label="sticky table">
            <THeaderBottom activeTable={bottomTable as string} />
            <TBodyBottom activeTable={bottomTable as string} />
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TWrapper;
