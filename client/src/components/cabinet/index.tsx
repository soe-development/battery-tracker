"use client";
import NavContext from "@/context/cabinet/NavContext";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { useContext } from "react";
import TotalTable from "./generalTables/TotalTable";
import BatteriesDirectory from "./directories/BatteriesDirectory";
import DistrictsDirectory from "./directories/DistrictsDirectory";
import ObjectsDirectory from "./directories/ObjectsDirectory";
import OtherEquipmentDirectory from "./directories/OtherEquipmentDirectory";
import UpsModelsDirectory from "./directories/UpsModelsDirectory";
import EquipmentCard from "./generalTables/EquipmentCard";
import ReceivingDirectory from "./generalTables/ReceivingDirectory";

const tabs = {
  "batteries-directory": <BatteriesDirectory />,
  "districts-directory": <DistrictsDirectory />,
  "objects-directory": <ObjectsDirectory />,
  "other-equipment-directory": <OtherEquipmentDirectory />,
  "ups-models-directory": <UpsModelsDirectory />,
  "total-table": <TotalTable />,
  "receiving-batteries": <ReceivingDirectory />,
  "equipment-card": <EquipmentCard />,
};

const Cabinet = () => {
  const { activeTab } = useContext(NavContext);

  return (
    <>
      <Header />
      {tabs[activeTab as keyof typeof tabs]}
      <Footer />
    </>
  );
};

export default Cabinet;
