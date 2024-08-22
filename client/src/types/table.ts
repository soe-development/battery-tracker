type TableState = {
  headColumnData?: any;
  // {
  //   name: string;
  //   label: string;
  //   initial: null;
  //   filter: boolean;
  //   sort: boolean;
  //   width: number;
  //   maxWidth: number;
  //   colspan: number;
  //   rowspan: number;
  // }[];
  initialFilters?: any;
  exceptionKeyColumn?: string[];
  rcspan?: boolean;
  expandbleRow?: boolean;
  actionMode?: string;
};
