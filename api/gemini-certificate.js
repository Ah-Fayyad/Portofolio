// Vercel Serverless Function: /api/gemini-certificate
// Automatically cycles through valid models (v1 and v1beta) with zero configuration

export const config = {
  runtime: "edge",
};

const CANDIDATE_ENDPOINTS = [
  // 1. Stable v1 endpoint (Standard across all modern Google AI Studio keys)
  { url: "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent" },
  { url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent" },
  { url: "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent" },
  // 2. Beta endpoints
  { url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent" },
  { url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent" },
];

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { base64, mimeType } = await req.json();

    if (!base64 || !mimeType) {
      return new Response(
        JSON.stringify({ error: "Missing base64 data or mimeType" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "NO_API_KEY" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const prompt = `Analyze this certificate/diploma image and extract:
Return ONLY valid JSON:
{
  "title": "Exact Title of Certificate/Diploma",
  "issuer": "Issuing Organization/Platform (e.g. Almdrasa, Coursera, Meta, Google, AWS)",
  "issueDate": "Year or Month Year",
  "category": "Frontend Development, Full-Stack & Backend, Computer Science, Cloud & DevOps, or General",
  "skills": ["Skill1", "Skill2"],
  "credentialId": "ID if present or empty string",
  "credentialUrl": "Verification URL if present or empty string",
  "description": "2 sentences summary of topics covered"
}`;

    let lastError = null;

    // Try candidate endpoints automatically
    for (const endpoint of CANDIDATE_ENDPOINTS) {
      try {
        const res = await fetch(`${endpoint.url}?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: prompt },
                  { inlineData: { mimeType, data: base64 } },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: "application/json",
            },
          }),
        });

        if (!res.ok) {
          lastError = await res.text();
          continue;
        }

        const data = await res.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText.replace(/```json/g, "").replace(/```/g, "").trim());
          return new Response(JSON.stringify(parsed), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      } catch (e) {
        lastError = e.message;
      }
    }

    return new Response(
      JSON.stringify({ error: "MODEL_FALLBACK", details: lastError }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
