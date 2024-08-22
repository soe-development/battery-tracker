export const modifyTableData = (data: any) => {
  return data.map((element: any, index: number) => {
    element.rowNumber = index + 1;
    return { rowNumber: element.rowNumber, ...element };
  });
};
