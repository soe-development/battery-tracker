import { AuthContext } from "@/context/AuthContext";
import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { isNotEmptyField } from "./validation";
import { requestLogIn } from "@/api/auth";
import UserContext from "@/context/UserContext";

const AuthButton = () => {
  const authContext = useContext(AuthContext);
  const { refetchUser } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!authContext) return;

    const loginIsValid = isNotEmptyField(authContext.authFormData.login.value);
    const passwordIsValid = isNotEmptyField(
      authContext.authFormData.password.value
    );

    authContext.setAuthFormData({
      login: { ...authContext.authFormData.login, isValid: loginIsValid },
      password: {
        ...authContext.authFormData.password,
        isValid: passwordIsValid,
      },
    });

    if (loginIsValid && passwordIsValid) {
      try {
        await requestLogIn(
          authContext.authFormData.login.value,
          authContext.authFormData.password.value
        );

        refetchUser();

        router.push("/cabinet");
      } catch (error) {
        console.error("Ошибка авторизации:", error);
        authContext.setOpenSnackbar(true);
      }
    } else {
      authContext.setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ pb: "25px" }}>
      <Button
        variant="outlined"
        onClick={handleSubmit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
        sx={{
          bgcolor: "primary.main",
          color: "secondary.light",
          borderColor: "primary.dark",
          width: "300px",
          "&:hover": {
            bgcolor: "primary.light",
            borderColor: "primary.dark",
          },
        }}
      >
        Увійти
      </Button>
    </Box>
  );
};

export default AuthButton;
