import TableContext from "@/context/cabinet/TableContext";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import TWrapper from "../../TableComponents/TWrapper";

const ObjectsDirectory = () => {
  const { activeTable, setNewRow, setUpdate, editRow, rowsTopTable } =
    useContext(TableContext);

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Довідник об&apos;єктів
      </Typography>
      <Divider />
      <Paper className="wrapperButtons">
        <Button
          variant="contained"
          className="addButton"
          onClick={() => {
            setNewRow({ status: true, name: "objects-directory" });
          }}
          disabled={editRow.status}
        >
          Додати запис
        </Button>
        <Button
          variant="contained"
          className="updateButton"
          onClick={() => {
            setUpdate((prev: boolean) => {
              return !prev;
            });
          }}
          disabled={editRow.status}
        >
          Оновити таблицю
        </Button>
        {rowsTopTable.length === 0 && <LinearProgress />}
      </Paper>
      {activeTable ? (
        <TWrapper topTable={activeTable} bottomTable={false} />
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export default ObjectsDirectory;
