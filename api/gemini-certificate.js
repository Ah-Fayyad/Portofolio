// Vercel Serverless Function: /api/gemini-certificate
// Extracts structured certificate data using Gemini 1.5/2.0 Flash

export const config = {
  runtime: "edge",
};

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

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error:
            "Gemini API key is not configured in Vercel environment variables (GEMINI_API_KEY).",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const prompt = `You are a high-accuracy document intelligence OCR model specialized in certificates and credentials.
Analyze this certificate image carefully and extract all details with extreme precision.

Return ONLY a valid JSON object with the following exact schema:
{
  "title": "Exact Full Name of the Certificate or Diploma",
  "issuer": "Exact Organization / University / Institution issuing it (e.g. Almdrasa, Coursera, Meta, Google, AWS, Udacity)",
  "issueDate": "Month and Year or Year of completion (e.g. 2024, or Nov 2024)",
  "category": "One of: Frontend Development, Full-Stack & Backend, Computer Science, Cloud & DevOps, General",
  "skills": ["Skill1", "Skill2", "Skill3"],
  "description": "2-3 sentences summarizing the certificate, key topics covered, and accomplishments",
  "credentialId": "Verification ID / Certificate serial number / License ID if visible, otherwise empty string",
  "credentialUrl": "Verification link / QR code URL if visible or stated, otherwise empty string"
}

Important Instructions:
- Do not make up or hallucinate credentials or institutions.
- If the title or issuer is written in Arabic or English, keep the original accurate title and translate/standardize the organization name if appropriate.
- Ensure the JSON is completely valid without markdown formatting or backticks.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: "application/json",
      },
    };

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(
        JSON.stringify({
          error: `Gemini API responded with status ${geminiRes.status}: ${errText.slice(0, 300)}`,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await geminiRes.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    let parsed = {};
    try {
      parsed = JSON.parse(rawText.replace(/```json/g, "").replace(/```/g, "").trim());
    } catch {
      return new Response(
        JSON.stringify({
          error: "Could not parse JSON from Gemini response.",
          raw: rawText,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
