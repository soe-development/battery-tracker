import { AuthContext } from "@/context/AuthContext";
import { Snackbar, Alert } from "@mui/material";
import { useContext } from "react";

const AuthSnackbar = () => {
  const authContext = useContext(AuthContext);
  return (
    <Snackbar
      open={authContext?.openSnackbar}
      autoHideDuration={6000}
      onClose={() => authContext?.setOpenSnackbar(false)}
      sx={{
        left: "auto !important",
        right: "auto !important",
        bottom: "20% !important",
      }}
    >
      <Alert
        onClose={() => authContext?.setOpenSnackbar(false)}
        severity="error"
      >
        Неправильний логін або пароль
      </Alert>
    </Snackbar>
  );
};

export default AuthSnackbar;
