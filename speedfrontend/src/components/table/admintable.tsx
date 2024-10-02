import React from 'react';

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
  onDelete: (id: string) => void; // Function prop to handle deletion
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data, onDelete }) => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              style={{
                border: '1px solid black',
                padding: '10px',
                backgroundColor: '#f2f2f2',
                textAlign: 'left',
              }}
            >
              {header.label}
            </th>
          ))}
          <th
            style={{
              border: '1px solid black',
              padding: '10px',
              backgroundColor: '#f2f2f2',
              textAlign: 'left',
            }}
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((article, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td
                key={header.key}
                style={{
                  border: '1px solid black',
                  padding: '10px',
                  textAlign: 'left',
                }}
              >
                {article[header.key]}
              </td>
            ))}
            <td style={{ border: '1px solid black', padding: '10px' }}>
              <button onClick={() => onDelete(article._id)}>Delete</button> {/* Adjust to use the correct ID */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
