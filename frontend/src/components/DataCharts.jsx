import React from "react";
import Plot from "react-plotly.js";

function DataCharts({ summary }) {
  const { numeric_summary } = summary;

  if (!numeric_summary || Object.keys(numeric_summary).length === 0) {
    return <p>No numeric data available for charts.</p>;
  }

  // Prepare bar chart: mean of numeric columns
  const barData = {
    x: Object.keys(numeric_summary),
    y: Object.values(numeric_summary).map((stats) => stats.mean || 0),
    type: "bar",
    marker: { color: "rgb(55,128,191)" },
  };

  // Prepare pie chart: sum of numeric columns (optional)
  const pieData = {
    values: Object.values(numeric_summary).map((stats) => stats.mean || 0),
    labels: Object.keys(numeric_summary),
    type: "pie",
  };

  // Scatter chart: first two numeric columns
  const numericCols = Object.keys(numeric_summary);
  const scatterData =
    numericCols.length >= 2
      ? [
          {
            x: Array(5)
              .fill()
              .map((_, i) => i + 1), // sample x-axis
            y: Array(5)
              .fill()
              .map(() => Math.random() * 10), // placeholder for demo
            mode: "markers",
            type: "scatter",
            name: `${numericCols[0]} vs ${numericCols[1]}`,
          },
        ]
      : [];

  return (
    <div className="card p-4 mt-4">
      <h5 className="mb-3">📊 Data Visualizations</h5>

      {/* Bar Chart */}
      <div className="mb-4">
        <h6>Mean of Numeric Columns</h6>
        <Plot
          data={[barData]}
          layout={{ width: 700, height: 400, title: "Bar Chart" }}
        />
      </div>

      {/* Pie Chart */}
      <div className="mb-4">
        <h6>Proportion of Numeric Columns</h6>
        <Plot
          data={[pieData]}
          layout={{ width: 700, height: 400, title: "Pie Chart" }}
        />
      </div>

      {/* Scatter Chart */}
      {scatterData.length > 0 && (
        <div>
          <h6>Scatter Chart (sample)</h6>
          <Plot
            data={scatterData}
            layout={{ width: 700, height: 400, title: "Scatter Chart" }}
          />
        </div>
      )}
    </div>
  );
}

export default DataCharts;
