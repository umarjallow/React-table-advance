import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";

export default function Table({setPerPage, setPage, columns, data, currentpage, perPage, totalPage, loading }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      pageOptions,
      prepareRow,
      state: { pageIndex, pageSize },
    } = useTable({
      columns,
      data,
      useControlledState: (state) => {
        return React.useMemo(
        () => ({
            ...state,
            pageIndex: currentpage,
        }),
        [state, currentpage]
        );
      },
      initialState: { pageIndex: currentpage },
      manualPagination: true, 
      pageCount: totalPage,
    }, usePagination)
  
    // Render the UI for your table
    return (
        <div>
      <table {...getTableProps()} className="min-w-max w-full table-auto">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr  className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="py-3 px-6 text-left" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-gray-600 text-sm font-light" {...getTableBodyProps()}>

          {
          loading ? "Chargement..." : 
          page.map((row, i) => {
            prepareRow(row)
            return (
              <tr  className="border-b border-gray-200 hover:bg-gray-100" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className="py-3 px-6 text-left whitespace-nowrap" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Pagination */}

      <div className="flex justify-between bg-red-100 p-4">
        <button
          onClick={() => {
            setPage(1);
          }}
          disabled={currentpage === 1}
        >
          first
        </button>{' '}
        <button
          onClick={() => {
            setPage((s) =>  (s === 0 ? 0 : s - 1));
          }}
          disabled={currentpage === 1}
        >
          prev
        </button>{' '}
        <button
          onClick={() => {
            setPage((s) => s + 1);
          }}
          disabled={currentpage === totalPage}
        >
          next
        </button>{' '}
        <button
          onClick={() => {
            setPage(totalPage);
          }}
          disabled={currentpage === totalPage}
        >
          last
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex}
            min="1"
            max={totalPage}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 1;
              setPage(page);
            }}
            className="w-20 border-2 rounded px-2"
          />
        </span>{' '}
        <select
          value={perPage}
          onChange={(e) => {
            // setPageSize(Number(e.target.value));
            setPerPage(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>
    )
  }