import { useState } from "react";
import axios from "axios";

function DownloadPdf() {
  const [textContent, setTextContent] = useState("Hello, PDF!");
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/pdf/generate-pdf",
        { htmlContent: textContent },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "generated.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Text to PDF Converter</h1>

      <textarea
        className="w-full max-w-lg border rounded p-2"
        rows="4"
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
      />

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        onClick={generatePDF}
        disabled={loading}
      >
        {loading ? "Generating PDF..." : "Generate & Download PDF"}
      </button>
    </div>
  );
}

export default DownloadPdf;
