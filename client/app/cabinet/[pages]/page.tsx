import Cabinet from "@/components/cabinet";
import { NavContextProvider } from "@/context/cabinet/NavContext";
import { TableContextProvider } from "@/context/cabinet/TableContext";

const CabinetPage = () => {
  return (
    <NavContextProvider>
      <TableContextProvider>
        <Cabinet />
      </TableContextProvider>
    </NavContextProvider>
  );
};

export default CabinetPage;
