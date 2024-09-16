import TableContext from "@/context/cabinet/TableContext";
import { Snackbar, Alert, Typography } from "@mui/material";
import { useContext } from "react";

const SnackBar = () => {
  const { helperText, openSnackbar, setOpenSnackbar } =
    useContext(TableContext);
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={() => setOpenSnackbar(false)}
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0, // Поднимет Snackbar на 10% от нижней части модального окна
        maxHeight: "50px",
        "& .MuiPaper-root": {
          minHeight: "30px",
          maxHeight: "130px",
        },
      }}
    >
      <Alert onClose={() => setOpenSnackbar(false)} severity="error">
        <Typography>Не всі обов&apos;язкові поля заповнені! </Typography>
        <Typography>
          Поля, які не заповнені:{" "}
          <span style={{ fontWeight: 600 }}>{helperText}</span>{" "}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
