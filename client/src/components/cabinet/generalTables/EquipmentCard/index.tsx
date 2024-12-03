import TableContext from "@/context/cabinet/TableContext";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Button,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { useContext } from "react";
import TWrapper from "../../TableComponents/TWrapper";
import { ExcelExport } from "@/utils/excel";

const EquipmentCard = () => {
  const { activeTable, setNewRow, setUpdate, editRow, rowsTopTable } =
    useContext(TableContext);

  const handleExcelExport = () => {
    const exportData = rowsTopTable.map((item: any) => {
      return {
        Виробник: item.producer,
        Модель: item.model,
        Потужність: item.power,
        "Тип АКБ": item.typeBattery,
        "К-сть АКБ": item.numberOfBatteries,
        "Рік випуску": item.yearProductionUPS,
        "Інв. номер": item.inventoryNumber,
        "s/n": item.s_n,
        "АСУ ТП": item.apsc,
        "Об'єкт розміщення": item.objectLocation,
        "Статус списання": item.writtenOff,
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
      { wch: 25 },
    ];

    const nameTable = "Картка_обладнання_";

    ExcelExport(exportData, widthColumn, nameTable);
  };

  return (
    <Box>
      <Typography variant="h6" className="titleTypography">
        Картка обладнання
      </Typography>

      <Divider />
      <Paper className="wrapperButtons">
        <Button
          variant="contained"
          className="addButton"
          onClick={() => {
            setNewRow({ status: true, name: "equipment-card" });
          }}
          disabled={editRow.status}
        >
          Додати запис
        </Button>
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
        {rowsTopTable.length === 0 && <LinearProgress />}
      </Paper>
      {activeTable ? (
        <Box sx={{ display: "grid", height: 10 }}>
          <TWrapper
            topTable={activeTable}
            bottomTable={"battery-replacement"}
          />
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export default EquipmentCard;
