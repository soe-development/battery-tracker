import { Box, TextField } from "@mui/material";

interface TextInputProps {
  name: string;
  label: string;
  type: string;
  isValid: boolean;
  value: string;
  formState: any;
  onChange: any;
}

const TextInput = ({
  name,
  label,
  type,
  isValid,
  value,
  formState,
  onChange,
}: TextInputProps) => {
  console.log(formState);
  return (
    <Box sx={{ py: 0.5 }}>
      <TextField
        variant="standard"
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        InputLabelProps={{
          shrink: type === "date" ? true : undefined,
        }}
        error={!isValid}
        helperText={!isValid ? "Обов'язкове поле" : ""}
        fullWidth
      />
    </Box>
  );
};

export default TextInput;
