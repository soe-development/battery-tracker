import {
  TableCell,
  IconButton,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useContext, useState } from "react";
import ActionButtons from "./ActionButtons";
import TableContext from "@/context/cabinet/TableContext";

const TRowExpandble = ({ children, row, activeTable }: any) => {
  const { editRow, setEditRow } = useContext(TableContext);

  const [isExpanded, setIsExpanded] = useState(false);

  const [selectedRowNumber, setSelectedRowNumber] = useState<number | null>(
    null
  );

  const subRows = row.districtsDirectories;

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>

      {isExpanded &&
        subRows.map((item: any, index: number) => (
          <TableRow
            key={index}
            onClick={() => setSelectedRowNumber(index)}
            selected={selectedRowNumber === index}
            hover
          >
            <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
            <TableCell>
              {editRow.name === activeTable && editRow.row.id === item.id ? (
                <TextField
                  defaultValue={editRow.row.name}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setEditRow((prevEditRow: any) => {
                      const updatedRow = {
                        ...prevEditRow.row,
                        name: newValue,
                      };
                      return {
                        ...prevEditRow,
                        row: updatedRow,
                      };
                    });
                  }}
                  size={"small"}
                  sx={{ width: "100%", backgroundColor: "secondary.light" }}
                >
                  {editRow.row.name}
                </TextField>
              ) : (
                <Typography> {item.name}</Typography>
              )}
            </TableCell>
            <TableCell sx={{ padding: "4px 15px", fontSize: 16 }}>
              <ActionButtons
                activeTable={activeTable}
                row={item}
                nameTable={""}
              />
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

export default TRowExpandble;
