export const applyFilters = (row: any, filters: any) =>
  Object.keys(filters).every((key) =>
    filters[key]
      ? String(row[key]).toLowerCase().includes(filters[key].toLowerCase())
      : true
  );

export const compare = (
  a: any,
  b: any,
  orderTopTable: any,
  orderByTopTable: any
) => {
  if (orderTopTable === "asc") {
    return a[orderByTopTable] > b[orderByTopTable] ? 1 : -1;
  }
  return a[orderByTopTable] < b[orderByTopTable] ? 1 : -1;
};
