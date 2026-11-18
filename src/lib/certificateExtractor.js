// Intelligent Certificate Pattern Matcher & Document Extractor (Zero-dependency, 100% Client-side Auto)

const KNOWN_ORGANIZATIONS = [
  { name: "Almdrasa", patterns: [/almdrasa/i, /المدرسة/i, /elmdrasa/i] },
  { name: "Coursera", patterns: [/coursera/i] },
  { name: "Meta", patterns: [/meta\s+front/i, /meta\s+platforms/i, /\bmeta\b/i] },
  { name: "Google", patterns: [/google\s+cloud/i, /google\s+career/i, /\bgoogle\b/i] },
  { name: "Udacity", patterns: [/udacity/i, /nanodegree/i] },
  { name: "IBM", patterns: [/\bibm\b/i] },
  { name: "AWS", patterns: [/amazon\s+web\s+services/i, /\baws\b/i] },
  { name: "freeCodeCamp", patterns: [/freecodecamp/i] },
  { name: "Udemy", patterns: [/udemy/i] },
  { name: "LinkedIn Learning", patterns: [/linkedin\s+learning/i] },
  { name: "Information Technology Institute (ITI)", patterns: [/\biti\b/i, /information\s+technology\s+institute/i] },
  { name: "Arab Open University", patterns: [/arab\s+open\s+university/i, /\baou\b/i] }
];

const SKILL_KEYWORDS = [
  "React", "React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS",
  "Next.js", "Redux", "Zustand", "Node.js", "Express.js", "REST APIs", "GraphQL",
  "PostgreSQL", "Prisma", "Supabase", "Git", "GitHub", "Vite", "Responsive Design",
  "State Management", "UI/UX Design", "Performance Optimization", "Clean Code", "OOP",
  "Software Engineering", "Frontend Development", "Web Development", "Python"
];

export function extractCertificateMetadataFromFilenameAndText(filename = "", ocrText = "") {
  const combined = `${filename} ${ocrText}`.trim();
  
  // 1. Detect Issuer
  let issuer = "";
  for (const org of KNOWN_ORGANIZATIONS) {
    if (org.patterns.some(p => p.test(combined))) {
      issuer = org.name;
      break;
    }
  }

  // 2. Detect Category
  let category = "Frontend Development";
  if (/full[- ]?stack|backend|node|express|api|sql|database/i.test(combined)) {
    category = "Full-Stack & Backend";
  } else if (/cloud|devops|aws|docker|kubernetes/i.test(combined)) {
    category = "Cloud & DevOps";
  } else if (/computer\s+science|algorithm|data\s+structure|cs/i.test(combined)) {
    category = "Computer Science";
  }

  // 3. Detect Skills
  const detectedSkills = [];
  for (const skill of SKILL_KEYWORDS) {
    const reg = new RegExp(`\\b${skill.replace(".", "\\.")}\\b`, "i");
    if (reg.test(combined)) {
      detectedSkills.push(skill);
    }
  }

  // 4. Detect Year / Issue Date
  const yearMatch = combined.match(/\b(20[12]\d)\b/);
  const monthMatch = combined.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*(20[12]\d)\b/i);
  let issueDate = yearMatch ? yearMatch[1] : new Date().getFullYear().toString();
  if (monthMatch) {
    issueDate = `${monthMatch[1]} ${monthMatch[2]}`;
  }

  // 5. Clean Title from filename if helpful
  let title = "";
  const cleanName = filename
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/[_-]+/g, " ")
    .replace(/\b(certificate|cert|diploma|completed|completion|pdf|png|jpg|jpeg)\b/gi, "")
    .trim();

  if (cleanName.length > 3) {
    title = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    if (!/diploma|certificate|track/i.test(title)) {
      title += " Certificate";
    }
  } else {
    title = issuer ? `${issuer} Certified Specialist` : "Professional Certificate";
  }

  // 6. Find Verification URL or ID
  const urlMatch = combined.match(/https?:\/\/[^\s"'<>]+/i);
  const idMatch = combined.match(/\b(UC-[A-Za-z0-9-]+|ALM-[A-Za-z0-9-]+|[0-9A-Z]{8,16})\b/);

  return {
    title,
    issuer: issuer || "Professional Academy",
    issueDate,
    category,
    skillsString: detectedSkills.length > 0 ? detectedSkills.slice(0, 6).join(", ") : "React, TypeScript, Frontend Engineering",
    credentialId: idMatch ? idMatch[1] : "",
    credentialUrl: urlMatch ? urlMatch[0] : "",
    description: `Verified credential in ${category.toLowerCase()} awarded by ${issuer || "the issuing body"} certifying mastery of modern industry standards.`
  };
}
