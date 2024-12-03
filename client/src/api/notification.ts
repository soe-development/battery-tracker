import axios from "axios";
import api from "./api";

export const getNotificationsData = async () => {
  const { data } = await api.get(process.env.API_URL + `/notifications/find`);

  return data;
};

export const createNotificationsEntry = async () => {
  const { data } = await api.post(
    process.env.API_URL + `/notifications/create`
  );

  return data;
};

export const updateNotifications = async (data: any) => {
  const response = await axios.post(
    process.env.API_URL + `/notifications/update`,
    {
      data: data,
    }
  );

  return response.data;
};
