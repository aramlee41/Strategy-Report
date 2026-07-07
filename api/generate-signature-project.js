const SIGNATURE_PROJECT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    proposal: {
      type: "object",
      additionalProperties: false,
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        meta: { type: "string" },
        sections: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              body: { type: "string" },
              bullets: { type: "array", items: { type: "string" } },
              subsections: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    title: { type: "string" },
                    body: { type: "string" }
                  },
                  required: ["title", "body"]
                }
              }
            },
            required: ["title", "body", "bullets", "subsections"]
          }
        },
        timeline: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              label: { type: "string" },
              tasks: { type: "array", items: { type: "string" } }
            },
            required: ["label", "tasks"]
          }
        }
      },
      required: ["title", "subtitle", "meta", "sections", "timeline"]
    },
    qualityReview: {
      type: "object",
      additionalProperties: false,
      properties: {
        score: { type: "number" },
        strengths: { type: "array", items: { type: "string" } },
        weaknesses: { type: "array", items: { type: "string" } },
        revisionNotes: { type: "array", items: { type: "string" } }
      },
      required: ["score", "strengths", "weaknesses", "revisionNotes"]
    }
  },
  required: ["proposal", "qualityReview"]
};

function setCors(req, res) {
  const configured = process.env.ALLOWED_ORIGIN || "https://aramlee41.github.io";
  const allowedOrigins = configured.split(",").map(x => x.trim()).filter(Boolean);
  const origin = req.headers.origin || "";
  const allowAll = allowedOrigins.includes("*");
  const matched = allowedOrigins.find(x => x === origin);
  res.setHeader("Access-Control-Allow-Origin", allowAll ? "*" : matched || allowedOrigins[0] || origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  return {};
}

function outputText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  const chunks = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join("\n").trim();
}

function compactPayload(body) {
  const student = body.student || {};
  const project = body.project || {};
  const schools = Array.isArray(body.schools) ? body.schools.slice(0, 8) : [];
  return {
    mode: body.mode || "generate",
    generatedAt: new Date().toISOString(),
    student: {
      name: student.name || "",
      englishName: student.en || student.englishName || "",
      currentGrade: student.grade || student.currentGrade || "",
      targetYear: student.targetYear || "",
      targetGrade: student.targetGrade || "",
      target: student.target || "",
      currentSchool: student.school || "",
      citizenship: student.citizenship || student.usStatus || "",
      interests: student.interests || [],
      tests: student.tests || [],
      transcripts: student.transcripts || [],
      ecs: student.ecs || [],
      awards: student.awards || [],
      recommendations: student.recommendations || [],
      hookNotes: student.profile || student.hookNotes || ""
    },
    project: {
      title: project.title || "",
      badge: project.badge || "",
      sourceActivityNames: project.sourceActivityNames || [],
      bigIdea: project.bigIdea || "",
      boardingFit: project.boardingFit || "",
      academicTalent: project.academicTalent || "",
      communityContribution: project.communityContribution || "",
      currentEvidence: project.currentEvidence || "",
      targetOutput: project.targetOutput || "",
      evidenceNeeded: project.evidenceNeeded || [],
      risks: project.risks || [],
      nextActions: project.nextActions || [],
      applicationUsage: project.applicationUsage || []
    },
    schools: schools.map(s => ({
      name: s.name || "",
      programs: s.programs || "",
      sports: s.sports || "",
      arts: s.arts || "",
      fit: s.fit || "",
      risk: s.risk || "",
      interview: s.interview || "",
      englishRequirements: s.englishRequirements || {}
    }))
  };
}

function buildInstructions() {
  return [
    "You are a senior Korean boarding-school admissions strategist writing a customer-facing Signature Project proposal.",
    "Write in Korean honorific style. Be formal, warm, specific, and parent-readable.",
    "The output must feel like a real consulting proposal, not generic AI advice.",
    "Each project must clearly answer: what the student will do, why it matters, what final deliverables will exist, how it proves boarding-school fit, how it shows academic talent, how it contributes to a community, and how it will be used in applications.",
    "Use the student's actual ECs, tests, academics, awards, target schools, and school data. If evidence is missing, state the missing evidence as a plan, not as a hard fact.",
    "Do not invent awards, test scores, acceptances, coaches, official school requirements, or medical facts.",
    "Internally review your own draft for specificity, feasibility, admissions usefulness, deliverable clarity, and parent readability. Return the revised version only.",
    "The sections should be deep enough to replace a human first-pass consultant draft."
  ].join("\n");
}

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is not configured in Vercel." });
    }

    const body = readJsonBody(req);
    const payload = compactPayload(body);
    const model = process.env.OPENAI_MODEL || "gpt-5.1";

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        instructions: buildInstructions(),
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Create a polished Signature Project proposal from this Prep LMS data.\n\n${JSON.stringify(payload, null, 2)}`
              }
            ]
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "signature_project_proposal",
            strict: true,
            schema: SIGNATURE_PROJECT_SCHEMA
          }
        },
        store: false
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "OpenAI API request failed", details: data });
    }

    const text = outputText(data);
    const parsed = JSON.parse(text);
    return res.status(200).json({
      ...parsed,
      model,
      generatedAt: payload.generatedAt,
      provider: "openai-responses"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unexpected server error" });
  }
};
