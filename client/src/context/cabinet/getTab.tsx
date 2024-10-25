import { tabs } from "@/store/navigation";
import { usePathname } from "next/navigation";

export const getTab = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const route = usePathname();
  return tabs.filter((element) => route.includes(element))[0];
};
