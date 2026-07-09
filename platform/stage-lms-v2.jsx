const V2_STAGE_KEYS = [
  ["stage1", "Stage 1: 학생 분석"],
  ["stage2", "Stage 2: 전략 수립"],
  ["stage3", "Stage 3: 관리"],
  ["stage4", "Stage 4: 원서"],
  ["stage5", "Stage 5: 입학"]
];
const V2_GRADE_OPTIONS = Array.from({ length: 12 }, (_, i) => `${i + 1}학년`);
const V2_SIBLING_GRADE_OPTIONS = [...V2_GRADE_OPTIONS, "졸업"];
const V2_TARGET_GRADE_OPTIONS = [...V2_GRADE_OPTIONS, "대학"];
const V2_YEAR_OPTIONS = Array.from({ length: 6 }, (_, i) => String(new Date().getFullYear() + i));
const V2_PROGRAM_OPTIONS = ["주니어보딩", "시니어보딩", "보딩프렙"];
const V2_SCHOOL_TYPES = ["보딩스쿨", "국제학교 (Day School)", "외국인학교", "공립학교", "특목고/자사고", "온라인 스쿨", "홈스쿨링", "기타"];
const V2_COUNTRIES = ["대한민국", "미국", "기타"];
const V2_LANGUAGES = ["한국어", "영어", "중국어", "일본어", "스페인어", "프랑스어", "기타"];
const V2_NATIONALITIES = ["대한민국", "미국", "캐나다", "중국", "일본", "기타"];
const V2_ADDRESS_TYPES = ["Permanent Address", "Mailing Address", "Guardian Address", "기타"];
const V2_PHONE_TYPES = ["학생 휴대폰", "학생 보조 연락처", "카카오톡", "WhatsApp", "Instagram", "Facebook", "기타"];
const V2_COUNTRY_CODES = ["+82 대한민국", "+1 미국/캐나다", "+86 중국", "+81 일본", "+44 영국", "+61 호주", "기타"];
const V2_EDUCATION_LEVELS = ["고등학교 중퇴", "고등학교 졸업", "전문대 중퇴", "전문대 졸업", "4년제 대학교 (학사) 중퇴", "4년제 대학교 (학사) 졸업", "대학원 (석사) 중퇴", "대학원 (석사) 졸업", "대학원 (박사) 중퇴", "대학원 (박사) 졸업", "기타"];
const V2_PARENT_KEYS = [["father", "아버지"], ["mother", "어머니"]];
const V2_SIBLING_COUNTS = ["0", "1", "2", "3", "4", "5+"];
const V2_FAMILY_RECIPIENT_OPTIONS = ["부모", "아버지", "어머니", "기타"];
const V2_RELIGION_OPTIONS = ["No religion / 무교", "Catholic / 천주교", "Protestant / 개신교", "Orthodox Christian / 정교회", "Other Christian / 기타 기독교", "Buddhist / 불교", "Jewish / 유대교", "Muslim / 이슬람교", "Hindu / 힌두교", "Sikh / 시크교", "Other / 기타", "Prefer not to answer / 답변하지 않음"];
const V2_LEGACY_ANSWERS = ["No", "Yes", "Prefer not to answer"];
const V2_LEGACY_RELATIONSHIPS = [
  "Parent attended the school / 부모가 해당 학교 졸업 또는 재학",
  "Grandparent attended the school / 조부모가 해당 학교 졸업 또는 재학",
  "Sibling currently attends the school / 형제자매가 현재 재학 중",
  "Sibling graduated from the school / 형제자매가 해당 학교 졸업",
  "Aunt or uncle attended the school / 이모·고모·삼촌·외삼촌 등 친척이 해당 학교 졸업 또는 재학",
  "Cousin attended the school / 사촌이 해당 학교 졸업 또는 재학",
  "Other family connection / 기타 가족 관계"
];
const V2_LEGACY_STRENGTHS = [
  "Strong / 강함: 동문 활동, 기부, 학교 행사 참여 등 현재 연결이 뚜렷함",
  "Moderate / 보통: 졸업 또는 재학 이력은 있으나 현재 활동은 제한적임",
  "Weak / 약함: 관계는 있으나 오래되었거나 실질적 연결이 약함",
  "Unknown / 불명확: 관계는 있으나 구체적인 확인 정보가 부족함"
];
const V2_TRANSCRIPT_YEARS = Array.from({ length: 8 }, (_, i) => String(new Date().getFullYear() - 5 + i));
const V2_TERM_SEASONS = ["Spring", "Summer", "Fall", "Winter"];
const V2_TERM_SORT_ORDER = { Spring: 4, Summer: 3, Fall: 2, Winter: 1 };
const V2_SUBJECT_CATEGORIES = ["English", "Math", "Science", "Social Sciences", "Arts", "Health", "World Languages", "Electives"];
const V2_LETTER_GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F", "P", "미입력"];
const V2_GRADING_SCALE_TYPES = ["Letter Grade", "Letter Grade with Plus/Minus", "100-Point Percentage", "4.0 GPA Scale", "4.3 GPA Scale", "4.5 GPA Scale", "5.0 GPA Scale", "1-7 Scale", "1-6 Scale", "1-5 Scale", "IB 1-7 Scale", "AP 1-5 Scale", "A-Level / IGCSE Letter Scale", "Korean Middle School Achievement Scale", "Korean High School 9-Rank Scale", "Pass / Fail", "Custom Scale", "Unknown"];
const V2_GRADE_INPUT_TYPES = ["Letter Grade", "Letter Grade with Plus/Minus", "100-Point Percentage", "1-7 Scale", "1-6 Scale", "1-5 Scale", "IB 1-7 Scale", "AP 1-5 Scale", "A-Level / IGCSE Letter Scale", "Korean Middle School Achievement Scale", "Korean High School 9-Rank Scale", "Pass / Fail", "Custom Scale", "Unknown"];
const V2_GPA_SCALE_TYPES = ["Not provided / Not used", "4.0 GPA Scale", "4.3 GPA Scale", "4.5 GPA Scale", "5.0 GPA Scale", "Other"];
const V2_GPA_SCALE_TYPE_SET = new Set(["4.0 GPA Scale", "4.3 GPA Scale", "4.5 GPA Scale", "5.0 GPA Scale"]);
const V2_GRADING_SCALE_SOURCES = ["Official school transcript legend", "School profile", "School website", "Counselor-provided information", "Manually entered by admin", "Unknown"];
const V2_GRADING_SCALE_CONFIDENCE = ["High", "Medium", "Low", "Unknown"];
const V2_GRADING_SCALE_TEMPLATES = {
  "Letter Grade": [["A", 95], ["B", 85], ["C", 75], ["D", 65], ["F", 50]],
  "Letter Grade with Plus/Minus": [["A+", 98], ["A", 95], ["A-", 92], ["B+", 88], ["B", 85], ["B-", 82], ["C+", 78], ["C", 75], ["C-", 72], ["D+", 68], ["D", 65], ["D-", 62], ["F", 50]],
  "1-7 Scale": [["7", 98], ["6", 92], ["5", 85], ["4", 75], ["3", 65], ["2", 55], ["1", 45]],
  "IB 1-7 Scale": [["7", 98], ["6", 92], ["5", 85], ["4", 75], ["3", 65], ["2", 55], ["1", 45]],
  "AP 1-5 Scale": [["5", 98], ["4", 90], ["3", 80], ["2", 65], ["1", 50]],
  "1-5 Scale": [["5", 95], ["4", 85], ["3", 75], ["2", 65], ["1", 50]],
  "1-6 Scale": [["6", 96], ["5", 88], ["4", 80], ["3", 70], ["2", 60], ["1", 50]],
  "A-Level / IGCSE Letter Scale": [["A*", 98], ["A", 95], ["B", 88], ["C", 80], ["D", 70], ["E", 60], ["U", 50]],
  "Korean Middle School Achievement Scale": [["A", 95], ["B", 85], ["C", 75], ["D", 65], ["E", 55]],
  "Korean High School 9-Rank Scale": [["Rank 1", 98], ["Rank 2", 94], ["Rank 3", 88], ["Rank 4", 82], ["Rank 5", 75], ["Rank 6", 68], ["Rank 7", 60], ["Rank 8", 55], ["Rank 9", 50]],
  "Pass / Fail": [["Pass", 75], ["Fail", 50]]
};
const V2_EC_STATUS = ["진행 중", "완료"];
const V2_EC_CATEGORIES_CLIENT = ["Sports", "Music", "Arts", "Community Services", "STEM", "Debate/Speech", "Journalism/Publication", "Internship/Entrepreneurship", "Academic & Intellectual"];
const V2_SPORTS_LIST = [
  "Football 미식축구", "Soccer 축구", "Cross Country 크로스컨트리", "Field Hockey 필드하키", "Volleyball 배구", "Tennis 테니스", "Golf 골프", "Water Polo 수구", "Crew / Rowing 조정", "Mountain Biking 산악자전거", "Equestrian 승마", "Sailing 세일링", "Cheerleading 치어리딩",
  "Basketball 농구", "Ice Hockey 아이스하키", "Wrestling 레슬링", "Swimming & Diving 수영/다이빙", "Squash 스쿼시", "Indoor Track 실내 육상", "Skiing 스키", "Snowboarding 스노보드", "Figure Skating 피겨스케이팅", "Fencing 펜싱", "Dance 댄스",
  "Baseball 야구", "Softball 소프트볼", "Lacrosse 라크로스", "Track & Field 육상", "Ultimate Frisbee 얼티밋 프리스비", "Rugby 럭비", "Cycling 사이클", "Badminton 배드민턴", "Outdoor Adventure / Climbing 클라이밍·아웃도어",
  "Fitness / Weight Training 피트니스·웨이트", "Yoga 요가", "Martial Arts 무술", "Rock Climbing 암벽등반", "Recreational Sports 레크리에이션 스포츠", "Intramural Sports 교내 리그", "Strength & Conditioning 체력훈련", "Outdoor Program 하이킹·캠핑·카약·스키 등"
];
const V2_EC_LEVELS = ["Junior Varsity", "Varsity", "Regional", "National", "기타"];
const V2_AWARD_LEVELS = ["International", "National", "Regional/Local", "School"];
const V2_TEST_FIELDS = {
  SSAT: ["Overall Percentile", "Verbal Raw Score", "Verbal Percentile", "Quantitative Raw Score", "Quantitative Percentile", "Reading Raw Score", "Reading Percentile"],
  PSAT: ["Reading and Writing", "Math", "Selection Index", "Percentile"],
  SAT: ["Reading and Writing", "Math", "Percentile"],
  ACT: ["English", "Math", "Reading", "Science", "Writing"],
  TOEFL: ["Reading", "Listening", "Speaking", "Writing"],
  "TOEFL Jr": ["Listening Comprehension", "Language Form and Meaning", "Reading Comprehension"],
  IELTS: ["Listening", "Reading", "Writing", "Speaking"],
  DET: ["Literacy", "Comprehension", "Conversation", "Production"]
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
  startDate: "", endDate: "", gradeFrom: "", gradeTo: "", gradeAttended: "", finalGrade: "", discipline: "No", disciplineReason: "", withdrawal: "No", withdrawalReason: "", notes: ""
});
const V2_EMPTY_INTEREST = () => ({ school: "", reason: "", note: "", has_legacy_connection: "No", legacy_school_name: "", legacy_relationship_type: "", legacy_connection_strength: "", legacy_notes: "" });
const V2_EMPTY_GRADING_SCALE = () => ({ type: "Letter Grade with Plus/Minus", gradeInputType: "Letter Grade with Plus/Minus", gpaScale: "4.0 GPA Scale", source: "Unknown", confidence: "Low", notes: "", entries: V2_GRADING_SCALE_TEMPLATES["Letter Grade with Plus/Minus"].map(([raw_grade_label, normalized_score]) => ({ raw_grade_label, normalized_score, description: "" })) });
const V2_EMPTY_ENGLISH_REQUIREMENTS = () => ({ waiverRequirements: "", toeflMinimum: "", toeflCompetitive: "", toeflJrMinimum: "", toeflJrCompetitive: "", ieltsMinimum: "", ieltsCompetitive: "", detMinimum: "", detCompetitive: "", ssatRecommended: "", ssatCompetitive: "", ssatSectionTargets: "", englishSectionTargets: "" });
const V2_EMPTY_ADMIN_SCHOOL = () => ({ name: "", state: "", region: "", town: "", accept: "", ssat: "", boarding: "", intl: "", website: "", programs: "", sports: "", arts: "", fit: "", risk: "", interview: "", grading_scale_config: V2_EMPTY_GRADING_SCALE(), english_requirement_waiver_requirements: "", englishRequirements: V2_EMPTY_ENGLISH_REQUIREMENTS() });
function v2DefaultTranscriptSeason(date = new Date()) {
  const month = date.getMonth();
  if (month <= 5) return "Spring";
  if (month <= 7) return "Summer";
  if (month <= 10) return "Fall";
  return "Winter";
}
const V2_EMPTY_TERM = school => ({ termId: `term-${Date.now()}-${Math.random().toString(36).slice(2)}`, school: school || "", year: String(new Date().getFullYear()), season: v2DefaultTranscriptSeason(), term: "", gradeLevel: "", gradingScale: V2_EMPTY_GRADING_SCALE(), subjects: [{ category: "English", subject: "", grade: "", rawGrade: "", normalizedGrade: "", comment: "" }], termGpa: "", rank: "" });
const V2_EMPTY_TEST = () => ({ type: "SSAT", date: "", nextDate: "", finalSubmission: "미정", details: {}, overall: "", note: "" });
const V2_EMPTY_AWARD = () => ({ level: "School", competition: "", awardName: "", date: "", position: "", notes: "" });
const V2_EMPTY_EC = () => ({
  cat: "Sports", status: "진행 중", name: "", team: "", from: "", to: "",
  weeks: "", hours: "", level: "", levelOther: "", position: "", honors: "", impact: "", awards: [], core: false
});
const V2_EMPTY_ADDRESS = (type = "Permanent Address") => ({ type, typeOther: "", sameAs: "", zip: "", searchQuery: "", koreanAddress: "", englishAddress: "", notes: "" });
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
const V2_EMPTY_FAMILY_STATUS = () => ({
  livingWith: "부모", livingWithOther: "",
  admissionsRecipient: "부모", admissionsRecipientOther: "",
  billingRecipient: "부모", billingRecipientOther: "",
  fatherDeceased: "No", motherDeceased: "No", divorced: "No", separated: "No",
  custodyHolder: "", custodyHolderOther: "", fatherRemarried: "No", motherRemarried: "No"
});
const V2_APPLICATION_PLATFORMS = ["Ravenna", "SAO", "Gateway", "Common App", "Coalition", "UC App", "기타"];
const V2_APPLICATION_RESULTS = ["미입력", "Accepted", "Waitlisted", "Denied", "Withdrawn", "Not Submitted", "Deferred", "기타"];
const V2_RECOMMENDER_ROLES = ["Math Teacher", "English Teacher", "Science Teacher", "History/Social Studies Teacher", "World Language Teacher", "Dorm Advisor", "Coach", "Arts/Music Teacher", "Research Mentor", "Professor", "Counselor", "기타"];
const V2_RELATION_STRENGTH = ["Weak", "Developing", "Good", "Strong", "Excellent"];
const V2_RECOMMENDER_STATUS = ["Not Requested", "Requested", "Materials Sent", "Submitted", "Thank-you Sent"];
const V2_EMPTY_PREVIOUS_APPLICATION = () => ({ school: "", gradeApplied: "", platform: "", platformOtherUrl: "", account: "", submittedDate: "", result: "", notes: "" });
const V2_EMPTY_RECOMMENDATION = () => ({ candidate: "", role: "", roleOther: "", currentStrength: "", targetStrength: "", evidence: "", currentTeacher: "No", specialtyRecommendation: "No", status: "Not Requested", notes: "" });
const V2_DATA_MODEL_VERSION = "prep-lms-separated-analysis-v1";
const V2_SIGNATURE_AI_ENDPOINT_KEY = "yes_prep_signature_ai_endpoint";
const V2_EC_ROADMAP_DOMAINS = ["Sports", "Arts", "Leadership", "Community Service", "STEM", "Academics", "Internship/Work"];
const V2_DEFAULT_SIGNATURE_AI_ORIGIN = "https://strategy-report.vercel.app";

function v2LooksInvalidSignatureAiEndpoint(value = "") {
  try {
    const url = new URL(value);
    return /github\.io$/i.test(url.hostname) || /githubusercontent\.com$/i.test(url.hostname) || !/\/api\/generate-project-deck$/i.test(url.pathname);
  } catch (e) {
    return true;
  }
}

function v2SignatureAiEndpoint() {
  try {
    const saved = localStorage.getItem(V2_SIGNATURE_AI_ENDPOINT_KEY) || "";
    if (saved) {
      const migrated = saved.replace(/\/api\/generate-signature-project$/i, "/api/generate-project-deck");
      if (v2LooksInvalidSignatureAiEndpoint(migrated)) {
        localStorage.removeItem(V2_SIGNATURE_AI_ENDPOINT_KEY);
      } else {
        if (migrated !== saved) localStorage.setItem(V2_SIGNATURE_AI_ENDPOINT_KEY, migrated);
        return migrated;
      }
    }
  } catch (e) {}
  if (typeof window !== "undefined" && /vercel\.app$/i.test(window.location.hostname)) {
    return `${window.location.origin}/api/generate-project-deck`;
  }
  return "";
}

function v2SetSignatureAiEndpoint(value) {
  const clean = String(value || "").trim().replace(/\/$/, "");
  if (!clean) return "";
  const endpoint = /\/api\/generate-(signature-project|project-deck)$/i.test(clean)
    ? clean.replace(/\/api\/generate-signature-project$/i, "/api/generate-project-deck")
    : `${clean}/api/generate-project-deck`;
  if (v2LooksInvalidSignatureAiEndpoint(endpoint)) {
    window.alert("GitHub Pages 주소가 아니라 Vercel 프로젝트 주소를 입력해야 합니다. 예: https://strategy-report.vercel.app");
    return "";
  }
  try { localStorage.setItem(V2_SIGNATURE_AI_ENDPOINT_KEY, endpoint); } catch (e) {}
  return endpoint;
}

function v2PromptSignatureAiEndpoint(force = false) {
  const current = v2SignatureAiEndpoint();
  if (current && !force) return current;
  const next = window.prompt(
    "Vercel API 주소를 입력해주세요. GitHub Pages 주소가 아니라 .vercel.app 주소여야 합니다.",
    current || V2_DEFAULT_SIGNATURE_AI_ORIGIN
  );
  return v2SetSignatureAiEndpoint(next);
}

function v2SignatureAiStudentPayload(st = {}) {
  return {
    name: st.name || "",
    en: st.en || st.englishName || "",
    grade: st.grade || st.currentGrade || "",
    targetYear: st.targetYear || "",
    targetGrade: st.targetGrade || "",
    target: st.target || "",
    school: st.school || "",
    citizenship: st.citizenship || st.usStatus || "",
    interests: (st.interests || []).slice(0, 6),
    tests: (st.tests || []).slice(0, 8),
    transcripts: (st.transcripts || []).slice(0, 12),
    ecs: (st.ecs || []).slice(0, 18),
    awards: (st.awards || []).slice(0, 12),
    recommendations: (st.recommendations || []).slice(0, 8),
    profile: st.profile || st.hookNotes || ""
  };
}

function v2SignatureAiSchoolPayload(st = {}, schools = []) {
  const interestNames = new Set((st.interests || []).map(x => x.school).filter(Boolean));
  return (schools || [])
    .filter(s => interestNames.has(s.name))
    .slice(0, 6)
    .map(s => ({
      name: s.name || "",
      programs: s.programs || "",
      sports: s.sports || "",
      arts: s.arts || "",
      fit: s.fit || "",
      risk: s.risk || "",
      interview: s.interview || "",
      englishRequirements: s.englishRequirements || {}
    }));
}

function v2NormalizeAiProposal(proposal = {}) {
  const normalizeDeckComponent = component => ({
    type: component.type || "card",
    title: component.title || "",
    text: component.text || "",
    chips: Array.isArray(component.chips) ? component.chips : [],
    bullets: Array.isArray(component.bullets) ? component.bullets : [],
    headers: Array.isArray(component.headers) ? component.headers : [],
    rows: Array.isArray(component.rows) ? component.rows.map(row => Array.isArray(row) ? row.map(cell => String(cell || "")) : []) : [],
    cards: Array.isArray(component.cards) ? component.cards.map(card => ({
      title: card.title || "",
      text: card.text || "",
      chips: Array.isArray(card.chips) ? card.chips : [],
      bullets: Array.isArray(card.bullets) ? card.bullets : []
    })) : [],
    layoutNote: component.layoutNote || ""
  });
  const slides = Array.isArray(proposal.slides) ? proposal.slides.map((slide, idx) => ({
    slideNumber: Number(slide.slideNumber) || idx + 1,
    title: slide.title || "",
    sectionLabel: slide.sectionLabel || "",
    purpose: slide.purpose || "",
    layout: slide.layout || "",
    visualDirection: slide.visualDirection || "",
    speakerNote: slide.speakerNote || "",
    components: Array.isArray(slide.components) ? slide.components.map(normalizeDeckComponent) : []
  })) : [];
  return {
    title: proposal.title || "Signature Project Proposal",
    subtitle: proposal.subtitle || "",
    meta: proposal.meta || "",
    format: proposal.format || (slides.length ? "editable-slide-json" : ""),
    designSystem: proposal.designSystem || null,
    slides,
    pptxFileName: proposal.pptxFileName || "",
    pptxBase64: proposal.pptxBase64 || "",
    pdfFileName: proposal.pdfFileName || "",
    pdfBase64: proposal.pdfBase64 || "",
    sections: Array.isArray(proposal.sections) ? proposal.sections.map(section => ({
      title: section.title || "",
      body: section.body || "",
      bullets: Array.isArray(section.bullets) ? section.bullets : [],
      subsections: Array.isArray(section.subsections) ? section.subsections.map(sub => ({
        title: sub.title || "",
        body: sub.body || ""
      })) : []
    })) : [],
    timeline: Array.isArray(proposal.timeline) ? proposal.timeline.map(row => ({
      label: row.label || "",
      tasks: Array.isArray(row.tasks) ? row.tasks : []
    })) : []
  };
}

async function v2GenerateAiSignatureProposal({ st, project, schools, endpoint, mode = "generate" }) {
  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode,
        student: v2SignatureAiStudentPayload(st),
        project: v2NormalizeSignatureProject(project),
        schools: v2SignatureAiSchoolPayload(st, schools)
      })
    });
  } catch (error) {
    throw new Error(`AI API에 연결하지 못했습니다. Vercel API 주소를 확인해주세요: ${endpoint}`);
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `AI API request failed (${response.status})`);
  return {
    ...data,
    proposal: v2NormalizeAiProposal(data.proposal || {})
  };
}

function v2DownloadBase64File(base64, fileName, mimeType) {
  if (!base64) return;
  const link = document.createElement("a");
  link.href = `data:${mimeType};base64,${base64}`;
  link.download = fileName || "download";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function v2EcStrength(ec = {}) {
  const awardCount = (ec.awards || []).filter(a => a.awardName || a.competition).length;
  const levelText = `${ec.level || ""} ${ec.levelOther || ""}`;
  const levelScore = /International|National/i.test(levelText) ? 8 : /Regional|Varsity/i.test(levelText) ? 5 : /School|Junior Varsity/i.test(levelText) ? 3 : 0;
  const timeScore = Math.min(6, (Number(ec.hours) || 0) / 2) + Math.min(4, (Number(ec.weeks) || 0) / 12);
  const storyScore = (ec.description || ec.position || ec.team) ? 2 : 0;
  return (ec.core ? 100 : 0) + awardCount * 6 + levelScore + timeScore + storyScore;
}
function v2OrderCoreEcs(ecs = []) {
  return [...ecs]
    .map((ec, index) => ({ ec, index }))
    .sort((a, b) => Number(!!b.ec.core) - Number(!!a.ec.core) || a.index - b.index)
    .map(x => x.ec);
}
function v2EcName(ec = {}) {
  return ec.name || ec.team || ec.description || "활동명 미입력";
}

function v2TemplateEntries(type) {
  return (V2_GRADING_SCALE_TEMPLATES[type] || []).map(([raw_grade_label, normalized_score]) => ({
    raw_grade_label,
    normalized_score,
    description: ""
  }));
}
function v2NormalizeGradingScale(scale = {}) {
  const rawType = scale.gradeInputType || scale.type || "Letter Grade with Plus/Minus";
  const gradeInputType = V2_GPA_SCALE_TYPE_SET.has(rawType) ? "Letter Grade with Plus/Minus" : rawType;
  const gpaScale = scale.gpaScale || (V2_GPA_SCALE_TYPE_SET.has(rawType) ? rawType : "4.0 GPA Scale");
  const entries = Array.isArray(scale.entries) && scale.entries.length ? scale.entries : v2TemplateEntries(gradeInputType);
  return {
    type: gradeInputType,
    gradeInputType,
    gpaScale,
    gpaScaleOther: scale.gpaScaleOther || "",
    source: scale.source || "Unknown",
    confidence: scale.confidence || (gradeInputType === "Unknown" ? "Unknown" : "Low"),
    notes: scale.notes || "",
    entries: entries.map(e => ({
      raw_grade_label: e.raw_grade_label || e.label || "",
      normalized_score: e.normalized_score ?? e.score ?? "",
      description: e.description || ""
    }))
  };
}
function v2ScaleNeedsNumeric(type) {
  return type === "100-Point Percentage";
}
function v2NormalizeGrade(raw, scale) {
  const value = String(raw ?? "").trim();
  if (!value || value === "誘몄엯??" || value === "미입력") return "";
  const cfg = v2NormalizeGradingScale(scale);
  const numeric = Number(value);
  if (cfg.gradeInputType === "100-Point Percentage" && Number.isFinite(numeric)) return Math.round(Math.max(0, Math.min(100, numeric)) * 10) / 10;
  const direct = cfg.entries.find(e => String(e.raw_grade_label || "").trim().toLowerCase() === value.toLowerCase());
  if (direct && direct.normalized_score !== "") return Number(direct.normalized_score);
  return "";
}
function v2SchoolGradingScale(schools, name) {
  const school = v2FindSchool(schools, name);
  return v2NormalizeGradingScale(school?.grading_scale_config || school?.gradingScaleConfig || V2_EMPTY_GRADING_SCALE());
}
function v2StudentSchoolScale(st, schools, schoolName, fallback) {
  if (schoolName && st.school === schoolName && st.currentSchoolInfo?.gradingScale) return v2NormalizeGradingScale(st.currentSchoolInfo.gradingScale);
  const previous = (st.previousSchools || []).find(s => s.name === schoolName && s.gradingScale);
  if (previous) return v2NormalizeGradingScale(previous.gradingScale);
  if (schoolName) return v2SchoolGradingScale(schools, schoolName);
  return v2NormalizeGradingScale(fallback || V2_EMPTY_GRADING_SCALE());
}
function v2RecalculateTermsWithScale(terms = [], schoolName, scale) {
  const gradingScale = v2NormalizeGradingScale(scale);
  return terms.map(t => {
    if (t.school !== schoolName) return t;
    return {
      ...t,
      gradingScale,
      subjects: (t.subjects || []).map(s => {
        const rawGrade = s.rawGrade || s.grade || "";
        return { ...s, rawGrade, grade: rawGrade, normalizedGrade: v2NormalizeGrade(rawGrade, gradingScale) };
      })
    };
  });
}
function v2StudentSchoolNames(st) {
  return [...new Set([
    st.school,
    ...(st.previousSchools || []).map(s => s.name)
  ].filter(Boolean))];
}
function v2TranscriptSchoolNames(st) {
  return v2StudentSchoolNames(st);
}
function v2AllowedTranscriptSchool(st, requestedSchool) {
  const names = v2StudentSchoolNames(st);
  if (requestedSchool && names.includes(requestedSchool)) return requestedSchool;
  return names[0] || "";
}
function v2PatchStudentSchoolScale(st, schoolName, scale) {
  const gradingScale = v2NormalizeGradingScale(scale);
  if (schoolName && st.school === schoolName) {
    return { currentSchoolInfo: { ...(st.currentSchoolInfo || {}), gradingScale } };
  }
  const previous = st.previousSchools || [V2_EMPTY_PREVIOUS()];
  const found = previous.some(s => s.name === schoolName);
  return {
    previousSchools: found
      ? previous.map(s => s.name === schoolName ? { ...s, gradingScale, _draft: false } : s)
      : [...previous, { ...V2_EMPTY_PREVIOUS(), name: schoolName, gradingScale, _draft: true }]
  };
}
function v2DefaultEnglishRequirements(school = {}) {
  const accept = Number(school.accept || 50);
  const ssat = Number(school.ssat || 0);
  const top = accept <= 15 || ssat >= 94;
  const selective = !top && (accept <= 25 || ssat >= 88);
  const waiverRequirements = "공식 정책 확인 필요: 시민권/영주권만으로 자동 면제되지 않을 수 있으며, 최근 3년 이상 English-medium school 재학, 영어 성적표, 인터뷰 결과, 또는 입학처 승인에 따라 TOEFL/IELTS/DET 제출 면제가 달라질 수 있습니다. Admin에서 학교 공식 요구사항 확인 후 수정하세요.";
  if (top) return { waiverRequirements, toeflMinimum: 100, toeflCompetitive: 110, toeflJrMinimum: 850, toeflJrCompetitive: 880, ieltsMinimum: 7, ieltsCompetitive: 7.5, detMinimum: 130, detCompetitive: 145, ssatRecommended: Math.max(90, ssat || 94), ssatCompetitive: Math.max(95, ssat || 96), ssatSectionTargets: "Verbal/Reading 90%+ 이상, Quantitative 95%+ 이상을 경쟁력 있는 목표로 설정", englishSectionTargets: "TOEFL Speaking/Writing 25+ 및 Reading/Listening 27+ 수준이면 상위권 학교에서 영어 준비도 설명이 쉬워짐" };
  if (selective) return { waiverRequirements, toeflMinimum: 90, toeflCompetitive: 100, toeflJrMinimum: 820, toeflJrCompetitive: 850, ieltsMinimum: 6.5, ieltsCompetitive: 7, detMinimum: 120, detCompetitive: 135, ssatRecommended: Math.max(80, ssat || 88), ssatCompetitive: Math.max(90, ssat || 92), ssatSectionTargets: "Verbal/Reading 85%+ 이상, Quantitative 90%+ 이상이면 안정적으로 설명 가능", englishSectionTargets: "TOEFL 각 영역 24+ 이상, 특히 Speaking/Writing 보완 여부를 함께 확인" };
  return { waiverRequirements, toeflMinimum: 80, toeflCompetitive: 92, toeflJrMinimum: 780, toeflJrCompetitive: 820, ieltsMinimum: 6, ieltsCompetitive: 6.5, detMinimum: 110, detCompetitive: 125, ssatRecommended: Math.max(70, ssat || 80), ssatCompetitive: Math.max(82, ssat || 86), ssatSectionTargets: "전체 percentile과 함께 Reading/Verbal 약점 여부를 확인", englishSectionTargets: "TOEFL 각 영역 22+ 이상을 기본 안정권으로 보고 Speaking/Writing 약점 여부를 확인" };
}
function v2NormalizeEnglishRequirements(school = {}) {
  const defaults = v2DefaultEnglishRequirements(school);
  const saved = school.englishRequirements || {};
  const waiver = school.english_requirement_waiver_requirements || saved.waiverRequirements || defaults.waiverRequirements;
  return { ...V2_EMPTY_ENGLISH_REQUIREMENTS(), ...defaults, ...saved, waiverRequirements: waiver };
}
function v2NormalizeSchool(school = {}) {
  const englishRequirements = v2NormalizeEnglishRequirements(school);
  return {
    ...school,
    english_requirement_waiver_requirements: school.english_requirement_waiver_requirements || englishRequirements.waiverRequirements,
    englishRequirements,
    grading_scale_config: v2NormalizeGradingScale(school.grading_scale_config || school.gradingScaleConfig || V2_EMPTY_GRADING_SCALE())
  };
}

function v2BaseData() {
  const raw = typeof load === "function" ? load() : {};
  const schoolDataVersion = window.PREP_SCHOOL_DATA_VERSION || "local";
  const shouldUseBundledSchools = raw.schoolDataVersion && raw.schoolDataVersion !== schoolDataVersion;
  const schools = (!shouldUseBundledSchools && Array.isArray(raw.schools) && raw.schools.length >= 90 ? raw.schools : (window.PREP_SCHOOLS || DEFAULT_SCHOOLS || [])).map(v2NormalizeSchool);
  const baseStaff = accounts.filter(a => a.role === "staff").map(a => ({ ...a, password: a.password || "prep2026" }));
  const extraStaff = (raw.staffAccounts || []).filter(a => !baseStaff.some(b => b.id === a.id));
  return {
    ...raw,
    schools,
    schoolDataVersion,
    staffAccounts: [...baseStaff, ...extraStaff],
    schoolDataset: v2BuildSchoolDataset(schools),
    students: (raw.students || []).map(v2NormalizeStudent).map(st => v2AttachAnalysis(st, schools))
  };
}
function v2NormalizeStudent(s) {
  const basic = s.basic || {};
  const splitKo = String(s.name || "").trim().split(/\s+/);
  const splitEn = String(s.en || "").trim().split(/\s+/);
  const owners = s.owners || [s.owner || "aram"].filter(Boolean);
  const meaningfulPrevious = (s.previousSchools || []).filter(v2PreviousSchoolHasData);
  const previous = meaningfulPrevious.length ? meaningfulPrevious : [V2_EMPTY_PREVIOUS()];
  const mappedInterests = (s.interests || []).map(x => ({ ...V2_EMPTY_INTEREST(), ...x, reason: x.reason || x.note || "", has_legacy_connection: x.has_legacy_connection || "No" }));
  const interests = mappedInterests.length >= 3 ? mappedInterests : [...mappedInterests, V2_EMPTY_INTEREST(), V2_EMPTY_INTEREST(), V2_EMPTY_INTEREST()].slice(0, 3);
  const seenAcademicTermIds = {};
  const terms = (s.academicTerms || (s.academics || []).map(a => ({ school: a.school || s.school || "", term: a.term || "", termGpa: a.gpa || "", subjects: [{ category: "English", subject: "Overall", grade: a.gpa || "", rawGrade: a.gpa || "", comment: a.comment || "" }] }))).map((t, index) => {
    const parts = String(t.term || "").split(/\s+/);
    const gradingScale = v2NormalizeGradingScale(t.gradingScale);
    const rawTermId = t.termId || t.id || `legacy-term-${index}`;
    const termId = seenAcademicTermIds[rawTermId] ? `${rawTermId}-${index}` : rawTermId;
    seenAcademicTermIds[rawTermId] = true;
    return { year: t.year || parts.find(x => /^\d{4}$/.test(x)) || String(new Date().getFullYear()), season: t.season || parts.find(x => V2_TERM_SEASONS.includes(x)) || "Fall", ...t, termId, gradingScale, subjects: (t.subjects || []).map(sub => {
      const rawGrade = sub.rawGrade || sub.grade || "";
      return { category: sub.category || "English", subject: sub.subject || "", grade: sub.grade || rawGrade, rawGrade, normalizedGrade: sub.normalizedGrade || v2NormalizeGrade(rawGrade, gradingScale), comment: sub.comment || "" };
    }) };
  });
  const addresses = v2ApplyAddressLinks(basic.addresses?.length ? basic.addresses : [
    { ...V2_EMPTY_ADDRESS("Permanent Address"), zip: basic.zip || "", searchQuery: basic.addressSearchQuery || "", koreanAddress: basic.koreanAddress || basic.address || "", englishAddress: basic.englishAddress || "" },
    V2_EMPTY_ADDRESS("Mailing Address")
  ]);
  const phones = basic.phones?.length ? basic.phones : [{ ...V2_EMPTY_PHONE(), number: basic.phone || "" }];
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
      familyStatus: { ...V2_EMPTY_FAMILY_STATUS(), ...(basic.familyStatus || {}) },
      studentReligion: basic.studentReligion || "",
      studentReligionOther: basic.studentReligionOther || "",
      personalEmail: basic.personalEmail || basic.email || "",
      schoolEmail: basic.schoolEmail || "",
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
    tests: (s.tests || []).map(t => ({ ...t, details: t.details || v2ParseDetail(t.detail), type: t.type || "SSAT", finalSubmission: t.finalSubmission || "미정" })),
    ecs: Array.isArray(s.ecs) ? v2OrderCoreEcs(s.ecs.map((ec, index) => ({ ...ec, activityId: v2EcActivityId(ec, index) }))) : [V2_EMPTY_EC()],
    awards: Array.isArray(s.awards) ? s.awards.map(a => ({ ...V2_EMPTY_AWARD(), ...a })) : [],
    applications: s.applications || [],
    previousApplications: Array.isArray(s.previousApplications) ? s.previousApplications.map(a => ({ ...V2_EMPTY_PREVIOUS_APPLICATION(), ...a })) : [],
    recommendations: Array.isArray(s.recommendations) ? s.recommendations.map(r => ({ ...V2_EMPTY_RECOMMENDATION(), ...r })) : [],
    calendarEvents: s.calendarEvents || [],
    enrollmentChecklist: s.enrollmentChecklist || [],
    stagePlans: s.stagePlans || {},
    activityGoalMap: s.activityGoalMap || {},
    ecRoadmapAnalysis: {
      legacyMemo: s.ecRoadmapAnalysis?.legacyMemo || s.stagePlans?.ecRoadmap || "",
      ...(s.ecRoadmapAnalysis || {})
    },
    signatureProjects: Array.isArray(s.signatureProjects) ? s.signatureProjects.map(v2NormalizeSignatureProject) : [],
    reportSnapshots: Array.isArray(s.reportSnapshots) ? s.reportSnapshots : (s.reportSnapshot ? [s.reportSnapshot] : [])
  };
}
function v2Persist(setData, next) {
  const schools = (next.schools || []).map(v2NormalizeSchool);
  const fixed = { ...next, schools, schoolDataset: v2BuildSchoolDataset(schools), students: next.students.map(v2NormalizeStudent).map(st => v2AttachAnalysis(st, schools)) };
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
    website: school.website || "",
    gradingScale: v2NormalizeGradingScale(school.grading_scale_config || school.gradingScaleConfig || V2_EMPTY_GRADING_SCALE())
  };
}
function v2EnsureCoreAddresses(addresses = []) {
  const list = Array.isArray(addresses) ? addresses : [];
  const ensure = type => list.find(a => a.type === type) || V2_EMPTY_ADDRESS(type);
  const core = ["Permanent Address", "Mailing Address"].map(ensure);
  const extras = list.filter(a => !["Permanent Address", "Mailing Address"].includes(a.type));
  return [...core, ...extras];
}
function v2CopyAddressFrom(source = {}, target = {}) {
  return {
    ...target,
    zip: source.zip || "",
    searchQuery: source.searchQuery || "",
    koreanAddress: source.koreanAddress || "",
    englishAddress: source.englishAddress || ""
  };
}
function v2ApplyAddressLinks(addresses = []) {
  const list = v2EnsureCoreAddresses(addresses);
  const permanent = list.find(a => a.type === "Permanent Address") || V2_EMPTY_ADDRESS("Permanent Address");
  return list.map(a => a.sameAs === "Permanent Address" ? v2CopyAddressFrom(permanent, a) : a);
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
function v2PreviousSchoolHasData(p = {}) {
  return p._draft || ["name", "type", "email", "phone", "counselor", "address", "website", "startDate", "endDate", "gradeFrom", "gradeTo", "gradeAttended", "finalGrade", "disciplineReason", "withdrawalReason", "notes"]
    .some(k => String(p[k] || "").trim());
}
function v2Filled(v) {
  if (Array.isArray(v)) return v.some(v2Filled);
  if (v && typeof v === "object") return Object.values(v).some(v2Filled);
  return String(v || "").trim().length > 0;
}
function v2StageCompletion(st, stage) {
  const terms = st.academicTerms || [];
  const req = {
    stage1: [st.name, st.en, st.program, st.currentGrade, st.school, st.targetYear, st.targetGrade, st.basic?.dob, st.basic?.gender, st.basic?.birthCountry, st.currentSchoolInfo?.type, terms[0]?.term, terms[0]?.subjects?.[0]?.grade, st.tests?.[0]?.overall || st.tests?.[0]?.details?.Total, st.ecs?.[0]?.name],
    stage2: [st.profile, st.testPlan, st.projectPlan, st.stagePlans?.schoolList, st.stagePlans?.ecRoadmap || st.ecRoadmapAnalysis?.generatedAt || Object.keys(st.activityGoalMap || {})[0]],
    stage3: [st.stagePlans?.weeklyPlan, st.stagePlans?.parentMeeting, st.calendarEvents?.[0]?.title],
    stage4: [st.applications?.[0]?.school, st.previousApplications?.[0]?.school, st.stagePlans?.essayThemes, st.recommendations?.[0]?.candidate || st.stagePlans?.recommenders],
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
function v2TermProvidedGpa(term) {
  const n = Number(term?.termGpa);
  return String(term?.termGpa || "").trim() && Number.isFinite(n) ? n : null;
}
function v2TermUsesProvidedGpa(term) {
  const gpaScale = String(term?.gradingScale?.gpaScale || "").trim();
  if (gpaScale === "Not provided / Not used") return false;
  return v2TermProvidedGpa(term) !== null;
}
function v2TermAcademicIndex(term) {
  const vals = (term?.subjects || []).map(s => Number(s.normalizedGrade)).filter(n => Number.isFinite(n));
  return vals.length ? v2Round(vals.reduce((a, b) => a + b, 0) / vals.length, 1) : null;
}
function v2CumulativeGpa(terms) {
  const pts = (terms || []).map(v2TermGpa).filter(x => x !== null && !Number.isNaN(x));
  return pts.length ? Math.round((pts.reduce((a, b) => a + b, 0) / pts.length) * 100) / 100 : "";
}
function v2AcademicPillText(terms = []) {
  const gpa = v2CumulativeGpa(terms);
  if (gpa) return `누적 GPA ${gpa}`;
  const latest = v2GpaSeries(v2SortTranscriptTerms(terms), "term").values[0]?.value;
  return `학업 추이 점수 ${latest || "미입력"}`;
}
function v2TestOverall(type, details, fallback) {
  const n = k => Number(details?.[k] || 0);
  if (type === "SSAT") return n("Verbal Raw Score") + n("Quantitative Raw Score") + n("Reading Raw Score") || fallback || details?.Total || "";
  if (type === "TOEFL Jr") return n("Listening Comprehension") + n("Language Form and Meaning") + n("Reading Comprehension") || fallback || "";
  if (type === "TOEFL") return n("Reading") + n("Listening") + n("Speaking") + n("Writing") || fallback || "";
  if (type === "SAT" || type === "PSAT") return n("Reading and Writing") + n("Math") || details?.Total || fallback || "";
  if (type === "IELTS") {
    const vals = ["Listening", "Reading", "Writing", "Speaking"].map(k => Number(details?.[k])).filter(Boolean);
    return vals.length === 4 ? Math.round((vals.reduce((a, b) => a + b, 0) / 4) * 2) / 2 : details?.Overall || fallback || "";
  }
  if (type === "ACT") return fallback || "";
  if (type === "DET") return details?.Overall || fallback || "";
  return details?.Total || fallback || "";
}
function v2BuildSchoolDataset(schools = []) {
  return {
    version: window.PREP_SCHOOL_DATA_VERSION || "local",
    generatedAt: new Date().toISOString(),
    schools: (schools || []).map(v2NormalizeSchool)
  };
}
function v2BuildStudentProfile(st = {}) {
  return {
    version: V2_DATA_MODEL_VERSION,
    studentId: st.id || "",
    name: st.name || "",
    englishName: st.en || "",
    owners: st.owners || [st.owner].filter(Boolean),
    program: st.program || "",
    stage: st.stage || "stage1",
    currentGrade: st.currentGrade || st.grade || "",
    targetYear: st.targetYear || "",
    targetGrade: st.targetGrade || "",
    programEndDate: st.programEndDate || st.deadline || "",
    basic: st.basic || {},
    schoolProfile: {
      currentSchool: st.school || "",
      currentSchoolInfo: st.currentSchoolInfo || {},
      previousSchools: st.previousSchools || [],
      interests: st.interests || []
    },
    academics: {
      terms: st.academicTerms || [],
      summary: v2AcademicSummary(st)
    },
    testing: st.tests || [],
    ecs: st.ecs || [],
    awards: st.awards || [],
    applications: {
      current: st.applications || [],
      previous: st.previousApplications || []
    },
    recommendations: st.recommendations || [],
    calendarEvents: st.calendarEvents || [],
    actionPlans: st.actionPlans || st.tasks || [],
    stagePlans: st.stagePlans || {}
  };
}
function v2Evidence({ claim, category, evidenceData, confidence = "Medium", gap = "", reportUsage = true }) {
  return {
    id: `ev-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    claim,
    category,
    evidenceData,
    confidence,
    gap,
    reportUsage
  };
}
function v2BuildEvaluationResult(st = {}, schools = []) {
  const legacy = v2LegacyStage1Score(st);
  const rubrics = v2ClientRubrics(st);
  const academicTrendMeta = v2AcademicTrendMeta(st.academicTerms || []);
  const interestNames = (st.interests || []).map(x => x.school).filter(Boolean);
  const interestSchools = interestNames.map(name => v2FindSchool(schools, name)).filter(Boolean);
  const predictions = interestSchools.length ? v2LegacyPredictions(st, interestSchools) : [];
  return {
    version: V2_DATA_MODEL_VERSION,
    generatedAt: new Date().toISOString(),
    legacyStage1: legacy,
    rubrics,
    academicTrendMeta,
    interestPredictions: predictions,
    recommendedSchools: v2RecommendedSchools(st, schools || []),
    stageCompletion: Object.fromEntries(V2_STAGE_KEYS.map(([k]) => [k, v2StageCompletion(st, k)]))
  };
}
function v2TestGapEngine(st = {}, schools = []) {
  const tests = (st.tests || []).filter(t => v2PrimaryTestScore(t));
  const interestSchools = (st.interests || []).map(x => v2FindSchool(schools, x.school)).filter(Boolean);
  return interestSchools.map(school => {
    const gaps = tests.map(test => {
      const type = String(test.type || "");
      const score = v2PrimaryTestScore(test);
      const benchmark = v2TestingBenchmark(school, type);
      const gapToRecommended = benchmark.recommended ? v2Round(benchmark.recommended - score, 1) : null;
      const gapToCompetitive = benchmark.competitive ? v2Round(benchmark.competitive - score, 1) : null;
      const weakest = v2WeakestTestSection(test);
      return {
        type,
        score,
        targetRecommended: benchmark.recommended || "",
        targetCompetitive: benchmark.competitive || "",
        gapToRecommended,
        gapToCompetitive,
        weakestSection: weakest,
        fit: v2TestFit(score, benchmark),
        comment: gapToCompetitive !== null && gapToCompetitive > 0
          ? `${school.name} 기준으로 ${type}는 경쟁력 있는 목표까지 약 ${gapToCompetitive}점 보완이 필요합니다. 특히 ${weakest || "세부 영역"}을 먼저 점검하는 것이 좋습니다.`
          : `${school.name} 기준으로 ${type}는 현재 점수만으로도 비교적 안정적으로 설명할 수 있습니다. 다만 학교별 에세이와 인터뷰에서 점수 이상의 준비도를 함께 보여주어야 합니다.`
      };
    });
    return { school: school.name, gaps };
  });
}
function v2WeakestTestSection(test = {}) {
  const details = test.details || {};
  const entries = Object.entries(details)
    .filter(([k, v]) => !/Level|Total|Overall/i.test(k) && Number(v))
    .map(([label, value]) => ({ label, value: Number(value) }));
  if (!entries.length) return "";
  return entries.sort((a, b) => a.value - b.value)[0].label;
}
function v2CoreEcStrategyEngine(st = {}) {
  const ordered = v2OrderCoreEcs(st.ecs || []);
  const core = ordered.filter(e => e.core).slice(0, 3);
  const fallback = core.length ? core : ordered.filter(e => v2EcName(e) !== "활동명 미입력").slice(0, 3);
  const standaloneAwards = st.awards || [];
  return fallback.map((ec, index) => {
    const name = v2EcName(ec);
    const awards = [...(ec.awards || []), ...standaloneAwards.filter(a => String(a.notes || a.competition || "").toLowerCase().includes(String(name || "").toLowerCase()))];
    const months = [ec.from, ec.to || "현재"].filter(Boolean).join(" - ");
    const intensity = [ec.weeks ? `${ec.weeks}주` : "", ec.hours ? `주당 ${ec.hours}시간` : ""].filter(Boolean).join(", ");
    const isSports = ec.cat === "Sports";
    const isAcademic = /STEM|Academic|Intellectual|Debate|Journalism/i.test(ec.cat || "");
    const isArts = /Music|Arts/i.test(ec.cat || "");
    const character = isSports ? "꾸준한 훈련과 경쟁 경험을 통해 자기관리와 팀 기여를 보여주는 학생" : isAcademic ? "지적 호기심과 탐구 성향을 활동으로 확장할 수 있는 학생" : isArts ? "표현력과 창의성을 학교 공동체에 기여로 연결할 수 있는 학생" : "공동체 안에서 역할을 찾아 꾸준히 기여할 수 있는 학생";
    const strengths = [
      ec.core ? "Stage 1에서 핵심 활동으로 별표 지정되어 지원서 상단에 둘 수 있습니다." : "입력된 활동 중 전략적 우선순위가 높은 활동입니다.",
      months ? `활동 기간이 ${months}로 확인됩니다.` : "활동 기간을 추가하면 지속성을 더 명확히 설명할 수 있습니다.",
      intensity ? `참여 강도는 ${intensity}로 정리됩니다.` : "주당 시간과 참여 주수를 입력하면 활동의 깊이가 더 선명해집니다.",
      ec.position ? `${ec.position} 역할을 통해 학생의 책임 범위를 설명할 수 있습니다.` : "포지션/역할이 아직 약해 보이므로 학생이 실제로 맡은 책임을 정리해야 합니다.",
      awards.length ? `관련 수상 또는 Honor ${awards.length}건이 성과 근거로 활용될 수 있습니다.` : "수상이나 산출물이 부족해 보일 수 있어 결과물 또는 외부 평가 근거를 보강하는 것이 좋습니다."
    ];
    const gaps = [];
    if (!ec.position) gaps.push("활동 안에서 맡은 역할이 충분히 드러나지 않습니다.");
    if (!awards.length) gaps.push("성과를 입증할 수 있는 수상, 선발, 공연, 대회, 프로젝트 결과가 더 필요합니다.");
    if (!ec.hours || !ec.weeks) gaps.push("활동 강도를 보여줄 수 있는 시간 정보가 부족합니다.");
    return {
      rank: index + 1,
      activityName: name,
      category: ec.cat || "",
      whyCore: `${name}은 학생의 활동 목록 중 ${ec.core ? "직접 핵심으로 지정된 활동" : "현재 입력값 기준 우선순위가 높은 활동"}입니다. ${months ? `지속 기간(${months})` : "지속 기간"}과 ${ec.position || "역할"}, ${awards.length ? "성과 근거" : "보완 가능한 성과 근거"}를 함께 보면 지원서에서 학생의 방향성을 보여주는 축으로 활용할 수 있습니다.`,
      admissionsCharacter: character,
      strengths,
      gaps: gaps.length ? gaps : ["현재 입력된 정보 기준으로 핵심 활동의 방향성은 좋습니다. 다음 단계에서는 이 활동이 학교 공동체에 어떤 기여로 이어질지 문장화하는 것이 중요합니다."],
      nextGoal: isSports ? "지원 전까지 경기/팀 기여/코치 피드백 중 하나를 구체적인 결과로 정리해 주세요." : isAcademic ? "결과물, 발표, 연구 노트, 대회/프로젝트 성과 중 하나를 지원서에 넣을 수 있는 형태로 완성해 주세요." : isArts ? "포트폴리오, 공연/전시 기록, 지도교사 코멘트를 정리해 활동의 수준을 보여주는 것이 좋습니다." : "활동의 목적, 학생 역할, 결과를 한 문단으로 정리해 원서와 인터뷰에서 바로 사용할 수 있게 만들어 주세요.",
      applicationAngle: `${name}은 단순 참여보다 학생이 맡은 역할과 변화 과정을 중심으로 설명해야 합니다. 인터뷰에서는 왜 이 활동을 오래 했는지, 그 과정에서 배운 점이 보딩스쿨 공동체에 어떻게 이어지는지 존댓말이 아닌 학생 본인의 자연스러운 영어 답변으로 준비하는 것이 좋습니다.`
    };
  });
}
function v2HookDomainProfile(domain, ec = {}) {
  const name = v2EcName(ec);
  const text = v2EcRoadmapText(ec);
  if (domain === "Sports") return {
    trait: "반복 훈련, 자기관리, 경쟁 상황에서의 회복력",
    proof: `${name}에서는 훈련 빈도, 레벨 변화, 대회/경기 기록, 코치 피드백을 정리해 학생이 어떻게 반복 훈련을 견디고 성장했는지를 보여줘야 합니다.`,
    contribution: "스포츠는 보딩스쿨에서 기숙사 생활 적응력, 팀 훈련 태도, 학교 공동체 안에서의 활력을 보여주는 자료로 활용할 수 있습니다.",
    next: "훈련 로그와 기록 변화를 월 단위로 정리하고, 가능하면 코치 코멘트 또는 대회/선발 기준을 확보합니다."
  };
  if (domain === "STEM" || domain === "Academics") return {
    trait: /math|mathematics|ukmt|olympiad/i.test(text) ? "낯선 문제를 구조적으로 분석하고 끝까지 붙잡는 수학적 문제 해결력" : "지적 호기심을 결과물로 확장하는 학업적 탐구력",
    proof: `${name}은 단순 참여 이력보다 문제 해결 노트, 탐구 기록, 대회 준비 과정, 결과물 또는 발표 자료로 증명해야 합니다.`,
    contribution: "이 강점은 수업 참여, 수학/학술 클럽, 또래 튜터링, 탐구 프로젝트로 확장될 때 학교 공동체 기여로 읽힙니다.",
    next: "매주 1-2개 고난도 문제 또는 탐구 주제를 정해 접근 과정, 실패한 풀이, 최종 해결법을 기록하는 evidence log를 만듭니다."
  };
  if (domain === "Leadership") return {
    trait: "사람과 프로젝트를 움직여 결과를 만드는 책임감",
    proof: `${name}에서는 직책명보다 학생이 실제로 바꾼 점, 조율한 사람, 만든 결과를 숫자와 사례로 정리해야 합니다.`,
    contribution: "리더십은 클럽 운영, 팀 문화, 기숙사/하우스 커뮤니티 안에서 학생이 어떤 변화를 만들 수 있는지 보여주는 고리입니다.",
    next: "회의 기록, 운영 전후 변화, 참여자 피드백을 모아 리더십 사례 1개를 완성합니다."
  };
  if (domain === "Community Service") return {
    trait: "공동체 안에서 필요한 역할을 찾아 꾸준히 기여하는 성실성",
    proof: `${name}은 봉사 시간보다 대상, 문제, 학생의 역할, 변화가 보이도록 정리해야 합니다.`,
    contribution: "보딩스쿨은 생활 공동체이므로, 이 영역은 학생이 학교 안에서 주변 사람에게 어떤 긍정적 영향을 줄 수 있는지를 보여줍니다.",
    next: "수혜 대상, 누적 시간, 학생 역할, 변화 지표를 한 장 evidence sheet로 정리합니다."
  };
  if (domain === "Arts") return {
    trait: "생각과 감정을 결과물로 표현하는 창의성",
    proof: `${name}은 포트폴리오, 공연/전시 기록, 피드백, 최종 작품을 통해 수준과 성장 과정을 보여줘야 합니다.`,
    contribution: "예술 활동은 학교 공연, 전시, 앙상블, 출판물 등 공동체 문화에 더할 수 있는 기여로 연결해야 합니다.",
    next: "대표 작품 3-5개와 제작 의도, 피드백 반영 과정을 정리합니다."
  };
  return {
    trait: "관심 분야를 실제 경험으로 넓히는 실행력",
    proof: `${name}은 맡은 일, 만든 산출물, 멘토/기관 피드백을 통해 실제 기여를 보여줘야 합니다.`,
    contribution: "실무 경험은 학생이 교실 밖 맥락에서도 책임 있게 움직일 수 있음을 보여주는 자료로 활용할 수 있습니다.",
    next: "최종 산출물, 업무 기록, 멘토 피드백을 정리합니다."
  };
}
function v2HookArchetype(domains = []) {
  const hasSports = domains.includes("Sports");
  const hasStem = domains.includes("STEM") || domains.includes("Academics");
  const hasArts = domains.includes("Arts");
  const hasLeadership = domains.includes("Leadership");
  const hasService = domains.includes("Community Service");
  if (hasStem && hasSports) return {
    character: "지적 문제 해결력과 반복 훈련을 함께 가진 경쟁형 학생",
    hookLine: "어려운 문제와 어려운 훈련을 모두 오래 붙잡고, 반복을 통해 성장하는 학생"
  };
  if (hasStem && hasLeadership) return {
    character: "아이디어를 실제 팀과 프로젝트로 확장할 수 있는 탐구형 리더",
    hookLine: "생각에서 끝나지 않고 사람과 결과물로 연결하는 학생"
  };
  if (hasArts && hasLeadership) return {
    character: "창의적 결과물을 공동체 경험으로 확장하는 표현형 리더",
    hookLine: "자신의 표현력을 학교 공동체의 경험으로 바꿀 수 있는 학생"
  };
  if (hasSports && hasService) return {
    character: "팀워크와 공동체 기여를 생활 속에서 보여주는 활동형 학생",
    hookLine: "함께 훈련하고 함께 기여하는 방식으로 성장하는 학생"
  };
  if (hasStem) return {
    character: "지적 호기심을 결과물로 증명해야 하는 탐구형 학생",
    hookLine: "낯선 질문을 붙잡고 자기만의 답을 만들어가는 학생"
  };
  if (hasSports) return {
    character: "훈련의 지속성과 자기관리로 설득해야 하는 활동형 학생",
    hookLine: "꾸준한 훈련과 경쟁 경험으로 성장하는 학생"
  };
  return {
    character: "아직 대표 Hook을 더 선명하게 만들어야 하는 학생",
    hookLine: "핵심 활동의 공통분모를 결과물로 증명해야 하는 학생"
  };
}
function v2HookActivityPriority(ec = {}, index = 0) {
  const domains = v2EcDomainsForActivity(ec, index);
  if (domains.includes("STEM") || domains.includes("Academics")) return 1;
  if (domains.includes("Sports")) return 2;
  if (domains.includes("Leadership")) return 3;
  if (domains.includes("Community Service")) return 4;
  if (domains.includes("Arts")) return 5;
  return 6;
}
function v2BuildHookStrategy(st = {}, schools = []) {
  const entered = v2OrderCoreEcs(st.ecs || []).filter(v2EcRoadmapHasActivity);
  const selected = entered.filter(e => e.core).slice(0, 3);
  const top = [...selected, ...entered.filter(e => !e.core)].slice(0, 3);
  const narrativeTop = [...top].sort((a, b) => v2HookActivityPriority(a) - v2HookActivityPriority(b));
  const supporting = entered.filter(e => !top.includes(e)).slice(0, 4);
  const activityInsights = narrativeTop.map((ec, index) => {
    const domains = v2EcDomainsForActivity(ec, index);
    const primary = domains.includes("STEM") ? "STEM" : domains.includes("Academics") ? "Academics" : domains[0] || "Academics";
    const profile = v2HookDomainProfile(primary, ec);
    return { rank: index + 1, ec, name: v2EcName(ec), domains, primary, ...profile };
  });
  const allDomains = [...new Set(activityInsights.flatMap(x => x.domains))];
  const archetype = v2HookArchetype(allDomains);
  const studentName = st.name || "학생";
  const names = activityInsights.map(x => x.name).join(", ");
  const traitNames = [...new Set(activityInsights.map(x => x.trait))].join(", ");
  const interestNames = (st.interests || []).map(x => x.school).filter(Boolean);
  const schoolText = interestNames.length ? `관심학교(${interestNames.slice(0, 3).join(", ")})` : "관심 보딩스쿨";
  const first = activityInsights[0];
  const second = activityInsights[1];
  const third = activityInsights[2];
  const proofPlan = activityInsights.map(x => ({
    activity: x.name,
    domains: x.domains,
    trait: x.trait,
    proof: x.proof,
    next: x.next
  }));
  const summary = activityInsights.length ? `${studentName} 학생에게는 “${archetype.hookLine}”이라는 Hook이 가장 적절합니다. 핵심 활동 조합(${names})은 서로 다른 활동처럼 보일 수 있지만, 입학사정관에게는 ${traitNames}이라는 역량 조합으로 연결될 수 있습니다. 중요한 것은 활동명을 많이 보여주는 것이 아니라, 각 활동에서 학생이 어떤 방식으로 문제를 해결하고, 훈련하고, 결과를 만들었는지를 증거로 남기는 것입니다.` : "아직 핵심 EC가 충분히 지정되지 않았습니다. Stage 1의 EC 기본에서 지원서에 가장 먼저 보여주고 싶은 활동 3개를 별표로 지정하면 Hook Strategy를 생성할 수 있습니다.";
  const contributionPlan = activityInsights.length ? `${schoolText} 맥락에서는 이 Hook을 수업, 기숙사 생활, 클럽/팀 활동으로 나누어 보여줘야 합니다. 수업 안에서는 핵심 활동에서 확인되는 준비 태도와 문제 해결 방식이 토론, 과제, 심화 탐구로 이어질 수 있음을 보여줘야 합니다. 클럽/팀에서는 ${first?.trait || "학생의 강점"}이 실제 참여, 결과물, 또래와의 협업으로 이어져야 합니다. 기숙사 생활에서는 훈련 루틴, 피드백 수용 태도, 꾸준한 자기관리 사례를 준비해야 합니다. 즉 “좋은 활동을 했다”가 아니라 “이 학생이 학교 안에서 어떤 방식으로 움직일 것인가”를 보여주는 자료가 필요합니다.` : "관심학교와 핵심 활동을 입력하면 학교생활 기여 전략이 생성됩니다.";
  const applicationStrategy = [
    { area: "Activity List", action: `가장 강한 활동: ${first?.name || "핵심 활동"}. Activity List에서는 활동명보다 역할, 기간, 성과, 숫자가 먼저 보이게 작성합니다.` },
    { area: "Essay", action: "가장 어려웠던 문제나 훈련 장면 하나를 골라, 학생이 상황을 분석하고 다시 시도해 성장한 과정을 보여줍니다." },
    { area: "Interview", action: `“저는 ${archetype.hookLine}입니다”라는 메시지를 30초 답변으로 준비하고, 핵심 활동 조합(${names || "핵심 활동"})에서 나온 구체 사례 2개로 설명합니다.` },
    { area: "Recommendation", action: "추천인에게는 성실하다는 일반 표현보다, 문제 해결 과정·훈련 태도·기여 사례가 들어가도록 evidence sheet를 제공합니다." }
  ];
  const executionPlan = [
    { period: "1개월 내", action: "핵심 활동별 evidence sheet를 만들고, 기간·역할·성과·피드백·다음 목표를 한 장으로 정리합니다." },
    { period: "3개월 내", action: "가장 강한 활동 1개에서 결과물 또는 기록 변화를 확보합니다. 수학이면 문제 해결 노트, 스포츠면 훈련/기록 로그가 우선입니다." },
    { period: "6개월 내", action: "관심학교와 연결되는 클럽, 팀, 수업, 프로그램을 찾아 Why School 문장과 인터뷰 소재로 연결합니다." },
    { period: "지원 직전", action: "Activity List, Essay, Interview, Recommendation 자료가 같은 Hook을 말하고 있는지 점검합니다." }
  ];
  const gaps = [];
  if (!top.length) gaps.push("핵심 활동이 아직 지정되지 않아 학생을 기억하게 할 중심 Hook이 약합니다.");
  if (!top.some(e => e.position)) gaps.push("활동 안에서 맡은 역할이 충분히 드러나지 않습니다. 직책이 없더라도 실제 책임, 기여, 변화 사례를 정리해야 합니다.");
  if (!top.some(e => (e.awards || []).length)) gaps.push("수상 또는 외부 성과가 약합니다. 수상이 없더라도 결과물, 기록 변화, 피드백처럼 확인 가능한 증거가 필요합니다.");
  if (!top.some(e => e.hours || e.weeks)) gaps.push("활동 강도를 보여줄 시간 정보가 부족합니다. 주당 시간과 준비 기간은 지속성을 보여주는 기본 근거입니다.");
  return {
    top,
    supporting,
    activityInsights,
    character: archetype.character,
    hookLine: archetype.hookLine,
    summary,
    contributionPlan,
    proofPlan,
    applicationStrategy,
    executionPlan,
    gaps: gaps.length ? gaps : ["현재 핵심 활동의 방향성은 좋습니다. 다음 단계에서는 각 활동의 증거 자료를 만들어 지원서 전 영역에서 같은 Hook이 반복되도록 정리해야 합니다."]
  };
}
function v2StudentHookEngine(st = {}, schools = []) {
  return v2BuildHookStrategy(st, schools);
}
function v2ProjectRoadmapFromHook(st = {}, projectType = "") {
  return v2ApplicationSemesterPlan(st).map((period, index) => ({
    period: period.label,
    focus: index === 0 ? "기초 자료를 모으고 프로젝트의 증거 구조를 설계합니다." : index === 1 ? "중간 결과물을 만들고 담당자 피드백을 반영합니다." : period.application ? "지원서에 넣을 최종 문장과 증거 자료를 확정합니다." : "외부 검증 또는 학교 Fit 연결 자료를 확보합니다.",
    deliverable: /Math|STEM|Research/i.test(projectType) ? "문제 해결 노트, 탐구 기록, 제출/발표 자료" : /Athletic|Sports|Ski/i.test(projectType) ? "훈련 로그, 기록 변화, 코치 피드백" : /Writing|Interview/i.test(projectType) ? "대표 에피소드, 에세이/인터뷰 초안, 추천서 evidence sheet" : "프로젝트 evidence sheet, 활동 설명 초안, 인터뷰 사례",
    checkpoint: period.application ? "지원서 제출 전 최종 점검" : "학기 말 담당자 리뷰"
  }));
}
function v2SignatureProject(id, title, badge, theme, sourceActivities, rationale, currentState, targetState, projectType, st = {}) {
  return {
    id,
    title,
    badge,
    theme,
    sourceActivities: sourceActivities.map(x => x.ec?.activityId || x.ec?.id || x.name).filter(Boolean),
    sourceActivityNames: sourceActivities.map(x => x.name).filter(Boolean),
    rationale,
    currentState,
    targetState,
    semesterRoadmap: v2ProjectRoadmapFromHook(st, projectType),
    applicationUsage: /Bridge/i.test(projectType) ? ["Why School", "Interview", "School-specific supplement"] : /Writing|Research/i.test(projectType) ? ["Essay", "Portfolio / Supplement", "Interview", "Recommendation"] : ["Activity List", "Essay", "Interview", "Recommendation"],
    evidenceNeeded: [],
    risks: [],
    nextActions: [],
    generatedAt: new Date().toISOString(),
    manuallyEdited: false
  };
}
function v2GenerateSignatureProjects(st = {}, schools = []) {
  const hook = v2BuildHookStrategy(st, schools);
  const insights = hook.activityInsights || [];
  const stem = insights.filter(x => x.domains.includes("STEM") || x.domains.includes("Academics"));
  const sports = insights.filter(x => x.domains.includes("Sports"));
  const arts = insights.filter(x => x.domains.includes("Arts"));
  const leadership = insights.filter(x => x.domains.includes("Leadership") || x.domains.includes("Community Service"));
  const schoolNames = (st.interests || []).map(x => x.school).filter(Boolean).slice(0, 3);
  const projectList = [];
  if (stem.length && sports.length) {
    const title = `${sports[0].name} × ${stem[0].name.includes("Math") || stem[0].name.includes("UKMT") ? "수학" : "탐구"} — “${hook.hookLine}”`;
    const p = v2SignatureProject("signature-stem-sports", title, "독보적 아이덴티티", "blue", [sports[0], ...stem.slice(0, 2)], `${st.name || "학생"} 학생의 가장 흥미로운 고리는 학업적 문제 해결력과 스포츠 훈련성이 함께 보인다는 점입니다. 이 프로젝트는 두 활동을 따로 보여주는 대신, 어려운 문제와 어려운 훈련을 모두 반복적으로 해결하는 학생이라는 하나의 이미지로 묶어 줍니다.`, `현재 근거는 ${[...stem, ...sports].map(x => x.name).join(", ")}입니다. 다만 이 활동들이 아직 하나의 스토리로 연결되어 보이려면 문제 해결 과정, 훈련 기록, 피드백 자료가 더 필요합니다.`, "지원 전까지 수학/탐구 evidence log와 스포츠 훈련 로그를 함께 정리하고, Essay와 Interview에서 같은 성장 패턴으로 설명할 수 있게 만듭니다.", "STEM × Sports Identity", st);
    p.evidenceNeeded = ["수학 문제 해결 노트", "대회 준비/결과 기록", "스포츠 훈련 로그", "기록 변화 또는 코치 피드백", "두 활동을 연결하는 30초 인터뷰 답변"];
    p.risks = ["수학과 스포츠가 별개의 활동으로 보이면 Hook의 힘이 약해질 수 있습니다.", "객관적 기록이나 피드백이 부족하면 활동의 깊이가 충분히 전달되지 않습니다."];
    p.nextActions = ["이번 달 안에 수학 문제 해결 노트 양식을 만듭니다.", "스포츠 훈련 로그와 코치 피드백 요청 문안을 준비합니다.", "두 활동을 연결하는 Essay 소재 후보 2개를 정리합니다."];
    projectList.push(p);
  }
  if (stem.length) {
    const p = v2SignatureProject("signature-stem-portfolio", `${stem[0].name} 중심 수학·탐구 포트폴리오`, "STEM Spike", "cyan", stem.slice(0, 2), `${stem.map(x => x.name).join(", ")}는 단순 대회 참가가 아니라 학생의 사고 방식과 문제 해결 습관을 보여주는 자료가 되어야 합니다. 이 프로젝트는 수상 여부와 별개로 학생이 어떻게 생각하고 다시 시도하는지를 증거로 남기는 데 목적이 있습니다.`, `현재 ${stem.map(x => x.name).join(", ")} 활동이 확인됩니다. 하지만 문제를 어떻게 접근했는지, 실패한 풀이를 어떻게 수정했는지, 어떤 지적 호기심으로 확장했는지는 아직 더 정리해야 합니다.`, "지원 전까지 주간 문제 해결 노트, 탐구 기록, 수학 교사/멘토에게 전달할 evidence sheet를 완성합니다.", "STEM Competition Portfolio", st);
    p.evidenceNeeded = ["주간 문제 해결 노트", "실패한 풀이와 수정 과정", "대회 준비 일정", "수학 교사 추천서 evidence sheet", "심화 탐구 주제 1개"];
    p.risks = ["대회명만 있고 사고 과정이 없으면 단순 스펙처럼 보일 수 있습니다.", "학교 수업과 공동체 기여로 확장되는 장면이 부족할 수 있습니다."];
    p.nextActions = ["고난도 문제 5개를 골라 풀이 과정 기록을 시작합니다.", "수학 교사에게 보여줄 evidence sheet 초안을 만듭니다.", "관심학교의 Math Club/STEM 프로그램을 조사합니다."];
    projectList.push(p);
  }
  if (sports.length) {
    const p = v2SignatureProject("signature-athletic-track", `${sports[0].name} Athletic Growth Track`, "Athletic Spike", "green", sports.slice(0, 2), `${sports[0].name}는 단순 취미가 아니라 지속성, 자기관리, 경쟁 상황에서의 회복력을 보여주는 중요한 활동입니다. 보딩스쿨에서는 스포츠가 생활 공동체 적응력과 팀 기여 가능성의 신호가 될 수 있습니다.`, `현재 ${sports[0].name} 활동이 확인됩니다. 다만 기록 변화, 레벨, 대회 경험, 코치 피드백이 정리될수록 훨씬 강한 증거가 됩니다.`, "지원 전까지 훈련 로그, 기록 변화, 코치 피드백, 영상/사진 자료를 정리해 Activity List와 Interview에 사용할 수 있게 만듭니다.", "Athletic Development Track", st);
    p.evidenceNeeded = ["훈련 로그", "기록 변화", "대회/선발 기준", "코치 피드백", "활동 사진/영상 링크"];
    p.risks = ["활동명만으로는 실력과 지속성을 판단하기 어렵습니다.", "팀/학교 공동체 기여로 연결되지 않으면 보딩 Fit 근거가 약해질 수 있습니다."];
    p.nextActions = ["훈련 빈도와 기록 변화를 월별로 정리합니다.", "코치 피드백 요청 문안을 준비합니다.", "스포츠 활동을 보딩 생활 적응력으로 설명하는 인터뷰 답변을 만듭니다."];
    projectList.push(p);
  }
  if (arts.length || leadership.length || projectList.length < 3) {
    const base = arts[0] || leadership[0] || insights[0];
    const title = arts[0] ? `${base.name} Portfolio Project` : leadership[0] ? `${base.name} Leadership / Service Initiative` : "Writing / Interview Story Project";
    const badge = arts[0] ? "Arts Portfolio" : leadership[0] ? "Leadership / Service Spike" : "Writing Portfolio";
    const p = v2SignatureProject("signature-expression-project", title, badge, "purple", base ? [base] : [], base ? `${base.name} 활동을 학생의 관심사, 결과물, 발표, 기여 사례로 확장하는 프로젝트입니다. Hook이 활동 목록 안에만 머물지 않고 지원서 문장과 인터뷰 소재로 작동하게 만듭니다.` : "핵심 활동의 공통분모를 Essay와 Interview에서 설명할 수 있는 스토리로 정리하는 프로젝트입니다.", base ? `현재 ${base.name} 활동이 확인됩니다. 결과물, 피드백, 역할, 변화 사례를 더 정리해야 합니다.` : "아직 별도 활동 축이 충분하지 않아 기존 핵심 활동에서 스토리 소재를 발굴해야 합니다.", "지원 전까지 대표 결과물과 30초 인터뷰 답변, 추천서 evidence sheet를 완성합니다.", "Writing / Interview Portfolio", st);
    p.evidenceNeeded = ["대표 결과물", "활동 설명 초안", "인터뷰 답변", "추천서 evidence sheet"];
    p.risks = ["프로젝트 목적이 불분명하면 활동 나열처럼 보일 수 있습니다."];
    p.nextActions = ["핵심 활동별 에피소드 3개를 고릅니다.", "Essay/Interview에 사용할 대표 장면 1개를 정합니다."];
    projectList.push(p);
  }
  {
    const targetSchools = schoolNames.length ? schoolNames.join(", ") : "관심학교";
    const titlePrefix = schoolNames[0] ? `${schoolNames[0]} 등` : "관심학교";
    const p = v2SignatureProject("signature-school-fit-bridge", `${titlePrefix} Fit Bridge`, "School Fit Project", "sky", insights.slice(0, 3), `${targetSchools} 맥락에서는 학생의 활동이 학교 프로그램, 팀, 클럽, 수업과 어떻게 연결되는지가 중요합니다. 이 프로젝트는 Why School과 Interview에서 학생의 Hook을 학교별 맥락으로 번역하는 역할을 합니다.`, schoolNames.length ? `현재 관심학교는 ${targetSchools}입니다. 학생 활동과 학교별 프로그램 연결 자료를 더 정리해야 합니다.` : "아직 관심학교가 충분히 지정되지 않았습니다. 관심학교가 정해지는 즉시 학생 활동과 학교별 프로그램 연결 자료를 정리해야 합니다.", "관심학교별 Math/STEM, Sports, Arts, Outdoor, Club 프로그램을 조사하고, 학교별 Why School 문장과 인터뷰 답변을 만듭니다.", "School Fit Bridge Project", st);
    p.evidenceNeeded = ["학교별 프로그램 조사표", "Why School 문장", "인터뷰 답변", "학교별 fit note"];
    p.risks = ["학교별 연결 근거 없이 같은 활동 설명을 반복하면 지원서가 일반적으로 보일 수 있습니다."];
    p.nextActions = ["관심학교별 프로그램 2개씩 조사합니다.", "각 학교에 맞춘 Why School 문장 1개씩 작성합니다."];
    projectList.push(p);
  }
  return projectList.slice(0, 4);
}
function v2NormalizeSignatureProject(project = {}) {
  const toList = value => Array.isArray(value) ? value.filter(Boolean) : String(value || "").split("\n").map(x => x.trim()).filter(Boolean);
  return {
    ...project,
    bigIdea: project.bigIdea || project.rationale || "",
    boardingFit: project.boardingFit || "",
    academicTalent: project.academicTalent || "",
    communityContribution: project.communityContribution || "",
    currentEvidence: project.currentEvidence || project.currentState || "",
    targetOutput: project.targetOutput || project.targetState || "",
    rationale: project.rationale || project.bigIdea || "",
    currentState: project.currentState || project.currentEvidence || "",
    targetState: project.targetState || project.targetOutput || "",
    applicationUsage: toList(project.applicationUsage),
    evidenceNeeded: toList(project.evidenceNeeded),
    risks: toList(project.risks),
    nextActions: toList(project.nextActions),
    semesterRoadmap: Array.isArray(project.semesterRoadmap) ? project.semesterRoadmap : []
  };
}
const V2_SIGNATURE_PROJECT_SCHEMA = "signature-project-v2";
function v2SignatureProjectText(project = {}) {
  const p = v2NormalizeSignatureProject(project);
  return [
    p.bigIdea,
    p.boardingFit,
    p.academicTalent,
    p.communityContribution,
    p.currentEvidence,
    p.targetOutput,
    ...(p.evidenceNeeded || []),
    ...(p.nextActions || []),
    ...(p.applicationUsage || [])
  ].filter(Boolean).join("\n");
}
function v2SignatureProjectHasStructuredBrief(project = {}) {
  const p = v2NormalizeSignatureProject(project);
  if (p.proposal?.pptxBase64 || p.proposal?.slides?.length || p.proposal?.pptxFileName) return true;
  const text = v2SignatureProjectText(p);
  const compactLength = text.replace(/\s/g, "").length;
  const markerCount = ["무엇을", "어떻게", "의도", "프로젝트"].filter(marker => text.includes(marker)).length;
  const fieldCount = ["bigIdea", "boardingFit", "academicTalent", "communityContribution", "currentEvidence", "targetOutput"]
    .filter(key => String(p[key] || "").trim().replace(/\s/g, "").length >= 80).length;
  if (p.schemaVersion === V2_SIGNATURE_PROJECT_SCHEMA && compactLength >= 520 && fieldCount >= 4) return true;
  return (markerCount >= 3 && fieldCount >= 4) || (compactLength >= 900 && fieldCount >= 5);
}
function v2SignatureProjectIsLegacy(project = {}) {
  if (!project || !Object.keys(project).length) return false;
  return !v2SignatureProjectHasStructuredBrief(project);
}
function v2SignatureProjectActivityTokens(project = {}) {
  const p = v2NormalizeSignatureProject(project);
  return new Set([...(p.sourceActivities || []), ...(p.sourceActivityNames || [])].map(x => String(x || "").trim().toLowerCase()).filter(Boolean));
}
function v2SignatureProjectMatchScore(saved = {}, generated = {}) {
  const s = v2NormalizeSignatureProject(saved);
  const g = v2NormalizeSignatureProject(generated);
  let score = 0;
  if (s.id && g.id && s.id === g.id) score += 8;
  if (s.title && g.title && s.title === g.title) score += 6;
  const sTitle = String(s.title || "").toLowerCase();
  const gTitle = String(g.title || "").toLowerCase();
  if (sTitle && gTitle && (sTitle.includes(gTitle) || gTitle.includes(sTitle))) score += 3;
  const sTokens = v2SignatureProjectActivityTokens(s);
  const gTokens = v2SignatureProjectActivityTokens(g);
  gTokens.forEach(token => { if (sTokens.has(token)) score += 4; });
  return score;
}
function v2MergeSignatureProject(saved = {}, generated = {}) {
  const s = v2NormalizeSignatureProject(saved);
  const g = v2NormalizeSignatureProject(generated);
  if (v2SignatureProjectHasStructuredBrief(s)) return { ...s, schemaVersion: s.schemaVersion || V2_SIGNATURE_PROJECT_SCHEMA };
  const keepSavedTitle = String(s.title || "").trim() && !/^signature|old shallow/i.test(String(s.title || ""));
  return v2NormalizeSignatureProject({
    ...g,
    id: g.id || s.id,
    title: keepSavedTitle ? s.title : g.title,
    badge: s.badge || g.badge,
    theme: s.theme || g.theme,
    sourceActivities: (s.sourceActivities || []).length ? s.sourceActivities : g.sourceActivities,
    sourceActivityNames: (s.sourceActivityNames || []).length ? s.sourceActivityNames : g.sourceActivityNames,
    semesterRoadmap: (g.semesterRoadmap || []).length ? g.semesterRoadmap : s.semesterRoadmap,
    schemaVersion: V2_SIGNATURE_PROJECT_SCHEMA,
    upgradedFromLegacy: true,
    legacySummary: [s.rationale, s.currentState, s.targetState].filter(Boolean).join("\n"),
    generatedAt: g.generatedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    manuallyEdited: !!s.manuallyEdited,
    proposal: s.proposal || g.proposal,
    proposalSavedAt: s.proposalSavedAt || g.proposalSavedAt,
    aiQualityReview: s.aiQualityReview || g.aiQualityReview,
    aiModel: s.aiModel || g.aiModel,
    aiGeneratedAt: s.aiGeneratedAt || g.aiGeneratedAt
  });
}
function v2ResolveSignatureProjects(st = {}, schools = [], projectSource = null) {
  const saved = (projectSource || st.signatureProjects || []).map(v2NormalizeSignatureProject);
  const generated = v2GenerateSignatureProjects(st, schools).map(project => v2NormalizeSignatureProject({ ...project, schemaVersion: V2_SIGNATURE_PROJECT_SCHEMA }));
  if (!saved.length) return generated;
  if (!generated.length) return saved;
  const usedSaved = new Set();
  const resolved = generated.map(g => {
    let bestIndex = -1;
    let bestScore = 0;
    saved.forEach((s, idx) => {
      if (usedSaved.has(idx)) return;
      const score = v2SignatureProjectMatchScore(s, g);
      if (score > bestScore) {
        bestIndex = idx;
        bestScore = score;
      }
    });
    if (bestIndex >= 0 && bestScore >= 3) {
      usedSaved.add(bestIndex);
      return v2MergeSignatureProject(saved[bestIndex], g);
    }
    return g;
  });
  saved.forEach((s, idx) => {
    if (!usedSaved.has(idx) && v2SignatureProjectHasStructuredBrief(s) && resolved.length < 4) {
      resolved.push({ ...s, schemaVersion: s.schemaVersion || V2_SIGNATURE_PROJECT_SCHEMA });
    }
  });
  return resolved.slice(0, 4);
}
function v2SignatureProjectSourceEcs(st = {}, project = {}) {
  const p = v2NormalizeSignatureProject(project);
  const ids = new Set((p.sourceActivities || []).map(x => String(x || "").toLowerCase()));
  const names = new Set((p.sourceActivityNames || []).map(x => String(x || "").toLowerCase()));
  return (st.ecs || []).filter((ec, index) => {
    const id = String(ec.activityId || ec.id || v2EcActivityId(ec, index) || "").toLowerCase();
    const name = String(v2EcName(ec) || ec.name || ec.activityName || "").toLowerCase();
    return ids.has(id) || names.has(name) || [...names].some(n => n && name.includes(n));
  });
}
function v2SignatureProposalText(project = {}, ecs = []) {
  const p = v2NormalizeSignatureProject(project);
  return [
    p.title,
    p.badge,
    p.bigIdea,
    p.boardingFit,
    p.academicTalent,
    p.communityContribution,
    ...(p.sourceActivityNames || []),
    ...ecs.map(ec => `${v2EcName(ec)} ${ec.category || ec.cat || ""} ${ec.note || ""} ${ec.impact || ""} ${ec.position || ""}`)
  ].join(" ").toLowerCase();
}
function v2SignatureProjectArchetype(project = {}, ecs = []) {
  const text = v2SignatureProposalText(project, ecs);
  if (/diabet|diabetes|diabetic|당뇨/.test(text)) return {
    key: "diabetes",
    title: "Pediatric Diabetes School-Life Research Portfolio",
    subtitle: "소아 당뇨 학생의 학교생활 지원 방안 연구 프로젝트",
    perspectiveLabel: "네 가지 관점별 분석",
    perspectives: [
      ["Biology 관점", "소아 당뇨의 생물학적 원리, 혈당 조절, 인슐린, 식사와 운동의 관계를 이해합니다. 이를 통해 학생의 생명과학적 관심과 기본 학업 역량을 보여줄 수 있습니다."],
      ["Psychology 관점", "소아 당뇨 학생들이 느낄 수 있는 불안, 스트레스, 또래와 다르다는 감정, 자기 관리 부담을 분석합니다. 청소년기의 질병 관리가 정서와 사회성에 어떤 영향을 줄 수 있는지 탐구합니다."],
      ["Public Health 관점", "학생 개인의 관리만이 아니라 학교 차원의 지원 체계를 살펴봅니다. 보건교육, 교직원 교육, 응급 대응, 식단 정보 제공, 건강관리 정책 등을 조사합니다."],
      ["Boarding Life 관점", "보딩스쿨은 학생이 학교 안에서 생활 전반을 보내는 환경이므로 기숙사, 식당, 체육 활동, 야간 생활, 주말 프로그램까지 고려해야 합니다."]
    ],
    coreQuestion: "소아 당뇨를 가진 학생들은 학교생활에서 어떤 어려움을 겪으며, 보딩스쿨은 이 학생들을 어떻게 더 효과적으로 지원할 수 있는가?",
    deliverables: ["5~8페이지 Research Brief", "Evidence Log", "School-Life Problem Map", "5분 발표자료", "Teacher / Mentor Feedback Sheet"],
    stages: ["주제 이해 및 Research Question 설정", "자료 조사 및 Evidence Log 작성", "네 가지 관점별 분석", "School-Life Problem Map 제작", "Proposed Support Model 제안", "Research Brief와 발표자료 완성"]
  };
  if (/research|stem|math|olympiad|ukmt|science|academic|논문|리서치|수학|과학|탐구/.test(text)) return {
    key: "research",
    title: `${project.title || "Academic Research Portfolio"}`,
    subtitle: "학업적 호기심을 결과물로 증명하는 학생 주도형 리서치 프로젝트",
    perspectiveLabel: "분석 관점",
    perspectives: [
      ["Academic Question", "활동명이나 대회명보다 학생이 붙잡을 핵심 질문을 먼저 설정합니다. 질문이 좁고 선명해야 리서치가 단순 조사로 보이지 않습니다."],
      ["Evidence & Method", "논문, 기사, 교재, 강의자료, 문제풀이 기록 등 신뢰할 수 있는 자료를 읽고 Evidence Log로 축적합니다."],
      ["Explanation & Teaching", "자신이 이해한 내용을 후배나 또래가 이해할 수 있는 설명 자료로 바꾸어 학업적 깊이와 커뮤니케이션 능력을 동시에 보여줍니다."],
      ["Boarding Community", "보딩스쿨의 수업, 클럽, peer tutoring, research seminar 안에서 이 관심이 어떻게 기여로 이어질 수 있는지 연결합니다."]
    ],
    coreQuestion: "이 학생은 어떤 학업적 질문을 오래 붙잡고, 어떤 근거를 통해 자신의 설명과 결과물을 만들 수 있는가?",
    deliverables: ["Research Brief 또는 Problem-Solving Portfolio", "Evidence / Solution Log", "설명 슬라이드 또는 3~5분 발표자료", "Teacher Feedback Sheet", "지원서용 활동 설명문"],
    stages: ["핵심 질문 2~3개 설정", "자료와 기존 결과물 정리", "Evidence Log 작성", "중간 브리프 작성", "교사/멘토 피드백 반영", "최종 포트폴리오 완성"]
  };
  if (/sport|ski|baseball|soccer|tennis|athletic|varsity|스키|야구|축구|농구|운동|스포츠/.test(text)) return {
    key: "sports",
    title: `${project.title || "Athletic Performance & Team Culture Portfolio"}`,
    subtitle: "훈련, 자기관리, 팀 기여를 입시 증거로 정리하는 Athletic Spike 프로젝트",
    perspectiveLabel: "분석 관점",
    perspectives: [
      ["Performance", "기록, 기술 목표, 대회/경기 결과를 정리해 단순 참여가 아니라 성장의 방향성을 보여줍니다."],
      ["Training Discipline", "주간 훈련 루틴, 컨디션 관리, 피드백 반영 과정을 기록해 보딩스쿨 생활에 필요한 자기관리 능력을 보여줍니다."],
      ["Team Contribution", "팀 안에서 맡은 역할, 후배 지원, 분위기 형성, 코치와의 관계를 정리해 공동체 적응력을 보여줍니다."],
      ["Boarding Fit", "시즌 스포츠, 기숙사 생활, 학업과 운동의 균형을 어떻게 관리할 수 있는지 보여주는 방향으로 연결합니다."]
    ],
    coreQuestion: "이 학생은 운동 경험을 통해 어떤 자기관리, 회복력, 팀 기여 역량을 보여줄 수 있는가?",
    deliverables: ["월별 Training Log", "Performance Change Chart", "Coach Feedback Sheet", "Team Contribution Notes", "Interview Athletic Story"],
    stages: ["최근 3개월 훈련 기록 정리", "기록/기술 baseline 설정", "코치 피드백 확보", "팀 기여 사례 수집", "성과 변화표 작성", "인터뷰용 athletic story 완성"]
  };
  if (/art|music|cello|piano|theater|writing|essay|portfolio|arts|첼로|피아노|음악|미술|연극|글쓰기/.test(text)) return {
    key: "arts",
    title: `${project.title || "Creative Reflection Portfolio"}`,
    subtitle: "예술 활동을 감수성, 표현력, 학교 문화 기여로 연결하는 포트폴리오 프로젝트",
    perspectiveLabel: "분석 관점",
    perspectives: [
      ["Creative Growth", "대표 작품이나 연주만 보여주지 않고, 선택 이유와 연습/제작 과정, 피드백 반영을 함께 기록합니다."],
      ["Reflection", "작품을 통해 학생이 어떤 감정, 생각, 관점을 표현하는지 글로 정리합니다."],
      ["Community Sharing", "공연, 전시, 봉사 연주, 학교 행사 참여 등 보딩스쿨 커뮤니티와 연결되는 장면을 만듭니다."],
      ["Portfolio Readiness", "제출 가능한 링크, 작품 설명, artist statement, 지도자 피드백을 정리합니다."]
    ],
    coreQuestion: "이 학생의 예술 활동은 어떤 생각과 감정을 표현하며, 학교 공동체 안에서 어떤 문화적 기여로 이어질 수 있는가?",
    deliverables: ["대표 작품/연주 3~5개", "Artist Statement", "연습/제작 Log", "Performance or Portfolio Link", "Teacher Feedback Sheet"],
    stages: ["대표 작품 후보 선정", "작품별 reflection 작성", "피드백 기준 설정", "중간 포트폴리오 정리", "공유/공연 기회 확보", "최종 포트폴리오 링크 완성"]
  };
  if (/service|leadership|community|volunteer|captain|president|봉사|리더|회장|주장|커뮤니티/.test(text)) return {
    key: "leadership",
    title: `${project.title || "Community Impact & Leadership Project"}`,
    subtitle: "관심과 실행력을 학교 공동체 기여로 바꾸는 리더십 프로젝트",
    perspectiveLabel: "분석 관점",
    perspectives: [
      ["Problem Definition", "봉사 시간이나 직책보다 학생이 발견한 문제와 그 문제를 왜 중요하게 보는지를 먼저 정리합니다."],
      ["Initiative Design", "작은 실행부터 시작해 참여자, 일정, 역할, 결과물을 명확히 설계합니다."],
      ["Impact Evidence", "참여자 수, 변화 사례, 피드백, 지속 가능성을 정리해 리더십의 실체를 보여줍니다."],
      ["Boarding Contribution", "보딩스쿨 안에서 같은 방식으로 어떤 클럽, 기숙사, 팀 문화에 기여할 수 있는지 연결합니다."]
    ],
    coreQuestion: "이 학생은 어떤 문제를 발견하고, 다른 사람과 함께 어떤 변화를 만들 수 있는가?",
    deliverables: ["Project Plan", "Execution Log", "Impact Summary", "Participant Feedback", "Leadership Reflection"],
    stages: ["문제 정의", "작은 파일럿 실행", "참여자/피드백 수집", "중간 개선", "결과 요약", "지원서용 leadership story 완성"]
  };
  return {
    key: "general",
    title: `${project.title || "Signature Project Portfolio"}`,
    subtitle: "학생의 핵심 활동을 하나의 입시 스토리로 묶는 포트폴리오 프로젝트",
    perspectiveLabel: "분석 관점",
    perspectives: [
      ["Core Interest", "활동명 뒤에 있는 학생의 관심과 질문을 선명하게 정리합니다."],
      ["Evidence", "과정, 결과물, 피드백, 변화 기록을 모아 단순 참여가 아니라 성장의 증거로 만듭니다."],
      ["Contribution", "학생 개인의 성과를 학교 공동체 안에서 활용 가능한 기여로 확장합니다."],
      ["Application Story", "Activity List, Essay, Interview, Recommendation에서 같은 이미지가 반복되도록 정리합니다."]
    ],
    coreQuestion: "이 학생의 핵심 활동은 어떤 학생 이미지를 만들고, 어떤 증거로 그 이미지를 설득할 수 있는가?",
    deliverables: ["Project Brief", "Evidence Log", "Final Output", "Feedback Sheet", "Application Story Notes"],
    stages: ["핵심 이미지 정의", "기존 증거 정리", "부족한 산출물 확인", "중간 결과물 제작", "피드백 반영", "지원서 활용 자료 완성"]
  };
}
function v2SignatureProposalTimeline(st = {}, archetype = {}) {
  const periods = v2ApplicationSemesterPlan(st);
  if (periods.length >= 3) {
    return periods.map((period, index) => ({
      label: period.label,
      tasks: index === 0
        ? ["핵심 질문과 최종 산출물 기준을 확정합니다.", "기존 활동 자료와 증거를 한 폴더에 정리합니다.", "주간 진행 기록 양식을 만듭니다."]
        : period.application
          ? ["지원서에 들어갈 활동 설명문과 인터뷰 답변을 완성합니다.", "최종 산출물 링크와 피드백 자료를 정리합니다.", "추천서 작성자에게 공유할 Evidence Sheet를 만듭니다."]
          : ["중간 산출물을 제작하고 피드백을 받습니다.", "부족한 객관적 증거를 보완합니다.", "관심학교 프로그램과 연결되는 문장을 작성합니다."]
    }));
  }
  return archetype.stages.map((stage, index) => ({ label: `Week ${index + 1}`, tasks: [stage] }));
}
function v2BuildSignatureProjectProposal(st = {}, project = {}, schools = []) {
  const p = v2NormalizeSignatureProject(project);
  const studentName = st.name || "학생";
  const sourceEcs = v2SignatureProjectSourceEcs(st, p);
  const archetype = v2SignatureProjectArchetype(p, sourceEcs);
  const schoolNames = (st.interests || []).map(x => x.school).filter(Boolean).slice(0, 3);
  const schoolText = schoolNames.length ? schoolNames.join(", ") : "관심 보딩스쿨";
  const activityText = (p.sourceActivityNames || []).length ? p.sourceActivityNames.join(", ") : v2ProjectActivityText(sourceEcs.map(ec => ({ name: v2EcName(ec), ec })));
  const targetGrade = [st.targetYear, st.targetGrade].filter(Boolean).join(" ") || st.target || "지원 목표";
  const purpose = p.academicTalent || `${studentName} 학생의 관심을 단순 활동명이 아니라 학업적으로 사고하고 결과물을 만드는 역량으로 보여주는 데 목적이 있습니다.`;
  const contribution = p.communityContribution || `${schoolText}에서 학생이 수업, 클럽, 팀, 기숙사 생활 안에서 어떤 방식으로 기여할 수 있는지를 보여주는 방향으로 설계합니다.`;
  const timeline = v2SignatureProposalTimeline(st, archetype);
  return {
    title: archetype.title,
    subtitle: archetype.subtitle,
    meta: `${studentName} · ${targetGrade} · ${activityText}`,
    sections: [
      {
        title: "1. 프로젝트 개요",
        body: `본 프로젝트는 ${studentName} 학생이 ${activityText} 활동을 바탕으로, 단순한 참여 이력이나 관심 분야를 넘어 실제 결과물로 설명할 수 있는 Signature Project를 완성하는 것을 목표로 합니다. ${p.bigIdea || ""}\n\n특히 ${schoolText}처럼 학업, 기숙사 생활, 클럽/팀 활동이 밀접하게 연결되는 보딩스쿨 환경에서는 학생이 무엇을 좋아하는지보다 그 관심을 어떻게 탐구하고, 어떤 결과물로 만들며, 학교 공동체 안에서 어떤 기여로 확장할 수 있는지가 중요합니다.`
      },
      {
        title: "2. 프로젝트 목적",
        body: `본 프로젝트의 목적은 ${studentName} 학생의 강점을 활동명이나 수상 실적만으로 설명하지 않고, 학업적 사고력, 자기주도성, 문제 해결력, 공동체 기여 가능성을 하나의 스토리로 묶는 데 있습니다.\n\n${purpose}\n\n따라서 이 프로젝트는 하나의 추가 활동이 아니라, 원서와 인터뷰에서 ${studentName} 학생을 기억하게 만드는 핵심 포트폴리오 역할을 해야 합니다.`
      },
      {
        title: "3. 핵심 질문",
        body: `본 프로젝트의 중심 질문은 다음과 같습니다.\n\n${archetype.coreQuestion}\n\n이 질문을 바탕으로 세부적으로는 다음을 탐구합니다.`,
        bullets: [
          `${studentName} 학생이 이 주제에 관심을 갖게 된 구체적 계기는 무엇인가?`,
          `현재 활동 기록에서 이미 증명된 강점은 무엇이며, 아직 부족한 증거는 무엇인가?`,
          `이 프로젝트가 ${schoolText}의 수업, 클럽, 팀 활동, 기숙사 생활과 어떻게 연결될 수 있는가?`,
          `지원서, 인터뷰, 추천서에서 이 프로젝트를 어떤 문장과 자료로 보여줄 것인가?`
        ]
      },
      {
        title: "4. 프로젝트 차별성",
        body: `이 프로젝트의 차별성은 ${activityText}를 단순 활동 목록에 넣는 데서 끝내지 않고, 학생이 직접 질문을 만들고 자료를 읽고 과정을 기록하며 최종 결과물까지 완성한다는 점입니다.\n\n${p.boardingFit || ""}\n\n입학사정관 입장에서는 활동 개수보다 학생이 어떤 문제를 오래 붙잡았는지, 그 과정에서 어떤 생각의 깊이가 생겼는지, 그리고 그 경험이 학교 공동체에 어떤 기여로 이어질 수 있는지가 더 중요합니다.`,
        bullets: [
          "활동명을 결과물과 사고 과정으로 전환합니다.",
          "학생의 관심을 보딩스쿨 생활 맥락과 연결합니다.",
          "추천서와 인터뷰에서 확인 가능한 Evidence Sheet를 남깁니다.",
          "지원 직전까지 업데이트 가능한 포트폴리오 구조를 만듭니다."
        ]
      },
      {
        title: "5. 프로젝트 진행 방식",
        body: `프로젝트는 약 6~8주 또는 남은 지원 학기 동안 진행하는 것을 권장합니다. 핵심은 한 번에 완성본을 만드는 것이 아니라, 매주 읽고 기록하고 피드백을 반영하는 과정을 남기는 것입니다.\n\n${studentName} 학생은 먼저 핵심 질문을 정리한 뒤, 기존 활동 자료를 Evidence Log로 옮기고, 중간 산출물을 만든 후 교사·코치·멘토의 피드백을 받아 최종 결과물로 발전시켜야 합니다.`,
        bullets: archetype.stages
      },
      {
        title: `6. ${archetype.perspectiveLabel}`,
        body: `${studentName} 학생의 프로젝트는 아래 관점으로 나누어 분석하면 훨씬 깊이 있게 읽힙니다.`,
        subsections: archetype.perspectives.map(([title, body]) => ({ title, body }))
      },
      {
        title: "7. 최종 결과물",
        body: `프로젝트 완료 후에는 단순 보고서 하나가 아니라 원서 과정에서 반복적으로 활용 가능한 자료 묶음이 필요합니다. 아래 결과물은 지원서, 인터뷰, 추천서, 보충자료에 각각 다른 방식으로 사용될 수 있습니다.`,
        bullets: archetype.deliverables
      },
      {
        title: "8. 입시 활용 방안",
        body: `본 프로젝트는 ${studentName} 학생의 Stage 2 전략보고서 안에서 핵심 스파이크로 활용됩니다. Activity List에서는 역할과 결과물을 압축해 보여주고, Essay에서는 이 주제를 왜 붙잡게 되었는지와 어떤 방식으로 성장했는지를 서술합니다. Interview에서는 프로젝트를 45초에서 1분 안에 설명할 수 있는 답변으로 정리하고, Recommendation에서는 교사나 멘토가 확인해 줄 수 있는 Evidence Sheet로 공유합니다.`,
        bullets: [
          "Activity List: 활동명보다 역할, 기간, 산출물, 영향력을 중심으로 기재합니다.",
          "Essay: 학생이 문제를 발견하고 사고를 확장한 장면을 중심으로 사용합니다.",
          "Interview: 관심 분야, 보딩스쿨 지원 이유, 공동체 기여 가능성을 연결합니다.",
          "Recommendation: 추천인이 학생의 성실성, 사고력, 피드백 수용력을 구체적으로 쓸 수 있도록 자료를 제공합니다.",
          "Supplement: 학교가 허용하는 경우 Research Brief, Portfolio Link, 발표자료를 보충자료로 활용합니다."
        ]
      },
      {
        title: "9. 기대 효과",
        body: `${studentName} 학생은 이 프로젝트를 통해 “활동을 많이 한 학생”이 아니라 “관심 분야를 깊이 있게 탐구하고, 결과물로 만들고, 학교 공동체에 적용할 수 있는 학생”으로 읽힐 수 있습니다.\n\n${contribution}`,
        bullets: [
          "학업적 호기심을 구체적인 탐구 과정으로 보여줄 수 있습니다.",
          "자료를 읽고 정리하며 자신의 생각을 발전시키는 학업 태도를 증명할 수 있습니다.",
          "보딩스쿨 환경에서 실제로 기여할 수 있는 학생 이미지를 만들 수 있습니다.",
          "원서, 인터뷰, 추천서에서 반복 사용할 수 있는 핵심 스토리를 확보할 수 있습니다."
        ]
      },
      {
        title: "10. 최종 목표",
        body: `최종 목표는 ${studentName} 학생이 단순히 “${activityText}를 한 학생”으로 보이는 것이 아니라, 그 활동을 통해 자신만의 질문을 만들고, 근거를 축적하고, 결과물을 완성하며, ${schoolText} 공동체 안에서 의미 있는 기여를 할 수 있는 학생으로 보이도록 만드는 것입니다.\n\n즉, 이 프로젝트는 하나의 활동을 추가하는 것이 아니라 ${studentName} 학생의 관심 분야, 학업 역량, 문제 해결력, 공동체 기여 가능성을 하나의 입시 스토리로 연결하는 포트폴리오입니다.`
      }
    ],
    timeline
  };
}
function v2ProjectActivityText(items = []) {
  const names = items.map(x => x?.name || v2EcName(x?.ec || x || {})).filter(Boolean);
  return names.length ? names.join(", ") : "핵심 활동";
}
function v2ProjectSchoolText(st = {}, schools = []) {
  const names = (st.interests || []).map(x => x.school).filter(Boolean).slice(0, 3);
  if (!names.length) return "관심 보딩스쿨";
  const matched = names.map(name => v2FindSchool(schools, name)).filter(Boolean);
  const hints = matched.flatMap(s => [s.programs, s.sports, s.arts, s.fit].filter(Boolean)).slice(0, 3);
  return hints.length ? `${names.join(", ")}의 ${hints.join(" / ")} 맥락` : names.join(", ");
}
function v2ProjectAcademicEvidence(st = {}) {
  const tests = (st.tests || []).filter(t => t.type || t.overall || t.total || t.percentile).slice(0, 3).map(t => `${t.type || "시험"} ${t.overall || t.total || t.score || ""}${t.percentile ? ` / ${t.percentile}%ile` : ""}`.trim());
  const transcriptCount = (st.transcripts || []).reduce((sum, term) => sum + ((term.subjects || []).filter(s => s.subjectName || s.grade).length), 0);
  const gpaTerms = (st.transcripts || []).filter(t => t.gpa || t.rank).slice(-3).map(t => `${t.year || ""} ${t.term || ""} GPA ${t.gpa || "미제공"}`.trim());
  const pieces = [];
  if (tests.length) pieces.push(`입력된 시험 근거는 ${tests.join(", ")}입니다.`);
  if (transcriptCount) pieces.push(`성적표에는 ${transcriptCount}개 과목의 원성적/코멘트가 누적되어 있어 학업 태도와 과목별 강약점을 함께 확인할 수 있습니다.`);
  if (gpaTerms.length) pieces.push(`최근 학기 기록은 ${gpaTerms.join(" / ")}로 정리됩니다.`);
  return pieces.length ? pieces.join(" ") : "현재 입력된 시험/성적표 근거가 제한적이므로, 프로젝트 안에서 학업적 사고 과정과 결과물을 직접 보여주는 증거를 함께 만들어야 합니다.";
}
v2ProjectRoadmapFromHook = function v2ProjectRoadmapFromHookDeep(st = {}, projectType = "", goalText = "") {
  const isResearch = /Research|STEM|Math|Academic|Diabetes/i.test(projectType);
  const isAthletic = /Athletic|Sports|Baseball|Ski/i.test(projectType);
  const isArts = /Arts|Cello|Music|Writing|Expression/i.test(projectType);
  return v2ApplicationSemesterPlan(st).map((period, index) => {
    const opening = index === 0;
    const application = period.application;
    return {
      period: period.label,
      focus: opening ? "프로젝트 주제와 최종 산출물의 기준을 먼저 정하고, 현재 활동 기록을 evidence log로 정리합니다." : application ? "지원서에 실제로 들어갈 문장, 활동 설명, 인터뷰 답변, 보충자료를 최종 정리합니다." : "중간 결과물을 만들고 외부 피드백 또는 객관적 검증 자료를 확보합니다.",
      deliverable: isResearch ? (opening ? "탐구 질문 2-3개, 참고자료 목록, 주간 연구노트 양식" : application ? "연구 요약문, 발표자료, 원서용 활동 설명, 인터뷰 스토리" : "중간 리서치 브리프, 문제 해결 노트, 교사/멘토 피드백") : isAthletic ? (opening ? "훈련 로그, 경기/기록 baseline, 코치 피드백 요청 계획" : application ? "기록 변화표, 코치 코멘트, 팀 기여 스토리, Activity List 문장" : "월별 훈련/경기 기록, 영상/사진 링크, 목표 기록 달성 점검") : isArts ? (opening ? "대표 작품 후보, 연습/제작 로그, 피드백 기준" : application ? "포트폴리오 링크, 작품 설명, 예술 활동을 설명하는 인터뷰 답변" : "중간 공연/작품/원고, 피드백 반영 기록, 제출 후보 정리") : (opening ? "프로젝트 계획서, 활동 기록 양식, 목표 결과물 기준" : application ? "지원서 문장, 인터뷰 답변, 보충자료 링크" : "중간 산출물, 피드백 기록, 다음 단계 계획"),
      checkpoint: application ? "지원서 반영 여부 확인" : goalText ? "목표 산출물과의 간격 점검" : "학기 말 담당자 리뷰"
    };
  });
};
v2SignatureProject = function v2SignatureProjectDeep(id, title, badge, theme, sourceActivities, projectType, st = {}, details = {}) {
  const activityText = v2ProjectActivityText(sourceActivities);
  const schoolText = v2ProjectSchoolText(st, details.schools || []);
  const project = {
    id,
    title,
    badge,
    theme,
    sourceActivities: sourceActivities.map(x => x?.ec?.activityId || x?.ec?.id || x?.name).filter(Boolean),
    sourceActivityNames: sourceActivities.map(x => x?.name).filter(Boolean),
    bigIdea: details.bigIdea || `${activityText}를 단순 활동 이력으로 남기지 않고, ${st.name || "학생"} 학생이 어떤 질문을 붙잡고 어떤 방식으로 결과물을 만들어 가는지를 보여주는 Signature Project로 발전시킵니다.`,
    boardingFit: details.boardingFit || `${schoolText}에서는 수업, 클럽, 팀 활동, 기숙사 생활이 서로 분리되어 보이지 않습니다. 이 프로젝트는 학생의 관심사를 학교 공동체 안에서 실제 기여로 옮길 수 있다는 점을 보여주는 데 초점을 둡니다.`,
    academicTalent: details.academicTalent || v2ProjectAcademicEvidence(st),
    communityContribution: details.communityContribution || "프로젝트의 최종 목표는 개인의 수상이나 기록에만 두지 않고, 같은 관심사를 가진 친구, 후배, 팀원, 학교 커뮤니티가 활용할 수 있는 자료나 경험으로 확장하는 것입니다.",
    currentEvidence: details.currentEvidence || `현재 근거는 ${activityText}입니다. 활동명보다 중요한 것은 기간, 주당 시간, 역할, 결과물, 피드백이 하나의 성장 과정으로 정리되는지입니다.`,
    targetOutput: details.targetOutput || "지원 직전까지 원서에 첨부하거나 인터뷰에서 설명할 수 있는 산출물 1개, evidence log, 담당 교사/코치에게 공유할 요약자료를 완성합니다.",
    semesterRoadmap: details.semesterRoadmap || v2ProjectRoadmapFromHook(st, projectType, details.targetOutput || ""),
    applicationUsage: details.applicationUsage || ["Activity List: 활동의 역할과 결과를 숫자와 산출물 중심으로 압축합니다.", "Essay: 어려운 질문을 어떻게 붙잡고 해결했는지 성장 장면으로 사용합니다.", "Interview: 왜 이 프로젝트가 학생다운지 45초 답변으로 정리합니다.", "Recommendation: 추천인이 확인해 줄 수 있는 evidence sheet로 제공합니다."],
    evidenceNeeded: details.evidenceNeeded || ["주간 진행 로그", "중간/최종 산출물", "교사·코치·멘토 피드백", "사진·영상·링크 등 확인 가능한 자료", "지원서용 활동 설명"],
    risks: details.risks || ["활동이 여러 개로 흩어져 보이면 학생의 핵심 이미지가 약해질 수 있습니다.", "산출물 없이 과정 설명만 남으면 보딩스쿨 입학사정관에게 깊이가 충분히 전달되지 않을 수 있습니다."],
    nextActions: details.nextActions || ["이번 주 안에 프로젝트 제목과 최종 산출물 기준을 확정합니다.", "기존 활동 기록을 evidence log로 옮겨 누락된 근거를 확인합니다.", "관심학교 프로그램과 연결되는 문장 후보를 2개 작성합니다."],
    generatedAt: new Date().toISOString(),
    manuallyEdited: false
  };
  return v2NormalizeSignatureProject(project);
};
v2GenerateSignatureProjects = function v2GenerateSignatureProjectsDeep(st = {}, schools = []) {
  const hook = v2BuildHookStrategy(st, schools);
  const insights = hook.activityInsights || [];
  const stem = insights.filter(x => x.domains.includes("STEM") || x.domains.includes("Academics"));
  const sports = insights.filter(x => x.domains.includes("Sports"));
  const arts = insights.filter(x => x.domains.includes("Arts"));
  const service = insights.filter(x => x.domains.includes("Community Service") || x.domains.includes("Leadership"));
  const text = insights.map(x => `${x.name} ${x.ec?.activityName || ""} ${x.ec?.note || ""}`).join(" ").toLowerCase();
  const schoolText = v2ProjectSchoolText(st, schools);
  const studentName = st.name || "학생";
  const hasDiabetes = /diabet|당뇨/.test(text);
  const hasBaseball = /baseball|야구/.test(text);
  const hasCello = /cello|첼로/.test(text);
  const projects = [];
  if (stem.length) {
    projects.push(v2SignatureProject(hasDiabetes ? "signature-diabetes-research" : "signature-academic-research", hasDiabetes ? "Children Diabetes Solution Research Portfolio" : `${stem[0].name} Academic Research Portfolio`, "Academic Research Spike", "cyan", stem.slice(0, 2), "Research / STEM", st, {
      schools,
      bigIdea: hasDiabetes ? `${studentName} 학생의 학업적 Hook은 '어린이 당뇨 문제를 실제 학교생활의 관점에서 이해하고 해결책을 설계하는 학생'으로 잡을 수 있습니다. 단순히 STEM 활동을 했다는 설명보다, 의학·생물·심리·학교생활을 연결해 실제 학생들이 겪는 문제를 구조화한다는 점이 훨씬 강하게 읽힙니다.` : `${studentName} 학생의 학업적 Hook은 ${stem[0].name}을 중심으로 '어려운 문제를 오래 붙잡고 자기 언어로 설명하는 학생'으로 발전시킬 수 있습니다. 대회명 자체보다 풀이 과정, 실패한 접근, 다시 설계한 방식이 입학사정관에게 더 선명한 증거가 됩니다.`,
      boardingFit: `${schoolText}에서는 지적 호기심이 교실 밖 클럽, 연구, 토론, peer tutoring으로 이어지는 학생을 좋게 봅니다. 이 프로젝트는 수업에서 배운 개념을 실제 문제로 확장하고, 기숙사 커뮤니티 안에서 친구들과 공유할 수 있는 지적 기여로 번역해야 합니다.`,
      academicTalent: `${v2ProjectAcademicEvidence(st)} 이 프로젝트에서는 학생이 자료를 읽고, 질문을 좁히고, 근거를 비교하고, 자신의 결론을 쓰는 과정을 남겨 학업적 재능을 직접 보여주는 것이 핵심입니다.`,
      communityContribution: hasDiabetes ? "최종 결과물은 본인 탐구에 그치지 않고, 당뇨를 가진 학생이 학교·스포츠·기숙사 생활에서 겪는 어려움을 교사, 코치, 또래가 이해할 수 있는 안내자료로 확장할 수 있습니다. 이렇게 만들면 학업적 재능이 공동체 기여로 이어집니다." : "최종 결과물은 문제풀이 노트나 리서치 브리프를 후배나 또래가 이해할 수 있는 설명 자료로 바꾸는 방향이 좋습니다. 보딩스쿨에서는 잘하는 학생보다 주변 학습 분위기를 끌어올리는 학생이 더 매력적으로 읽힙니다.",
      currentEvidence: `${v2ProjectActivityText(stem)} 활동이 이미 입력되어 있습니다. 다만 현재 단계에서는 활동명과 참여 사실만으로는 부족하므로, 어떤 질문을 다루었고 어떤 결과물 또는 피드백을 남겼는지까지 보강해야 합니다.`,
      targetOutput: hasDiabetes ? "지원 전까지 8-10페이지 리서치 브리프, 학생/교사용 1페이지 가이드, 발표 슬라이드, 전문가 또는 교사 피드백 기록을 완성하는 것을 목표로 합니다." : "지원 전까지 대표 문제풀이/탐구 포트폴리오, 설명 영상 또는 발표자료, 교사 피드백 기록을 완성하는 것을 목표로 합니다.",
      evidenceNeeded: ["탐구 질문과 참고자료 목록", "주간 research log", "중간 리서치 브리프", "교사/멘토 피드백", "최종 발표자료 또는 공유 가능한 가이드"],
      risks: ["활동명만 남으면 지적 호기심이 아니라 단순 대회 참여로 보일 수 있습니다.", "주제가 너무 넓으면 깊이가 약해지므로 한 가지 문제를 좁혀 끝까지 파고드는 구조가 필요합니다."],
      nextActions: ["이번 주에 핵심 질문 2개를 확정합니다.", "기존 활동에서 나온 결과물과 피드백을 한 폴더로 정리합니다.", "관심학교의 STEM/Research/Health 관련 프로그램과 연결되는 Why School 문장 후보를 작성합니다."]
    }));
  }
  if (hasBaseball || sports.length) {
    const base = sports.find(x => /baseball|야구/i.test(x.name)) || sports[0];
    projects.push(v2SignatureProject("signature-athletic-performance", hasBaseball && hasDiabetes ? "Baseball, Health, and Performance Growth Track" : `${base.name} Athletic Growth Track`, "Boarding Athlete Spike", "green", [base].filter(Boolean), "Athletic / Boarding Fit", st, {
      schools,
      bigIdea: hasBaseball && hasDiabetes ? `${studentName} 학생은 야구를 단순 스포츠 이력으로만 보여주기보다, 건강 관리와 경기력 향상을 함께 설계하는 자기관리형 학생으로 보여줄 수 있습니다. 훈련, 컨디션, 기록 변화를 연결하면 보딩스쿨 생활에서 요구되는 독립성과 회복탄력성이 선명해집니다.` : `${studentName} 학생은 ${base.name}을 통해 꾸준한 훈련, 팀 안에서의 역할, 경쟁 상황에서의 회복력을 보여줄 수 있습니다. 보딩스쿨에서는 스포츠가 실력뿐 아니라 생활 리듬과 공동체 적응력을 보여주는 근거가 됩니다.`,
      boardingFit: `${schoolText}에서는 팀 활동, 코치와의 관계, 시즌별 훈련 리듬이 기숙사 생활 적응과 직접 연결됩니다. 따라서 기록보다 '어떻게 훈련하고, 어떤 역할로 팀에 기여하며, 어려운 순간을 어떻게 회복했는지'를 보여주는 것이 중요합니다.`,
      academicTalent: "이 프로젝트의 학업적 포인트는 운동을 감각적으로만 설명하지 않고, 훈련 데이터, 경기 기록, 컨디션 변화, 피드백을 분석해 자신의 성장 방식을 설명하는 데 있습니다.",
      communityContribution: "팀 내에서 후배를 돕거나 훈련 루틴을 공유하고, 건강한 팀 문화를 만드는 방향으로 확장하면 athletic spike가 보딩스쿨 공동체 기여로 읽힙니다.",
      currentEvidence: `${base.name} 활동이 입력되어 있습니다. 현재는 주당 시간, 기간, 포지션, 수상/경기 기록, 코치 피드백이 얼마나 정리되어 있는지가 중요합니다.`,
      targetOutput: "지원 전까지 월별 훈련 로그, 기록 변화표, 코치 피드백, 팀 기여 사례 3개, 인터뷰용 athletic story를 완성합니다.",
      evidenceNeeded: ["월별 훈련 로그", "경기/기록 변화표", "코치 피드백", "사진·영상·대회 기록 링크", "팀 기여 사례 3개"],
      risks: ["스포츠가 취미처럼 보이면 강한 spike가 되기 어렵습니다.", "기록이나 피드백 없이 노력만 설명하면 객관성이 약해질 수 있습니다."],
      nextActions: ["최근 3개월 훈련과 경기 기록을 정리합니다.", "코치에게 받을 수 있는 피드백 항목을 정합니다.", "스포츠 경험을 보딩스쿨 생활 적응력으로 연결하는 인터뷰 답변을 작성합니다."]
    }));
  }
  if (hasCello || arts.length) {
    const base = arts.find(x => /cello|첼로/i.test(x.name)) || arts[0];
    projects.push(v2SignatureProject("signature-arts-portfolio", hasCello ? "Cello Reflection and Community Performance Portfolio" : `${base.name} Creative Portfolio`, "Arts Portfolio", "purple", [base].filter(Boolean), "Arts / Expression", st, {
      schools,
      bigIdea: `${studentName} 학생의 예술 활동은 '잘 연주하거나 만든다'에서 끝나면 약합니다. 작품을 선택한 이유, 연습 과정, 피드백을 반영한 변화, 관객 또는 공동체와 만나는 순간까지 정리하면 학생의 감정 표현력과 성찰력이 훨씬 선명해집니다.`,
      boardingFit: `${schoolText}의 공연, 앙상블, 예술 클럽, chapel/community event 맥락과 연결하면 예술 활동이 개인 포트폴리오를 넘어 학교 문화에 기여할 수 있는 근거가 됩니다.`,
      academicTalent: "예술 포트폴리오에서도 학업적 태도는 드러납니다. 작품 해석, 연습 계획, 피드백 반영, 자기평가를 기록하면 분석력과 자기주도성이 함께 보입니다.",
      communityContribution: "대표 작품을 학교 행사, 지역 커뮤니티, 후배 멘토링, 작은 연주회 또는 디지털 포트폴리오 형태로 공유하면 예술성이 공동체 경험으로 확장됩니다.",
      currentEvidence: `${base.name} 활동이 입력되어 있습니다. 현재 활동 기간과 결과물은 출발점이지만, 대표 작품과 성장 과정이 함께 정리되어야 합니다.`,
      targetOutput: "지원 전까지 대표 작품 3-5개, 연습/제작 로그, 피드백 반영 기록, 포트폴리오 링크, 작품별 3문장 설명을 완성합니다.",
      evidenceNeeded: ["대표 작품 3-5개", "연습/제작 로그", "공연·전시·제출 기록", "지도자 피드백", "포트폴리오 링크"],
      risks: ["작품만 나열하면 학생의 생각과 성장이 보이지 않을 수 있습니다.", "학교 공동체와 연결되지 않으면 보딩스쿨 fit 근거가 약해집니다."],
      nextActions: ["대표 작품 후보를 고르고 각 작품의 선택 이유를 씁니다.", "연습/제작 과정에서 받은 피드백을 정리합니다.", "관심학교 예술 프로그램과 연결되는 Why School 문장을 만듭니다."]
    }));
  }
  if (service.length || projects.length < 3) {
    const base = service[0] || insights[0];
    projects.push(v2SignatureProject("signature-community-bridge", base ? `${base.name} Community Contribution Project` : "Community Contribution Bridge Project", "Contribution Spike", "blue", base ? [base] : insights.slice(0, 2), "Community Contribution", st, {
      schools,
      bigIdea: `${studentName} 학생의 활동을 보딩스쿨 공동체 기여로 번역하는 프로젝트입니다. 입학사정관은 학생이 무엇을 좋아하는지만 보지 않고, 그 관심사가 학교 안에서 어떤 긍정적 변화를 만들 수 있는지를 보고 싶어 합니다.`,
      boardingFit: `${schoolText}에서는 기숙사, 클럽, 팀, 수업 안에서 스스로 역할을 찾는 태도가 중요합니다. 이 프로젝트는 학생의 핵심 관심사를 실제 공동체 경험으로 연결하는 다리 역할을 합니다.`,
      academicTalent: "관심사를 조사하고, 필요한 사람을 찾고, 작은 실행을 설계하고, 결과를 평가하는 과정 자체가 문제 해결력과 실행력을 보여줍니다.",
      communityContribution: "최종적으로는 후배용 가이드, 팀 루틴, 워크숍, 작은 캠페인, 발표자료처럼 다른 사람이 실제로 활용할 수 있는 결과물을 남기는 것이 좋습니다.",
      currentEvidence: base ? `${base.name} 활동이 출발점입니다. 아직 공동체 기여의 형태가 약하다면 이 프로젝트에서 대상을 좁히고 결과물을 만들어야 합니다.` : "현재 입력된 활동이 제한적이므로, 기존 관심사 중 하나를 골라 학교 공동체에서 실행 가능한 작은 프로젝트로 설계해야 합니다.",
      targetOutput: "지원 전까지 대상자, 문제 정의, 실행 기록, 결과물, 피드백을 포함한 1페이지 impact brief를 완성합니다.",
      evidenceNeeded: ["문제 정의 1문장", "실행 대상과 일정", "결과물 링크 또는 사진", "참여자/지도자 피드백", "impact brief"],
      risks: ["봉사 시간처럼 보이면 학생만의 hook이 약해집니다.", "대상이 너무 넓으면 실제 변화가 흐릿해질 수 있습니다."],
      nextActions: ["도움이 필요한 대상을 한 그룹으로 좁힙니다.", "4주 안에 실행 가능한 작은 결과물을 정합니다.", "실행 후 피드백을 받을 사람을 미리 정합니다."]
    }));
  }
  const schoolNames = (st.interests || []).map(x => x.school).filter(Boolean).slice(0, 3);
  if (schoolNames.length && projects.length < 4) {
    projects.push(v2SignatureProject("signature-school-fit-bridge", `${schoolNames[0]} Fit Bridge Project`, "School Fit Project", "sky", insights.slice(0, 3), "School Fit Bridge", st, {
      schools,
      bigIdea: `${studentName} 학생의 핵심 활동을 ${schoolNames.join(", ")}의 실제 프로그램 언어로 번역하는 프로젝트입니다. 같은 활동이라도 학교마다 의미가 다르게 읽히므로, 관심학교별로 어떤 수업·팀·클럽·기숙사 문화와 연결되는지 정리해야 합니다.`,
      boardingFit: "보딩스쿨 fit은 학교 이름을 많이 아는 것이 아니라, 학생의 활동이 그 학교 안에서 어떻게 계속될 수 있는지를 구체적으로 보여주는 것입니다.",
      academicTalent: v2ProjectAcademicEvidence(st),
      communityContribution: "관심학교별로 학생이 참여하고 싶은 프로그램과 기여 가능한 장면을 정리하면 Why School, 인터뷰, 학교별 supplement가 훨씬 설득력 있게 됩니다.",
      currentEvidence: `${v2ProjectActivityText(insights)} 활동을 바탕으로 학교별 연결 지점을 만들 수 있습니다.`,
      targetOutput: "관심학교별 fit note, Why School 문장 2개, 인터뷰 답변 1개, 보완 액션 1개씩을 완성합니다.",
      evidenceNeeded: ["학교별 프로그램 조사표", "Why School 문장", "인터뷰 답변", "학교별 보완 액션"],
      risks: ["학교별 차이가 드러나지 않으면 지원서가 일반적으로 보일 수 있습니다."],
      nextActions: ["관심학교별 프로그램 2개씩을 고릅니다.", "각 프로그램과 연결되는 학생 활동 근거를 붙입니다.", "학교별로 보완해야 할 증거를 1개씩 정합니다."]
    }));
  }
  return projects.slice(0, 4);
};
function v2SignatureIdeaBlock({ what, how, intent, project }) {
  return [
    `무엇을 할 것인가: ${what}`,
    `어떻게 실행할 것인가: ${how}`,
    `어떤 의도인가: ${intent}`,
    `어떤 프로젝트로 정의되는가: ${project}`
  ].join("\n\n");
}
v2GenerateSignatureProjects = function v2GenerateSignatureProjectsDepthV2(st = {}, schools = []) {
  const hook = v2BuildHookStrategy(st, schools);
  const insights = hook.activityInsights || [];
  const stem = insights.filter(x => x.domains.includes("STEM") || x.domains.includes("Academics"));
  const sports = insights.filter(x => x.domains.includes("Sports"));
  const arts = insights.filter(x => x.domains.includes("Arts"));
  const service = insights.filter(x => x.domains.includes("Community Service") || x.domains.includes("Leadership"));
  const allText = insights.map(x => `${x.name} ${x.ec?.activityName || ""} ${x.ec?.note || ""} ${x.ec?.impact || ""}`).join(" ").toLowerCase();
  const studentName = st.name || "학생";
  const schoolText = v2ProjectSchoolText(st, schools);
  const hasDiabetes = /diabet|diabetes|diabetic|당뇨/.test(allText);
  const hasBaseball = /baseball|야구/.test(allText);
  const hasCello = /cello|첼로/.test(allText);
  const projects = [];
  if (stem.length) {
    const title = hasDiabetes ? "Pediatric Diabetes School-Life Research Portfolio" : `${stem[0].name} Academic Research Portfolio`;
    projects.push(v2SignatureProject(hasDiabetes ? "signature-diabetes-research-v2" : "signature-academic-research-v2", title, "Academic Research Spike", "cyan", stem.slice(0, 2), "Research / STEM", st, {
      schools,
      bigIdea: hasDiabetes ? v2SignatureIdeaBlock({
        what: `${studentName} 학생이 소아 당뇨를 가진 학생들이 학교생활에서 실제로 겪는 어려움을 조사하고, 이를 보딩스쿨 환경에서 어떻게 지원할 수 있는지 제안하는 리서치 포트폴리오를 만듭니다. 단순히 '당뇨에 관심이 있다'가 아니라, 혈당 관리, 식사, 운동, 친구 관계, 수업 집중, 정서적 부담이 서로 어떻게 연결되는지를 학생의 언어로 구조화하는 프로젝트입니다.`,
        how: "매주 논문, 기사, 병원/공공기관 자료, 학교 보건 관련 자료를 1-2개씩 읽고 evidence log를 작성합니다. 각 자료마다 핵심 내용, 기존 해결책의 한계, 학생이 제안할 수 있는 개선 방향을 정리합니다. 이후 문제를 Biology, Psychology, Public Health, Boarding Life의 네 관점으로 나누어 분석하고, 최종적으로 5-8페이지 research brief와 5분 발표자료로 정리합니다.",
        intent: "이 프로젝트의 의도는 STEM 역량을 단순 대회나 활동명으로 보여주는 것이 아니라, 실제 사회 문제를 학업적 탐구로 이해하고 해결 방향을 설계할 수 있는 학생이라는 이미지를 만드는 것입니다. 보딩스쿨은 수업에서 질문하고, 자료를 읽고, 토론하고, 배운 것을 공동체 안에서 적용하는 학생을 선호합니다. 따라서 이 프로젝트는 학업 준비도와 커뮤니티 기여 가능성을 동시에 보여주는 핵심 증거가 됩니다.",
        project: "최종 결과물은 Pediatric Diabetes School-Life Research Portfolio입니다. 구성은 research question, literature/evidence log, school-life problem map, proposed support model, bibliography, teacher/mentor feedback로 잡습니다. 원서에서는 Activity List, STEM supplement, Interview, 추천서 evidence sheet에 모두 사용할 수 있습니다."
      }) : v2SignatureIdeaBlock({
        what: `${studentName} 학생이 ${stem[0].name}을 중심으로 어려운 문제를 어떻게 정의하고, 어떤 방식으로 접근하고, 실패한 풀이를 어떻게 수정해 결과물로 발전시키는지를 보여주는 학업 포트폴리오를 만듭니다.`,
        how: "대표 문제나 탐구 주제를 정하고, 매주 접근 과정과 풀이/조사 과정을 evidence log로 남깁니다. 단순 정답이나 수상 결과보다 질문 설정, 시도한 방법, 막힌 지점, 수정한 전략, 최종 설명 방식을 기록합니다.",
        intent: "의도는 대회 참여 사실을 나열하는 것이 아니라, 학생의 사고력과 자기주도적 학습 태도를 보딩스쿨이 이해할 수 있는 증거로 바꾸는 것입니다.",
        project: "최종 결과물은 Academic Research Portfolio입니다. 대표 문제풀이/탐구 노트, 발표자료, 교사 피드백, 원서용 활동 설명을 포함합니다."
      }),
      boardingFit: `${schoolText}에서는 지적 호기심이 교실 안에만 머무르지 않고 클럽, 연구, 토론, peer tutoring, 기숙사 대화로 이어지는지를 중요하게 봅니다. 이 프로젝트는 학생이 배운 지식을 실제 생활 문제에 적용하고, 그 결과를 친구와 교사에게 설명할 수 있다는 점을 보여줍니다.`,
      academicTalent: `${v2ProjectAcademicEvidence(st)} 특히 이 프로젝트는 자료 독해, 문제 정의, 근거 비교, 결론 작성, 발표 능력을 모두 보여주므로 학업적 재능을 구체적으로 증명하는 축이 됩니다.`,
      communityContribution: hasDiabetes ? "리서치가 개인 탐구에서 끝나지 않도록, 다음 단계에서는 학생/교사/코치/기숙사 어드바이저가 실제로 참고할 수 있는 안내자료로 확장합니다. 이렇게 해야 '똑똑한 학생'을 넘어 배운 것을 공동체에 환원하는 학생으로 읽힙니다." : "학업 포트폴리오를 후배나 또래가 이해할 수 있는 설명 자료로 바꾸면, 학생의 학업 역량이 공동체 안에서의 지적 기여로 이어집니다.",
      currentEvidence: `${v2ProjectActivityText(stem)} 활동이 현재 근거입니다. 다만 활동명만으로는 충분하지 않으므로, 학생이 어떤 질문을 붙잡았고 어떤 자료를 읽었으며 어떤 결론에 도달했는지를 보여주는 기록이 필요합니다.`,
      targetOutput: hasDiabetes ? "5-8페이지 research brief, 5분 발표자료, 참고문헌 10개 이상, 학생/교사용 1페이지 요약 가이드, 가능하면 보건교사·생명과학 교사·의료/보건 멘토 피드백 1회 이상을 목표로 합니다." : "대표 탐구 포트폴리오, 설명 자료, 발표자료, 교사 피드백, 원서용 활동 설명을 목표로 합니다.",
      evidenceNeeded: ["Research question 2-3개", "주간 evidence log", "문제 정의와 기존 해결책의 한계", "최종 research brief", "발표자료", "교사/멘토 피드백"],
      nextActions: ["핵심 질문을 2-3개로 좁힙니다.", "자료 10개 수집 계획을 세웁니다.", "evidence log 양식을 만들고 이번 주부터 기록합니다.", "피드백을 받을 교사/멘토 후보를 정합니다."]
    }));
  }
  if (hasDiabetes) {
    projects.push(v2SignatureProject("signature-diabetes-toolkit-v2", "Diabetes-Aware Boarding Community Toolkit", "Community Health Contribution", "blue", stem.slice(0, 2), "Community Health Toolkit", st, {
      schools,
      bigIdea: v2SignatureIdeaBlock({
        what: "첫 번째 리서치 프로젝트를 실제 공동체 기여로 바꾸는 프로젝트입니다. 소아 당뇨를 가진 학생이 보딩스쿨에서 더 안전하고 자연스럽게 생활할 수 있도록 학생, 친구, 교사, 코치, 기숙사 어드바이저가 각각 참고할 수 있는 간단한 toolkit을 만듭니다.",
        how: "리서치에서 정리한 내용을 바탕으로 대상별 자료를 나눕니다. 학생용에는 도움 요청 방법과 자기관리 체크리스트, 친구용에는 오해를 줄이고 자연스럽게 도울 수 있는 행동, 교사용에는 수업·시험·체육 상황에서의 배려 포인트, 코치/기숙사용에는 운동 전후와 야간 생활에서의 기본 체크 포인트를 넣습니다. 가능하면 PDF, Notion 페이지, 5분 발표자료, 1회 awareness session으로 실행합니다.",
        intent: "의도는 '건강 주제를 조사한 학생'에서 끝나는 것이 아니라, 배운 것을 다른 사람에게 전달하고 학교 공동체가 실제로 사용할 수 있는 자료로 바꾸는 것입니다. 이는 보딩스쿨이 중요하게 보는 empathy, initiative, maturity, community contribution을 직접 보여줍니다.",
        project: "최종 결과물은 Diabetes-Aware Boarding Community Toolkit입니다. 4종 PDF toolkit, quick guide, 발표 슬라이드, 피드백 설문, 참여자 수, 담당 교사 코멘트를 evidence로 남깁니다."
      }),
      boardingFit: "보딩스쿨은 수업만이 아니라 식사, 운동, 기숙사, 주말 활동이 모두 연결된 생활 공동체입니다. 이 프로젝트는 학생이 보딩스쿨 환경을 이해하고, 그 안에서 다른 학생이 더 안전하고 편안하게 생활하도록 기여할 수 있다는 점을 보여줍니다.",
      academicTalent: "리서치 내용을 대상별로 재구성해야 하므로 정보 선별력, 설명력, 청중에 맞춘 커뮤니케이션 능력이 드러납니다. 이는 학업적 이해를 실제 적용으로 옮기는 능력입니다.",
      communityContribution: "이 프로젝트의 핵심은 contribution입니다. 지식을 혼자 갖고 있는 학생이 아니라, 학교 공동체가 활용할 수 있도록 번역하고 나누는 학생으로 보이게 합니다.",
      currentEvidence: "현재 STEM/health 관련 활동이 있다면 이를 출발점으로 삼고, 아직 실행 증거가 부족하다면 toolkit 초안, 피드백 설문, 발표 기록을 새로 만들어야 합니다.",
      targetOutput: "학생용·친구용·교사용·코치/기숙사용 toolkit, 1페이지 quick guide, 5분 발표자료, awareness session 1회, 피드백 설문 결과를 목표로 합니다.",
      evidenceNeeded: ["Toolkit 링크/PDF", "발표 사진 또는 화면 캡처", "피드백 설문", "참여 인원", "담당 교사 코멘트"],
      nextActions: ["리서치 내용을 대상별로 분류합니다.", "학생용 quick guide부터 초안을 만듭니다.", "발표 또는 공유할 수 있는 교내/외부 채널을 찾습니다.", "피드백 설문 문항을 만듭니다."]
    }));
  }
  if (hasBaseball || sports.length) {
    const base = sports.find(x => /baseball|야구/i.test(x.name)) || sports[0];
    projects.push(v2SignatureProject("signature-baseball-performance-v2", hasBaseball && hasDiabetes ? "Baseball, Blood Sugar, and Performance" : `${base.name} Performance & Team Culture Log`, "Boarding Athlete Spike", "green", [base].filter(Boolean), "Athletic / Boarding Fit", st, {
      schools,
      bigIdea: v2SignatureIdeaBlock({
        what: hasBaseball && hasDiabetes ? "야구를 단순 스포츠 활동이 아니라 운동, 에너지 관리, 팀워크, 건강 인식이 연결되는 보딩스쿨형 athletic project로 만듭니다." : `${base.name} 활동을 단순 참여 기록이 아니라 훈련, 자기관리, 팀 기여, 회복력을 보여주는 athletic growth project로 만듭니다.`,
        how: "주간 훈련 시간, 기술 목표, 경기 기록, 컨디션 변화, 코치 피드백, 팀 안에서 맡은 역할을 기록합니다. 가능하면 기록 변화표, 훈련 로그, 코치 코멘트, 짧은 highlight 영상 또는 경기/대회 기록 링크를 함께 정리합니다.",
        intent: "의도는 스포츠 실력만 보여주는 것이 아니라 보딩스쿨 생활에서 중요한 discipline, resilience, teamwork, coachability를 증명하는 것입니다. 특히 팀 스포츠는 기숙사와 팀 환경에서 이 학생이 어떻게 적응하고 기여할지를 보여주는 좋은 자료입니다.",
        project: hasBaseball && hasDiabetes ? "최종 결과물은 Baseball, Blood Sugar, and Performance입니다. 운동과 건강 관리의 연결, 팀 내 안전한 참여 문화, 훈련 로그, 코치 피드백을 묶어 athletic profile로 정리합니다." : "최종 결과물은 Athletic Performance & Team Culture Log입니다. 훈련 로그, 기록 변화, 팀 기여 사례, 코치 피드백, 인터뷰용 athletic story를 포함합니다."
      }),
      boardingFit: `${schoolText}에서는 스포츠가 실력뿐 아니라 생활 리듬, 코치와의 관계, 팀 안에서의 책임감, 시즌별 자기관리를 보여주는 근거가 됩니다. 이 프로젝트는 학생이 보딩스쿨 팀 환경에서 성실하게 훈련하고 공동체에 기여할 수 있음을 보여줍니다.`,
      academicTalent: "훈련 데이터를 기록하고 변화 원인을 분석하는 과정은 자기관찰력과 분석력을 보여줍니다. 운동 경험을 숫자, 피드백, 성장 기록으로 정리하면 단순 활동보다 훨씬 설득력 있게 읽힙니다.",
      communityContribution: "팀 안에서 후배를 돕거나 안전한 훈련 루틴을 공유하고, 코치 피드백을 바탕으로 팀 문화에 기여하는 방향으로 확장합니다.",
      currentEvidence: `${base.name} 활동이 현재 근거입니다. 주당 시간, 기간, 포지션, 경기/대회 기록, 코치 피드백이 정리될수록 강해집니다.`,
      targetOutput: "월별 훈련 로그, 기록 변화표, 코치 피드백, 팀 기여 사례 3개, 가능하면 영상/사진 링크, Activity List 문장, 인터뷰용 45초 답변을 목표로 합니다.",
      evidenceNeeded: ["훈련 로그", "기록 변화표", "코치 피드백", "경기/대회 기록", "팀 기여 사례", "영상/사진 링크"],
      nextActions: ["최근 3개월 훈련 기록을 정리합니다.", "코치에게 받을 피드백 항목을 정합니다.", "팀 안에서 맡은 역할과 변화 사례를 3개 작성합니다."]
    }));
  }
  if (hasCello || arts.length) {
    const base = arts.find(x => /cello|첼로/i.test(x.name)) || arts[0];
    projects.push(v2SignatureProject("signature-cello-reflection-v2", hasCello ? "Cello Reflection Portfolio: Science, Care, and Expression" : `${base.name} Reflection Portfolio`, "Arts / Reflection Spike", "purple", [base].filter(Boolean), "Arts / Expression", st, {
      schools,
      bigIdea: v2SignatureIdeaBlock({
        what: `${base.name}을 학생의 정서적 깊이와 표현력을 보여주는 보완 축으로 만듭니다. STEM이나 스포츠가 문제 해결력과 규율을 보여준다면, 이 프로젝트는 학생이 자신의 경험과 감정을 어떻게 해석하고 표현하는지를 보여줍니다.`,
        how: "대표 작품 3-5개를 고르고, 각 작품에 대해 선택 이유, 연습 과정, 어려웠던 부분, 피드백 반영, 최종 연주/작품 링크를 정리합니다. 가능하면 작은 공연, 봉사 연주, 학교 행사 참여, 지도자 피드백을 함께 남깁니다.",
        intent: "의도는 학생을 한 분야만 강한 학생으로 보이지 않게 하는 것입니다. 보딩스쿨은 학업, 활동, 공동체 문화의 균형을 보기 때문에 예술 활동은 학생의 감수성, 꾸준함, 문화적 기여 가능성을 보완해 줍니다.",
        project: "최종 결과물은 Reflection Portfolio입니다. 3-5개 작품/연주 링크, 곡별 reflection, 지도자 피드백, artist statement, 공연/봉사 기록을 포함합니다."
      }),
      boardingFit: `${schoolText}에서는 공연, chapel, assembly, house event, arts club처럼 공동체 문화에 기여할 수 있는 장면이 많습니다. 이 프로젝트는 학생이 조용하지만 분명한 방식으로 학교 문화에 기여할 수 있음을 보여줍니다.`,
      academicTalent: "작품 해석, 연습 계획, 피드백 반영, 자기평가를 기록하면 예술 활동 안에서도 분석력과 자기주도성이 드러납니다.",
      communityContribution: "작은 공연, 봉사 연주, 학교 행사 참여, 후배 멘토링 등으로 연결하면 예술 활동이 개인 포트폴리오를 넘어 공동체 기여가 됩니다.",
      currentEvidence: `${base.name} 활동이 현재 근거입니다. 대표 작품과 성장 과정, 피드백 기록이 함께 필요합니다.`,
      targetOutput: "대표 작품 3-5개, 곡별 reflection, 연습 로그, 피드백 반영 기록, 공연/봉사 기록, artist statement를 목표로 합니다.",
      evidenceNeeded: ["대표 작품/연주 링크", "곡별 reflection", "연습 로그", "지도자 피드백", "공연/봉사 기록", "artist statement"],
      nextActions: ["대표 작품 후보 3-5개를 고릅니다.", "각 작품의 선택 이유를 씁니다.", "지도자 피드백을 받을 일정을 정합니다."]
    }));
  }
  if (!projects.length || projects.length < 3) {
    const base = service[0] || insights[0];
    projects.push(v2SignatureProject("signature-community-builder-v2", "Balanced Community Builder Project", "Community Builder", "blue", base ? [base] : insights.slice(0, 2), "Community Builder", st, {
      schools,
      bigIdea: v2SignatureIdeaBlock({
        what: `${studentName} 학생의 여러 활동을 하나의 학생 이미지로 묶는 프로젝트입니다. 목표 이미지는 문제 해결력, 팀워크, 표현력을 모두 가진 균형형 커뮤니티 빌더입니다.`,
        how: "핵심 활동 2-3개를 골라 각각이 보여주는 역량을 정리하고, 그 역량이 학교 공동체 안에서 어떤 기여로 이어질 수 있는지 사례와 evidence를 만듭니다.",
        intent: "의도는 활동 개수를 많이 보여주는 것이 아니라, 입학사정관이 학생을 한 문장으로 기억하게 만드는 것입니다.",
        project: "최종 결과물은 학생 이미지 맵, Activity List 우선순위, Essay/Interview 소재, 추천서 evidence sheet입니다."
      }),
      boardingFit: "보딩스쿨은 균형 있는 학생을 좋아하지만, 균형이 흐릿하게 보이면 장점이 약해집니다. 따라서 여러 활동을 하나의 이미지로 묶어야 합니다.",
      academicTalent: v2ProjectAcademicEvidence(st),
      communityContribution: "학생의 강점을 팀, 클럽, 수업, 기숙사 생활에서 어떤 기여로 바꿀지 정리합니다.",
      currentEvidence: `${v2ProjectActivityText(insights)} 활동이 현재 근거입니다.`,
      targetOutput: "학생 이미지 맵, 핵심 활동 3개 evidence sheet, 인터뷰 30초 답변, 추천서 요청용 요약자료를 목표로 합니다.",
      evidenceNeeded: ["핵심 활동별 evidence", "학생 이미지 맵", "인터뷰 답변", "추천서 evidence sheet"],
      nextActions: ["핵심 활동 3개를 확정합니다.", "각 활동이 보여주는 역량을 한 문장으로 씁니다.", "공통 Hook 문장을 작성합니다."]
    }));
  }
  return projects.slice(0, 4);
};
function v2SchoolFitEngine(st = {}, schools = []) {
  const evaluation = v2BuildEvaluationResult(st, schools);
  const core = v2CoreEcStrategyEngine(st);
  const hook = v2StudentHookEngine(st, schools);
  const recommendations = st.recommendations || [];
  return (st.interests || []).filter(x => x.school).map(interest => {
    const school = v2FindSchool(schools, interest.school) || { name: interest.school };
    const prediction = evaluation.interestPredictions.find(p => p.school.name === school.name) || v2LegacyPredictions(st, [school])[0];
    const testGaps = v2TestGapEngine(st, [school])[0]?.gaps || [];
    const req = v2NormalizeEnglishRequirements(school);
    const programText = [school.programs, school.sports, school.arts].filter(Boolean).join(" / ");
    const matchedPrograms = core.filter(ec => programText.toLowerCase().includes(String(ec.activityName || "").split(" ")[0].toLowerCase()) || programText.toLowerCase().includes(String(ec.category || "").toLowerCase()));
    const risks = [];
    if (prediction && /Dream|Goal|Below|Unlikely/i.test(prediction.category)) risks.push("현재 점수 기준으로는 도전 구간에 가까우므로 시험·성적·Hook 근거를 더 강하게 보완해야 합니다.");
    testGaps.filter(g => Number(g.gapToCompetitive) > 0).slice(0, 2).forEach(g => risks.push(`${g.type}는 경쟁력 있는 목표까지 약 ${g.gapToCompetitive}점 보완이 필요합니다.`));
    if (!matchedPrograms.length) risks.push("학생의 핵심 활동과 학교 프로그램 연결이 아직 명확하지 않습니다.");
    if (!recommendations.length) risks.push("추천서 후보자 데이터가 부족해 학교별 설득 근거가 약할 수 있습니다.");
    return {
      school: school.name,
      category: prediction?.category || "검토 필요",
      reasonFromUser: interest.reason || interest.note || "",
      schoolValues: school.fit || school.interview || "학업 적합도, 보딩 준비도, 공동체 기여 가능성을 함께 봐야 합니다.",
      connectedPrograms: matchedPrograms.length ? matchedPrograms.map(x => `${x.activityName} ↔ ${school.programs || school.sports || school.arts || "학교 프로그램"}`) : [`${school.name}의 ${school.programs || school.sports || school.arts || "주요 프로그램"}과 학생의 핵심 활동을 더 구체적으로 연결해야 합니다.`],
      riskFactors: risks.length ? risks : ["현재 입력 기준으로 큰 단일 리스크보다는 학교별 에세이와 인터뷰 완성도가 중요합니다."],
      admissionConditions: `${school.name} 지원에서는 ${req.ssatCompetitive ? `SSAT ${req.ssatCompetitive}+ 수준` : "학교별 시험 기준"}과 ${req.toeflCompetitive ? `TOEFL ${req.toeflCompetitive}+ 또는 이에 준하는 영어 준비도` : "영어 준비도"}를 목표로 두고, ${hook.character}라는 학생 이미지를 추천서와 에세이에서 일관되게 보여주는 것이 중요합니다.`,
      strategyPoint: `${interest.reason ? `관심학교 이유로 입력된 "${interest.reason}"을 출발점으로 삼되, ` : ""}${school.interview || "Why School, 공동체 기여, 학업 호기심"}를 학생의 핵심 EC와 연결해 인터뷰/에세이 소재로 정리해야 합니다.`,
      requiredImprovements: risks.slice(0, 3)
    };
  });
}
function v2RecommendationStrategyEngine(st = {}, schools = []) {
  const recs = st.recommendations || [];
  const rubrics = v2ClientRubrics(st);
  const academics = rubrics.find(r => r.key === "academics")?.score || 0;
  const core = v2CoreEcStrategyEngine(st);
  const schoolFits = v2SchoolFitEngine(st, schools);
  const rows = recs.map((r, i) => {
    const role = r.role === "기타" ? r.roleOther : r.role;
    const priority = /Math|English|Science|History|Teacher/i.test(role || "") && academics < 85 ? 1 : r.specialtyRecommendation === "Yes" ? 2 : i + 3;
    const strategicRole = /Coach/i.test(role || "") ? "핵심 EC의 지속성과 훈련 태도를 증명하는 추천서" : /Teacher|Math|English|Science|History/i.test(role || "") ? "학업 준비도와 수업 태도를 증명하는 추천서" : /Dorm|Counselor/i.test(role || "") ? "보딩 생활 적합도와 성숙도를 보여주는 추천서" : "학생의 특정 강점을 보완적으로 설명하는 추천서";
    const gaps = [];
    if (!r.evidence) gaps.push("추천서에 들어갈 구체 증거가 아직 부족합니다.");
    if (!r.currentStrength || !r.targetStrength) gaps.push("현재/목표 관계 강도를 입력하면 관리 액션이 더 명확해집니다.");
    if (r.currentTeacher !== "Yes" && /Teacher/i.test(role || "")) gaps.push("Current Teacher 여부를 확인해 학교별 추천서 요구조건과 맞춰야 합니다.");
    return {
      candidate: r.candidate || `추천 후보 ${i + 1}`,
      role,
      priority,
      strategicRole,
      relationshipGap: `${r.currentStrength || "미입력"} → ${r.targetStrength || "미입력"}`,
      requiredEvidence: r.evidence || "수업/활동에서 관찰된 구체 사례, 학생의 태도 변화, 결과물을 추가로 정리해야 합니다.",
      gaps,
      nextAction: gaps.length ? "추천인에게 전달할 evidence sheet를 먼저 정리하고, 학생의 핵심 활동/학업 보완점과 연결되는 사례를 2-3개 준비해 주세요." : "추천서 요청 전, 해당 추천인이 강조해야 할 학생의 핵심 메시지를 1문단으로 정리해 공유하는 것이 좋습니다."
    };
  }).sort((a, b) => a.priority - b.priority);
  const schoolSpecific = schoolFits.map(fit => ({
    school: fit.school,
    note: `${fit.school}에서는 ${fit.riskFactors[0] || "학교별 적합성"}을 보완할 수 있는 추천서가 중요합니다. 학업 리스크가 있으면 과목 교사, EC Hook이 강하면 코치/멘토 추천서의 전략적 가치가 커집니다.`
  }));
  return {
    rows,
    schoolSpecific,
    summary: rows.length ? `현재 추천서 후보 ${rows.length}명이 입력되어 있습니다. 우선순위는 학업 리스크, 핵심 EC Hook, 보딩 적합도 보완 필요성을 기준으로 정렬했습니다.` : "추천서 후보자 데이터가 아직 입력되지 않았습니다. Stage 4 > 추천서/계정에서 후보자와 증거를 입력하면 학교별 추천서 전략이 생성됩니다."
  };
}
function v2ActionPlanEngine(st = {}, schools = []) {
  const strategy = v2StudentHookEngine(st, schools);
  const schoolFits = v2SchoolFitEngine(st, schools);
  const testing = v2TestGapEngine(st, schools);
  const actions = [];
  strategy.gaps.slice(0, 2).forEach((gap, i) => actions.push({ priority: i + 1, area: "EC/Hook", action: gap, deadline: st.programEndDate || "", importance: 5 }));
  testing.flatMap(x => x.gaps).filter(g => Number(g.gapToCompetitive) > 0).slice(0, 2).forEach((gap, i) => actions.push({ priority: actions.length + 1, area: "Testing", action: gap.comment, deadline: st.programEndDate || "", importance: 4 }));
  schoolFits.slice(0, 3).forEach(fit => actions.push({ priority: actions.length + 1, area: "School Fit", action: `${fit.school}: ${fit.strategyPoint}`, deadline: st.programEndDate || "", importance: 4 }));
  return actions.slice(0, 8);
}
function v2EcActivityId(ec = {}, index = 0) {
  return ec.id || ec.activityId || `ec-${index}-${String(ec.name || ec.team || ec.cat || "activity").toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-")}`;
}
function v2EcRoadmapText(ec = {}) {
  return [ec.cat, ec.name, ec.team, ec.position, ec.level, ec.levelOther, ec.description, ec.impact, ...(ec.awards || []).flatMap(a => [a.level, a.competition, a.awardName, a.notes])].join(" ").toLowerCase();
}
function v2EcRoadmapHasActivity(ec = {}) {
  return ["name", "team", "position", "from", "to", "level", "levelOther", "hours", "impact", "honors"].some(k => String(ec[k] || "").trim()) || (ec.awards || []).length > 0 || !!ec.core;
}
function v2EcDomainsForActivity(ec = {}, index = 0) {
  const text = v2EcRoadmapText(ec);
  const domains = new Set();
  if (/\b(sport|athletic|soccer|basketball|tennis|golf|ski|hockey|swim|lacrosse|baseball|rowing|crew|track|football|volleyball|varsity)\b/i.test(text) || ec.cat === "Sports") domains.add("Sports");
  if (/\b(art|arts|music|orchestra|choir|band|piano|violin|theater|theatre|film|portfolio|drawing|painting|design|dance)\b/i.test(text) || ["Music", "Arts"].includes(ec.cat)) domains.add("Arts");
  if (/\b(captain|president|founder|leader|head|chair|mentor|officer|captaincy)\b|대표|회장|주장|리더|멘토/i.test(text)) domains.add("Leadership");
  if (/service|volunteer|community|tutor|fundraising|nonprofit|봉사|기부|멘토링/i.test(text) || ec.cat === "Community Services") domains.add("Community Service");
  if (/\b(stem|robot|coding|science|math|mathematics|ukmt|olympiad|research|engineering|kaist|biology|physics|chemistry|computer)\b/i.test(text) || ec.cat === "STEM") domains.add("STEM");
  if (/\b(debate|speech|model un|mun|journal|publication|essay|academic|intellectual|olympiad|history|writing|john locke|ukmt|math|mathematics)\b/i.test(text) || ["Academic & Intellectual", "Debate/Speech", "Journalism/Publication"].includes(ec.cat)) domains.add("Academics");
  if (/\b(internship|intern|entrepreneur|entrepreneurship|startup|business|job|company|shadowing|work experience)\b|인턴|창업/i.test(text) || ec.cat === "Internship/Entrepreneurship") domains.add("Internship/Work");
  if (!domains.size) domains.add(ec.cat === "Sports" ? "Sports" : "Academics");
  return [...domains].filter(d => V2_EC_ROADMAP_DOMAINS.includes(d));
}
function v2EcDomainSeed() {
  return Object.fromEntries(V2_EC_ROADMAP_DOMAINS.map(d => [d, { domain: d, score: 0, strength: "", gap: "", activities: [], coreCount: 0 }]));
}
function v2EcDomainAnalysis(st = {}, schools = []) {
  const domains = v2EcDomainSeed();
  const ecs = (st.ecs || []).filter(v2EcRoadmapHasActivity);
  ecs.forEach((ec, index) => {
    const activityId = v2EcActivityId(ec, index);
    const linkedDomains = v2EcDomainsForActivity(ec, index);
    linkedDomains.forEach(domain => {
      const entry = domains[domain];
      entry.activities.push({ activityId, ec, index, linkedDomains });
      if (ec.core) entry.coreCount += 1;
    });
  });
  const schoolText = (st.interests || []).map(x => v2FindSchool(schools, x.school)).filter(Boolean).map(s => [s.programs, s.sports, s.arts, s.fit, s.interview].join(" ")).join(" ").toLowerCase();
  Object.values(domains).forEach(entry => {
    const activities = entry.activities;
    const awardCount = activities.reduce((sum, a) => sum + ((a.ec.awards || []).length), 0);
    const leadershipCount = activities.filter(a => /captain|president|leader|founder|mentor|officer|주장|회장/i.test(v2EcRoadmapText(a.ec))).length;
    const hours = activities.reduce((sum, a) => sum + (Number(a.ec.hours) || 0), 0);
    const fitBoost = schoolText.includes(entry.domain.toLowerCase().split("/")[0]) ? 8 : 0;
    const score = Math.min(100, Math.round(activities.length * 18 + entry.coreCount * 15 + awardCount * 8 + leadershipCount * 10 + Math.min(16, hours) + fitBoost));
    entry.score = score;
    entry.strength = activities.length
      ? `${entry.domain} 영역에는 ${activities.length}개 활동이 연결되어 ${entry.coreCount ? `있고, 그중 핵심 활동 ${entry.coreCount}개가 포함되어 있습니다` : "있습니다"}.`
      : `${entry.domain} 영역에는 아직 입력된 활동이 없습니다.`;
    entry.gap = score >= 75 ? "현재 강점으로 활용 가능한 영역입니다. 이제 결과물과 추천서 근거를 정리하는 단계가 중요합니다." : score >= 45 ? "활동 기반은 있으나 리더십, 외부 성과, 지속성 중 한 축을 더 보강해야 합니다." : "관심학교 기준으로 보완 후보 영역입니다. 이 영역을 반드시 키울지, 다른 강점에 집중할지 전략 선택이 필요합니다.";
  });
  const strongDomains = Object.values(domains).filter(d => d.score >= 70).map(d => d.domain);
  const weakDomains = Object.values(domains).filter(d => d.score < 45).map(d => d.domain);
  const parentExplanation = `현재 EC 포트폴리오는 ${strongDomains.length ? strongDomains.join(", ") : "아직 뚜렷한 강점 영역이 충분히 선명하지 않은 상태"}를 중심으로 읽힙니다. 관심학교 기준으로는 단순히 활동 수가 많은 것보다 핵심 활동에서 지속성, 역할, 성과가 함께 보여야 합니다. ${weakDomains.length ? `${weakDomains.join(", ")} 영역은 보완 후보로 보이며, 남은 기간에는 모든 영역을 넓게 채우기보다 지원서에서 가장 설득력 있는 1~2개 축을 결과물 중심으로 강화하는 전략이 좋습니다.` : "현재는 약점 보완보다 핵심 활동의 산출물과 스토리 정리가 더 중요합니다."}`;
  return { domainScores: Object.values(domains), domainStrengths: strongDomains, domainGaps: weakDomains, parentExplanation, generatedAt: new Date().toISOString() };
}
function v2ApplicationSemesterPlan(st = {}) {
  const currentYear = new Date().getFullYear();
  const currentGradeNum = Number(String(st.currentGrade || st.grade || "").match(/\d+/)?.[0]) || 7;
  const targetYear = Number(st.targetYear) || (currentYear + 2);
  const targetGradeNum = Number(String(st.targetGrade || "").match(/\d+/)?.[0]) || Math.max(currentGradeNum + 2, 9);
  const startYear = currentYear;
  const periods = [];
  let grade = currentGradeNum;
  for (let year = startYear; year <= targetYear; year++) {
    const fallGrade = Math.min(targetGradeNum, grade);
    periods.push({ key: `Fall ${year}`, label: `Fall ${year} (${fallGrade}-1)`, year, season: "Fall", grade: fallGrade, application: year === targetYear });
    if (year < targetYear) periods.push({ key: `Spring ${year + 1}`, label: `Spring ${year + 1} (${fallGrade}-2)`, year: year + 1, season: "Spring", grade: fallGrade, application: false });
    grade += 1;
    if (periods.length >= 6) break;
  }
  return periods.slice(0, 5);
}
function v2RecommendedGoalForDomain(domain, ec = {}, st = {}, schools = []) {
  const schoolNames = (st.interests || []).map(x => x.school).filter(Boolean).join(", ");
  const base = {
    Sports: "팀 내 기여도와 경기/훈련 성과를 정리하고, 지원 전까지 Varsity 또는 이에 준하는 레벨에서 학생의 역할을 보여줄 수 있는 결과를 만드는 것을 추천합니다.",
    Arts: "포트폴리오, 공연, 전시, 오디션용 기록물 중 하나를 지원서에 넣을 수 있는 수준으로 정리하는 것을 추천합니다.",
    Leadership: "단순 직책보다 실제로 바꾼 점이 보이도록 팀 운영, 멘토링, 프로젝트 리드 결과를 하나의 사례로 완성하는 것을 추천합니다.",
    "Community Service": "일회성 봉사보다 지속 프로젝트로 만들고, 참여 인원·시간·수혜 대상·변화가 숫자로 보이게 정리하는 것을 추천합니다.",
    STEM: "연구/제작/대회/발표 중 하나를 결과물로 남기고, 관심학교의 STEM 프로그램과 연결되는 탐구 주제를 정리하는 것을 추천합니다.",
    Academics: "John Locke Essay Competition, 토론/글쓰기 포트폴리오, 독립 연구 등 학업적 호기심을 보여주는 결과물을 준비하는 것을 추천합니다. 일정과 대회 요건은 공식 확인이 필요합니다.",
    "Internship/Work": "인턴십 또는 실무 프로젝트의 최종 산출물과 멘토 피드백을 정리해 학생의 책임감과 실제 기여를 보여주는 것을 추천합니다."
  }[domain] || "활동의 역할, 지속성, 성과를 지원서에 쓸 수 있는 결과물로 정리하는 것을 추천합니다.";
  return `${base}${schoolNames ? ` 관심학교(${schoolNames}) 기준으로는 이 목표가 학생의 학교 적합성과 연결되도록 Why School/인터뷰 소재까지 함께 준비하는 것이 좋습니다.` : ""}`;
}
function v2BuildActivityRoadmap(domain, ec = {}, goal = "", st = {}) {
  const periods = v2ApplicationSemesterPlan(st);
  return periods.map((period, index) => {
    const isLast = index === periods.length - 1 || period.application;
    return {
      period: period.label,
      goal: isLast ? "지원서에 넣을 수 있는 최종 성과와 스토리를 확정합니다." : index === 0 ? "현재 수준을 진단하고 목표 달성을 위한 기본 루틴을 만듭니다." : "중간 결과물을 만들고 외부 피드백 또는 검증 기회를 확보합니다.",
      deliverable: isLast ? "활동 설명 문장, 결과물 링크/파일, 추천서용 evidence sheet" : domain === "Academics" ? "아웃라인/초안/리서치 노트" : domain === "Sports" ? "훈련 기록, 경기 기록, 코치 피드백 메모" : "활동 산출물과 진행 기록",
      successCriteria: isLast ? "원서 활동란과 인터뷰 답변에 바로 사용할 수 있을 정도로 정리" : "학기 말에 측정 가능한 산출물 1개 이상 확보",
      risk: "학기 중 학업·시험 준비와 충돌하면 산출물이 흐려질 수 있습니다.",
      checkpoint: isLast ? "지원서 제출 전 최종 검토" : "학기 말 담당자 리뷰"
    };
  });
}
function v2BuildWeeklyActionPlan(domain, ec = {}, goal = "") {
  const map = {
    Sports: ["주 3회 훈련 기록 작성", "월 1회 코치 피드백 정리", "경기/선발/기록 변화 업데이트"],
    Arts: ["주 2회 작품/연습 기록", "월 1회 포트폴리오 정리", "학기 말 피드백 반영본 완성"],
    Leadership: ["주 1회 팀 운영/회의 기록", "월 1회 리더십 사례 정리", "학기 말 변화 지표 정리"],
    "Community Service": ["주 1회 프로젝트 실행", "월 1회 참여자/수혜자 기록 정리", "학기 말 임팩트 수치 업데이트"],
    STEM: ["주 2회 리서치/제작", "격주 1회 멘토 피드백", "학기 말 결과물 버전 관리"],
    Academics: ["주 2회 리서치/글쓰기", "월 1회 외부 피드백", "학기 말 초안 또는 제출본 완성"],
    "Internship/Work": ["주 1회 업무 기록", "월 1회 멘토 확인", "학기 말 산출물/평가 정리"]
  }[domain] || ["주 1회 활동 기록", "월 1회 피드백", "학기 말 결과물 정리"];
  return map.map((item, i) => ({ item, timesPerWeek: i === 0 ? 2 : 1, hoursPerSession: i === 0 ? 1.5 : 1, supportNeeded: i === 1 ? "담당자/멘토 피드백 필요" : "학생 실행", checkpoint: i === 2 ? "학기 말 리뷰" : "월간 점검", expectedOutput: i === 0 ? "진행 기록" : i === 1 ? "피드백 메모" : "최종 산출물" }));
}
function v2GetActivityGoal(st = {}, activityId, domain, ec = {}, schools = []) {
  const saved = st.activityGoalMap?.[activityId] || {};
  const generatedGoal = saved.generatedGoal || v2RecommendedGoalForDomain(domain, ec, st, schools);
  const selectedGoal = saved.selectedGoal || saved.userGoal || generatedGoal;
  const roadmap = saved.roadmap?.length ? saved.roadmap : v2BuildActivityRoadmap(domain, ec, selectedGoal, st);
  const weeklyActionPlan = saved.weeklyActionPlan?.length ? saved.weeklyActionPlan : v2BuildWeeklyActionPlan(domain, ec, selectedGoal);
  return { activityId, generatedGoal, userGoal: saved.userGoal || "", selectedGoal, linkedDomains: saved.linkedDomains || v2EcDomainsForActivity(ec), roadmap, weeklyActionPlan, lastGeneratedAt: saved.lastGeneratedAt || new Date().toISOString(), manuallyEdited: !!saved.manuallyEdited };
}
function v2BuildEvidenceMatrix(st = {}, schools = []) {
  const evaluation = v2BuildEvaluationResult(st, schools);
  const core = v2CoreEcStrategyEngine(st);
  const hook = v2StudentHookEngine(st, schools);
  const schoolFits = v2SchoolFitEngine(st, schools);
  const recommendation = v2RecommendationStrategyEngine(st, schools);
  const matrix = [];
  evaluation.rubrics.forEach(r => matrix.push(v2Evidence({ claim: `${r.title}는 ${v2Round(r.score, 1)}점으로 평가됩니다.`, category: r.key === "academics" ? "Academics" : r.key === "english" ? "Testing" : r.key === "ec" ? "EC" : r.key === "boarding" ? "Boarding Fit" : "Recommendation", evidenceData: r.evidence, confidence: r.score >= 75 ? "High" : "Medium", gap: r.gap, reportUsage: true })));
  core.forEach(ec => matrix.push(v2Evidence({ claim: `${ec.activityName}은 핵심 EC로 활용할 수 있습니다.`, category: "EC", evidenceData: ec.strengths.join(" "), confidence: ec.gaps.length > 1 ? "Medium" : "High", gap: ec.gaps.join(" "), reportUsage: true })));
  matrix.push(v2Evidence({ claim: hook.character, category: "Hook", evidenceData: hook.summary, confidence: core.length >= 2 ? "High" : "Low", gap: hook.gaps.join(" "), reportUsage: true }));
  schoolFits.forEach(fit => matrix.push(v2Evidence({ claim: `${fit.school}는 현재 ${fit.category} 구간으로 분석됩니다.`, category: "School Fit", evidenceData: [fit.reasonFromUser, fit.schoolValues, fit.connectedPrograms.join(" / ")].filter(Boolean).join(" | "), confidence: fit.category === "검토 필요" ? "Low" : "Medium", gap: fit.riskFactors.join(" "), reportUsage: true })));
  recommendation.rows.forEach(row => matrix.push(v2Evidence({ claim: `${row.candidate} 추천서는 ${row.strategicRole}로 활용할 수 있습니다.`, category: "Recommendation", evidenceData: row.requiredEvidence, confidence: row.gaps.length ? "Medium" : "High", gap: row.gaps.join(" "), reportUsage: true })));
  return matrix;
}
function v2BuildStrategyResult(st = {}, schools = []) {
  const coreEcAnalyses = v2CoreEcStrategyEngine(st);
  const hookAnalysis = v2StudentHookEngine(st, schools);
  const schoolFitAnalyses = v2SchoolFitEngine(st, schools);
  const testGapAnalyses = v2TestGapEngine(st, schools);
  const recommendationStrategy = v2RecommendationStrategyEngine(st, schools);
  const actionPlan = v2ActionPlanEngine(st, schools);
  const ecRoadmapAnalysis = st.ecRoadmapAnalysis?.domainScores ? st.ecRoadmapAnalysis : v2EcDomainAnalysis(st, schools);
  const signatureProjects = v2ResolveSignatureProjects(st, schools).map(project => ({ ...project, proposal: project.proposal || v2BuildSignatureProjectProposal(st, project, schools) }));
  const evidenceMatrix = v2BuildEvidenceMatrixShallow(st, schools, { coreEcAnalyses, hookAnalysis, schoolFitAnalyses, recommendationStrategy });
  return {
    version: V2_DATA_MODEL_VERSION,
    generatedAt: new Date().toISOString(),
    positioning: hookAnalysis,
    coreEcAnalyses,
    testGapAnalyses,
    schoolFitAnalyses,
    recommendationStrategy,
    actionPlan,
    ecRoadmapAnalysis,
    signatureProjects,
    evidenceMatrix,
    parentSummary: `${st.name || "학생"} 학생의 전략은 “${hookAnalysis.hookLine || hookAnalysis.character}”라는 Hook을 중심으로 구성하는 것이 좋습니다. Stage 1의 수치 진단은 유지하되, Stage 2에서는 핵심 EC 증거, 학교별 Fit, 추천서 자료, 인터뷰 메시지가 모두 같은 학생 이미지를 말하도록 설계하는 데 초점을 둡니다.`
  };
}
function v2BuildEvidenceMatrixShallow(st = {}, schools = [], built = {}) {
  const evaluation = v2BuildEvaluationResult(st, schools);
  const core = built.coreEcAnalyses || v2CoreEcStrategyEngine(st);
  const hook = built.hookAnalysis || v2StudentHookEngine(st, schools);
  const schoolFits = built.schoolFitAnalyses || v2SchoolFitEngine(st, schools);
  const recommendation = built.recommendationStrategy || v2RecommendationStrategyEngine(st, schools);
  const matrix = [];
  evaluation.rubrics.forEach(r => matrix.push(v2Evidence({ claim: `${r.title}는 ${v2Round(r.score, 1)}점으로 평가됩니다.`, category: r.key === "academics" ? "Academics" : r.key === "english" ? "Testing" : r.key === "ec" ? "EC" : r.key === "boarding" ? "Boarding Fit" : "Recommendation", evidenceData: r.evidence, confidence: r.score >= 75 ? "High" : "Medium", gap: r.gap, reportUsage: true })));
  core.forEach(ec => matrix.push(v2Evidence({ claim: `${ec.activityName}은 핵심 EC로 활용할 수 있습니다.`, category: "EC", evidenceData: ec.strengths.join(" "), confidence: ec.gaps.length > 1 ? "Medium" : "High", gap: ec.gaps.join(" "), reportUsage: true })));
  matrix.push(v2Evidence({ claim: hook.character, category: "Hook", evidenceData: hook.summary, confidence: core.length >= 2 ? "High" : "Low", gap: hook.gaps.join(" "), reportUsage: true }));
  schoolFits.forEach(fit => matrix.push(v2Evidence({ claim: `${fit.school}는 현재 ${fit.category} 구간으로 분석됩니다.`, category: "School Fit", evidenceData: [fit.reasonFromUser, fit.schoolValues, fit.connectedPrograms.join(" / ")].filter(Boolean).join(" | "), confidence: fit.category === "검토 필요" ? "Low" : "Medium", gap: fit.riskFactors.join(" "), reportUsage: true })));
  recommendation.rows.forEach(row => matrix.push(v2Evidence({ claim: `${row.candidate} 추천서는 ${row.strategicRole}로 활용할 수 있습니다.`, category: "Recommendation", evidenceData: row.requiredEvidence, confidence: row.gaps.length ? "Medium" : "High", gap: row.gaps.join(" "), reportUsage: true })));
  return matrix;
}
function v2AttachAnalysis(st = {}, schools = []) {
  const studentProfile = v2BuildStudentProfile(st);
  const evaluationResult = v2BuildEvaluationResult(st, schools);
  const strategyResult = v2BuildStrategyResult(st, schools);
  const reportSnapshots = Array.isArray(st.reportSnapshots) ? st.reportSnapshots : (st.reportSnapshot ? [st.reportSnapshot] : []);
  return { ...st, dataModelVersion: V2_DATA_MODEL_VERSION, studentProfile, evaluationResult, strategyResult, reportSnapshots, reportSnapshot: reportSnapshots[0] || null };
}
function v2CreateReportSnapshot(st = {}, schools = [], creator = "Admin") {
  const profile = v2BuildStudentProfile(st);
  const evaluationResult = v2BuildEvaluationResult(st, schools);
  const strategyResult = v2BuildStrategyResult(st, schools);
  return {
    id: `snapshot-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type: "stage2-strategy",
    createdAt: new Date().toISOString(),
    createdBy: creator,
    studentId: st.id || "",
    studentName: st.name || "",
    dataVersion: {
      model: V2_DATA_MODEL_VERSION,
      schoolDataset: window.PREP_SCHOOL_DATA_VERSION || "local"
    },
    studentProfile: profile,
    evaluationResult,
    strategyResult,
    title: `${st.name || "학생"} Stage 2 전략보고서`,
    summary: strategyResult.parentSummary
  };
}
function v2AcademicSummary(st) {
  return (st.academicTerms || []).map(t => ({ term: v2TermLabel(t), school: t.school, gpa: v2TermGpa(t), comment: (t.subjects || []).map(s => `${s.subject}: ${s.comment}`).join(" / ") }));
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
  if (/SSAT/i.test(String(test?.type || ""))) {
    const d = test?.details || {};
    const hasRaw = ["Verbal Raw Score", "Quantitative Raw Score", "Reading Raw Score"].some(k => v2Num(d[k]));
    return v2Num(d["Overall Percentile"] || d.Percentile || test?.percentile || (!hasRaw ? test?.overall : ""));
  }
  return v2Num(test.overall || v2TestOverall(test.type, test.details || {}, ""));
}
function v2LegacyToeflEval(st) {
  const test = v2LegacyFindTest(st, /TOEFL|IELTS|DET/i);
  const type = String(test.type || "");
  const raw = v2LegacyTestOverall(test);
  if (!raw) return { raw: "", eval: null, label: "English Test missing", warning: "TOEFL/TOEFL Jr/IELTS/DET 점수가 없어 Stage 1 English conversion을 비워두었습니다." };
  if (/TOEFL JR/i.test(type)) return { raw, eval: Math.max(0, Math.min(100, v2Round(raw / 9, 1))), label: `TOEFL Jr ${raw}/900` };
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
  const awardText = e => (e.awards || []).map(a => `${a.level || ""} ${a.competition || ""} ${a.awardName || ""} ${a.position || ""} ${a.notes || ""}`).join(" ");
  const joined = ecs.map(e => `${e.name || ""} ${e.position || ""} ${e.level || ""} ${e.levelOther || ""} ${e.leadership || ""} ${e.impact || ""} ${e.honors || ""} ${awardText(e)}`).join(" ");
  const leadershipHit = /captain|president|founder|leader|mentor|representative|회장|주장|리더|창립|대표/i.test(joined);
  const impactHits = ecs.filter(e => /award|winner|rank|regional|national|international|state|1위|수상|대회|전국|대표|성과|impact/i.test(`${e.impact || ""} ${e.honors || ""} ${awardText(e)}`)).length;
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
function v2CleanLegacyValue(value) {
  return String(value || "").split(" / ")[0].split(":")[0].trim();
}
function v2NormName(value) {
  return String(value || "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}
function v2LegacySchoolConfig(school = {}) {
  const topTier = {
    "phillips exeter academy": { sensitivity: 0.7, siblingPriority: true, max: 3.0, weight: 0.35 },
    "phillips academy andover": { sensitivity: 0.8, siblingPriority: false, max: 3.5, weight: 0.35 },
    "deerfield academy": { sensitivity: 0.8, siblingPriority: false, max: 3.5, weight: 0.35 },
    "hotchkiss school": { sensitivity: 0.8, siblingPriority: false, max: 3.5, weight: 0.35 },
    "choate rosemary hall": { sensitivity: 0.8, siblingPriority: false, max: 3.5, weight: 0.35 },
    "lawrenceville school": { sensitivity: 0.8, siblingPriority: false, max: 3.5, weight: 0.35 },
    "st pauls school": { sensitivity: 0.8, siblingPriority: false, max: 3.5, weight: 0.35 }
  };
  const suggested = topTier[v2NormName(school.name)];
  return {
    sensitivity: Number(school.legacy_sensitivity_multiplier || school.legacySensitivityMultiplier || suggested?.sensitivity || 1),
    siblingPriority: String(school.sibling_priority_enabled ?? school.siblingPriorityEnabled ?? suggested?.siblingPriority ?? false) === "true" || school.sibling_priority_enabled === true || school.siblingPriorityEnabled === true,
    max: Number(school.max_legacy_contribution || school.maxLegacyContribution || suggested?.max || 3.5),
    weight: Number(school.legacy_weight || school.legacyWeight || suggested?.weight || 0.35)
  };
}
function v2LegacyImpactForSchool(st, school) {
  const relationScores = {
    "Parent attended the school": 5,
    "Grandparent attended the school": 3,
    "Sibling currently attends the school": 4.5,
    "Sibling graduated from the school": 4,
    "Aunt or uncle attended the school": 1.5,
    "Cousin attended the school": 1,
    "Other family connection": 0.5
  };
  const strengthMultipliers = { Strong: 1.3, Moderate: 1, Weak: 0.7, Unknown: 0.8 };
  const target = v2NormName(school?.name);
  const profile = (st.interests || []).find(x => x.has_legacy_connection === "Yes" && v2NormName(x.legacy_school_name || x.school) === target);
  if (!profile) return { applied: false, contribution: 0, subscore: 0, note: "본 평가에서는 별도의 레거시 또는 가족 관계 요소가 반영되지 않았습니다." };
  const connectionSchoolName = profile.legacy_school_name || profile.school || school?.name || "";
  const relationship = v2CleanLegacyValue(profile.legacy_relationship_type);
  if (!connectionSchoolName || !relationship) return { applied: false, contribution: 0, subscore: 0, warning: "레거시 관계 학교명과 관계 유형이 모두 입력되어야 점수에 반영됩니다." };
  const strength = v2CleanLegacyValue(profile.legacy_connection_strength) || "Unknown";
  const config = v2LegacySchoolConfig(school);
  let sensitivity = config.sensitivity;
  if (relationship === "Sibling currently attends the school" && config.siblingPriority) sensitivity = Math.min(1.4, sensitivity + 0.2);
  const relationshipScore = relationScores[relationship] || 0;
  const multiplier = strengthMultipliers[strength] || 0.8;
  const subscore = Math.min(10, relationshipScore * multiplier * sensitivity);
  const contribution = Math.min(config.max, subscore * config.weight);
  return { applied: contribution > 0, contribution: v2Round(contribution), subscore: v2Round(subscore), relationship, strength, schoolName: connectionSchoolName, notes: profile.legacy_notes || "", sensitivity, warning: "" };
}
function v2LegacyPredictions(st, schools) {
  const score = v2LegacyStage1Score(st);
  const targetNames = (st.interests || []).map(x => x.school).filter(Boolean);
  const pool = targetNames.length ? targetNames.map(n => v2FindSchool(schools, n)).filter(Boolean) : [...(schools || [])].sort((a, b) => v2Num(a.yesRank || a.avgRank || 999) - v2Num(b.yesRank || b.avgRank || 999)).slice(0, 8);
  return pool.map(school => {
    const legacyImpact = v2LegacyImpactForSchool(st, school);
    const schoolStrength = v2LegacySchoolStrength(school);
    const toeflDetriment = Math.max(0, schoolStrength - (score.toefl.eval ?? 0));
    const gpaDetriment = Math.max(0, (schoolStrength - (score.gpa.eval ?? 0)) / 3);
    const adjustedScore = score.weighted + legacyImpact.contribution;
    const margin = adjustedScore - schoolStrength - toeflDetriment - gpaDetriment;
    return {
      school,
      schoolStrength,
      baseApplicantScore: score.weighted,
      legacyImpact,
      legacyContribution: legacyImpact.contribution,
      adjustedApplicantScore: v2Round(adjustedScore),
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
  const awardNames = (st.awards || []).map(a => a.awardName || a.competition).filter(Boolean).slice(0, 3).join(", ");
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
      evidence: `EC 평가는 활동 개수만 보지 않고, 기간·역할·성과·스토리로 이어지는지를 보았습니다. 현재 입력된 대표 활동은 ${ecNames || "아직 충분히 정리되지 않았습니다"}이며${awardNames ? `, 별도 수상/ Honor로는 ${awardNames}가 확인됩니다` : ""}. 이 근거로 ${legacy.cocurricularC}점입니다.`,
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
function v2RadarPoints(items, centerX = 230, centerY = 170, radius = 105, labelRadius = 148) {
  return items.map((item, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / items.length;
    const r = radius * Math.max(0, Math.min(100, item.value)) / 100;
    return { ...item, x: centerX + Math.cos(angle) * r, y: centerY + Math.sin(angle) * r, lx: centerX + Math.cos(angle) * labelRadius, ly: centerY + Math.sin(angle) * labelRadius };
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
  return <div style={{ display: "grid", gridTemplateColumns: "minmax(430px, 500px) 1fr", gap: 18, alignItems: "center" }}>
    <svg viewBox="0 0 460 340" style={{ width: "100%", maxWidth: 500, background: "#f8fafc", border: "1px solid #d9dee8", borderRadius: 8, overflow: "visible" }}>
      {rings.map((r, i) => <polygon key={i} points={r} fill="none" stroke={i === 4 ? "#94a3b8" : "#cbd5e1"} strokeWidth={i === 4 ? 1.4 : 1} />)}
      {points.map((p, i) => <line key={i} x1="230" y1="170" x2={p.lx} y2={p.ly} stroke="#e2e8f0" />)}
      <polygon points={polygon} fill="rgba(37,99,235,.20)" stroke="#2563eb" strokeWidth="3" />
      {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#dc2626" />)}
      {points.map((p, i) => <text key={i} x={p.lx} y={p.ly} textAnchor={p.lx > 248 ? "start" : p.lx < 212 ? "end" : "middle"} dominantBaseline="middle" fontSize="11" fill="#111827">{p.label}</text>)}
      <text x="230" y="173" textAnchor="middle" fontSize="11" fill="#475569">100</text>
    </svg>
    <div>
      <h3 style={{ marginTop: 0 }}>학생 역량 방사형 분석</h3>
      <p className="small" style={{ fontSize: 13, lineHeight: 1.8 }}>이 그래프는 학생의 학업, 영어, 보딩 적합도, EC 깊이, 리더십, Hook을 한눈에 비교하기 위한 시각 자료입니다. 바깥쪽에 가까울수록 현재 지원서에서 강점으로 사용하기 좋고, 안쪽에 머무는 축은 남은 기간 동안 보완 전략을 세워야 하는 영역입니다.</p>
      <table className="table"><tbody>{items.map(x => <tr key={x.label}><th>{x.label}</th><td><div className="progress"><div style={{ width: `${Math.max(0, Math.min(100, x.value))}%` }} /></div></td><td style={{ width: 50 }}>{v2Round(x.value, 1)}</td></tr>)}</tbody></table>
    </div>
  </div>;
}
function V2ClientCategoryPill({ category }) {
  const cls = /Excellent|Strong|Safety|Likely/i.test(category) ? "p-green" : /Competitive/i.test(category) ? "p-blue" : /Dream|Goal|Borderline|Below/i.test(category) ? "p-amber" : "p-red";
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
  const predictions = v2LegacyPredictions({ ...st, interests: [] }, schools || [])
    .filter(p => !targetNames.has(p.school.name));
  const recommended = predictions.filter(p => /Safety|Likely|Competitive/.test(p.category));
  const ranked = (recommended.length ? recommended.sort((a, b) => b.schoolStrength - a.schoolStrength) : predictions.sort((a, b) => a.schoolStrength - b.schoolStrength))
    .slice(0, 4);
  if (ranked.length) return ranked;
  return (schools || [])
    .filter(s => s?.name && !targetNames.has(s.name))
    .slice(0, 4)
    .map(s => ({ school: s, category: "Competitive Accept", schoolStrength: Number(s.ssat || s.toefl || 0), probability: "검토 필요", legacyImpact: { applied: false }, legacyContribution: 0 }));
}
function V2ClientStrategyReport({ st, schools }) {
  const reportSchools = schools || [];
  const legacy = v2LegacyStage1Score(st);
  const rubrics = v2ClientRubrics(st);
  const academicTrendMeta = v2AcademicTrendMeta(st.academicTerms || []);
  const interestNames = (st.interests || []).map(x => x.school).filter(Boolean);
  const interestPredictions = interestNames.length ? v2LegacyPredictions(st, reportSchools) : [];
  const appliedLegacy = interestPredictions.filter(p => p.legacyImpact?.applied && p.legacyContribution > 0);
  const recommended = v2RecommendedSchools(st, window.PREP_SCHOOLS || reportSchools);
  const lowest = [...rubrics].sort((a, b) => a.score - b.score).slice(0, 2);
  const previousApplications = (st.previousApplications || []).filter(a => a.school || a.platform || a.result);
  const recommendations = (st.recommendations || []).filter(r => r.candidate || r.role || r.evidence);
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

      <div className="section-title"><span>01-1</span>학업 / 시험 시각 자료</div>
      <div className="grid g2">
        <div className="card" style={{ background: "#ffffff" }}>
          <h3>{academicTrendMeta.valueKey === "gpa" ? "학기별 GPA 변화" : "학기별 학업 추이 점수"}</h3>
          <p className="small muted">{academicTrendMeta.note}</p>
          <V2GpaLineChart terms={st.academicTerms || []} mode="term" />
        </div>
        <div className="card" style={{ background: "#ffffff" }}>
          <h3>시험 점수 그래프</h3>
          <p className="small muted">SSAT, TOEFL, IELTS, DET 등 입력된 시험 점수를 시험별 스케일에 맞춰 시각화합니다.</p>
          <V2TestScoreChart st={st} />
        </div>
      </div>

      <V2TestAnalysisReport st={st} schools={reportSchools} />
      <div className="section-title"><span>02</span>Rubric 점수표와 근거</div>
      <div className="rubrics">{rubrics.map(r => <Rub key={r.key} title={r.title} val={v2Round(r.score, 1)} max={100} />)}</div>
      <table className="table" style={{ marginTop: 14 }}><tbody>{rubrics.map(r => <tr key={r.key}><th style={{ width: 150 }}>{r.title}</th><td><p style={{ margin: 0, lineHeight: 1.75 }}>{r.evidence}</p><p style={{ margin: "8px 0 0", lineHeight: 1.75 }}><b>보완 방향:</b> {r.gap}</p></td></tr>)}</tbody></table>

      <div className="section-title"><span>03</span>관심/희망학교 판정</div>
      {interestPredictions.length ? <table className="table"><thead><tr><th>학교</th><th>Base</th><th>Legacy</th><th>Adjusted</th><th>현재 판정</th><th>해석 및 보완 방향</th></tr></thead><tbody>{interestPredictions.map(p => <tr key={p.school.name}><td><b>{p.school.name}</b><br /><span className="small muted">Yes Rank {p.school.yesRank || "-"} · 합격률 {p.school.accept || "-"}%</span></td><td>{p.baseApplicantScore}</td><td>{p.legacyContribution ? `+${p.legacyContribution}` : "-"}</td><td>{p.adjustedApplicantScore}</td><td><V2ClientCategoryPill category={p.category} /></td><td style={{ lineHeight: 1.7 }}>{v2CustomerSchoolNote(p)}</td></tr>)}</tbody></table> : <p className="small">관심/희망학교가 아직 지정되지 않았습니다. 학생 상세의 관심학교 3개를 입력하면 해당 학교만 대상으로 판정이 표시됩니다.</p>}

      {appliedLegacy.length > 0 && <><div className="section-title"><span>03-1</span>레거시 / 가족 관계 영향</div>{appliedLegacy.map(p => <p key={p.school.name} style={{ lineHeight: 1.8 }}><b>{p.school.name}</b><br />학생은 해당 학교와 <b>{p.legacyImpact.relationship}</b> 관계가 있으며, 연결 강도는 <b>{p.legacyImpact.strength}</b>로 입력되었습니다. 이 요소는 현재 점수에 <b>+{p.legacyContribution}</b>점의 제한적인 맥락 가산점으로 반영되어 adjusted score가 {p.adjustedApplicantScore}점으로 계산되었습니다. 다만 레거시는 독립적인 합격 요인이 아니며, 학업력·영어 실력·인터뷰·추천서·학교 적합성의 약점을 대체하지는 않습니다.</p>)}</>}

      {(previousApplications.length > 0 || recommendations.length > 0) && <><div className="section-title"><span>03-2</span>지원 이력 / 추천서 전략 메모</div>
        {previousApplications.length > 0 && <table className="table" style={{ marginBottom: 14 }}><thead><tr><th>이전 지원 학교</th><th>지원 학년</th><th>플랫폼</th><th>결과</th><th>전략적 의미</th></tr></thead><tbody>{previousApplications.map((a, i) => <tr key={i}><td><b>{a.school || "-"}</b></td><td>{a.gradeApplied || "-"}</td><td>{a.platform || "-"}</td><td>{a.result || "-"}</td><td style={{ lineHeight: 1.7 }}>이전 지원 이력이 있는 경우에는 같은 학교 재지원 여부, 결과 이후 보완된 성적·시험·활동 근거, 그리고 원서 플랫폼 계정 이력을 함께 확인해 지원 전략에 반영합니다.</td></tr>)}</tbody></table>}
        {recommendations.length > 0 && <table className="table"><thead><tr><th>추천서 후보자</th><th>역할</th><th>관계 강도</th><th>추천서에 담을 핵심 증거</th></tr></thead><tbody>{recommendations.map((r, i) => <tr key={i}><td><b>{r.candidate || "-"}</b></td><td>{r.role === "기타" ? r.roleOther : r.role || "-"}</td><td>{r.currentStrength || "-"} → {r.targetStrength || "-"}</td><td style={{ lineHeight: 1.7 }}>{r.evidence || "추천서에서 보여주어야 할 구체 사례를 추가로 정리해야 합니다."}</td></tr>)}</tbody></table>}
      </>}

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
function V2Text({ label, val, set, minHeight }) { return <div className="field"><span className="label">{label}</span><textarea className="textarea" style={minHeight ? { minHeight } : undefined} value={val || ""} onChange={e => set(e.target.value)} /></div>; }
function V2Select({ label, val, set, options }) {
  const display = o => label === "Stage" ? (V2_STAGE_KEYS.find(x => x[0] === o)?.[1] || o) : o;
  return <div className="field"><span className="label">{label}</span><select className="select" value={val || ""} onChange={e => set(e.target.value)}><option value="">선택</option>{options.map(o => <option key={o} value={o}>{display(o)}</option>)}</select></div>;
}
function V2SearchSelect({ label, val, set, options = [] }) {
  const [open, setOpen] = useState(false);
  const query = String(val || "").toLowerCase();
  const ranked = options
    .filter(o => !query || String(o).toLowerCase().includes(query))
    .slice(0, 12);
  return <div className="field" style={{ position: "relative" }}>
    <span className="label">{label}</span>
    <input className="input" value={val || ""} onFocus={() => setOpen(true)} onChange={e => { set(e.target.value); setOpen(true); }} onBlur={() => setTimeout(() => setOpen(false), 130)} placeholder="검색 후 선택" />
    {open && <div style={{ position: "absolute", zIndex: 35, left: 0, right: 0, top: "100%", background: "white", border: "1px solid #c5d9e8", borderRadius: 10, boxShadow: "0 16px 32px rgba(30,72,102,.16)", maxHeight: 260, overflow: "auto", padding: 6 }}>
      {(ranked.length ? ranked : options.slice(0, 12)).map(o => <button type="button" key={o} onMouseDown={() => { set(o); setOpen(false); }} style={{ width: "100%", border: 0, background: o === val ? "#eaf4fa" : "white", color: "#18324a", textAlign: "left", padding: "10px 12px", borderRadius: 8, fontSize: 14 }}>{o}</button>)}
    </div>}
  </div>;
}
function V2AttachmentField({ label = "Original report link", url, set }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(url || "");
  const hasUrl = !!String(url || "").trim();
  const openLinkedFile = () => {
    if (!hasUrl) {
      setDraft("");
      setOpen(true);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const editLink = () => {
    setDraft(url || "");
    setOpen(true);
  };
  const save = () => {
    set(String(draft || "").trim());
    setOpen(false);
  };
  return <div className="field attachment-field">
    <span className="label">{label}</span>
    <div className="right" style={{ justifyContent: "flex-start", gap: 8, flexWrap: "wrap" }}>
      <button type="button" className={"btn " + (hasUrl ? "primary" : "ghost")} onClick={openLinkedFile}>{hasUrl ? "원본 파일 열기" : "파일 링크 연결"}</button>
      {hasUrl && <button type="button" className="btn ghost" onClick={editLink}>수정</button>}
      {hasUrl && <button type="button" className="btn ghost" onClick={() => set("")}>삭제</button>}
    </div>
    {open && <div className="modal"><div className="modal-card" style={{ maxWidth: 560 }}>
      <h3>{label}</h3>
      <p className="small">Google Drive, Dropbox, OneDrive, 학교 포털 리포트 등 열람 가능한 파일 링크를 연결해 주세요.</p>
      <input className="input" value={draft} onChange={e => setDraft(e.target.value)} placeholder="https://..." autoFocus />
      <div className="right" style={{ marginTop: 14 }}>
        <button type="button" className="btn ghost" onClick={() => setOpen(false)}>취소</button>
        <button type="button" className="btn primary" onClick={save}>저장</button>
      </div>
    </div></div>}
  </div>;
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
function V2LanguageLevelPicker({ label, values = [], levels = {}, setBoth, options, otherValue = "", setOther = () => {} }) {
  const [pending, setPending] = useState("");
  const chooseLanguage = lang => {
    if (!lang) {
      setPending("");
      return;
    }
    if (!values.includes(lang)) setBoth([...values, lang], { ...levels, [lang]: levels[lang] || "Intermediate" });
    setPending("");
  };
  const add = () => {
    if (!pending || values.includes(pending)) return;
    setBoth([...values, pending], { ...levels, [pending]: levels[pending] || "Intermediate" });
    setPending("");
  };
  const remove = lang => {
    const nextLevels = { ...levels };
    delete nextLevels[lang];
    setBoth(values.filter(x => x !== lang), nextLevels);
  };
  const setLevel = (lang, level) => setBoth(values, { ...levels, [lang]: level });
  return <div className="field"><span className="label">{label}</span><div className="grid g3"><V2Select label="언어 선택" val={pending} set={chooseLanguage} options={options.filter(o => !values.includes(o))} /><div className="field"><span className="label">&nbsp;</span><button type="button" className="btn ghost" onClick={add}>언어 추가</button></div></div><div className="grid">{values.map(lang => <div key={lang} className="language-row selected" style={{ gridTemplateColumns: lang === "기타" ? "120px minmax(180px,1fr) 180px auto" : "1fr 180px auto" }}><span>{lang}</span>{lang === "기타" && <input className="input" value={otherValue || ""} onChange={e => setOther(e.target.value)} placeholder="직접 입력" />}<select className="select" value={levels[lang] || "Intermediate"} onChange={e => setLevel(lang, e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Fluent</option></select><button type="button" className="btn ghost" onClick={() => remove(lang)}>삭제</button></div>)}</div></div>;
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
  const addresses = v2ApplyAddressLinks(basic.addresses || [V2_EMPTY_ADDRESS("Permanent Address"), V2_EMPTY_ADDRESS("Mailing Address")]);
  const phones = basic.phones || [V2_EMPTY_PHONE()];
  const saveAddresses = next => setBasic("addresses", v2ApplyAddressLinks(next));
  const editAddress = (i, patch) => saveAddresses(v2SetArr(addresses, i, patch));
  const deleteAddress = i => saveAddresses(addresses.filter((_, x) => x !== i));
  const toggleSameAsPermanent = (i, checked) => {
    const permanent = addresses.find(a => a.type === "Permanent Address") || V2_EMPTY_ADDRESS("Permanent Address");
    const patch = checked ? { ...v2CopyAddressFrom(permanent, addresses[i]), sameAs: "Permanent Address" } : { sameAs: "" };
    saveAddresses(v2SetArr(addresses, i, patch));
  };
  const editPhone = (i, patch) => setBasic("phones", v2SetArr(phones, i, patch));
  return <V2Section title="학생 주소/연락처">
    <div className="grid g2"><V2Field label="개인 이메일" val={basic.personalEmail} set={v => setBasic("personalEmail", v)} /><V2Field label="학교 이메일" val={basic.schoolEmail} set={v => setBasic("schoolEmail", v)} /></div>
    <ArrayEditor title="학생 연락처" rows={phones} add={() => setBasic("phones", [...phones, V2_EMPTY_PHONE()])} render={(p, i) => <div className="grid g4"><V2Select label="연락처 구분" val={p.type} set={v => editPhone(i, { type: v })} options={V2_PHONE_TYPES} />{p.type === "기타" && <V2Field label="연락처 구분 직접 입력" val={p.typeOther} set={v => editPhone(i, { typeOther: v })} />}<V2Select label="지역/국가번호" val={p.countryCode} set={v => editPhone(i, { countryCode: v })} options={V2_COUNTRY_CODES} />{p.countryCode === "기타" && <V2Field label="국가번호 직접 입력" val={p.countryCodeOther} set={v => editPhone(i, { countryCodeOther: v })} />}<V2Field label="전화번호/ID" val={p.number} set={v => editPhone(i, { number: v })} /><V2Select label="대표 연락처" val={p.preferred} set={v => editPhone(i, { preferred: v })} options={["Yes", "No"]} /></div>} />
    <ArrayEditor title="주소" rows={addresses} add={() => setBasic("addresses", [...addresses, V2_EMPTY_ADDRESS("기타")])} render={(a, i) => <div><div className="right" style={{ justifyContent: "space-between", marginBottom: 10 }}><div>{a.type !== "Permanent Address" && <label className="small" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><input type="checkbox" checked={a.sameAs === "Permanent Address"} onChange={e => toggleSameAsPermanent(i, e.target.checked)} />Permanent Address와 동일</label>}</div>{i > 1 && <button type="button" className="btn ghost" onClick={() => deleteAddress(i)}>주소 삭제</button>}</div><div className="grid g3"><V2Select label="주소 구분" val={a.type} set={v => editAddress(i, { type: v })} options={V2_ADDRESS_TYPES} />{a.type === "기타" && <V2Field label="주소 구분 직접 입력" val={a.typeOther} set={v => editAddress(i, { typeOther: v })} />}<V2Field label="우편번호" val={a.zip} set={v => editAddress(i, { zip: v, sameAs: "" })} /><V2Field label="주소 검색어" val={a.searchQuery} set={v => editAddress(i, { searchQuery: v, sameAs: "" })} /><V2AddressSearchButtons address={a} /></div><div className="grid g2"><V2Text label="한국어 주소" val={a.koreanAddress} set={v => editAddress(i, { koreanAddress: v, sameAs: "" })} /><V2Text label="영문 주소" val={a.englishAddress} set={v => editAddress(i, { englishAddress: v, sameAs: "" })} /></div><V2Field label="주소 메모" val={a.notes} set={v => editAddress(i, { notes: v })} /></div>} />
    <p className="small muted">현재 버전은 GitHub Pages에서 동작하는 정적 프로토타입이라 주소 검색 결과를 자동으로 가져오지는 않고, 검색 서비스를 새 창으로 열어 복사 입력하는 방식입니다.</p>
  </V2Section>;
}
function v2EducationStage(level = "") {
  if (/박사/.test(level)) return 4;
  if (/석사/.test(level)) return 3;
  if (/4년제|학사/.test(level)) return 2;
  if (/전문대/.test(level)) return 2;
  if (/고등학교/.test(level)) return 1;
  return 0;
}
function V2ParentEditor({ label, parent, setParent, addresses }) {
  const stage = v2EducationStage(parent.educationLevel);
  return <div className="card" style={{ background: "#f8fbfe", marginBottom: 12 }}><h3>{label}</h3><div className="grid g3"><V2Field label="성함" val={parent.nameKo} set={v => setParent({ nameKo: v })} /><V2Field label="영문 성함 (여권명)" val={parent.passportName} set={v => setParent({ passportName: v })} /><V2Field label="생년월일" type="date" val={parent.dob} set={v => setParent({ dob: v })} /><V2Select label="지역/국가번호" val={parent.countryCode} set={v => setParent({ countryCode: v })} options={V2_COUNTRY_CODES} />{parent.countryCode === "기타" && <V2Field label="국가번호 직접 입력" val={parent.countryCodeOther} set={v => setParent({ countryCodeOther: v })} />}<V2Field label="핸드폰 번호" val={parent.phone} set={v => setParent({ phone: v })} /><V2Field label="개인 이메일 주소" val={parent.email} set={v => setParent({ email: v })} /><V2Field label="직업" val={parent.occupation} set={v => setParent({ occupation: v })} /><V2Field label="직책" val={parent.title} set={v => setParent({ title: v })} /><V2Field label="회사명" val={parent.company} set={v => setParent({ company: v })} /></div><V2Text label="회사 주소" val={parent.companyAddress} set={v => setParent({ companyAddress: v })} /><div className="grid g3"><V2Select label="최종학력" val={parent.educationLevel} set={v => setParent({ educationLevel: v })} options={V2_EDUCATION_LEVELS} />{stage >= 1 && <V2Field label="고등학교명" val={parent.highSchoolName} set={v => setParent({ highSchoolName: v })} />}{stage >= 2 && <V2Field label="대학교명" val={parent.collegeName} set={v => setParent({ collegeName: v })} />}{stage >= 2 && <V2Field label="학사 학위명" val={parent.bachelorDegree} set={v => setParent({ bachelorDegree: v })} />}{stage >= 2 && <V2Field label="학사 수여연도" val={parent.bachelorYear} set={v => setParent({ bachelorYear: v })} />}{stage >= 3 && <V2Field label="대학원 (석사) 명" val={parent.masterSchoolName} set={v => setParent({ masterSchoolName: v })} />}{stage >= 3 && <V2Field label="석사 학위명" val={parent.masterDegree} set={v => setParent({ masterDegree: v })} />}{stage >= 3 && <V2Field label="석사 수여연도" val={parent.masterYear} set={v => setParent({ masterYear: v })} />}{stage >= 4 && <V2Field label="대학원 (박사) 명" val={parent.doctoralSchoolName} set={v => setParent({ doctoralSchoolName: v })} />}{stage >= 4 && <V2Field label="박사 학위명" val={parent.doctoralDegree} set={v => setParent({ doctoralDegree: v })} />}{stage >= 4 && <V2Field label="박사 수여연도" val={parent.doctoralYear} set={v => setParent({ doctoralYear: v })} />}</div><div className="grid g3"><V2Select label="자녀와 집주소 동일 여부" val={parent.sameAddress} set={v => setParent({ sameAddress: v })} options={["Yes", "No"]} />{parent.sameAddress === "Yes" && <V2Select label="가져올 자녀 주소" val={parent.linkedAddressType} set={v => setParent({ linkedAddressType: v })} options={(addresses || []).map(a => a.type).filter(Boolean)} />}</div>{parent.sameAddress === "No" && <V2Text label="부모 주소" val={parent.address} set={v => setParent({ address: v })} />}</div>;
}
function V2FamilySection({ basic, setBasic }) {
  const parents = basic.parents || { father: V2_EMPTY_PARENT("father"), mother: V2_EMPTY_PARENT("mother") };
  const familyStatus = { ...V2_EMPTY_FAMILY_STATUS(), ...(basic.familyStatus || {}) };
  const addresses = basic.addresses || [];
  const setParent = (key, patch) => setBasic("parents", { ...parents, [key]: { ...parents[key], ...patch } });
  const setFamilyStatus = patch => setBasic("familyStatus", { ...familyStatus, ...patch });
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
  const hasCustodyQuestions = familyStatus.divorced === "Yes" || familyStatus.separated === "Yes";
  return <V2Section title="가족관계">
    <div className="card" style={{ background: "#f8fbfe", marginBottom: 12 }}><h3>가족 기본 확인</h3>
      <div className="grid g3">
        <V2Select label="학생이 현재 함께 살고 있는 분" val={familyStatus.livingWith} set={v => setFamilyStatus({ livingWith: v })} options={V2_FAMILY_RECIPIENT_OPTIONS} />
        {familyStatus.livingWith === "기타" && <V2Field label="함께 거주하는 분 직접 입력" val={familyStatus.livingWithOther} set={v => setFamilyStatus({ livingWithOther: v })} />}
        <V2Select label="입학서류를 받아보실 분" val={familyStatus.admissionsRecipient} set={v => setFamilyStatus({ admissionsRecipient: v })} options={V2_FAMILY_RECIPIENT_OPTIONS} />
        {familyStatus.admissionsRecipient === "기타" && <V2Field label="입학서류 수령자 직접 입력" val={familyStatus.admissionsRecipientOther} set={v => setFamilyStatus({ admissionsRecipientOther: v })} />}
        <V2Select label="입학금 및 등록금 서류를 받아보실 분" val={familyStatus.billingRecipient} set={v => setFamilyStatus({ billingRecipient: v })} options={V2_FAMILY_RECIPIENT_OPTIONS} />
        {familyStatus.billingRecipient === "기타" && <V2Field label="등록금 서류 수령자 직접 입력" val={familyStatus.billingRecipientOther} set={v => setFamilyStatus({ billingRecipientOther: v })} />}
        <V2Select label="아버지 사망" val={familyStatus.fatherDeceased} set={v => setFamilyStatus({ fatherDeceased: v })} options={["No", "Yes"]} />
        <V2Select label="어머니 사망" val={familyStatus.motherDeceased} set={v => setFamilyStatus({ motherDeceased: v })} options={["No", "Yes"]} />
        <V2Select label="이혼 여부" val={familyStatus.divorced} set={v => setFamilyStatus({ divorced: v })} options={["No", "Yes"]} />
        <V2Select label="별거 여부" val={familyStatus.separated} set={v => setFamilyStatus({ separated: v })} options={["No", "Yes"]} />
      </div>
      {hasCustodyQuestions && <div className="grid g3"><V2Select label="지원 학생의 양육권을 가진 분" val={familyStatus.custodyHolder} set={v => setFamilyStatus({ custodyHolder: v })} options={["아버지", "어머니", "기타"]} />{familyStatus.custodyHolder === "기타" && <V2Field label="양육권자 직접 입력" val={familyStatus.custodyHolderOther} set={v => setFamilyStatus({ custodyHolderOther: v })} />}<V2Select label="아버지 재혼" val={familyStatus.fatherRemarried} set={v => setFamilyStatus({ fatherRemarried: v })} options={["No", "Yes"]} /><V2Select label="어머니 재혼" val={familyStatus.motherRemarried} set={v => setFamilyStatus({ motherRemarried: v })} options={["No", "Yes"]} /></div>}
    </div>
    {V2_PARENT_KEYS.map(([key, label]) => <V2ParentEditor key={key} label={label} parent={parents[key] || V2_EMPTY_PARENT(key)} setParent={patch => setParent(key, patch)} addresses={addresses} />)}
    <div className="card" style={{ background: "#f8fbfe" }}><h3>형제관계</h3><V2Select label="형제 수" val={count} set={setSiblingCount} options={V2_SIBLING_COUNTS} />{siblings.map((s, i) => <div key={i} className="card" style={{ marginTop: 12 }}><h3>형제/자매/남매 {i + 1}</h3><div className="grid g3"><V2Select label="학생과의 관계" val={s.relation} set={v => editSibling(i, { relation: v })} options={relationOptions} />{s.relation === "기타" && <V2Field label="관계 직접 입력" val={s.relationOther} set={v => editSibling(i, { relationOther: v })} />}<V2Field label="성함" val={s.name} set={v => editSibling(i, { name: v })} /><V2Field label="영문 성함" val={s.englishName} set={v => editSibling(i, { englishName: v })} /><V2Field label="생년월일" type="date" val={s.dob} set={v => editSibling(i, { dob: v })} /><V2Field label="학교명" val={s.school} set={v => editSibling(i, { school: v })} /><V2Select label="현재 학년" val={s.grade} set={v => editSibling(i, { grade: v })} options={V2_SIBLING_GRADE_OPTIONS} /></div><V2Text label="메모" val={s.notes} set={v => editSibling(i, { notes: v })} minHeight={48} /></div>)}</div>
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
  const reportStudentId = new URLSearchParams(window.location.search).get("reportStudent");
  if (reportStudentId) {
    const reportStudent = data.students.find(s => s.id === reportStudentId) || data.students[0];
    return <main className="main report-page" style={{ maxWidth: 1180, margin: "0 auto" }}>{reportStudent ? <V2BasicReport st={reportStudent} schools={data.schools} /> : <V2Section title="보고서">학생 데이터를 찾을 수 없습니다.</V2Section>}</main>;
  }
  if (!user) return <Login login={login} setLogin={setLogin} onLogin={() => { const u = users.find(x => x.email === login.email && x.password === login.password); if (u) setUser(u); else alert("계정을 확인하세요."); }} />;
  const visible = user.role === "admin" ? data.students : data.students.filter(s => (s.owners || [s.owner]).includes(user.id));
  const st = data.students.find(s => s.id === selected) || visible[0];
  const updateStudent = patch => {
    if (!st) return;
    const nextPatch = typeof patch === "function" ? patch(st) : patch;
    persist({ ...data, students: data.students.map(s => s.id === st.id ? v2NormalizeStudent({ ...s, ...nextPatch, last: new Date().toISOString().slice(0, 10) }) : s) });
  };
  const updateSchools = schools => persist({ ...data, schools: (schools || []).map(v2NormalizeSchool), schoolDataVersion: window.PREP_SCHOOL_DATA_VERSION || data.schoolDataVersion });
  return <div className="app"><V2Sidebar user={user} view={view} setView={setView} logout={() => setUser(null)} /><main className="main"><Header view={view} />{view === "dashboard" && (user.role === "admin" ? <V2AdminDashboard data={data} persist={persist} setSelected={setSelected} setView={setView} setStage={setStage} /> : <V2Dashboard students={visible} setView={setView} setSelected={setSelected} setStage={setStage} />)}{view === "students" && <V2Students students={visible} user={user} add={() => { const ns = v2NormalizeStudent({ ...blankStudent(), owners: [user.role === "admin" ? "aram" : user.id], owner: user.role === "admin" ? "aram" : user.id }); persist({ ...data, students: [ns, ...data.students] }); setSelected(ns.id); setView("student"); }} setSelected={setSelected} setView={setView} setStage={setStage} />}{view === "student" && st && <V2StudentDetail st={st} update={updateStudent} schools={data.schools} staff={data.staffAccounts || []} stage={st.stage || stage || "stage1"} setStage={setStage} />}{view === "schedule" && <V2Schedule data={data} persist={persist} students={visible} staff={data.staffAccounts || []} user={user} />}{view === "reports" && <V2Reports students={visible} selected={st} setSelected={setSelected} schools={data.schools} />}{view === "admin" && user.role === "admin" && <V2Admin data={data} persist={persist} updateSchools={updateSchools} setSelected={setSelected} setView={setView} setStage={setStage} />}</main></div>;
}
function V2Sidebar({ user, view, setView, logout }) {
  const items = [["dashboard", "대시보드"], ["students", "학생 관리"], ["schedule", "일정 관리"], ["reports", "보고서 제작"], ["admin", "어드민"]];
  return <aside className="side"><div className="brand">YES STUDY ABROAD</div><div className="brand-title">Prep LMS</div><div className="userbox"><b>{user.name}</b><span>{user.role === "admin" ? "어드민 계정" : "담당자 계정"}</span></div>{items.filter(i => i[0] !== "admin" || user.role === "admin").map(i => <button key={i[0]} className={"navbtn " + (view === i[0] ? "active" : "")} onClick={() => setView(i[0])}>{i[1]}</button>)}<button className="navbtn" onClick={logout}>로그아웃</button></aside>;
}
function V2Dashboard({ students, setView, setSelected, setStage }) {
  return <div className="grid"><div className="grid g4"><Metric title="관리 학생" val={students.length} /><Metric title="평균 입력률" val={Math.round(students.reduce((n, s) => n + V2_STAGE_KEYS.reduce((a, [k]) => a + v2StageCompletion(s, k), 0) / 5, 0) / Math.max(students.length, 1)) + "%"} /><Metric title="Stage 1 완료" val={students.filter(s => v2StageCompletion(s, "stage1") >= 80).length} /><Metric title="원서 단계" val={students.filter(s => s.stage === "stage4").length} /></div><V2Section title="학생 Stage 현황">{students.map(s => {
    const currentStage = s.stage || "stage1";
    const pct = v2StageCompletion(s, currentStage);
    return <div className="student-row" key={s.id}><div><b>{s.name}</b><div className="small muted">{s.program || "프로그램 미정"} · {s.currentGrade || s.grade || "학년 미정"}</div></div><span>{s.school || "학교 미입력"}</span><span>{V2_STAGE_KEYS.find(x => x[0] === currentStage)?.[1]} · {pct}%</span><div><div className="progress" style={{ width: 140, maxWidth: "100%" }}><div style={{ width: pct + "%" }} /></div></div><button className="btn ghost" onClick={() => { setSelected(s.id); setStage(currentStage); setView("student"); }}>상세</button></div>;
  })}</V2Section></div>;
}
function V2Students({ students, user, add, setSelected, setView, setStage }) {
  return <div className="grid"><V2Section title="학생 관리"><p className="small muted">담당자로 지정된 학생만 표시됩니다. Admin은 모든 학생을 봅니다.</p><button className="btn primary" onClick={add}>학생 추가</button></V2Section>{students.map(s => {
    const currentStage = s.stage || "stage1";
    const pct = v2StageCompletion(s, currentStage);
    return <div className="card" key={s.id}><div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start" }}><div style={{ flex: 1 }}><h3>{s.name || "신규 학생"}</h3><p className="small muted">{s.en} · {s.program || "프로그램 미정"} · {s.school || "학교 미입력"}</p><div className="right" style={{ gap: 10 }}><span className="pill p-blue">{V2_STAGE_KEYS.find(x => x[0] === currentStage)?.[1] || currentStage}</span><span className="small muted">{pct}% 완료</span></div><div className="progress" style={{ marginTop: 8 }}><div style={{ width: pct + "%" }} /></div></div><button className="btn ghost" onClick={() => { setSelected(s.id); setStage(currentStage); setView("student"); }}>열기</button></div></div>;
  })}</div>;
}
function V2StudentDetail({ st, update, schools, staff, stage, setStage }) {
  const activeStage = st.stage || stage || "stage1";
  return <div><div className="card" style={{ marginBottom: 14 }}><div className="right" style={{ justifyContent: "space-between" }}><div><h3 style={{ marginBottom: 4 }}>{st.name || "신규 학생"} <span className="muted">{st.en}</span></h3><p className="small muted">{st.program || "프로그램 미정"} · {st.school || "학교 미입력"} · {st.targetYear || "지원연도 미정"}</p></div><span className="pill p-green">{v2AcademicPillText(st.academicTerms || [])}</span></div><div className="grid g5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginTop: 12 }}>{V2_STAGE_KEYS.map(([k, label]) => { const pct = v2StageCompletion(st, k); return <button key={k} className={"btn " + (activeStage === k ? "primary" : "ghost")} onClick={() => { setStage(k); update({ stage: k, status: label }); }}>{label}<br /><span className="small">{pct}%</span><div className="progress" style={{ marginTop: 6, background: "rgba(255,255,255,.35)" }}><div style={{ width: pct + "%" }} /></div></button>; })}</div></div>{activeStage === "stage1" && <V2StageOne st={st} update={update} schools={schools} staff={staff} />}{activeStage === "stage2" && <V2StageTwo st={st} update={update} schools={schools} />}{activeStage === "stage3" && <V2StageThree st={st} update={update} schools={schools} />}{activeStage === "stage4" && <V2StageFour st={st} update={update} />}{activeStage === "stage5" && <V2StageFive st={st} update={update} />}</div>;
}

function V2StageOne({ st, update, schools, staff }) {
  const [sub, setSub] = useState("identity");
  const basic = st.basic || {};
  const setBasic = (k, v) => {
    const nb = typeof k === "object" ? { ...basic, ...k } : { ...basic, [k]: v };
    update({ basic: nb, ...v2NamePatch(nb) });
  };
  const tabs = [["identity", "기본 정보"], ["program", "프로그램/목표"], ["schools", "학교 정보"], ["grades", "성적표"], ["tests", "시험"], ["ecs", "EC 기본"], ["awards", "수상내역"], ["report", "기초 보고서"]];
  return <div><V2SubTabs tabs={tabs} active={sub} set={setSub} />{sub === "identity" && <V2Identity st={st} basic={basic} setBasic={setBasic} update={update} staff={staff} />}{sub === "program" && <V2Program st={st} update={update} schools={schools} />}{sub === "schools" && <V2SchoolInfo st={st} update={update} schools={schools} />}{sub === "grades" && <V2TranscriptWithScale st={st} update={update} schools={schools} />}{sub === "tests" && <V2Tests st={st} update={update} />}{sub === "ecs" && <V2Ecs st={st} update={update} />}{sub === "awards" && <V2StandaloneAwards st={st} update={update} />}{sub === "report" && <V2BasicReport st={st} schools={schools} />}</div>;
}
function V2Identity({ st, basic, setBasic, update, staff }) {
  const setOwners = owners => update({ owners, owner: owners[0] || "" });
  const setCommunicationLanguageProfile = (languages, levels) => setBasic({ communicationLanguages: languages, communicationLanguageLevels: levels });
  return <div className="grid">
    <V2Section title="이름 / 생년월일 / 담당자"><div className="grid g4"><V2Field label="성" val={basic.lastNameKo} set={v => setBasic("lastNameKo", v)} /><V2Field label="이름" val={basic.firstNameKo} set={v => setBasic("firstNameKo", v)} /><V2Field label="영문 이름" val={basic.firstNameEn} set={v => setBasic("firstNameEn", v)} /><V2Field label="영문 성" val={basic.lastNameEn} set={v => setBasic("lastNameEn", v)} /><V2Field label="Preferred Name" val={basic.preferredName} set={v => setBasic("preferredName", v)} /><V2Field label="생년월일" type="date" val={basic.dob} set={v => setBasic("dob", v)} /><V2Select label="성별" val={basic.gender} set={v => setBasic("gender", v)} options={["남자", "여자", "미입력"]} /><V2OwnerPicker staff={staff} values={st.owners || []} set={setOwners} /></div></V2Section>
    <V2Section title="출생 / 국적"><div className="grid g3"><V2Field label="출생 도시" val={basic.birthCity} set={v => setBasic("birthCity", v)} /><V2Select label="출생 국가" val={basic.birthCountry} set={v => setBasic("birthCountry", v)} options={V2_COUNTRIES} /><V2Select label="미국 영주권/시민권" val={basic.usStatus} set={v => setBasic("usStatus", v)} options={["없음", "영주권", "시민권", "기타"]} />{basic.birthCountry === "기타" && <V2Field label="출생 국가 직접 입력" val={basic.birthCountryOther} set={v => setBasic("birthCountryOther", v)} />}{basic.usStatus === "기타" && <V2Field label="미국 체류/신분 직접 입력" val={basic.usStatusOther} set={v => setBasic("usStatusOther", v)} />}</div><V2Multi label="국적" values={basic.nationalities || []} set={v => setBasic("nationalities", v)} options={V2_NATIONALITIES} otherValue={basic.nationalityOther} setOther={v => setBasic("nationalityOther", v)} /></V2Section>
    <V2AddressHelper basic={basic} setBasic={setBasic} />
    <V2FamilySection basic={basic} setBasic={setBasic} />
    <V2Section title="언어"><V2Multi label="모국어" values={basic.firstLanguages || []} set={v => setBasic("firstLanguages", v)} options={V2_LANGUAGES} otherValue={basic.firstLanguageOther} setOther={v => setBasic("firstLanguageOther", v)} /><V2Multi label="가정 사용 언어" values={basic.homeLanguages || []} set={v => setBasic("homeLanguages", v)} options={V2_LANGUAGES} otherValue={basic.homeLanguageOther} setOther={v => setBasic("homeLanguageOther", v)} /><V2LanguageLevelPicker label="그 외 소통 가능 언어" values={basic.communicationLanguages || []} levels={basic.communicationLanguageLevels || {}} setBoth={setCommunicationLanguageProfile} options={V2_LANGUAGES} otherValue={basic.communicationLanguageOther} setOther={v => setBasic("communicationLanguageOther", v)} /></V2Section>
    <V2Section title="지원 조건"><div className="grid g3"><V2Select label="Financial Aid" val={basic.financialAid} set={v => setBasic("financialAid", v)} options={["Yes", "No", "미정"]} /><V2Select label="Boarding/Day 지원" val={basic.boardingDay} set={v => setBasic("boardingDay", v)} options={["Boarding", "Day", "Both"]} /><V2Select label="학생 종교" val={basic.studentReligion} set={v => setBasic("studentReligion", v)} options={V2_RELIGION_OPTIONS} />{basic.studentReligion === "Other / 기타" && <V2Field label="학생 종교 직접 입력" val={basic.studentReligionOther} set={v => setBasic("studentReligionOther", v)} />}</div><V2Text label="추가 필수 정보/특이사항" val={basic.requiredNotes} set={v => setBasic("requiredNotes", v)} /></V2Section>
  </div>;
}
function V2Program({ st, update, schools }) {
  return <div className="grid"><V2Section title="프로그램 / 지원 목표"><div className="grid g3"><V2Select label="소속 프로그램" val={st.program} set={v => update({ program: v })} options={V2_PROGRAM_OPTIONS} /><V2Select label="현재 학년" val={st.currentGrade} set={v => update({ currentGrade: v, grade: v })} options={V2_GRADE_OPTIONS} /><V2Select label="지원 연도" val={st.targetYear} set={v => update({ targetYear: v })} options={V2_YEAR_OPTIONS} /><V2Select label="지원 학년" val={st.targetGrade} set={v => update({ targetGrade: v })} options={V2_TARGET_GRADE_OPTIONS} /><V2Field label="프로그램 종료일" type="date" val={st.programEndDate} set={v => update({ programEndDate: v, deadline: v })} /><V2Select label="Stage" val={st.stage} set={v => update({ stage: v })} options={V2_STAGE_KEYS.map(x => x[0])} /></div></V2Section><V2InterestSchools st={st} update={update} schools={schools} /></div>;
}
function V2SchoolInfo({ st, update, schools }) {
  const [modal, setModal] = useState(null);
  const current = st.currentSchoolInfo || {};
  const prev = st.previousSchools || [V2_EMPTY_PREVIOUS()];
  React.useEffect(() => {
    const school = v2FindSchool(schools, st.school);
    const patch = v2SchoolPatch(school);
    const shouldFill = school && Object.values(patch).some(Boolean) && ["type", "email", "phone", "counselor", "address", "website", "gradingScale"].some(k => !current[k] && patch[k]);
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
  const deletePrev = i => update({ previousSchools: prev.filter((_, x) => x !== i) });
  const selectPrev = (i, name) => {
    const school = v2FindSchool(schools, name);
    setPrev(i, { name, _draft: false, ...v2SchoolPatch(school) });
  };
  return <div className="grid">
    <V2Section title="현재 학교">
      <div className="grid g3">
        <V2SmartSchool label="현재 학교" val={st.school} set={setCurrentSchool} schools={schools} />
        <V2Select label="학교 구분" val={current.type} set={v => setCurrentInfo({ type: v })} options={V2_SCHOOL_TYPES} />
        <V2Field label="Website" val={current.website} set={v => setCurrentInfo({ website: v })} />
      </div>
      <div className="grid g4">
        <V2Field label="재학 시작일" type="date" val={current.startDate} set={v => setCurrentInfo({ startDate: v })} />
        <V2Select label="재학 시작 학년" val={current.gradeFrom} set={v => setCurrentInfo({ gradeFrom: v })} options={V2_GRADE_OPTIONS} />
        <V2Field label="졸업 예정일" type="date" val={current.endDate} set={v => setCurrentInfo({ endDate: v })} />
        <V2Select label="현재 학년" val={current.gradeTo} set={v => setCurrentInfo({ gradeTo: v })} options={V2_GRADE_OPTIONS} />
      </div>
      <div className="grid g3">
        <V2Field label="학교 이메일" val={current.email} set={v => setCurrentInfo({ email: v })} />
        <V2Field label="학교 전화번호" val={current.phone} set={v => setCurrentInfo({ phone: v })} />
        <V2Field label="교장/카운슬러" val={current.counselor} set={v => setCurrentInfo({ counselor: v })} />
      </div>
      <V2Field label="현재 학교 주소" val={current.address} set={v => setCurrentInfo({ address: v })} />
    </V2Section>
    <V2Section title="이전 학교">
      <div className="right" style={{ justifyContent: "flex-end", marginBottom: 10 }}>
        <button type="button" className="btn ghost" onClick={() => update(s0 => ({ previousSchools: [...(s0.previousSchools || [V2_EMPTY_PREVIOUS()]), { ...V2_EMPTY_PREVIOUS(), _draft: true }] }))}>학교 추가</button>
      </div>
      {prev.map((p, i) => <div key={i} className="card" style={{ marginBottom: 12, background: "#f9fafb" }}>
        <div className="right" style={{ justifyContent: "space-between", marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>이전 학교 {i + 1}</h3>
          <button type="button" className="btn ghost" onClick={() => deletePrev(i)}>삭제</button>
        </div>
        <div className="grid g3">
          <V2SmartSchool label={`이전 학교 ${i + 1}`} val={p.name} set={v => selectPrev(i, v)} schools={schools} />
          <V2Select label="학교 구분" val={p.type} set={v => setPrev(i, { type: v })} options={V2_SCHOOL_TYPES} />
          <V2Field label="Website" val={p.website} set={v => setPrev(i, { website: v })} />
        </div>
        <div className="grid g4">
          <V2Field label="재학 시작일" type="date" val={p.startDate} set={v => setPrev(i, { startDate: v })} />
          <V2Select label="재학 시작 학년" val={p.gradeFrom} set={v => setPrev(i, { gradeFrom: v })} options={V2_GRADE_OPTIONS} />
          <V2Field label="재학 종료일" type="date" val={p.endDate} set={v => setPrev(i, { endDate: v })} />
          <V2Select label="재학 종료 학년" val={p.gradeTo} set={v => setPrev(i, { gradeTo: v })} options={V2_GRADE_OPTIONS} />
        </div>
        <div className="grid g3">
          <V2Field label="학교 이메일" val={p.email} set={v => setPrev(i, { email: v })} />
          <V2Field label="학교 전화번호" val={p.phone} set={v => setPrev(i, { phone: v })} />
          <V2Field label="교장/카운슬러" val={p.counselor} set={v => setPrev(i, { counselor: v })} />
          <V2Select label="징계/정학" val={p.discipline} set={v => setPrev(i, { discipline: v })} options={["No", "Yes"]} />
          {p.discipline === "Yes" && <V2Field label="징계 내용 및 사유" val={p.disciplineReason} set={v => setPrev(i, { disciplineReason: v })} />}
          <V2Select label="자퇴" val={p.withdrawal} set={v => setPrev(i, { withdrawal: v })} options={["No", "Yes"]} />
          {p.withdrawal === "Yes" && <V2Field label="자퇴 사유" val={p.withdrawalReason} set={v => setPrev(i, { withdrawalReason: v })} />}
        </div>
        <V2Field label="학교 주소" val={p.address} set={v => setPrev(i, { address: v })} />
        <V2Field label="설명/메모" val={p.notes} set={v => setPrev(i, { notes: v })} />
      </div>)}
    </V2Section>
  </div>;
}
function V2CustomSchoolModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(V2_EMPTY_PREVIOUS());
  if (!open) return null;
  const set = (k, v) => setForm({ ...form, [k]: v });
  return <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.35)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}><div className="card" style={{ maxWidth: 760, width: "100%" }}><div className="right" style={{ justifyContent: "space-between" }}><h3>학교 직접 입력</h3><button className="btn ghost" onClick={onClose}>닫기</button></div><div className="grid g3"><V2Field label="학교명" val={form.name} set={v => set("name", v)} /><V2Select label="학교 구분" val={form.type} set={v => set("type", v)} options={V2_SCHOOL_TYPES} /><V2Field label="Website" val={form.website} set={v => set("website", v)} /><V2Field label="학교 이메일" val={form.email} set={v => set("email", v)} /><V2Field label="학교 전화번호" val={form.phone} set={v => set("phone", v)} /><V2Field label="교장/카운슬러" val={form.counselor} set={v => set("counselor", v)} /></div><V2Field label="학교 주소" val={form.address} set={v => set("address", v)} /><button className="btn primary" onClick={() => onSave(form)}>저장</button></div></div>;
}
function V2InterestSchools({ st, update, schools }) {
  const interests = st.interests?.length ? st.interests : [V2_EMPTY_INTEREST(), V2_EMPTY_INTEREST(), V2_EMPTY_INTEREST()];
  const set = (i, patch) => update({ interests: v2SetArr(interests, i, patch) });
  return <V2Section title="관심 학교"><div className="right" style={{ justifyContent: "flex-end", marginBottom: 10 }}><button type="button" className="btn ghost" onClick={() => update({ interests: [...interests, V2_EMPTY_INTEREST()] })}>관심학교 추가</button></div>{interests.map((x, i) => <div className="card" key={i} style={{ marginBottom: 12, background: "#f8fbfe" }}><div className="grid g2"><V2SmartSchool label={`관심 학교 ${i + 1}`} val={x.school} set={v => set(i, { school: v, legacy_school_name: v })} schools={schools} /><V2Field label="이유" val={x.reason || x.note} set={v => set(i, { reason: v, note: v })} /></div><div style={{ display: "grid", gridTemplateColumns: "150px minmax(220px,1.2fr) minmax(220px,1.2fr) minmax(180px,1fr)", gap: 12, alignItems: "end", marginTop: 10 }}><V2Select label="Legacy" val={x.has_legacy_connection || "No"} set={v => set(i, { has_legacy_connection: v, legacy_school_name: x.school })} options={V2_LEGACY_ANSWERS} />{x.has_legacy_connection === "Yes" && <V2Select label="관계" val={x.legacy_relationship_type} set={v => set(i, { legacy_relationship_type: v })} options={V2_LEGACY_RELATIONSHIPS} />}{x.has_legacy_connection === "Yes" && <V2Select label="확인 가능성" val={x.legacy_connection_strength} set={v => set(i, { legacy_connection_strength: v })} options={V2_LEGACY_STRENGTHS} />}{x.has_legacy_connection === "Yes" && <V2Field label="메모" val={x.legacy_notes} set={v => set(i, { legacy_notes: v })} />}</div></div>)}</V2Section>;
}
function v2GradeNumber(v) {
  const m = String(v || "").match(/\d+/);
  return m ? Number(m[0]) : null;
}
function v2TermLabel(t) {
  return [t?.year, t?.season].filter(Boolean).join(" ").trim() || t?.term || "";
}
function v2TermYearNumber(t) {
  const direct = Number(t?.year);
  if (Number.isFinite(direct)) return direct;
  const found = String(t?.term || "").match(/\b(20\d{2})\b/);
  return found ? Number(found[1]) : 0;
}
function v2TermSeasonRank(t) {
  return V2_TERM_SORT_ORDER[t?.season] || V2_TERM_SORT_ORDER[String(t?.term || "").split(/\s+/).find(x => V2_TERM_SEASONS.includes(x))] || 0;
}
function v2SortTranscriptTerms(terms = []) {
  return terms.map((term, index) => ({ term, index })).sort((a, b) => {
    const yearDiff = v2TermYearNumber(b.term) - v2TermYearNumber(a.term);
    if (yearDiff) return yearDiff;
    const seasonDiff = v2TermSeasonRank(b.term) - v2TermSeasonRank(a.term);
    if (seasonDiff) return seasonDiff;
    return a.index - b.index;
  }).map(x => x.term);
}
function v2NormalizePlaceholderTerm(t) {
  const defaultSeason = v2DefaultTranscriptSeason();
  if (defaultSeason !== "Fall" && String(t?.year || "") === String(new Date().getFullYear()) && t?.season === "Fall" && v2TranscriptIsBlank([t])) {
    return { ...t, season: defaultSeason };
  }
  return t;
}
function v2TermHasSubjectInput(term) {
  return (term?.subjects || []).some(s => {
    const subject = String(s.subject || "").trim();
    const rawGrade = String(s.rawGrade || s.grade || "").trim();
    const normalized = String(s.normalizedGrade || "").trim();
    const comment = String(s.comment || "").trim();
    return !!(subject || rawGrade || normalized || comment);
  });
}
function v2RangeIncludes(record, grade) {
  const from = v2GradeNumber(record?.gradeFrom);
  const to = v2GradeNumber(record?.gradeTo);
  if (!from && !to) return false;
  return grade >= (from || to) && grade <= (to || from);
}
function v2SchoolForGrade(st, grade) {
  const previous = (st.previousSchools || []).find(s => s.name && v2RangeIncludes(s, grade));
  if (previous) return previous.name;
  if (st.school && (!st.currentSchoolInfo || v2RangeIncludes(st.currentSchoolInfo, grade))) return st.school;
  return st.school || (st.previousSchools || []).find(s => s.name)?.name || "";
}
function v2PresetTranscriptTerms(st) {
  const currentGrade = v2GradeNumber(st.currentGrade || st.grade) || 8;
  const currentYear = new Date().getFullYear();
  const grades = [currentGrade - 2, currentGrade - 1, currentGrade].filter(g => g >= 4 && g <= 12);
  return v2SortTranscriptTerms(grades.flatMap(grade => {
    const springYear = currentYear - (currentGrade - grade);
    const school = v2SchoolForGrade(st, grade);
    return [
      { ...V2_EMPTY_TERM(school), gradeLevel: `${grade}학년`, year: String(springYear - 1), season: "Fall", term: `${springYear - 1} Fall` },
      { ...V2_EMPTY_TERM(school), gradeLevel: `${grade}학년`, year: String(springYear), season: "Spring", term: `${springYear} Spring` }
    ];
  }));
}
function v2TranscriptIsBlank(terms = []) {
  if (!terms.length) return true;
  return terms.every(t => {
    const hasTermData = [t.termGpa, t.rank].some(v => String(v || "").trim());
    const hasSubjectData = (t.subjects || []).some(s => [s.subject, s.grade, s.comment].some(v => String(v || "").trim()));
    return !hasTermData && !hasSubjectData;
  });
}
function v2AcademicTrendMeta(terms = []) {
  const hasProvidedGpa = (terms || []).some(t => v2TermUsesProvidedGpa(t));
  return hasProvidedGpa
    ? { valueKey: "gpa", valueLabel: "GPA", max: 4.3, ticks: [0, 1, 2, 3, 4], note: "학교에서 제공한 학기 GPA를 기준으로 최근 학업 흐름을 확인합니다. GPA가 입력된 학기만 그래프에 반영됩니다." }
    : { valueKey: "index", valueLabel: "학업 추이 점수", max: 100, ticks: [0, 25, 50, 75, 100], note: "학교에서 GPA를 제공하지 않아, 입력된 성적과 Grading Scale을 기준으로 자체 계산한 학업 추이 점수입니다." };
}
function v2GpaSeries(terms, mode) {
  const meta = v2AcademicTrendMeta(terms);
  const readValue = t => meta.valueKey === "gpa" ? (v2TermUsesProvidedGpa(t) ? v2TermProvidedGpa(t) : null) : v2TermAcademicIndex(t);
  const allRows = (terms || []).map(t => ({ ...t, label: v2TermLabel(t), value: readValue(t) }));
  const rows = allRows.filter(x => x.value !== null && !Number.isNaN(x.value));
  if (mode === "grade") {
    const groups = {};
    rows.forEach(r => { const key = r.gradeLevel || "학년 미입력"; groups[key] = [...(groups[key] || []), r.value]; });
    return { meta, values: Object.entries(groups).sort((a, b) => v2GradeNumber(a[0]) - v2GradeNumber(b[0])).map(([label, values]) => ({ label, value: v2Round(values.reduce((a, b) => a + b, 0) / values.length, meta.valueKey === "gpa" ? 2 : 1) })) };
  }
  if (mode === "school") {
    const groups = {};
    rows.forEach(r => { const key = r.school || "학교 미입력"; groups[key] = [...(groups[key] || []), r.value]; });
    return { meta, values: Object.entries(groups).map(([label, values]) => ({ label, value: v2Round(values.reduce((a, b) => a + b, 0) / values.length, meta.valueKey === "gpa" ? 2 : 1) })) };
  }
  return { meta, values: allRows.slice().reverse().map(r => ({ label: r.label || "학기", value: r.value, missing: r.value === null || Number.isNaN(r.value) })) };
}
function V2GpaLineChart({ terms, mode = "term" }) {
  const series = v2GpaSeries(terms, mode);
  const vals = series.values;
  const meta = series.meta;
  const plotted = vals.map((v, i) => ({ ...v, index: i, numericValue: Number(v.value) })).filter(v => Number.isFinite(v.numericValue));
  if (!vals.length || !plotted.length) return <p className="small muted">성적을 입력하면 학업 추이 그래프가 표시됩니다.</p>;
  const width = 640;
  const height = 260;
  const left = 48;
  const right = 24;
  const top = 26;
  const bottom = 58;
  const max = meta.max;
  const x = i => vals.length === 1 ? width / 2 : left + i * ((width - left - right) / (vals.length - 1));
  const y = value => top + (max - Math.max(0, Math.min(max, value))) / max * (height - top - bottom);
  const points = plotted.map(v => `${x(v.index)},${y(v.numericValue)}`).join(" ");
  return <div><svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", minHeight: 230, background: "#f8fbfe", border: "1px solid #d7e6f3", borderRadius: 8 }}>
    {meta.ticks.map(g => <g key={g}><line x1={left} y1={y(g)} x2={width - right} y2={y(g)} stroke="#dbeafe" /><text x="10" y={y(g) + 4} fontSize="12" fill="#45627c">{meta.valueKey === "gpa" ? `${g}.0` : g}</text></g>)}
    <polyline points={points} fill="none" stroke="#2b7bbb" strokeWidth="3" />
    {vals.map((v, i) => { const value = Number(v.value); const hasValue = Number.isFinite(value); return <g key={`${v.label}-${i}`}>{hasValue && <><circle cx={x(i)} cy={y(value)} r="5" fill="#0f5f99" /><text x={x(i)} y={y(value) - 10} textAnchor="middle" fontSize="12" fill="#12324a">{v.value}</text></>} {!hasValue && <text x={x(i)} y={top + 16} textAnchor="middle" fontSize="10" fill="#9a3412">미입력</text>}<text x={x(i)} y={height - 28} textAnchor="middle" fontSize="11" fill="#45627c">{String(v.label).slice(0, 16)}</text></g>; })}
  </svg><p className="small muted" style={{ margin: "8px 0 0" }}>{meta.note}</p></div>;
}
function V2GpaChartModal({ open, onClose, terms }) {
  const [mode, setMode] = useState("term");
  const meta = v2AcademicTrendMeta(terms);
  if (!open) return null;
  return <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.38)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
    <div className="card" style={{ width: "min(920px, 96vw)", maxHeight: "90vh", overflow: "auto" }}>
      <div className="right" style={{ justifyContent: "space-between", marginBottom: 12 }}><h3>{meta.valueKey === "gpa" ? "GPA 변화 그래프" : "학업 추이 점수 그래프"}</h3><button type="button" className="btn ghost" onClick={onClose}>닫기</button></div>
      <div className="tabs" style={{ marginBottom: 12 }}>{[["term", "학기별 그래프"], ["grade", "학년별 그래프"], ["school", "학교별 그래프"]].map(([k, label]) => <button type="button" key={k} className={"tab " + (mode === k ? "active" : "")} onClick={() => setMode(k)}>{label}</button>)}</div>
      <V2GpaLineChart terms={terms} mode={mode} />
    </div>
  </div>;
}
function v2TestMetricMax(type, label, value) {
  const t = String(type || "").toUpperCase();
  const l = String(label || "").toLowerCase();
  const n = Number(value) || 0;
  if (t === "TOEFL JR") return /overall|total/.test(l) ? 900 : 300;
  if (t === "TOEFL") return /overall|total/.test(l) ? 120 : 30;
  if (t === "IELTS") return 9;
  if (t === "DET") return 160;
  if (t === "SAT") return /overall|total/.test(l) ? 1600 : 800;
  if (t === "PSAT") return /overall|total/.test(l) ? 1520 : 760;
  if (t === "ACT") return 36;
  if (t === "SSAT") return /percentile/.test(l) || n <= 100 ? 100 : (/overall|total/.test(l) ? 2400 : 800);
  return n > 100 ? Math.max(100, n) : 100;
}
function v2TestChartRows(st) {
  return (st.tests || []).map((test, index) => {
    const details = test.details || {};
    const metrics = [];
    const overall = v2TestOverall(test.type, details, test.overall);
    if (overall !== "" && overall !== null && Number.isFinite(Number(overall))) metrics.push({ label: "Overall", value: Number(overall), max: v2TestMetricMax(test.type, "Overall", overall) });
    Object.entries(details).forEach(([label, raw]) => {
      if (/overall|total/i.test(label) && metrics.some(m => m.label === "Overall")) return;
      const value = Number(raw);
      if (Number.isFinite(value)) metrics.push({ label, value, max: v2TestMetricMax(test.type, label, value) });
    });
    return { key: `${test.type || "Test"}-${test.date || index}`, type: test.type || "Test", date: test.date || "", metrics };
  }).filter(row => row.metrics.length);
}
function v2LatestTest(st, pattern) {
  return [...(st.tests || [])].filter(t => pattern.test(String(t.type || ""))).sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))[0] || null;
}
function v2PrimaryTestScore(test) {
  if (!test) return null;
  const d = test.details || {};
  if (/SSAT/i.test(test.type || "")) {
    const hasRaw = ["Verbal Raw Score", "Quantitative Raw Score", "Reading Raw Score"].some(k => v2Num(d[k]));
    return v2Num(d["Overall Percentile"] || d.Percentile || test.percentile || (!hasRaw ? test.overall : ""));
  }
  return v2Num(test.overall || v2TestOverall(test.type, d, ""));
}
function v2SchoolTestTier(school = {}) {
  const rank = v2Num(school.yesRank || school.nicheRank || 99);
  const accept = v2Num(school.accept || 50);
  const ssat = v2Num(school.ssat || 0);
  if (rank <= 12 || accept <= 15 || ssat >= 94) return "top";
  if (rank <= 45 || accept <= 25 || ssat >= 88) return "selective";
  return "balanced";
}
function v2TestingBenchmark(school = {}, type = "") {
  const tier = v2SchoolTestTier(school);
  const req = v2NormalizeEnglishRequirements(school);
  const key = String(type || "").toUpperCase();
  const fromReq = (min, recommended, competitive, note = "") => ({ tier, status: "school_data", min, recommended: recommended || min, competitive: competitive || recommended || min, source: "admin_school_data", note });
  if (key === "TOEFL" && (req.toeflMinimum || req.toeflCompetitive)) return fromReq(Number(req.toeflMinimum || req.toeflCompetitive), Number(req.toeflMinimum || req.toeflCompetitive), Number(req.toeflCompetitive || req.toeflMinimum), req.englishSectionTargets);
  if (key === "TOEFL JR" && (req.toeflJrMinimum || req.toeflJrCompetitive)) return fromReq(Number(req.toeflJrMinimum || req.toeflJrCompetitive), Number(req.toeflJrMinimum || req.toeflJrCompetitive), Number(req.toeflJrCompetitive || req.toeflJrMinimum), req.englishSectionTargets);
  if (key === "IELTS" && (req.ieltsMinimum || req.ieltsCompetitive)) return fromReq(Number(req.ieltsMinimum || req.ieltsCompetitive), Number(req.ieltsMinimum || req.ieltsCompetitive), Number(req.ieltsCompetitive || req.ieltsMinimum), req.englishSectionTargets);
  if (key === "DET" && (req.detMinimum || req.detCompetitive)) return fromReq(Number(req.detMinimum || req.detCompetitive), Number(req.detMinimum || req.detCompetitive), Number(req.detCompetitive || req.detMinimum), req.englishSectionTargets);
  if (key === "SSAT" && (req.ssatRecommended || req.ssatCompetitive)) return fromReq(Number(req.ssatRecommended || req.ssatCompetitive) - 8, Number(req.ssatRecommended || req.ssatCompetitive), Number(req.ssatCompetitive || req.ssatRecommended), req.ssatSectionTargets);
  const table = {
    TOEFL: { top: [100, 108, 112], selective: [90, 100, 105], balanced: [80, 92, 100] },
    "TOEFL JR": { top: [850, 870, 885], selective: [820, 845, 865], balanced: [780, 815, 840] },
    SSAT: { top: [90, 95, 97], selective: [80, 88, 92], balanced: [70, 80, 86] },
    SAT: { top: [1450, 1500, 1550], selective: [1350, 1450, 1500], balanced: [1250, 1350, 1450] },
    ACT: { top: [33, 35, 36], selective: [30, 33, 35], balanced: [27, 30, 33] },
    IELTS: { top: [7, 7.5, 8], selective: [6.5, 7, 7.5], balanced: [6, 6.5, 7] },
    DET: { top: [135, 145, 150], selective: [125, 135, 145], balanced: [115, 125, 135] }
  };
  const vals = table[key]?.[tier];
  if (!vals) return { tier, status: "unknown", source: "insufficient", note: "학교별 목표 점수를 판단할 추가 자료가 필요합니다." };
  return { tier, status: "benchmark", min: vals[0], recommended: vals[1], competitive: vals[2], source: "school_context", note: "" };
}
function v2TestFit(score, benchmark) {
  if (!score || !benchmark?.recommended) return "Insufficient Data";
  if (score >= benchmark.competitive + 5) return "Excellent";
  if (score >= benchmark.competitive) return "Strong";
  if (score >= benchmark.recommended) return "Competitive";
  if (score >= benchmark.min) return "Borderline Competitive";
  if (score >= benchmark.min - 8) return "Below Target";
  return "Significantly Below Target";
}
function v2GeneralTestAnalysis(st) {
  const tests = st.tests || [];
  if (!tests.length) return { summary: "아직 입력된 시험 점수가 없어 시험 기반 분석은 보류합니다.", strengths: [], weaknesses: ["SSAT 또는 영어 공인시험 점수를 입력하면 학교별 해석이 가능해집니다."], next: ["가장 최근 공식 리포트의 총점, 세부 점수, 응시일을 먼저 입력해 주세요."] };
  const ssat = v2LatestTest(st, /SSAT/i);
  const english = v2LatestTest(st, /TOEFL|TOEFL Jr|IELTS|DET/i);
  const sat = v2LatestTest(st, /^(SAT|ACT|PSAT)$/i);
  const strengths = [];
  const weaknesses = [];
  const next = [];
  if (ssat) {
    const d = ssat.details || {};
    const p = v2PrimaryTestScore(ssat);
    if (p >= 90) strengths.push(`SSAT 전체 percentile ${p}는 상위권 보딩 지원에서 경쟁력을 설명할 수 있는 지표입니다.`);
    if (v2Num(d["Quantitative Percentile"]) >= 95) strengths.push("SSAT Quantitative percentile이 높아 Math/STEM 계열 강점으로 연결할 수 있습니다.");
    if (v2Num(d["Verbal Percentile"]) < 88 || v2Num(d["Reading Percentile"]) < 88) weaknesses.push("SSAT Verbal/Reading이 상대적으로 낮으면 영어 기반 토론, reading load, humanities 수업 적응성에 대한 보완 설명이 필요합니다.");
    next.push("다음 SSAT에서는 Verbal과 Reading percentile을 우선 보완하고, Quantitative 강점은 학교별 STEM fit과 연결해 주세요.");
  }
  if (english) {
    const d = english.details || {};
    const score = v2PrimaryTestScore(english);
    strengths.push(`${english.type} ${score}점은 영어 공인시험 기반의 기본 학업 적응력을 보여주는 자료입니다.`);
    if (/TOEFL JR/i.test(english.type || "")) {
      next.push("TOEFL Jr는 Listening, Language Form and Meaning, Reading 세 영역의 균형을 확인해 보딩 수업 적응 가능성을 설명하는 자료로 활용해 주세요.");
    } else if (/TOEFL/i.test(english.type || "")) {
      if (v2Num(d.Speaking) < 24) weaknesses.push("TOEFL Speaking이 낮으면 인터뷰 유창성과 수업 토론 참여 가능성을 별도 자료로 보완해야 합니다.");
      if (v2Num(d.Writing) < 25) weaknesses.push("TOEFL Writing이 낮으면 English/History 등 writing-heavy 과목 적응성을 에세이 샘플과 교사 코멘트로 보완하는 것이 좋습니다.");
      next.push("TOEFL은 총점뿐 아니라 Speaking/Writing을 같이 끌어올리는 전략이 필요합니다.");
    }
  }
  if (sat) {
    const score = v2PrimaryTestScore(sat);
    strengths.push(`${sat.type} ${score}점은 고학년 지원자에게 학업 검증 자료로 활용할 수 있습니다.`);
  }
  return { summary: "입력된 시험 점수는 총점만으로 판단하지 않고, 세부 영역과 목표 학교의 경쟁 수준을 함께 보아야 합니다.", strengths, weaknesses, next };
}
function v2SchoolSpecificTestAnalyses(st, schools = []) {
  const interestNames = (st.interests || []).map(x => x.school).filter(Boolean);
  if (!interestNames.length) return [];
  const tests = (st.tests || []).filter(t => v2PrimaryTestScore(t));
  if (!tests.length) return [];
  return interestNames.map(name => {
    const school = v2FindSchool(schools, name) || { name };
    const comments = tests.map(test => {
      const type = String(test.type || "").toUpperCase();
      const score = v2PrimaryTestScore(test);
      const benchmark = v2TestingBenchmark(school, type);
      if (type === "TOEFL JR") return `${test.type} ${score}/900점은 Listening Comprehension, Language Form and Meaning, Reading Comprehension을 함께 보여주는 영어 준비도 자료입니다. ${school.name} 지원에서는 TOEFL Jr 인정 여부와 TOEFL iBT/IELTS 등 선호 시험 조건을 별도로 확인한 뒤, 현재 점수를 보조 자료로 활용하는 것이 좋습니다.`;
      if (type === "DET" && benchmark.source !== "official") return `${test.type} ${score}점은 참고 자료로 볼 수 있으나, ${school.name}의 DET 인정 여부와 선호 시험을 먼저 확인해야 합니다. 불확실한 경우 TOEFL 또는 IELTS 제출을 권장합니다.`;
      if (!benchmark.recommended) return `${test.type} ${score}점은 현재 입력된 학교 데이터만으로는 학교별 목표 점수와 직접 비교하기 어렵습니다. ${school.name}의 공식 시험 요구사항을 확인한 뒤, 이 점수를 보조 자료로 해석해 주세요.`;
      const fit = v2TestFit(score, benchmark);
      const tierText = benchmark.tier === "top" ? "최상위권" : benchmark.tier === "selective" ? "상위권" : "중상위권";
      let extra = "";
      const d = test.details || {};
      if (type === "TOEFL" && v2Num(d.Speaking) && v2Num(d.Speaking) < 24) extra += " 특히 Speaking 점수는 인터뷰와 토론식 수업 적응성을 추가로 증명해야 하는 신호입니다.";
      if (type === "SSAT" && (v2Num(d["Verbal Percentile"]) < benchmark.recommended || v2Num(d["Reading Percentile"]) < benchmark.recommended)) extra += " Verbal/Reading percentile은 학교 수준 대비 보완 여지가 있으므로 reading-heavy 수업 적응 근거를 함께 제시해 주세요.";
      return `${school.name}의 경쟁 수준을 고려하면 ${test.type} ${score}${type === "SSAT" ? " percentile" : "점"}은 현재 ${fit} 구간으로 볼 수 있습니다. 보다 안정적인 지원력을 만들기 위해서는 ${benchmark.recommended} 이상을 1차 목표로, ${benchmark.competitive} 이상을 경쟁력 있는 목표로 잡는 것이 좋습니다.${extra}`;
    });
    const firstFit = tests[0] ? v2TestFit(v2PrimaryTestScore(tests[0]), v2TestingBenchmark(school, tests[0].type)) : "Insufficient Data";
    return { school, fit: firstFit, comments };
  });
}
function V2TestAnalysisReport({ st, schools }) {
  const general = v2GeneralTestAnalysis(st);
  const schoolSpecific = v2SchoolSpecificTestAnalyses(st, schools);
  return <div>
    <div className="section-title"><span>01-2</span>Test Score Analysis</div>
    <div className="card" style={{ background: "#f8fbfe" }}><h3>General Boarding School Test Analysis</h3><p style={{ lineHeight: 1.8 }}>{general.summary}</p><div className="grid g3"><div><b>강점</b>{(general.strengths.length ? general.strengths : ["아직 뚜렷한 시험 강점이 입력되지 않았습니다."]).map((x, i) => <p className="small" key={i}>{x}</p>)}</div><div><b>보완점</b>{(general.weaknesses.length ? general.weaknesses : ["현재 입력값 기준 큰 약점은 보이지 않지만, 목표 학교별 기준 확인이 필요합니다."]).map((x, i) => <p className="small" key={i}>{x}</p>)}</div><div><b>다음 목표</b>{(general.next.length ? general.next : ["관심 학교별 recommended/competitive 기준을 확인하고 다음 시험 목표를 설정해 주세요."]).map((x, i) => <p className="small" key={i}>{x}</p>)}</div></div></div>
    {schoolSpecific.length > 0 && <div className="card" style={{ marginTop: 12 }}><h3>School-Specific Test Fit Analysis</h3><table className="table"><thead><tr><th>학교</th><th>Test Fit</th><th>해석</th></tr></thead><tbody>{schoolSpecific.map(row => <tr key={row.school.name}><td><b>{row.school.name}</b></td><td><V2ClientCategoryPill category={row.fit} /></td><td>{row.comments.map((c, i) => <p key={i} style={{ lineHeight: 1.75, margin: i ? "8px 0 0" : 0 }}>{c}</p>)}</td></tr>)}</tbody></table></div>}
  </div>;
}
function V2TestScoreChart({ st }) {
  const rows = v2TestChartRows(st);
  if (!rows.length) return <p className="small muted">시험 점수를 입력하면 SSAT, TOEFL 등 주요 시험 그래프가 표시됩니다.</p>;
  return <div className="grid g2">
    {rows.map(row => <div className="card" key={row.key} style={{ background: "#f8fbfe", borderColor: "#d7e6f3" }}>
      <div className="right" style={{ justifyContent: "space-between", marginBottom: 8 }}><h3 style={{ margin: 0 }}>{row.type}</h3>{row.date && <span className="small muted">{row.date}</span>}</div>
      <table className="table"><tbody>{row.metrics.map(metric => {
        const pct = Math.max(0, Math.min(100, (metric.value / metric.max) * 100));
        return <tr key={metric.label}><th style={{ width: 150 }}>{metric.label}</th><td><div className="progress"><div style={{ width: `${pct}%` }} /></div></td><td style={{ width: 88, textAlign: "right" }}>{metric.value}/{metric.max}</td></tr>;
      })}</tbody></table>
    </div>)}
  </div>;
}
function V2GradingScaleEditor({ scale, setScale, compact = false }) {
  const cfg = v2NormalizeGradingScale(scale);
  const edit = patch => setScale(v2NormalizeGradingScale({ ...cfg, ...patch }));
  const editType = gradeInputType => edit({ type: gradeInputType, gradeInputType, entries: gradeInputType === "Custom Scale" || gradeInputType === "Unknown" ? cfg.entries : v2TemplateEntries(gradeInputType), confidence: gradeInputType === "Unknown" ? "Unknown" : cfg.confidence });
  const editEntry = (i, patch) => edit({ entries: v2SetArr(cfg.entries, i, patch) });
  const addEntry = () => edit({ entries: [...cfg.entries, { raw_grade_label: "", normalized_score: "", description: "" }] });
  const showRows = cfg.entries.length || cfg.gradeInputType === "Custom Scale" || cfg.gradeInputType === "Unknown";
  return <div className="card" style={{ background: "#f8fbfe", borderColor: "#cfe2f3", margin: "12px 0" }}>
    <div className="right" style={{ justifyContent: "space-between", marginBottom: 10 }}>
      <div><b>Grading Scale</b><p className="small muted" style={{ margin: "3px 0 0" }}>성적 입력 방식과 GPA 표시 체계를 분리해 저장합니다.</p></div>
      <button type="button" className="btn ghost" onClick={addEntry}>환산 행 추가</button>
    </div>
    <div className="grid g4">
      <V2Select label="성적 입력 방식" val={cfg.gradeInputType} set={editType} options={V2_GRADE_INPUT_TYPES} />
      <V2Select label="GPA 표시 체계" val={cfg.gpaScale} set={v => edit({ gpaScale: v })} options={V2_GPA_SCALE_TYPES} />
      {cfg.gpaScale === "Other" && <V2Field label="GPA Scale 직접 입력" val={cfg.gpaScaleOther} set={v => edit({ gpaScaleOther: v })} />}
      <V2Select label="출처" val={cfg.source} set={v => edit({ source: v })} options={V2_GRADING_SCALE_SOURCES} />
      <V2Select label="신뢰도" val={cfg.confidence} set={v => edit({ confidence: v })} options={V2_GRADING_SCALE_CONFIDENCE} />
      <V2Field label="메모" val={cfg.notes} set={v => edit({ notes: v })} />
    </div>
    {showRows && <table className="table" style={{ marginTop: 10 }}>
      <thead><tr><th>성적 라벨</th><th>정규화 점수</th><th>설명</th><th></th></tr></thead>
      <tbody>{cfg.entries.map((r, i) => <tr key={i}>
        <td><input className="input" value={r.raw_grade_label || ""} onChange={e => editEntry(i, { raw_grade_label: e.target.value })} /></td>
        <td><input className="input" type="number" min="0" max="100" value={r.normalized_score || ""} onChange={e => editEntry(i, { normalized_score: e.target.value })} /></td>
        <td><input className="input" value={r.description || ""} onChange={e => editEntry(i, { description: e.target.value })} /></td>
        <td><button type="button" className="btn ghost" onClick={() => edit({ entries: cfg.entries.filter((_, x) => x !== i) })}>삭제</button></td>
      </tr>)}</tbody>
    </table>}
  </div>;
}
function V2Transcript({ st, update, schools = [] }) {
  const [chartOpen, setChartOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState("");
  const terms = st.academicTerms || [V2_EMPTY_TERM(st.school)];
  const schoolOptions = [...new Set([st.school, ...(st.previousSchools || []).map(s => s.name), ...v2SchoolNames(schools)].filter(Boolean))];
  const saveTerms = next => {
    const normalized = next.map(t => {
      const gradingScale = v2NormalizeGradingScale(t.gradingScale);
      return {
        ...t,
        term: v2TermLabel(t),
        gradingScale,
        subjects: (t.subjects || []).map(s => {
          const rawGrade = s.rawGrade || s.grade || "";
          return { ...s, rawGrade, grade: rawGrade, normalizedGrade: s.normalizedGrade || v2NormalizeGrade(rawGrade, gradingScale) };
        })
      };
    });
    update({ academicTerms: normalized, academics: normalized.map(t => ({ school: t.school, term: v2TermLabel(t), gpa: v2TermGpa(t) || "", comment: (t.subjects || []).map(s => `${s.category || ""} ${s.subject || ""}: ${s.comment || ""}`).join(" / ") })) });
  };
  const editTerm = (i, patch) => saveTerms(v2SetArr(terms, i, patch));
  const editSubject = (ti, si, patch) => editTerm(ti, { subjects: v2SetArr(terms[ti].subjects || [], si, patch) });
  const setTermScale = (ti, scale) => {
    const gradingScale = v2NormalizeGradingScale(scale);
    editTerm(ti, {
      gradingScale,
      subjects: (terms[ti].subjects || []).map(s => {
        const rawGrade = s.rawGrade || s.grade || "";
        return { ...s, rawGrade, grade: rawGrade, normalizedGrade: v2NormalizeGrade(rawGrade, gradingScale) };
      })
    });
  };
  const setRawGrade = (ti, si, rawGrade) => {
    const gradingScale = v2NormalizeGradingScale(terms[ti].gradingScale);
    editSubject(ti, si, { rawGrade, grade: rawGrade, normalizedGrade: v2NormalizeGrade(rawGrade, gradingScale) });
  };
  const setTermSchool = (ti, school) => {
    const currentScale = terms[ti].gradingScale;
    const defaultScale = currentScale?.source && currentScale.source !== "Unknown" ? currentScale : v2SchoolGradingScale(schools, school);
    editTerm(ti, { school, gradingScale: defaultScale });
  };
  const addSubject = ti => editTerm(ti, { subjects: [...(terms[ti].subjects || []), { category: "English", subject: "", grade: "", rawGrade: "", normalizedGrade: "", comment: "" }] });
  React.useEffect(() => {
    if (v2TranscriptIsBlank(terms) && (st.school || st.currentGrade || st.grade)) saveTerms(v2PresetTranscriptTerms(st));
  }, [st.school, st.currentGrade, st.grade, JSON.stringify(st.currentSchoolInfo || {}), JSON.stringify(st.previousSchools || [])]);
  return <div className="grid">
    <V2Section title="GPA 요약">
      <div className="grid g2">
        <button type="button" className="card" style={{ textAlign: "left", background: "#eef7ff", cursor: "pointer" }} onClick={() => setChartOpen(true)}><span className="label">누적 GPA</span><h2 style={{ margin: "6px 0 0" }}>{v2CumulativeGpa(terms) || "미입력"}</h2><span className="small muted">클릭하면 GPA 변화 그래프가 열립니다.</span></button>
        <Metric title="최근 학기 GPA" val={v2TermGpa(terms[terms.length - 1]) || "미입력"} />
      </div>
      <V2GpaChartModal open={chartOpen} onClose={() => setChartOpen(false)} terms={terms} />
    </V2Section>
    <ArrayEditor title="성적표 / Teacher's Comment" rows={terms} add={() => saveTerms([...terms, V2_EMPTY_TERM(st.school)])} render={(t, ti) => <div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(160px,1.5fr) repeat(5,minmax(105px,1fr))", gap: 12 }}><V2Field label="학교" val={t.school} set={v => editTerm(ti, { school: v })} list={schoolOptions} /><V2Select label="학년" val={t.gradeLevel} set={v => editTerm(ti, { gradeLevel: v })} options={V2_GRADE_OPTIONS} /><V2Select label="연도" val={t.year} set={v => editTerm(ti, { year: v })} options={V2_TRANSCRIPT_YEARS} /><V2Select label="시즌" val={t.season} set={v => editTerm(ti, { season: v })} options={V2_TERM_SEASONS} /><V2Field label="학기 GPA" val={t.termGpa} set={v => editTerm(ti, { termGpa: v })} /><V2Field label="Rank" val={t.rank} set={v => editTerm(ti, { rank: v })} /></div>
      <table className="table"><thead><tr><th>과목 분류</th><th>과목명</th><th>Letter Grade</th><th>Teacher's Comment</th><th></th></tr></thead><tbody>{(t.subjects || []).map((s, si) => <React.Fragment key={si}><tr><td><select className="select" value={s.category || ""} onChange={e => editSubject(ti, si, { category: e.target.value })}><option value="">선택</option>{V2_SUBJECT_CATEGORIES.map(o => <option key={o} value={o}>{o}</option>)}</select></td><td><input className="input" value={s.subject || ""} onChange={e => editSubject(ti, si, { subject: e.target.value })} /></td><td><select className="select" value={s.grade || ""} onChange={e => editSubject(ti, si, { grade: e.target.value })}><option value="">선택</option>{V2_LETTER_GRADES.map(o => <option key={o} value={o}>{o}</option>)}</select></td><td><button type="button" className="btn ghost" onClick={() => setCommentOpen(commentOpen === `${ti}-${si}` ? "" : `${ti}-${si}`)}>{s.comment ? "보기" : "+"}</button></td><td><button type="button" className="btn ghost" onClick={() => editTerm(ti, { subjects: (t.subjects || []).filter((_, x) => x !== si) })}>삭제</button></td></tr>{commentOpen === `${ti}-${si}` && <tr><td colSpan="5"><V2Text label="Teacher's Comment" val={s.comment} set={v => editSubject(ti, si, { comment: v })} minHeight={58} /></td></tr>}</React.Fragment>)}</tbody></table>
      <button type="button" className="btn ghost" onClick={() => addSubject(ti)}>과목 추가</button>
    </div>} />
  </div>;
}
function V2TranscriptWithScale({ st, update, schools = [] }) {
  const [chartOpen, setChartOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState("");
  const [scaleOpen, setScaleOpen] = useState({});
  const [termOpen, setTermOpen] = useState({});
  const seenTermIds = {};
  const baseTerms = (st.academicTerms || [V2_EMPTY_TERM(st.school)]).map((term, index) => {
    const normalizedTerm = v2NormalizePlaceholderTerm(term);
    const rawTermId = normalizedTerm.termId || term?.id || `legacy-term-${index}`;
    const termId = seenTermIds[rawTermId] ? `${rawTermId}-${index}` : rawTermId;
    seenTermIds[rawTermId] = true;
    return { ...normalizedTerm, termId };
  });
  const terms = baseTerms;
  const sortedTerms = v2SortTranscriptTerms(terms);
  const schoolOptions = v2StudentSchoolNames(st);
  const transcriptSchools = v2TranscriptSchoolNames(st);
  const defaultSchool = v2AllowedTranscriptSchool(st, st.school);
  const transcriptTrendMeta = v2AcademicTrendMeta(sortedTerms);
  const transcriptTrendValues = v2GpaSeries(sortedTerms, "term").values;
  const latestTrendValue = transcriptTrendValues[0]?.value || "미입력";
  const setSchoolScale = (schoolName, scale) => update({ ...v2PatchStudentSchoolScale(st, schoolName, scale), academicTerms: v2RecalculateTermsWithScale(baseTerms, schoolName, scale) });
  const normalizeTerms = next => {
    const usedTermIds = {};
    return next.map((t, index) => {
      const cleanTerm = t || {};
      const normalizedTerm = v2NormalizePlaceholderTerm(cleanTerm);
      const rawTermId = normalizedTerm.termId || cleanTerm.id || `legacy-term-${index}`;
      const termId = usedTermIds[rawTermId] ? `${rawTermId}-${index}` : rawTermId;
      usedTermIds[rawTermId] = true;
      const termInput = { ...normalizedTerm, termId };
      const school = v2AllowedTranscriptSchool(st, termInput.school);
      const gradingScale = v2StudentSchoolScale(st, schools, school, termInput.gradingScale);
      return {
        ...termInput,
        school,
        term: v2TermLabel(termInput),
        gradingScale,
        subjects: (termInput.subjects || []).map(s => {
          const rawGrade = s.rawGrade || s.grade || "";
          return { ...s, rawGrade, grade: rawGrade, normalizedGrade: s.normalizedGrade || v2NormalizeGrade(rawGrade, gradingScale) };
        })
      };
    });
  };
  const saveTerms = next => {
    const normalized = normalizeTerms(next);
    update({
      academicTerms: normalized,
      academics: normalized.map(t => ({
        school: t.school,
        term: v2TermLabel(t),
        gpa: v2TermGpa(t) || "",
        gradingScale: t.gradingScale,
        comment: (t.subjects || []).map(s => `${s.category || ""} ${s.subject || ""}: ${s.comment || ""}`).join(" / ")
      }))
    });
  };
  const editTerm = (i, patch) => {
    const targetTermId = terms[i]?.termId;
    if (!targetTermId) return saveTerms(v2SetArr(baseTerms, i, patch));
    saveTerms(terms.map(term => term.termId === targetTermId ? { ...term, ...patch, termId: targetTermId } : term));
  };
  const moveTermByIndex = (fromIndex, toIndex) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= terms.length || toIndex >= terms.length || fromIndex === toIndex) return;
    const next = [...terms];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    saveTerms(next);
  };
  const editSubject = (ti, si, patch) => editTerm(ti, { subjects: v2SetArr(terms[ti].subjects || [], si, patch) });
  const setRawGrade = (ti, si, rawGrade) => {
    const school = v2AllowedTranscriptSchool(st, terms[ti].school);
    const gradingScale = v2StudentSchoolScale(st, schools, school, terms[ti].gradingScale);
    editSubject(ti, si, { rawGrade, grade: rawGrade, normalizedGrade: v2NormalizeGrade(rawGrade, gradingScale) });
  };
  const setTermSchool = (ti, school) => {
    const allowedSchool = v2AllowedTranscriptSchool(st, school);
    const gradingScale = v2StudentSchoolScale(st, schools, allowedSchool, terms[ti].gradingScale);
    editTerm(ti, { school: allowedSchool, gradingScale });
  };
  const addSubject = ti => editTerm(ti, { subjects: [...(terms[ti].subjects || []), { category: "English", subject: "", grade: "", rawGrade: "", normalizedGrade: "", comment: "" }] });
  React.useEffect(() => {
    if (v2TranscriptIsBlank(terms) && (st.school || st.currentGrade || st.grade)) saveTerms(v2PresetTranscriptTerms(st));
    else if (schoolOptions.length && terms.some(t => !schoolOptions.includes(t.school))) saveTerms(terms);
  }, [st.school, st.currentGrade, st.grade, JSON.stringify(st.currentSchoolInfo || {}), JSON.stringify(st.previousSchools || []), JSON.stringify(schoolOptions)]);
  return <div className="grid">
    <V2Section title={transcriptTrendMeta.valueKey === "gpa" ? "GPA 요약" : "학업 추이 요약"}>
      <div className="grid g2">
        <button type="button" className="card" style={{ textAlign: "left", background: "#eef7ff", cursor: "pointer" }} onClick={() => setChartOpen(true)}><span className="label">{transcriptTrendMeta.valueKey === "gpa" ? "누적 GPA" : "최근 학업 추이 점수"}</span><h2 style={{ margin: "6px 0 0" }}>{transcriptTrendMeta.valueKey === "gpa" ? (v2CumulativeGpa(terms) || "미입력") : latestTrendValue}</h2><span className="small muted">클릭하면 학업 추이 그래프를 볼 수 있습니다.</span></button>
        <Metric title={transcriptTrendMeta.valueKey === "gpa" ? "최근 학기 GPA" : "최근 학기 추이 점수"} val={transcriptTrendMeta.valueKey === "gpa" ? (v2TermProvidedGpa(sortedTerms[0]) || "미입력") : latestTrendValue} />
      </div>
      <V2GpaChartModal open={chartOpen} onClose={() => setChartOpen(false)} terms={sortedTerms} />
    </V2Section>
    <V2Section title="학교별 Grading Scale">
      <p className="small muted">학교별로 한 번만 설정하면 아래 학기 성적 입력에 자동으로 적용됩니다. 학교가 여러 개인 경우 각 학교별로 별도 설정할 수 있습니다.</p>
      {transcriptSchools.map(name => {
        const open = !!scaleOpen[name];
        return <div key={name} className="card" style={{ background: "#f8fbfe", borderColor: "#c3ddf0", marginBottom: 10 }}>
          <div className="right" style={{ justifyContent: "space-between" }}>
            <h3 style={{ margin: 0 }}>{name}</h3>
            <button type="button" className="btn ghost" onClick={() => setScaleOpen({ ...scaleOpen, [name]: !open })}>Grading Scale</button>
          </div>
          {open && <V2GradingScaleEditor scale={v2StudentSchoolScale(st, schools, name, V2_EMPTY_GRADING_SCALE())} setScale={scale => setSchoolScale(name, scale)} />}
        </div>;
      })}
    </V2Section>
    <ArrayEditor title="성적표 / Teacher's Comment" rows={terms} add={() => saveTerms([V2_EMPTY_TERM(defaultSchool), ...terms])} render={(t, ti) => {
      const termSchool = v2AllowedTranscriptSchool(st, t.school);
      const scale = v2StudentSchoolScale(st, schools, termSchool, t.gradingScale);
      const rawOptions = scale.entries.map(e => e.raw_grade_label).filter(Boolean);
      const numericGrade = v2ScaleNeedsNumeric(scale.gradeInputType);
      const header = v2TermLabel(t) || `학기 ${ti + 1}`;
      const termKey = t.termId || `${termSchool || ""}|${t.gradeLevel || ""}|${t.year || ""}|${t.season || ""}|${ti}`;
      const open = termOpen[termKey] !== false;
      const hasSubjectInput = v2TermHasSubjectInput(t);
      const statusColor = hasSubjectInput ? "#e8f4fb" : "#fff3df";
      const borderColor = hasSubjectInput ? "#b8d8ec" : "#e7a84b";
      return <div
        key={`${t.termId || "term"}-${ti}`}
        data-term-id={t.termId || ""}
        className="term-editor"
        style={{ border: `2px solid ${borderColor}`, borderRadius: 8, overflow: "hidden", background: "#fff" }}>
        <div style={{ width: "100%", border: 0, background: statusColor, borderBottom: open ? `1px solid ${borderColor}` : 0, padding: "12px 14px", marginBottom: open ? 14 : 0 }}>
          <div className="right" style={{ justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <button type="button" onClick={() => setTermOpen({ ...termOpen, [termKey]: !open })} style={{ flex: 1, border: 0, background: "transparent", padding: 0, textAlign: "left", cursor: "pointer" }}>
              <h3 style={{ margin: "0 0 4px" }}>{header}</h3>
              <span className="small muted">{termSchool || "학교 미입력"}</span>
            </button>
            <div className="right" style={{ gap: 8 }}>
              <button type="button" className="btn ghost" onClick={() => moveTermByIndex(ti, ti - 1)} disabled={ti === 0} title="위로 이동" style={{ padding: "7px 10px", opacity: ti === 0 ? .45 : 1 }}>↑</button>
              <button type="button" className="btn ghost" onClick={() => moveTermByIndex(ti, ti + 1)} disabled={ti === terms.length - 1} title="아래로 이동" style={{ padding: "7px 10px", opacity: ti === terms.length - 1 ? .45 : 1 }}>↓</button>
              <span className={"pill " + (hasSubjectInput ? "p-green" : "p-amber")}>{hasSubjectInput ? "과목 입력" : "과목 미입력"}</span>
              <button type="button" className="pill p-blue" onClick={() => setTermOpen({ ...termOpen, [termKey]: !open })} style={{ border: 0, cursor: "pointer" }}>{open ? "접기" : "펼치기"}</button>
            </div>
          </div>
        </div>
        {open && <div style={{ padding: "0 12px 12px" }}>
          <div className="right" style={{ justifyContent: "space-between", marginBottom: 10 }}>
            <span className="small muted">헤더의 ↑ / ↓ 버튼으로 성적표 카드 순서를 바꿀 수 있습니다.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(160px,1.5fr) repeat(5,minmax(105px,1fr))", gap: 12 }}>
            <V2Select label="학교" val={termSchool} set={v => setTermSchool(ti, v)} options={schoolOptions} />
            <V2Select label="학년" val={t.gradeLevel} set={v => editTerm(ti, { gradeLevel: v })} options={V2_GRADE_OPTIONS} />
            <V2Select label="연도" val={t.year} set={v => editTerm(ti, { year: v })} options={V2_TRANSCRIPT_YEARS} />
            <V2Select label="학기" val={t.season} set={v => editTerm(ti, { season: v })} options={V2_TERM_SEASONS} />
            <V2Field label="학기 GPA" val={t.termGpa} set={v => editTerm(ti, { termGpa: v })} />
            <V2Field label="Rank" val={t.rank} set={v => editTerm(ti, { rank: v })} />
          </div>
          <V2AttachmentField label="원본 성적표/리포트" url={t.attachmentUrl} set={v => editTerm(ti, { attachmentUrl: v })} />
          <table className="table"><thead><tr><th>과목 분류</th><th>과목명</th><th>성적</th><th>정규화 점수</th><th>Teacher's Comment</th><th></th></tr></thead><tbody>{(t.subjects || []).map((s, si) => <React.Fragment key={si}>
            <tr>
              <td><select className="select" value={s.category || ""} onChange={e => editSubject(ti, si, { category: e.target.value })}><option value="">선택</option>{V2_SUBJECT_CATEGORIES.map(o => <option key={o} value={o}>{o}</option>)}</select></td>
              <td><input className="input" value={s.subject || ""} onChange={e => editSubject(ti, si, { subject: e.target.value })} /></td>
              <td>{numericGrade ? <input className="input" type="number" value={s.rawGrade || s.grade || ""} onChange={e => setRawGrade(ti, si, e.target.value)} /> : rawOptions.length ? <select className="select" value={s.rawGrade || s.grade || ""} onChange={e => setRawGrade(ti, si, e.target.value)}><option value="">선택</option>{rawOptions.map(o => <option key={o} value={o}>{o}</option>)}</select> : <input className="input" value={s.rawGrade || s.grade || ""} onChange={e => setRawGrade(ti, si, e.target.value)} />}</td>
              <td><input className="input" type="number" min="0" max="100" value={s.normalizedGrade ?? v2NormalizeGrade(s.rawGrade || s.grade, scale)} onChange={e => editSubject(ti, si, { normalizedGrade: e.target.value })} /></td>
              <td><button type="button" className="btn ghost" onClick={() => setCommentOpen(commentOpen === `${ti}-${si}` ? "" : `${ti}-${si}`)}>{s.comment ? "보기" : "+"}</button></td>
              <td><button type="button" className="btn ghost" onClick={() => editTerm(ti, { subjects: (t.subjects || []).filter((_, x) => x !== si) })}>삭제</button></td>
            </tr>
            {commentOpen === `${ti}-${si}` && <tr><td colSpan="6"><V2Text label="Teacher's Comment" val={s.comment} set={v => editSubject(ti, si, { comment: v })} minHeight={58} /></td></tr>}
          </React.Fragment>)}</tbody></table>
          <button type="button" className="btn ghost" onClick={() => addSubject(ti)}>과목 추가</button>
        </div>
        }
      </div>;
    }} />
  </div>;
}
function V2Tests({ st, update }) {
  const tests = st.tests || [];
  const edit = (i, patch) => update({ tests: v2SetArr(tests, i, patch) });
  const setFinalSubmission = (i, value) => {
    if (value === "Yes") update({ tests: tests.map((t, idx) => ({ ...t, finalSubmission: idx === i ? "Yes" : "No" })) });
    else edit(i, { finalSubmission: value });
  };
  const remove = i => update({ tests: tests.filter((_, x) => x !== i) });
  return <ArrayEditor title="Standardized / English Tests" rows={tests} add={() => update({ tests: [...tests, V2_EMPTY_TEST()] })} remove={remove} render={(r, i) => {
    const fields = V2_TEST_FIELDS[r.type] || [];
    const details = r.details || {};
    const isSsat = r.type === "SSAT";
    const setDetail = (k, v) => {
      const nextDetails = { ...details, [k]: v };
      edit(i, { details: nextDetails, overall: v2TestOverall(r.type, nextDetails, r.overall) });
    };
    const overall = v2TestOverall(r.type, details, r.overall);
    if (isSsat) {
      return <div>
        <div className="grid g4">
          <V2Select label="시험 종류" val={r.type} set={v => edit(i, { type: v, details: {}, overall: "" })} options={Object.keys(V2_TEST_FIELDS)} />
          <V2Field label="응시일" type="date" val={r.date} set={v => edit(i, { date: v })} />
          <V2Field label="다음 시험일" type="date" val={r.nextDate} set={v => edit(i, { nextDate: v })} />
          <V2Select label="Test Level" val={details["Test Level"]} set={v => setDetail("Test Level", v)} options={["Lower", "Upper"]} />
          <V2Select label="최종 제출용 회차" val={r.finalSubmission || "미정"} set={v => setFinalSubmission(i, v)} options={["미정", "Yes", "No"]} />
        </div>
        <div className="grid g4">
          <div className="field"><span className="label">총점 (Overall Score)</span><input className="input" value={overall || ""} readOnly /></div>
          {fields.map(f => <V2Field key={f} label={f} val={details[f]} set={v => setDetail(f, v)} type="number" />)}
        </div>
        <V2AttachmentField label="시험 리포트 링크" url={r.attachmentUrl} set={v => edit(i, { attachmentUrl: v })} />
        <V2Text label="세부 코멘트 / 리포트 메모" val={r.note || r.detail} set={v => edit(i, { note: v, detail: v })} />
      </div>;
    }
    return <div><div className="grid g4"><V2Select label="시험 종류" val={r.type} set={v => edit(i, { type: v, details: {}, overall: "" })} options={Object.keys(V2_TEST_FIELDS)} /><V2Field label="응시일" type="date" val={r.date} set={v => edit(i, { date: v })} /><V2Field label="다음 시험일" type="date" val={r.nextDate} set={v => edit(i, { nextDate: v })} /><V2Select label="최종 제출용 회차" val={r.finalSubmission || "미정"} set={v => setFinalSubmission(i, v)} options={["미정", "Yes", "No"]} /><V2Field label="총점/Overall" val={overall} set={v => edit(i, { overall: v })} /></div><div className="grid g4">{fields.map(f => <V2Field key={f} label={f} val={details[f]} set={v => setDetail(f, v)} type={/Score|Percentile|Overall|Math|Reading|Writing|Speaking|Listening|English|Science|Literacy|Comprehension|Conversation|Production|Language Form/i.test(f) ? "number" : "text"} />)}</div><V2AttachmentField label="시험 리포트 링크" url={r.attachmentUrl} set={v => edit(i, { attachmentUrl: v })} /><V2Text label="세부 코멘트 / 리포트 메모" val={r.note || r.detail} set={v => edit(i, { note: v, detail: v })} /></div>;
  }} />;
}
function v2ActivitySuggestions(cat) {
  const map = {
    Music: ["Orchestra", "Choir", "Band", "Piano", "Violin", "Cello", "Composition", "Music Production"],
    Arts: ["Visual Arts", "Painting", "Drawing", "Photography", "Film", "Theater", "Design", "Portfolio"],
    "Community Services": ["Volunteer Tutoring", "Community Service", "Fundraising", "Peer Mentoring", "Environmental Service"],
    STEM: ["Robotics", "Coding Project", "Research Project", "Science Olympiad", "Math Team", "Engineering Club"],
    "Debate/Speech": ["Debate", "Speech", "Model UN", "Mock Trial", "Public Forum", "Student Presentation"],
    "Journalism/Publication": ["School Newspaper", "Yearbook", "Literary Magazine", "Podcast", "Broadcasting"],
    "Internship/Entrepreneurship": ["Internship", "Startup Project", "Business Club", "Market Research", "Social Venture"],
    "Academic & Intellectual": ["Academic Team", "Book Club", "History Bowl", "Language Club", "Independent Study"]
  };
  return map[cat] || V2_ACTIVITY_SUGGESTIONS;
}
function V2AwardEditor({ awards = [], setAwards }) {
  const rows = awards.length ? awards : [];
  const edit = (i, patch) => setAwards(v2SetArr(rows, i, patch));
  return <div style={{ marginTop: 12 }}><div className="right" style={{ justifyContent: "space-between", marginBottom: 8 }}><b>관련 수상내역</b><button type="button" className="btn ghost" onClick={() => setAwards([...rows, V2_EMPTY_AWARD()])}>수상 추가</button></div>
    {rows.length ? <table className="table"><thead><tr><th>레벨</th><th>대회명</th><th>상 이름</th><th>수상 연월</th><th>포지션</th><th>비고</th><th></th></tr></thead><tbody>{rows.map((a, i) => <tr key={i}><td><select className="select" value={a.level || ""} onChange={e => edit(i, { level: e.target.value })}><option value="">선택</option>{V2_AWARD_LEVELS.map(o => <option key={o} value={o}>{o}</option>)}</select></td><td><input className="input" value={a.competition || ""} onChange={e => edit(i, { competition: e.target.value })} /></td><td><input className="input" value={a.awardName || ""} onChange={e => edit(i, { awardName: e.target.value })} /></td><td><input className="input" type="month" value={a.date || ""} onChange={e => edit(i, { date: e.target.value })} /></td><td><input className="input" value={a.position || ""} onChange={e => edit(i, { position: e.target.value })} /></td><td><input className="input" value={a.notes || ""} onChange={e => edit(i, { notes: e.target.value })} /></td><td><button type="button" className="btn ghost" onClick={() => setAwards(rows.filter((_, x) => x !== i))}>삭제</button></td></tr>)}</tbody></table> : <p className="small muted">수상내역이 있으면 추가해 주세요. 없으면 비워두면 됩니다.</p>}
  </div>;
}
function V2StandaloneAwards({ st, update }) {
  return <V2Section title="수상내역 / Honors">
    <p className="small muted">EC 활동 카드에 연결되지 않는 독립 수상, Honor, 학교 내외부 표창을 입력합니다. 입력된 내용은 Stage 2 전략보고서에서 학생의 성취 근거로 함께 활용됩니다.</p>
    <V2AwardEditor awards={st.awards || []} setAwards={awards => update({ awards })} />
  </V2Section>;
}
function V2Ecs({ st, update }) {
  const ecs = st.ecs || [];
  const edit = (i, patch) => update({ ecs: v2OrderCoreEcs(v2SetArr(ecs, i, patch)) });
  const remove = i => update({ ecs: v2OrderCoreEcs(ecs.filter((_, x) => x !== i)) });
  const toggleCore = i => {
    const nextValue = !ecs[i]?.core;
    if (nextValue && ecs.filter(e => e.core).length >= 3) {
      alert("핵심 활동은 최대 3개까지 선택할 수 있습니다.");
      return;
    }
    edit(i, { core: nextValue });
  };
  return <ArrayEditor title="EC 활동" rows={ecs} add={() => update({ ecs: [...ecs, { ...V2_EMPTY_EC(), activityId: `ec-${Date.now()}-${Math.random().toString(36).slice(2)}` }] })} render={(r, i) => {
    const isSports = r.cat === "Sports";
    const levelOptions = isSports ? V2_EC_LEVELS : ["School", "Regional/Local", "National", "International", "Independent/Personal", "기타"];
    const nameLabel = isSports ? "종목" : "활동명";
    const teamLabel = isSports ? "팀/클럽명" : "기관/클럽/프로젝트명";
    return <div>
      <div className="right" style={{ justifyContent: "space-between", marginBottom: 10 }}>
        <button type="button" className={"btn " + (r.core ? "primary" : "ghost")} onClick={() => toggleCore(i)}>{r.core ? "★ 핵심 활동" : "☆ 핵심 활동"}</button>
        <button type="button" className="btn warn" onClick={() => remove(i)}>카드 삭제</button>
      </div>
      <div className="grid g4">
        <V2Select label="활동 분류" val={r.cat} set={v => edit(i, { cat: v, name: "", level: "", levelOther: "" })} options={V2_EC_CATEGORIES_CLIENT} />
        <V2Select label="상태" val={r.status} set={v => edit(i, { status: v, to: v === "진행 중" ? "" : r.to })} options={V2_EC_STATUS} />
        {isSports ? <V2SearchSelect label={nameLabel} val={r.name} set={v => edit(i, { name: v })} options={V2_SPORTS_LIST} /> : <V2Field label={nameLabel} val={r.name} set={v => edit(i, { name: v })} list={v2ActivitySuggestions(r.cat)} />}
        <V2Field label={teamLabel} val={r.team} set={v => edit(i, { team: v })} />
        <MonthField label="시작" val={r.from} set={v => edit(i, { from: v })} />
        {r.status === "완료" && <MonthField label="종료" val={r.to} set={v => edit(i, { to: v })} />}
        <V2Field label="참여 주 수" val={r.weeks} set={v => edit(i, { weeks: v })} type="number" />
        <V2Field label="주당 시간" val={r.hours} set={v => edit(i, { hours: v })} type="number" />
        <V2Select label={isSports ? "레벨" : "활동 범위"} val={r.level} set={v => edit(i, { level: v })} options={levelOptions} />
        {r.level === "기타" && <V2Field label="레벨 직접 입력" val={r.levelOther} set={v => edit(i, { levelOther: v })} />}
        <V2Field label="포지션/역할" val={r.position} set={v => edit(i, { position: v })} />
      </div>
      {!isSports && <V2Field label="간단 설명" val={r.description} set={v => edit(i, { description: v })} />}
      <V2AwardEditor awards={r.awards || []} setAwards={awards => edit(i, { awards })} />
    </div>;
  }} />;
}
function V2ReportActions({ st }) {
  const openReportPage = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("reportStudent", st.id);
    window.open(url.toString(), "_blank");
  };
  return <div className="card report-actions" style={{ marginBottom: 14 }}>
    <div className="right" style={{ justifyContent: "space-between" }}>
      <div>
        <h3 style={{ marginBottom: 4 }}>보고서 저장 / 공유</h3>
        <p className="small muted" style={{ margin: 0 }}>PDF 저장은 브라우저 인쇄 창에서 “PDF로 저장”을 선택하면 됩니다.</p>
      </div>
      <div className="right">
        <button type="button" className="btn ghost" onClick={openReportPage}>별도 웹페이지 열기</button>
        <button type="button" className="btn primary" onClick={() => window.print()}>PDF 저장</button>
      </div>
    </div>
  </div>;
}
function V2BasicReport({ st, schools }) {
  const recs = (st.interests || []).map(x => x.school).filter(Boolean).map(name => v2FindSchool(schools, name)).filter(Boolean);
  const reportSchools = recs.length ? recs : schools;
  return <><V2ReportActions st={st} /><V2ClientStrategyReport st={{ ...st, academics: v2AcademicSummary(st) }} schools={reportSchools} /></>;
}
function V2StrategyEngineReport({ st, schools, snapshot }) {
  const result = snapshot?.strategyResult || st.strategyResult || v2BuildStrategyResult(st, schools);
  const evaluation = snapshot?.evaluationResult || st.evaluationResult || v2BuildEvaluationResult(st, schools);
  const savedEcRoadmapAnalysis = snapshot?.strategyResult?.ecRoadmapAnalysis || result.ecRoadmapAnalysis || st.ecRoadmapAnalysis;
  const ecRoadmapAnalysis = savedEcRoadmapAnalysis?.domainScores?.length ? savedEcRoadmapAnalysis : v2EcDomainAnalysis(st, schools);
  const signatureProjects = v2ResolveSignatureProjects(st, schools, result.signatureProjects);
  return <div className="report" style={{ marginTop: 14 }}>
    <div className="report-cover">
      <div className="brand">YES Boarding Prep</div>
      <h2>{snapshot?.title || `${st.name || "학생"} Stage 2 전략보고서`}</h2>
      <p>{snapshot ? `저장본 생성일 ${snapshot.createdAt?.slice(0, 10) || ""} · 생성자 ${snapshot.createdBy || ""}` : "현재 입력값 기준 실시간 전략 분석"}</p>
    </div>
    <div className="report-body">
      <div className="section-title"><span>S2-01</span>학생 종합 포지셔닝</div>
      <div className="card" style={{ background: "#f8fbfe" }}>
        <span className="pill p-blue">Hook Strategy</span>
        <h3 style={{ marginTop: 10 }}>“{result.positioning?.hookLine || result.positioning?.character || "학생 캐릭터 분석"}”</h3>
        <p className="small muted">{result.positioning?.character}</p>
        <p style={{ lineHeight: 1.85 }}>{result.positioning?.summary || result.parentSummary}</p>
        {result.positioning?.contributionPlan && <p style={{ lineHeight: 1.85 }}><b>보딩스쿨에서 어떻게 보여줄 것인가</b><br />{result.positioning.contributionPlan}</p>}
        {(result.positioning?.proofPlan || []).length > 0 && <div>
          <b>Hook을 증명할 자료</b>
          <table className="table" style={{ marginTop: 8 }}><thead><tr><th>활동</th><th>보여줄 역량</th><th>만들어야 할 증거</th></tr></thead><tbody>{result.positioning.proofPlan.map((p, i) => <tr key={`${p.activity}-${i}`}><td><b>{p.activity}</b></td><td style={{ lineHeight: 1.65 }}>{p.trait}</td><td style={{ lineHeight: 1.65 }}>{p.proof}</td></tr>)}</tbody></table>
        </div>}
        {(result.positioning?.applicationStrategy || []).length > 0 && <div className="grid g2" style={{ marginTop: 12 }}>
          <div><b>지원서 배치</b>{result.positioning.applicationStrategy.map(row => <p key={row.area} style={{ lineHeight: 1.75 }}><b>{row.area}</b><br />{row.action}</p>)}</div>
          <div><b>실행계획</b>{result.positioning.executionPlan.map(row => <p key={row.period} style={{ lineHeight: 1.75 }}><b>{row.period}</b><br />{row.action}</p>)}</div>
        </div>}
        {(result.positioning?.gaps || []).length > 0 && <div><b>우선 보완점</b>{result.positioning.gaps.slice(0, 4).map((x, i) => <p key={i} style={{ lineHeight: 1.75 }}>{i + 1}. {x}</p>)}</div>}
      </div>

      <div className="section-title"><span>S2-02</span>Signature Project / 3대 스파이크 기획</div>
      <div style={{ display: "grid", gap: 12 }}>{signatureProjects.length ? signatureProjects.map((project, i) => <V2SignatureProjectCard key={project.id || i} project={project} index={i} st={st} schools={schools} />) : <div className="card"><p className="small muted">핵심 활동을 입력하면 Signature Project 추천안이 생성됩니다.</p></div>}</div>

      <div className="section-title"><span>S2-03</span>EC 영역별 준비도</div>
      <V2ReportEcReadiness analysis={ecRoadmapAnalysis} />

      <div className="section-title"><span>S2-04</span>핵심 EC 3개 분석</div>
      <div className="grid g3">{(result.coreEcAnalyses || []).length ? result.coreEcAnalyses.map(ec => <div className="card" key={`${ec.rank}-${ec.activityName}`} style={{ background: "#ffffff" }}>
        <span className="pill p-blue">Core EC {ec.rank}</span>
        <h3>{ec.activityName}</h3>
        <p className="small muted">{ec.category}</p>
        <p style={{ lineHeight: 1.8 }}><b>핵심으로 보는 이유</b><br />{ec.whyCore}</p>
        <p style={{ lineHeight: 1.8 }}><b>입학사정관에게 보이는 캐릭터</b><br />{ec.admissionsCharacter}</p>
        <p style={{ lineHeight: 1.8 }}><b>다음 성과 목표</b><br />{ec.nextGoal}</p>
        <p style={{ lineHeight: 1.8 }}><b>원서/인터뷰 방향</b><br />{ec.applicationAngle}</p>
        <b>부족한 점</b>{ec.gaps.map((x, i) => <p className="small" key={i}>{i + 1}. {x}</p>)}
      </div>) : <div className="card"><p className="small muted">Stage 1 > EC 기본에서 별표 핵심 활동을 지정하면 자동 분석이 생성됩니다.</p></div>}</div>

      <div className="section-title"><span>S2-05</span>시험 Gap 및 학교별 상대 평가</div>
      {(result.testGapAnalyses || []).length ? result.testGapAnalyses.map(row => <div className="card" key={row.school} style={{ marginBottom: 10 }}>
        <h3>{row.school}</h3>
        <table className="table"><thead><tr><th>시험</th><th>현재</th><th>추천 목표</th><th>경쟁 목표</th><th>가장 약한 영역</th><th>해석</th></tr></thead><tbody>{row.gaps.map(g => <tr key={`${row.school}-${g.type}`}><td>{g.type}</td><td>{g.score}</td><td>{g.targetRecommended || "-"}</td><td>{g.targetCompetitive || "-"}</td><td>{g.weakestSection || "-"}</td><td style={{ lineHeight: 1.7 }}>{g.comment}</td></tr>)}</tbody></table>
      </div>) : <p className="small muted">관심학교와 시험 점수를 입력하면 학교별 시험 Gap이 표시됩니다.</p>}

      <div className="section-title"><span>S2-06</span>학교별 Fit 전략</div>
      {(result.schoolFitAnalyses || []).length ? result.schoolFitAnalyses.map(fit => <div className="card" key={fit.school} style={{ marginBottom: 12 }}>
        <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start" }}><h3 style={{ marginTop: 0 }}>{fit.school}</h3><V2ClientCategoryPill category={fit.category} /></div>
        {fit.reasonFromUser && <p style={{ lineHeight: 1.8 }}><b>이 학교를 넣은 이유</b><br />{fit.reasonFromUser}</p>}
        <p style={{ lineHeight: 1.8 }}><b>학교가 중요하게 보는 요소</b><br />{fit.schoolValues}</p>
        <p style={{ lineHeight: 1.8 }}><b>학생과 연결되는 프로그램</b><br />{fit.connectedPrograms.join(" / ")}</p>
        <p style={{ lineHeight: 1.8 }}><b>합격 조건</b><br />{fit.admissionConditions}</p>
        <p style={{ lineHeight: 1.8 }}><b>전략 포인트</b><br />{fit.strategyPoint}</p>
        <b>학교별 필수 보완점</b>{fit.riskFactors.map((x, i) => <p className="small" key={i}>{i + 1}. {x}</p>)}
      </div>) : <p className="small muted">프로그램/목표 > 관심학교를 입력하면 학교별 Fit 전략이 생성됩니다.</p>}

      <div className="section-title"><span>S2-07</span>추천서 전략</div>
      <div className="card" style={{ background: "#f8fbfe" }}>
        <p style={{ lineHeight: 1.8 }}>{result.recommendationStrategy?.summary}</p>
        {(result.recommendationStrategy?.rows || []).length ? <table className="table"><thead><tr><th>우선순위</th><th>후보자</th><th>역할</th><th>관계 강도</th><th>전략적 역할</th><th>다음 액션</th></tr></thead><tbody>{result.recommendationStrategy.rows.map((r, i) => <tr key={`${r.candidate}-${i}`}><td>{i + 1}</td><td><b>{r.candidate}</b></td><td>{r.role || "-"}</td><td>{r.relationshipGap}</td><td style={{ lineHeight: 1.7 }}>{r.strategicRole}<br /><span className="small muted">{r.requiredEvidence}</span></td><td style={{ lineHeight: 1.7 }}>{r.nextAction}</td></tr>)}</tbody></table> : <p className="small muted">Stage 4 > 추천서/계정에서 후보자를 입력하면 추천서 전략이 생성됩니다.</p>}
      </div>

      <div className="section-title"><span>S2-08</span>남은 기간 액션 플랜</div>
      <table className="table"><thead><tr><th>우선순위</th><th>영역</th><th>액션</th><th>중요도</th></tr></thead><tbody>{(result.actionPlan || []).map(a => <tr key={`${a.priority}-${a.area}`}><td>{a.priority}</td><td>{a.area}</td><td style={{ lineHeight: 1.7 }}>{a.action}</td><td>{v2Stars(a.importance)}</td></tr>)}</tbody></table>

      <div className="section-title"><span>S2-09</span>학부모용 요약</div>
      <p style={{ lineHeight: 1.9 }}>{result.parentSummary}</p>
      <p className="small muted">분석 기준: 데이터 모델 {snapshot?.dataVersion?.model || V2_DATA_MODEL_VERSION} · 학교 데이터 {snapshot?.dataVersion?.schoolDataset || window.PREP_SCHOOL_DATA_VERSION || "local"} · Stage 1 총점 {evaluation.legacyStage1?.total || "-"}</p>
    </div>
  </div>;
}
function V2EvidenceMatrixDebug({ result }) {
  const [open, setOpen] = useState(false);
  const rows = result?.evidenceMatrix || [];
  return <div className="card" style={{ marginTop: 14 }}>
    <div className="right" style={{ justifyContent: "space-between" }}><div><h3 style={{ marginBottom: 4 }}>Evidence Matrix Debug View</h3><p className="small muted" style={{ margin: 0 }}>전략 문장이 어떤 입력 근거에서 나왔는지 내부 확인용으로 보는 영역입니다.</p></div><button type="button" className="btn ghost" onClick={() => setOpen(!open)}>{open ? "닫기" : "열기"}</button></div>
    {open && <table className="table" style={{ marginTop: 12 }}><thead><tr><th>Category</th><th>Claim</th><th>Confidence</th><th>Gap</th><th>Report</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><td>{r.category}</td><td style={{ lineHeight: 1.6 }}>{r.claim}<br /><span className="small muted">{String(r.evidenceData || "").slice(0, 180)}</span></td><td>{r.confidence}</td><td style={{ lineHeight: 1.6 }}>{r.gap || "-"}</td><td>{r.reportUsage ? "Yes" : "No"}</td></tr>)}</tbody></table>}
  </div>;
}
function V2StageTwoReportManager({ st, update, schools }) {
  const [selectedSnapshotId, setSelectedSnapshotId] = useState("");
  const snapshots = st.reportSnapshots || [];
  const selectedSnapshot = snapshots.find(s => s.id === selectedSnapshotId);
  const generateSnapshot = () => {
    const snapshot = v2CreateReportSnapshot(st, schools, "Admin");
    update({ reportSnapshots: [snapshot, ...snapshots], reportSnapshot: snapshot });
    setSelectedSnapshotId(snapshot.id);
  };
  const activeResult = selectedSnapshot?.strategyResult || st.strategyResult || v2BuildStrategyResult(st, schools);
  return <div>
    <V2ReportActions st={st} />
    <V2Section title="Stage 2 전략보고서 생성 / 저장본">
      <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" }}>
        <div>
          <p className="small muted" style={{ marginTop: 0 }}>현재 입력값 기준으로 전략보고서를 생성하면 그 시점의 입력값, Stage 1 계산 결과, Stage 2 전략 분석 결과가 저장본으로 고정됩니다.</p>
          <button type="button" className="btn primary" onClick={generateSnapshot}>전략보고서 생성</button>
        </div>
        <div className="field" style={{ minWidth: 280 }}>
          <span className="label">저장된 보고서 열기</span>
          <select className="select" value={selectedSnapshotId} onChange={e => setSelectedSnapshotId(e.target.value)}>
            <option value="">현재 입력값 기준 보기</option>
            {snapshots.map(s => <option key={s.id} value={s.id}>{(s.createdAt || "").slice(0, 10)} · {s.title || s.studentName}</option>)}
          </select>
        </div>
      </div>
    </V2Section>
    <V2ClientStrategyReport st={st} schools={schools} />
    <V2StrategyEngineReport st={st} schools={schools} snapshot={selectedSnapshot} />
    <V2EvidenceMatrixDebug result={activeResult} />
  </div>;
}
function V2ReportEcReadiness({ analysis }) {
  const rows = analysis?.domainScores || [];
  const strongest = [...rows].sort((a, b) => b.score - a.score).slice(0, 2).filter(x => x.score >= 45);
  const entered = [...rows].sort((a, b) => b.score - a.score).slice(0, 2).filter(x => x.score > 0 && x.score < 45);
  const gaps = rows.filter(x => x.score < 45).slice(0, 3);
  return <div className="card" style={{ background: "#f8fbfe" }}>
    <div className="grid g2">
      <V2EcRoadmapChart analysis={analysis} />
      <div>
        <h3 style={{ marginTop: 0 }}>EC 포트폴리오 해석</h3>
        <p style={{ lineHeight: 1.85 }}>{analysis?.parentExplanation || "Stage 1 EC 활동을 입력하면 영역별 준비도 분석이 표시됩니다."}</p>
        {strongest.length > 0 && <p style={{ lineHeight: 1.75 }}><b>현재 가장 활용하기 좋은 축</b><br />{strongest.map(x => `${x.domain} ${x.score}점`).join(" / ")} 영역은 Hook과 지원서 상단 활동을 구성할 때 우선적으로 활용할 수 있습니다.</p>}
        {!strongest.length && entered.length > 0 && <p style={{ lineHeight: 1.75 }}><b>현재 입력된 활동 축</b><br />{entered.map(x => `${x.domain} ${x.score}점`).join(" / ")} 영역에 활동은 입력되어 있으나, 아직 강점으로 단정하기에는 역할·성과·지속성 근거가 더 필요합니다.</p>}
        {gaps.length > 0 && <p style={{ lineHeight: 1.75 }}><b>보완 후보 영역</b><br />{gaps.map(x => x.domain).join(", ")} 영역은 모든 학생이 반드시 채워야 하는 것은 아니지만, 관심학교 성향과 학생 Hook에 필요한 경우 결과물 또는 역할을 추가로 만들어야 합니다.</p>}
        <p className="small muted" style={{ lineHeight: 1.7 }}>이 점수는 합격 가능성 점수가 아니라, 입력된 EC 자료가 각 영역에서 얼마나 명확한 증거로 정리되어 있는지를 보여주는 준비도입니다.</p>
      </div>
    </div>
  </div>;
}
var V2SignatureProjectCard;
var V2SignatureProjectsSection;
V2SignatureProjectCard = function V2SignatureProjectCardDeep({ project, index, editable = false, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(project);
  React.useEffect(() => setDraft(project), [project?.id]);
  const accent = { blue: "#2563eb", cyan: "#0891b2", green: "#059669", purple: "#7c3aed", sky: "#0284c7" }[project.theme] || "#2563eb";
  const setArray = (key, value) => setDraft({ ...draft, [key]: String(value || "").split("\n").map(x => x.trim()).filter(Boolean) });
  const save = () => { onSave?.({ ...draft, manuallyEdited: true }); setEditing(false); };
  const p = editing ? draft : project;
  return <div className="card" style={{ borderLeft: `5px solid ${accent}`, background: "#fff" }}>
    <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
      <div>
        <span className="pill p-blue">HOOK {index + 1}</span>
        {editing ? <V2Field label="Project Title" val={draft.title} set={v => setDraft({ ...draft, title: v })} /> : <h3 style={{ margin: "10px 0 4px" }}>{p.title}</h3>}
        <p className="small muted" style={{ margin: 0 }}>{(p.sourceActivityNames || []).join(" / ")}</p>
      </div>
      <div className="right" style={{ gap: 8 }}>
        <span className="pill" style={{ background: "#eef6ff", color: accent }}>{p.badge}</span>
        {editable && <button type="button" className="btn ghost" onClick={() => editing ? save() : setEditing(true)}>{editing ? "저장" : "수정"}</button>}
        {editable && editing && <button type="button" className="btn ghost" onClick={() => { setDraft(project); setEditing(false); }}>취소</button>}
      </div>
    </div>
    {editing ? <div className="grid g2" style={{ marginTop: 12 }}>
      <V2Field label="Badge" val={draft.badge} set={v => setDraft({ ...draft, badge: v })} />
      <V2Text label="왜 필요한가" val={draft.rationale} set={v => setDraft({ ...draft, rationale: v })} minHeight={90} />
      <V2Text label="현재 상태" val={draft.currentState} set={v => setDraft({ ...draft, currentState: v })} minHeight={90} />
      <V2Text label="목표 상태" val={draft.targetState} set={v => setDraft({ ...draft, targetState: v })} minHeight={90} />
      <V2Text label="Evidence Needed" val={(draft.evidenceNeeded || []).join("\n")} set={v => setArray("evidenceNeeded", v)} minHeight={90} />
      <V2Text label="Risk / Gap" val={(draft.risks || []).join("\n")} set={v => setArray("risks", v)} minHeight={90} />
      <V2Text label="Recommended Next Action" val={(draft.nextActions || []).join("\n")} set={v => setArray("nextActions", v)} minHeight={90} />
      <V2Text label="Application Usage" val={(draft.applicationUsage || []).join("\n")} set={v => setArray("applicationUsage", v)} minHeight={90} />
    </div> : <div>
      <p style={{ lineHeight: 1.8 }}><b>왜 필요한가</b><br />{p.rationale}</p>
      <div className="grid g3">
        <div><b>현재 상태</b><p className="small" style={{ lineHeight: 1.65 }}>{p.currentState}</p></div>
        <div><b>목표 상태</b><p className="small" style={{ lineHeight: 1.65 }}>{p.targetState}</p></div>
        <div><b>지원서 활용</b><p className="small" style={{ lineHeight: 1.65 }}>{(p.applicationUsage || []).join(" / ")}</p></div>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <div><b>확보해야 할 증거</b>{(p.evidenceNeeded || []).map((x, i) => <p className="small" key={i} style={{ lineHeight: 1.55 }}>• {x}</p>)}</div>
        <div><b>다음 액션</b>{(p.nextActions || []).map((x, i) => <p className="small" key={i} style={{ lineHeight: 1.55 }}>• {x}</p>)}</div>
      </div>
      {(p.risks || []).length > 0 && <div style={{ marginTop: 10 }}><b>Risk / Gap</b>{p.risks.map((x, i) => <p className="small" key={i} style={{ lineHeight: 1.55 }}>• {x}</p>)}</div>}
      {(p.semesterRoadmap || []).length > 0 && <table className="table" style={{ marginTop: 12 }}><thead><tr><th>학기</th><th>실행 초점</th><th>산출물</th><th>점검</th></tr></thead><tbody>{p.semesterRoadmap.map((row, i) => <tr key={`${row.period}-${i}`}><td>{row.period}</td><td style={{ lineHeight: 1.55 }}>{row.focus}</td><td style={{ lineHeight: 1.55 }}>{row.deliverable}</td><td>{row.checkpoint}</td></tr>)}</tbody></table>}
    </div>}
  </div>;
};
V2SignatureProjectsSection = function V2SignatureProjectsSectionDeep({ st, update, schools }) {
  const generated = v2GenerateSignatureProjects(st, schools);
  const saved = st.signatureProjects || [];
  const projects = saved.length ? saved : generated;
  const saveAll = next => update({ signatureProjects: next });
  const regenerate = () => {
    if (saved.length && !window.confirm("기존 수동 수정 프로젝트를 추천안으로 다시 생성할까요?")) return;
    saveAll(v2GenerateSignatureProjects(st, schools));
  };
  const configureAi = () => {
    const endpoint = v2PromptSignatureAiEndpoint(true);
    if (endpoint) window.alert(`AI API endpoint saved:\n${endpoint}`);
  };
  const editOne = (idx, nextProject) => {
    const normalizedNext = v2NormalizeSignatureProject(nextProject);
    const nextId = normalizedNext.id || projects[idx]?.id;
    const base = v2ResolveSignatureProjects({ ...st, signatureProjects: saved }, schools).map(v2NormalizeSignatureProject);
    let replaced = false;
    const next = base.map((p, i) => {
      const sameId = nextId && p.id === nextId;
      const sameIndex = !nextId && i === idx;
      if (sameId || sameIndex) {
        replaced = true;
        return v2NormalizeSignatureProject({ ...p, ...normalizedNext, id: nextId || normalizedNext.id || p.id });
      }
      return p;
    });
    if (!replaced) next.splice(idx, 0, v2NormalizeSignatureProject({ ...normalizedNext, id: nextId || normalizedNext.id }));
    saveAll(next.slice(0, 4));
  };
  return <V2Section title="Signature Project / 3대 스파이크 기획">
    <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
      <p className="small muted" style={{ margin: 0, maxWidth: 760 }}>Hook Strategy를 실제 지원서에서 기억되게 만드는 프로젝트 설계입니다. 핵심 EC, 관심학교, EC 영역별 준비도, 남은 지원 기간을 바탕으로 자동 생성되며, 상담 방향에 맞게 수정해 저장할 수 있습니다.</p>
      <div className="right" style={{ gap: 8 }}>
        {!saved.length && <button type="button" className="btn primary" onClick={() => saveAll(generated)}>추천안 저장</button>}
        <button type="button" className="btn ghost" onClick={regenerate}>추천안 다시 생성</button>
      </div>
    </div>
    <div style={{ display: "grid", gap: 14 }}>
      {projects.length ? projects.map((project, i) => <V2SignatureProjectCard key={project.id || i} project={project} index={i} editable onSave={next => editOne(i, next)} st={st} schools={schools} />) : <div className="card"><p className="small muted">Stage 1 EC 기본에서 핵심 활동을 입력하면 Signature Project 추천안이 생성됩니다.</p></div>}
    </div>
  </V2Section>;
}
function V2SignatureProposalView({ proposal }) {
  if (!proposal) return null;
  if (proposal.pptxBase64) {
    return <div style={{ display: "grid", gap: 18 }}>
      <div style={{ borderBottom: "2px solid #173b58", paddingBottom: 12 }}>
        <span className="pill p-green">PPTX 생성 완료</span>
        <h2 style={{ margin: "10px 0 4px", color: "#12344d" }}>{proposal.title}</h2>
        <p style={{ margin: 0, fontSize: 16, color: "#28516d", fontWeight: 800 }}>{proposal.subtitle}</p>
        <p className="small muted" style={{ marginTop: 8 }}>AI가 생성한 slide deck data를 기반으로 편집 가능한 PPTX 파일을 생성했습니다.</p>
      </div>
      <div className="card" style={{ background: "#f8fbfe", borderColor: "#bfd7ea" }}>
        <h3 style={{ marginTop: 0 }}>다운로드</h3>
        <p className="small muted">PPTX 안의 텍스트, 카드, 표, 도형은 편집 가능한 요소로 구성됩니다. Google Slides에서는 이 PPTX를 가져오기(import)하면 됩니다.</p>
        <div className="right" style={{ gap: 10, flexWrap: "wrap" }}>
          <button type="button" className="btn primary" onClick={() => v2DownloadBase64File(proposal.pptxBase64, proposal.pptxFileName || "project_proposal.pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation")}>PPTX 다운로드</button>
          {proposal.pdfBase64 && <button type="button" className="btn ghost" onClick={() => v2DownloadBase64File(proposal.pdfBase64, proposal.pdfFileName || "project_proposal.pdf", "application/pdf")}>PDF 미리보기 다운로드</button>}
        </div>
      </div>
      <div className="grid g2">
        <div className="card">
          <b>파일명</b>
          <p className="small" style={{ marginBottom: 0 }}>{proposal.pptxFileName || "project_proposal.pptx"}</p>
        </div>
        <div className="card">
          <b>구성</b>
          <p className="small" style={{ marginBottom: 0 }}>10-slide editable proposal deck · PPTX import 가능</p>
        </div>
      </div>
    </div>;
  }
  if (Array.isArray(proposal.slides) && proposal.slides.length) {
    return <div style={{ display: "grid", gap: 18 }}>
      <div style={{ borderBottom: "2px solid #173b58", paddingBottom: 12 }}>
        <span className="pill p-amber">PPTX 생성 대기</span>
        <h2 style={{ margin: "10px 0 4px", color: "#12344d" }}>{proposal.title || "Signature Project Proposal"}</h2>
        <p className="small muted" style={{ marginTop: 8 }}>AI가 제안서 구조를 만들었지만 PPTX 파일이 아직 연결되지 않았습니다. AI 고급 생성을 다시 실행해 PPTX 다운로드 파일을 생성해주세요.</p>
      </div>
      <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa" }}>
        <b>내부 생성 데이터는 화면에 표시하지 않습니다.</b>
        <p className="small muted" style={{ marginBottom: 0 }}>고객에게 전달되는 결과물은 PPTX 다운로드 파일 기준으로만 확인합니다.</p>
      </div>
    </div>;
  }
  if (Array.isArray(proposal.slides) && proposal.slides.length) {
    return <div style={{ display: "grid", gap: 18 }}>
      <div style={{ borderBottom: "2px solid #173b58", paddingBottom: 12 }}>
        <span className="pill p-blue">Editable Slide Deck JSON</span>
        <h2 style={{ margin: "10px 0 4px", color: "#12344d" }}>{proposal.title}</h2>
        <p style={{ margin: 0, fontSize: 16, color: "#28516d", fontWeight: 800 }}>{proposal.subtitle}</p>
        <p className="small muted" style={{ marginTop: 8 }}>{proposal.meta}</p>
      </div>
      {(proposal.designSystem?.styleNotes || []).length > 0 && <div className="card" style={{ background: "#f8fbfe" }}>
        <b>Design System</b>
        <div className="right" style={{ flexWrap: "wrap", marginTop: 8 }}>
          {(proposal.designSystem.palette || []).map(x => <span key={x} className="pill p-blue">{x}</span>)}
          {(proposal.designSystem.fonts || []).map(x => <span key={x} className="pill p-green">{x}</span>)}
        </div>
        <p className="small muted" style={{ marginBottom: 0 }}>{proposal.designSystem.styleNotes.join(" · ")}</p>
      </div>}
      {proposal.slides.map(slide => <section key={`${slide.slideNumber}-${slide.title}`} className="card" style={{ border: "1px solid #bfd7ea", background: "#fbfdff", padding: 18 }}>
        <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
          <div>
            <span className="pill p-blue">Slide {slide.slideNumber}</span>
            {slide.sectionLabel && <span className="pill" style={{ marginLeft: 6, background: "#ecfdf5", color: "#047857" }}>{slide.sectionLabel}</span>}
            <h3 style={{ margin: "10px 0 6px", color: "#173b58" }}>{slide.title}</h3>
            <p className="small muted" style={{ margin: 0 }}>{slide.purpose}</p>
          </div>
          <span className="pill" style={{ background: "#fff7ed", color: "#9a3412" }}>Editable</span>
        </div>
        <div className="grid g2">
          <div className="card" style={{ background: "white", padding: 12 }}>
            <b>Layout</b>
            <p className="small" style={{ marginBottom: 0 }}>{slide.layout}</p>
          </div>
          <div className="card" style={{ background: "white", padding: 12 }}>
            <b>Visual Direction</b>
            <p className="small" style={{ marginBottom: 0 }}>{slide.visualDirection}</p>
          </div>
        </div>
        <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
          {(slide.components || []).map((component, idx) => <div key={`${slide.slideNumber}-${idx}`} className="card" style={{ background: "white", padding: 14 }}>
            <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div>
                <span className="pill p-blue">{component.type}</span>
                {component.title && <h4 style={{ margin: "8px 0 6px", color: "#173b58" }}>{component.title}</h4>}
              </div>
              <div className="right" style={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
                {(component.chips || []).map(chip => <span key={chip} className="pill" style={{ background: "#e0f2fe", color: "#075985", whiteSpace: "nowrap" }}>{chip}</span>)}
              </div>
            </div>
            {component.text && <p className="small" style={{ lineHeight: 1.7, whiteSpace: "pre-line" }}>{component.text}</p>}
            {(component.bullets || []).length > 0 && <ul style={{ margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.65 }}>
              {component.bullets.map((x, i) => <li key={i}>{x}</li>)}
            </ul>}
            {(component.headers || []).length > 0 && (component.rows || []).length > 0 && <table className="table" style={{ marginTop: 10 }}>
              <thead><tr>{component.headers.map(h => <th key={h} style={{ textAlign: "center", verticalAlign: "middle" }}>{h}</th>)}</tr></thead>
              <tbody>{component.rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci} style={{ textAlign: ci === 0 ? "center" : "left", verticalAlign: "middle" }}>{cell}</td>)}</tr>)}</tbody>
            </table>}
            {(component.cards || []).length > 0 && <div className="grid g2" style={{ marginTop: 10 }}>
              {component.cards.map((card, ci) => <div key={`${card.title}-${ci}`} className="card" style={{ background: "#f8fbfe", padding: 12 }}>
                <b>{card.title}</b>
                <div className="right" style={{ flexWrap: "wrap", marginTop: 6 }}>
                  {(card.chips || []).map(chip => <span key={chip} className="pill p-green" style={{ whiteSpace: "nowrap" }}>{chip}</span>)}
                </div>
                {card.text && <p className="small" style={{ lineHeight: 1.65 }}>{card.text}</p>}
                {(card.bullets || []).map((x, i) => <p className="small" key={i} style={{ margin: "4px 0", lineHeight: 1.55 }}>- {x}</p>)}
              </div>)}
            </div>}
            {component.layoutNote && <p className="small muted" style={{ margin: "10px 0 0" }}>Layout note: {component.layoutNote}</p>}
          </div>)}
        </div>
        {slide.speakerNote && <p className="small muted" style={{ margin: "12px 0 0" }}>Speaker note: {slide.speakerNote}</p>}
      </section>)}
    </div>;
  }
  return <div style={{ display: "grid", gap: 18 }}>
    <div style={{ borderBottom: "2px solid #173b58", paddingBottom: 12 }}>
      <span className="pill p-blue">Signature Project Proposal</span>
      <h2 style={{ margin: "10px 0 4px", color: "#12344d" }}>{proposal.title}</h2>
      <p style={{ margin: 0, fontSize: 16, color: "#28516d", fontWeight: 800 }}>{proposal.subtitle}</p>
      <p className="small muted" style={{ marginTop: 8 }}>{proposal.meta}</p>
    </div>
    {(proposal.sections || []).map(section => <section key={section.title} style={{ borderBottom: "1px solid #d8e7f5", paddingBottom: 16 }}>
      <h3 style={{ margin: "0 0 10px", color: "#173b58" }}>{section.title}</h3>
      {section.body && <p style={{ whiteSpace: "pre-line", lineHeight: 1.85, margin: "0 0 10px" }}>{section.body}</p>}
      {(section.bullets || []).length > 0 && <ul style={{ margin: "10px 0 0", paddingLeft: 20, lineHeight: 1.8 }}>
        {section.bullets.map((x, i) => <li key={i}>{x}</li>)}
      </ul>}
      {(section.subsections || []).length > 0 && <div className="grid g2" style={{ marginTop: 12 }}>
        {section.subsections.map(sub => <div key={sub.title} className="card" style={{ background: "#f8fbfe", padding: 14 }}>
          <b>{sub.title}</b>
          <p className="small" style={{ lineHeight: 1.75, marginBottom: 0 }}>{sub.body}</p>
        </div>)}
      </div>}
    </section>)}
    {(proposal.timeline || []).length > 0 && <section>
      <h3 style={{ margin: "0 0 10px", color: "#173b58" }}>프로젝트 일정 예시</h3>
      <table className="table">
        <thead><tr><th>기간</th><th>실행 내용</th></tr></thead>
        <tbody>{proposal.timeline.map((row, i) => <tr key={`${row.label}-${i}`}><td><b>{row.label}</b></td><td><ul style={{ margin: 0, paddingLeft: 18 }}>{(row.tasks || []).map((task, ti) => <li key={ti}>{task}</li>)}</ul></td></tr>)}</tbody>
      </table>
    </section>}
  </div>;
}
function V2SignatureProposalModal({ proposal, onClose, onSave }) {
  if (!proposal) return null;
  return <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,23,42,.52)", padding: "28px 18px", overflow: "auto" }}>
    <div style={{ maxWidth: 980, margin: "0 auto", background: "white", borderRadius: 12, boxShadow: "0 24px 80px rgba(15,23,42,.28)", padding: 24 }}>
      <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <h3 style={{ margin: 0 }}>스파이크 기획서</h3>
          <p className="small muted" style={{ margin: "4px 0 0" }}>현재 입력값을 바탕으로 자동 구성된 고객용 제안서입니다.</p>
        </div>
        <div className="right" style={{ gap: 8 }}>
          {onSave && <button type="button" className="btn primary" onClick={onSave}>제안서 저장</button>}
          <button type="button" className="btn ghost" onClick={() => window.print()}>PDF 저장</button>
          <button type="button" className="btn ghost" onClick={onClose}>닫기</button>
        </div>
      </div>
      <V2SignatureProposalView proposal={proposal} />
    </div>
  </div>;
}
V2SignatureProjectCard = function V2SignatureProjectCardDeepFinal({ project, index, editable = false, onSave, st = {}, schools = [] }) {
  const normalized = v2NormalizeSignatureProject(project || {});
  const [editing, setEditing] = useState(false);
  const [proposalOpen, setProposalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiPreviewProposal, setAiPreviewProposal] = useState(null);
  const [draft, setDraft] = useState(normalized);
  React.useEffect(() => {
    setDraft(v2NormalizeSignatureProject(project || {}));
    setAiPreviewProposal(null);
    setAiError("");
  }, [project?.id, project?.generatedAt, project?.manuallyEdited, project?.aiGeneratedAt]);
  const accent = { blue: "#2563eb", cyan: "#0891b2", green: "#059669", purple: "#7c3aed", sky: "#0284c7" }[normalized.theme] || "#2563eb";
  const setArray = (key, value) => setDraft({ ...draft, [key]: String(value || "").split("\n").map(x => x.trim()).filter(Boolean) });
  const save = () => {
    const next = v2NormalizeSignatureProject({ ...draft, manuallyEdited: true, updatedAt: new Date().toISOString() });
    onSave?.(next);
    setEditing(false);
  };
  const p = editing ? draft : normalized;
  const proposal = p.proposal || v2BuildSignatureProjectProposal(st, p, schools);
  const modalProposal = aiPreviewProposal || proposal;
  const saveProposal = () => {
    onSave?.(v2NormalizeSignatureProject({ ...p, proposal: modalProposal, proposalSavedAt: new Date().toISOString(), schemaVersion: V2_SIGNATURE_PROJECT_SCHEMA }));
    setProposalOpen(false);
  };
  const runAiProposal = async () => {
    if (!editable || aiLoading) return;
    const endpoint = v2PromptSignatureAiEndpoint(false);
    if (!endpoint) return;
    setAiLoading(true);
    setAiError("");
    try {
      const result = await v2GenerateAiSignatureProposal({ st, project: p, schools, endpoint });
      const proposalWithFiles = v2NormalizeAiProposal({
        ...result.proposal,
        pptxFileName: result.pptxFileName || result.proposal?.pptxFileName || "",
        pptxBase64: result.pptxBase64 || result.proposal?.pptxBase64 || "",
        pdfFileName: result.pdfFileName || result.proposal?.pdfFileName || "",
        pdfBase64: result.pdfBase64 || result.proposal?.pdfBase64 || ""
      });
      const nextProject = v2NormalizeSignatureProject({
        ...p,
        proposal: proposalWithFiles,
        aiQualityReview: result.qualityReview,
        aiModel: result.model,
        aiGeneratedAt: result.generatedAt || new Date().toISOString(),
        proposalSavedAt: new Date().toISOString(),
        schemaVersion: V2_SIGNATURE_PROJECT_SCHEMA
      });
      setAiPreviewProposal(proposalWithFiles);
      onSave?.(nextProject);
      setProposalOpen(true);
    } catch (error) {
      setAiError(error.message || "AI generation failed.");
    } finally {
      setAiLoading(false);
    }
  };
  const sectionStyle = { border: "1px solid #dbeafe", borderRadius: 10, padding: 12, background: "#f8fbff" };
  return <div className="card" style={{ borderLeft: `5px solid ${accent}`, background: "#fff" }}>
    <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
      <div>
        <span className="pill p-blue">HOOK {index + 1}</span>
        {editing ? <V2Field label="Project Title" val={draft.title} set={v => setDraft({ ...draft, title: v })} /> : <h3 style={{ margin: "10px 0 4px" }}>{p.title}</h3>}
        <p className="small muted" style={{ margin: 0 }}>{(p.sourceActivityNames || []).join(" / ")}</p>
      </div>
      <div className="right" style={{ gap: 8 }}>
        <span className="pill" style={{ background: "#eef6ff", color: accent }}>{p.badge}</span>
        {editable && <button type="button" className="btn green" disabled={aiLoading} onClick={runAiProposal}>{aiLoading ? "AI 생성 중..." : "AI 고급 생성"}</button>}
        <button type="button" className="btn primary" onClick={() => setProposalOpen(true)}>제안서 보기</button>
        {editable && <button type="button" className="btn ghost" onClick={() => editing ? save() : setEditing(true)}>{editing ? "저장" : "수정"}</button>}
        {editable && editing && <button type="button" className="btn ghost" onClick={() => { setDraft(normalized); setEditing(false); }}>취소</button>}
      </div>
    </div>
    {aiError && <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa", marginTop: 12 }}>
      <p className="small" style={{ margin: 0, color: "#9a3412" }}>{aiError}</p>
    </div>}
    {editing ? <div className="grid g2" style={{ marginTop: 12 }}>
      <V2Field label="Badge" val={draft.badge} set={v => setDraft({ ...draft, badge: v })} />
      <V2Text label="Big Idea / 핵심 기획" val={draft.bigIdea} set={v => setDraft({ ...draft, bigIdea: v, rationale: v })} minHeight={110} />
      <V2Text label="Boarding School Fit" val={draft.boardingFit} set={v => setDraft({ ...draft, boardingFit: v })} minHeight={110} />
      <V2Text label="Academic Talent" val={draft.academicTalent} set={v => setDraft({ ...draft, academicTalent: v })} minHeight={110} />
      <V2Text label="Community Contribution" val={draft.communityContribution} set={v => setDraft({ ...draft, communityContribution: v })} minHeight={110} />
      <V2Text label="Current Evidence" val={draft.currentEvidence} set={v => setDraft({ ...draft, currentEvidence: v, currentState: v })} minHeight={110} />
      <V2Text label="Target Output" val={draft.targetOutput} set={v => setDraft({ ...draft, targetOutput: v, targetState: v })} minHeight={110} />
      <V2Text label="Evidence Needed" val={(draft.evidenceNeeded || []).join("\n")} set={v => setArray("evidenceNeeded", v)} minHeight={110} />
      <V2Text label="Risk / Gap" val={(draft.risks || []).join("\n")} set={v => setArray("risks", v)} minHeight={110} />
      <V2Text label="Recommended Next Actions" val={(draft.nextActions || []).join("\n")} set={v => setArray("nextActions", v)} minHeight={110} />
      <V2Text label="Application Usage" val={(draft.applicationUsage || []).join("\n")} set={v => setArray("applicationUsage", v)} minHeight={110} />
    </div> : <div>
      <div style={{ ...sectionStyle, marginTop: 14 }}>
        <b>Big Idea / 핵심 기획</b>
        <p style={{ lineHeight: 1.8, marginBottom: 0, whiteSpace: "pre-line" }}>{p.bigIdea}</p>
      </div>
      <div className="grid g3" style={{ marginTop: 12 }}>
        <div style={sectionStyle}><b>Boarding School Fit</b><p className="small" style={{ lineHeight: 1.7, whiteSpace: "pre-line" }}>{p.boardingFit}</p></div>
        <div style={sectionStyle}><b>Academic Talent</b><p className="small" style={{ lineHeight: 1.7, whiteSpace: "pre-line" }}>{p.academicTalent}</p></div>
        <div style={sectionStyle}><b>Community Contribution</b><p className="small" style={{ lineHeight: 1.7, whiteSpace: "pre-line" }}>{p.communityContribution}</p></div>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <div><b>Current Evidence</b><p className="small" style={{ lineHeight: 1.7, whiteSpace: "pre-line" }}>{p.currentEvidence}</p></div>
        <div><b>Target Output</b><p className="small" style={{ lineHeight: 1.7, whiteSpace: "pre-line" }}>{p.targetOutput}</p></div>
      </div>
      <div className="grid g3" style={{ marginTop: 12 }}>
        <div><b>Evidence Needed</b>{(p.evidenceNeeded || []).map((x, i) => <p className="small" key={i} style={{ lineHeight: 1.55 }}>- {x}</p>)}</div>
        <div><b>Recommended Next Actions</b>{(p.nextActions || []).map((x, i) => <p className="small" key={i} style={{ lineHeight: 1.55 }}>- {x}</p>)}</div>
        <div><b>Application Usage</b>{(p.applicationUsage || []).map((x, i) => <p className="small" key={i} style={{ lineHeight: 1.55 }}>- {x}</p>)}</div>
      </div>
      {(p.risks || []).length > 0 && <div style={{ marginTop: 10 }}><b>Risk / Gap</b>{p.risks.map((x, i) => <p className="small" key={i} style={{ lineHeight: 1.55 }}>- {x}</p>)}</div>}
      {(p.semesterRoadmap || []).length > 0 && <table className="table" style={{ marginTop: 12 }}><thead><tr><th>학기</th><th>실행 초점</th><th>산출물</th><th>점검</th></tr></thead><tbody>{p.semesterRoadmap.map((row, i) => <tr key={`${row.period}-${i}`}><td>{row.period}</td><td style={{ lineHeight: 1.55 }}>{row.focus}</td><td style={{ lineHeight: 1.55 }}>{row.deliverable}</td><td>{row.checkpoint}</td></tr>)}</tbody></table>}
    </div>}
    {proposalOpen && <V2SignatureProposalModal proposal={modalProposal} onClose={() => setProposalOpen(false)} onSave={editable ? saveProposal : null} />}
  </div>;
};
V2SignatureProjectsSection = function V2SignatureProjectsSectionDeepFinal({ st, update, schools }) {
  const generated = v2GenerateSignatureProjects(st, schools).map(project => v2NormalizeSignatureProject({ ...project, schemaVersion: V2_SIGNATURE_PROJECT_SCHEMA }));
  const saved = (st.signatureProjects || []).map(v2NormalizeSignatureProject);
  const projects = v2ResolveSignatureProjects(st, schools);
  const legacyCount = saved.filter(v2SignatureProjectIsLegacy).length;
  const hasResolvedUpgrade = legacyCount > 0 && projects.length > 0;
  const saveAll = next => update({ signatureProjects: next.map(v2NormalizeSignatureProject) });
  const regenerate = () => {
    if (saved.length && !window.confirm("기존 수동 수정 프로젝트를 추천안으로 다시 생성할까요?")) return;
    saveAll(generated);
  };
  const configureAi = () => {
    const endpoint = v2PromptSignatureAiEndpoint(true);
    if (endpoint) window.alert(`AI API endpoint saved:\n${endpoint}`);
  };
  const editOne = (idx, nextProject) => {
    const normalizedNext = v2NormalizeSignatureProject(nextProject);
    const nextId = normalizedNext.id || projects[idx]?.id;
    const base = v2ResolveSignatureProjects({ ...st, signatureProjects: saved }, schools).map(v2NormalizeSignatureProject);
    let replaced = false;
    const next = base.map((p, i) => {
      const sameId = nextId && p.id === nextId;
      const sameIndex = !nextId && i === idx;
      if (sameId || sameIndex) {
        replaced = true;
        return v2NormalizeSignatureProject({ ...p, ...normalizedNext, id: nextId || normalizedNext.id || p.id });
      }
      return p;
    });
    if (!replaced) next.splice(idx, 0, v2NormalizeSignatureProject({ ...normalizedNext, id: nextId || normalizedNext.id }));
    saveAll(next.slice(0, 4));
  };
  return <V2Section title="Signature Project / 3대 스파이크 기획">
    <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
      <p className="small muted" style={{ margin: 0, maxWidth: 820 }}>Stage 1의 핵심 EC와 관심학교 데이터를 바탕으로, 학생의 Hook을 실제 원서에서 사용할 수 있는 Signature Project로 변환합니다. 각 프로젝트는 학업적 재능, 보딩스쿨 fit, 사회적 기여, 증거자료, 학기별 로드맵까지 함께 생성되며 필요하면 상담 방향에 맞게 수정해 저장할 수 있습니다.</p>
      <div className="right" style={{ gap: 8 }}>
        {!saved.length && <button type="button" className="btn primary" onClick={() => saveAll(generated)}>추천안 저장</button>}
        {hasResolvedUpgrade && <button type="button" className="btn primary" onClick={() => saveAll(projects)}>보강안 저장</button>}
        <button type="button" className="btn ghost" onClick={configureAi}>AI API 설정</button>
        <button type="button" className="btn ghost" onClick={regenerate}>추천안 다시 생성</button>
      </div>
    </div>
    {hasResolvedUpgrade && <div className="card" style={{ background: "#eff6ff", borderColor: "#bfdbfe", marginBottom: 12 }}>
      <p className="small" style={{ margin: 0, lineHeight: 1.65 }}>이전에 저장된 Signature Project 중 단순 설명에 가까운 항목 {legacyCount}개를 현재 입력된 학생 정보, 핵심 EC, 관심학교 데이터를 기준으로 자동 보강해 표시하고 있습니다. 이 버전을 유지하려면 <b>보강안 저장</b>을 눌러주세요.</p>
    </div>}
    <div style={{ display: "grid", gap: 14 }}>
      {projects.length ? projects.map((project, i) => <V2SignatureProjectCard key={project.id || i} project={project} index={i} editable onSave={next => editOne(i, next)} st={st} schools={schools} />) : <div className="card"><p className="small muted">Stage 1 EC 기본에서 핵심 활동을 입력하면 Signature Project 추천안이 생성됩니다.</p></div>}
    </div>
  </V2Section>;
};
function V2EcRoadmapChart({ analysis }) {
  const rows = analysis?.domainScores || [];
  return <div className="card" style={{ background: "#f8fbfe" }}>
    <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 18 }}>
      <div>
        <h3 style={{ margin: "0 0 6px" }}>EC 영역별 준비도</h3>
        <p className="small muted" style={{ margin: 0 }}>Stage 1에 입력된 활동을 기반으로 영역별 강점과 보완 후보를 자동 분류합니다.</p>
      </div>
      <span className="pill p-blue">자동 분석</span>
    </div>
    <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
      {rows.map(row => <div key={row.domain} style={{ display: "grid", gridTemplateColumns: "150px 1fr 50px", alignItems: "center", gap: 12 }}>
        <b style={{ fontSize: 14 }}>{row.domain}</b>
        <div style={{ height: 12, borderRadius: 999, background: "#dceaf7", overflow: "hidden" }}>
          <div style={{ width: `${Math.max(4, row.score)}%`, height: "100%", borderRadius: 999, background: row.score >= 75 ? "#2563eb" : row.score >= 45 ? "#38bdf8" : "#f59e0b" }} />
        </div>
        <b style={{ textAlign: "right" }}>{row.score}</b>
      </div>)}
    </div>
  </div>;
}
function V2EcRoadmapActivityCard({ item, goal, onOpen }) {
  const ec = item.ec || {};
  const hasAwards = (ec.awards || []).length > 0;
  return <button type="button" onClick={onOpen} style={{ width: "100%", textAlign: "left", border: "1px solid #d8e7f5", background: "#fff", borderRadius: 12, padding: 12, cursor: "pointer" }}>
    <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
      <div>
        <b>{v2EcName(ec)}</b>
        <p className="small muted" style={{ margin: "4px 0 0" }}>{ec.team || ec.position || ec.level || "세부 정보 입력 필요"}</p>
      </div>
      {ec.core && <span className="pill p-blue">핵심</span>}
    </div>
    <p className="small" style={{ margin: "10px 0 0", lineHeight: 1.55 }}>{goal.selectedGoal || goal.generatedGoal}</p>
    <div className="right" style={{ gap: 6, marginTop: 10, flexWrap: "wrap" }}>
      {(item.linkedDomains || []).map(d => <span key={d} className="pill">{d}</span>)}
      {hasAwards && <span className="pill p-green">수상 {(ec.awards || []).length}</span>}
    </div>
  </button>;
}
function V2EcRoadmapDetailModal({ item, st, update, schools, onClose }) {
  const ec = item?.ec || {};
  const activityId = item?.activityId || "";
  const itemDomain = item?.domain || "Academics";
  const goal = v2GetActivityGoal(st, activityId, itemDomain, ec, schools);
  const [draftGoal, setDraftGoal] = useState(goal.selectedGoal || goal.generatedGoal || "");
  const [draftRoadmap, setDraftRoadmap] = useState(goal.roadmap || []);
  const [draftWeekly, setDraftWeekly] = useState(goal.weeklyActionPlan || []);
  React.useEffect(() => {
    const nextGoal = v2GetActivityGoal(st, activityId, itemDomain, ec, schools);
    setDraftGoal(nextGoal.selectedGoal || nextGoal.generatedGoal || "");
    setDraftRoadmap(nextGoal.roadmap || []);
    setDraftWeekly(nextGoal.weeklyActionPlan || []);
  }, [activityId]);
  if (!item) return null;
  const save = () => {
    const analysis = v2EcDomainAnalysis(st, schools);
    const saved = {
      ...goal,
      userGoal: draftGoal,
      selectedGoal: draftGoal || goal.generatedGoal,
      linkedDomains: item.linkedDomains || goal.linkedDomains,
      roadmap: draftRoadmap,
      weeklyActionPlan: draftWeekly,
      manuallyEdited: true,
      lastGeneratedAt: new Date().toISOString()
    };
    update({
      activityGoalMap: { ...(st.activityGoalMap || {}), [activityId]: saved },
      ecRoadmapAnalysis: { ...analysis, legacyMemo: st.ecRoadmapAnalysis?.legacyMemo || st.stagePlans?.ecRoadmap || "" }
    });
    onClose();
  };
  const updateRoadmap = (idx, patch) => setDraftRoadmap(draftRoadmap.map((row, i) => i === idx ? { ...row, ...patch } : row));
  const updateWeekly = (idx, patch) => setDraftWeekly(draftWeekly.map((row, i) => i === idx ? { ...row, ...patch } : row));
  const resetSuggestion = () => {
    const nextGoal = goal.generatedGoal || v2RecommendedGoalForDomain(itemDomain, ec, st, schools);
    setDraftGoal(nextGoal);
    setDraftRoadmap(v2BuildActivityRoadmap(itemDomain, ec, nextGoal, st));
    setDraftWeekly(v2BuildWeeklyActionPlan(itemDomain, ec, nextGoal));
  };
  return <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, .38)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
    <div className="card" style={{ width: "min(1120px, 96vw)", maxHeight: "90vh", overflow: "auto", borderRadius: 16, boxShadow: "0 24px 70px rgba(15,23,42,.28)" }}>
      <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span className="pill p-blue">{itemDomain}</span>
          <h2 style={{ margin: "10px 0 4px" }}>{v2EcName(ec)}</h2>
          <p className="small muted" style={{ margin: 0 }}>{(item.linkedDomains || []).join(" / ")} 영역에 연결된 동일 활동입니다.</p>
        </div>
        <button type="button" className="btn ghost" onClick={onClose}>닫기</button>
      </div>
      <div className="grid g2" style={{ marginTop: 16 }}>
        <div>
          <h3>활동 원자료</h3>
          <table className="table"><tbody>
            <tr><th>분류</th><td>{ec.cat || "-"}</td></tr>
            <tr><th>팀/기관</th><td>{ec.team || "-"}</td></tr>
            <tr><th>기간</th><td>{[ec.from, ec.to || (ec.status === "진행 중" ? "진행 중" : "")].filter(Boolean).join(" - ") || "-"}</td></tr>
            <tr><th>주당 시간</th><td>{ec.hours || "-"}</td></tr>
            <tr><th>레벨/역할</th><td>{[ec.levelOther || ec.level, ec.position].filter(Boolean).join(" / ") || "-"}</td></tr>
          </tbody></table>
          {(ec.awards || []).length > 0 && <div style={{ marginTop: 12 }}>
            <h3>관련 수상내역</h3>
            <table className="table"><thead><tr><th>레벨</th><th>대회/상</th><th>연월</th></tr></thead><tbody>{ec.awards.map((a, i) => <tr key={i}><td>{a.level}</td><td>{[a.competition, a.awardName].filter(Boolean).join(" / ")}</td><td>{a.date || "-"}</td></tr>)}</tbody></table>
          </div>}
        </div>
        <div>
          <h3>추천 목표 및 수정</h3>
          <p className="small muted" style={{ lineHeight: 1.7 }}>추천 목표는 학생 포지셔닝, 핵심 EC, 관심학교 데이터를 기준으로 생성됩니다. 실제 상담 방향에 맞게 수정하면 같은 활동이 연결된 모든 영역에 함께 반영됩니다.</p>
          <V2Text label="최종 목표" val={draftGoal} set={setDraftGoal} minHeight={120} />
          <div className="right" style={{ gap: 8 }}>
            <button type="button" className="btn ghost" onClick={resetSuggestion}>추천안으로 다시 설정</button>
            <button type="button" className="btn primary" onClick={save}>저장</button>
          </div>
        </div>
      </div>
      <h3 style={{ marginTop: 18 }}>학기별 로드맵</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {draftRoadmap.map((row, i) => <div key={`${row.period}-${i}`} style={{ border: "1px solid #d8e7f5", borderRadius: 12, padding: 12, background: "#fbfdff" }}>
          <div className="grid g4">
            <V2Field label="학기" val={row.period} set={v => updateRoadmap(i, { period: v })} />
            <V2Field label="학기 목표" val={row.goal} set={v => updateRoadmap(i, { goal: v })} />
            <V2Field label="산출물" val={row.deliverable} set={v => updateRoadmap(i, { deliverable: v })} />
            <V2Field label="점검 시점" val={row.checkpoint} set={v => updateRoadmap(i, { checkpoint: v })} />
          </div>
          <V2Text label="성공 기준 / 리스크" val={`${row.successCriteria || ""}${row.risk ? `\n${row.risk}` : ""}`} set={v => {
            const [successCriteria, ...rest] = String(v || "").split("\n");
            updateRoadmap(i, { successCriteria, risk: rest.join("\n") });
          }} minHeight={56} />
        </div>)}
      </div>
      <h3 style={{ marginTop: 18 }}>주간 액션 플랜</h3>
      <table className="table"><thead><tr><th>액션</th><th>주당 횟수</th><th>회당 시간</th><th>지원</th><th>산출물</th></tr></thead><tbody>{draftWeekly.map((row, i) => <tr key={i}>
        <td><input className="input" value={row.item || ""} onChange={e => updateWeekly(i, { item: e.target.value })} /></td>
        <td><input className="input" type="number" value={row.timesPerWeek || ""} onChange={e => updateWeekly(i, { timesPerWeek: e.target.value })} /></td>
        <td><input className="input" value={row.hoursPerSession || ""} onChange={e => updateWeekly(i, { hoursPerSession: e.target.value })} /></td>
        <td><input className="input" value={row.supportNeeded || ""} onChange={e => updateWeekly(i, { supportNeeded: e.target.value })} /></td>
        <td><input className="input" value={row.expectedOutput || ""} onChange={e => updateWeekly(i, { expectedOutput: e.target.value })} /></td>
      </tr>)}</tbody></table>
    </div>
  </div>;
}
function V2EcRoadmapBoard({ st, update, schools }) {
  const [selected, setSelected] = useState(null);
  const analysis = v2EcDomainAnalysis(st, schools);
  const hasActivities = (st.ecs || []).some(v2EcRoadmapHasActivity);
  const saveAnalysis = () => update({ ecRoadmapAnalysis: { ...analysis, legacyMemo: st.ecRoadmapAnalysis?.legacyMemo || st.stagePlans?.ecRoadmap || "" } });
  return <div>
    <V2Section title="EC 로드맵">
      <div className="grid g2">
        <V2EcRoadmapChart analysis={analysis} />
        <div className="card" style={{ background: "#ffffff" }}>
          <h3 style={{ marginTop: 0 }}>분석 요약</h3>
          <p style={{ lineHeight: 1.85 }}>{analysis.parentExplanation}</p>
          <div className="right" style={{ gap: 8, flexWrap: "wrap" }}>
            {analysis.domainStrengths.map(d => <span key={d} className="pill p-blue">강점: {d}</span>)}
            {analysis.domainGaps.map(d => <span key={d} className="pill">보완: {d}</span>)}
          </div>
          <button type="button" className="btn ghost" style={{ marginTop: 14 }} onClick={saveAnalysis}>현재 분석 저장</button>
        </div>
      </div>
      {!hasActivities && <p className="small muted" style={{ marginTop: 14 }}>Stage 1 > EC 기본에 활동을 입력하면 자동으로 영역별 로드맵이 생성됩니다.</p>}
      <div className="grid g2" style={{ marginTop: 16 }}>
        {analysis.domainScores.map(domain => <div key={domain.domain} className="card" style={{ background: domain.activities.length ? "#ffffff" : "#f8fbfe" }}>
          <div className="right" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div>
              <h3 style={{ margin: "0 0 4px" }}>{domain.domain}</h3>
              <p className="small muted" style={{ margin: 0 }}>{domain.strength}</p>
            </div>
            <span className="pill p-blue">{domain.score}</span>
          </div>
          <p className="small" style={{ lineHeight: 1.65 }}>{domain.gap}</p>
          <div style={{ display: "grid", gap: 10 }}>
            {domain.activities.length ? domain.activities.map(item => {
              const goal = v2GetActivityGoal(st, item.activityId, domain.domain, item.ec, schools);
              return <V2EcRoadmapActivityCard key={`${domain.domain}-${item.activityId}`} item={{ ...item, domain: domain.domain }} goal={goal} onOpen={() => setSelected({ ...item, domain: domain.domain })} />;
            }) : <div style={{ border: "1px dashed #bdd6ee", borderRadius: 12, padding: 12, background: "#fff" }}>
              <p className="small muted" style={{ margin: 0 }}>이 영역에 연결된 활동이 없습니다. 관심학교 기준으로 꼭 필요한 영역인지 검토한 뒤, 필요하면 Stage 1 EC에 활동을 추가해 주세요.</p>
            </div>}
          </div>
        </div>)}
      </div>
      {(st.ecRoadmapAnalysis?.legacyMemo || st.stagePlans?.ecRoadmap) && <details style={{ marginTop: 16 }}>
        <summary className="small muted" style={{ cursor: "pointer" }}>기존 EC 로드맵 메모 보기</summary>
        <div className="card" style={{ marginTop: 8, background: "#fbfdff" }}><p style={{ whiteSpace: "pre-wrap", lineHeight: 1.75 }}>{st.ecRoadmapAnalysis?.legacyMemo || st.stagePlans?.ecRoadmap}</p></div>
      </details>}
    </V2Section>
    <V2EcRoadmapDetailModal item={selected} st={st} update={update} schools={schools} onClose={() => setSelected(null)} />
  </div>;
}
function V2StageTwoLegacyManual({ st, update, schools }) {
  const [sub, setSub] = useState("profile");
  const plan = st.stagePlans || {};
  const setPlan = patch => update({ stagePlans: { ...plan, ...patch } });
  return <div><V2SubTabs tabs={[["profile", "학생 포지셔닝"], ["ec", "EC 로드맵"], ["schools", "학교 리스트"], ["report", "전략 보고서"]]} active={sub} set={setSub} />{sub === "profile" && <V2Section title="지원 전략 핵심"><V2Text label="학생 Hook / Story Angle" val={st.profile} set={v => update({ profile: v })} /><V2Text label="학업 보완 전략" val={st.tutoring} set={v => update({ tutoring: v })} /><V2Text label="시험 전략" val={st.testPlan} set={v => update({ testPlan: v })} /></V2Section>}{sub === "ec" && <V2EcRoadmapBoard st={st} update={update} schools={schools} />}{sub === "schools" && <V2Section title="학교 리스트 / Rubric 기반 Fit"><V2Text label="학교 리스트 전략" val={plan.schoolList} set={v => setPlan({ schoolList: v })} /><EnhancedStrategy st={st} update={update} schools={schools} /></V2Section>}{sub === "report" && <V2ClientStrategyReport st={st} schools={schools} />}</div>;
}
function v2StageTwoPositioning(st, schools = []) {
  return v2BuildHookStrategy(st, schools);
}
function V2StageTwo({ st, update, schools }) {
  const [sub, setSub] = useState("profile");
  const plan = st.stagePlans || {};
  const setPlan = patch => update({ stagePlans: { ...plan, ...patch } });
  const positioning = v2StageTwoPositioning(st, schools);
  return <div><V2SubTabs tabs={[["profile", "학생 포지셔닝"], ["ec", "EC 로드맵"], ["schools", "학교 리스트"], ["report", "전략 보고서"]]} active={sub} set={setSub} />
    {sub === "profile" && <div className="grid">
      <V2Section title="지원 전략 핵심">
        <div className="card" style={{ background: "#f8fbfe" }}>
          <span className="pill p-blue">Hook Strategy</span>
          <h2 style={{ margin: "10px 0 6px" }}>“{positioning.hookLine}”</h2>
          <p className="small muted" style={{ margin: 0 }}>{positioning.character}</p>
          <p style={{ lineHeight: 1.9 }}>{positioning.summary}</p>
          <p style={{ lineHeight: 1.9 }}><b>보딩스쿨 맥락에서 어떻게 보여줄 것인가</b><br />{positioning.contributionPlan}</p>
        </div>
        <h3 style={{ marginTop: 18 }}>Hook을 증명할 핵심 증거</h3>
        <table className="table" style={{ marginTop: 10 }}><thead><tr><th>우선순위</th><th>핵심 활동</th><th>보여줄 역량</th><th>만들어야 할 증거</th><th>다음 액션</th></tr></thead><tbody>{positioning.proofPlan.length ? positioning.proofPlan.map((p, i) => <tr key={`${p.activity}-${i}`}><td>{i + 1}</td><td><b>{p.activity}</b><br /><span className="small muted">{p.domains.join(" / ")}</span></td><td style={{ lineHeight: 1.65 }}>{p.trait}</td><td style={{ lineHeight: 1.65 }}>{p.proof}</td><td style={{ lineHeight: 1.65 }}>{p.next}</td></tr>) : <tr><td colSpan="5">Stage 1의 EC 기본에서 활동을 입력하고 별표를 지정해 주세요.</td></tr>}</tbody></table>
        <div className="grid g2" style={{ marginTop: 16 }}>
          <div className="card" style={{ background: "#ffffff" }}>
            <h3 style={{ marginTop: 0 }}>지원서 배치 전략</h3>
            {(positioning.applicationStrategy || []).map(row => <p key={row.area} style={{ lineHeight: 1.75 }}><b>{row.area}</b><br />{row.action}</p>)}
          </div>
          <div className="card" style={{ background: "#ffffff" }}>
            <h3 style={{ marginTop: 0 }}>남은 기간 실행계획</h3>
            {(positioning.executionPlan || []).map(row => <p key={row.period} style={{ lineHeight: 1.75 }}><b>{row.period}</b><br />{row.action}</p>)}
          </div>
        </div>
      </V2Section>
      <V2SignatureProjectsSection st={st} update={update} schools={schools} />
      <V2Section title="Hook을 약하게 만드는 현재 리스크">
        {positioning.gaps.map((x, i) => <p key={i} style={{ lineHeight: 1.8 }}><b>{i + 1}.</b> {x}</p>)}
        {positioning.supporting.length > 0 && <div><h3>보조 활동으로 연결할 수 있는 자료</h3><p style={{ lineHeight: 1.8 }}>{positioning.supporting.map(v2EcName).join(", ")} 활동은 핵심 Hook을 뒷받침하는 보조 증거로 사용할 수 있습니다. 단, 원서에서는 모든 활동을 같은 비중으로 펼치기보다 핵심 3개를 먼저 보여주고 나머지는 맥락을 보강하는 방식이 좋습니다.</p></div>}
      </V2Section>
    </div>}
    {sub === "ec" && <V2EcRoadmapBoard st={st} update={update} schools={schools} />}
    {sub === "schools" && <V2Section title="학교 리스트 / Rubric 기반 Fit"><V2Text label="학교 리스트 전략" val={plan.schoolList} set={v => setPlan({ schoolList: v })} /><EnhancedStrategy st={st} update={update} schools={schools} /></V2Section>}
    {sub === "report" && <V2StageTwoReportManager st={st} update={update} schools={schools} />}
  </div>;
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
function V2PreviousApplicationHistory({ st, update }) {
  const rows = st.previousApplications || [];
  const accountForPlatform = platform => (rows.find(r => r.platform === platform && r.account)?.account || "");
  const edit = (i, patch) => {
    let next = v2SetArr(rows, i, patch);
    const updated = next[i] || {};
    if (patch.platform && !updated.account) next = v2SetArr(next, i, { account: accountForPlatform(patch.platform) });
    if (patch.account && updated.platform) next = next.map((r, idx) => idx !== i && r.platform === updated.platform && !r.account ? { ...r, account: patch.account } : r);
    update({ previousApplications: next });
  };
  return <ArrayEditor title="이전 지원 이력" rows={rows} add={() => update({ previousApplications: [...rows, V2_EMPTY_PREVIOUS_APPLICATION()] })} remove={i => update({ previousApplications: rows.filter((_, x) => x !== i) })} render={(r, i) => <div>
    <div className="grid g4">
      <V2Field label="지원 학교" val={r.school} set={v => edit(i, { school: v })} />
      <V2Select label="지원한 학년" val={r.gradeApplied} set={v => edit(i, { gradeApplied: v })} options={V2_TARGET_GRADE_OPTIONS} />
      <V2Select label="원서 플랫폼" val={r.platform} set={v => edit(i, { platform: v })} options={V2_APPLICATION_PLATFORMS} />
      <V2Field label="계정" val={r.account} set={v => edit(i, { account: v })} />
      <V2Field label="원서 제출일" type="date" val={r.submittedDate} set={v => edit(i, { submittedDate: v })} />
      <V2Select label="지원 결과" val={r.result} set={v => edit(i, { result: v })} options={V2_APPLICATION_RESULTS} />
    </div>
    {r.platform === "기타" && <div className="grid g2"><V2Field label="기타 플랫폼 URL" val={r.platformOtherUrl} set={v => edit(i, { platformOtherUrl: v })} />{r.platformOtherUrl && <div className="field"><span className="label">플랫폼 바로가기</span><button type="button" className="pill p-blue" style={{ border: 0, padding: "8px 12px" }} onClick={() => window.open(r.platformOtherUrl, "_blank", "noopener,noreferrer")}>사이트 열기</button></div>}</div>}
    <V2Text label="메모" val={r.notes} set={v => edit(i, { notes: v })} minHeight={48} />
  </div>} />;
}
function V2RecommendationEditor({ st, update }) {
  const rows = st.recommendations || [];
  const edit = (i, patch) => update({ recommendations: v2SetArr(rows, i, patch) });
  return <ArrayEditor title="추천서 전략 데이터" rows={rows} add={() => update({ recommendations: [...rows, V2_EMPTY_RECOMMENDATION()] })} remove={i => update({ recommendations: rows.filter((_, x) => x !== i) })} render={(r, i) => <div>
    <div className="grid g4">
      <V2Field label="추천서 후보자" val={r.candidate} set={v => edit(i, { candidate: v })} />
      <V2Select label="과목/역할" val={r.role} set={v => edit(i, { role: v })} options={V2_RECOMMENDER_ROLES} />
      {r.role === "기타" && <V2Field label="역할 직접 입력" val={r.roleOther} set={v => edit(i, { roleOther: v })} />}
      <V2Select label="현재 관계 강도" val={r.currentStrength} set={v => edit(i, { currentStrength: v })} options={V2_RELATION_STRENGTH} />
      <V2Select label="목표 관계 강도" val={r.targetStrength} set={v => edit(i, { targetStrength: v })} options={V2_RELATION_STRENGTH} />
      <V2Select label="Current Teacher 여부" val={r.currentTeacher} set={v => edit(i, { currentTeacher: v })} options={["No", "Yes"]} />
      <V2Select label="특기 추천서 가능 여부" val={r.specialtyRecommendation} set={v => edit(i, { specialtyRecommendation: v })} options={["No", "Yes", "미정"]} />
      <V2Select label="진행 상태" val={r.status} set={v => edit(i, { status: v })} options={V2_RECOMMENDER_STATUS} />
    </div>
    <V2Text label="추천서에 담겨야 할 증거" val={r.evidence} set={v => edit(i, { evidence: v })} minHeight={64} />
    <V2Text label="메모" val={r.notes} set={v => edit(i, { notes: v })} minHeight={48} />
  </div>} />;
}
function V2StageFour({ st, update }) {
  const [sub, setSub] = useState("tracker");
  const plan = st.stagePlans || {};
  const setPlan = patch => update({ stagePlans: { ...plan, ...patch } });
  const makeCore = () => update({ applications: (st.ecs || []).slice(0, 5).map(e => ({ school: "", activity: e.name, role: e.position, description: e.impact })) });
  return <div>
    <V2SubTabs tabs={[["tracker", "Application Tracker"], ["history", "이전 지원 이력"], ["essays", "에세이"], ["activities", "핵심 액티비티"], ["recommendations", "추천서/계정"]]} active={sub} set={setSub} />
    {sub === "tracker" && <ArrayEditor title="지원학교 리스트 / 원서 현황" rows={st.applications || []} add={() => update({ applications: [...(st.applications || []), { school: "", portal: "", deadline: "", status: "", essay: "", activity: "" }] })} render={(r, i) => <div className="grid g4"><V2Field label="학교" val={r.school} set={v => editArr(st, update, "applications", i, { school: v })} /><V2Field label="원서 계정/Portal" val={r.portal} set={v => editArr(st, update, "applications", i, { portal: v })} /><V2Field label="마감일" type="date" val={r.deadline} set={v => editArr(st, update, "applications", i, { deadline: v })} /><V2Field label="상태" val={r.status} set={v => editArr(st, update, "applications", i, { status: v })} list={["Not Started", "In Progress", "Submitted", "Interview", "Accepted", "Waitlisted", "Denied"]} /></div>} />}
    {sub === "history" && <V2PreviousApplicationHistory st={st} update={update} />}
    {sub === "essays" && <V2Section title="학교별 에세이 주제"><V2Text label="에세이 주제 / 소재 매칭" val={plan.essayThemes} set={v => setPlan({ essayThemes: v })} /></V2Section>}
    {sub === "activities" && <V2Section title="원서용 핵심 액티비티 5개"><button className="btn primary" onClick={makeCore}>EC 데이터로 5개 생성</button><table className="table"><tbody>{(st.applications || []).slice(0, 5).map((a, i) => <tr key={i}><th>{i + 1}</th><td>{a.activity || a.school}<br /><span className="small muted">{a.description}</span></td></tr>)}</tbody></table></V2Section>}
    {sub === "recommendations" && <div className="grid"><V2RecommendationEditor st={st} update={update} /><V2Section title="원서 계정 / 제출 유의사항"><V2Text label="원서 계정 / 로그인 / 제출 유의사항" val={plan.applicationAccounts} set={v => setPlan({ applicationAccounts: v })} /></V2Section></div>}
  </div>;
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
  return <div><div className="card report-selector" style={{ marginBottom: 14 }}><span className="label">보고서 학생 선택</span><select className="select" value={st?.id || ""} onChange={e => setSelected(e.target.value)}>{students.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}</select></div>{st && <V2BasicReport st={st} schools={schools} />}</div>;
}
function V2SchoolDataAdmin({ schools = [], updateSchools }) {
  const [selectedName, setSelectedName] = useState(schools[0]?.name || "Phillips Exeter Academy");
  const [draftSchool, setDraftSchool] = useState(null);
  const idx = schools.findIndex(s => s.name === selectedName);
  const hasSelection = idx >= 0 && !draftSchool;
  const isDraft = !!draftSchool;
  const school = draftSchool || (hasSelection ? schools[idx] : {});
  const englishRequirements = v2NormalizeEnglishRequirements(school);
  const config = v2LegacySchoolConfig(school);
  const edit = patch => {
    if (isDraft) {
      setDraftSchool({ ...draftSchool, ...patch });
      return;
    }
    if (!hasSelection) return;
    if (patch.name) setSelectedName(patch.name);
    updateSchools(schools.map((s, i) => i === idx ? { ...s, ...patch } : s));
  };
  const addSchool = () => {
    setDraftSchool(V2_EMPTY_ADMIN_SCHOOL());
    setSelectedName("");
  };
  const saveDraft = () => {
    if (!isDraft) return;
    const base = String(draftSchool.name || "New School").trim() || "New School";
    const existing = new Set(v2SchoolNames(schools));
    let name = base;
    let n = 2;
    while (existing.has(name)) {
      name = `${base} ${n}`;
      n += 1;
    }
    const nextSchool = { ...draftSchool, name };
    updateSchools([...schools, nextSchool]);
    setDraftSchool(null);
    setSelectedName(name);
  };
  const selectSchool = name => {
    setSelectedName(name);
    if (draftSchool) setDraftSchool(null);
  };
  const editEnglish = patch => {
    const next = { ...englishRequirements, ...patch };
    edit({ englishRequirements: next, english_requirement_waiver_requirements: next.waiverRequirements });
  };
  return <V2Section title="Admin School Data">
    <div className="grid g2">
      <V2SmartSchool label="School Search / Select" val={selectedName} set={selectSchool} schools={schools} />
      <div className="field"><span className="label">&nbsp;</span><button type="button" className="btn primary" onClick={addSchool}>새 학교 추가</button></div>
    </div>
    {isDraft ? <p className="small muted" style={{ marginTop: 0 }}>새 학교 입력 모드입니다. 아래 빈 입력란을 채운 뒤 저장 버튼을 눌러야 학교 데이터에 추가됩니다.</p> : !hasSelection && <p className="small muted" style={{ marginTop: 0 }}>검색어와 정확히 일치하는 학교가 없습니다. 기존 학교를 선택하거나 새 학교 추가를 눌러 빈 입력폼을 열어 주세요.</p>}
    <div className="grid g4">
      <V2Field label="School Name" val={school.name} set={v => edit({ name: v })} />
      <V2Field label="State" val={school.state} set={v => edit({ state: v })} />
      <V2Field label="Region" val={school.region} set={v => edit({ region: v })} />
      <V2Field label="Town" val={school.town} set={v => edit({ town: v })} />
      <V2Field label="Acceptance Rate %" val={school.accept} set={v => edit({ accept: Number(v) })} type="number" />
      <V2Field label="Average SSAT" val={school.ssat} set={v => edit({ ssat: Number(v) })} type="number" />
      <V2Field label="Boarding Ratio" val={school.boarding} set={v => edit({ boarding: v })} type="number" />
      <V2Field label="International Ratio" val={school.intl} set={v => edit({ intl: v })} type="number" />
      <V2Field label="Website" val={school.website} set={v => edit({ website: v })} />
    </div>
    <div className="grid g2">
      <V2Text label="Strong Programs" val={school.programs} set={v => edit({ programs: v })} />
      <V2Text label="Sports" val={school.sports} set={v => edit({ sports: v })} />
      <V2Text label="Arts / Clubs / Leadership" val={school.arts} set={v => edit({ arts: v })} />
      <V2Text label="Fit" val={school.fit} set={v => edit({ fit: v })} />
      <V2Text label="Risk" val={school.risk} set={v => edit({ risk: v })} />
      <V2Text label="Interview / Essay Signal" val={school.interview} set={v => edit({ interview: v })} />
    </div>
    <div className="card" style={{ background: "#f8fbfe", marginTop: 12 }}>
      <h3>English Requirement / Test Benchmarks</h3>
      <V2Text label="English Requirement Waiver Requirements" val={englishRequirements.waiverRequirements} set={v => editEnglish({ waiverRequirements: v })} minHeight={58} />
      <div className="grid g4">
        <V2Field label="TOEFL Minimum" val={englishRequirements.toeflMinimum} set={v => editEnglish({ toeflMinimum: v })} type="number" />
        <V2Field label="TOEFL Competitive" val={englishRequirements.toeflCompetitive} set={v => editEnglish({ toeflCompetitive: v })} type="number" />
        <V2Field label="TOEFL Jr Minimum" val={englishRequirements.toeflJrMinimum} set={v => editEnglish({ toeflJrMinimum: v })} type="number" />
        <V2Field label="TOEFL Jr Competitive" val={englishRequirements.toeflJrCompetitive} set={v => editEnglish({ toeflJrCompetitive: v })} type="number" />
        <V2Field label="IELTS Minimum" val={englishRequirements.ieltsMinimum} set={v => editEnglish({ ieltsMinimum: v })} type="number" />
        <V2Field label="IELTS Competitive" val={englishRequirements.ieltsCompetitive} set={v => editEnglish({ ieltsCompetitive: v })} type="number" />
        <V2Field label="DET Minimum" val={englishRequirements.detMinimum} set={v => editEnglish({ detMinimum: v })} type="number" />
        <V2Field label="DET Competitive" val={englishRequirements.detCompetitive} set={v => editEnglish({ detCompetitive: v })} type="number" />
        <V2Field label="SSAT Recommended" val={englishRequirements.ssatRecommended} set={v => editEnglish({ ssatRecommended: v })} type="number" />
        <V2Field label="SSAT Competitive" val={englishRequirements.ssatCompetitive} set={v => editEnglish({ ssatCompetitive: v })} type="number" />
      </div>
      <div className="grid g2">
        <V2Text label="SSAT Section Targets" val={englishRequirements.ssatSectionTargets} set={v => editEnglish({ ssatSectionTargets: v })} minHeight={58} />
        <V2Text label="English Test Section Targets" val={englishRequirements.englishSectionTargets} set={v => editEnglish({ englishSectionTargets: v })} minHeight={58} />
      </div>
    </div>
    <V2GradingScaleEditor scale={school.grading_scale_config || school.gradingScaleConfig || V2_EMPTY_GRADING_SCALE()} setScale={scale => edit({ grading_scale_config: v2NormalizeGradingScale(scale) })} />
    <div className="card" style={{ background: "#f8fbfe", marginTop: 12 }}>
      <h3>Legacy / Family Connection</h3>
      <div className="grid g4">
        <V2Field label="legacy_sensitivity_multiplier" val={school.legacy_sensitivity_multiplier ?? config.sensitivity} set={v => edit({ legacy_sensitivity_multiplier: Number(v) })} type="number" />
        <V2Select label="sibling_priority_enabled" val={String(school.sibling_priority_enabled ?? config.siblingPriority)} set={v => edit({ sibling_priority_enabled: v === "true" })} options={["false", "true"]} />
        <V2Field label="max_legacy_contribution" val={school.max_legacy_contribution ?? config.max} set={v => edit({ max_legacy_contribution: Number(v) })} type="number" />
        <V2Field label="legacy_weight" val={school.legacy_weight ?? config.weight} set={v => edit({ legacy_weight: Number(v) })} type="number" />
      </div>
    </div>
    {isDraft && <div className="right" style={{ justifyContent: "flex-end", marginTop: 14 }}><button type="button" className="btn ghost" onClick={() => setDraftSchool(null)}>취소</button><button type="button" className="btn primary" onClick={saveDraft}>저장</button></div>}
  </V2Section>;
}
function V2SchoolGradingScaleAdmin({ schools = [], updateSchools }) {
  const [selectedName, setSelectedName] = useState("Phillips Exeter Academy");
  const idx = Math.max(0, schools.findIndex(s => s.name === selectedName));
  const school = schools[idx] || schools[0] || {};
  const edit = patch => updateSchools(schools.map((s, i) => i === idx ? { ...s, ...patch } : s));
  if (!schools.length) return null;
  return <V2Section title="School Grading Scale Dataset">
    <div className="grid g2">
      <V2SmartSchool label="School Search / Select" val={school.name || selectedName} set={setSelectedName} schools={schools} />
      <div className="card" style={{ background: "#eef7ff" }}><span className="label">Selected School</span><h3 style={{ margin: "4px 0 0" }}>{school.name || "Not selected"}</h3><p className="small muted" style={{ margin: "4px 0 0" }}>Use Unknown/Low Confidence when the official scale has not been verified.</p></div>
    </div>
    <V2GradingScaleEditor scale={school.grading_scale_config || school.gradingScaleConfig || V2_EMPTY_GRADING_SCALE()} setScale={scale => edit({ grading_scale_config: v2NormalizeGradingScale(scale) })} />
  </V2Section>;
}
function V2SchoolLegacyAdmin({ schools = [], updateSchools }) {
  const [selectedName, setSelectedName] = useState("Phillips Exeter Academy");
  const idx = Math.max(0, schools.findIndex(s => s.name === selectedName));
  const school = schools[idx] || schools[0] || {};
  const config = v2LegacySchoolConfig(school);
  const edit = patch => updateSchools(schools.map((s, i) => i === idx ? { ...s, ...patch } : s));
  if (!schools.length) return null;
  return <V2Section title="Legacy / Family Connection 학교별 설정"><div className="grid g4"><V2SmartSchool label="학교 검색/선택" val={school.name || selectedName} set={setSelectedName} schools={schools} /><V2Field label="legacy_sensitivity_multiplier" val={school.legacy_sensitivity_multiplier ?? config.sensitivity} set={v => edit({ legacy_sensitivity_multiplier: Number(v) })} type="number" /><V2Select label="sibling_priority_enabled" val={String(school.sibling_priority_enabled ?? config.siblingPriority)} set={v => edit({ sibling_priority_enabled: v === "true" })} options={["false", "true"]} /><V2Field label="max_legacy_contribution" val={school.max_legacy_contribution ?? config.max} set={v => edit({ max_legacy_contribution: Number(v) })} type="number" /><V2Field label="legacy_weight" val={school.legacy_weight ?? config.weight} set={v => edit({ legacy_weight: Number(v) })} type="number" /></div><p className="small muted">레거시는 합격 가능성을 대체하지 않는 작은 맥락 가산점입니다. Phillips Exeter Academy는 기본 제안값으로 sensitivity 0.7, sibling priority true, max 3.0을 사용합니다.</p></V2Section>;
}
function v2OwnerIds(st) {
  const ids = st?.owners?.length ? st.owners : [st?.owner].filter(Boolean);
  return [...new Set(ids.filter(Boolean))];
}
function v2StaffName(id, staff = []) {
  return staff.find(a => a.id === id)?.name || id || "미지정";
}
function v2OwnerLabel(st, staff = []) {
  const owners = v2OwnerIds(st);
  const names = owners.map(id => v2StaffName(id, staff)).join(", ") || "미지정";
  return owners.length > 1 ? `${names} (공동 관리 ${owners.length}명)` : names;
}
function v2DateOnly(value) {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}
function v2DaysUntil(value) {
  const due = v2DateOnly(value);
  if (!due) return null;
  const today = new Date();
  const base = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = new Date(due + "T00:00:00");
  return Math.round((target - base) / 86400000);
}
function v2Dday(value) {
  const d = v2DaysUntil(value);
  if (d === null) return "미정";
  if (d === 0) return "D-Day";
  return d > 0 ? `D-${d}` : `D+${Math.abs(d)}`;
}
function v2Stars(value) {
  const n = Math.max(1, Math.min(5, Number(value || 3)));
  return "★".repeat(n) + "☆".repeat(5 - n);
}
function v2StudentActionRows(students = []) {
  return students.flatMap(st => {
    const manual = [...(st.actionPlans || []), ...(st.tasks || [])].map((t, i) => ({
      student: st,
      source: "task",
      index: i,
      title: t.title || t.text || t.task || "액션 플랜",
      deadline: t.deadline || t.due || t.date || "",
      done: !!t.done,
      importance: t.importance || t.priority || 3
    }));
    const applications = (st.applications || []).filter(a => a.deadline).map((a, i) => ({
      student: st,
      source: "application",
      index: i,
      title: `${a.school || "지원학교"} 원서 마감 준비`,
      deadline: a.deadline,
      done: /submitted|complete|accepted/i.test(a.status || ""),
      importance: 5
    }));
    const weekly = !manual.length && st.stagePlans?.weeklyPlan ? String(st.stagePlans.weeklyPlan).split(/\n+/).filter(Boolean).slice(0, 6).map((line, i) => ({
      student: st,
      source: "weeklyPlan",
      index: i,
      title: line.replace(/^[-*]\s*/, ""),
      deadline: st.programEndDate || st.deadline || "",
      done: false,
      importance: 3
    })) : [];
    return [...manual, ...applications, ...weekly].filter(r => r.title);
  });
}
function V2Schedule({ data, persist, students, staff, user }) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [visibleStaff, setVisibleStaff] = useState(Object.fromEntries((staff || []).map(a => [a.id, true])));
  const teamEvents = data.teamEvents || [];
  const selectedIds = Object.entries(visibleStaff).filter(([, on]) => on).map(([id]) => id);
  const studentEvents = (students || [])
    .filter(st => !selectedIds.length || v2OwnerIds(st).some(id => selectedIds.includes(id)))
    .flatMap(st => (st.calendarEvents || []).map(e => ({ ...e, student: st.name, owners: v2OwnerLabel(st, staff), team: false })));
  const rows = [...studentEvents, ...teamEvents.map((e, teamIndex) => ({ ...e, teamIndex, student: "팀 전체", owners: "Admin", team: true }))]
    .filter(e => !month || String(e.date || "").startsWith(month))
    .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
  const editTeam = (i, patch) => persist({ ...data, teamEvents: v2SetArr(teamEvents, i, { ...teamEvents[i], ...patch }) });
  const addTeam = () => persist({ ...data, teamEvents: [...teamEvents, { date: new Date().toISOString().slice(0, 10), createdAt: new Date().toISOString().slice(0, 10), title: "팀 전체 일정", notes: "" }] });
  const deleteTeam = i => persist({ ...data, teamEvents: teamEvents.filter((_, x) => x !== i) });
  const y = Number(month.slice(0, 4));
  const m = Number(month.slice(5, 7)) - 1;
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return <div className="grid">
    <V2Section title="일정 관리">
      <div className="right" style={{ justifyContent: "space-between", alignItems: "end", flexWrap: "wrap" }}>
        <V2Field label="표시 월" type="month" val={month} set={setMonth} />
        {user?.role === "admin" && <button className="btn primary" onClick={addTeam}>팀 전체 일정 추가</button>}
      </div>
      <div className="right" style={{ flexWrap: "wrap", gap: 8, marginBottom: 12 }}>{staff.map(a => <button type="button" key={a.id} className={"btn " + (visibleStaff[a.id] ? "primary" : "ghost")} onClick={() => setVisibleStaff({ ...visibleStaff, [a.id]: !visibleStaff[a.id] })}>{a.name}</button>)}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div className="cell head" key={d}>{d}</div>)}{cells.map((d, i) => {
        const date = d ? `${month}-${String(d).padStart(2, "0")}` : "";
        const dayRows = rows.filter(e => e.date === date).slice(0, 4);
        return <div className="cell" key={i} style={{ minHeight: 112, background: d ? "white" : "#f9fafb" }}>{d && <><b>{d}</b>{dayRows.map((e, j) => <p className="small" key={j} style={{ margin: "6px 0 0" }}><span className={"pill " + (e.team ? "p-amber" : "p-blue")}>{e.team ? "Team" : e.type || "Event"}</span><br />{e.student}: {e.title}</p>)}</>}</div>;
      })}</div>
    </V2Section>
    <V2Section title="일정 목록"><table className="table"><thead><tr><th>날짜</th><th>학생/범위</th><th>일정</th><th>담당자</th><th>등록일</th><th>비고</th><th></th></tr></thead><tbody>{rows.map((e, i) => <tr key={`${e.team ? "team" : "student"}-${i}-${e.date}-${e.title}`}><td>{e.team && user?.role === "admin" ? <input className="input" type="date" value={e.date || ""} onChange={ev => editTeam(e.teamIndex, { date: ev.target.value })} /> : e.date}</td><td>{e.student}</td><td>{e.team && user?.role === "admin" ? <input className="input" value={e.title || ""} onChange={ev => editTeam(e.teamIndex, { title: ev.target.value })} /> : e.title}</td><td>{e.owners}</td><td>{e.createdAt || "-"}</td><td>{e.team && user?.role === "admin" ? <input className="input" value={e.notes || ""} onChange={ev => editTeam(e.teamIndex, { notes: ev.target.value })} /> : (e.notes || e.type || "")}</td><td>{e.team && user?.role === "admin" && <button className="btn ghost" onClick={() => deleteTeam(e.teamIndex)}>삭제</button>}</td></tr>)}</tbody></table></V2Section>
  </div>;
}
function V2ManagedStudentsModal({ open, onClose, students, staff, setSelected, setView, setStage }) {
  if (!open) return null;
  return <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.35)", zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
    <div className="card" style={{ width: "min(980px, 96vw)", maxHeight: "88vh", overflow: "auto" }}>
      <div className="right" style={{ justifyContent: "space-between", marginBottom: 12 }}><h3>관리 학생 전체</h3><button className="btn ghost" onClick={onClose}>닫기</button></div>
      <table className="table"><thead><tr><th>학생</th><th>Stage</th><th>완료율</th><th>담당자</th><th>학교</th><th></th></tr></thead><tbody>{students.map(st => {
        const currentStage = st.stage || "stage1";
        const pct = v2StageCompletion(st, currentStage);
        return <tr key={st.id}><td>{st.name || "신규 학생"}</td><td>{V2_STAGE_KEYS.find(x => x[0] === currentStage)?.[1] || currentStage}</td><td><div className="progress"><div style={{ width: pct + "%" }} /></div><span className="small">{pct}%</span></td><td>{v2OwnerLabel(st, staff)}</td><td>{st.school || "미입력"}</td><td><button className="btn ghost" onClick={() => { setSelected(st.id); setStage(currentStage); setView("student"); onClose(); }}>상세</button></td></tr>;
      })}</tbody></table>
    </div>
  </div>;
}
function V2AdminCalendar({ data, persist, staff, students }) {
  const [visibleStaff, setVisibleStaff] = useState(Object.fromEntries((staff || []).map(a => [a.id, true])));
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const teamEvents = data.teamEvents || [];
  const editTeam = (i, patch) => persist({ ...data, teamEvents: v2SetArr(teamEvents, i, { ...teamEvents[i], ...patch }) });
  const addTeam = () => persist({ ...data, teamEvents: [...teamEvents, { date: new Date().toISOString().slice(0, 10), createdAt: new Date().toISOString().slice(0, 10), title: "팀 전체 일정", notes: "" }] });
  const deleteTeam = i => persist({ ...data, teamEvents: teamEvents.filter((_, x) => x !== i) });
  const selectedIds = Object.entries(visibleStaff).filter(([, on]) => on).map(([id]) => id);
  const studentEvents = students.filter(st => v2OwnerIds(st).some(id => selectedIds.includes(id))).flatMap(st => (st.calendarEvents || []).map(e => ({ ...e, student: st.name, owners: v2OwnerLabel(st, staff), team: false })));
  const rows = [...studentEvents, ...teamEvents.map((e, teamIndex) => ({ ...e, teamIndex, student: "팀 전체", owners: "Admin", team: true }))].filter(e => !month || String(e.date || "").startsWith(month)).sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
  return <V2Section title="일정 관리 / 팀 캘린더">
    <div className="right" style={{ justifyContent: "space-between", alignItems: "end", gap: 12 }}>
      <V2Field label="표시 월" type="month" val={month} set={setMonth} />
      <button className="btn primary" onClick={addTeam}>팀 전체 일정 추가</button>
    </div>
    <div className="right" style={{ flexWrap: "wrap", gap: 8, margin: "10px 0" }}>{staff.map(a => <button key={a.id} type="button" className={"btn " + (visibleStaff[a.id] ? "primary" : "ghost")} onClick={() => setVisibleStaff({ ...visibleStaff, [a.id]: !visibleStaff[a.id] })}>{a.name}</button>)}</div>
    <table className="table"><thead><tr><th>날짜</th><th>학생/범위</th><th>일정</th><th>담당자</th><th>등록일</th><th>비고</th><th></th></tr></thead><tbody>{rows.map((e, i) => <tr key={`${e.team ? "team" : "student"}-${i}-${e.date}-${e.title}`}>
      <td>{e.team ? <input className="input" type="date" value={e.date || ""} onChange={ev => editTeam(e.teamIndex, { date: ev.target.value })} /> : e.date}</td>
      <td>{e.student}</td>
      <td>{e.team ? <input className="input" value={e.title || ""} onChange={ev => editTeam(e.teamIndex, { title: ev.target.value })} /> : e.title}</td>
      <td>{e.owners}</td>
      <td>{e.createdAt || "-"}</td>
      <td>{e.team ? <input className="input" value={e.notes || ""} onChange={ev => editTeam(e.teamIndex, { notes: ev.target.value })} /> : (e.notes || e.type || "")}</td>
      <td>{e.team && <button className="btn ghost" onClick={() => deleteTeam(e.teamIndex)}>삭제</button>}</td>
    </tr>)}</tbody></table>
  </V2Section>;
}
function V2AdminDashboard({ data, persist, setSelected, setView, setStage }) {
  const staff = data.staffAccounts || [];
  const students = data.students || [];
  const [staffTab, setStaffTab] = useState("all");
  const [managedOpen, setManagedOpen] = useState(false);
  const scoped = staffTab === "all" ? students : students.filter(st => v2OwnerIds(st).includes(staffTab));
  const rows = v2StudentActionRows(scoped);
  const thisWeek = rows.filter(r => !r.done && (v2DaysUntil(r.deadline) === null || (v2DaysUntil(r.deadline) >= 0 && v2DaysUntil(r.deadline) <= 7)));
  const overdue = rows.filter(r => !r.done && v2DaysUntil(r.deadline) !== null && v2DaysUntil(r.deadline) < 0);
  const openStudentAction = st => { setSelected(st.id); setStage("stage3"); setView("student"); };
  return <div className="grid">
    <button type="button" className="card metric" onClick={() => setManagedOpen(true)} style={{ textAlign: "left" }}><span>관리 학생 전체</span><strong>{students.length}</strong></button>
    <V2ManagedStudentsModal open={managedOpen} onClose={() => setManagedOpen(false)} students={students} staff={staff} setSelected={setSelected} setView={setView} setStage={setStage} />
    <V2SubTabs tabs={[["all", "전체"], ...staff.map(a => [a.id, a.name])]} active={staffTab} set={setStaffTab} />
    <V2Section title="학생 Stage 현황"><table className="table"><thead><tr><th>담당자</th><th>학생</th><th>Stage</th><th>학교</th><th></th></tr></thead><tbody>{scoped.map(st => { const currentStage = st.stage || "stage1"; const pct = v2StageCompletion(st, currentStage); return <tr key={st.id}><td>{v2OwnerLabel(st, staff)}</td><td>{st.name || "신규 학생"}</td><td>{V2_STAGE_KEYS.find(x => x[0] === currentStage)?.[1] || currentStage} · {pct}%<div className="progress" style={{ marginTop: 6, width: 140, maxWidth: "100%" }}><div style={{ width: pct + "%" }} /></div></td><td>{st.school || "미입력"}</td><td><button className="btn ghost" onClick={() => { setSelected(st.id); setStage(currentStage); setView("student"); }}>상세</button></td></tr>; })}</tbody></table></V2Section>
    <V2Section title="이번주 할 일"><table className="table"><thead><tr><th>담당자</th><th>학생</th><th>할 일</th><th>데드라인</th><th>D-n</th><th>중요도</th><th></th></tr></thead><tbody>{thisWeek.map((r, i) => <tr key={`${r.student.id}-${r.source}-${i}`} onClick={() => openStudentAction(r.student)} style={{ cursor: "pointer" }}><td>{v2OwnerLabel(r.student, staff)}</td><td>{r.student.name}</td><td>{r.title}</td><td>{r.deadline || "미정"}</td><td>{v2Dday(r.deadline)}</td><td style={{ color: "#1f6fa8", letterSpacing: 1 }}>{v2Stars(r.importance)}</td><td><button className="btn ghost" onClick={e => { e.stopPropagation(); openStudentAction(r.student); }}>수정</button></td></tr>)}</tbody></table></V2Section>
    <V2Section title="이번주 미완결 업무"><table className="table"><thead><tr><th>담당자</th><th>학생</th><th>업무</th><th>데드라인</th><th>D-n</th><th>중요도</th><th></th></tr></thead><tbody>{overdue.map((r, i) => <tr key={`${r.student.id}-overdue-${i}`}><td>{v2OwnerLabel(r.student, staff)}</td><td>{r.student.name}</td><td>{r.title}</td><td>{r.deadline}</td><td>{v2Dday(r.deadline)}</td><td style={{ color: "#b45309", letterSpacing: 1 }}>{v2Stars(r.importance)}</td><td><button className="btn ghost" onClick={() => openStudentAction(r.student)}>수정</button></td></tr>)}</tbody></table></V2Section>
    <V2AdminCalendar data={data} persist={persist} staff={staff} students={students} />
  </div>;
}
function V2Admin({ data, persist, updateSchools, setSelected, setView, setStage }) {
  const [tab, setTab] = useState("dashboard");
  const staff = data.staffAccounts || [];
  const editStaff = (i, patch) => persist({ ...data, staffAccounts: v2SetArr(staff, i, patch) });
  const addStaff = () => persist({ ...data, staffAccounts: [...staff, { id: "staff" + Date.now(), name: "새 담당자", role: "staff", email: "new@yesuhak.com", password: "prep2026" }] });
  return <div><V2SubTabs tabs={[["dashboard", "대시보드"], ["staff", "담당자 관리"], ["schools", "학교 데이터"], ["students", "학생 현황"]]} active={tab} set={setTab} />{tab === "dashboard" && <V2AdminDashboard data={data} persist={persist} setSelected={setSelected} setView={setView} setStage={setStage} />}{tab === "staff" && <V2Section title="담당자 계정"><button className="btn primary" onClick={addStaff}>담당자 추가</button><table className="table"><thead><tr><th>이름</th><th>Email</th><th>Password</th><th>ID</th></tr></thead><tbody>{staff.map((a, i) => <tr key={a.id}><td><input className="input" value={a.name || ""} onChange={e => editStaff(i, { name: e.target.value })} /></td><td><input className="input" value={a.email || ""} onChange={e => editStaff(i, { email: e.target.value })} /></td><td><input className="input" value={a.password || ""} onChange={e => editStaff(i, { password: e.target.value })} /></td><td>{a.id}</td></tr>)}</tbody></table></V2Section>}{tab === "schools" && <V2SchoolDataAdmin schools={data.schools || []} updateSchools={updateSchools} />}{tab === "students" && <V2AdminDashboard data={data} persist={persist} setSelected={setSelected} setView={setView} setStage={setStage} />}</div>;
}

ReactDOM.render(<V2App />, document.getElementById("root"));
