import {
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TableContext from "@/context/cabinet/TableContext";
import { getTableState, tabs } from "@/store/TableState";
import ActionButtons from "../../CommonComponents/ActionButtons";
import {
  applyFilters,
  compare,
  filterByDate,
  transformData,
} from "../../../../../utils/tfunctions";
import TRowExpandble from "../../CommonComponents/TRowExpandble";
import { getData, getDataById } from "@/api/table/table";
import { getTab } from "@/context/cabinet/getTab";

const TBodyTop = ({ activeTable }: { activeTable: string }) => {
  const {
    rowsTopTable,
    filtersTopTable,
    pageTopTable,
    rowsPerPageTopTable,
    orderTopTable,
    orderByTopTable,
    editRow,
    setEditRow,
    startDateGlobalFilter,
    endDateGlobalFilter,
  } = useContext(TableContext);

  const [selectData, setSelectData] = useState<{ [key: string]: any[] }>({});

  const [selectedRowNumber, setSelectedRowNumber] = useState<number | null>(
    null
  );

  const { exceptionKeyColumn, expandbleRow, editableFields } =
    getTableState(activeTable);

  //filterByDate
  let filtredRows;

  if (activeTable === "total-table")
    filtredRows = filterByDate(
      rowsTopTable,
      startDateGlobalFilter,
      endDateGlobalFilter
    );
  else filtredRows = rowsTopTable;

  console.log(rowsTopTable);

  const sortedAndFilteredRows = filtredRows
    .filter((row) => applyFilters(row, filtersTopTable))
    .sort((a, b) => compare(a, b, orderTopTable, orderByTopTable))
    .slice(
      pageTopTable * rowsPerPageTopTable,
      pageTopTable * rowsPerPageTopTable + rowsPerPageTopTable
    );

  const getDataSelect = () => {
    const sendData = editableFields.filter(
      (item: any) => item.type === "select"
    );

    sendData.forEach((item: any) => {
      getData(item.endpoint).then((response: any) => {
        const transformedData = transformData(
          response.data,
          item.nameTable,
          item.field
        );
        setSelectData((prev: any) => ({
          ...prev,
          [item.field]: transformedData,
        }));
      });
    });
  };

  const handleSelectChange = (e: any, key: string) => {
    const newValue = e.target.value;
    editRow.row[key] = newValue;
  };

  useEffect(() => {
    getDataSelect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableFields, editRow]);

  return (
    <TableBody>
      {sortedAndFilteredRows.map((row: any, index: number) =>
        expandbleRow ? (
          <TRowExpandble key={index} row={row} activeTable={activeTable}>
            <TableCell>
              {editRow.name === row.nameTable && editRow.row.id === row.id ? (
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
                <Typography sx={{ fontWeight: 600 }}>{row.name}</Typography>
              )}
            </TableCell>
            <TableCell>
              <ActionButtons
                activeTable={activeTable}
                row={row}
                nameTable={row.nameTable}
              />
            </TableCell>
          </TRowExpandble>
        ) : (
          <TableRow
            key={index}
            onClick={() => setSelectedRowNumber(row.rowNumber)}
            selected={selectedRowNumber === row.rowNumber}
            hover
          >
            {Object.keys(row)
              .filter((key: any) => !exceptionKeyColumn?.includes(key))
              .map((key: any) => {
                const editableField = editableFields.find(
                  (item: any) => item.field === key
                );

                const isEditable =
                  editRow.row.id === row.id &&
                  editableField &&
                  tabs.includes(row.nameTable || activeTable);

                return (
                  <TableCell
                    key={key}
                    sx={{
                      padding: "4px 15px",
                      fontSize: 16,
                      backgroundColor: key === "writtenOff" ? row.colorRow : "",
                    }}
                  >
                    {isEditable ? (
                      editableField.type === "input" ? (
                        <TextField
                          defaultValue={editRow.row[key]}
                          size="small"
                          type={editableField.typeField}
                          sx={{
                            width: "100%",
                            backgroundColor: "secondary.light",
                          }}
                          onChange={(e: any) => {
                            handleSelectChange(e, key);
                          }}
                        />
                      ) : editableField.type === "select" ? (
                        <Select
                          value={
                            selectData[key]?.some(
                              (option) => option.value === editRow.row[key]
                            )
                              ? editRow.row[key]
                              : ""
                          }
                          size="small"
                          sx={{
                            width: "80%",
                            backgroundColor: "secondary.light",
                          }}
                          onChange={(e: any) => {
                            const newValue = e.target.value;
                            const selectedOption = selectData[key]?.find(
                              (option: any) => option.value === newValue
                            );

                            const keyId = editableField.key;
                            setEditRow((prevEditRow: any) => ({
                              ...prevEditRow,
                              row: {
                                ...prevEditRow.row,
                                [key]: newValue,
                                [keyId]: selectedOption?.id ?? null,
                              },
                            }));
                          }}
                        >
                          {selectData[key]?.map((option: any) => (
                            <MenuItem key={option.id} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                        </Select>
                      ) : (
                        row[key]
                      )
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                );
              })}

            {!exceptionKeyColumn?.includes("actions") && (
              <TableCell sx={{ padding: "4px 15px", fontSize: 16 }}>
                <ActionButtons
                  activeTable={activeTable}
                  row={row}
                  nameTable={row.nameTable || ""}
                />
              </TableCell>
            )}
          </TableRow>
        )
      )}
    </TableBody>
  );
};

export default TBodyTop;
