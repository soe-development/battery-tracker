import api from "../api";

export const getData = async (name: string) => {
  const { data } = await api.get(process.env.API_URL + `/${name}/find`);

  return data;
};

export const getDataById = async (name: string, id: number) => {
  const { data } = await api.post(process.env.API_URL + `/${name}/find`, {
    id: id,
  });

  return data;
};

export const getCreateData = async (name: string) => {
  const { data } = await api.get(
    process.env.API_URL + `/${name}/findCreateData`
  );
  return data;
};

export const createEntry = async (name: string, sendData: any) => {
  const { data } = await api.post(process.env.API_URL + `/${name}/create`, {
    data: sendData,
  });

  return data;
};

export const deleteEntry = async (name: string) => {
  const { data } = await api.get(process.env.API_URL + `/${name}/delete`);

  return data;
};

export const editEntry = async (name: string, sendData: any) => {
  const { data } = await api.post(process.env.API_URL + `/${name}/edit`, {
    data: sendData,
  });

  return data;
};
