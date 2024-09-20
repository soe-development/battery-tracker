import TableContext from "@/context/cabinet/TableContext";
import { Snackbar, Alert, Typography } from "@mui/material";
import { useContext } from "react";

const SnackBar = () => {
  const { snackbarState, openSnackbar, setOpenSnackbar } =
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
        bottom: 0,
        maxHeight: "50px",
        "& .MuiPaper-root": {
          minHeight: "30px",
          maxHeight: "130px",
        },
      }}
    >
      <Alert
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarState.type}
        sx={{
          backgroundColor:
            snackbarState.type === "success" ? "success.main" : "warning.main",
          color:
            snackbarState.type === "success"
              ? "secondary.light"
              : "secondary.light",
        }}
        variant="standard"
      >
        <Typography>
          {snackbarState.mainText}{" "}
          <span style={{ fontWeight: 600 }}>{snackbarState.helperText}</span>{" "}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
