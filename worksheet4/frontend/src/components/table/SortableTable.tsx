import React from "react";
import { ReactNode } from "react";

interface SortableTableProps<T> {
  headers: { key: keyof T; label: string }[];
  data: T[];
}

const SortableTable = <T extends Record<keyof T, ReactNode>>({ headers, data }: SortableTableProps<T>) => (
  <table>
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={String(header.key)}>{header.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td key={String(header.key)}>{String(row[header.key])}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default SortableTable;