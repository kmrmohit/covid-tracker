// @ts-nocheck
import React, { useMemo } from "react";
import { useSortBy, useTable, useFilters, useGlobalFilter } from "react-table";
import { TableProps } from "./types";
import { DefaultColumnFilter } from "./widgets/filter-box";
import "./table.css";
import { numericFilter } from "../../common-utils";

const Table = function <T extends object>({
  dataSource,
  columns,
  defaultSortColumnKey,
  defaultSortDirection = "asc",
  title = "",
}: TableProps<T>) {
  const tableColumns = React.useMemo(
    () =>
      columns.map((colConfig) => ({
        Header: colConfig.label,
        accessor: colConfig.key,
        disableSortBy: !(colConfig.sort === undefined ? true : colConfig.sort),
        sortType: colConfig.sortType || "basic",
        disableFilters: !(colConfig.filter === undefined
          ? true
          : colConfig.filter),
        filter: colConfig.filterType || "text",
        Filter: DefaultColumnFilter,
        Cell: (obj) => {
          const value = obj?.cell?.value;
          return typeof colConfig.render === "function"
            ? colConfig.render(value)
            : value;
        },
      })),
    [columns]
  );

  const initialSortBy = useMemo(
    () =>
      defaultSortColumnKey
        ? [
            {
              id: defaultSortColumnKey,
              desc: defaultSortDirection === "desc" ? true : false,
            },
          ]
        : [],
    [defaultSortDirection, defaultSortColumnKey]
  );

  const filterTypes = useMemo(() => ({
    "startsWith": numericFilter
  }), []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: tableColumns,
        data: dataSource,
        sortBy: initialSortBy,
        filterTypes
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );

  return (
    <table {...getTableProps()}>
      <caption>{title}</caption>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  border: "solid 1px gray",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                  height: "48px",
                  minWidth: "144px",
                  boxSizing: "border-box",
                  cursor: "default",
                  userSelect: "none",
                  MozUserSelect: "-moz-none",
                  WebkitUserSelect: "none",
                  position: "relative",
                }}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <> &darr;</>
                    ) : (
                      <> &uarr;</>
                    )
                  ) : (
                    ""
                  )}
                </span>
                {column.canFilter ? column.render("Filter") : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
