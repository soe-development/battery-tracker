import React from "react";
import { Box } from "@mui/material";
import TextInput from "../Fields/TextInput";
import SelectInput from "../Fields/SelectInput";

interface ModalBodyProps {
  elements: any[];
  formState: any[];
  preparedFormState: any[];
  onChange: (e: any) => void;
  onSelectChange: (e: any, id: number) => void;
}

const ModalBody: React.FC<ModalBodyProps> = ({
  elements,
  formState,
  preparedFormState,
  onChange,
  onSelectChange,
}) => (
  <Box
    sx={{
      overflowY: "auto",
      overflowX: "hidden",
      maxHeight: {
        sm: "250px  !important",
      },
    }}
  >
    {elements.map((element: any, index: number) => (
      <Box sx={{ py: 0.5 }} key={index}>
        {element.type === "input" && (
          <TextInput
            name={element.name}
            label={element.label}
            type={element.variant}
            isValid={element.isValid}
            value={
              preparedFormState.find((field) => field.name === element.name)
                ?.value || ""
            }
            onChange={onChange}
            formState={formState}
          />
        )}
        {element.type === "select" && (
          <SelectInput
            name={element.name}
            label={element.label}
            value={
              preparedFormState.find((field) => field.name === element.name)
                ?.value || ""
            }
            formState={formState}
            fc={element.fc}
            onChange={(e, id) => onSelectChange(e, id)}
          />
        )}
      </Box>
    ))}
  </Box>
);

export default ModalBody;
