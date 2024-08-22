import React, { useRef, useEffect, useState, useContext } from "react";
import { Box, TableContainer, Paper, Table } from "@mui/material";
import TPagination from "../TTop/TPaginationTop";
import TBodyTop from "../TTop/TBodyTop";
import TBodyBottom from "../TBottom/TBodyBottom";
import THeaderTop from "../TTop/THeaderTop";
import TableContext from "@/context/cabinet/TableContext";
import THeaderBottom from "../TBottom/THeaderBottom";

const TWrapper = ({
  topTable,
  bottomTable,
}: {
  topTable: string;
  bottomTable: string | boolean;
}) => {
  const { refetchTable, refetchTableById } = useContext(TableContext);
  const tableContainer1Ref = useRef<HTMLDivElement>(null);
  const tableContainer2Ref = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState<number>(0);

  useEffect(() => {
    const updateInitialHeight = () => {
      const windowHeight = window.innerHeight;
      const newTableHeight = bottomTable
        ? (windowHeight - 307) / 2
        : windowHeight - 307;
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
  }, [bottomTable]);

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
  }, [refetchTable, topTable]);

  useEffect(() => {
    if (typeof bottomTable === "string") {
      refetchTableById(bottomTable, 1);
    }
  }, [refetchTableById, bottomTable]);

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
