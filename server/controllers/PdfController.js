import { PDFDocument } from "pdf-lib";

export const GeneratePdf = async (req, res) => {
  try {
    const { htmlContent } = req.body;
    if (!htmlContent) {
      return res.status(400).json({ error: "HTML content is required" });
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText(htmlContent, { x: 50, y: 350, size: 14 });

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="generated.pdf"'
    );
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    res.status(500).json({ error: "PDF generation failed" });
  }
};
