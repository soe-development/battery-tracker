import { Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import TableContext from "@/context/cabinet/TableContext";
import { useContext } from "react";

const CancelButton = () => {
  const { setEditRow } = useContext(TableContext);

  return (
    <Button
      variant="contained"
      size="small"
      className="rowModifyButtons rowRedButton"
      startIcon={<CancelOutlinedIcon />}
      onClick={() => {
        setEditRow({ status: false, name: "", row: {} });
      }}
    />
  );
};

export default CancelButton;
