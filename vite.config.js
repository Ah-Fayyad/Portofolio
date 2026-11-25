import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function localGeminiApiPlugin() {
  return {
    name: "local-gemini-api",
    configureServer(server) {
      server.middlewares.use("/api/gemini-certificate", async (req, res, next) => {
        if (req.method !== "POST") return next();
        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const body = Buffer.concat(chunks).toString("utf8");

          const env = loadEnv("development", process.cwd(), "");
          if (env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
            process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
          }

          const { default: handler } = await import("./api/gemini-certificate.js");
          const webReq = new Request("http://localhost/api/gemini-certificate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          });
          const webRes = await handler(webReq);

          res.statusCode = webRes.status;
          webRes.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await webRes.text());
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: err.message || "Local API middleware error" }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localGeminiApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          supabase: ["@supabase/supabase-js"],
          icons: ["lucide-react"]
        }
      }
    }
  }
});
