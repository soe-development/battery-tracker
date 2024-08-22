import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  {
    name: "Довідники",
    specName: "Directories",
    style: {
      ml: 8,
    },
    content: [
      {
        id: 0,
        name: "Довідник моделей ДБЖ",
        href: "/cabinet/ups-models-directory",
      },
      {
        id: 1,
        name: "Довідник іншого обладнання",
        href: "/cabinet/other-equipment-directory",
      },
      {
        id: 2,
        name: "Довідник АКБ",
        href: "/cabinet/batteries-directory",
      },
      {
        id: 3,
        name: "Довідник об'єктів",
        href: "/cabinet/objects-directory",
      },
      {
        id: 4,
        name: "Довідник структурних підрозділів",
        href: "/cabinet/districts-directory",
      },
    ],
  },
  {
    name: "Загальні таблиці",
    specName: "TotalTables",
    style: {
      ml: 20,
    },
    content: [
      {
        id: 0,
        name: "Облік заміни АКБ",
        href: "/cabinet/total-table",
      },
      {
        id: 1,
        name: "Картка обладнання",
        href: "/cabinet/equipment-card",
      },
      {
        id: 2,
        name: "Отримання АКБ",
        href: "/cabinet/receiving-batteries",
      },
    ],
  },
];

const NavigationMenu = () => {
  const [openTabsDirectories, setOpenTabsDirectories] = useState(false);
  const [openTabsGeneralTables, setOpenTabsGeneralTables] = useState(false);

  const handleOpenTab = (nameTab: string) => {
    setOpenTabsDirectories(nameTab === "Directories");
    setOpenTabsGeneralTables(nameTab === "TotalTables");
  };

  const handleCloseTab = () => {
    setOpenTabsDirectories(false);
    setOpenTabsGeneralTables(false);
  };

  const isTabOpen = (nameTab: string) => {
    return (
      (nameTab === "Directories" && openTabsDirectories) ||
      (nameTab === "TotalTables" && openTabsGeneralTables)
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ml: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          textDecoration: "none",
        }}
      >
        <Box
          component="img"
          src={"/static/images/logo.svg"}
          alt="logo"
          sx={{
            mr: 2,
            width: "45px",
          }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {navigation.map((tab: any, index: number) => (
          <Box
            onMouseEnter={() => {
              handleOpenTab(tab.specName);
            }}
            onMouseLeave={() => {
              handleCloseTab();
            }}
            key={index + tab.specName + "wrapp"}
          >
            <Button sx={{ my: 2, color: "secondary.light", display: "block" }}>
              {tab.name}
            </Button>
            {isTabOpen(tab.specName) && (
              <List
                sx={{
                  backgroundColor: "secondary.light",
                  position: "absolute",
                  ml: tab.style.ml,
                  top: "100%",
                  left: 0,
                  p: 0,
                  border: "1px solid #ccc",
                  color: "secondary.dark",
                  zIndex: 10,
                  borderRadius: "2px 2px 8px 8px",
                }}
              >
                {tab.content.map((item: any, itemIndex: number) => (
                  <ListItem
                    component={Link}
                    href={item.href}
                    sx={{
                      color: "secondary.dark",
                      "&:hover": {
                        backgroundColor: "lightgrey",
                      },
                    }}
                    key={itemIndex + tab.specName + item.id + "li"}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default NavigationMenu;
