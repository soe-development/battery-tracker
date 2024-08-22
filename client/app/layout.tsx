import { getUser } from "@/api/auth";
import AuthContextProvider from "@/context/AuthContext";
import { UserContextProvider } from "@/context/UserContext";
import ThemeProvider from "@/theme/ThemeProvider";
import { CssBaseline } from "@mui/material";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser()
    .then((user) => user)
    .catch(() => null);

  return (
    <html lang="en">
      <head>
        <title>Облік АКБ та заміни</title>
        <meta name="description" content="Battery-tracker" />
        <link rel="icon" href="/static/images/logo.svg" />
      </head>
      <body>
        <UserContextProvider user={user}>
          <AuthContextProvider>
            <ThemeProvider>
              <CssBaseline />
              <main>{children}</main>
            </ThemeProvider>
          </AuthContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
