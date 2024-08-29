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

const DistrictsDirectory = () => {
  const { activeTable, refetchTable } = useContext(TableContext);

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Довідник структурних підрозділів
      </Typography>
      <Divider />
      <Paper className="wrapperButtons">
        <Button variant="contained" className="addButton">
          Додати філію
        </Button>
        <Button variant="contained" className="addButton">
          Додати структурний підрозділ
        </Button>
        <Button
          variant="contained"
          className="updateButton"
          onClick={() => {
            refetchTable;
          }}
        >
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

export default DistrictsDirectory;
