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
import ModalWindow from "../../TableComponents/CommonComponents/ModalWindow";

const ObjectsDirectory = () => {
  const { activeTable, setNewRow } = useContext(TableContext);

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
        >
          Додати запис
        </Button>
        <Button variant="contained" className="updateButton">
          Оновити таблицю
        </Button>
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
