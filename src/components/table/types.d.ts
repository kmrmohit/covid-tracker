import { DefaultFilterTypes, DefaultSortTypes } from "react-table";

export type SortDirection = "asc" | "desc";

export interface DataSourceProps {
  key?: string;
}

export type Comparator = (a: any, b: any) => -1 | 0 | 1;

export interface ColumnProps<T extends DataSourceProps> {
  label: string;
  key: string;
  render?: (cellValue: any, record: T, index: number) => React.ReactNode;
  sort?: boolean;
  sortType?: DefaultSortTypes;
  hidden?: boolean;
  filter?: boolean;
  filterType?: DefaultFilterTypes | "startsWith";
}

export interface TableProps<T extends DataSourceProps> {
  dataSource: T[];
  columns: ColumnProps<T>[];
  defaultSortColumnKey?: keyof T;
  defaultSortDirection?: SortDirection;
  title?: string;
}
