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

const EquipmentCard = () => {
  const { activeTable } = useContext(TableContext);

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Картка обладнання
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
      {activeTable ? (
        <Box sx={{ display: "grid", height: 10 }}>
          <TWrapper
            topTable={activeTable}
            bottomTable={"battery-replacement"}
          />
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export default EquipmentCard;
