export const modalState: any = {
  "branches-directory": [],
  "districts-directory": [],
  "batteries-directory": [],
  "objects-directory": [],
  "other-equipment-directory": [],
  "ups-models-directory": [],
  "equipment-card": [],
  "counterparties-directory": [],
  "contracts-directory": [],
  "receiving-batteries": [],
};

const fcDirectories = {
  "districts-directory": "branchesDirectoryId",
  "contracts-directory": "counterpartiesDirectoryId",
} as any;

export const setModalState = (data: any[]) => {
  data.forEach((element: any) => {
    modalState[element.name] = element.value;
  });
};

export const getModalStateByName = (directory: string) => {
  return modalState[directory];
};

export const getModalStateByNameAndById = (directory: string, id: number) => {
  return modalState[directory].filter(
    (element: any) => element[fcDirectories[directory]] === id
  );
};
