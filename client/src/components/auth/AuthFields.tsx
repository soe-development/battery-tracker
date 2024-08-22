import { AuthContext } from "@/context/AuthContext";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";

const AuthFields = () => {
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      authContext?.setAuthFormData((prevData) => ({
        ...prevData,
        [field]: { value: event.target.value, isValid: true },
      }));
    };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Box sx={{ pb: "25px", textAlign: "center" }}>
        <Typography sx={{ fontWeight: "600" }}>Вхід</Typography>
      </Box>
      <Box sx={{ pb: "10px" }}>
        <TextField
          required
          placeholder={"Логін"}
          label={"Логін"}
          error={!authContext?.authFormData.login.isValid}
          helperText={
            !authContext?.authFormData.login.isValid ? "Некоректний логін" : ""
          }
          onChange={handleInputChange("login")}
          sx={{ width: "300px" }}
        />
      </Box>
      <Box sx={{ pb: "25px" }}>
        <TextField
          required
          placeholder={"Пароль"}
          label={"Пароль"}
          type={showPassword ? "text" : "password"}
          sx={{ width: "300px" }}
          error={!authContext?.authFormData.password.isValid}
          helperText={
            !authContext?.authFormData.password.isValid
              ? "Некоректний пароль"
              : ""
          }
          onChange={handleInputChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handlePasswordToggle}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default AuthFields;
