import TableContext from "@/context/cabinet/TableContext";
import { Box, Typography, Divider, Paper, LinearProgress } from "@mui/material";
import { useContext } from "react";
import TWrapper from "../../TableComponents/TWrapper";

const TotalTable = () => {
  const { activeTable } = useContext(TableContext);

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Облік заміни АКБ
      </Typography>
      <Divider />
      <Paper className="wrapperButtons"></Paper>
      {activeTable ? (
        <Box sx={{ display: "grid", height: 10 }}>
          <TWrapper topTable={activeTable} bottomTable={false} />
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export default TotalTable;
