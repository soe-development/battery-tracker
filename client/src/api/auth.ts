import { IUser } from "@/types/user";
import api from "./api";

export const requestLogIn = async (login: string, password: string) => {
  await api.post(
    process.env.API_URL + "/auth/login",
    {
      login: login,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
};

export const getUser = async () => {
  const { data } = await api.get<IUser>(process.env.API_URL + "/auth/user");

  return data;
};
