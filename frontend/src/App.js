import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import DataPreview from "./components/DataPreview";
import DownloadPDF from "./components/DownloadPDF";
import { ToastContainer } from "react-toastify";
import DataCharts from "./components/DataCharts";

function App() {
  const [dataSummary, setDataSummary] = useState(null);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        📊 Insightify – Personal Data Dashboard
      </h2>
      <FileUpload setDataSummary={setDataSummary} />
      {dataSummary && (
        <>
          <DataPreview summary={dataSummary} />
          <DownloadPDF file={dataSummary.uploadedFile} />
          <DataCharts summary={dataSummary} />
        </>
      )}
    </div>
  );
}

export default App;
