export const tabs = [
  "batteries-directory",
  "districts-directory",
  "objects-directory",
  "other-equipment-directory",
  "ups-models-directory",
  "total-table",
  "receiving-batteries",
  "equipment-card",
];

const tableState = {
  "batteries-directory": {
    name: "Довідник АКБ",
    headColumnData: [
      {
        name: "rowNumber",
        label: "№",
        initial: null,
        filter: true,
        sort: true,
        width: 60,
        maxWidth: 10,
      },
      {
        name: "typeBattery",
        label: "Тип АКБ",
        initial: null,
        filter: true,
        sort: true,
        width: 120,
        maxWidth: 120,
      },
      {
        name: "a_h",
        label: "А/ч",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "actions",
        label: "Дії",
        initial: null,
        filter: false,
        sort: false,
        width: 100,
        maxWidth: 100,
      },
    ],
    exceptionKeyColumn: ["id"],
    initialFilters: {
      id: null,
      typeBattery: null,
      a_h: null,
    },
    rcspan: false,
    expandbleRow: false,
    actionMode: "modify",
    staticHeight: 288,
    newRowStartRequest: true,
    newRow: {
      "batteries-directory": [
        {
          type: "input",
          variant: "text",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Тип АКБ",
          name: "input1",
        },
        {
          type: "input",
          variant: "number",
          validate: true,
          isValid: true,
          disabled: false,
          label: "А/ч",
          name: "input2",
        },
        {
          type: "actions",
          disabled: true,
          label: "",
        },
      ],
    },
    editableFields: ["typeBattery", "a_h"],
  },
  "districts-directory": {
    name: "Довідник структурних підрозділів",
    headColumnData: [
      {
        name: "expander",
        label: "",
        initial: null,
        filter: false,
        sort: false,
        width: 20,
        maxWidth: 20,
      },
      {
        name: "name",
        label: "Філія",
        initial: null,
        filter: true,
        sort: true,
        width: "auto",
        maxWidth: 60,
      },
      {
        name: "actions",
        label: "Дії",
        initial: null,
        filter: false,
        sort: false,
        width: "auto",
        maxWidth: 60,
      },
    ],
    exceptionKeyColumn: ["id", "branchesDirectoryId", "districtsDirectories"],
    initialFilters: {
      id: null,
      name: null,
    },
    rcspan: false,
    expandbleRow: true,
    actionMode: "modify",
    staticHeight: 288,
    newRowStartRequest: true,
    newRow: {
      "districts-directory": [
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Філія",
          name: "branches-directory",
        },
        {
          type: "input",
          variant: "text",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Структурний підрозділ",
          name: "districts-directory",
        },
        {
          type: "actions",
          disabled: true,
          label: "",
        },
      ],
    },
    newRowSelect: {
      Філія: { value: [] },
    },
    editableFields: ["name"],
  },
  "branches-directory": {
    name: "Філія",
    headColumnData: [
      {
        name: "expander",
        label: "",
        initial: null,
        filter: false,
        sort: false,
        width: 20,
        maxWidth: 20,
      },
      {
        name: "name",
        label: "Філія",
        initial: null,
        filter: true,
        sort: true,
        width: "auto",
        maxWidth: 60,
      },
      {
        name: "actions",
        label: "Дії",
        initial: null,
        filter: false,
        sort: false,
        width: "auto",
        maxWidth: 60,
      },
    ],
    newRowStartRequest: true,

    newRow: {
      "branches-directory": [
        {
          type: "input",
          variant: "text",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Філія",
          name: "branches-directory",
        },
        {
          type: "actions",
          disabled: true,
          label: "",
        },
      ],
    },
    newRowState: [
      {
        type: "input",
        name: "",
        value: "",
      },
    ],
    editableFields: ["name"],
  },
  "objects-directory": {
    name: "Довідник об'єктів",
    headColumnData: [
      {
        name: "rowNumber",
        label: "№",
        initial: null,
        filter: true,
        sort: true,
        width: 60,
        maxWidth: 40,
      },
      {
        name: "districtName",
        label: "Структурний підрозділ",
        initial: null,
        filter: true,
        sort: true,
        width: 200,
        maxWidth: 200,
      },
      {
        name: "objectName",
        label: "Назва об'єкту",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "voltage",
        label: "Напруга",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },

      {
        name: "actions",
        label: "Дії",
        initial: null,
        filter: false,
        sort: false,
        width: 100,
        maxWidth: 100,
      },
    ],
    exceptionKeyColumn: ["id"],
    initialFilters: {
      id: null,
      objectName: null,
      voltage: null,
      districtName: null,
    },
    rcspan: false,
    expandbleRow: false,
    actionMode: "modify",
    staticHeight: 288,
    newRowStartRequest: true,
    newRow: {
      "objects-directory": [
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Філія",
          name: "branches-directory",
          fc: false,
        },
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Структурний підрозділ",
          name: "districts-directory",
          fc: "branches-directory",
        },
        {
          type: "input",
          variant: "text",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Назва об'єкту",
          name: "input1",
        },
        {
          type: "input",
          variant: "number",
          validate: false,
          isValid: true,
          disabled: false,
          label: "Напруга",
          name: "input2",
        },
        {
          type: "actions",
          disabled: true,
          label: "",
        },
      ],
    },
    editableFields: ["objectName", "voltage"],
  },
  "other-equipment-directory": {
    name: "Довідник іншого обладнання",
    headColumnData: [
      {
        name: "rowNumber",
        label: "№",
        initial: null,
        filter: true,
        sort: true,
        width: 60,
        maxWidth: 60,
      },
      {
        name: "producer",
        label: "Виробник",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "model",
        label: "Модель",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "typeBattery",
        label: "Встановленний тип АКБ на дату створення ПЗ",
        initial: null,
        filter: true,
        sort: true,
        width: 180,
        maxWidth: 180,
      },
      {
        name: "numberOfBattery",
        label: "Кількість АКБ",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "dateOfLastBatteryReplacement",
        label: "Дата останньої заміни АКБ",
        initial: null,
        filter: true,
        sort: true,
        width: 120,
        maxWidth: 120,
      },
      {
        name: "actions",
        label: "Дії",
        initial: null,
        filter: false,
        sort: false,
        width: 60,
        maxWidth: 60,
      },
    ],
    exceptionKeyColumn: ["id", "batteriesDirectoryId"],
    initialFilters: {
      id: null,
      producer: null,
      model: null,
      typeBattery: null,
      numberOfBatteries: null,
      dateOfLastBatteryReplacement: null,
    },
    rcspan: false,
    expandbleRow: false,
    actionMode: "modify",
    staticHeight: 288,
    newRowStartRequest: true,
    newRow: {
      "other-equipment-directory": [
        {
          type: "input",
          variant: "text",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Виробник",
          name: "input1",
        },
        {
          type: "input",
          variant: "text",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Модель",
          name: "input2",
        },
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Тип АКБ",
          name: "batteries-directory",
          fc: false,
        },
        {
          type: "input",
          variant: "number",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Кількість АКБ",
          name: "input3",
        },
        {
          type: "input",
          variant: "date",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Дата останньої заміни АКБ",
          name: "input4",
        },
        {
          type: "actions",
          disabled: true,
          label: "",
        },
      ],
    },
    editableFields: ["producer", "model", "numberOfBatteries"],
  },
  "ups-models-directory": {
    name: "Довідник моделей ДБЖ",
    headColumnData: [
      {
        name: "rowNumber",
        label: "№",
        initial: null,
        filter: true,
        sort: true,
        width: 60,
        maxWidth: 60,
      },
      {
        name: "power",
        label: "Потужність, VA",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "inventoryNumber",
        label: "Інв.№",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "s_n",
        label: "s/n",
        initial: null,
        filter: true,
        sort: true,
        width: 80,
        maxWidth: 80,
      },
      {
        name: "yearProductionUPS",
        label: "Рік випуску ДБЖ",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },

      {
        name: "apcs",
        label: "АСУ ТП",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "dateOfLastBatteryReplacement",
        label: "Дата останньої заміни",
        initial: null,
        filter: true,
        sort: true,
        width: 130,
        maxWidth: 130,
      },
      {
        name: "object",
        label: "Об'єкт розміщення",
        initial: null,
        filter: true,
        sort: true,
        width: 110,
        maxWidth: 110,
      },
      {
        name: "actions",
        label: "Дії",
        initial: null,
        filter: false,
        sort: false,
        width: 60,
        maxWidth: 60,
      },
    ],
    exceptionKeyColumn: [
      "id",
      "batteriesDirectoryId",
      "otherEquipmentDirectoryId",
      "districtsDirectoryId",
      "branchesDirectoryId",
      "upsModelsDirectoryid",
      "objectsDirectoryId",
      "producer",
      "model",
      "typeBattery",
    ],
    initialFilters: {
      id: null,
      objectName: null,
      voltage: null,
      districtName: null,
    },
    rcspan: false,
    expandbleRow: false,
    actionMode: "modify",
    staticHeight: 288,
    newRowStartRequest: true,
    newRow: {
      "ups-models-directory": [
        {
          type: "input",
          variant: "number",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Потужність",
          name: "input1",
        },
        {
          type: "input",
          variant: "text",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Інв.№",
          name: "input2",
        },
        {
          type: "input",
          variant: "text",
          validate: true,
          isValid: true,
          disabled: false,
          label: "s/n",
          name: "input3",
        },
        {
          type: "input",
          variant: "text",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Рік випуску ДБЖ",
          name: "input4",
        },
        {
          type: "input",
          variant: "date",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Дата останньої заміни",
          name: "input5",
        },
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "АСУ ТП",
          name: "ups-models-directory",
          fc: false,
        },
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Виробник/Модель/Тип АКБ",
          name: "other-equipment-directory",
          fc: false,
        },

        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Об'єкт розміщення",
          name: "objects-directory",
          fc: false,
        },
        {
          type: "actions",
          disabled: true,
          label: "",
        },
      ],
    },
    editableFields: ["power"],
  },
  "total-table": {
    name: "Облік заміни АКБ",
    headColumnData: [
      {
        name: "rowNumber",
        label: "№",
        initial: null,
        filter: false,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 20,
        maxWidth: 50,
      },
      {
        name: "object",
        label: "Об'єкт",
        initial: null,
        filter: false,
        sort: false,
        colspan: 3,
        rowspan: 1,
        width: 20,
        maxWidth: 20,
      },
      {
        name: "producer",
        label: "Виробник",
        initial: null,
        filter: true,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "model",
        label: "Модель",
        initial: null,
        filter: true,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "voltage",
        label: "Потужність",
        initial: null,
        filter: false,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 80,
        maxWidth: 80,
      },
      {
        name: "numberOfBatteries",
        label: "К-сть АКБ",
        initial: null,
        filter: false,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 80,
        maxWidth: 80,
      },
      {
        name: "inventoryNumber",
        label: "Інвентарний номер",
        initial: null,
        filter: false,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 80,
        maxWidth: 80,
      },
      {
        name: "typeBattery",
        label: "Встановлений тип АКБ",
        initial: null,
        filter: true,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "dateOfLastBatteryReplacement",
        label: "Дата останньої заміни АКБ",
        initial: null,
        filter: true,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 120,
        maxWidth: 120,
      },
    ],

    exceptionKeyColumn: [
      "id",
      "upsModelsDirectoryId",
      "batteryId",
      "districtId",
      "objectId",
      "equipmentCardId",
      "actions",
    ],
    initialFilters: {
      id: null,
      producer: null,
      model: null,
      voltage: null,
      numberOfBatteries: null,
      inventoryNumber: null,
      typeBattery: null,
      dateOfLastBatteryReplacement: null,
    },
    rcspan: true,
    expandbleRow: false,
    actionMode: "modify",
    staticHeight: 236,
    newRowStartRequest: false,
    newRow: {
      "total-table": [],
    },
    editableFields: [],
  },
  "receiving-batteries": {
    name: "Отримання АКБ",
    headColumnData: [
      {
        name: "rowNumber",
        label: "№",
        initial: null,
        filter: false,
        sort: true,
        width: 100,
      },
      {
        name: "dateOfReceiving",
        label: "Дата отримання",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
      },
      {
        name: "typeBattery",
        label: "Тип АКБ",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
      },
      {
        name: "numbers",
        label: "Кількість",
        initial: null,
        filter: false,
        sort: true,
        width: 100,
      },
      {
        name: "currentBalance",
        label: "Поточний залишок",
        initial: null,
        filter: false,
        sort: true,
        width: 100,
      },
      {
        name: "counterparty",
        label: "Контрагент",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
      },
      {
        name: "contract",
        label: "Номер договору",
        initial: null,
        filter: false,
        sort: true,
        width: 100,
      },
      {
        name: "contractDate",
        label: "Дата договору",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
      },

      {
        name: "actions",
        label: "Дії",
        initial: null,
        filter: false,
        sort: false,
        width: 100,
      },
    ],
    exceptionKeyColumn: ["id", "batteriesDirectoryId", "receiptId", "addId"],

    initialFilters: {
      id: null,
      dateOfReceiving: null,
      typeBattery: null,
      numbers: null,
      currentBalance: null,
      contract: null,
      contractDate: null,
      counterparty: null,
    },
    rcspan: false,
    expandbleRow: false,
    actionMode: "add;delete",
    staticHeight: 288,
    newRowStartRequest: true,
    newRow: {
      "receiving-batteries": [
        {
          type: "input",
          variant: "date",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Дата отримання",
          name: "input1",
        },
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Тип АКБ",
          name: "batteries-directory",
          fc: false,
        },
        {
          type: "input",
          variant: "number",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Кількість",
          name: "input2",
        },
        {
          type: "input",
          variant: "number",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Поточний залишок",
          name: "input3",
        },
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Контрагент",
          name: "counterparties-directory",
          fc: false,
        },
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Номер договору",
          name: "contracts-directory",
          fc: "counterparties-directory",
        },
        // {
        //   type: "input",
        //   disabled: false,
        //   label: "Дата договору",
        //   name: "input4",
        // },
        {
          type: "actions",
          disabled: true,
          label: "",
        },
      ],
    },
    editableFields: [],
  },
  "equipment-card": {
    name: "Картка обладнання",
    headColumnData: [
      {
        name: "rowNumber",
        label: "№",
        initial: null,
        filter: false,
        sort: true,
        width: 20,
        maxWidth: 20,
      },
      {
        name: "producer",
        label: "Виробник",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "model",
        label: "Модель",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "voltage",
        label: "Потужність",
        initial: null,
        filter: false,
        sort: true,
        width: 70,
        maxWidth: 70,
      },
      {
        name: "typeBattery",
        label: "Встановлений тип АКБ",
        initial: null,
        filter: true,
        sort: true,
        width: 160,
        maxWidth: 160,
      },
      {
        name: "numberOfBatteries",
        label: "К-сть АКБ",
        initial: null,
        filter: false,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "yearProductionUPS",
        label: "Рік випуску",
        initial: null,
        filter: true,
        sort: true,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "inventoryNumber",
        label: "Інвентарний номер",
        initial: null,
        filter: true,
        sort: true,
        width: 150,
        maxWidth: 150,
      },
      {
        name: "s_n",
        label: "s/n",
        initial: null,
        filter: false,
        sort: true,
        width: 40,
        maxWidth: 40,
      },
      {
        name: "apcs",
        label: "АСУ ТП",
        initial: null,
        filter: false,
        sort: true,
        width: 80,
        maxWidth: 80,
      },
      {
        name: "batteryReplacement",
        label: "Заміна АКБ",
        initial: null,
        filter: false,
        sort: false,
        width: 80,
        maxWidth: 80,
      },
    ],
    exceptionKeyColumn: [
      "id",
      "upsModelsDirectoryId",
      "batteriesDirectoryId",
      "otherEquipmentDirectoryId",
      "addId",
    ],

    initialFilters: {
      id: null,
      producer: null,
      model: null,
      voltage: null,
      numberOfBatteries: null,
      inventoryNumber: null,
      typeBattery: null,
      dateOfLastBatteryReplacement: null,
    },
    rcspan: false,
    expandbleRow: false,
    actionMode: "add",
    staticHeight: 288,
    newRowStartRequest: true,
    newRow: {
      "equipment-card": [
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Виробник/Модель/Тип АКБ/Інв.№/s/n",
          name: "ups-models-directory",
          fc: false,
        },
        {
          type: "actions",
          disabled: true,
          label: "",
        },
      ],
    },
    editableFields: [],
  },
  "battery-replacement": {
    name: "Заміна АКБ",
    headColumnData: [
      {
        name: "rowNumber",
        label: "№",
        initial: null,
        filter: false,
        sort: true,
      },
      {
        name: "date",
        label: "Дата",
        initial: null,
        filter: false,
        sort: true,
      },
      {
        name: "typeBattery",
        label: "Встановлений тип АКБ",
        initial: null,
        filter: false,
        sort: true,
      },
      {
        name: "numberOfBatteries",
        label: "К-сть АКБ",
        initial: null,
        filter: false,
        sort: true,
      },
      {
        name: "actions",
        label: "Дії",
        initial: null,
        filter: false,
        sort: false,
      },
    ],
    exceptionKeyColumn: [
      "id",
      "batteriesDirectoryId",
      "upsModelsDirectoryId",
      "batteriesDirectoryId",
      "otherEquipmentDirectoryId",
      "receiptId",
    ],
    initialFilters: {
      id: null,
      date: null,
      typeBattery: null,
      numberOfBatteries: null,
    },
    rcspan: false,
    expandbleRow: false,
    actionMode: "modify",
    staticHeight: 288,
    newRowStartRequest: true,
    newRow: {
      "battery-replacement": [
        {
          type: "input",
          variant: "date",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Дата",
          name: "input1",
        },
        {
          type: "select",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Встановленний тип АКБ/Контрагент/Номер договору",
          name: "receiving-batteries",
          fc: false,
        },
        {
          type: "input",
          variant: "number",
          validate: true,
          isValid: true,
          disabled: false,
          label: "Кількість",
          name: "input2",
        },
        {
          type: "data",
          name: "equipmentCardId",
        },
        {
          type: "actions",
          disabled: true,
          label: "",
        },
      ],
    },
    editableFields: ["numberOfBatteries"],
  },
  "expenses-table": {
    name: "Витрати",
    headColumnData: [
      {
        name: "rowNumber",
        label: "№",
        initial: null,
        filter: false,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 20,
        maxWidth: 20,
      },
      {
        name: "object",
        label: "Об'єкт",
        initial: null,
        filter: false,
        sort: false,
        colspan: 3,
        rowspan: 1,
        width: 50,
        maxWidth: 50,
      },
      {
        name: "producer",
        label: "Виробник",
        initial: null,
        filter: true,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 100,
        maxWidth: 100,
      },
      {
        name: "model",
        label: "Модель",
        initial: null,
        filter: true,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 60,
        maxWidth: 60,
      },
      {
        name: "voltage",
        label: "Потужність",
        initial: null,
        filter: false,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 50,
        maxWidth: 50,
      },
      {
        name: "numberOfBatteries",
        label: "К-сть АКБ",
        initial: null,
        filter: false,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 60,
        maxWidth: 60,
      },
      {
        name: "inventoryNumber",
        label: "Інвентарний номер",
        initial: null,
        filter: false,
        sort: true,
        colspan: 1,
        rowspan: 2,
        width: 100,
        maxWidth: 100,
      },
    ],
    exceptionKeyColumn: [
      "id",
      "upsModelsDirectoryId",
      "batteriesDirectoryId",
      "districtId",
      "objectId",
      "equipmentCardId",
      "actions",
    ],
    initialFilters: {
      id: null,
      producer: null,
      model: null,
      voltage: null,
      numberOfBatteries: null,
      inventoryNumber: null,
      typeBattery: null,
      dateOfLastBatteryReplacement: null,
    },
    rcspan: true,
    expandbleRow: false,
    actionMode: "modify",
    staticHeight: 236,
    newRowStartRequest: false,
    newRow: [],
    editableFields: [],
  },
};

export const getTableState = (tab: string): TableState => {
  return tableState[tab as keyof typeof tableState];
};
