(function (root) {
  const clone = value => JSON.parse(JSON.stringify(value));
  const sections = [["identity", "기본 정보"], ["schools", "학교 정보"], ["grades", "성적표"], ["tests", "시험"], ["ecs", "EC 기본"], ["awards", "수상내역"]];
  const fields = ["basic", "school", "currentGrade", "grade", "currentSchoolInfo", "previousSchools", "academicTerms", "tests", "ecs", "awards"];
  const pickProfile = student => Object.fromEntries(fields.filter(k => student[k] !== undefined).map(k => [k, clone(student[k])]));
  const has = value => value !== undefined && value !== null && String(value).trim() !== "";
  function requirements(profile = {}, declarations = {}) {
    const b = profile.basic || {};
    const issues = [];
    const need = (tab, label, valid) => { if (!valid) issues.push({ tab, label }); };
    [["성", b.lastNameKo], ["이름", b.firstNameKo], ["영문 성", b.lastNameEn], ["영문 이름", b.firstNameEn], ["생년월일", b.dob], ["출생 국가", b.birthCountry], ["미국 영주권/시민권", b.usStatus]].forEach(([label, v]) => need("identity", label, has(v)));
    need("identity", "생년월일 확인", !b.dob || (/^\d{4}-\d{2}-\d{2}$/.test(b.dob) && b.dob < new Date().toISOString().slice(0, 10)));
    need("identity", "국적", Array.isArray(b.nationalities) && b.nationalities.length);
    [[b.birthCountry === "기타", "출생 국가 직접 입력", b.birthCountryOther], [b.usStatus === "기타", "미국 체류/신분 직접 입력", b.usStatusOther], [(b.nationalities || []).includes("기타"), "국적 직접 입력", b.nationalityOther]].forEach(([active, label, v]) => { if (active) need("identity", label, has(v)); });
    need("identity", "학생 개인 이메일 또는 학교 이메일", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.personalEmail || b.schoolEmail || ""));
    need("identity", "Permanent Address", (b.addresses || []).some(a => a.type === "Permanent Address" && (has(a.koreanAddress) || has(a.englishAddress))));
    need("identity", "보호자 연락처", [b.parents?.father?.phone, b.parents?.mother?.phone, b.guardianPhone].some(has));
    need("schools", "현재 학교", has(profile.school));
    need("schools", "현재 학년", has(profile.currentSchoolInfo?.gradeTo || profile.currentGrade));
    need("schools", "학교 구분", has(profile.currentSchoolInfo?.type));
    for (const tab of ["grades", "tests", "ecs", "awards"]) {
      const status = declarations[tab];
      need(tab, `${sections.find(s => s[0] === tab)[1]} 자료 유무 확인`, ["provided", "none", "pending"].includes(status));
      if (status === "pending") need(tab, "자료 준비 예정일", /^\d{4}-\d{2}-\d{2}$/.test(declarations[tab + "Due"] || "") && declarations[tab + "Due"] >= new Date().toISOString().slice(0, 10));
      if (status !== "provided") continue;
      if (tab === "grades") need(tab, "과목명과 성적 또는 성적표 링크", (profile.academicTerms || []).some(t => (t.subjects || []).some(s => has(s.subject) && has(s.rawGrade || s.grade)) || /^https?:\/\//.test(t.reportUrl || t.attachmentUrl || "")));
      if (tab === "tests") need(tab, "시험 종류·응시일·점수", (profile.tests || []).some(t => has(t.type) && has(t.date) && (has(t.overall) || Object.values(t.details || {}).some(has))));
      if (tab === "ecs") need(tab, "활동 분류·활동명·시작 연월", (profile.ecs || []).some(e => has(e.cat) && has(e.name) && has(e.from)));
      if (tab === "awards") need(tab, "상 이름·수상 연월", (profile.awards || []).some(a => has(a.awardName) && has(a.date)));
    }
    return issues;
  }
  function normalize(student) {
    const existing = student.parentPortal || {};
    return { version: 1, enabled: false, parentName: "", parentEmail: "", contactPhone: "", draft: pickProfile(student), draftBase: pickProfile(student), declarations: {}, submissions: [], publications: [], payments: [], updates: [], ...clone(existing) };
  }
  function saveDraft(student, draft, declarations, now = new Date().toISOString()) {
    return { ...normalize(student), draft: pickProfile(draft), declarations: clone(declarations), savedAt: now };
  }
  function submit(student, draft, declarations, now = new Date().toISOString()) {
    const missing = requirements(draft, declarations);
    if (missing.length) throw new Error(missing.map(x => x.label).join(", "));
    const portal = saveDraft(student, draft, declarations, now);
    const submission = { id: "submission-" + now, status: "submitted", submittedAt: now, profile: pickProfile(draft), declarations: clone(declarations), baseProfile: portal.draftBase };
    return { ...portal, submissions: [submission, ...portal.submissions], updates: [{ id: submission.id, at: now, title: "학생 자료 제출", detail: "담당 컨설턴트가 제출 자료를 확인하고 있습니다." }, ...portal.updates] };
  }
  function publicStudent(student) {
    const p = normalize(student);
    return { id: student.id, name: student.name, program: student.program, programEndDate: student.programEndDate, parentPortal: { ...p, submissions: p.submissions.map(({ baseProfile, ...s }) => s), publications: p.publications.filter(x => x.status === "published") } };
  }
  function mergeSubmission(student, submission) {
    // Three-way merge prevents an older parent form from overwriting newer consultant edits.
    const conflicts = [];
    const merge = (current, base, incoming, path) => {
      if (JSON.stringify(base) === JSON.stringify(incoming)) return current;
      if (JSON.stringify(current) === JSON.stringify(base) || JSON.stringify(current) === JSON.stringify(incoming)) return clone(incoming);
      if (incoming && base && current && !Array.isArray(incoming) && typeof incoming === "object") {
        const result = { ...current };
        Object.keys(incoming).forEach(k => { result[k] = merge(current[k], base[k], incoming[k], path ? path + "." + k : k); });
        return result;
      }
      conflicts.push(path);
      return current;
    };
    const profile = merge(pickProfile(student), submission.baseProfile, submission.profile, "");
    return { profile, conflicts };
  }
  const api = { clone, sections, fields, pickProfile, requirements, normalize, saveDraft, submit, publicStudent, mergeSubmission };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.PrepParentModel = api;
})(typeof window === "undefined" ? globalThis : window);
