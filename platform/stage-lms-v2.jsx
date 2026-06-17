const V2_STAGE_KEYS = [
  ["stage1", "Stage 1: 학생 분석"],
  ["stage2", "Stage 2: 전략 수립"],
  ["stage3", "Stage 3: 관리"],
  ["stage4", "Stage 4: 원서"],
  ["stage5", "Stage 5: 입학"]
];
const V2_GRADE_OPTIONS = Array.from({ length: 9 }, (_, i) => `${i + 4}학년`);
const V2_TARGET_GRADE_OPTIONS = [...V2_GRADE_OPTIONS, "대학"];
const V2_YEAR_OPTIONS = Array.from({ length: 6 }, (_, i) => String(new Date().getFullYear() + i));
const V2_PROGRAM_OPTIONS = ["주니어보딩", "시니어보딩", "보딩프렙"];
const V2_SCHOOL_TYPES = ["보딩스쿨", "국제학교 (Day School)", "외국인학교", "공립학교", "특목고/자사고", "기타"];
const V2_COUNTRIES = ["대한민국", "미국", "기타"];
const V2_LANGUAGES = ["한국어", "영어", "중국어", "일본어", "스페인어", "프랑스어", "기타"];
const V2_NATIONALITIES = ["대한민국", "미국", "캐나다", "중국", "일본", "기타"];
const V2_ADDRESS_TYPES = ["Permanent Address", "Mailing Address", "Guardian Address", "기타"];
const V2_PHONE_TYPES = ["학생 휴대폰", "학생 보조 연락처", "카카오톡", "WhatsApp", "기타"];
const V2_COUNTRY_CODES = ["+82 대한민국", "+1 미국/캐나다", "+86 중국", "+81 일본", "+44 영국", "+61 호주", "기타"];
const V2_EDUCATION_LEVELS = ["고등학교 중퇴", "고등학교 졸업", "전문대 중퇴", "전문대 졸업", "4년제 대학교 (학사) 중퇴", "4년제 대학교 (학사) 졸업", "대학원 (석사) 중퇴", "대학원 (석사) 졸업", "대학원 (박사) 중퇴", "대학원 (박사) 졸업", "기타"];
const V2_PARENT_KEYS = [["father", "아버지"], ["mother", "어머니"]];
const V2_SIBLING_COUNTS = ["0", "1", "2", "3", "4", "5+"];
const V2_TEST_FIELDS = {
  SSAT: ["Verbal", "Quantitative", "Reading", "Total", "Percentile", "Writing Sample"],
  PSAT: ["Reading and Writing", "Math", "Total", "Selection Index", "Percentile"],
  SAT: ["Reading and Writing", "Math", "Total", "Percentile"],
  ACT: ["English", "Math", "Reading", "Science", "Composite", "Writing"],
  TOEFL: ["Reading", "Listening", "Speaking", "Writing", "Total"],
  IELTS: ["Listening", "Reading", "Writing", "Speaking", "Overall"],
  DET: ["Overall", "Literacy", "Comprehension", "Conversation", "Production"]
};
const V2_EC_CATEGORIES = [
  "Athletics: Club", "Athletics: JV/Varsity", "Academic", "Art", "Club", "Community Service",
  "Computer/Technology", "Cultural", "Dance", "Debate/Speech", "Environmental", "Family Responsibilities",
  "Foreign Exchange", "Journalism/Publication", "Music: Instrumental", "Music: Vocal", "Religious",
  "Research", "Robotics", "School Spirit", "Science/Math", "Student Government/Politics",
  "Theater/Drama", "Work/Paid", "Summer Program", "Other"
];
const V2_SEASONS = ["Spring", "Summer", "Fall", "Winter", "Year-round"];
const V2_ACTIVITY_SUGGESTIONS = [
  "Soccer", "Basketball", "Tennis", "Golf", "Swimming", "Lacrosse", "Cross Country", "Skiing",
  "Debate", "Model UN", "Robotics", "Math Team", "Science Olympiad", "Student Council",
  "Orchestra", "Choir", "Theater", "Visual Arts", "School Newspaper", "Yearbook",
  "Volunteer Tutoring", "Community Service", "Research Project", "Coding Project", "Internship"
];
const V2_EMPTY_PREVIOUS = () => ({
  name: "", type: "", email: "", phone: "", counselor: "", address: "", website: "",
  startDate: "", endDate: "", gradeAttended: "", finalGrade: "", discipline: "No", withdrawal: "No", notes: ""
});
const V2_EMPTY_INTEREST = () => ({ school: "", reason: "", note: "" });
const V2_EMPTY_TERM = school => ({ school: school || "", term: "", subjects: [{ subject: "", grade: "", comment: "" }], termGpa: "" });
const V2_EMPTY_TEST = () => ({ type: "SSAT", date: "", nextDate: "", details: {}, overall: "", note: "" });
const V2_EMPTY_EC = () => ({
  cat: "Athletics: JV/Varsity", season: "Fall", name: "", team: "", from: "", to: "",
  weeks: "", hours: "", level: "", position: "", leadership: "", honors: "", impact: ""
});
const V2_EMPTY_ADDRESS = (type = "Permanent Address") => ({ type, typeOther: "", zip: "", searchQuery: "", koreanAddress: "", englishAddress: "", notes: "" });
const V2_EMPTY_PHONE = () => ({ type: "학생 휴대폰", typeOther: "", countryCode: "+82 대한민국", countryCodeOther: "", number: "", preferred: "Yes" });
const V2_EMPTY_PARENT = relation => ({
  relation,
  nameKo: "", passportName: "", dob: "", countryCode: "+82 대한민국", countryCodeOther: "", phone: "",
  occupation: "", title: "", company: "", companyAddress: "", email: "",
  educationLevel: "", highSchoolName: "", collegeName: "", bachelorDegree: "", bachelorYear: "",
  masterSchoolName: "", masterDegree: "", masterYear: "", doctoralSchoolName: "", doctoralDegree: "", doctoralYear: "",
  sameAddress: "Yes", linkedAddressType: "Permanent Address", address: ""
});
const V2_EMPTY_SIBLING = () => ({ relation: "", relationOther: "", name: "", englishName: "", dob: "", school: "", grade: "", notes: "" });

function v2BaseData() {
  const raw = typeof load === "function" ? load() : {};
  const schools = Array.isArray(raw.schools) && raw.schools.length >= 90 ? raw.schools : (window.PREP_SCHOOLS || DEFAULT_SCHOOLS || []);
  const baseStaff = accounts.filter(a => a.role === "staff").map(a => ({ ...a, password: a.password || "prep2026" }));
  const extraStaff = (raw.staffAccounts || []).filter(a => !baseStaff.some(b => b.id === a.id));
  return {
    ...raw,
    schools,
    staffAccounts: [...baseStaff, ...extraStaff],
    students: (raw.students || []).map(v2NormalizeStudent)
  };
}
function v2NormalizeStudent(s) {
  const basic = s.basic || {};
  const splitKo = String(s.name || "").trim().split(/\s+/);
  const splitEn = String(s.en || "").trim().split(/\s+/);
  const owners = s.owners || [s.owner || "aram"].filter(Boolean);
  const previous = [...(s.previousSchools || []), V2_EMPTY_PREVIOUS(), V2_EMPTY_PREVIOUS(), V2_EMPTY_PREVIOUS()].slice(0, 3);
  const interests = [...(s.interests || []).map(x => ({ ...x, reason: x.reason || x.note || "" })), V2_EMPTY_INTEREST(), V2_EMPTY_INTEREST(), V2_EMPTY_INTEREST()].slice(0, 3);
  const terms = s.academicTerms || (s.academics || []).map(a => ({ school: a.school || s.school || "", term: a.term || "", termGpa: a.gpa || "", subjects: [{ subject: "Overall", grade: a.gpa || "", comment: a.comment || "" }] }));
  const addresses = basic.addresses?.length ? basic.addresses : [
    { ...V2_EMPTY_ADDRESS("Permanent Address"), zip: basic.zip || "", searchQuery: basic.addressSearchQuery || "", koreanAddress: basic.koreanAddress || basic.address || "", englishAddress: basic.englishAddress || "" },
    V2_EMPTY_ADDRESS("Mailing Address")
  ];
  const phones = basic.phones?.length ? basic.phones : [
    { ...V2_EMPTY_PHONE(), number: basic.phone || "" }
  ];
  const parents = {
    father: { ...V2_EMPTY_PARENT("father"), ...(basic.parents?.father || {}) },
    mother: { ...V2_EMPTY_PARENT("mother"), ...(basic.parents?.mother || {}) }
  };
  if (basic.parentPhone && !parents.father.phone && !parents.mother.phone) parents.father.phone = basic.parentPhone;
  const siblingCount = basic.siblingCount || String((basic.siblings || []).length || "0");
  const siblingTarget = siblingCount === "5+" ? Math.max(5, (basic.siblings || []).length) : Number(siblingCount);
  const siblings = Array.from({ length: siblingTarget || 0 }, (_, i) => ({ ...V2_EMPTY_SIBLING(), ...((basic.siblings || [])[i] || {}) }));
  return {
    ...s,
    owners,
    owner: owners[0] || "aram",
    stage: s.stage || "stage1",
    program: s.program || "",
    currentGrade: s.currentGrade || s.grade || "",
    targetYear: s.targetYear || String(new Date().getFullYear() + 1),
    targetGrade: s.targetGrade || "",
    programEndDate: s.programEndDate || s.deadline || "",
    basic: {
      lastNameKo: basic.lastNameKo || splitKo[0] || "",
      firstNameKo: basic.firstNameKo || splitKo.slice(1).join(" ") || "",
      lastNameEn: basic.lastNameEn || splitEn.slice(-1)[0] || "",
      firstNameEn: basic.firstNameEn || splitEn.slice(0, -1).join(" ") || "",
      preferredName: basic.preferredName || "",
      birthCountry: basic.birthCountry || "",
      birthCountryOther: basic.birthCountryOther || "",
      nationalities: basic.nationalities || (basic.nationality ? [basic.nationality] : []),
      nationalityOther: basic.nationalityOther || "",
      firstLanguages: basic.firstLanguages || (basic.firstLanguage ? [basic.firstLanguage] : []),
      firstLanguageOther: basic.firstLanguageOther || "",
      homeLanguages: basic.homeLanguages || (basic.homeLanguage ? [basic.homeLanguage] : []),
      homeLanguageOther: basic.homeLanguageOther || "",
      communicationLanguages: basic.communicationLanguages || (basic.languages ? String(basic.languages).split(",").map(x => x.trim()).filter(Boolean) : []),
      communicationLanguageLevels: basic.communicationLanguageLevels || {},
      communicationLanguageOther: basic.communicationLanguageOther || "",
      socialMedia: basic.socialMedia || "",
      koreanAddress: basic.koreanAddress || basic.address || "",
      englishAddress: basic.englishAddress || "",
      addressSearchQuery: basic.addressSearchQuery || "",
      ...basic,
      addresses,
      phones,
      parents,
      siblingCount,
      siblings
    },
    currentSchoolInfo: s.currentSchoolInfo || {},
    previousSchools: previous,
    interests,
    academicTerms: terms.length ? terms : [V2_EMPTY_TERM(s.school)],
    tests: (s.tests || []).map(t => ({ ...t, details: t.details || v2ParseDetail(t.detail), type: t.type || "SSAT" })),
    ecs: (s.ecs || []).length ? s.ecs : [V2_EMPTY_EC()],
    applications: s.applications || [],
    calendarEvents: s.calendarEvents || [],
    enrollmentChecklist: s.enrollmentChecklist || [],
    stagePlans: s.stagePlans || {}
  };
}
function v2Persist(setData, next) {
  const fixed = { ...next, students: next.students.map(v2NormalizeStudent) };
  setData(fixed);
  save(fixed);
}
function v2SchoolNames(schools) { return (schools || []).map(s => s.name).filter(Boolean); }
function v2FindSchool(schools, name) { return (schools || []).find(s => s.name === name); }
function v2SchoolPatch(school) {
  if (!school) return {};
  const isBoarding = Number(school.boarding) > 0.35 || String(school.schoolGroup || "").toLowerCase().includes("boarding");
  return {
    type: school.type || (isBoarding ? "보딩스쿨" : ""),
    email: school.email || school.admissionsEmail || "",
    phone: school.phone || "",
    counselor: school.counselor || "",
    address: school.address || [school.town, school.state].filter(Boolean).join(", "),
    website: school.website || ""
  };
}
function v2ParseDetail(detail) {
  if (!detail) return {};
  return { Memo: detail };
}
function v2NamePatch(basic) {
  const name = [basic.lastNameKo, basic.firstNameKo].filter(Boolean).join(" ").trim();
  const en = [basic.firstNameEn, basic.lastNameEn].filter(Boolean).join(" ").trim();
  return { name, en };
}
function v2SetArr(arr, i, patch) { return arr.map((x, idx) => idx === i ? { ...x, ...patch } : x); }
function v2Filled(v) {
  if (Array.isArray(v)) return v.some(v2Filled);
  if (v && typeof v === "object") return Object.values(v).some(v2Filled);
  return String(v || "").trim().length > 0;
}
function v2StageCompletion(st, stage) {
  const terms = st.academicTerms || [];
  const req = {
    stage1: [st.name, st.en, st.program, st.currentGrade, st.school, st.targetYear, st.targetGrade, st.basic?.dob, st.basic?.gender, st.basic?.birthCountry, st.currentSchoolInfo?.type, terms[0]?.term, terms[0]?.subjects?.[0]?.grade, st.tests?.[0]?.overall || st.tests?.[0]?.details?.Total, st.ecs?.[0]?.name],
    stage2: [st.profile, st.testPlan, st.projectPlan, st.stagePlans?.schoolList, st.stagePlans?.ecRoadmap],
    stage3: [st.stagePlans?.weeklyPlan, st.stagePlans?.parentMeeting, st.calendarEvents?.[0]?.title],
    stage4: [st.applications?.[0]?.school, st.stagePlans?.essayThemes, st.stagePlans?.recommenders],
    stage5: [st.stagePlans?.enrollmentSchool, st.enrollmentChecklist?.[0]?.done]
  }[stage] || [];
  return Math.round(req.filter(v2Filled).length / Math.max(req.length, 1) * 100);
}
function v2GradePoint(v) {
  const s = String(v || "").trim().toUpperCase();
  if (!s) return null;
  if (!Number.isNaN(Number(s))) {
    const n = Number(s);
    return n > 5 ? Math.min(4, Math.max(0, n / 25)) : n;
  }
  const map = { "A+": 4.3, A: 4, "A-": 3.7, "B+": 3.3, B: 3, "B-": 2.7, "C+": 2.3, C: 2, "C-": 1.7, D: 1, F: 0 };
  return map[s] ?? null;
}
function v2TermGpa(term) {
  if (term.termGpa) return Number(term.termGpa);
  const pts = (term.subjects || []).map(x => v2GradePoint(x.grade)).filter(x => x !== null);
  return pts.length ? Math.round((pts.reduce((a, b) => a + b, 0) / pts.length) * 100) / 100 : null;
}
function v2CumulativeGpa(terms) {
  const pts = (terms || []).map(v2TermGpa).filter(x => x !== null && !Number.isNaN(x));
  return pts.length ? Math.round((pts.reduce((a, b) => a + b, 0) / pts.length) * 100) / 100 : "";
}
function v2TestOverall(type, details, fallback) {
  const n = k => Number(details?.[k] || 0);
  if (type === "TOEFL") return n("Reading") + n("Listening") + n("Speaking") + n("Writing") || fallback || "";
  if (type === "SAT" || type === "PSAT") return n("Reading and Writing") + n("Math") || details?.Total || fallback || "";
  if (type === "IELTS") {
    const vals = ["Listening", "Reading", "Writing", "Speaking"].map(k => Number(details?.[k])).filter(Boolean);
    return vals.length === 4 ? Math.round((vals.reduce((a, b) => a + b, 0) / 4) * 2) / 2 : details?.Overall || fallback || "";
  }
  if (type === "ACT") return details?.Composite || fallback || "";
  if (type === "DET") return details?.Overall || fallback || "";
  return details?.Total || fallback || "";
}
function v2AcademicSummary(st) {
  return (st.academicTerms || []).map(t => ({ term: t.term, school: t.school, gpa: v2TermGpa(t), comment: (t.subjects || []).map(s => `${s.subject}: ${s.comment}`).join(" / ") }));
}
function v2Num(value) {
  const n = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
function v2Round(value, digits = 2) {
  const p = 10 ** digits;
  return Math.round((Number(value) || 0) * p) / p;
}
function v2LegacyFindTest(st, pattern) {
  return (st.tests || []).find(t => pattern.test(String(t.type || ""))) || {};
}
function v2LegacyTestOverall(test) {
  return v2Num(test.overall || v2TestOverall(test.type, test.details || {}, ""));
}
function v2LegacyToeflEval(st) {
  const test = v2LegacyFindTest(st, /TOEFL|IELTS|DET/i);
  const type = String(test.type || "");
  const raw = v2LegacyTestOverall(test);
  if (!raw) return { raw: "", eval: null, label: "English Test missing", warning: "TOEFL/IELTS/DET 점수가 없어 Stage 1 English conversion을 비워두었습니다." };
  if (/TOEFL/i.test(type)) {
    const tableValue = raw >= 110 ? 95 + (raw - 110) * 0.5 : raw >= 100 ? 80 + (raw - 100) * 1.5 : raw >= 60 ? raw - 20 : raw;
    return { raw, eval: Math.max(0, Math.min(100, v2Round(tableValue, 1))), label: `TOEFL ${raw}` };
  }
  if (/IELTS/i.test(type)) return { raw, eval: Math.max(40, Math.min(100, v2Round(raw * 12, 1))), label: `IELTS ${raw}`, warning: "IELTS는 TOEFL 표 원본이 아니라 화면용 등가 추정입니다." };
  if (/DET/i.test(type)) return { raw, eval: Math.max(40, Math.min(100, v2Round((raw - 60) * 0.7 + 40, 1))), label: `DET ${raw}`, warning: "DET는 TOEFL 표 원본이 아니라 화면용 등가 추정입니다." };
  return { raw, eval: null, label: "English Test missing" };
}
function v2LegacyGpaEval(st) {
  const gpa = v2CumulativeGpa(st.academicTerms || []);
  if (gpa) return { label: `${gpa} / 4.3`, eval: Math.max(0, Math.min(100, v2Round(Number(gpa) / 4.3 * 100, 1))) };
  const text = (v2AcademicSummary(st).map(a => `${a.gpa} ${a.comment}`).join(" ") || "").toUpperCase();
  if (/A\+/.test(text)) return { label: "A+", eval: 100 };
  if (/\bA\b|DISTINCTION|우수/.test(text)) return { label: "A", eval: 95 };
  if (/B/.test(text) && /A/.test(text)) return { label: "Most A / Some B", eval: 82 };
  if (/B/.test(text)) return { label: "B", eval: 63 };
  return { label: "GPA missing", eval: null, warning: "GPA/성적표가 부족해 legacy GPA conversion을 비워두었습니다." };
}
function v2LegacyEcInputs(st) {
  const ecs = st.ecs || [];
  const joined = ecs.map(e => `${e.name || ""} ${e.position || ""} ${e.leadership || ""} ${e.impact || ""} ${e.honors || ""}`).join(" ");
  const leadershipHit = /captain|president|founder|leader|mentor|representative|회장|주장|리더|창립|대표/i.test(joined);
  const impactHits = ecs.filter(e => /award|winner|rank|regional|national|state|1위|수상|대회|전국|대표|성과|impact/i.test(`${e.impact || ""} ${e.honors || ""}`)).length;
  const years = ecs.filter(e => String(e.from || "") && String(e.to || "")).length;
  const hours = ecs.reduce((n, e) => n + v2Num(e.hours), 0);
  const sports = ecs.some(e => /athletic|sports|varsity|jv|ski|soccer|tennis|golf|swim|basketball|baseball/i.test(`${e.cat || ""} ${e.name || ""}`));
  const arts = ecs.some(e => /art|music|theater|orchestra|visual|choir|dance/i.test(`${e.cat || ""} ${e.name || ""}`));
  const ec = Math.min(5, Math.max(1, (ecs.length >= 4 ? 2.5 : ecs.length >= 2 ? 1.8 : ecs.length ? 1.2 : 0) + impactHits * 0.8 + years * 0.25 + Math.min(0.7, hours / 20)));
  const leadership = leadershipHit ? Math.min(5, 2.5 + impactHits * 0.6) : Math.min(2, ecs.length * 0.5);
  const hook = Math.min(5, (st.profile ? 1.2 : 0) + (sports ? 1.2 : 0) + (arts ? 0.8 : 0) + impactHits * 0.7 + (st.projectPlan ? 0.8 : 0));
  const warning = ecs.length <= 2 && !leadershipHit && impactHits === 0 ? "EC가 1-2개 단순 참여 중심이면 C축은 낮게 산정됩니다. 리더십/성과/기간 증빙이 필요합니다." : "";
  return { ec, leadership, hook, warning };
}
function v2LegacyStage1Score(st) {
  const ssatTest = v2LegacyFindTest(st, /SSAT/i);
  const ssatRaw = v2LegacyTestOverall(ssatTest);
  const toefl = v2LegacyToeflEval(st);
  const gpa = v2LegacyGpaEval(st);
  const warnings = [toefl.warning, gpa.warning].filter(Boolean);
  const available = [toefl.eval, gpa.eval].filter(x => x !== null && x !== undefined);
  const ssatEval = ssatRaw || (available.length ? available.reduce((a, b) => a + b, 0) / available.length : 0);
  if (!ssatRaw) warnings.push("SSAT가 없어 Python legacy engine과 같이 TOEFL/GPA 평균으로 임시 보정했습니다.");
  const english = toefl.eval ?? 0;
  const personality = st.basic?.interviewScore ? v2Num(st.basic.interviewScore) : ((st.tasks || []).filter(t => t.done).length ? 3.5 : 3);
  const boardingFit = Math.min(100, 55 + (st.weekly?.length ? 8 : 0) + (st.calendarEvents?.length ? 7 : 0) + (st.school ? 8 : 0) + (st.profile ? 10 : 0));
  const ec = v2LegacyEcInputs(st);
  if (ec.warning) warnings.push(ec.warning);
  const academicsA = ssatEval * 0.20 + (toefl.eval ?? 0) * 0.45 + (gpa.eval ?? 0) * 0.35;
  const boardingB = english * 0.30 + personality * 20 * 0.60 + boardingFit * 0.10;
  const cocurricularC = ec.ec * 20 * 0.35 + ec.leadership * 20 * 0.30 + ec.hook * 20 * 0.35;
  const weighted = (academicsA * 1.3 + boardingB * 0.7 + cocurricularC) / 3;
  return {
    ssatRaw,
    ssatEval: v2Round(ssatEval),
    toefl,
    gpa,
    personality: v2Round(personality),
    boardingFit: v2Round(boardingFit),
    ecStrength: v2Round(ec.ec),
    leadership: v2Round(ec.leadership),
    hook: v2Round(ec.hook),
    academicsA: v2Round(academicsA),
    boardingB: v2Round(boardingB),
    cocurricularC: v2Round(cocurricularC),
    simpleAverage: v2Round((academicsA + boardingB + cocurricularC) / 3),
    weighted: v2Round(weighted),
    warnings
  };
}
function v2LegacySchoolStrength(school) {
  const rank = v2Num(school.yesRank || school.avgRank || school.nicheRank || 50) || 50;
  return v2Round(95 - (rank - 1) * (15 / 23), 4);
}
function v2LegacyCategory(margin) {
  if (margin >= -6 && margin <= 6) return "Competitive Accept";
  if (margin >= -16 && margin < -6) return "Goal School (Reach)";
  if (margin >= -26 && margin < -16) return "Dream School";
  if (margin < -26) return "Extremely Unlikely Accept";
  if (margin > 6 && margin <= 12) return "Likely Accept";
  return "Safety School";
}
function v2LegacyPredictions(st, schools) {
  const score = v2LegacyStage1Score(st);
  const targetNames = (st.interests || []).map(x => x.school).filter(Boolean);
  const pool = targetNames.length ? targetNames.map(n => v2FindSchool(schools, n)).filter(Boolean) : [...(schools || [])].sort((a, b) => v2Num(a.yesRank || a.avgRank || 999) - v2Num(b.yesRank || b.avgRank || 999)).slice(0, 8);
  return pool.map(school => {
    const schoolStrength = v2LegacySchoolStrength(school);
    const toeflDetriment = Math.max(0, schoolStrength - (score.toefl.eval ?? 0));
    const gpaDetriment = Math.max(0, (schoolStrength - (score.gpa.eval ?? 0)) / 3);
    const margin = score.weighted - schoolStrength - toeflDetriment - gpaDetriment;
    return {
      school,
      schoolStrength,
      toeflDetriment: v2Round(toeflDetriment),
      gpaDetriment: v2Round(gpaDetriment),
      margin: v2Round(margin),
      category: v2LegacyCategory(margin)
    };
  });
}
function v2ClientRubrics(st) {
  const legacy = v2LegacyStage1Score(st);
  const ecNames = (st.ecs || []).map(e => e.name).filter(Boolean).slice(0, 3).join(", ");
  const comments = v2AcademicSummary(st).flatMap(a => String(a.comment || "").split("/").map(x => x.trim()).filter(Boolean));
  return [
    {
      key: "academics",
      title: "학업 준비도",
      score: legacy.academicsA,
      evidence: `성적표와 시험 데이터를 함께 보았을 때 학업 준비도는 ${legacy.academicsA}점으로 평가됩니다. SSAT는 ${legacy.ssatRaw || "아직 입력되지 않았고"}, 영어 시험은 ${legacy.toefl.label}, 성적 평가는 ${legacy.gpa.label} 기준으로 반영되었습니다.`,
      gap: legacy.academicsA >= 85 ? "현재 학업 지표는 지원서에서 강점으로 사용할 수 있습니다. 다만 상위권 학교에서는 과목별 Teacher's Comment와 최근 성적 흐름까지 함께 보여주는 것이 중요합니다." : "학업 준비도는 아직 보완 여지가 있습니다. 특히 핵심 과목 성적 흐름, SSAT/영어 시험의 세부 영역, 교사 코멘트를 함께 정리해야 학교가 학생의 학업 잠재력을 더 명확히 볼 수 있습니다."
    },
    {
      key: "english",
      title: "영어/커뮤니케이션",
      score: legacy.toefl.eval ?? 0,
      evidence: `영어 지표는 ${legacy.toefl.label} 기준으로 보았습니다. 보딩스쿨 지원에서는 점수 자체뿐 아니라 인터뷰에서 자신의 관심사와 학교 적합성을 자연스럽게 설명하는 힘이 함께 평가됩니다.`,
      gap: (legacy.toefl.eval ?? 0) >= 90 ? "영어 점수는 기본 경쟁력을 갖춘 편입니다. 이제는 인터뷰 답변의 구조, 구체적인 사례, Why School 표현을 다듬는 단계가 필요합니다." : "영어 점수와 말하기 증빙을 함께 보완해야 합니다. 시험 점수 향상과 동시에 인터뷰에서 사용할 5-6개의 핵심 경험을 영어로 정리하는 것이 좋습니다."
    },
    {
      key: "boarding",
      title: "보딩 적합도",
      score: legacy.boardingB,
      evidence: `보딩 생활 적합도는 영어 소통력, 인터뷰에서 보일 성숙도, 기숙사 생활에 필요한 자기관리 근거를 함께 반영했습니다. 현재 입력된 일정, 활동, 학생 스토리를 기준으로 ${legacy.boardingB}점입니다.`,
      gap: legacy.boardingB >= 80 ? "기숙사 생활 적응력은 긍정적으로 설명할 수 있습니다. 지원서에서는 책임감, 공동체 기여, 시간관리 사례를 구체적으로 보여주는 것이 좋습니다." : "보딩 적합도는 아직 서류에서 충분히 보이지 않을 수 있습니다. 주중 루틴, 방학 계획, 팀 활동에서의 책임감, 선생님/코치의 관찰 코멘트를 보강해야 합니다."
    },
    {
      key: "ec",
      title: "EC 깊이/다양성",
      score: legacy.cocurricularC,
      evidence: `EC 평가는 활동 개수만 보지 않고, 기간·역할·성과·스토리로 이어지는지를 보았습니다. 현재 입력된 대표 활동은 ${ecNames || "아직 충분히 정리되지 않았습니다"}이며, 이 근거로 ${legacy.cocurricularC}점입니다.`,
      gap: legacy.cocurricularC >= 80 ? "EC는 지원서에서 핵심 차별점으로 사용할 수 있습니다. 이제 활동별 성과를 숫자, 수상, 포트폴리오, 추천서 문장으로 증빙하는 작업이 필요합니다." : "EC는 단순 참여보다 리더십과 결과물이 더 필요합니다. 한두 개 활동을 깊게 발전시켜 팀 내 역할, 외부 성과, 지속 기간, 학생만의 관점을 분명히 만들어야 합니다."
    },
    {
      key: "recommendation",
      title: "추천서/근거 강도",
      score: Math.min(100, Math.max(35, legacy.boardingFit + comments.length * 4)),
      evidence: comments.length ? `성적표 코멘트와 입력된 교사 코멘트에서 ${comments.slice(0, 2).join(" / ")} 등의 근거를 확인했습니다.` : "아직 Teacher's Comment나 추천서에 사용할 구체 문장이 충분히 입력되지 않았습니다.",
      gap: comments.length >= 2 ? "추천서 소재는 어느 정도 확보되어 있습니다. 과목별로 학생의 성향이 반복적으로 드러나도록 문장 후보를 정리하면 설득력이 높아집니다." : "추천서는 합격 가능성을 끌어올리는 중요한 자료입니다. 과목 교사, 코치, 어드바이저가 학생을 어떻게 설명할 수 있는지 구체 문장과 사례를 수집해야 합니다."
    }
  ];
}
function v2RadarPoints(items, center = 150, radius = 105) {
  return items.map((item, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / items.length;
    const r = radius * Math.max(0, Math.min(100, item.value)) / 100;
    return { ...item, x: center + Math.cos(angle) * r, y: center + Math.sin(angle) * r, lx: center + Math.cos(angle) * (radius + 35), ly: center + Math.sin(angle) * (radius + 35) };
  });
}
function V2RadarChart({ st }) {
  const legacy = v2LegacyStage1Score(st);
  const items = [
    { label: "SSAT", value: legacy.ssatEval },
    { label: "English", value: legacy.toefl.eval ?? 0 },
    { label: "GPA", value: legacy.gpa.eval ?? 0 },
    { label: "Communication", value: legacy.toefl.eval ?? 0 },
    { label: "Interview", value: legacy.personality * 20 },
    { label: "Boarding Fit", value: legacy.boardingFit },
    { label: "EC Depth", value: legacy.ecStrength * 20 },
    { label: "Leadership", value: legacy.leadership * 20 },
    { label: "Hook", value: legacy.hook * 20 }
  ];
  const points = v2RadarPoints(items);
  const polygon = points.map(p => `${p.x},${p.y}`).join(" ");
  const rings = [20, 40, 60, 80, 100].map(level => v2RadarPoints(items.map(x => ({ ...x, value: level }))).map(p => `${p.x},${p.y}`).join(" "));
  return <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 18, alignItems: "center" }}>
    <svg viewBox="0 0 300 300" style={{ width: "100%", maxWidth: 360, background: "#f8fafc", border: "1px solid #d9dee8", borderRadius: 8 }}>
      {rings.map((r, i) => <polygon key={i} points={r} fill="none" stroke={i === 4 ? "#94a3b8" : "#cbd5e1"} strokeWidth={i === 4 ? 1.4 : 1} />)}
      {points.map((p, i) => <line key={i} x1="150" y1="150" x2={p.lx} y2={p.ly} stroke="#e2e8f0" />)}
      <polygon points={polygon} fill="rgba(37,99,235,.20)" stroke="#2563eb" strokeWidth="3" />
      {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#dc2626" />)}
      {points.map((p, i) => <text key={i} x={p.lx} y={p.ly} textAnchor={p.lx > 165 ? "start" : p.lx < 135 ? "end" : "middle"} dominantBaseline="middle" fontSize="10" fill="#111827">{p.label}</text>)}
      <text x="150" y="153" textAnchor="middle" fontSize="11" fill="#475569">100</text>
    </svg>
    <div>
      <h3 style={{ marginTop: 0 }}>학생 역량 방사형 분석</h3>
      <p className="small" style={{ fontSize: 13, lineHeight: 1.8 }}>이 그래프는 학생의 학업, 영어, 보딩 적합도, EC 깊이, 리더십, Hook을 한눈에 비교하기 위한 시각 자료입니다. 바깥쪽에 가까울수록 현재 지원서에서 강점으로 사용하기 좋고, 안쪽에 머무는 축은 남은 기간 동안 보완 전략을 세워야 하는 영역입니다.</p>
      <table className="table"><tbody>{items.map(x => <tr key={x.label}><th>{x.label}</th><td><div className="progress"><div style={{ width: `${Math.max(0, Math.min(100, x.value))}%` }} /></div></td><td style={{ width: 50 }}>{v2Round(x.value, 1)}</td></tr>)}</tbody></table>
    </div>
  </div>;
}
function V2ClientCategoryPill({ category }) {
  const cls = category.includes("Safety") || category.includes("Likely") ? "p-green" : category.includes("Competitive") ? "p-blue" : category.includes("Dream") || category.includes("Goal") ? "p-amber" : "p-red";
  return <span className={"pill " + cls}>{category}</span>;
}
function v2CustomerSchoolNote(prediction) {
  const c = prediction.category;
  if (c.includes("Safety") || c.includes("Likely")) return "현재 입력된 자료 기준으로는 현실적인 지원권에 들어옵니다. 다만 보딩스쿨 지원에서는 학교별 에세이와 인터뷰 완성도가 최종 결과를 크게 좌우하므로, 이 학교를 안정권으로만 보지 말고 Why School을 구체화해야 합니다.";
  if (c.includes("Competitive")) return "현재 준비도와 학교 난이도가 비교적 맞물리는 구간입니다. 합격 가능성을 높이려면 학생의 대표 활동과 추천서 근거가 학교가 원하는 학생상과 직접 연결되어야 합니다.";
  if (c.includes("Goal")) return "도전 학교입니다. 현재 점수만으로는 약간의 보완이 필요하므로 시험 세부 점수, 리더십 성과, 인터뷰 스토리를 한 단계 끌어올리는 전략이 필요합니다.";
  return "상위 도전 학교입니다. 지원 자체는 가능하지만, 현재 자료만으로는 합격 설득력이 충분하지 않을 수 있습니다. 강력한 Hook, 외부 성과, 추천서, 학교별 에세이 완성도가 반드시 필요합니다.";
}
function v2RecommendedSchools(st, schools) {
  const targetNames = new Set((st.interests || []).map(x => x.school).filter(Boolean));
  return v2LegacyPredictions({ ...st, interests: [] }, schools || [])
    .filter(p => !targetNames.has(p.school.name))
    .filter(p => /Safety|Likely|Competitive/.test(p.category))
    .sort((a, b) => b.schoolStrength - a.schoolStrength)
    .slice(0, 4);
}
function V2ClientStrategyReport({ st, schools }) {
  const reportSchools = schools || [];
  const legacy = v2LegacyStage1Score(st);
  const rubrics = v2ClientRubrics(st);
  const interestNames = (st.interests || []).map(x => x.school).filter(Boolean);
  const interestPredictions = interestNames.length ? v2LegacyPredictions(st, reportSchools) : [];
  const recommended = v2RecommendedSchools(st, window.PREP_SCHOOLS || reportSchools);
  const lowest = [...rubrics].sort((a, b) => a.score - b.score).slice(0, 2);
  return <div className="report">
    <div className="report-cover">
      <div className="brand">YES Boarding Prep</div>
      <h2>{st.name || "학생"} 학생 종합 전략 리포트</h2>
      <p>{st.school || "현재 학교 미입력"} · {st.targetYear || "지원연도 미정"} {st.targetGrade || ""} · 학생 입력 데이터와 기존 합격 분석 모델 기반</p>
    </div>
    <div className="report-body">
      <div className="section-title"><span>01</span>학생 기본 진단</div>
      <div className="grid g4">
        <Metric title="종합 준비도" val={legacy.weighted} />
        <Metric title="학업 준비도" val={legacy.academicsA} />
        <Metric title="보딩 적합도" val={legacy.boardingB} />
        <Metric title="EC/Hook" val={legacy.cocurricularC} />
      </div>
      <p style={{ lineHeight: 1.8 }}>현재 입력된 자료를 기준으로 보면 {st.name || "학생"} 학생은 <b>{legacy.weighted}점</b> 수준의 종합 준비도를 보입니다. 학업, 영어, 생활 적합도, EC/Hook을 분리해서 보면 강점과 보완점이 비교적 뚜렷하게 나타납니다. 이 점수는 합격을 보장하는 숫자가 아니라, 지원 전략을 세우기 위한 내부 분석 지표입니다.</p>
      <V2RadarChart st={st} />

      <div className="section-title"><span>02</span>Rubric 점수표와 근거</div>
      <div className="rubrics">{rubrics.map(r => <Rub key={r.key} title={r.title} val={v2Round(r.score, 1)} max={100} />)}</div>
      <table className="table" style={{ marginTop: 14 }}><tbody>{rubrics.map(r => <tr key={r.key}><th style={{ width: 150 }}>{r.title}</th><td><p style={{ margin: 0, lineHeight: 1.75 }}>{r.evidence}</p><p style={{ margin: "8px 0 0", lineHeight: 1.75 }}><b>보완 방향:</b> {r.gap}</p></td></tr>)}</tbody></table>

      <div className="section-title"><span>03</span>관심/희망학교 판정</div>
      {interestPredictions.length ? <table className="table"><thead><tr><th>학교</th><th>현재 판정</th><th>해석 및 보완 방향</th></tr></thead><tbody>{interestPredictions.map(p => <tr key={p.school.name}><td><b>{p.school.name}</b><br /><span className="small muted">Yes Rank {p.school.yesRank || "-"} · 합격률 {p.school.accept || "-"}%</span></td><td><V2ClientCategoryPill category={p.category} /></td><td style={{ lineHeight: 1.7 }}>{v2CustomerSchoolNote(p)}</td></tr>)}</tbody></table> : <p className="small">관심/희망학교가 아직 지정되지 않았습니다. 학생 상세의 관심학교 3개를 입력하면 해당 학교만 대상으로 판정이 표시됩니다.</p>}

      <div className="section-title"><span>04</span>현재 점수 기준 추천 학교 4개</div>
      <table className="table"><thead><tr><th>추천 학교</th><th>추천 구간</th><th>추천 이유</th><th>다음 액션</th></tr></thead><tbody>{recommended.map(p => <tr key={p.school.name}><td><b>{p.school.name}</b><br /><span className="small muted">{p.school.state || ""} · SSAT 기준 {p.school.ssat || "-"} · 합격률 {p.school.accept || "-"}%</span></td><td><V2ClientCategoryPill category={p.category} /></td><td style={{ lineHeight: 1.7 }}>현재 준비도에서 현실적으로 검토할 수 있는 학교입니다. {p.school.fit || "학업 적합도, 보딩 준비도, EC 깊이를 함께 검토해야 합니다."}</td><td style={{ lineHeight: 1.7 }}>{p.school.name}의 프로그램 중 학생의 Hook과 연결되는 지점을 2개 이상 찾고, 인터뷰와 에세이에서 사용할 구체 사례를 준비해 주세요.</td></tr>)}</tbody></table>

      <div className="section-title"><span>05</span>우선 보완 전략</div>
      {lowest.map((r, i) => <p key={r.key} style={{ lineHeight: 1.8 }}><b>{i + 1}. {r.title}</b><br />{r.gap}</p>)}
      <p style={{ lineHeight: 1.8 }}>남은 기간에는 모든 항목을 동시에 넓게 보완하기보다, 점수가 낮은 축을 중심으로 증빙 가능한 결과물을 만드는 것이 중요합니다. 특히 학교별 에세이와 인터뷰에서는 단순히 활동을 나열하기보다, 학생이 어떤 환경에서 성장했고 어떤 방식으로 학교 공동체에 기여할 수 있는지를 한 문장으로 정리해야 합니다.</p>
    </div>
  </div>;
}

function V2Field({ label, val, set, type = "text", list = [] }) {
  const id = "v2_" + label.replace(/\W/g, "_") + "_" + Math.random().toString(36).slice(2);
  return <div className="field"><span className="label">{label}</span><input className="input" type={type} value={val || ""} list={list.length ? id : undefined} onChange={e => set(e.target.value)} />{list.length > 0 && <datalist id={id}>{list.map(o => <option key={o} value={o} />)}</datalist>}</div>;
}
function V2Text({ label, val, set }) { return <div className="field"><span className="label">{label}</span><textarea className="textarea" value={val || ""} onChange={e => set(e.target.value)} /></div>; }
function V2Select({ label, val, set, options }) {
  const display = o => label === "Stage" ? (V2_STAGE_KEYS.find(x => x[0] === o)?.[1] || o) : o;
  return <div className="field"><span className="label">{label}</span><select className="select" value={val || ""} onChange={e => set(e.target.value)}><option value="">선택</option>{options.map(o => <option key={o} value={o}>{display(o)}</option>)}</select></div>;
}
function V2Multi({ label, values = [], set, options, otherValue = "", setOther }) {
  const toggle = o => set(values.includes(o) ? values.filter(x => x !== o) : [...values, o]);
  return <div className="field"><span className="label">{label}</span><div className="card" style={{ padding: 10, background: "#f9fafb" }}>{options.map(o => <label key={o} className="small" style={{ display: "inline-flex", alignItems: "center", gap: 5, marginRight: 12, marginBottom: 8 }}><input type="checkbox" checked={values.includes(o)} onChange={() => toggle(o)} />{o}</label>)}{values.includes("기타") && <input className="input" style={{ marginTop: 8 }} value={otherValue || ""} onChange={e => setOther(e.target.value)} placeholder="기타 직접 입력" />}</div></div>;
}
function V2OwnerPicker({ staff = [], values = [], set }) {
  const [open, setOpen] = useState(false);
  const selected = staff.filter(a => values.includes(a.id));
  const toggle = id => set(values.includes(id) ? values.filter(x => x !== id) : [...values, id]);
  return <div className="field owner-picker"><span className="label">담당자</span><button type="button" className="input owner-trigger" onClick={() => setOpen(!open)}>{selected.length ? selected.map(a => a.name).join(", ") : "담당자 선택"}</button>{open && <div className="owner-menu">{staff.map(a => <button type="button" key={a.id} className={"owner-option " + (values.includes(a.id) ? "selected" : "")} onClick={() => toggle(a.id)}><span>{values.includes(a.id) ? "✓" : ""}</span>{a.name}</button>)}</div>}</div>;
}
function V2LanguageLevelPicker({ label, values = [], levels = {}, setValues, setLevels, options }) {
  const toggle = lang => {
    const next = values.includes(lang) ? values.filter(x => x !== lang) : [...values, lang];
    const nextLevels = { ...levels };
    if (!next.includes(lang)) delete nextLevels[lang];
    if (next.includes(lang) && !nextLevels[lang]) nextLevels[lang] = "Intermediate";
    setValues(next);
    setLevels(nextLevels);
  };
  const setLevel = (lang, level) => setLevels({ ...levels, [lang]: level });
  return <div className="field"><span className="label">{label}</span><div className="language-grid">{options.map(lang => <div key={lang} className={"language-row " + (values.includes(lang) ? "selected" : "")}><button type="button" className="language-toggle" onClick={() => toggle(lang)}>{values.includes(lang) ? "✓" : "+"}</button><span>{lang}</span>{values.includes(lang) && <select className="select" value={levels[lang] || "Intermediate"} onChange={e => setLevel(lang, e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Fluent</option></select>}</div>)}</div></div>;
}
function V2AddressSearchButtons({ address }) {
  const openRoad = () => {
    const q = encodeURIComponent(address.searchQuery || address.koreanAddress || "");
    window.open(`https://www.juso.go.kr/openIndexPage.do?keyword=${q}`, "_blank");
  };
  const openEnglish = () => {
    const q = encodeURIComponent(address.koreanAddress || address.searchQuery || "");
    window.open(`https://www.jusoen.com/?query=${q}`, "_blank");
  };
  return <div className="field"><span className="label">&nbsp;</span><div className="right"><button type="button" className="btn ghost" onClick={openRoad}>도로명주소 검색</button><button type="button" className="btn ghost" onClick={openEnglish}>영문주소 변환</button></div></div>;
}
function V2AddressHelper({ basic, setBasic }) {
  const addresses = basic.addresses || [V2_EMPTY_ADDRESS("Permanent Address"), V2_EMPTY_ADDRESS("Mailing Address")];
  const phones = basic.phones || [V2_EMPTY_PHONE()];
  const editAddress = (i, patch) => setBasic("addresses", v2SetArr(addresses, i, patch));
  const editPhone = (i, patch) => setBasic("phones", v2SetArr(phones, i, patch));
  return <V2Section title="학생 주소/연락처">
    <ArrayEditor title="주소" rows={addresses} add={() => setBasic("addresses", [...addresses, V2_EMPTY_ADDRESS("기타")])} render={(a, i) => <div><div className="grid g3"><V2Select label="주소 구분" val={a.type} set={v => editAddress(i, { type: v })} options={V2_ADDRESS_TYPES} />{a.type === "기타" && <V2Field label="주소 구분 직접 입력" val={a.typeOther} set={v => editAddress(i, { typeOther: v })} />}<V2Field label="우편번호" val={a.zip} set={v => editAddress(i, { zip: v })} /><V2Field label="주소 검색어" val={a.searchQuery} set={v => editAddress(i, { searchQuery: v })} /><V2AddressSearchButtons address={a} /></div><V2Text label="한국어 주소" val={a.koreanAddress} set={v => editAddress(i, { koreanAddress: v })} /><V2Text label="영문 주소" val={a.englishAddress} set={v => editAddress(i, { englishAddress: v })} /><V2Text label="주소 메모" val={a.notes} set={v => editAddress(i, { notes: v })} /></div>} />
    <ArrayEditor title="학생 연락처" rows={phones} add={() => setBasic("phones", [...phones, V2_EMPTY_PHONE()])} render={(p, i) => <div className="grid g4"><V2Select label="연락처 구분" val={p.type} set={v => editPhone(i, { type: v })} options={V2_PHONE_TYPES} />{p.type === "기타" && <V2Field label="연락처 구분 직접 입력" val={p.typeOther} set={v => editPhone(i, { typeOther: v })} />}<V2Select label="지역/국가번호" val={p.countryCode} set={v => editPhone(i, { countryCode: v })} options={V2_COUNTRY_CODES} />{p.countryCode === "기타" && <V2Field label="국가번호 직접 입력" val={p.countryCodeOther} set={v => editPhone(i, { countryCodeOther: v })} />}<V2Field label="전화번호/ID" val={p.number} set={v => editPhone(i, { number: v })} /><V2Select label="대표 연락처" val={p.preferred} set={v => editPhone(i, { preferred: v })} options={["Yes", "No"]} /></div>} />
    <div className="grid g2"><V2Field label="학생 이메일" val={basic.email} set={v => setBasic("email", v)} /><V2Field label="학생 Social Media" val={basic.socialMedia} set={v => setBasic("socialMedia", v)} /></div>
    <p className="small muted">현재 버전은 GitHub Pages에서 동작하는 정적 프로토타입이라 주소 검색 결과를 자동으로 가져오지는 않고, 검색 서비스를 새 창으로 열어 복사 입력하는 방식입니다.</p>
  </V2Section>;
}
function V2ParentEditor({ label, parent, setParent, addresses }) {
  return <div className="card" style={{ background: "#f8fbfe", marginBottom: 12 }}><h3>{label}</h3><div className="grid g3"><V2Field label="성함" val={parent.nameKo} set={v => setParent({ nameKo: v })} /><V2Field label="영문 성함 (여권명)" val={parent.passportName} set={v => setParent({ passportName: v })} /><V2Field label="생년월일" type="date" val={parent.dob} set={v => setParent({ dob: v })} /><V2Select label="지역/국가번호" val={parent.countryCode} set={v => setParent({ countryCode: v })} options={V2_COUNTRY_CODES} />{parent.countryCode === "기타" && <V2Field label="국가번호 직접 입력" val={parent.countryCodeOther} set={v => setParent({ countryCodeOther: v })} />}<V2Field label="핸드폰 번호" val={parent.phone} set={v => setParent({ phone: v })} /><V2Field label="개인 이메일 주소" val={parent.email} set={v => setParent({ email: v })} /><V2Field label="직업" val={parent.occupation} set={v => setParent({ occupation: v })} /><V2Field label="직책" val={parent.title} set={v => setParent({ title: v })} /><V2Field label="회사명" val={parent.company} set={v => setParent({ company: v })} /></div><V2Text label="회사 주소" val={parent.companyAddress} set={v => setParent({ companyAddress: v })} /><div className="grid g3"><V2Select label="최종학력" val={parent.educationLevel} set={v => setParent({ educationLevel: v })} options={V2_EDUCATION_LEVELS} /><V2Field label="고등학교명" val={parent.highSchoolName} set={v => setParent({ highSchoolName: v })} /><V2Field label="대학교명" val={parent.collegeName} set={v => setParent({ collegeName: v })} /><V2Field label="학사 학위명" val={parent.bachelorDegree} set={v => setParent({ bachelorDegree: v })} /><V2Field label="학사 수여연도" val={parent.bachelorYear} set={v => setParent({ bachelorYear: v })} /><V2Field label="대학원 (석사) 명" val={parent.masterSchoolName} set={v => setParent({ masterSchoolName: v })} /><V2Field label="석사 학위명" val={parent.masterDegree} set={v => setParent({ masterDegree: v })} /><V2Field label="석사 수여연도" val={parent.masterYear} set={v => setParent({ masterYear: v })} /><V2Field label="대학원 (박사) 명" val={parent.doctoralSchoolName} set={v => setParent({ doctoralSchoolName: v })} /><V2Field label="박사 학위명" val={parent.doctoralDegree} set={v => setParent({ doctoralDegree: v })} /><V2Field label="박사 수여연도" val={parent.doctoralYear} set={v => setParent({ doctoralYear: v })} /></div><div className="grid g3"><V2Select label="자녀와 집주소 동일 여부" val={parent.sameAddress} set={v => setParent({ sameAddress: v })} options={["Yes", "No"]} />{parent.sameAddress === "Yes" && <V2Select label="가져올 자녀 주소" val={parent.linkedAddressType} set={v => setParent({ linkedAddressType: v })} options={(addresses || []).map(a => a.type).filter(Boolean)} />}</div>{parent.sameAddress === "No" && <V2Text label="부모 주소" val={parent.address} set={v => setParent({ address: v })} />}</div>;
}
function V2FamilySection({ basic, setBasic }) {
  const parents = basic.parents || { father: V2_EMPTY_PARENT("father"), mother: V2_EMPTY_PARENT("mother") };
  const addresses = basic.addresses || [];
  const setParent = (key, patch) => setBasic("parents", { ...parents, [key]: { ...parents[key], ...patch } });
  const count = basic.siblingCount || "0";
  const siblingLen = count === "5+" ? Math.max(5, (basic.siblings || []).length) : Number(count);
  const siblings = Array.from({ length: siblingLen || 0 }, (_, i) => ({ ...V2_EMPTY_SIBLING(), ...((basic.siblings || [])[i] || {}) }));
  const setSiblingCount = value => {
    const len = value === "5+" ? 5 : Number(value);
    setBasic({ siblingCount: value, siblings: Array.from({ length: len || 0 }, (_, i) => ({ ...V2_EMPTY_SIBLING(), ...((basic.siblings || [])[i] || {}) })) });
  };
  const editSibling = (i, patch) => setBasic("siblings", v2SetArr(siblings, i, patch));
  const gender = basic.gender || "";
  const relationOptions = gender === "남자" ? ["형", "누나", "쌍둥이", "남동생", "여동생", "기타"] : ["오빠", "언니", "쌍둥이", "남동생", "여동생", "기타"];
  return <V2Section title="가족관계">
    {V2_PARENT_KEYS.map(([key, label]) => <V2ParentEditor key={key} label={label} parent={parents[key] || V2_EMPTY_PARENT(key)} setParent={patch => setParent(key, patch)} addresses={addresses} />)}
    <div className="card" style={{ background: "#f8fbfe" }}><h3>형제관계</h3><V2Select label="형제 수" val={count} set={setSiblingCount} options={V2_SIBLING_COUNTS} />{siblings.map((s, i) => <div key={i} className="card" style={{ marginTop: 12 }}><h3>형제/자매/남매 {i + 1}</h3><div className="grid g3"><V2Select label="학생과의 관계" val={s.relation} set={v => editSibling(i, { relation: v })} options={relationOptions} />{s.relation === "기타" && <V2Field label="관계 직접 입력" val={s.relationOther} set={v => editSibling(i, { relationOther: v })} />}<V2Field label="성함" val={s.name} set={v => editSibling(i, { name: v })} /><V2Field label="영문 성함" val={s.englishName} set={v => editSibling(i, { englishName: v })} /><V2Field label="생년월일" type="date" val={s.dob} set={v => editSibling(i, { dob: v })} /><V2Field label="학교명" val={s.school} set={v => editSibling(i, { school: v })} /><V2Select label="현재 학년" val={s.grade} set={v => editSibling(i, { grade: v })} options={V2_GRADE_OPTIONS} /></div><V2Text label="메모" val={s.notes} set={v => editSibling(i, { notes: v })} /></div>)}</div>
  </V2Section>;
}
function V2SubTabs({ tabs, active, set }) {
  return <div className="tabs" style={{ marginTop: 4 }}>{tabs.map(t => <button key={t[0]} className={"tab " + (active === t[0] ? "active" : "")} onClick={() => set(t[0])}>{t[1]}</button>)}</div>;
}
function V2Section({ title, children }) {
  return <div className="card"><h3>{title}</h3>{children}</div>;
}
function V2SmartSchool({ label, val, set, schools }) {
  return <SmartSearchInput label={label} val={val} set={set} options={v2SchoolNames(schools)} />;
}

function V2App() {
  const [data, setData] = useState(v2BaseData);
  const [user, setUser] = useState(null);
  const [view, setView] = useState("dashboard");
  const [selected, setSelected] = useState(data.students[0]?.id);
  const [stage, setStage] = useState("stage1");
  const [login, setLogin] = useState({ email: "admin@yesuhak.com", password: "prep2026" });
  const users = [...accounts, ...(data.staffAccounts || [])].map(a => ({ ...a, password: a.password || "prep2026" }));
  const persist = next => v2Persist(setData, next);
  if (!user) return <Login login={login} setLogin={setLogin} onLogin={() => { const u = users.find(x => x.email === login.email && x.password === login.password); if (u) setUser(u); else alert("계정을 확인하세요."); }} />;
  const visible = user.role === "admin" ? data.students : data.students.filter(s => (s.owners || [s.owner]).includes(user.id));
  const st = data.students.find(s => s.id === selected) || visible[0];
  const updateStudent = patch => {
    if (!st) return;
    const nextPatch = typeof patch === "function" ? patch(st) : patch;
    persist({ ...data, students: data.students.map(s => s.id === st.id ? v2NormalizeStudent({ ...s, ...nextPatch, last: new Date().toISOString().slice(0, 10) }) : s) });
  };
  const updateSchools = schools => persist({ ...data, schools });
  return <div className="app"><V2Sidebar user={user} view={view} setView={setView} logout={() => setUser(null)} /><main className="main"><Header view={view} />{view === "dashboard" && <V2Dashboard students={visible} setView={setView} setSelected={setSelected} setStage={setStage} />}{view === "students" && <V2Students students={visible} user={user} add={() => { const ns = v2NormalizeStudent({ ...blankStudent(), owners: [user.role === "admin" ? "aram" : user.id], owner: user.role === "admin" ? "aram" : user.id }); persist({ ...data, students: [ns, ...data.students] }); setSelected(ns.id); setView("student"); }} setSelected={setSelected} setView={setView} setStage={setStage} />}{view === "student" && st && <V2StudentDetail st={st} update={updateStudent} schools={data.schools} staff={data.staffAccounts || []} stage={stage} setStage={setStage} />}{view === "schedule" && <Schedule students={visible} />}{view === "reports" && <V2Reports students={visible} selected={st} setSelected={setSelected} schools={data.schools} />}{view === "admin" && user.role === "admin" && <V2Admin data={data} persist={persist} updateSchools={updateSchools} setSelected={setSelected} setView={setView} />}</main></div>;
}
function V2Sidebar({ user, view, setView, logout }) {
  const items = [["dashboard", "대시보드"], ["students", "학생 관리"], ["schedule", "주중·방학 일정"], ["reports", "보고서 제작"], ["admin", "어드민"]];
  return <aside className="side"><div className="brand">YES STUDY ABROAD</div><div className="brand-title">Prep LMS</div><div className="userbox"><b>{user.name}</b><span>{user.role === "admin" ? "어드민 계정" : "담당자 계정"}</span></div>{items.filter(i => i[0] !== "admin" || user.role === "admin").map(i => <button key={i[0]} className={"navbtn " + (view === i[0] ? "active" : "")} onClick={() => setView(i[0])}>{i[1]}</button>)}<button className="navbtn" onClick={logout}>로그아웃</button></aside>;
}
function V2Dashboard({ students, setView, setSelected, setStage }) {
  return <div className="grid"><div className="grid g4"><Metric title="관리 학생" val={students.length} /><Metric title="평균 입력률" val={Math.round(students.reduce((n, s) => n + V2_STAGE_KEYS.reduce((a, [k]) => a + v2StageCompletion(s, k), 0) / 5, 0) / Math.max(students.length, 1)) + "%"} /><Metric title="Stage 1 완료" val={students.filter(s => v2StageCompletion(s, "stage1") >= 80).length} /><Metric title="원서 단계" val={students.filter(s => s.stage === "stage4").length} /></div><V2Section title="학생 Stage 현황">{students.map(s => <div className="student-row" key={s.id}><div><b>{s.name}</b><div className="small muted">{s.program || "프로그램 미정"} · {s.currentGrade || s.grade || "학년 미정"}</div></div><span>{s.school || "학교 미입력"}</span><span>{V2_STAGE_KEYS.find(x => x[0] === s.stage)?.[1]}</span><div><div className="progress"><div style={{ width: V2_STAGE_KEYS.reduce((a, [k]) => a + v2StageCompletion(s, k), 0) / 5 + "%" }} /></div></div><button className="btn ghost" onClick={() => { setSelected(s.id); setStage(s.stage || "stage1"); setView("student"); }}>상세</button></div>)}</V2Section></div>;
}
function V2Students({ students, user, add, setSelected, setView, setStage }) {
  return <div className="grid"><V2Section title="학생 관리"><p className="small muted">담당자로 지정된 학생만 표시됩니다. Admin은 모든 학생을 봅니다.</p><button className="btn primary" onClick={add}>학생 추가</button></V2Section>{students.map(s => <div className="card" key={s.id}><div className="right" style={{ justifyContent: "space-between" }}><div><h3>{s.name || "신규 학생"}</h3><p className="small muted">{s.en} · {s.program || "프로그램 미정"} · {s.school || "학교 미입력"}</p></div><button className="btn ghost" onClick={() => { setSelected(s.id); setStage(s.stage || "stage1"); setView("student"); }}>열기</button></div></div>)}</div>;
}
function V2StudentDetail({ st, update, schools, staff, stage, setStage }) {
  return <div><div className="card" style={{ marginBottom: 14 }}><div className="right" style={{ justifyContent: "space-between" }}><div><h3 style={{ marginBottom: 4 }}>{st.name || "신규 학생"} <span className="muted">{st.en}</span></h3><p className="small muted">{st.program || "프로그램 미정"} · {st.school || "학교 미입력"} · {st.targetYear || "지원연도 미정"}</p></div><span className="pill p-green">누적 GPA {v2CumulativeGpa(st.academicTerms) || "미입력"}</span></div><div className="grid g5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginTop: 12 }}>{V2_STAGE_KEYS.map(([k, label]) => <button key={k} className={"btn " + (stage === k ? "primary" : "ghost")} onClick={() => { setStage(k); update({ stage: k, status: label }); }}>{label}<br /><span className="small">{v2StageCompletion(st, k)}%</span></button>)}</div></div>{stage === "stage1" && <V2StageOne st={st} update={update} schools={schools} staff={staff} />}{stage === "stage2" && <V2StageTwo st={st} update={update} schools={schools} />}{stage === "stage3" && <V2StageThree st={st} update={update} schools={schools} />}{stage === "stage4" && <V2StageFour st={st} update={update} />}{stage === "stage5" && <V2StageFive st={st} update={update} />}</div>;
}

function V2StageOne({ st, update, schools, staff }) {
  const [sub, setSub] = useState("identity");
  const basic = st.basic || {};
  const setBasic = (k, v) => {
    const nb = typeof k === "object" ? { ...basic, ...k } : { ...basic, [k]: v };
    update({ basic: nb, ...v2NamePatch(nb) });
  };
  const tabs = [["identity", "기본 정보"], ["program", "프로그램/목표"], ["schools", "학교 정보"], ["grades", "성적표"], ["tests", "시험"], ["ecs", "EC 기본"], ["report", "기초 보고서"]];
  return <div><V2SubTabs tabs={tabs} active={sub} set={setSub} />{sub === "identity" && <V2Identity st={st} basic={basic} setBasic={setBasic} update={update} staff={staff} />}{sub === "program" && <V2Program st={st} update={update} schools={schools} />}{sub === "schools" && <V2SchoolInfo st={st} update={update} schools={schools} />}{sub === "grades" && <V2Transcript st={st} update={update} />}{sub === "tests" && <V2Tests st={st} update={update} />}{sub === "ecs" && <V2Ecs st={st} update={update} />}{sub === "report" && <V2BasicReport st={st} schools={schools} />}</div>;
}
function V2Identity({ st, basic, setBasic, update, staff }) {
  const setOwners = owners => update({ owners, owner: owners[0] || "" });
  const setCommLevels = levels => setBasic("communicationLanguageLevels", levels);
  return <div className="grid">
    <V2Section title="이름 / 생년월일 / 담당자"><div className="grid g4"><V2Field label="성" val={basic.lastNameKo} set={v => setBasic("lastNameKo", v)} /><V2Field label="이름" val={basic.firstNameKo} set={v => setBasic("firstNameKo", v)} /><V2Field label="영문 이름" val={basic.firstNameEn} set={v => setBasic("firstNameEn", v)} /><V2Field label="영문 성" val={basic.lastNameEn} set={v => setBasic("lastNameEn", v)} /><V2Field label="Preferred Name" val={basic.preferredName} set={v => setBasic("preferredName", v)} /><V2Field label="생년월일" type="date" val={basic.dob} set={v => setBasic("dob", v)} /><V2Select label="성별" val={basic.gender} set={v => setBasic("gender", v)} options={["남자", "여자", "미입력"]} /><V2OwnerPicker staff={staff} values={st.owners || []} set={setOwners} /></div></V2Section>
    <V2Section title="출생 / 국적"><div className="grid g3"><V2Field label="출생 도시" val={basic.birthCity} set={v => setBasic("birthCity", v)} /><V2Select label="출생 국가" val={basic.birthCountry} set={v => setBasic("birthCountry", v)} options={V2_COUNTRIES} />{basic.birthCountry === "기타" && <V2Field label="출생 국가 직접 입력" val={basic.birthCountryOther} set={v => setBasic("birthCountryOther", v)} />}</div><V2Multi label="국적" values={basic.nationalities || []} set={v => setBasic("nationalities", v)} options={V2_NATIONALITIES} otherValue={basic.nationalityOther} setOther={v => setBasic("nationalityOther", v)} /><div className="grid g3"><V2Select label="미국 영주권/시민권" val={basic.usStatus} set={v => setBasic("usStatus", v)} options={["없음", "영주권", "시민권", "기타"]} />{basic.usStatus === "기타" && <V2Field label="미국 체류/신분 직접 입력" val={basic.usStatusOther} set={v => setBasic("usStatusOther", v)} />}</div></V2Section>
    <V2AddressHelper basic={basic} setBasic={setBasic} />
    <V2FamilySection basic={basic} setBasic={setBasic} />
    <V2Section title="언어"><V2Multi label="모국어" values={basic.firstLanguages || []} set={v => setBasic("firstLanguages", v)} options={V2_LANGUAGES} otherValue={basic.firstLanguageOther} setOther={v => setBasic("firstLanguageOther", v)} /><V2Multi label="가정 사용 언어" values={basic.homeLanguages || []} set={v => setBasic("homeLanguages", v)} options={V2_LANGUAGES} otherValue={basic.homeLanguageOther} setOther={v => setBasic("homeLanguageOther", v)} /><V2LanguageLevelPicker label="그 외 소통 가능 언어" values={basic.communicationLanguages || []} levels={basic.communicationLanguageLevels || {}} setValues={v => setBasic("communicationLanguages", v)} setLevels={setCommLevels} options={V2_LANGUAGES} />{(basic.communicationLanguages || []).includes("기타") && <V2Field label="기타 소통 가능 언어" val={basic.communicationLanguageOther} set={v => setBasic("communicationLanguageOther", v)} />}</V2Section>
    <V2Section title="지원 조건"><div className="grid g3"><V2Select label="Financial Aid" val={basic.financialAid} set={v => setBasic("financialAid", v)} options={["Yes", "No", "미정"]} /><V2Select label="Boarding/Day 지원" val={basic.boardingDay} set={v => setBasic("boardingDay", v)} options={["Boarding", "Day", "Both"]} /></div><V2Text label="추가 필수 정보/특이사항" val={basic.requiredNotes} set={v => setBasic("requiredNotes", v)} /></V2Section>
  </div>;
}
function V2Program({ st, update, schools }) {
  return <div className="grid"><V2Section title="프로그램 / 지원 목표"><div className="grid g3"><V2Select label="소속 프로그램" val={st.program} set={v => update({ program: v })} options={V2_PROGRAM_OPTIONS} /><V2Select label="현재 학년" val={st.currentGrade} set={v => update({ currentGrade: v, grade: v })} options={V2_GRADE_OPTIONS} /><V2Select label="지원 연도" val={st.targetYear} set={v => update({ targetYear: v })} options={V2_YEAR_OPTIONS} /><V2Select label="지원 학년" val={st.targetGrade} set={v => update({ targetGrade: v })} options={V2_TARGET_GRADE_OPTIONS} /><V2Field label="프로그램 종료일" type="date" val={st.programEndDate} set={v => update({ programEndDate: v, deadline: v })} /><V2Select label="Stage" val={st.stage} set={v => update({ stage: v })} options={V2_STAGE_KEYS.map(x => x[0])} /></div></V2Section><V2InterestSchools st={st} update={update} schools={schools} /></div>;
}
function V2SchoolInfo({ st, update, schools }) {
  const [modal, setModal] = useState(null);
  const current = st.currentSchoolInfo || {};
  const prev = st.previousSchools || [V2_EMPTY_PREVIOUS(), V2_EMPTY_PREVIOUS(), V2_EMPTY_PREVIOUS()];
  React.useEffect(() => {
    const school = v2FindSchool(schools, st.school);
    const patch = v2SchoolPatch(school);
    const shouldFill = school && Object.values(patch).some(Boolean) && ["type", "email", "phone", "counselor", "address", "website"].some(k => !current[k] && patch[k]);
    if (shouldFill) {
      const filled = { ...current, name: st.school };
      Object.entries(patch).forEach(([k, v]) => { if (!filled[k] && v) filled[k] = v; });
      update({ currentSchoolInfo: filled });
    }
  }, [st.id, st.school]);
  const setCurrentSchool = name => {
    const school = v2FindSchool(schools, name);
    update({ school: name, currentSchoolInfo: { ...current, name, ...v2SchoolPatch(school) } });
  };
  const setCurrentInfo = patch => update({ currentSchoolInfo: { ...current, ...patch } });
  const setPrev = (i, patch) => update({ previousSchools: v2SetArr(prev, i, patch) });
  const selectPrev = (i, name) => {
    const school = v2FindSchool(schools, name);
    setPrev(i, { name, ...v2SchoolPatch(school) });
  };
  const saveCustom = custom => {
    if (modal === "current") {
      update({ school: custom.name, currentSchoolInfo: custom });
    } else if (typeof modal === "number") {
      setPrev(modal, custom);
    }
    setModal(null);
  };
  return <div className="grid"><V2CustomSchoolModal open={modal !== null} onClose={() => setModal(null)} onSave={saveCustom} /><V2Section title="현재 학교"><div className="grid g3"><V2SmartSchool label="현재 학교" val={st.school} set={setCurrentSchool} schools={schools} /><div className="field"><span className="label">&nbsp;</span><button className="btn ghost" onClick={() => setModal("current")}>직접 입력</button></div><V2Select label="학교 구분" val={current.type} set={v => setCurrentInfo({ type: v })} options={V2_SCHOOL_TYPES} /><V2Field label="학교 이메일" val={current.email} set={v => setCurrentInfo({ email: v })} /><V2Field label="학교 전화번호" val={current.phone} set={v => setCurrentInfo({ phone: v })} /><V2Field label="교장/카운슬러" val={current.counselor} set={v => setCurrentInfo({ counselor: v })} /><V2Field label="재학 시작일" type="date" val={current.startDate} set={v => setCurrentInfo({ startDate: v })} /><V2Field label="재학 종료일" type="date" val={current.endDate} set={v => setCurrentInfo({ endDate: v })} /><V2Field label="Website" val={current.website} set={v => setCurrentInfo({ website: v })} /></div><V2Text label="현재 학교 주소" val={current.address} set={v => setCurrentInfo({ address: v })} /></V2Section><V2Section title="이전 학교">{prev.map((p, i) => <div key={i} className="card" style={{ marginBottom: 12, background: "#f9fafb" }}><h3>이전 학교 {i + 1}</h3><div className="grid g3"><V2SmartSchool label={`이전 학교 ${i + 1}`} val={p.name} set={v => selectPrev(i, v)} schools={schools} /><div className="field"><span className="label">&nbsp;</span><button className="btn ghost" onClick={() => setModal(i)}>직접 입력</button></div><V2Select label="학교 구분" val={p.type} set={v => setPrev(i, { type: v })} options={V2_SCHOOL_TYPES} /><V2Field label="학교 이메일" val={p.email} set={v => setPrev(i, { email: v })} /><V2Field label="학교 전화번호" val={p.phone} set={v => setPrev(i, { phone: v })} /><V2Field label="교장/카운슬러" val={p.counselor} set={v => setPrev(i, { counselor: v })} /><V2Field label="재학 시작일" type="date" val={p.startDate} set={v => setPrev(i, { startDate: v })} /><V2Field label="재학 종료일" type="date" val={p.endDate} set={v => setPrev(i, { endDate: v })} /><V2Field label="재학 학년" val={p.gradeAttended} set={v => setPrev(i, { gradeAttended: v })} /><V2Select label="징계/정학" val={p.discipline} set={v => setPrev(i, { discipline: v })} options={["No", "Yes"]} /><V2Select label="비건강 사유 자퇴" val={p.withdrawal} set={v => setPrev(i, { withdrawal: v })} options={["No", "Yes"]} /></div><V2Text label="학교 주소" val={p.address} set={v => setPrev(i, { address: v })} /><V2Text label="설명/메모" val={p.notes} set={v => setPrev(i, { notes: v })} /></div>)}</V2Section></div>;
}
function V2CustomSchoolModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(V2_EMPTY_PREVIOUS());
  if (!open) return null;
  const set = (k, v) => setForm({ ...form, [k]: v });
  return <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.35)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}><div className="card" style={{ maxWidth: 760, width: "100%" }}><div className="right" style={{ justifyContent: "space-between" }}><h3>학교 직접 입력</h3><button className="btn ghost" onClick={onClose}>닫기</button></div><div className="grid g3"><V2Field label="학교명" val={form.name} set={v => set("name", v)} /><V2Select label="학교 구분" val={form.type} set={v => set("type", v)} options={V2_SCHOOL_TYPES} /><V2Field label="Website" val={form.website} set={v => set("website", v)} /><V2Field label="학교 이메일" val={form.email} set={v => set("email", v)} /><V2Field label="학교 전화번호" val={form.phone} set={v => set("phone", v)} /><V2Field label="교장/카운슬러" val={form.counselor} set={v => set("counselor", v)} /></div><V2Text label="학교 주소" val={form.address} set={v => set("address", v)} /><button className="btn primary" onClick={() => onSave(form)}>저장</button></div></div>;
}
function V2InterestSchools({ st, update, schools }) {
  const interests = st.interests || [V2_EMPTY_INTEREST(), V2_EMPTY_INTEREST(), V2_EMPTY_INTEREST()];
  const set = (i, patch) => update({ interests: v2SetArr(interests, i, patch) });
  return <V2Section title="관심 학교">{interests.map((x, i) => <div className="grid g2" key={i}><V2SmartSchool label={`관심 학교 ${i + 1}`} val={x.school} set={v => set(i, { school: v })} schools={schools} /><V2Text label="이유" val={x.reason || x.note} set={v => set(i, { reason: v, note: v })} /></div>)}</V2Section>;
}
function V2Transcript({ st, update }) {
  const terms = st.academicTerms || [V2_EMPTY_TERM(st.school)];
  const schoolOptions = [st.school, ...(st.previousSchools || []).map(s => s.name)].filter(Boolean);
  const saveTerms = next => update({ academicTerms: next, academics: next.map(t => ({ school: t.school, term: t.term, gpa: v2TermGpa(t) || "", comment: (t.subjects || []).map(s => `${s.subject}: ${s.comment}`).join(" / ") })) });
  const editTerm = (i, patch) => saveTerms(v2SetArr(terms, i, patch));
  const editSubject = (ti, si, patch) => editTerm(ti, { subjects: v2SetArr(terms[ti].subjects || [], si, patch) });
  return <div className="grid"><V2Section title="GPA 요약"><div className="grid g3"><Metric title="누적 GPA" val={v2CumulativeGpa(terms) || "미입력"} /><Metric title="입력 학기" val={terms.length} /><Metric title="최근 학기 GPA" val={v2TermGpa(terms[terms.length - 1]) || "미입력"} /></div><V2GpaChart terms={terms} /></V2Section><ArrayEditor title="성적표 / Teacher's Comment" rows={terms} add={() => saveTerms([...terms, V2_EMPTY_TERM(st.school)])} render={(t, ti) => <div><div className="grid g4"><V2Field label="학교" val={t.school} set={v => editTerm(ti, { school: v })} list={schoolOptions} /><V2Field label="학기" val={t.term} set={v => editTerm(ti, { term: v })} list={["2025 Fall", "2026 Spring", "2026 Fall", "2027 Spring"]} /><V2Field label="학기별 GPA 직접 입력" val={t.termGpa} set={v => editTerm(ti, { termGpa: v })} /><div className="field"><span className="label">계산 GPA</span><div className="input">{v2TermGpa(t) || "미입력"}</div></div></div><table className="table"><thead><tr><th>과목</th><th>성적</th><th>Teacher's Comment</th><th></th></tr></thead><tbody>{(t.subjects || []).map((s, si) => <tr key={si}><td><input className="input" value={s.subject || ""} onChange={e => editSubject(ti, si, { subject: e.target.value })} /></td><td><input className="input" value={s.grade || ""} onChange={e => editSubject(ti, si, { grade: e.target.value })} /></td><td><textarea className="textarea" value={s.comment || ""} onChange={e => editSubject(ti, si, { comment: e.target.value })} /></td><td><button className="btn ghost" onClick={() => editTerm(ti, { subjects: (t.subjects || []).filter((_, x) => x !== si) })}>삭제</button></td></tr>)}</tbody></table><button className="btn ghost" onClick={() => editTerm(ti, { subjects: [...(t.subjects || []), { subject: "", grade: "", comment: "" }] })}>과목 추가</button></div>} /></div>;
}
function V2GpaChart({ terms }) {
  const vals = (terms || []).map(t => ({ label: t.term || "학기", gpa: v2TermGpa(t) })).filter(x => x.gpa !== null && !Number.isNaN(x.gpa));
  if (!vals.length) return <p className="small muted">성적을 입력하면 GPA 변화 그래프가 표시됩니다.</p>;
  return <div style={{ display: "grid", gridTemplateColumns: `repeat(${vals.length}, 1fr)`, gap: 10, alignItems: "end", height: 170, marginTop: 14 }}>{vals.map(v => <div key={v.label} style={{ textAlign: "center" }}><div style={{ height: Math.max(8, v.gpa / 4.3 * 120), background: "#2563eb", borderRadius: "6px 6px 0 0" }}></div><b className="small">{v.gpa}</b><div className="small muted">{v.label}</div></div>)}</div>;
}
function V2Tests({ st, update }) {
  const tests = st.tests || [];
  const edit = (i, patch) => update({ tests: v2SetArr(tests, i, patch) });
  return <ArrayEditor title="Standardized / English Tests" rows={tests} add={() => update({ tests: [...tests, V2_EMPTY_TEST()] })} render={(r, i) => {
    const fields = V2_TEST_FIELDS[r.type] || [];
    const details = r.details || {};
    const setDetail = (k, v) => {
      const nextDetails = { ...details, [k]: v };
      edit(i, { details: nextDetails, overall: v2TestOverall(r.type, nextDetails, r.overall) });
    };
    return <div><div className="grid g4"><V2Select label="시험 종류" val={r.type} set={v => edit(i, { type: v, details: {}, overall: "" })} options={Object.keys(V2_TEST_FIELDS)} /><V2Field label="응시일" type="date" val={r.date} set={v => edit(i, { date: v })} /><V2Field label="다음 시험일" type="date" val={r.nextDate} set={v => edit(i, { nextDate: v })} /><V2Field label="총점/Overall" val={r.overall || v2TestOverall(r.type, details, "")} set={v => edit(i, { overall: v })} /></div><div className="grid g4">{fields.map(f => <V2Field key={f} label={f} val={details[f]} set={v => setDetail(f, v)} />)}</div><V2Text label="세부 코멘트 / 리포트 메모" val={r.note || r.detail} set={v => edit(i, { note: v, detail: v })} /></div>;
  }} />;
}
function V2Ecs({ st, update }) {
  const ecs = st.ecs || [];
  const edit = (i, patch) => update({ ecs: v2SetArr(ecs, i, patch) });
  return <ArrayEditor title="EC 활동" rows={ecs} add={() => update({ ecs: [...ecs, V2_EMPTY_EC()] })} render={(r, i) => <div><div className="grid g4"><V2Field label="활동 분류" val={r.cat} set={v => edit(i, { cat: v })} list={V2_EC_CATEGORIES} /><V2Field label="시즌" val={r.season} set={v => edit(i, { season: v })} list={V2_SEASONS} /><V2Field label="활동명/종목" val={r.name} set={v => edit(i, { name: v })} list={V2_ACTIVITY_SUGGESTIONS} /><V2Field label="팀/클럽/기관명" val={r.team} set={v => edit(i, { team: v })} /><MonthField label="시작" val={r.from} set={v => edit(i, { from: v })} /><MonthField label="종료" val={r.to} set={v => edit(i, { to: v })} /><V2Field label="참여 주 수" val={r.weeks} set={v => edit(i, { weeks: v })} type="number" /><V2Field label="주당 시간" val={r.hours} set={v => edit(i, { hours: v })} type="number" /><V2Field label="레벨" val={r.level} set={v => edit(i, { level: v })} list={["Beginner", "Intermediate", "Advanced", "JV", "Varsity", "Regional", "National"]} /><V2Field label="포지션/역할" val={r.position} set={v => edit(i, { position: v })} list={["Member", "Captain", "Founder", "President", "Lead", "Mentor", "Representative"]} /></div><div className="grid g2"><V2Text label="리더십 / 책임" val={r.leadership} set={v => edit(i, { leadership: v })} /><V2Text label="성과 / 임팩트 / 원서 스토리" val={r.impact} set={v => edit(i, { impact: v })} /><V2Text label="수상 / 포트폴리오 / 증빙" val={r.honors} set={v => edit(i, { honors: v })} /></div></div>} />;
}
function V2BasicReport({ st, schools }) {
  const recs = (st.interests || []).map(x => x.school).filter(Boolean).map(name => v2FindSchool(schools, name)).filter(Boolean);
  const reportSchools = recs.length ? recs : schools;
  return <V2ClientStrategyReport st={{ ...st, academics: v2AcademicSummary(st) }} schools={reportSchools} />;
}
function V2StageTwo({ st, update, schools }) {
  const [sub, setSub] = useState("profile");
  const plan = st.stagePlans || {};
  const setPlan = patch => update({ stagePlans: { ...plan, ...patch } });
  return <div><V2SubTabs tabs={[["profile", "학생 포지셔닝"], ["ec", "EC 로드맵"], ["schools", "학교 리스트"], ["report", "전략 보고서"]]} active={sub} set={setSub} />{sub === "profile" && <V2Section title="지원 전략 핵심"><V2Text label="학생 Hook / Story Angle" val={st.profile} set={v => update({ profile: v })} /><V2Text label="학업 보완 전략" val={st.tutoring} set={v => update({ tutoring: v })} /><V2Text label="시험 전략" val={st.testPlan} set={v => update({ testPlan: v })} /></V2Section>}{sub === "ec" && <V2Section title="지원시기까지의 EC Planning"><V2Text label="EC 로드맵" val={plan.ecRoadmap} set={v => setPlan({ ecRoadmap: v })} /><CmsRoadmap st={st} update={update} /></V2Section>}{sub === "schools" && <V2Section title="학교 리스트 / Rubric 기반 Fit"><V2Text label="학교 리스트 전략" val={plan.schoolList} set={v => setPlan({ schoolList: v })} /><EnhancedStrategy st={st} update={update} schools={schools} /></V2Section>}{sub === "report" && <V2ClientStrategyReport st={st} schools={schools} />}</div>;
}
function V2StageThree({ st, update, schools }) {
  const [sub, setSub] = useState("actions");
  const plan = st.stagePlans || {};
  const setPlan = patch => update({ stagePlans: { ...plan, ...patch } });
  const importSchoolCalendar = () => {
    const names = [st.school, ...(st.interests || []).map(x => x.school)].filter(Boolean);
    const events = names.flatMap(name => (v2FindSchool(schools, name)?.calendar || []).map(e => ({ ...e, title: `${name}: ${e.title}`, source: "school-copy" })));
    update({ calendarEvents: [...(st.calendarEvents || []), ...events] });
  };
  return <div><V2SubTabs tabs={[["actions", "액션 플랜"], ["calendar", "캘린더"], ["meetings", "미팅/커뮤니케이션"]]} active={sub} set={setSub} />{sub === "actions" && <V2Section title="Stage 2 전략 실행 관리"><V2Text label="주간 액션 플랜" val={plan.weeklyPlan} set={v => setPlan({ weeklyPlan: v })} /><EnhancedRoadmap st={st} update={update} schools={schools} /></V2Section>}{sub === "calendar" && <div className="grid"><V2Section title="학교 기본 일정 가져오기"><button className="btn primary" onClick={importSchoolCalendar}>학교 학사일정 복사</button><p className="small muted">복사된 일정은 이 학생 캘린더에서만 수정/삭제됩니다.</p></V2Section><StudentCalendar st={st} update={update} schools={schools} /></div>}{sub === "meetings" && <V2Section title="학부모/학생 미팅"><V2Text label="학부모 미팅 기록" val={plan.parentMeeting} set={v => setPlan({ parentMeeting: v })} /><V2Text label="학생 코칭 기록" val={plan.studentCoaching} set={v => setPlan({ studentCoaching: v })} /></V2Section>}</div>;
}
function V2StageFour({ st, update }) {
  const [sub, setSub] = useState("tracker");
  const plan = st.stagePlans || {};
  const setPlan = patch => update({ stagePlans: { ...plan, ...patch } });
  const makeCore = () => update({ applications: (st.ecs || []).slice(0, 5).map(e => ({ school: "", activity: e.name, role: e.position, description: e.impact })) });
  return <div><V2SubTabs tabs={[["tracker", "Application Tracker"], ["essays", "에세이"], ["activities", "핵심 액티비티"], ["recommendations", "추천서/계정"]]} active={sub} set={setSub} />{sub === "tracker" && <ArrayEditor title="지원학교 리스트 / 원서 현황" rows={st.applications || []} add={() => update({ applications: [...(st.applications || []), { school: "", portal: "", deadline: "", status: "", essay: "", activity: "" }] })} render={(r, i) => <div className="grid g4"><V2Field label="학교" val={r.school} set={v => editArr(st, update, "applications", i, { school: v })} /><V2Field label="원서 계정/Portal" val={r.portal} set={v => editArr(st, update, "applications", i, { portal: v })} /><V2Field label="마감일" type="date" val={r.deadline} set={v => editArr(st, update, "applications", i, { deadline: v })} /><V2Field label="상태" val={r.status} set={v => editArr(st, update, "applications", i, { status: v })} list={["Not Started", "In Progress", "Submitted", "Interview", "Accepted", "Waitlisted", "Denied"]} /></div>} />}{sub === "essays" && <V2Section title="학교별 에세이 주제"><V2Text label="에세이 주제 / 소재 매칭" val={plan.essayThemes} set={v => setPlan({ essayThemes: v })} /></V2Section>}{sub === "activities" && <V2Section title="원서용 핵심 액티비티 5개"><button className="btn primary" onClick={makeCore}>EC 데이터로 5개 생성</button><table className="table"><tbody>{(st.applications || []).slice(0, 5).map((a, i) => <tr key={i}><th>{i + 1}</th><td>{a.activity || a.school}<br /><span className="small muted">{a.description}</span></td></tr>)}</tbody></table></V2Section>}{sub === "recommendations" && <V2Section title="추천서 / 원서 계정"><V2Text label="추천인 / 추천서 요청 현황" val={plan.recommenders} set={v => setPlan({ recommenders: v })} /><V2Text label="원서 계정 / 로그인 / 제출 유의사항" val={plan.applicationAccounts} set={v => setPlan({ applicationAccounts: v })} /></V2Section>}</div>;
}
function V2StageFive({ st, update }) {
  const [sub, setSub] = useState("checklist");
  const plan = st.stagePlans || {};
  const setPlan = patch => update({ stagePlans: { ...plan, ...patch } });
  const items = st.enrollmentChecklist?.length ? st.enrollmentChecklist : ["I-20/비자 서류", "SEVIS 납부", "비자 인터뷰", "수강신청", "보험 가입", "건강/예방접종 서류", "기숙사/룸메이트", "항공권/이동", "학비 납부", "입학 전 오리엔테이션"].map(text => ({ text, done: false, note: "" }));
  const edit = (i, patch) => update({ enrollmentChecklist: v2SetArr(items, i, patch) });
  return <div><V2SubTabs tabs={[["checklist", "입학 체크리스트"], ["school", "최종 학교"], ["arrival", "출국/정착"]]} active={sub} set={setSub} />{sub === "checklist" && <V2Section title="입학까지 해야 할 일"><table className="table"><tbody>{items.map((x, i) => <tr key={i}><td><input type="checkbox" checked={!!x.done} onChange={e => edit(i, { done: e.target.checked })} /></td><td>{x.text}</td><td><input className="input" value={x.note || ""} onChange={e => edit(i, { note: e.target.value })} /></td></tr>)}</tbody></table></V2Section>}{sub === "school" && <V2Section title="최종 진학 학교"><V2Field label="최종 학교" val={plan.enrollmentSchool} set={v => setPlan({ enrollmentSchool: v })} /><V2Text label="입학 조건 / 추가 서류" val={plan.enrollmentNotes} set={v => setPlan({ enrollmentNotes: v })} /></V2Section>}{sub === "arrival" && <V2Section title="출국 / 정착 관리"><V2Text label="출국 준비 / 도착 후 해야 할 일" val={plan.arrivalPlan} set={v => setPlan({ arrivalPlan: v })} /></V2Section>}</div>;
}
function V2Reports({ students, selected, setSelected, schools }) {
  const st = selected || students[0];
  return <div><div className="card" style={{ marginBottom: 14 }}><span className="label">보고서 학생 선택</span><select className="select" value={st?.id || ""} onChange={e => setSelected(e.target.value)}>{students.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}</select></div>{st && <V2BasicReport st={st} schools={schools} />}</div>;
}
function V2Admin({ data, persist, updateSchools, setSelected, setView }) {
  const [tab, setTab] = useState("staff");
  const staff = data.staffAccounts || [];
  const editStaff = (i, patch) => persist({ ...data, staffAccounts: v2SetArr(staff, i, patch) });
  const addStaff = () => persist({ ...data, staffAccounts: [...staff, { id: "staff" + Date.now(), name: "새 담당자", role: "staff", email: "new@yesuhak.com", password: "prep2026" }] });
  return <div><V2SubTabs tabs={[["staff", "담당자 관리"], ["schools", "학교 데이터"], ["students", "학생 현황"]]} active={tab} set={setTab} />{tab === "staff" && <V2Section title="담당자 계정"><button className="btn primary" onClick={addStaff}>담당자 추가</button><table className="table"><thead><tr><th>이름</th><th>Email</th><th>Password</th><th>ID</th></tr></thead><tbody>{staff.map((a, i) => <tr key={a.id}><td><input className="input" value={a.name || ""} onChange={e => editStaff(i, { name: e.target.value })} /></td><td><input className="input" value={a.email || ""} onChange={e => editStaff(i, { email: e.target.value })} /></td><td><input className="input" value={a.password || ""} onChange={e => editStaff(i, { password: e.target.value })} /></td><td>{a.id}</td></tr>)}</tbody></table></V2Section>}{tab === "schools" && <FinalAdmin data={data} updateSchools={updateSchools} setSelected={setSelected} setView={setView} />}{tab === "students" && <V2Dashboard students={data.students || []} setView={setView} setSelected={setSelected} setStage={() => {}} />}</div>;
}

ReactDOM.render(<V2App />, document.getElementById("root"));
