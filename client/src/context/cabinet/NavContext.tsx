"use client";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { getTab } from "./getTab";

interface INavContext {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const NavContext = createContext<INavContext>({
  activeTab: "",
  setActiveTab: () => {},
});

export const NavContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const tab = getTab();

  const [activeTab, setActiveTab] = useState<string>(tab);

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContext;
