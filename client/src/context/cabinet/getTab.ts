import { tabs } from "@/store/navigation";
import { usePathname } from "next/navigation";

export const getTab = () => {
  const route = usePathname();
  return tabs.filter((element) => route.includes(element))[0];
};
