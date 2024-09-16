import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  Typography,
  Modal,
} from "@mui/material";
import TWrapper from "../../TableComponents/TWrapper";
import TableContext from "@/context/cabinet/TableContext";
import { useContext, useState } from "react";
import ModalWindow from "../../TableComponents/CommonComponents/ModalWindow";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BatteriesDirectory = () => {
  const { activeTable, setNewRow } = useContext(TableContext);

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Довідник АКБ
      </Typography>
      <Divider />
      <Paper className="wrapperButtons">
        <Button
          variant="contained"
          className="addButton"
          onClick={() => {
            setNewRow({ status: true, name: "batteries-directory" });
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

export default BatteriesDirectory;
