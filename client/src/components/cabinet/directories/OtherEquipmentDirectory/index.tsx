import TableContext from "@/context/cabinet/TableContext";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Button,
  LinearProgress,
} from "@mui/material";
import { useContext } from "react";
import TWrapper from "../../TableComponents/TWrapper";

const OtherEquipmentDirectory = () => {
  const { activeTable, setNewRow, setUpdate, editRow, rowsTopTable } =
    useContext(TableContext);

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Довідник іншого обладнання
      </Typography>
      <Divider />
      <Paper className="wrapperButtons">
        <Button
          variant="contained"
          className="addButton"
          onClick={() => {
            setNewRow({
              status: true,
              name: "other-equipment-directory",
            });
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

export default OtherEquipmentDirectory;
