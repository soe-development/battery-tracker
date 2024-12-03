import TableContext from "@/context/cabinet/TableContext";
import {
  Box,
  Typography,
  Divider,
  Paper,
  LinearProgress,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useContext, useState } from "react";
import TWrapper from "../../TableComponents/TWrapper";
import { ExcelExport } from "@/utils/excel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";
import { DateField, DatePicker } from "@mui/x-date-pickers-pro";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const TotalTable = () => {
  const {
    activeTable,
    setUpdate,
    editRow,
    rowsTopTable,
    startDateGlobalFilter,
    setStartDateGlobalFilter,
    endDateGlobalFilter,
    setEndDateGlobalFilter,
  } = useContext(TableContext);

  const handleExcelExport = () => {
    const exportData = rowsTopTable.map((item: any) => {
      return {
        "Структурний підрозділ": item.districtName,
        "Назва об'єкта": item.objectsDirectoryName,
        Напруга: item.voltage,
        Виробник: item.producer,
        Модель: item.model,
        Потужність: item.power,
        "К-сть АКБ": item.numberOfBatteries,
        "Інв. номер": item.inventoryNumber,
        "Тип АКБ": item.typeBattery,
        "Дата останньої заміни": item.dateOfLastBatteryReplacement,
      };
    });
    const widthColumn = [
      { wch: 25 },
      { wch: 30 },
      { wch: 10 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 20 },
      { wch: 25 },
    ];

    const nameTable = "Облік_заміни_АКБ_";

    ExcelExport(exportData, widthColumn, nameTable);
  };

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Облік заміни АКБ
      </Typography>
      <Divider />
      <Paper
        className="wrapperButtons"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Button
          variant="contained"
          className="updateButton"
          onClick={() => {
            setUpdate((prev: boolean) => {
              return !prev;
            });
          }}
          disabled={editRow.status}
        >
          Оновити таблицю
        </Button>
        <Button
          variant="contained"
          className="addButton"
          onClick={() => {
            handleExcelExport();
          }}
          disabled={editRow.status}
        >
          Завантажити таблицю в excel
        </Button>
        {/* <FormControl
          sx={{
            minWidth: 200,
            display: "inline-flex",
            marginRight: 2,
          }}
        >
          <InputLabel id="districts-select-label">
            Структурний підрозділ
          </InputLabel>
          <Select
            labelId="districts-select-label"
            value={10}
            label="Структурний підрозділ"
            size={"small"}
            onChange={() => {}}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            minWidth: 200,
            display: "inline-flex",
            marginRight: 2,
          }}
        >
          <InputLabel id="objects-select-label">Назва об&apos;єкту</InputLabel>
          <Select
            labelId="objects-select-label"
            value={10}
            label="Назва об'єкту"
            size={"small"}
            onChange={() => {}}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker", "DatePicker"]}
            sx={{ pb: 1 }}
          >
            <DatePicker
              label="Початкова дата"
              defaultValue={dayjs(startDateGlobalFilter) || undefined}
              value={dayjs(startDateGlobalFilter)}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
              onChange={(value: any) => {
                setStartDateGlobalFilter(value);
              }}
            />
            <DatePicker
              label="Кінцева дата"
              defaultValue={dayjs(new Date()) || undefined}
              value={dayjs(endDateGlobalFilter)}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
              onChange={(value: any) => {
                setEndDateGlobalFilter(value);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>

        {rowsTopTable.length === 0 && <LinearProgress />}
      </Paper>
      <Paper className="wrapperButtons"></Paper>
      {activeTable ? (
        <Box sx={{ display: "grid", height: 10 }}>
          <TWrapper topTable={activeTable} bottomTable={false} />
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export default TotalTable;
