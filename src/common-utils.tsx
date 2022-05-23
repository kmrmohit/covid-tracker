import { Row } from "react-table";

export const isNumber = (num: string | number) => {
  return !isNaN(num as any);
};

export const debounce = (cb: Function, timeout: number = 1000) => {
  let it: any;
  const val = this;
  return function () {
    clearTimeout(it);
    console.log("interval cleared", val, arguments);
    it = setTimeout(cb, timeout);
  };
};

export const numericRenderer = (value: number) => {
  return new Intl.NumberFormat().format(value);
};

export const numericFilter = (
  unfilteredRows: Row[],
  [columnId]: string[],
  filterValue: string
) => {
  return unfilteredRows.filter((row) =>
    String(row.values[columnId]).startsWith(filterValue)
  );
};
