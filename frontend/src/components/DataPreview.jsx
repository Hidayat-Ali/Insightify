import React from "react";

function DataPreview({ summary }) {
  const { preview, columns, missing_values, numeric_summary } = summary;

  // Convert preview object to an array for easy display
  const previewData = Object.values(preview || {});

  return (
    <div className="card p-4">
      <h5 className="mb-3">📊 Data Summary</h5>

      {/* --- Columns Section --- */}
      <div className="mb-3">
        <h6>🧩 Columns</h6>
        <p>{columns.join(", ")}</p>
      </div>

      {/* --- Missing Values --- */}
      <div className="mb-3">
        <h6>⚠️ Missing Values</h6>
        {Object.keys(missing_values).length === 0 ? (
          <p>No missing values ✅</p>
        ) : (
          <ul>
            {Object.entries(missing_values).map(([col, val]) => (
              <li key={col}>
                <strong>{col}</strong>: {val}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- Numeric Summary --- */}
      <div className="mb-3">
        <h6>📈 Numeric Columns Summary</h6>
        <div className="table-container">
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>Column</th>
                <th>Mean</th>
                <th>Median</th>
                <th>Std Dev</th>
                <th>Min</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(numeric_summary).map(([col, stats]) => (
                <tr key={col}>
                  <td>{col}</td>
                  <td>
                    {stats.mean !== undefined ? stats.mean.toFixed(2) : "-"}
                  </td>
                  <td>
                    {stats.median !== undefined ? stats.median.toFixed(2) : "-"}
                  </td>
                  <td>
                    {stats.std !== undefined ? stats.std.toFixed(2) : "-"}
                  </td>
                  <td>
                    {stats.min !== undefined ? stats.min.toFixed(2) : "-"}
                  </td>
                  <td>
                    {stats.max !== undefined ? stats.max.toFixed(2) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Data Preview --- */}
      <div>
        <h6>🪄 Data Preview (first 5 rows)</h6>
        <div className="table-container">
          <table className="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataPreview;
