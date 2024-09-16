type TableState = {
  name?: string;
  headColumnData?: any;
  initialFilters?: any;
  exceptionKeyColumn?: string[];
  rcspan?: boolean;
  expandbleRow?: boolean;
  actionMode?: string;
  staticHeight?: number;
  newRow?: any;
  newRowStartRequest?: any;
};

interface Field {
  value: any;
}
