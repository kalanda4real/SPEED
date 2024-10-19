import React, { useState } from "react";

interface SearchTableProps {
  headers: { key: string; label: string }[];
  data: any[]; // Use the actual data type for articles
  onRatingChange: (articleId: string, rating: number) => void; // Handler for rating changes
}

const SearchTable: React.FC<SearchTableProps> = ({ headers, data, onRatingChange }) => {
  const [ratingId, setRatingId] = useState<string | null>(null); // Track which article is being rated
  const [newRating, setNewRating] = useState<number>(0); // Track the selected rating value

  return (
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
                textAlign: 'left',
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
                {header.key === "rating" ? (
                  <>
                    {/* Display the current rating */}
                    <div>Current Rating: {row[header.key] || 'No rating yet'}</div>

                    {/* Show a button to start rating */}
                    {ratingId === row._id ? (
                      <div>
                        <select
                          value={newRating}
                          onChange={(e) => setNewRating(Number(e.target.value))}
                        >
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select>
                        <button
                          style={{
                            backgroundColor: '#4CAF50', // Green button
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            onRatingChange(row._id, newRating);
                            setRatingId(null); // Close the rating selector
                          }}
                        >
                          Submit Rating
                        </button>
                      </div>
                    ) : (
                      <button
                        style={{
                          backgroundColor: '#008CBA', // Blue button
                          color: 'white',
                          border: 'none',
                          padding: '5px 10px',
                          cursor: 'pointer',
                        }}
                        onClick={() => setRatingId(row._id)}
                      >
                        Rate this article
                      </button>
                    )}
                  </>
                ) : (
                  // For other fields, just show the data
                  typeof row === "object" && row !== null && header.key in row
                    ? ((row as Record<string, unknown>)[header.key] as string)
                    : ""
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchTable;