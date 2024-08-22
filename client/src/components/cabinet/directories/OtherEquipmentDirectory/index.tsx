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
  const { activeTable } = useContext(TableContext);

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Довідник іншого обладнання
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

export default OtherEquipmentDirectory;
