import TableContext from "@/context/cabinet/TableContext";
import { TablePagination } from "@mui/material";
import { useContext } from "react";

const TPagination = () => {
  const { page, setPage, rowsPerPage, setRowsPerPage } =
    useContext(TableContext);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TablePagination
      component="div"
      count={10} //rows.length
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage="Рядків на сторінці"
      sx={{ userSelect: "none" }}
    />
  );
};

export default TPagination;
