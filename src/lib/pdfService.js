// PDF Reader & Page-to-Image Renderer using locally bundled pdfjs-dist
// Extracts both digital text and converts page 1 into a crisp high-res JPEG image
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export async function processPdfCertificate(file, onProgress) {
  try {
    if (onProgress) onProgress("Parsing PDF document structure...");

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    if (pdf.numPages < 1) {
      throw new Error("PDF has no pages");
    }

    const page = await pdf.getPage(1);

    // 1. Extract digital text embedded in PDF
    const textContent = await page.getTextContent();
    const extractedText = textContent.items.map((item) => item.str).join(" ").trim();

    if (onProgress) onProgress("Generating high-resolution preview image from PDF...");

    // 2. Render Page 1 to Canvas to get High-Res JPEG Image
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not initialize canvas context for PDF rendering");
    }

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;

    const renderedImageUrl = canvas.toDataURL("image/jpeg", 0.88);

    return {
      text: extractedText,
      imageUrl: renderedImageUrl,
    };
  } catch (err) {
    console.warn("PDF extraction error:", err);
    throw new Error(err?.message || "Failed to process PDF file.");
  }
}
