import TableContext from "@/context/cabinet/TableContext";
import { TablePagination } from "@mui/material";
import { useContext } from "react";

const TPaginationTop = ({ activeTable }: { activeTable: string }) => {
  const {
    rowsTopTable,
    pageTopTable,
    setPageTopTable,
    rowsPerPageTopTable,
    setRowsPerPageTopTable,
  } = useContext(TableContext);

  const handleChangePage = (event: any, newPage: number) => {
    setPageTopTable(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPageTopTable(+event.target.value);
    setPageTopTable(0);
  };
  return (
    <TablePagination
      component="div"
      count={rowsTopTable.length}
      page={pageTopTable}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPageTopTable}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage="Рядків на сторінці"
      sx={{ userSelect: "none" }}
    />
  );
};

export default TPaginationTop;
