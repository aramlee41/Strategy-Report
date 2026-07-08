const fs = require("fs");
const path = require("path");

const TEXT_ARRAY_SCHEMA = {
  type: "array",
  items: { type: "string" }
};

const CARD_SCHEMA = {
  type: "object",
  additionalProperties: true,
  properties: {
    label: { type: "string" },
    value: { type: "string" },
    caption: { type: "string" },
    title: { type: "string" },
    heading: { type: "string" },
    text: { type: "string" },
    role: { type: "string" },
    school: { type: "string" },
    connection: { type: "string" },
    fit: { type: "string" },
    strategy: { type: "string" },
    why: { type: "string" },
    risk: { type: "string" },
    trait: { type: "string" },
    description: { type: "string" },
    chip: { type: "string" },
    bullets: TEXT_ARRAY_SCHEMA
  }
};

const TABLE_SCHEMA = {
  type: "object",
  additionalProperties: true,
  properties: {
    title: { type: "string" },
    headers: TEXT_ARRAY_SCHEMA,
    rows: {
      type: "array",
      items: {
        type: "array",
        items: { type: "string" }
      }
    }
  }
};

const DECK_SCHEMA = {
  type: "object",
  additionalProperties: true,
  properties: {
    deck_title: { type: "string" },
    student_summary: { type: "object", additionalProperties: true },
    consultant_transformation_summary: { type: "object", additionalProperties: true },
    slides: {
      type: "array",
      minItems: 10,
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: true,
        properties: {
          slide_no: { type: "number" },
          layout: {
            type: "string",
            enum: [
              "cover",
              "project_concept",
              "why_project",
              "student_tasks",
              "weekly_plan_1",
              "weekly_plan_2",
              "support_structure",
              "final_outputs",
              "admissions_learning_value",
              "core_character"
            ]
          },
          section_label: { type: "string" },
          page_context: { type: "string" },
          title: { type: "string" },
          title_en: { type: "string" },
          subtitle_ko: { type: "string" },
          badges: TEXT_ARRAY_SCHEMA,
          info_rows: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: true,
              properties: { label: { type: "string" }, value: { type: "string" } }
            }
          },
          main_card: {
            type: "object",
            additionalProperties: true,
            properties: {
              heading: { type: "string" },
              paragraphs: TEXT_ARRAY_SCHEMA
            }
          },
          side_card: {
            type: "object",
            additionalProperties: true,
            properties: {
              heading: { type: "string" },
              bullets: TEXT_ARRAY_SCHEMA
            }
          },
          process_cards: { type: "array", items: CARD_SCHEMA },
          metrics: { type: "array", items: CARD_SCHEMA },
          cards: { type: "array", items: CARD_SCHEMA },
          message_box: {
            type: "object",
            additionalProperties: true,
            properties: { heading: { type: "string" }, text: { type: "string" } }
          },
          quote: { type: "string" },
          skill_chips: { type: "array", items: CARD_SCHEMA },
          workflow: { type: "array", items: CARD_SCHEMA },
          checking_table: TABLE_SCHEMA,
          evidence_log_table: TABLE_SCHEMA,
          guiding_question: { type: "string" },
          phase_chips: TEXT_ARRAY_SCHEMA,
          weekly_table: TABLE_SCHEMA,
          note_box: {
            type: "object",
            additionalProperties: true,
            properties: { heading: { type: "string" }, text: { type: "string" } }
          },
          scenario_section_title: { type: "string" },
          scenario_cards: { type: "array", items: CARD_SCHEMA },
          role_cards: { type: "array", items: CARD_SCHEMA },
          process_flow: TEXT_ARRAY_SCHEMA,
          output_cards: { type: "array", items: CARD_SCHEMA },
          flow: TEXT_ARRAY_SCHEMA,
          admissions_table: TABLE_SCHEMA,
          growth_table: TABLE_SCHEMA,
          school_cards: { type: "array", items: CARD_SCHEMA },
          activity_list_example: { type: "string" },
          core_title: { type: "string" },
          summary: { type: "string" },
          traits: { type: "array", items: CARD_SCHEMA },
          final_quote: { type: "string" },
          bottom_steps: { type: "array", items: CARD_SCHEMA }
        }
      }
    }
  },
  required: ["deck_title", "student_summary", "consultant_transformation_summary", "slides"]
};

const REVIEW_SCHEMA = {
  type: "object",
  additionalProperties: true,
  properties: {
    score: { type: "number" },
    needs_rewrite: { type: "boolean" },
    summary: { type: "string" },
    critical_issues: TEXT_ARRAY_SCHEMA,
    slide_reviews: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: true,
        properties: {
          slide_no: { type: "number" },
          status: { type: "string", enum: ["pass", "rewrite"] },
          issues: TEXT_ARRAY_SCHEMA,
          rewrite_instructions: { type: "string" }
        }
      }
    }
  },
  required: ["score", "needs_rewrite", "summary", "critical_issues", "slide_reviews"]
};

const BLUEPRINT_SCHEMA = {
  type: "object",
  additionalProperties: true,
  properties: {
    signature_title: { type: "string" },
    project_question: { type: "string" },
    student_hook: { type: "string" },
    student_fit: { type: "string" },
    academic_value: { type: "string" },
    community_contribution: { type: "string" },
    target_audience: { type: "string" },
    final_outputs: { type: "array", items: CARD_SCHEMA },
    weekly_arc: { type: "array", items: CARD_SCHEMA },
    admissions_use: { type: "array", items: CARD_SCHEMA },
    risks_and_controls: { type: "array", items: CARD_SCHEMA }
  },
  required: [
    "signature_title",
    "project_question",
    "student_hook",
    "student_fit",
    "academic_value",
    "community_contribution",
    "target_audience",
    "final_outputs",
    "weekly_arc",
    "admissions_use",
    "risks_and_controls"
  ]
};

const THEME = {
  navy: "173A59",
  blue: "2C78A0",
  mint: "5CC9B8",
  softMint: "E6F7F4",
  bg: "F5F9FB",
  border: "D7E4EA",
  gold: "D9A72B",
  white: "FFFFFF",
  ink: "17324A",
  gray: "536879",
  softBlue: "E7F2F8"
};

function clip(value, max = 420) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  const effectiveMax = Math.max(Number(max) || 0, 220);
  return text.length > effectiveMax ? text.slice(0, effectiveMax).trim() : text;
}

function arr(value, max = 6) {
  if (Array.isArray(value)) return value.map(x => String(x || "").trim()).filter(Boolean).slice(0, max);
  if (!value) return [];
  return String(value).split(/\n|;|•/).map(x => x.trim()).filter(Boolean).slice(0, max);
}

function safeName(value) {
  return String(value || "student").replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "_").slice(0, 48) || "student";
}

function todayId() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "");
}

function readDeckPrompt() {
  const fallback = [
    "You are an expert boarding school admissions consultant, academic project designer, and parent-facing proposal writer.",
    "Do not summarize the input. Transform it into a polished, persuasive, parent-facing 10-slide PPTX proposal deck.",
    "Return only valid JSON with deck_title, student_summary, consultant_transformation_summary, and exactly 10 slides.",
    "Use Korean as the main language. Use English only for natural admissions labels and project titles.",
    "Every slide must be specific enough to render directly into editable PPTX."
  ].join("\n");
  try {
    const v3Prompt = path.join(process.cwd(), "src", "prompts", "projectProposalDeckPrompt.v3.txt");
    if (fs.existsSync(v3Prompt)) return fs.readFileSync(v3Prompt, "utf8").trim() || fallback;
    const v2Prompt = path.join(process.cwd(), "src", "prompts", "projectProposalDeckPrompt.v2.txt");
    if (fs.existsSync(v2Prompt)) return fs.readFileSync(v2Prompt, "utf8").trim() || fallback;
    const cleanPrompt = path.join(process.cwd(), "src", "prompts", "projectProposalDeckPrompt.clean.txt");
    if (fs.existsSync(cleanPrompt)) return fs.readFileSync(cleanPrompt, "utf8").trim() || fallback;
    const source = fs.readFileSync(path.join(process.cwd(), "src", "prompts", "projectProposalDeckPrompt.ts"), "utf8");
    const match = source.match(/OPENAI_DECK_TRANSFORMATION_PROMPT\s*=\s*String\.raw`([\s\S]*)`;\s*$/);
    return (match?.[1] || source || fallback).trim();
  } catch {
    return fallback;
  }
}

function setCors(req, res) {
  const configured = process.env.ALLOWED_ORIGIN || "https://aramlee41.github.io";
  const allowed = configured.split(",").map(x => x.trim()).filter(Boolean);
  const origin = req.headers.origin || "";
  const match = allowed.includes("*") ? "*" : allowed.find(x => x === origin) || allowed[0] || origin;
  res.setHeader("Access-Control-Allow-Origin", match);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function bodyJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  return {};
}

function responseText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  const chunks = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join("\n").trim();
}

function compactText(value, max = 700) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function compactList(value, maxItems = 6, maxChars = 220) {
  if (!Array.isArray(value)) return [];
  return value
    .map(item => compactText(item, maxChars))
    .filter(Boolean)
    .slice(0, maxItems);
}

function compactInterest(item = {}) {
  return {
    school: compactText(item.school || item.name, 90),
    reason: compactText(item.reason || item.note || item.memo, 240)
  };
}

function compactTest(item = {}) {
  return {
    type: compactText(item.type || item.testType, 40),
    date: compactText(item.date || item.testDate, 40),
    level: compactText(item.level || item.testLevel, 40),
    total: compactText(item.total || item.overall || item.score, 50),
    percentile: compactText(item.percentile || item.overallPercentile, 50),
    sections: compactText(item.detail || item.sections || item.subscores || item.comment, 420),
    nextDate: compactText(item.nextDate || item.nextTestDate, 40)
  };
}

function compactTranscript(item = {}) {
  return {
    school: compactText(item.school, 90),
    grade: compactText(item.grade || item.gradeLevel, 40),
    year: compactText(item.year, 40),
    term: compactText(item.term || item.season, 40),
    gpa: compactText(item.gpa || item.termGpa || item.calculatedScore, 50),
    rank: compactText(item.rank, 50),
    subjects: Array.isArray(item.subjects)
      ? item.subjects.slice(0, 8).map(subject => ({
          category: compactText(subject.category, 50),
          name: compactText(subject.name || subject.subject, 80),
          grade: compactText(subject.grade || subject.letterGrade || subject.rawGrade, 40),
          comment: compactText(subject.comment || subject.teacherComment, 180)
        }))
      : compactText(item.comment || item.teacherComment || item.detail, 700)
  };
}

function compactAward(item = {}) {
  return {
    title: compactText(item.title || item.awardName || item.name, 100),
    level: compactText(item.level, 50),
    competition: compactText(item.competition, 100),
    date: compactText(item.date || item.yearMonth || item.month, 40),
    note: compactText(item.note || item.description, 220)
  };
}

function compactEc(item = {}) {
  return {
    category: compactText(item.category || item.cat, 50),
    name: compactText(item.name || item.activityName || item.sport, 120),
    team: compactText(item.team || item.clubName, 100),
    status: compactText(item.status, 40),
    period: compactText([item.from || item.startDate, item.to || item.endDate].filter(Boolean).join(" - "), 80),
    hoursPerWeek: compactText(item.hours || item.hoursPerWeek, 40),
    weeksPerYear: compactText(item.weeks || item.weeksPerYear, 40),
    level: compactText(item.level || item.levelOther, 80),
    position: compactText(item.position || item.role, 100),
    description: compactText(item.description || item.impact || item.story || item.note, 360),
    awards: Array.isArray(item.awards) ? item.awards.slice(0, 3).map(compactAward) : []
  };
}

function compactRecommendation(item = {}) {
  return {
    candidate: compactText(item.candidate || item.name, 90),
    role: compactText(item.role || item.subject, 90),
    currentStrength: compactText(item.currentStrength, 50),
    targetStrength: compactText(item.targetStrength, 50),
    evidence: compactText(item.evidence || item.notes, 260),
    currentTeacher: compactText(item.currentTeacher, 20),
    specialtyRecommendation: compactText(item.specialtyRecommendation, 20)
  };
}

function compactProject(project = {}) {
  return {
    title: compactText(project.title, 140),
    badge: compactText(project.badge, 70),
    sourceActivityNames: compactList(project.sourceActivityNames, 5, 90),
    bigIdea: compactText(project.bigIdea || project.rationale, 900),
    boardingFit: compactText(project.boardingFit, 700),
    academicTalent: compactText(project.academicTalent, 700),
    communityContribution: compactText(project.communityContribution, 700),
    currentEvidence: compactText(project.currentEvidence || project.currentState, 700),
    targetOutput: compactText(project.targetOutput || project.targetState, 700),
    evidenceNeeded: compactList(project.evidenceNeeded, 8, 240),
    risks: compactList(project.risks, 6, 240),
    nextActions: compactList(project.nextActions, 8, 240),
    applicationUsage: compactList(project.applicationUsage, 6, 240),
    semesterRoadmap: Array.isArray(project.semesterRoadmap)
      ? project.semesterRoadmap.slice(0, 8).map(row => ({
          period: compactText(row.period, 60),
          focus: compactText(row.focus, 220),
          deliverable: compactText(row.deliverable, 220),
          checkpoint: compactText(row.checkpoint, 160)
        }))
      : []
  };
}

function compactSchool(s = {}) {
  return {
    name: compactText(s.name, 100),
    programs: compactText(s.programs, 520),
    sports: compactText(s.sports, 360),
    arts: compactText(s.arts, 320),
    fit: compactText(s.fit, 500),
    risk: compactText(s.risk, 420),
    interview: compactText(s.interview, 360),
    englishRequirements: compactText(
      typeof s.englishRequirements === "string" ? s.englishRequirements : JSON.stringify(s.englishRequirements || {}),
      360
    )
  };
}

function payloadCharLength(payload) {
  return JSON.stringify(payload).length;
}

function enforcePayloadBudget(payload, maxChars = 32000) {
  if (payloadCharLength(payload) <= maxChars) return payload;
  const next = JSON.parse(JSON.stringify(payload));
  next._compactionNotice = "The original Prep LMS data was larger than the AI context budget, so nonessential long fields were shortened before generation.";
  next.rough_report_text = compactText(next.rough_report_text, 2200);
  next.student.hookNotes = compactText(next.student.hookNotes, 500);
  next.student.transcripts = (next.student.transcripts || []).slice(0, 5).map(row => ({
    ...row,
    subjects: Array.isArray(row.subjects) ? row.subjects.slice(0, 5).map(subject => ({ ...subject, comment: compactText(subject.comment, 90) })) : compactText(row.subjects, 300)
  }));
  next.student.ecs = (next.student.ecs || []).slice(0, 8).map(ec => ({
    ...ec,
    description: compactText(ec.description, 180),
    awards: (ec.awards || []).slice(0, 2)
  }));
  next.student.awards = (next.student.awards || []).slice(0, 6);
  next.student.recommendations = (next.student.recommendations || []).slice(0, 4).map(rec => ({ ...rec, evidence: compactText(rec.evidence, 140) }));
  next.project.bigIdea = compactText(next.project.bigIdea, 520);
  next.project.boardingFit = compactText(next.project.boardingFit, 360);
  next.project.academicTalent = compactText(next.project.academicTalent, 360);
  next.project.communityContribution = compactText(next.project.communityContribution, 360);
  next.project.currentEvidence = compactText(next.project.currentEvidence, 360);
  next.project.targetOutput = compactText(next.project.targetOutput, 360);
  next.project.evidenceNeeded = compactList(next.project.evidenceNeeded, 5, 160);
  next.project.risks = compactList(next.project.risks, 4, 160);
  next.project.nextActions = compactList(next.project.nextActions, 5, 160);
  next.project.applicationUsage = compactList(next.project.applicationUsage, 4, 160);
  next.project.semesterRoadmap = (next.project.semesterRoadmap || []).slice(0, 5).map(row => ({
    period: row.period,
    focus: compactText(row.focus, 120),
    deliverable: compactText(row.deliverable, 120),
    checkpoint: compactText(row.checkpoint, 100)
  }));
  next.schools = (next.schools || []).slice(0, 4).map(s => ({
    name: s.name,
    programs: compactText(s.programs, 260),
    sports: compactText(s.sports, 180),
    arts: compactText(s.arts, 160),
    fit: compactText(s.fit, 220),
    risk: compactText(s.risk, 180),
    interview: compactText(s.interview, 160),
    englishRequirements: compactText(s.englishRequirements, 160)
  }));
  return payloadCharLength(next) <= maxChars ? next : {
    mode: next.mode,
    generatedAt: next.generatedAt,
    _compactionNotice: next._compactionNotice,
    student: {
      name: next.student.name,
      englishName: next.student.englishName,
      currentGrade: next.student.currentGrade,
      targetYear: next.student.targetYear,
      targetGrade: next.student.targetGrade,
      target: next.student.target,
      currentSchool: next.student.currentSchool,
      citizenship: next.student.citizenship,
      interests: next.student.interests,
      tests: next.student.tests,
      ecs: next.student.ecs.slice(0, 5),
      awards: next.student.awards.slice(0, 4),
      hookNotes: compactText(next.student.hookNotes, 300)
    },
    rough_report_text: compactText(next.rough_report_text, 1400),
    project: {
      title: next.project.title,
      badge: next.project.badge,
      sourceActivityNames: next.project.sourceActivityNames,
      bigIdea: compactText(next.project.bigIdea, 360),
      boardingFit: compactText(next.project.boardingFit, 260),
      academicTalent: compactText(next.project.academicTalent, 260),
      communityContribution: compactText(next.project.communityContribution, 260),
      currentEvidence: compactText(next.project.currentEvidence, 260),
      targetOutput: compactText(next.project.targetOutput, 260),
      evidenceNeeded: next.project.evidenceNeeded.slice(0, 4),
      risks: next.project.risks.slice(0, 3),
      nextActions: next.project.nextActions.slice(0, 4),
      applicationUsage: next.project.applicationUsage.slice(0, 3)
    },
    schools: next.schools.slice(0, 3)
  };
}

function compactPayload(body) {
  const student = body.student || {};
  const project = body.project || {};
  const compactedProject = compactProject(project);
  const roughReportText = [
    `Project title: ${compactedProject.title}`,
    `Project badge/theme: ${compactedProject.badge}`,
    `Source activities: ${(compactedProject.sourceActivityNames || []).join(", ")}`,
    `Big idea: ${compactedProject.bigIdea}`,
    `Boarding-school fit: ${compactedProject.boardingFit}`,
    `Academic talent: ${compactedProject.academicTalent}`,
    `Community contribution: ${compactedProject.communityContribution}`,
    `Current evidence: ${compactedProject.currentEvidence}`,
    `Target output: ${compactedProject.targetOutput}`,
    `Evidence needed: ${(compactedProject.evidenceNeeded || []).join(" / ")}`,
    `Risks and gaps: ${(compactedProject.risks || []).join(" / ")}`,
    `Recommended next actions: ${(compactedProject.nextActions || []).join(" / ")}`,
    `Application usage: ${(compactedProject.applicationUsage || []).join(" / ")}`
  ].filter(line => !/:\s*$/.test(line)).join("\n");

  const payload = {
    mode: body.mode || "generate",
    generatedAt: new Date().toISOString(),
    student: {
      name: compactText(student.name, 80),
      englishName: compactText(student.en || student.englishName, 80),
      currentGrade: compactText(student.grade || student.currentGrade, 40),
      targetYear: compactText(student.targetYear, 40),
      targetGrade: compactText(student.targetGrade, 40),
      target: compactText(student.target, 120),
      currentSchool: compactText(student.school, 100),
      citizenship: compactText(student.citizenship || student.usStatus, 120),
      interests: (Array.isArray(student.interests) ? student.interests : []).slice(0, 6).map(compactInterest),
      tests: (Array.isArray(student.tests) ? student.tests : []).slice(0, 8).map(compactTest),
      transcripts: (Array.isArray(student.transcripts) ? student.transcripts : []).slice(0, 8).map(compactTranscript),
      ecs: (Array.isArray(student.ecs) ? student.ecs : []).slice(0, 12).map(compactEc),
      awards: (Array.isArray(student.awards) ? student.awards : []).slice(0, 10).map(compactAward),
      recommendations: (Array.isArray(student.recommendations) ? student.recommendations : []).slice(0, 6).map(compactRecommendation),
      hookNotes: compactText(student.profile || student.hookNotes, 900)
    },
    rough_report_text: compactText(roughReportText, 4500),
    project: compactedProject,
    schools: (Array.isArray(body.schools) ? body.schools : []).slice(0, 6).map(compactSchool)
  };
  return enforcePayloadBudget(payload);
}

function defaultLayout(no) {
  return [
    "cover",
    "project_concept",
    "why_project",
    "student_tasks",
    "weekly_plan_1",
    "weekly_plan_2",
    "support_structure",
    "final_outputs",
    "admissions_learning_value",
    "core_character"
  ][no - 1] || "content";
}

function validateDeck(deck) {
  if (!deck || typeof deck !== "object") throw new Error("OpenAI response is not a JSON object.");
  if (!Array.isArray(deck.slides) || deck.slides.length !== 10) {
    throw new Error("OpenAI response must contain exactly 10 slides.");
  }
  deck.slides = deck.slides.map((slide, index) => ({
    ...slide,
    slide_no: Number(slide.slide_no) || index + 1,
    layout: slide.layout || defaultLayout(index + 1)
  }));
  return deck;
}

async function callOpenAi(payload, model, attempt, feedback = "") {
  const message = [
    attempt > 1
      ? [
          "The previous response failed parsing or quality checks.",
          feedback ? `Quality feedback: ${feedback}` : "",
          "Regenerate the full 10-slide JSON with denser, parent-ready content.",
          "Do not remove required cards, tables, rows, bullets, or paragraphs to make the answer shorter."
        ].filter(Boolean).join(" ")
      : "",
    "Transform this Prep LMS student data and rough project report into the required parent-facing 10-slide PPTX renderer JSON.",
    "Do not summarize. Critically improve weak parts, add concrete execution details, and make the proposal useful for parents and admissions.",
    JSON.stringify(payload, null, 2)
  ].filter(Boolean).join("\n\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions: readDeckPrompt(),
      input: [{ role: "user", content: [{ type: "input_text", text: message }] }],
      text: {
        format: {
          type: "json_schema",
          name: "project_proposal_deck",
          strict: false,
          schema: DECK_SCHEMA
        }
      },
      store: false
    })
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error?.message || "OpenAI API request failed");
    error.status = response.status;
    error.details = data;
    throw error;
  }
  return responseText(data);
}

async function callOpenAiSchema(model, instructions, message, schemaName, schema) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions,
      input: [{ role: "user", content: [{ type: "input_text", text: message }] }],
      text: {
        format: {
          type: "json_schema",
          name: schemaName,
          strict: false,
          schema
        }
      },
      store: false
    })
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error?.message || "OpenAI API request failed");
    error.status = response.status;
    error.details = data;
    throw error;
  }
  return responseText(data);
}

async function generateProjectBlueprint(payload, model) {
  const instructions = [
    "You are a senior boarding school admissions strategist and academic project architect.",
    "Create a concrete signature project blueprint before any slides are written.",
    "The blueprint must turn raw student data into a specific, feasible, parent-facing project concept.",
    "Do not summarize the input. Decide the student hook, project question, final outputs, weekly arc, admissions use, and risks.",
    "Write in polished Korean, with English only for project titles and admissions labels.",
    "Return only valid JSON."
  ].join("\n");
  const message = [
    "Build the project blueprint from this Prep LMS data.",
    "The result will be used as the source of truth for a 10-slide parent proposal deck.",
    "Make it specific enough that another model cannot turn it into a generic project.",
    JSON.stringify(payload, null, 2)
  ].join("\n\n");
  return JSON.parse(await callOpenAiSchema(model, instructions, message, "project_blueprint", BLUEPRINT_SCHEMA));
}

function deckReviewInstructions() {
  return [
    "You are a strict senior education consulting deck reviewer.",
    "Your job is to decide whether this AI-generated PPTX content JSON is strong enough to show Korean parents without human rewriting.",
    "Evaluate it against a premium parent-facing proposal PDF standard.",
    "Fail the deck if any slide is generic, thin, truncated-looking, mechanically worded, insufficiently student-specific, or not actionable.",
    "Pay special attention to:",
    "- whether the project concept is sharp and specific",
    "- whether the student profile is meaningfully connected to the project",
    "- whether weeks 1-12 are concrete and executable",
    "- whether support roles are practical",
    "- whether final outputs are tangible",
    "- whether admissions value is school-aware rather than generic",
    "- whether the final character is memorable",
    "- whether labels or bottom steps look clipped or orphaned",
    "Return only valid JSON."
  ].join("\n");
}

async function reviewDeckWithOpenAi(payload, deck, model) {
  const message = [
    "Review this generated deck JSON against the desired premium proposal quality.",
    "Use the student payload and blueprint to judge specificity.",
    "If it would still require a consultant to rewrite it before sending to parents, set needs_rewrite to true.",
    "Give slide-specific rewrite instructions.",
    JSON.stringify({ payload, deck }, null, 2)
  ].join("\n\n");
  return JSON.parse(await callOpenAiSchema(model, deckReviewInstructions(), message, "project_deck_review", REVIEW_SCHEMA));
}

function reviewNeedsRewrite(review) {
  if (!review || typeof review !== "object") return false;
  const score = Number(review.score || 0);
  const rewriteSlides = asArray(review.slide_reviews).filter(item => String(item?.status || "").toLowerCase() === "rewrite");
  return Boolean(review.needs_rewrite) || score < 8.6 || rewriteSlides.length > 0 || asArray(review.critical_issues).length > 0;
}

async function reviseDeckWithOpenAi(payload, deck, review, model) {
  const instructions = [
    readDeckPrompt(),
    "",
    "REVISION MODE",
    "You are revising a deck that failed senior consultant review.",
    "Rewrite the entire 10-slide JSON, not just the weak slides, so the story is coherent.",
    "Use the review comments as mandatory corrections.",
    "Keep the exact 10-slide structure and renderer fields.",
    "Make weak cards more concrete, project-specific, student-specific, and parent-ready.",
    "Avoid clipped-looking fragments. Bottom steps must have clear labels and complete text.",
    "Return only valid JSON."
  ].join("\n");
  const message = [
    "Revise this generated project proposal deck.",
    "Student payload and project blueprint:",
    JSON.stringify(payload, null, 2),
    "Previous deck JSON:",
    JSON.stringify(deck, null, 2),
    "Senior reviewer feedback:",
    JSON.stringify(review, null, 2)
  ].join("\n\n");
  return validateDeck(JSON.parse(await callOpenAiSchema(model, instructions, message, "project_proposal_deck_revision", DECK_SCHEMA)));
}

function addText(slide, text, options) {
  slide.addText(clip(text, options.max || 600), {
    fontFace: "Noto Sans KR",
    fit: "shrink",
    margin: 0.04,
    breakLine: false,
    ...options
  });
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value === "object") return Object.values(value);
  return [value];
}

function asObject(value, fallbackKey = "text") {
  if (value && typeof value === "object" && !Array.isArray(value)) return value;
  return { [fallbackKey]: String(value || "") };
}

function cardArray(value, titleKey = "title") {
  return asArray(value).map(item => asObject(item, titleKey)).filter(item => Object.values(item).some(Boolean));
}

function firstTextValue(item, keys = []) {
  if (!item || typeof item !== "object") return String(item || "").trim();
  for (const key of keys) {
    const value = item[key];
    if (Array.isArray(value)) {
      const joined = value.map(x => String(x || "").trim()).filter(Boolean).join(" / ");
      if (joined) return joined;
    } else if (value !== undefined && value !== null && String(value).trim()) {
      return String(value).trim();
    }
  }
  return "";
}

function cardTitle(item, fallback = "") {
  return firstTextValue(item, ["label", "title", "heading", "school", "role", "trait", "name", "chip", "value"]) || fallback;
}

function cardBody(item, keys = ["text", "connection", "description", "fit", "strategy", "why", "risk", "caption", "value"]) {
  const body = firstTextValue(item, keys);
  if (body) return body;
  const bullets = asArray(item?.bullets).map(x => String(x || "").trim()).filter(Boolean);
  return bullets.join("\n");
}

function cardBullets(item) {
  return asArray(item?.bullets).map(x => String(x || "").trim()).filter(Boolean);
}

function textLength(value) {
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + textLength(item), 0);
  if (value && typeof value === "object") return Object.values(value).reduce((sum, item) => sum + textLength(item), 0);
  return String(value || "").replace(/\s+/g, " ").trim().length;
}

function tableRows(table) {
  return asArray(table?.rows).filter(row => textLength(row) > 0);
}

function filledCellCount(row) {
  if (Array.isArray(row)) return row.filter(cell => String(cell || "").trim()).length;
  if (row && typeof row === "object") return Object.values(row).filter(cell => String(cell || "").trim()).length;
  return String(row || "").trim() ? 1 : 0;
}

function bulletCount(cards) {
  return cardArray(cards).reduce((sum, card) => sum + asArray(card.bullets).filter(Boolean).length, 0);
}

function containsTruncatedText(value) {
  if (Array.isArray(value)) return value.some(containsTruncatedText);
  if (value && typeof value === "object") return Object.values(value).some(containsTruncatedText);
  return /(\.\.\.|…)\s*$/.test(String(value || "").trim());
}

function deckQualityIssues(deck) {
  const issues = [];
  const slide = no => deck.slides?.[no - 1] || {};
  const add = issue => issues.push(issue);

  if (!Array.isArray(deck.slides) || deck.slides.length !== 10) add("deck must contain exactly 10 slides");
  if (containsTruncatedText(deck)) add("deck contains truncated-looking text endings");

  const s2 = slide(2);
  const s2Paragraphs = asArray(s2.main_card?.paragraphs).filter(Boolean);
  if (s2Paragraphs.length < 3 || textLength(s2Paragraphs) < 300) add("slide 2 needs at least 3 substantial project concept paragraphs");
  if (cardArray(s2.process_cards).length < 4) add("slide 2 needs 4 process cards");
  if (cardArray(s2.metrics, "label").length < 5) add("slide 2 needs 5 metrics");

  const s3 = slide(3);
  if (cardArray(s3.cards, "heading").length < 3 || bulletCount(s3.cards) < 9) add("slide 3 needs 3 reason cards with detailed bullets");
  if (textLength(s3.message_box?.text) < 120) add("slide 3 message box is too shallow");

  const s4 = slide(4);
  if (cardArray(s4.workflow).length < 5) add("slide 4 needs a 5-step workflow");
  if (tableRows(s4.checking_table).length < 4) add("slide 4 checking table needs at least 4 rows");
  if (tableRows(s4.evidence_log_table).length < 3) add("slide 4 evidence log table needs at least 3 rows");

  const s5 = slide(5);
  const s5Rows = tableRows(s5.weekly_table);
  if (s5Rows.length < 6 || s5Rows.some(row => filledCellCount(row) < 4)) add("slide 5 weekly plan needs 6 fully populated weekly rows");
  if (textLength(s5.note_box?.text) < 80) add("slide 5 note box needs a concrete reading/research direction");

  const s6 = slide(6);
  const s6Rows = tableRows(s6.weekly_table);
  if (s6Rows.length < 6 || s6Rows.some(row => filledCellCount(row) < 4)) add("slide 6 weekly plan needs 6 fully populated weekly rows");
  if (cardArray(s6.scenario_cards).length < 5) add("slide 6 needs 5 school-life scenario cards");

  const s7 = slide(7);
  if (cardArray(s7.role_cards, "role").length < 5 || bulletCount(s7.role_cards) < 15) add("slide 7 needs 5 support role cards with concrete responsibilities");

  const s8 = slide(8);
  if (cardArray(s8.output_cards).length < 4 || bulletCount(s8.output_cards) < 12) add("slide 8 needs 4 final output cards with concrete content");

  const s9 = slide(9);
  if (tableRows(s9.admissions_table).length < 5) add("slide 9 admissions table needs at least 5 rows");
  if (tableRows(s9.growth_table).length < 5) add("slide 9 growth table needs at least 5 rows");
  const schoolCards = cardArray(s9.school_cards, "school");
  if (schoolCards.length < 3 || schoolCards.some(card => textLength(cardBody(card, ["connection", "fit", "strategy", "why", "text", "description", "value"])) < 60)) {
    add("slide 9 target school cards need school-specific explanation, not title-only cards");
  }
  if (textLength(s9.activity_list_example) < 140) add("slide 9 activity list example is too short");

  const s10 = slide(10);
  if (textLength(s10.summary) < 180) add("slide 10 core character summary is too short");
  const traitCards = cardArray(s10.traits, "trait");
  if (traitCards.length < 4 || traitCards.some(card => textLength(cardBody(card, ["description", "text", "evidence", "value", "caption"])) < 35)) {
    add("slide 10 needs 4 trait cards with explanations, not title-only labels");
  }
  if (cardArray(s10.bottom_steps, "label").length < 4) add("slide 10 needs 4 concrete next steps");

  return issues;
}

function addPill(slide, pptx, text, x, y, w, fill = THEME.softMint, color = THEME.navy, max = 44) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.26,
    rectRadius: 0.06,
    fill: { color: fill },
    line: { color: fill }
  });
  addText(slide, text, {
    x: x + 0.08, y: y + 0.052, w: Math.max(0.1, w - 0.16), h: 0.16,
    fontSize: 7.2,
    bold: true,
    color,
    align: "center",
    max
  });
}

function addCard(slide, pptx, { x, y, w, h, title, text, bullets = [], fill = THEME.white, accent = THEME.blue, bodyMax = 760, titleMax = 80, bodyFontSize = 7.1 }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: THEME.border, pt: 0.8 }
  });
  slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.05, h, fill: { color: accent }, line: { color: accent } });
  addText(slide, title || "", { x: x + 0.18, y: y + 0.14, w: w - 0.34, h: 0.26, fontSize: 10.2, bold: true, color: THEME.navy, max: titleMax });
  const body = [text, ...arr(bullets, 6).map(item => `• ${item}`)].filter(Boolean).join("\n");
  addText(slide, body, { x: x + 0.18, y: y + 0.48, w: w - 0.34, h: Math.max(0.3, h - 0.58), fontSize: bodyFontSize, color: THEME.ink, valign: "mid", max: bodyMax });
}

function addHeader(slide, pptx, deck, slideData, index) {
  slide.background = { color: THEME.bg };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.15, fill: { color: THEME.navy }, line: { color: THEME.navy } });
  addPill(slide, pptx, slideData.section_label || `Slide ${index + 1}`, 0.55, 0.38, 2.3, THEME.softBlue, THEME.navy);
  addText(slide, slideData.title || slideData.title_en || slideData.core_title || deck.deck_title || "Project Proposal", {
    x: 0.58, y: 0.72, w: 8.9, h: 0.38,
    fontSize: 18,
    bold: true,
    color: THEME.navy,
    max: 86
  });
  addText(slide, slideData.page_context || "", { x: 0.6, y: 1.13, w: 11.8, h: 0.24, fontSize: 8.2, color: THEME.gray, max: 170 });
}

function addFooter(slide, deck, index) {
  addText(slide, `YES Study Abroad · ${index + 1}/10`, {
    x: 0.58, y: 7.12, w: 3.4, h: 0.18,
    fontSize: 6.8,
    color: THEME.gray,
    max: 40
  });
}

function addTable(slide, table, x, y, w, h, fontSize = 6.8) {
  const headers = arr(table?.headers, 6);
  const rows = asArray(table?.rows).slice(0, 8);
  if (!headers.length || !rows.length) return;
  const tableData = [
    headers.map(header => ({
      text: clip(header, 32),
      options: { bold: true, align: "center", valign: "mid", color: THEME.navy, fill: { color: THEME.softBlue } }
    })),
    ...rows.map(row => headers.map((_, idx) => ({
      text: clip(Array.isArray(row) ? row[idx] || "" : "", idx === 0 ? 32 : 170),
      options: { align: idx === 0 ? "center" : "left", valign: "mid", color: THEME.ink }
    })))
  ];
  slide.addTable(tableData, {
    x, y, w, h,
    border: { type: "solid", color: THEME.border, pt: 0.55 },
    fontFace: "Noto Sans KR",
    fontSize,
    margin: 0.045,
    valign: "mid",
    fit: "shrink"
  });
}

function renderCoverSlide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  s.background = { color: THEME.navy };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: THEME.navy }, line: { color: THEME.navy } });
  s.addShape(pptx.ShapeType.rect, { x: 0.72, y: 0.68, w: 4.2, h: 0.08, fill: { color: THEME.gold }, line: { color: THEME.gold } });
  addPill(s, pptx, slideData.section_label || "Student-Led Research Portfolio", 0.78, 0.92, 2.9, THEME.softMint, THEME.navy);
  addText(s, slideData.title_en || deck.deck_title || "Signature Project Proposal", { x: 0.78, y: 1.38, w: 6.4, h: 0.88, fontSize: 27, bold: true, color: THEME.white, max: 90 });
  addText(s, slideData.subtitle_ko || deck.consultant_transformation_summary?.parent_value_proposition || "", { x: 0.82, y: 2.34, w: 5.9, h: 0.9, fontSize: 13, color: THEME.softMint, max: 190 });
  arr(slideData.badges, 4).forEach((badge, idx) => addPill(s, pptx, badge, 0.82 + idx * 1.1, 3.35, 1, THEME.softBlue, THEME.navy));
  cardArray(slideData.info_rows, "label").slice(0, 4).forEach((row, idx) => addCard(s, pptx, {
    x: 7.2, y: 1.12 + idx * 1.18, w: 4.95, h: 0.92,
    title: row.label || "",
    text: row.value || "",
    fill: "F8FBFE",
    accent: idx === 0 ? THEME.gold : THEME.mint
  }));
  addText(s, "YES Study Abroad · Project Proposal", { x: 0.78, y: 7.06, w: 4.6, h: 0.18, fontSize: 7, color: THEME.softBlue, max: 80 });
}

function renderProjectConceptSlide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  const main = slideData.main_card || {};
  addCard(s, pptx, { x: 0.58, y: 1.58, w: 6.8, h: 2.35, title: main.heading || "Project Concept", text: arr(main.paragraphs, 3).join("\n\n"), fill: THEME.white, accent: THEME.blue, bodyMax: 1450, bodyFontSize: 6.4 });
  const side = slideData.side_card || {};
  addCard(s, pptx, { x: 7.62, y: 1.58, w: 5.1, h: 2.35, title: side.heading || "Research Direction", bullets: side.bullets || [], fill: "F8FBFE", accent: THEME.mint });
  cardArray(slideData.process_cards).slice(0, 4).forEach((card, idx) => addCard(s, pptx, { x: 0.58 + idx * 3.05, y: 4.22, w: 2.75, h: 1.18, title: cardTitle(card), text: cardBody(card), fill: idx % 2 ? THEME.white : THEME.softMint, accent: THEME.gold, bodyMax: 360, bodyFontSize: 6.6 }));
  cardArray(slideData.metrics, "label").slice(0, 5).forEach((metric, idx) => {
    const cellX = 0.58 + idx * 2.46;
    s.addShape(pptx.ShapeType.roundRect, { x: cellX, y: 5.68, w: 2.22, h: 0.88, rectRadius: 0.06, fill: { color: THEME.navy }, line: { color: THEME.navy } });
    addText(s, metric.value || cardBody(metric, ["value", "text", "description"]) || "", { x: cellX + 0.1, y: 5.79, w: 2.02, h: 0.28, fontSize: 9.6, bold: true, color: THEME.white, align: "center", max: 58 });
    addText(s, metric.label || cardTitle(metric), { x: cellX + 0.1, y: 6.15, w: 2.02, h: 0.18, fontSize: 5.8, color: THEME.softBlue, align: "center", max: 46 });
  });
  addFooter(s, deck, index);
}

function renderWhyProjectSlide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  cardArray(slideData.cards, "heading").slice(0, 3).forEach((card, idx) => addCard(s, pptx, { x: 0.58 + idx * 4.18, y: 1.58, w: 3.85, h: 2.55, title: cardTitle(card), text: cardBody(card, ["text", "description", "caption"]), bullets: cardBullets(card), fill: idx === 1 ? "F8FBFE" : THEME.white, accent: [THEME.blue, THEME.mint, THEME.gold][idx], bodyMax: 860, bodyFontSize: 6.8 }));
  addCard(s, pptx, { x: 0.58, y: 4.38, w: 8.15, h: 1.35, title: slideData.message_box?.heading || "Why This Project Matters", text: slideData.message_box?.text || "", fill: THEME.softMint, accent: THEME.mint });
  addCard(s, pptx, { x: 9.02, y: 4.38, w: 3.7, h: 1.35, title: "핵심 문장", text: slideData.quote || "", fill: THEME.white, accent: THEME.gold });
  cardArray(slideData.skill_chips, "label").slice(0, 5).forEach((chip, idx) => {
    const label = cardTitle(chip);
    const caption = cardBody(chip, ["caption", "text", "description", "value"]);
    const text = [label, caption && caption !== label ? caption : ""].filter(Boolean).join(" · ");
    if (text) addPill(s, pptx, text, 0.72 + idx * 2.45, 6.1, 2.15, THEME.softBlue, THEME.navy, 72);
  });
  addFooter(s, deck, index);
}

function renderStudentTasksSlide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  cardArray(slideData.workflow).slice(0, 5).forEach((step, idx) => addCard(s, pptx, { x: 0.58 + idx * 2.48, y: 1.55, w: 2.18, h: 1.18, title: step.title, text: step.text, fill: idx % 2 ? THEME.white : THEME.softMint, accent: THEME.blue }));
  addText(s, slideData.checking_table?.title || "이해도 확인 방식", { x: 0.58, y: 2.96, w: 5.8, h: 0.22, fontSize: 9.5, bold: true, color: THEME.navy });
  addTable(s, slideData.checking_table, 0.58, 3.26, 5.95, 2.28, 6.3);
  addText(s, slideData.evidence_log_table?.title || "Evidence Log 예시", { x: 6.82, y: 2.96, w: 5.8, h: 0.22, fontSize: 9.5, bold: true, color: THEME.navy });
  addTable(s, slideData.evidence_log_table, 6.82, 3.26, 5.9, 2.28, 6.3);
  addCard(s, pptx, { x: 0.58, y: 5.85, w: 12.14, h: 0.72, title: "Guiding Question", text: slideData.guiding_question || "", fill: THEME.white, accent: THEME.gold });
  addFooter(s, deck, index);
}

function renderWeeklyPlan1Slide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  arr(slideData.phase_chips, 4).forEach((chip, idx) => addPill(s, pptx, chip, 0.58 + idx * 2.85, 1.48, 2.45, idx % 2 ? THEME.softMint : THEME.softBlue, THEME.navy));
  addTable(s, slideData.weekly_table, 0.58, 1.92, 12.14, 3.95, 6.2);
  addCard(s, pptx, { x: 0.58, y: 6.05, w: 12.14, h: 0.72, title: slideData.note_box?.heading || "자료 읽기 방향", text: slideData.note_box?.text || "", fill: THEME.white, accent: THEME.mint });
  addFooter(s, deck, index);
}

function renderWeeklyPlan2Slide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  addTable(s, slideData.weekly_table, 0.58, 1.52, 12.14, 3.55, 6.2);
  addText(s, slideData.scenario_section_title || "학교생활 장면별 예시 문제", { x: 0.58, y: 5.28, w: 5, h: 0.22, fontSize: 9.5, bold: true, color: THEME.navy });
  cardArray(slideData.scenario_cards).slice(0, 5).forEach((card, idx) => addCard(s, pptx, { x: 0.58 + idx * 2.45, y: 5.62, w: 2.16, h: 1.02, title: card.title, text: card.text, fill: idx % 2 ? THEME.white : THEME.softMint, accent: THEME.blue }));
  addFooter(s, deck, index);
}

function renderSupportStructureSlide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  cardArray(slideData.role_cards, "role").slice(0, 5).forEach((card, idx) => addCard(s, pptx, { x: 0.58 + (idx % 3) * 4.12, y: 1.55 + Math.floor(idx / 3) * 2.42, w: idx < 3 ? 3.75 : 5.88, h: 2.02, title: card.role || card.title, bullets: card.bullets || [], fill: idx % 2 ? "F8FBFE" : THEME.white, accent: [THEME.blue, THEME.mint, THEME.gold][idx % 3] }));
  addPill(s, pptx, arr(slideData.process_flow, 4).join("  →  ") || "학생 초안 → 멘토 피드백 → 최종 결과물", 3.45, 6.35, 6.6, THEME.softBlue, THEME.navy);
  addFooter(s, deck, index);
}

function renderFinalOutputsSlide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  cardArray(slideData.output_cards).slice(0, 4).forEach((card, idx) => addCard(s, pptx, { x: 0.58 + (idx % 2) * 6.15, y: 1.55 + Math.floor(idx / 2) * 2.28, w: 5.75, h: 1.88, title: `${card.title || ""}${card.chip ? ` · ${card.chip}` : ""}`, bullets: card.bullets || [], fill: idx % 2 ? "F8FBFE" : THEME.white, accent: idx < 2 ? THEME.blue : THEME.mint }));
  addPill(s, pptx, arr(slideData.flow, 4).join("  →  "), 1.15, 6.35, 11, THEME.softMint, THEME.navy);
  addFooter(s, deck, index);
}

function renderAdmissionsLearningValueSlide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  addText(s, slideData.admissions_table?.title || "보딩스쿨 입시 활용", { x: 0.58, y: 1.52, w: 5.6, h: 0.22, fontSize: 9.5, bold: true, color: THEME.navy });
  addTable(s, slideData.admissions_table, 0.58, 1.84, 5.8, 2.4, 6.2);
  addText(s, slideData.growth_table?.title || "교육적 성장", { x: 6.75, y: 1.52, w: 5.6, h: 0.22, fontSize: 9.5, bold: true, color: THEME.navy });
  addTable(s, slideData.growth_table, 6.75, 1.84, 5.98, 2.4, 6.2);
  cardArray(slideData.school_cards, "school").slice(0, 3).forEach((card, idx) => addCard(s, pptx, {
    x: 0.58 + idx * 4.18, y: 4.48, w: 3.85, h: 1.45,
    title: cardTitle(card, `Target School ${idx + 1}`),
    text: cardBody(card, ["connection", "fit", "strategy", "why", "text", "description", "value"]),
    bullets: cardBullets(card),
    fill: idx % 2 ? "F8FBFE" : THEME.white,
    accent: THEME.gold,
    bodyMax: 520,
    bodyFontSize: 6.5
  }));
  addCard(s, pptx, { x: 0.58, y: 6.08, w: 12.14, h: 0.66, title: "Activity List Example", text: slideData.activity_list_example || "", fill: THEME.softMint, accent: THEME.mint, bodyMax: 520, bodyFontSize: 6.2 });
  addFooter(s, deck, index);
}

function renderCoreCharacterSlide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  addCard(s, pptx, { x: 0.58, y: 1.55, w: 12.14, h: 1.28, title: slideData.core_title || "Core Character", text: slideData.summary || "", fill: THEME.white, accent: THEME.gold });
  cardArray(slideData.traits, "trait").slice(0, 4).forEach((trait, idx) => addCard(s, pptx, {
    x: 0.58 + idx * 3.05, y: 3.18, w: 2.75, h: 1.52,
    title: cardTitle(trait),
    text: cardBody(trait, ["description", "text", "evidence", "value", "caption"]),
    bullets: cardBullets(trait),
    fill: idx % 2 ? "F8FBFE" : THEME.softMint,
    accent: THEME.blue,
    bodyMax: 420,
    bodyFontSize: 6.4
  }));
  addCard(s, pptx, { x: 0.58, y: 5.02, w: 7.05, h: 1.05, title: "최종 인상", text: slideData.final_quote || "", fill: THEME.white, accent: THEME.mint });
  cardArray(slideData.bottom_steps, "label").slice(0, 4).forEach((step, idx) => {
    const y = 4.95 + idx * 0.43;
    s.addShape(pptx.ShapeType.roundRect, {
      x: 7.95, y, w: 4.55, h: 0.34,
      rectRadius: 0.05,
      fill: { color: idx % 2 ? THEME.softMint : THEME.softBlue },
      line: { color: idx % 2 ? THEME.softMint : THEME.softBlue }
    });
    addText(s, step.label || `Step ${idx + 1}`, {
      x: 8.06, y: y + 0.06, w: 0.95, h: 0.13,
      fontSize: 6.2,
      bold: true,
      color: THEME.navy,
      max: 24
    });
    addText(s, step.text || step.description || "", {
      x: 9.02, y: y + 0.045, w: 3.28, h: 0.19,
      fontSize: 5.7,
      color: THEME.ink,
      max: 120
    });
  });
  addFooter(s, deck, index);
}

function renderFallbackSlide(pptx, deck, slideData, index) {
  const s = pptx.addSlide();
  addHeader(s, pptx, deck, slideData, index);
  addCard(s, pptx, { x: 0.58, y: 1.55, w: 12.14, h: 4.8, title: slideData.title || slideData.section_label || "Project Proposal", text: deck.consultant_transformation_summary?.parent_value_proposition || "", fill: THEME.white, accent: THEME.blue });
  addFooter(s, deck, index);
}

function renderDeckSlide(pptx, deck, slideData, index) {
  const layout = String(slideData.layout || defaultLayout(index + 1)).toLowerCase();
  if (layout === "cover" || index === 0) return renderCoverSlide(pptx, deck, slideData, index);
  if (layout === "project_concept") return renderProjectConceptSlide(pptx, deck, slideData, index);
  if (layout === "why_project") return renderWhyProjectSlide(pptx, deck, slideData, index);
  if (layout === "student_tasks") return renderStudentTasksSlide(pptx, deck, slideData, index);
  if (layout === "weekly_plan_1") return renderWeeklyPlan1Slide(pptx, deck, slideData, index);
  if (layout === "weekly_plan_2") return renderWeeklyPlan2Slide(pptx, deck, slideData, index);
  if (layout === "support_structure") return renderSupportStructureSlide(pptx, deck, slideData, index);
  if (layout === "final_outputs") return renderFinalOutputsSlide(pptx, deck, slideData, index);
  if (layout === "admissions_learning_value") return renderAdmissionsLearningValueSlide(pptx, deck, slideData, index);
  if (layout === "core_character") return renderCoreCharacterSlide(pptx, deck, slideData, index);
  return renderFallbackSlide(pptx, deck, slideData, index);
}

async function renderPptx(deck, payload) {
  const pptxgen = require("pptxgenjs");
  const pptx = new pptxgen();
  pptx.author = "YES Study Abroad";
  pptx.company = "YES Study Abroad";
  pptx.subject = deck.student_summary?.project_theme || "Signature Project Proposal";
  pptx.title = deck.deck_title || "Signature Project Proposal";
  pptx.lang = "ko-KR";
  pptx.theme = { headFontFace: "Noto Sans KR", bodyFontFace: "Noto Sans KR", lang: "ko-KR" };
  pptx.defineLayout({ name: "YES_WIDE", width: 13.333, height: 7.5 });
  pptx.layout = "YES_WIDE";
  deck.slides.slice(0, 10).forEach((slide, index) => renderDeckSlide(pptx, deck, slide, index));
  const buffer = await pptx.write({ outputType: "nodebuffer" });
  const studentName = payload.student?.englishName || payload.student?.name || "student";
  return {
    fileName: `project_proposal_${safeName(studentName)}_${todayId()}.pptx`,
    base64: Buffer.from(buffer).toString("base64")
  };
}

function frontendProposal(deck, pptxFile) {
  const summary = deck.student_summary || {};
  return {
    title: deck.deck_title || "Signature Project Proposal",
    subtitle: summary.project_theme || summary.current_activity || "",
    meta: [summary.name_ko || summary.name_en, summary.current_grade, summary.current_school, summary.target_entry, arr(summary.target_schools, 6).join(", ")].filter(Boolean).join(" · "),
    format: "editable-pptx",
    designSystem: null,
    slides: [],
    sections: [],
    timeline: [],
    pptxFileName: pptxFile.fileName,
    pptxBase64: pptxFile.base64,
    pdfFileName: "",
    pdfBase64: ""
  };
}

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is not configured in Vercel." });
    }
    const payload = compactPayload(bodyJson(req));
    const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";
    const blueprint = await generateProjectBlueprint(payload, model);
    const deckPayload = { ...payload, project_blueprint: blueprint };
    let deck = null;
    let review = null;
    let lastError = null;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        const text = await callOpenAi(deckPayload, model, attempt, lastError?.message || "");
        deck = validateDeck(JSON.parse(text));
        const qualityIssues = deckQualityIssues(deck);
        if (qualityIssues.length) {
          throw new Error(`Deck quality check failed: ${qualityIssues.slice(0, 10).join("; ")}`);
        }
        lastError = null;
        break;
      } catch (error) {
        lastError = error;
        if (error.status) throw error;
      }
    }
    if (!deck) throw lastError || new Error("OpenAI deck JSON generation failed.");

    review = await reviewDeckWithOpenAi(deckPayload, deck, model);
    if (reviewNeedsRewrite(review)) {
      const revisedDeck = await reviseDeckWithOpenAi(deckPayload, deck, review, model);
      const revisedIssues = deckQualityIssues(revisedDeck);
      if (revisedIssues.length) {
        throw new Error(`Revised deck quality check failed: ${revisedIssues.slice(0, 10).join("; ")}`);
      }
      deck = revisedDeck;
      review = await reviewDeckWithOpenAi(deckPayload, deck, model);
    }

    const pptxFile = await renderPptx(deck, deckPayload);
    return res.status(200).json({
      proposal: frontendProposal(deck, pptxFile),
      pptxFileName: pptxFile.fileName,
      pptxBase64: pptxFile.base64,
      pdfFileName: "",
      pdfBase64: "",
      model,
      generatedAt: payload.generatedAt,
      qualityReviewScore: review?.score,
      provider: "openai-responses"
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || "Unexpected server error",
      details: error.details || undefined
    });
  }
};
