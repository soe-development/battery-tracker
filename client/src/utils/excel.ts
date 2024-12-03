import * as XLSX from "xlsx";

export const ExcelExport = (
  exportData: any[],
  widthColumn: any[],
  nameTable: string
) => {
  const date = new Date();
  const nameFile = nameTable + date.toISOString();
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  worksheet["!cols"] = widthColumn;
  XLSX.utils.decode_range(worksheet["!ref"] || "");

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${nameFile}.xlsx`);
};
