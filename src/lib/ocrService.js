// Lightweight on-demand OCR loader using browser worker
// Uses Tesseract via CDN dynamically when user clicks Scan (Zero bundle bloat, zero install hassle)

export async function performClientOCR(file, onProgress) {
  return new Promise((resolve) => {
    // If window.Tesseract is not loaded yet, inject script tag once
    const scriptId = "tesseract-cdn-script";
    let script = document.getElementById(scriptId);

    const runRecognition = async () => {
      try {
        if (!window.Tesseract) {
          throw new Error("Tesseract library could not be loaded");
        }
        if (onProgress) onProgress("Reading certificate text & typography...");

        const worker = await window.Tesseract.createWorker("eng", 1, {
          logger: (m) => {
            if (m.status === "recognizing text" && onProgress) {
              const pct = Math.round((m.progress || 0) * 100);
              onProgress(`Scanning image text (${pct}%)...`);
            }
          }
        });

        const ret = await worker.recognize(file);
        await worker.terminate();
        resolve(ret?.data?.text || "");
      } catch (err) {
        console.warn("OCR recognition error:", err);
        resolve(""); // graceful fallback
      }
    };

    if (window.Tesseract) {
      runRecognition();
      return;
    }

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
      script.onload = () => runRecognition();
      script.onerror = () => {
        console.warn("Could not load Tesseract OCR CDN");
        resolve("");
      };
      document.head.appendChild(script);
    } else {
      script.addEventListener("load", () => runRecognition());
    }
  });
}
