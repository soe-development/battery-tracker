import {
  getModalStateByName,
  getModalStateByNameAndById,
} from "@/store/TableState/modalWindowState";
import { Autocomplete, TextField } from "@mui/material";

interface SelectInputProps {
  name: string;
  label: string;
  value: string;
  formState: any;
  fc: string | boolean;
  onChange: (e: any, id: number) => void;
}

const SelectInput = ({
  name,
  label,
  value,
  formState,
  fc,
  onChange,
}: SelectInputProps) => {
  const id = fc && formState.find((field: any) => field.name === fc)?.id;

  const options = fc
    ? getModalStateByNameAndById(name, id)
    : getModalStateByName(name);

  const handleSelect = (event: any, selectedOption: any) => {
    if (selectedOption) {
      onChange(
        { target: { name, value: selectedOption.name } },
        selectedOption.id
      );
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option: any) => option.name || ""}
      value={options.find((option: any) => option.name === value) || null}
      onChange={(event, selectedOption) => handleSelect(event, selectedOption)}
      isOptionEqualToValue={(option: any, value: any) =>
        option.id === value?.id
      }
      renderInput={(params) => (
        <TextField
          key={1}
          {...params}
          label={label}
          variant="standard"
          fullWidth
        />
      )}
      renderOption={(props, option, index) => (
        <li {...props} key={option.id || index}>
          {option.name}
        </li>
      )}
    />
  );
};

export default SelectInput;
