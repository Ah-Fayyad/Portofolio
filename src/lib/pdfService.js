// PDF Reader & Page-to-Image Renderer using Mozilla's PDF.js
// Extracts both digital text and converts page 1 into a crisp high-res image

export async function processPdfCertificate(file, onProgress) {
  return new Promise((resolve, reject) => {
    const scriptId = "pdfjs-cdn-script";
    let script = document.getElementById(scriptId);

    const runPdfExtraction = async () => {
      try {
        if (!window.pdfjsLib) {
          throw new Error("PDF.js library could not be loaded");
        }

        // Configure worker
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        if (onProgress) onProgress("Parsing PDF document structure...");

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        if (pdf.numPages < 1) {
          throw new Error("PDF has no pages");
        }

        // Render Page 1
        const page = await pdf.getPage(1);

        // 1. Extract digital text embedded in PDF
        const textContent = await page.getTextContent();
        const extractedText = textContent.items.map((item) => item.str).join(" ");

        if (onProgress) onProgress("Generating high-resolution preview image from PDF...");

        // 2. Render Page 1 to Canvas to get High-Res JPEG Image
        const viewport = page.getViewport({ scale: 2.0 }); // 2x for retina quality
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;

        const renderedImageUrl = canvas.toDataURL("image/jpeg", 0.9);

        resolve({
          text: extractedText,
          imageUrl: renderedImageUrl,
        });
      } catch (err) {
        console.warn("PDF extraction error:", err);
        reject(err);
      }
    };

    if (window.pdfjsLib) {
      runPdfExtraction();
      return;
    }

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => runPdfExtraction();
      script.onerror = () => reject(new Error("Could not load PDF engine from CDN"));
      document.head.appendChild(script);
    } else {
      script.addEventListener("load", () => runPdfExtraction());
    }
  });
}
