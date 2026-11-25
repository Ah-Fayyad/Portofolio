/* global process */
// Vercel Edge Function: /api/gemini-certificate
// Uses current Gemini multimodal models via v1beta REST API

export const config = {
  runtime: "edge",
};

const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.5-flash-lite",
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

    const prompt = `You are an expert certificate & credential analyzer. Carefully inspect this certificate/diploma image or document and extract accurate metadata.
Return ONLY valid JSON with these exact keys:
{
  "title": "Exact full title of the certificate, course, or diploma (without the recipient's name)",
  "issuer": "Issuing organization, university, or platform (e.g. Almdrasa, Coursera, Meta, Google, AWS, ITI, Udemy)",
  "issuerDomain": "Official website domain of the issuing organization for fetching its real logo (e.g. 'almdrasa.com', 'coursera.org', 'meta.com', 'google.com', 'aws.amazon.com', 'iti.gov.eg', 'udemy.com')",
  "issueDate": "Issue date as 'Month YYYY' or 'YYYY' (e.g. 'March 2025' or '2025')",
  "category": "Pick the best match from: 'Software & Web Development', 'Tech & Computer Science', 'Soft Skills & Leadership', 'English & Languages', 'Workshops & Hackathons', 'Frontend Development' (or a concise custom category if none fit)",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "credentialId": "Certificate/Credential ID if visible, otherwise empty string",
  "credentialUrl": "Verification URL if visible, otherwise empty string",
  "description": "2 concise, professional sentences summarizing what this credential certifies and the core topics covered."
}`;

    let lastError = null;

    for (const model of CANDIDATE_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(endpoint, {
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
          lastError = `${model} (${res.status}): ${await res.text()}`;
          continue;
        }

        const data = await res.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(
            rawText.replace(/```json/g, "").replace(/```/g, "").trim()
          );
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
