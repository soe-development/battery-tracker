"use client";
import { getUser } from "@/api/auth";
import { IUser } from "@/types/user";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

interface IUserContext {
  user: IUser | null;
  clearUser: () => void;
  refetchUser: () => void;
}

const UserContext = createContext<IUserContext>({
  user: null,
  clearUser: () => {},
  refetchUser: () => {},
});

interface IUserContextProviderProps extends PropsWithChildren {
  user?: IUser | null;
}

export const UserContextProvider: FC<IUserContextProviderProps> = ({
  user: initialUser,
  children,
}) => {
  const [user, setUser] = useState(initialUser || null);

  const clearUser = useCallback(() => {
    setUser(null);
  }, []);

  const refetchUser = useCallback(() => {
    getUser()
      .then((user) => {
        console.log(user);
        setUser(user);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{ user, clearUser, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
