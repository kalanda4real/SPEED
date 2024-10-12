import React from "react";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: unknown[]; 
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header.key}
            style={{
              border: '1px solid black',
              padding: '5px',
              backgroundColor: '#f2f2f2',
              textAlign: 'left'
            }}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td
              key={header.key}
              style={{
                border: '1px solid black',
                padding: '8px',
                backgroundColor: '#f2f2f2',
              }}
            >
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
