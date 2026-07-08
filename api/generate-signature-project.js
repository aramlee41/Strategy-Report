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
        format: { type: "string" },
        designSystem: {
          type: "object",
          additionalProperties: false,
          properties: {
            palette: { type: "array", items: { type: "string" } },
            fonts: { type: "array", items: { type: "string" } },
            styleNotes: { type: "array", items: { type: "string" } }
          },
          required: ["palette", "fonts", "styleNotes"]
        },
        slides: {
          type: "array",
          minItems: 10,
          maxItems: 10,
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              slideNumber: { type: "number" },
              title: { type: "string" },
              sectionLabel: { type: "string" },
              purpose: { type: "string" },
              layout: { type: "string" },
              visualDirection: { type: "string" },
              speakerNote: { type: "string" },
              components: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    type: { type: "string" },
                    title: { type: "string" },
                    text: { type: "string" },
                    chips: { type: "array", items: { type: "string" } },
                    bullets: { type: "array", items: { type: "string" } },
                    headers: { type: "array", items: { type: "string" } },
                    rows: {
                      type: "array",
                      items: {
                        type: "array",
                        items: { type: "string" }
                      }
                    },
                    cards: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          title: { type: "string" },
                          text: { type: "string" },
                          chips: { type: "array", items: { type: "string" } },
                          bullets: { type: "array", items: { type: "string" } }
                        },
                        required: ["title", "text", "chips", "bullets"]
                      }
                    },
                    layoutNote: { type: "string" }
                  },
                  required: ["type", "title", "text", "chips", "bullets", "headers", "rows", "cards", "layoutNote"]
                }
              }
            },
            required: ["slideNumber", "title", "sectionLabel", "purpose", "layout", "visualDirection", "speakerNote", "components"]
          }
        },
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
      required: ["title", "subtitle", "meta", "format", "designSystem", "slides", "sections", "timeline"]
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
    "You are an expert education consultant, boarding-school admissions strategist, and presentation designer.",
    "Transform the provided student/project information into an editable 10-slide project proposal deck structure.",
    "Do not generate a long-form written report. Do not generate paragraph-style report sections.",
    "The proposal must be slide-deck-style: clear page-by-page structure, visual layout instructions, cards, tables, chips, icons, and concise parent-facing Korean copy.",
    "Return exactly 10 slides in proposal.slides. Keep proposal.sections and proposal.timeline empty arrays unless needed for backward compatibility.",
    "Use Korean as the main language. English may be used for slide labels, project title, Activity List examples, and admissions terminology.",
    "Tone: professional, clear, persuasive, warm, and easy for Korean parents and a middle school student to understand.",
    "Design style: polished academic consulting brochure using navy, soft blue, mint, white, light gray, and small gold accents. Use rounded cards, tables, timeline bars, icon chips, and simple visual instructions.",
    "Do not allow chip labels to wrap awkwardly. Keep labels such as Final Outputs, Weekly Plan 1, Project Concept, and Core Character on one line.",
    "Tables must have centered headers, vertically centered text, centered first columns, and readable body cells.",
    "Slide 1: Cover. Include English title, Korean subtitle, student name, grade, target year/grade, target schools, and core outputs.",
    "Slide 2: Project Concept. Fully explain what the project is, what the student investigates, what materials are read, how evidence is recorded, school-life or real-life connection, final outputs, four process cards, and a metric strip.",
    "Slide 3: Why This Project. Explain what side of the student it shows, what the student learns, how final outputs help admissions, and why this project is necessary for this specific student.",
    "Slide 4: Student Tasks. Include a 5-step workflow, a checking-method table, and a project-specific Evidence Log example table.",
    "Slide 5: Weekly Plan 1. Create a specific 1-6 week table: materials, student work, best feedback person, and output. Add a note on reading-material progression.",
    "Slide 6: Weekly Plan 2. Create a specific 7-12 week table and five project-specific scenario cards.",
    "Slide 7: Support Structure. Use five role cards: student, parents, research mentor, teacher/school mentor, and expert/topic mentor. Each must have concrete bullets.",
    "Slide 8: Final Outputs. Use four output cards: Research Brief, Presentation Slides, 1-Page Guide, Bibliography & Feedback Record. Include length/format chips, bullets, and purpose.",
    "Slide 9: Admissions & Learning Value. Include admissions usage table, educational growth table, target school connection cards, and a customized English Activity List example.",
    "Slide 10: Core Character. Summarize the student image with a core character title, persuasive paragraph, four trait cards, and simple student researcher illustration instructions.",
    "For health or medical topics, clearly state that this is not medical diagnosis, treatment advice, or lab research; frame it as school-life support, awareness, or community understanding research.",
    "Use the student's actual ECs, tests, academics, awards, target schools, and school data. If evidence is missing, state the missing evidence as a plan, not as a hard fact.",
    "Do not invent awards, test scores, acceptances, coaches, official school requirements, or medical facts.",
    "Avoid guaranteed admissions claims. Use careful Korean expressions such as 보여줄 수 있습니다, 활용할 수 있습니다, 연결될 수 있습니다.",
    "Internally review the deck for specificity, feasibility, admissions usefulness, final output clarity, weekly plan depth, and parent readability. Return the revised version only.",
    "The final result should be suitable for rendering into editable PPTX or Google Slides. Do not flatten slides into images."
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
    const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";

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
                text: `Create a polished 10-slide editable Signature Project proposal deck JSON from this Prep LMS data.\n\n${JSON.stringify(payload, null, 2)}`
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
