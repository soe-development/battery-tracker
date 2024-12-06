"use client";
import { getUser, requestLogOut } from "@/api/auth";
import { IUser } from "@/types/user";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { usePathname, redirect } from "next/navigation";

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

  const route = usePathname();

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

  useEffect(() => {
    if (!user && route.includes("cabinet")) redirect("/auth");
  }, [route, user]);

  return (
    <UserContext.Provider value={{ user, clearUser, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
