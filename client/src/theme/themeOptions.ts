import { ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#4f6b9a",
      dark: "#41658f",
      light: "#f1f4fa",
    },
    secondary: {
      main: "#c4c4c4",
      light: "#FFFFFF",
      dark: "#000000",
    },
    success: {
      main: "#638D6E",
      dark: "#efeeee",
      light: "#577C61",
    },
    info: {
      main: "#638D6E",
      dark: "#efeeee",
      light: "#577C61",
    },
    warning: {
      main: "#de3434",
    },
  },
  typography: {
    fontFamily: "Cera Pro",
    h1: {
      fontFamily: "Cera Pro",
      textTransform: "uppercase",
      letterSpacing: "0.01em",
    },
    h2: {
      fontFamily: "Cera Pro",
      textTransform: "uppercase",
      letterSpacing: "0.01em",
    },
    h3: {
      fontFamily: "Cera Pro",
      textTransform: "uppercase",
      letterSpacing: "0.01em",
    },
    h4: {
      fontFamily: "Cera Pro",
      textTransform: "uppercase",
      letterSpacing: "0.02em",
    },
    h5: {
      fontFamily: "Cera Pro",
      textTransform: "uppercase",
      letterSpacing: "0.01em",
    },
    h6: {
      fontFamily: "Cera Pro",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root": {
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "#e3e8f1",
            },
            "&.tableRowUpper": {
              position: "sticky",
              top: 0,
              zIndex: 2,
            },
            "&.tableRowFilter": {
              position: "sticky",
              top: 35,
              zIndex: 1,
            },
            "&.Mui-selected": {
              backgroundColor: "#e3e8f1",
              "&:hover": {
                backgroundColor: "#e3e8f1",
              },
            },
          },
          "& .MuiTableCell-root": {
            padding: "4px 16px",
            fontSize: 16,
            "&.tableCellUpper": {
              fontWeight: 600,
              userSelect: "none",
              cursor: "pointer",
              backgroundColor: "#f1f4fa",
            },
            "&.tableCellLower": {
              paddingTop: 8,
              paddingBottom: 8,
              userSelect: "none",
              backgroundColor: "#f1f4fa",
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.titleTypography": {
            margin: 15,
            display: "grid",
            justifyItems: "center",
            fontWeight: 600,
            fontSize: 20,
            fontFamily: "Cera Pro",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.addButton": {
            margin: 8,
            backgroundColor: "#35754c",
            "&:hover": {
              backgroundColor: "#296a47",
            },
          },
          "&.updateButton": {
            margin: 8,
            backgroundColor: "#4c6e9d",
            "&:hover": {
              backgroundColor: "#3a4d6b",
            },
          },
          "&.rowModifyButtons": {
            marginRight: 1,
            backgroundColor: "#ffffff",
            boxShadow:
              "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 1px 1px 0px rgba(0,0,0,0.12)",
            padding: "5px 0 5px 9px",
            minWidth: 37,
            minHeight: 32,
            "& .MuiSvgIcon-root": {
              fontSize: 20,
            },
            "&:hover": {
              backgroundColor: "#f8fbff75",
            },
          },
          "&.rowGreenButton": {
            color: "#336036",
            border: "1px solid #33603687",
            marginRight: 8,
          },
          "&.rowRedButton": {
            border: "1px solid #de34348c",
            color: "#de3434",
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.wrapperButtons": {
            mx: 1,
            mt: 1,
            p: "2px",
            borderRadius: "5px 5px 0 0",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.filterTextField": {
            backgroundColor: "#ffffff",
            width: "100%",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          height: "40px",
          padding: 0,
          overflow: "hidden",
          fontSize: 15,
          cursor: "ns-resize",
          backgroundColor: "#f1f4fa",
          border: "1px solid #e0e0e0",
          "& .MuiTablePagination-toolbar": {
            minHeight: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 15,
          },
          "& .MuiInputBase-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-select, & .MuiTablePagination-actions":
            {
              margin: 0,
              lineHeight: "30px",
              fontSize: 15,
            },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          border: 1,
          borderRadius: 2,
        },
      },
    },
  },
};

export default themeOptions;
