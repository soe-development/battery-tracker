import {
  Box,
  Button,
  CircularProgress,
  Divider,
  LinearProgress,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import TWrapper from "../../TableComponents/TWrapper";
import TableContext from "@/context/cabinet/TableContext";
import { useContext } from "react";

const BatteriesDirectory = () => {
  const { activeTable } = useContext(TableContext);

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Довідник АКБ
      </Typography>
      <Divider />
      <Paper className="wrapperButtons">
        <Button variant="contained" className="addButton">
          Додати запис
        </Button>
        <Button variant="contained" className="updateButton">
          Оновити таблицю
        </Button>
      </Paper>
      {activeTable ? <TWrapper /> : <LinearProgress />}
    </Box>
  );
};

export default BatteriesDirectory;
