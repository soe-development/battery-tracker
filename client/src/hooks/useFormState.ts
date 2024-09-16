import { useEffect, useState } from "react";
import { getCreateData } from "@/api/table/table";
import { setModalState } from "@/store/TableState/modalWindowState";

export const useFormState = (
  name: string,
  newRowStartRequest: boolean,
  elements: any[]
) => {
  const [formState, setFormState] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (newRowStartRequest) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const { data } = await getCreateData(name);
          setModalState(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [elements, name, newRowStartRequest]);

  useEffect(() => {
    if (!loading && elements.length > 0) {
      const initialState = elements
        .filter((element) => element.type !== "actions")
        .map((element) => ({
          name: element.name,
          value: "",
          id: null,
          label: element.label,
          validate:
            element.type === "input" || element.type === "select"
              ? element.validate
              : false,
          isValid: true,
          fc: element.fc,
        }));

      setFormState(initialState);
    }
  }, [elements, loading]); // отслеживаем завершение загрузки

  return { formState, setFormState, loading };
};
