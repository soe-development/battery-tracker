export const isNotEmptyField = (value: any) => {
  return (
    (typeof value === "string" && value.length > 0) ||
    (typeof value === "number" && !isNaN(value))
  );
};
