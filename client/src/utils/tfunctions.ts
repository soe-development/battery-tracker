import dayjs from "dayjs";

export const applyFilters = (row: any, filters: any) =>
  Object.keys(filters).every((key) =>
    filters[key]
      ? String(row[key]).toLowerCase().includes(filters[key].toLowerCase())
      : true
  );

export const filterByDate = (
  data: any[],
  startDate: string,
  endDate: string
) => {
  const filteredData = data.filter((item) => {
    const itemDate = dayjs(item.dateOfLastBatteryReplacement);
    return (
      itemDate.isAfter(dayjs(startDate).subtract(1, "day")) &&
      itemDate.isBefore(dayjs(endDate).add(1, "day"))
    );
  });
  return filteredData;
};

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

export const transformData = (
  data: any,
  nameTable: string,
  nameField: string
) => {
  switch (nameTable) {
    case "districtsDirectories":
      return data
        .flatMap((branch: any) => {
          return branch.districtsDirectories;
        })
        .map((district: any) => ({
          id: district.id,
          value: district.name,
          label: district.name,
        }));

    default:
      return data.map((item: any) => ({
        id: item.id,
        value: item[nameField],
        label: item[nameField],
      }));
  }
};
