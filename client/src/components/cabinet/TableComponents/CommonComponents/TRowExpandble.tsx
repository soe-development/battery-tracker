import { TableCell, IconButton, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import ActionButtons from "./ActionButtons";

const TRowExpandble = ({ children, row, activeTable }: any) => {
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
            <TableCell>{item.name}</TableCell>
            <TableCell sx={{ padding: "4px 15px", fontSize: 16 }}>
              <ActionButtons activeTable={activeTable} />
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

export default TRowExpandble;
