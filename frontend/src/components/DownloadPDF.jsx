import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DownloadPDF({ file }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!file) {
      toast.warn("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      toast.info("Generating PDF report...");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/data/generate-pdf",
        formData,
        { responseType: "blob" } // important to get file
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Insightify_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Error generating PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-success mt-3"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? "Generating PDF..." : "Download PDF Report"}
    </button>
  );
}

export default DownloadPDF;
