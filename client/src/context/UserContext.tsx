"use client";
import { getUser, requestLogOut } from "@/api/auth";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";
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
  //const router = useRouter();

  const [user, setUser] = useState(initialUser || null);

  const clearUser = useCallback(() => {
    requestLogOut()
      .then(() => {})
      .finally(() => {
        setUser(null);
        window.location.reload();
      });
  }, []);

  const refetchUser = useCallback(() => {
    getUser()
      .then((response: any) => {
        setUser(response.user);
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
