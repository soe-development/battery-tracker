"use client";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface IFormField<T> {
  value: T;
  isValid: boolean;
}

interface IAuthFormData {
  login: IFormField<string>;
  password: IFormField<string>;
}

interface IAuthContextProps {
  openSnackbar: boolean;
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
  authFormData: IAuthFormData;
  setAuthFormData: Dispatch<SetStateAction<IAuthFormData>>;
}

const defaultField = <T,>(value: T): IFormField<T> => ({
  value,
  isValid: true,
});

const defaultAuthData: IAuthFormData = {
  login: defaultField(""),
  password: defaultField(""),
};

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined
);

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authFormData, setAuthFormData] =
    useState<IAuthFormData>(defaultAuthData);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{ openSnackbar, setOpenSnackbar, authFormData, setAuthFormData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
