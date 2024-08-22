import { Paper } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        position: "fixed",
        bottom: 0,
        width: "100%",
        p: "15px",
        zIndex: 9,
      }}
      component="footer"
      square
      variant="outlined"
    >
      © АТ Сумиобленерго, 2024
    </Paper>
  );
};

export default Footer;
