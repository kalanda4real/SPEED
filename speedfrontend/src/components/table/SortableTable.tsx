import React from "react";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: unknown[]; // data is an array of unknown objects
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
  <table>
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.key}>{header.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td key={header.key}>
              {/* Type checking before accessing row properties */}
              {typeof row === "object" && row !== null && header.key in row
                ? ((row as Record<string, unknown>)[header.key] as string)
                : ""}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default SortableTable;
