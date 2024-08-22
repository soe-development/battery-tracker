import api from "./api";

export const getDataTable = async (name: string) => {
  console.log(process.env.API_URL + `/${name}/find`);
  const { data } = await api.get(process.env.API_URL + `/${name}/find`);

  return data;
};

export const getDataTableById = async (name: string, id: number) => {
  const { data } = await api.post(process.env.API_URL + `/${name}/find`, {
    id: id,
  });

  return data;
};
