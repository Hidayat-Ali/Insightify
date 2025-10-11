import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function FileUpload({ setDataSummary }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      toast.warn("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      toast.info("Uploading and analyzing...");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/data/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setDataSummary({ ...res.data, uploadedFile: file });
      toast.success("File analyzed successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Error uploading file!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="card p-4 m-4">
      <h1>📁 Upload your CSV or Excel file</h1>
      <input
        type="file"
        className="form-control"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        disabled={loading}
      />
      <button
        className="btn btn-primary mt-3"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>
    </div>
  );
}
export default FileUpload;
