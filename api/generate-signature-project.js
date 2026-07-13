const fs = require("fs");
const path = require("path");

const DECK_TRANSFORMATION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    deck_title: { type: "string" },
    student_summary: {
      type: "object",
      additionalProperties: false,
      properties: {
        name_ko: { type: "string" },
        name_en: { type: "string" },
        current_grade: { type: "string" },
        current_school: { type: "string" },
        target_entry: { type: "string" },
        target_schools: { type: "array", items: { type: "string" } },
        current_activity: { type: "string" },
        project_theme: { type: "string" }
      },
      required: ["name_ko", "name_en", "current_grade", "current_school", "target_entry", "target_schools", "current_activity", "project_theme"]
    },
    consultant_transformation_summary: {
      type: "object",
      additionalProperties: false,
      properties: {
        project_reframing: { type: "string" },
        main_weakness_fixed: { type: "string" },
        parent_value_proposition: { type: "string" },
        student_growth_value: { type: "string" },
        admissions_value: { type: "string" }
      },
      required: ["project_reframing", "main_weakness_fixed", "parent_value_proposition", "student_growth_value", "admissions_value"]
    },
    slides: { type: "array", minItems: 10, maxItems: 10, items: { type: "object", additionalProperties: true } }
  },
  required: ["deck_title", "student_summary", "consultant_transformation_summary", "slides"]
};

const PPTX_THEME = {
  navy: "16324F",
  blue: "2C78A0",
  softBlue: "DCEAF7",
  mint: "5CC9B8",
  softMint: "E6F7F4",
  bg: "F5F9FB",
  border: "D7E4EA",
  gold: "D9A72B",
  white: "FFFFFF",
  gray: "51606A"
};

function safeFilePart(value) {
  return String(value || "student")
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 48) || "student";
}

function ymd(date = new Date()) {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

function truncate(value, max = 420) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function slideTitle(slide) {
  return truncate(slide.title || slide.sectionLabel || `Slide ${slide.slideNumber}`, 90);
}

function addPill(pptxSlide, pptx, text, x, y, w, fill = PPTX_THEME.softBlue, color = PPTX_THEME.navy) {
  pptxSlide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.28,
    rectRadius: 0.06,
    fill: { color: fill },
    line: { color: fill }
  });
  pptxSlide.addText(truncate(text, 28), {
    x: x + 0.08, y: y + 0.055, w: Math.max(0.1, w - 0.16), h: 0.18,
    fontFace: "Noto Sans KR",
    fontSize: 7.5,
    bold: true,
    color,
    fit: "shrink"
  });
}

function addCard(pptxSlide, pptx, { x, y, w, h, title, text, bullets = [], chips = [], fill = PPTX_THEME.white }) {
  pptxSlide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: PPTX_THEME.border, transparency: 5 }
  });
  if (chips.length) {
    let cx = x + 0.15;
    chips.slice(0, 3).forEach(chip => {
      const cw = Math.min(1.28, Math.max(0.58, String(chip).length * 0.08 + 0.32));
      if (cx + cw < x + w - 0.1) {
        addPill(pptxSlide, pptx, chip, cx, y + 0.12, cw, PPTX_THEME.softMint, PPTX_THEME.navy);
        cx += cw + 0.08;
      }
    });
  }
  pptxSlide.addText(truncate(title, 60), {
    x: x + 0.18, y: y + (chips.length ? 0.52 : 0.18), w: w - 0.36, h: 0.3,
    fontFace: "Noto Sans KR",
    fontSize: 12,
    bold: true,
    color: PPTX_THEME.navy,
    fit: "shrink"
  });
  const bodyY = y + (chips.length ? 0.9 : 0.54);
  const bodyText = [
    text ? truncate(text, 360) : "",
    ...bullets.slice(0, 5).map(b => `• ${truncate(b, 130)}`)
  ].filter(Boolean).join("\n");
  pptxSlide.addText(bodyText || "입력된 자료 기준으로 보완 예정입니다.", {
    x: x + 0.18, y: bodyY, w: w - 0.36, h: Math.max(0.3, h - (bodyY - y) - 0.12),
    fontFace: "Noto Sans KR",
    fontSize: 8.5,
    color: "253545",
    valign: "mid",
    breakLine: false,
    fit: "shrink",
    margin: 0.04
  });
}

function componentText(component = {}) {
  const parts = [];
  if (component.text) parts.push(component.text);
  if (Array.isArray(component.bullets) && component.bullets.length) parts.push(component.bullets.map(x => `• ${x}`).join("\n"));
  return parts.join("\n");
}

function renderTable(pptxSlide, component, x, y, w, h) {
  const headers = (component.headers || []).slice(0, 6);
  const rows = (component.rows || []).slice(0, 8);
  if (!headers.length || !rows.length) return false;
  const tableData = [
    headers.map(h => ({ text: truncate(h, 34), options: { bold: true, align: "center", color: PPTX_THEME.navy, fill: { color: PPTX_THEME.softBlue } } })),
    ...rows.map(row => headers.map((_, idx) => ({
      text: truncate(row[idx] || "", idx === 0 ? 24 : 80),
      options: { align: idx === 0 ? "center" : "left", valign: "mid", color: "263746" }
    })))
  ];
  pptxSlide.addTable(tableData, {
    x, y, w, h,
    border: { type: "solid", color: PPTX_THEME.border, pt: 0.6 },
    fontFace: "Noto Sans KR",
    fontSize: 6.8,
    margin: 0.045,
    valign: "mid",
    fit: "shrink"
  });
  return true;
}

function renderComponents(pptxSlide, pptx, slide, contentY = 1.55) {
  const components = Array.isArray(slide.components) ? slide.components : [];
  const table = components.find(c => (c.headers || []).length && (c.rows || []).length);
  const cardSource = components.find(c => (c.cards || []).length);
  const textSource = components.find(c => c.text || (c.bullets || []).length) || components[0] || {};

  if (/cover/i.test(slide.layout || "") || Number(slide.slideNumber) === 1) {
    pptxSlide.addText(truncate(slide.title, 90), {
      x: 0.75, y: 1.35, w: 6.4, h: 0.8,
      fontFace: "Noto Sans KR",
      fontSize: 28,
      bold: true,
      color: PPTX_THEME.white,
      fit: "shrink"
    });
    pptxSlide.addText(truncate(slide.purpose || slide.speakerNote, 260), {
      x: 0.78, y: 2.25, w: 5.7, h: 1.2,
      fontFace: "Noto Sans KR",
      fontSize: 13,
      color: PPTX_THEME.softBlue,
      fit: "shrink"
    });
    const cards = cardSource?.cards?.length ? cardSource.cards : [
      { title: "Student Snapshot", text: slide.purpose || "", chips: ["Profile"], bullets: [] },
      { title: "Core Outputs", text: "Research Brief, Presentation Slides, 1-Page Guide, Bibliography & Feedback Record", chips: ["Final Outputs"], bullets: [] },
      { title: "Target Schools", text: "입력된 목표 학교 기준으로 정리합니다.", chips: ["Schools"], bullets: [] }
    ];
    cards.slice(0, 3).forEach((card, idx) => addCard(pptxSlide, pptx, {
      x: 7.25, y: 1.15 + idx * 1.45, w: 4.95, h: 1.16,
      title: card.title,
      text: card.text,
      bullets: card.bullets,
      chips: card.chips,
      fill: "F8FBFE"
    }));
    return;
  }

  if (table && (slide.slideNumber === 5 || slide.slideNumber === 6)) {
    renderTable(pptxSlide, table, 0.58, contentY, 12.18, 4.25);
    const note = components.find(c => /note/i.test(c.type || "") || c.title);
    if (note) addCard(pptxSlide, pptx, {
      x: 0.58, y: 5.98, w: 12.18, h: 0.8,
      title: note.title || "Note",
      text: componentText(note),
      chips: note.chips || [],
      fill: PPTX_THEME.white
    });
    return;
  }

  if (table) {
    renderTable(pptxSlide, table, 0.58, contentY, 6.1, 4.65);
    const cards = cardSource?.cards?.length ? cardSource.cards : components.filter(c => c !== table).slice(0, 4).map(c => ({
      title: c.title || c.type,
      text: c.text,
      chips: c.chips,
      bullets: c.bullets
    }));
    cards.slice(0, 4).forEach((card, idx) => addCard(pptxSlide, pptx, {
      x: 6.95 + (idx % 2) * 2.95,
      y: contentY + Math.floor(idx / 2) * 2.15,
      w: 2.72,
      h: 1.85,
      title: card.title,
      text: card.text,
      bullets: card.bullets,
      chips: card.chips,
      fill: idx % 2 ? "FFFFFF" : "F8FBFE"
    }));
    return;
  }

  const cards = cardSource?.cards?.length ? cardSource.cards : components.slice(0, 6).map(c => ({
    title: c.title || c.type,
    text: c.text,
    chips: c.chips,
    bullets: c.bullets
  }));
  if (cards.length) {
    cards.slice(0, 6).forEach((card, idx) => addCard(pptxSlide, pptx, {
      x: 0.58 + (idx % 3) * 4.12,
      y: contentY + Math.floor(idx / 3) * 2.25,
      w: 3.75,
      h: 1.94,
      title: card.title,
      text: card.text,
      bullets: card.bullets,
      chips: card.chips,
      fill: idx % 2 ? "FFFFFF" : "F8FBFE"
    }));
  } else {
    addCard(pptxSlide, pptx, {
      x: 0.8, y: contentY, w: 11.7, h: 4.8,
      title: textSource.title || slide.title,
      text: componentText(textSource) || slide.purpose,
      bullets: [],
      chips: textSource.chips || [],
      fill: PPTX_THEME.white
    });
  }
}

async function renderPptx(proposal = {}, payload = {}) {
  const pptxgen = require("pptxgenjs");
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "YES Study Abroad";
  pptx.company = "YES Study Abroad";
  pptx.subject = proposal.subtitle || "Signature Project Proposal";
  pptx.title = proposal.title || "Signature Project Proposal";
  pptx.lang = "ko-KR";
  pptx.theme = {
    headFontFace: "Noto Sans KR",
    bodyFontFace: "Noto Sans KR",
    lang: "ko-KR"
  };
  pptx.defineLayout({ name: "YES_WIDE", width: 13.333, height: 7.5 });
  pptx.layout = "YES_WIDE";

  const slides = (proposal.slides || []).slice(0, 10);
  while (slides.length < 10) {
    slides.push({
      slideNumber: slides.length + 1,
      title: `Slide ${slides.length + 1}`,
      sectionLabel: "Project Proposal",
      purpose: "입력된 자료 기준으로 보완 예정입니다.",
      layout: "card_grid",
      visualDirection: "",
      components: []
    });
  }

  slides.forEach((slide, idx) => {
    const s = pptx.addSlide();
    const isCover = idx === 0;
    s.background = { color: isCover ? PPTX_THEME.navy : PPTX_THEME.bg };
    if (!isCover) {
      s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.18, fill: { color: PPTX_THEME.navy }, line: { color: PPTX_THEME.navy } });
      addPill(s, pptx, slide.sectionLabel || `Slide ${idx + 1}`, 0.55, 0.42, 2.3, PPTX_THEME.softBlue, PPTX_THEME.navy);
      s.addText(slideTitle(slide), {
        x: 0.58, y: 0.78, w: 8.4, h: 0.42,
        fontFace: "Noto Sans KR",
        fontSize: 19,
        bold: true,
        color: PPTX_THEME.navy,
        fit: "shrink"
      });
      s.addText(truncate(slide.purpose, 180), {
        x: 0.6, y: 1.18, w: 11.8, h: 0.28,
        fontFace: "Noto Sans KR",
        fontSize: 8.5,
        color: PPTX_THEME.gray,
        fit: "shrink"
      });
    } else {
      s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: PPTX_THEME.navy }, line: { color: PPTX_THEME.navy } });
      s.addShape(pptx.ShapeType.rect, { x: 0.7, y: 0.65, w: 4.1, h: 0.08, fill: { color: PPTX_THEME.gold }, line: { color: PPTX_THEME.gold } });
      addPill(s, pptx, slide.sectionLabel || "Project Proposal", 0.75, 0.88, 2.7, PPTX_THEME.softBlue, PPTX_THEME.navy);
    }
    renderComponents(s, pptx, slide, isCover ? 1.3 : 1.62);
    s.addText(`${proposal.title || "Signature Project Proposal"} · ${idx + 1}/10`, {
      x: 0.58, y: 7.12, w: 7.4, h: 0.2,
      fontFace: "Noto Sans KR",
      fontSize: 6.8,
      color: isCover ? PPTX_THEME.softBlue : PPTX_THEME.gray,
      fit: "shrink"
    });
  });

  const buffer = await pptx.write({ outputType: "nodebuffer" });
  const studentName = payload.student?.englishName || payload.student?.name || "student";
  return {
    fileName: `project_proposal_${safeFilePart(studentName)}_${ymd()}.pptx`,
    base64: Buffer.from(buffer).toString("base64")
  };
}

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
    "You are not writing a visible report. You are generating strict JSON data for a PPTX renderer.",
    "Transform the provided student/project information into JSON that can be rendered into an editable 10-slide PPTX project proposal deck.",
    "Do not generate a long-form written report. Do not generate paragraph-style report sections.",
    "The proposal must be slide-deck data: clear page-by-page content, cards, tables, chips, concise parent-facing Korean copy, and renderer-friendly layout hints.",
    "Do not expose raw strings like 'Editable Slide Deck JSON', 'Layout note', 'Visual Direction', or 'Speaker note' as customer-facing slide content. Those are renderer instructions only.",
    "The final user should receive a downloadable editable PPTX, not long text markup.",
    "Return exactly 10 slides in proposal.slides. Keep proposal.sections and proposal.timeline as empty arrays.",
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
    "For obesity, wellness, nutrition, body image, diabetes, or other student-health topics, do not stop at 'research the topic and keep an evidence log'. The project must define a school-life problem, identify stakeholders, design a practical support model, and produce a community-facing output.",
    "For obesity or wellness topics, frame the issue as a boarding-school life system: dining hall choices, training routines, sleep, stress, body image, peer culture, dorm life, advisor/coach support, and student self-management. Avoid blaming language or simplistic willpower framing.",
    "Health-related signature projects should include at least three of these concrete outputs when relevant: School-Life Problem Map, stakeholder scenario cards, student wellness checklist, team recovery routine, dining hall decision guide, dorm/advisor discussion guide, pilot feedback summary, mentor/teacher feedback sheet.",
    "Every project concept must answer four questions with concrete detail: what exactly will the student make, how the student will execute it, why it matters for admissions and learning, and what final evidence will remain.",
    "When the student's ECs include sports or arts, connect them meaningfully to the project only when the connection is natural. For example, baseball can connect to wellness through recovery, training culture, nutrition, team language, and coachability; cello can connect through stress regulation, reflection, and community sharing. Do not force unrelated labels.",
    "Before returning JSON, revise any sentence that could apply to any student. Replace generic language with project-specific actions, outputs, stakeholders, and evidence.",
    "Each slide must include at least one component with real slide content. Prefer component types such as textBlock, cardStack, processCards, metricStrip, workflow, table, note, scenarioCards, roleCards, summaryBar, outputCards, connectionCards, examplePanel, titleBlock, paragraphPanel, traitCards, and illustrationInstructions.",
    "For table-like slides, include headers and rows that are specific enough to render directly into a PPTX table.",
    "For card-like slides, include cards with title, text, chips, and bullets that can render directly into editable rounded cards.",
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
    const pptxFile = await renderPptx(parsed.proposal || {}, payload);
    return res.status(200).json({
      ...parsed,
      pptxFileName: pptxFile.fileName,
      pptxBase64: pptxFile.base64,
      pdfFileName: "",
      pdfBase64: "",
      model,
      generatedAt: payload.generatedAt,
      provider: "openai-responses"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unexpected server error" });
  }
};

module.exports = require("./generate-project-deck");
