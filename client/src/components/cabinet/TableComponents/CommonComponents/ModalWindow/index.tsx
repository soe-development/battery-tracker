import React, { useContext } from "react";
import TableContext from "@/context/cabinet/TableContext";
import { getTableState } from "@/store/TableState";
import { Modal, Box, CircularProgress } from "@mui/material";
import ModalHeader from "./ModalComponents/ModalHeader";
import ModalBody from "./ModalComponents/ModalBody";
import ModalFooter from "./ModalComponents/ModalFooter";
import { useFormState } from "@/hooks/useFormState";
import { createEntry } from "@/api/table/table";
import { isNotEmptyField } from "@/utils/validation";

const modalWrapper = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",
    sm: "90%",
    md: 700,
  },
  maxHeight: "90vh",
  overflowX: "hidden",
  bgcolor: "background.paper",
  border: 1,
  borderColor: "secondary.main",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ModalWindow = () => {
  const { newRow, setNewRow, setSnackbarState, activeAddId, setOpenSnackbar } =
    useContext(TableContext);
  const tableState = getTableState(newRow.name) || {
    name: "",
    newRowStartRequest: false,
  };
  const { name, newRowStartRequest } = tableState;

  const elements = tableState.newRow
    ? tableState.newRow[newRow.name] || []
    : [];

  const { formState, setFormState, loading } = useFormState(
    newRow.name,
    newRowStartRequest,
    elements
  );

  const preparedFormState = formState.map((field) => {
    const element = elements.find(
      (el: any) => el.name === field.name && el.type === "data"
    );
    return element ? { ...field, id: activeAddId } : field;
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prevState) =>
      prevState.map((field) =>
        field.name === name ? { ...field, value } : field
      )
    );
  };

  const handleSelectChange = (e: any, id: number) => {
    const { name, value } = e.target;
    setFormState((prevState) =>
      prevState.map((field) =>
        field.name === name ? { ...field, value, id } : field
      )
    );
  };

  const handleClick = () => {
    const validateArray = [] as any;
    let forHelperText = "";

    preparedFormState.forEach((element: any) => {
      if (element.validate) {
        let checkField = isNotEmptyField(element.value);
        validateArray.push(checkField);
        forHelperText += !checkField ? element.label + "; " : "";
      }
    });

    if (!validateArray.includes(false)) {
      createEntry(newRow.name, preparedFormState).finally(() => {
        setNewRow({
          status: false,
          name: "",
        });
        setSnackbarState({
          type: "success",
          mainText: "Дані успішно збережено!",
          helperText: "",
        });
        setOpenSnackbar(true);
      });
    } else {
      setSnackbarState({
        type: "error",
        mainText: (
          <>
            Не всі обов&apos;язкові поля заповнені! <br /> Поля, які не
            заповнені:
          </>
        ),
        helperText: forHelperText,
      });
      setOpenSnackbar(true);
    }
  };

  return (
    <Modal
      open={newRow.status && !loading}
      onClose={() => setNewRow({ status: false, name: "" })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalWrapper}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ModalHeader
              onClose={() => setNewRow({ status: false, name: "" })}
              title={name as string}
            />
            <ModalBody
              elements={elements}
              formState={formState}
              preparedFormState={preparedFormState}
              onChange={handleOnChange}
              onSelectChange={handleSelectChange}
            />
            <ModalFooter onClick={handleClick} loading={loading} />
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ModalWindow;
