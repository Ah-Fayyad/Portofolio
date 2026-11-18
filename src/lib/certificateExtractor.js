// Advanced Certificate Pattern Matcher & OCR Text Parser

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
  { name: "Arab Open University", patterns: [/arab\s+open\s+university/i, /\baou\b/i] },
  { name: "Edraak", patterns: [/edraak/i, /إدراك/i] },
  { name: "Route Academy", patterns: [/route/i] },
  { name: "Mahara-Tech", patterns: [/mahara/i] }
];

const SKILL_KEYWORDS = [
  "React", "React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS",
  "Next.js", "Redux", "Zustand", "Node.js", "Express.js", "REST APIs", "GraphQL",
  "PostgreSQL", "Prisma", "Supabase", "Git", "GitHub", "Vite", "Responsive Design",
  "State Management", "UI/UX Design", "Performance Optimization", "Clean Code", "OOP",
  "Software Engineering", "Frontend Development", "Web Development", "Python",
  "Data Structures", "Algorithms", "Bootstrap", "Sass", "Material UI", "Jest"
];

export function extractCertificateMetadataFromFilenameAndText(filename = "", ocrText = "") {
  const text = (ocrText || "").trim();
  const combined = `${filename}\n${text}`.trim();

  // 1. Detect Issuer from real text first, then filename
  let issuer = "";
  for (const org of KNOWN_ORGANIZATIONS) {
    if (org.patterns.some(p => p.test(combined))) {
      issuer = org.name;
      break;
    }
  }

  // 2. Extract Title from real text
  let title = "";
  if (text.length > 10) {
    // Look for common certificate header phrases:
    // e.g. "Certificate of Completion", "has successfully completed [Course Title]", etc.
    const completedMatch = text.match(/(?:has successfully completed|awarded to[\s\S]{1,50}?for|certificate of completion in|diploma in)\s*[:\n\-]?\s*([A-Za-z0-9\s,&/()\-]{4,80})/i);
    const trackMatch = text.match(/([A-Za-z0-9\s]{3,50}?(?:Frontend|Full[- ]?Stack|Web Development|Computer Science|React|Software Engineering|Diploma|Track|Nanodegree))/i);
    
    if (completedMatch && completedMatch[1]) {
      title = completedMatch[1].split(/\n|\r/)[0].trim();
    } else if (trackMatch && trackMatch[1]) {
      title = trackMatch[1].trim();
    }
  }

  // Fallback to cleaned filename if text didn't give a clear title
  if (!title || title.length < 4) {
    const cleanName = filename
      .replace(/\.[^/.]+$/, "")
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
  }

  // 3. Detect Category
  let category = "Software & Web Development";
  if (/emotional\s+intelligence|leadership|communication|soft\s*skill|presentation|teamwork|management|negotiation/i.test(combined)) {
    category = "Soft Skills & Leadership";
  } else if (/english|language|toefl|ielts|grammar|speaking/i.test(combined)) {
    category = "English & Languages";
  } else if (/workshop|hackathon|bootcamp|conference|seminar|meetup/i.test(combined)) {
    category = "Workshops & Hackathons";
  } else if (/computer\s+science|algorithm|data\s+structure|operating\s+system|cs\b|architecture/i.test(combined)) {
    category = "Tech & Computer Science";
  } else if (/react|frontend|javascript|typescript|web\s+development|html|css|full[- ]?stack/i.test(combined)) {
    category = "Software & Web Development";
  }

  // 4. Detect Skills
  const detectedSkills = [];
  const SOFT_SKILLS = [
    "Emotional Intelligence", "Communication", "Leadership", "Teamwork",
    "Critical Thinking", "Problem Solving", "Time Management", "Adaptability",
    "Active Listening", "Negotiation", "Public Speaking", "Work Ethic"
  ];

  for (const skill of [...SKILL_KEYWORDS, ...SOFT_SKILLS]) {
    const reg = new RegExp(`\\b${skill.replace(".", "\\.")}\\b`, "i");
    if (reg.test(combined)) {
      if (!detectedSkills.includes(skill)) {
        detectedSkills.push(skill);
      }
    }
  }

  // 5. Detect Year / Issue Date
  const dateMatch = combined.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[,\s]+(20[12]\d)\b/i) ||
                    combined.match(/\b(20[12]\d)[/-](0?[1-9]|1[0-2])\b/) ||
                    combined.match(/\b(20[12]\d)\b/);

  let issueDate = dateMatch ? (dateMatch[0].length === 4 ? dateMatch[0] : dateMatch[0].replace(",", "")) : new Date().getFullYear().toString();

  // 6. Find Verification URL or ID
  const urlMatch = combined.match(/https?:\/\/[^\s"'<>]+/i);
  const idMatch = combined.match(/\b(UC-[A-Za-z0-9-]+|ALM-[A-Za-z0-9-]+|[0-9A-Z]{8,20})\b/);

  return {
    title: title.replace(/^[\s,.\-:]+|[\s,.\-:]+$/g, ""),
    issuer: issuer || "Professional Academy",
    issueDate,
    category,
    skillsString: detectedSkills.length > 0 ? detectedSkills.slice(0, 8).join(", ") : "React, TypeScript, Frontend Engineering",
    credentialId: idMatch ? idMatch[1] : "",
    credentialUrl: urlMatch ? urlMatch[0] : "",
    description: `Credential certified in ${category.toLowerCase()} awarded by ${issuer || "the issuing institution"} validating practical skills and technical competence.`
  };
}
