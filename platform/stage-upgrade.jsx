const STAGE_KEYS = [
  ["stage1", "Stage 1: 학생 분석"],
  ["stage2", "Stage 2: 전략 수립"],
  ["stage3", "Stage 3: 관리"],
  ["stage4", "Stage 4: 원서"],
  ["stage5", "Stage 5: 입학"]
];
const GRADE_OPTIONS = Array.from({ length: 9 }, (_, i) => `${i + 4}학년`);
const TARGET_GRADE_OPTIONS = [...GRADE_OPTIONS, "대학"];
const YEAR_OPTIONS = Array.from({ length: 6 }, (_, i) => String(new Date().getFullYear() + i));
const PROGRAM_OPTIONS = ["주니어보딩", "시니어보딩", "보딩프렙"];
const BASE_USERS = accounts.map(a => ({ ...a, password: a.password || "prep2026" }));
const emptyInterest = () => ({ school: "", note: "" });
const emptyPreviousSchool = () => ({
  name: "",
  type: "",
  addressKo: "",
  addressEn: "",
  zip: "",
  startDate: "",
  endDate: "",
  gradeAttended: "",
  finalGrade: "",
  counselor: "",
  role: "",
  email: "",
  phone: "",
  discipline: "No",
  withdrawal: "No",
  notes: ""
});
const emptyChecklist = items => items.map(text => ({ text, done: false, note: "" }));
const enrollmentItems = ["I-20/비자 서류", "SEVIS 납부", "비자 인터뷰", "수강신청", "보험 가입", "건강/예방접종 서류", "기숙사/룸메이트 서류", "항공권/도착 일정", "학부모 결제/계정", "입학 전 오리엔테이션"];

function normalizeStageData(data) {
  const version = window.PREP_SCHOOL_DATA_VERSION || "legacy";
  const schools = data.schoolDataVersion === version && Array.isArray(data.schools) && data.schools.length >= DEFAULT_SCHOOLS.length ? data.schools : DEFAULT_SCHOOLS;
  const staffAccounts = [...BASE_USERS.filter(a => a.role === "staff"), ...((data.staffAccounts || []).filter(a => !BASE_USERS.some(b => b.id === a.id)))];
  return {
    ...data,
    schoolDataVersion: version,
    schools,
    staffAccounts,
    students: (data.students || []).map(s => {
      const owners = s.owners || [s.owner || "aram"].filter(Boolean);
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
        basic: s.basic || {},
        family: s.family || {},
        currentSchoolInfo: s.currentSchoolInfo || {},
        previousSchools: [...(s.previousSchools || []), emptyPreviousSchool(), emptyPreviousSchool(), emptyPreviousSchool()].slice(0, 3),
        customSchools: s.customSchools || [],
        interests: [...(s.interests || []), emptyInterest(), emptyInterest(), emptyInterest()].slice(0, 3),
        stagePlans: s.stagePlans || {},
        applications: s.applications || [],
        calendarEvents: s.calendarEvents || [],
        enrollmentChecklist: s.enrollmentChecklist || emptyChecklist(enrollmentItems),
        gateway: s.gateway || {},
        roadmap: s.roadmap || {},
        actions: s.actions || []
      };
    })
  };
}
function loadStageData() { return normalizeStageData(load()); }
function saveStageData(data) { save(data); }
function fieldFilled(v) {
  if (Array.isArray(v)) return v.some(fieldFilled);
  if (v && typeof v === "object") return Object.values(v).some(fieldFilled);
  return String(v || "").trim().length > 0;
}
function stageRequired(st, stage) {
  const p = st.stagePlans || {};
  if (stage === "stage1") return [
    st.name, st.en, st.program, st.currentGrade, st.school, st.targetYear, st.targetGrade, st.programEndDate,
    st.basic?.dob, st.basic?.gender, st.basic?.nationality, st.basic?.email, st.basic?.parentPhone,
    st.currentSchoolInfo?.type, st.academics?.[0]?.gpa, st.tests?.[0]?.overall, st.ecs?.[0]?.name
  ];
  if (stage === "stage2") return [p.hookTerritory, p.ecRoadmap, p.academicPlan, p.scenarios, p.probabilityNotes];
  if (stage === "stage3") return [st.tasks?.[0]?.text, st.calendarEvents?.[0]?.title, p.managementPlan, p.evidencePlan];
  if (stage === "stage4") return [st.applications?.[0]?.school, p.essayTopics, p.topActivities, p.recommendations, p.accounts];
  return [p.enrollmentSchool, st.enrollmentChecklist, p.visa, p.courseRegistration, p.insurance, p.arrival];
}
function stageCompletion(st, stage) {
  const items = stageRequired(st, stage);
  return Math.round(items.reduce((n, x) => n + (fieldFilled(x) ? 1 : 0), 0) / (items.length || 1) * 100);
}
function overallCompletion(st) {
  return Math.round(STAGE_KEYS.reduce((n, [k]) => n + stageCompletion(st, k), 0) / STAGE_KEYS.length);
}
function HSelect({ label, val, set, options }) {
  const stageLabel = v => STAGE_KEYS.find(x => x[0] === v)?.[1] || v;
  return <div className="field"><span className="label">{label === "현재 학년" ? "현재 학년도" : label}</span><select className="select" value={val || ""} onChange={e => set(e.target.value)}><option value="">선택</option>{options.map(o => <option key={o} value={o}>{label === "Stage" ? stageLabel(o) : o}</option>)}</select></div>;
}
function HCheck({ label, checked, set }) {
  return <label className="small" style={{ display: "inline-flex", gap: 6, alignItems: "center", marginRight: 12 }}><input type="checkbox" checked={!!checked} onChange={e => set(e.target.checked)} /> {label}</label>;
}
function StageApp() {
  const [data0, setData0] = useState(() => loadStageData());
  const data = normalizeStageData(data0);
  const users = [...BASE_USERS, ...(data.staffAccounts || [])];
  const [user, setUser] = useState(null);
  const [view, setView] = useState("dashboard");
  const [selected, setSelected] = useState(data.students[0]?.id);
  const [stage, setStage] = useState("stage1");
  const [login, setLogin] = useState({ email: "admin@yesuhak.com", password: "prep2026" });
  const persist = next => { const fixed = normalizeStageData(next); setData0(fixed); saveStageData(fixed); };
  if (!user) return <Login login={login} setLogin={setLogin} onLogin={() => { const a = users.find(x => x.email === login.email && x.password === login.password); if (a) setUser(a); else alert("계정을 확인하세요."); }} />;
  const visible = user.role === "admin" ? data.students : data.students.filter(s => (s.owners || [s.owner]).includes(user.id));
  const st = data.students.find(s => s.id === selected) || visible[0] || data.students[0];
  const updateStudent = patch => persist({ ...data, students: data.students.map(s => s.id === st.id ? { ...s, ...patch, last: new Date().toISOString().slice(0, 10) } : s) });
  return <div className="app"><Sidebar user={user} view={view} setView={setView} logout={() => setUser(null)} /><main className="main"><Header view={view} />{view === "dashboard" && <StageDashboard students={visible} setView={setView} setSelected={setSelected} />}{view === "students" && <StageStudents students={visible} add={() => { const ns = { ...blankStudent(), owners: [user.role === "admin" ? "aram" : user.id], stage: "stage1", currentGrade: "", targetYear: String(new Date().getFullYear() + 1), targetGrade: "", previousSchools: [emptyPreviousSchool(), emptyPreviousSchool(), emptyPreviousSchool()], interests: [emptyInterest(), emptyInterest(), emptyInterest()] }; persist({ ...data, students: [ns, ...data.students] }); setSelected(ns.id); setView("student"); }} setSelected={setSelected} setView={setView} />}{view === "student" && st && <StageStudentDetail st={st} update={updateStudent} schools={data.schools} staff={users.filter(a => a.role === "staff")} stage={stage} setStage={setStage} />}{view === "schedule" && <Schedule students={visible} />}{view === "reports" && <EnhancedReports students={visible} selected={st} setSelected={setSelected} schools={data.schools} />}{view === "admin" && user.role === "admin" && <StageAdmin data={data} persist={persist} setSelected={setSelected} setView={setView} />}</main></div>;
}
function StageDashboard({ students, setView, setSelected }) {
  return <div className="grid"><div className="grid g4"><Metric title="관리 학생" val={students.length} /><Metric title="평균 입력률" val={(Math.round(students.reduce((n, s) => n + overallCompletion(s), 0) / (students.length || 1)) || 0) + "%"} /><Metric title="Stage 1 완료" val={students.filter(s => stageCompletion(s, "stage1") >= 80).length} /><Metric title="원서 단계" val={students.filter(s => s.stage === "stage4").length} /></div><div className="card"><h3>학생 Stage 현황</h3>{students.map(s => <div className="student-row" key={s.id}><div><b>{s.name}</b><div className="small muted">{s.program || "프로그램 미정"} · {s.currentGrade || s.grade}</div></div><span>{s.school || "학교 미입력"}</span><span>{STAGE_KEYS.find(x => x[0] === s.stage)?.[1] || "Stage 1"}</span><div><div className="progress"><div style={{ width: overallCompletion(s) + "%" }} /></div><span className="small">{overallCompletion(s)}%</span></div><button className="btn ghost" onClick={() => { setSelected(s.id); setView("student"); }}>상세</button></div>)}</div></div>;
}
function StageStudents({ students, add, setSelected, setView }) {
  return <div><div className="right" style={{ justifyContent: "space-between", marginBottom: 12 }}><p className="muted small">담당자로 지정된 학생만 표시됩니다. Admin은 모든 학생을 봅니다.</p><button className="btn primary" onClick={add}>학생 추가</button></div>{students.map(s => <div className="student-row" key={s.id}><div><b>{s.name}</b><div className="small muted">{s.en} · {s.program || "프로그램 미정"}</div></div><span>{s.school || "학교 미입력"}</span><span>{s.targetYear} {s.targetGrade}</span><span className="pill p-blue">{STAGE_KEYS.find(x => x[0] === s.stage)?.[1]}</span><button className="btn ghost" onClick={() => { setSelected(s.id); setView("student"); }}>열기</button></div>)}</div>;
}
function StageStudentDetail({ st, update, schools, staff, stage, setStage }) {
  return <div><div className="card" style={{ marginBottom: 14 }}><div className="right" style={{ justifyContent: "space-between" }}><div><h3>{st.name} <span className="muted">{st.en}</span></h3><p className="small muted">{st.program || "프로그램 미정"} · {st.school || "현재 학교 미입력"} · {st.targetYear} {st.targetGrade}</p></div><span className="pill p-green">입력률 {overallCompletion(st)}%</span></div></div><div className="tabs">{STAGE_KEYS.map(([k, v]) => <button className={"tab " + (stage === k ? "active" : "")} key={k} onClick={() => { setStage(k); update({ stage: k }); }}>{v} · {stageCompletion(st, k)}%</button>)}</div>{stage === "stage1" && <StageOne st={st} update={update} schools={schools} staff={staff} />}{stage === "stage2" && <StageTwo st={st} update={update} schools={schools} />}{stage === "stage3" && <StageThree st={st} update={update} schools={schools} />}{stage === "stage4" && <StageFour st={st} update={update} schools={schools} />}{stage === "stage5" && <StageFive st={st} update={update} />}</div>;
}
function MultiStaff({ staff, selected = [], set }) {
  return <div className="field"><span className="label">담당자 복수 선택</span><div className="card" style={{ padding: 10 }}>{staff.map(a => <HCheck key={a.id} label={a.name} checked={selected.includes(a.id)} set={checked => set(checked ? [...selected, a.id] : selected.filter(x => x !== a.id))} />)}</div></div>;
}
function SchoolPicker({ label, val, set, schools, onCustom }) {
  const opts = window.PREP_SCHOOL_NAMES || schools.map(s => s.name);
  return <div><SmartSearchInput label={label} val={val} set={set} options={opts} /><button className="btn ghost" style={{ marginTop: -6, marginBottom: 10 }} onClick={onCustom}>직접 입력</button></div>;
}
function CustomSchoolModal({ open, onClose, onSave }) {
  const [x, setX] = useState(emptyPreviousSchool());
  if (!open) return null;
  return <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.45)", zIndex: 99, display: "flex", alignItems: "center", justifyContent: "center" }}><div className="card" style={{ width: "min(780px,94vw)" }}><h3>학교 직접 입력</h3><div className="grid g2"><Input label="학교명" val={x.name} set={v => setX({ ...x, name: v })} /><Input label="학교 구분" val={x.type} set={v => setX({ ...x, type: v })} /><Text label="학교 주소 한글" val={x.addressKo} set={v => setX({ ...x, addressKo: v })} /><Text label="학교 주소 영문" val={x.addressEn} set={v => setX({ ...x, addressEn: v })} /><Input label="학교 이메일" val={x.email} set={v => setX({ ...x, email: v })} /><Input label="학교 전화번호" val={x.phone} set={v => setX({ ...x, phone: v })} /><Text label="메모" val={x.notes} set={v => setX({ ...x, notes: v })} /></div><div className="right" style={{ justifyContent: "flex-end" }}><button className="btn ghost" onClick={onClose}>취소</button><button className="btn primary" onClick={() => { onSave(x); onClose(); }}>저장</button></div></div></div>;
}
function StageOne({ st, update, schools, staff }) {
  const [modal, setModal] = useState(null);
  const basic = st.basic || {};
  const family = st.family || {};
  const currentSchoolInfo = st.currentSchoolInfo || {};
  const previousSchools = st.previousSchools || [emptyPreviousSchool(), emptyPreviousSchool(), emptyPreviousSchool()];
  const setBasic = (k, v) => update({ basic: { ...basic, [k]: v } });
  const setFamily = (k, v) => update({ family: { ...family, [k]: v } });
  const setCurrentSchoolInfo = (k, v) => update({ currentSchoolInfo: { ...currentSchoolInfo, [k]: v } });
  const setPrev = (i, patch) => update({ previousSchools: previousSchools.map((x, idx) => idx === i ? { ...x, ...patch } : x) });
  const saveCustom = x => { if (!x.name) return; if (modal === "current") update({ school: x.name, currentSchoolInfo: { ...currentSchoolInfo, ...x } }); if (modal?.startsWith("previous")) setPrev(Number(modal.replace("previous", "")), x); update({ customSchools: [...(st.customSchools || []), x] }); };
  return <div className="grid"><CustomSchoolModal open={!!modal} onClose={() => setModal(null)} onSave={saveCustom} /><div className="card"><h3>기본 정보</h3><div className="grid g4"><Input label="성" val={basic.lastNameKo} set={v => setBasic("lastNameKo", v)} /><Input label="이름" val={basic.firstNameKo} set={v => setBasic("firstNameKo", v)} /><Input label="영문 성" val={basic.lastNameEn} set={v => setBasic("lastNameEn", v)} /><Input label="영문 이름" val={basic.firstNameEn} set={v => setBasic("firstNameEn", v)} /><Input label="학생명" val={st.name} set={v => update({ name: v })} /><Input label="English Name" val={st.en} set={v => update({ en: v })} /><Input label="Preferred Name" val={basic.preferredName} set={v => setBasic("preferredName", v)} /><DateField label="생년월일" val={basic.dob} set={v => setBasic("dob", v)} /><HSelect label="성별" val={basic.gender} set={v => setBasic("gender", v)} options={["남자", "여자", "미입력"]} /><Input label="출생 도시" val={basic.birthCity} set={v => setBasic("birthCity", v)} /><Input label="출생 국가" val={basic.birthCountry} set={v => setBasic("birthCountry", v)} /><Input label="국적" val={basic.nationality} set={v => setBasic("nationality", v)} /><HSelect label="미국 영주권/시민권" val={basic.usStatus} set={v => setBasic("usStatus", v)} options={["없음", "영주권", "시민권", "기타"]} /><Input label="학생 이메일" val={basic.email} set={v => setBasic("email", v)} /><Input label="학생 휴대폰" val={basic.phone} set={v => setBasic("phone", v)} /><Input label="부모 연락처" val={basic.parentPhone} set={v => setBasic("parentPhone", v)} /><Input label="우편번호" val={basic.zip} set={v => setBasic("zip", v)} /><Input label="모국어" val={basic.firstLanguage} set={v => setBasic("firstLanguage", v)} /><Input label="가정 사용 언어" val={basic.homeLanguage} set={v => setBasic("homeLanguage", v)} /><Input label="소통 가능 언어" val={basic.languages} set={v => setBasic("languages", v)} /><HSelect label="Financial Aid" val={basic.financialAid} set={v => setBasic("financialAid", v)} options={["Yes", "No", "미정"]} /><HSelect label="Boarding/Day 지원" val={basic.boardingDay} set={v => setBasic("boardingDay", v)} options={["Boarding", "Day", "Both"]} /></div><Text label="현재 거주 주소" val={basic.address} set={v => setBasic("address", v)} /><Text label="추가 필수 정보/특이사항" val={basic.requiredNotes} set={v => setBasic("requiredNotes", v)} /></div><div className="card"><h3>프로그램 / 목표 / 담당자</h3><div className="grid g3"><HSelect label="소속 프로그램" val={st.program} set={v => update({ program: v })} options={PROGRAM_OPTIONS} /><HSelect label="현재 학년" val={st.currentGrade} set={v => update({ currentGrade: v, grade: v })} options={GRADE_OPTIONS} /><HSelect label="지원 연도" val={st.targetYear} set={v => update({ targetYear: v })} options={YEAR_OPTIONS} /><HSelect label="지원 학년" val={st.targetGrade} set={v => update({ targetGrade: v })} options={TARGET_GRADE_OPTIONS} /><DateField label="프로그램 종료일" val={st.programEndDate} set={v => update({ programEndDate: v, deadline: v })} /><HSelect label="Stage" val={st.stage} set={v => update({ stage: v })} options={STAGE_KEYS.map(x => x[0])} /></div><MultiStaff staff={staff} selected={st.owners || []} set={owners => update({ owners, owner: owners[0] })} /></div><SchoolBlocks st={st} update={update} schools={schools} currentSchoolInfo={currentSchoolInfo} setCurrentSchoolInfo={setCurrentSchoolInfo} previousSchools={previousSchools} setPrev={setPrev} setModal={setModal} /><InterestSchools st={st} update={update} schools={schools} /><div className="grid g2"><Academics st={st} update={update} /><FinalTests st={st} update={update} /><FinalEcs st={st} update={update} /><BasicReport st={st} schools={schools} /></div><div className="card"><h3>가족 정보</h3><div className="grid g3"><Input label="아버지 성명" val={family.fatherName} set={v => setFamily("fatherName", v)} /><Input label="아버지 직업/회사" val={family.fatherWork} set={v => setFamily("fatherWork", v)} /><Input label="아버지 이메일" val={family.fatherEmail} set={v => setFamily("fatherEmail", v)} /><Input label="어머니 성명" val={family.motherName} set={v => setFamily("motherName", v)} /><Input label="어머니 직업/회사" val={family.motherWork} set={v => setFamily("motherWork", v)} /><Input label="어머니 이메일" val={family.motherEmail} set={v => setFamily("motherEmail", v)} /></div><Text label="형제/자매" val={family.siblings} set={v => setFamily("siblings", v)} /><Text label="보딩스쿨 관련 가족/지인" val={family.boardingConnections} set={v => setFamily("boardingConnections", v)} /><Text label="가족/양육권/종교/기타 메모" val={family.notes} set={v => setFamily("notes", v)} /></div></div>;
}
function SchoolBlocks({ st, update, schools, currentSchoolInfo, setCurrentSchoolInfo, previousSchools, setPrev, setModal }) {
  return <div className="card"><h3>현재/이전 학교</h3><SchoolPicker label="현재 학교" val={st.school} set={v => update({ school: v })} schools={schools} onCustom={() => setModal("current")} /><div className="grid g3"><Input label="학교 구분" val={currentSchoolInfo.type} set={v => setCurrentSchoolInfo("type", v)} /><Input label="학교 이메일" val={currentSchoolInfo.email} set={v => setCurrentSchoolInfo("email", v)} /><Input label="학교 전화번호" val={currentSchoolInfo.phone} set={v => setCurrentSchoolInfo("phone", v)} /><DateField label="재학 시작일" val={currentSchoolInfo.startDate} set={v => setCurrentSchoolInfo("startDate", v)} /><DateField label="재학 종료일" val={currentSchoolInfo.endDate} set={v => setCurrentSchoolInfo("endDate", v)} /><Input label="교장/카운슬러" val={currentSchoolInfo.counselor} set={v => setCurrentSchoolInfo("counselor", v)} /></div><Text label="현재 학교 주소" val={currentSchoolInfo.addressEn} set={v => setCurrentSchoolInfo("addressEn", v)} />{[0, 1, 2].map(i => <div key={i} style={{ borderTop: "1px solid #e5e7eb", paddingTop: 12, marginTop: 12 }}><h3 style={{ fontSize: 13 }}>이전 학교 {i + 1}</h3><SchoolPicker label={`이전 학교 ${i + 1}`} val={previousSchools[i]?.name} set={v => setPrev(i, { name: v })} schools={schools} onCustom={() => setModal("previous" + i)} /><div className="grid g4"><Input label="학교 구분" val={previousSchools[i]?.type} set={v => setPrev(i, { type: v })} /><DateField label="재학 시작일" val={previousSchools[i]?.startDate} set={v => setPrev(i, { startDate: v })} /><DateField label="재학 종료일" val={previousSchools[i]?.endDate} set={v => setPrev(i, { endDate: v })} /><Input label="재학 학년" val={previousSchools[i]?.gradeAttended} set={v => setPrev(i, { gradeAttended: v })} /><Input label="최종 학년" val={previousSchools[i]?.finalGrade} set={v => setPrev(i, { finalGrade: v })} /><Input label="카운슬러/교장" val={previousSchools[i]?.counselor} set={v => setPrev(i, { counselor: v })} /><HSelect label="징계/정학" val={previousSchools[i]?.discipline} set={v => setPrev(i, { discipline: v })} options={["No", "Yes"]} /><HSelect label="비건강 사유 자퇴" val={previousSchools[i]?.withdrawal} set={v => setPrev(i, { withdrawal: v })} options={["No", "Yes"]} /></div><Text label="설명/메모" val={previousSchools[i]?.notes} set={v => setPrev(i, { notes: v })} /></div>)}</div>;
}
function InterestSchools({ st, update, schools }) {
  const interests = st.interests || [emptyInterest(), emptyInterest(), emptyInterest()];
  const edit = (i, patch) => update({ interests: interests.map((x, idx) => idx === i ? { ...x, ...patch } : x) });
  return <div className="card"><h3>관심 학교</h3>{[0, 1, 2].map(i => <div className="grid g2" key={i}><SmartSearchInput label={`관심 학교 ${i + 1}`} val={interests[i]?.school} set={v => edit(i, { school: v })} options={schools.map(s => s.name)} /><Text label="비고" val={interests[i]?.note} set={v => edit(i, { note: v })} /></div>)}</div>;
}
function BasicReport({ st, schools }) {
  const r = rubricDetailed(st);
  const interestRecs = (st.interests || []).map(x => schools.find(s => s.name === x.school)).filter(Boolean).map(s => recommendationFor(st, s));
  const strong = Object.entries(r).filter(([k, v]) => v.score / v.max >= .7).map(([k]) => reportRubricName(k)).join(", ");
  const weak = Object.entries(r).filter(([k, v]) => v.score / v.max < .6).map(([k, v]) => `${reportRubricName(k)}: ${v.gap}`).join(" / ");
  return <div className="card"><h3>1차 기초 보고서</h3><p className="small" style={{ lineHeight: 1.75 }}>현재까지 입력된 자료를 바탕으로 학생의 강점과 보완 우선순위를 정리한 초기 전략 보고서입니다. 합격을 단정하는 자료가 아니라, 어떤 근거를 더 보강해야 하는지 확인하기 위한 진단용 보고서입니다.</p><div className="rubrics">{Object.entries(r).slice(0, 4).map(([k, v]) => <Rub key={k} title={reportRubricName(k)} val={v.score} max={v.max} />)}</div><table className="table"><tbody><tr><th>주요 강점</th><td>{strong || "아직 강점으로 확정할 만큼 충분한 자료가 입력되지 않았습니다."}</td></tr><tr><th>우선 보완점</th><td>{weak || "현재 입력 자료 기준으로 큰 약점은 보이지 않습니다. 다만 학교별 에세이와 추천서 근거는 계속 보강해야 합니다."}</td></tr><tr><th>관심 학교 판정</th><td>{interestRecs.map(x => `${x.name}: ${fitLabelKo(x.tier)} (${x.fit}/100)`).join(" / ") || "관심 학교를 입력하면 해당 학교별 판정과 시험 적합도가 표시됩니다."}</td></tr></tbody></table><EnhancedReport st={st} schools={interestRecs.length ? interestRecs : schools} /></div>;
}
function strategyDraft(st, schools) {
  const recs = (st.interests || []).map(x => schools.find(s => s.name === x.school)).filter(Boolean);
  const main = st.ecs?.[0]?.name || st.profile || "학생의 현재 강점";
  return {
    hookTerritory: `${main}을 중심으로 학업, EC, 에세이, 추천서가 같은 방향을 말하도록 정리합니다.`,
    ecRoadmap: "Conservative: 현재 활동의 증빙 정리\nTarget: 대표 활동 1개를 산출물/리더십 중심 프로젝트로 확장\nStretch: 외부 검증 또는 공개 결과물을 만드는 플래그십 프로젝트 완성",
    academicPlan: "성적표와 Teacher comment에서 강점 과목을 확보하고, 약점 과목은 학기별 보완 목표와 추천서 근거를 수집합니다.",
    scenarios: "Baseline은 현재 증빙만 반영, Conservative/Target/Stretch는 완료 가능성에 따라 planned evidence를 별도로 표시합니다.",
    probabilityNotes: recs.map(s => `${s.name}: ${recommendationFor(st, s).tier}`).join("\n") || "관심 학교 입력 후 학교별 likelihood band를 생성합니다."
  };
}
function StageTwo({ st, update, schools }) {
  const p = st.stagePlans || {};
  const set = (k, v) => update({ stagePlans: { ...p, [k]: v } });
  return <div className="grid"><div className="card"><div className="right" style={{ justifyContent: "space-between" }}><h3>Boarding School Long-Term Application Strategy</h3><button className="btn primary" onClick={() => update({ stagePlans: { ...p, ...strategyDraft(st, schools) } })}>전략 초안 생성</button></div><Text label="Hook Territory" val={p.hookTerritory} set={v => set("hookTerritory", v)} /><Text label="EC Planning / Long-Term Roadmap" val={p.ecRoadmap} set={v => set("ecRoadmap", v)} /><Text label="Academic Plan" val={p.academicPlan} set={v => set("academicPlan", v)} /><Text label="Scenario Assumptions" val={p.scenarios} set={v => set("scenarios", v)} /><Text label="Likelihood / Uncertainty Notes" val={p.probabilityNotes} set={v => set("probabilityNotes", v)} /></div><CmsRoadmap st={st} update={update} /><EnhancedStrategy st={st} update={update} schools={schools} /></div>;
}
function importSchoolCalendar(st, update, schools) {
  const names = [st.school, ...(st.interests || []).map(x => x.school)].filter(Boolean);
  const events = names.flatMap(name => (schools.find(s => s.name === name)?.calendar || []).map(e => ({ ...e, title: `${name}: ${e.title}`, school: name, source: "copiedSchoolCalendar", status: "Planned" })));
  const existing = st.calendarEvents || [];
  const key = e => `${e.school || ""}|${e.date}|${e.title}`;
  const merged = [...existing];
  events.forEach(e => { if (!merged.some(x => key(x) === key(e))) merged.push(e); });
  update({ calendarEvents: merged });
}
function StageThree({ st, update, schools }) {
  const p = st.stagePlans || {};
  const set = (k, v) => update({ stagePlans: { ...p, [k]: v } });
  return <div className="grid"><div className="card"><div className="right" style={{ justifyContent: "space-between" }}><h3>관리 계획</h3><button className="btn primary" onClick={() => importSchoolCalendar(st, update, schools)}>학교 학사일정 복사</button></div><p className="small muted">복사된 일정은 이 학생 캘린더에만 저장되며, 다른 학생이나 Admin 학교 DB에는 영향을 주지 않습니다.</p><Text label="Stage 2 전략을 실행 액션으로 옮기는 관리 계획" val={p.managementPlan} set={v => set("managementPlan", v)} /><Text label="증빙 수집 계획" val={p.evidencePlan} set={v => set("evidencePlan", v)} /></div><EnhancedRoadmap st={st} update={update} schools={schools} /><StudentCalendar st={st} update={update} schools={schools} /></div>;
}
function generateTopActivities(st) {
  const ecs = [...(st.ecs || [])].sort((a, b) => Number(b.hours || 0) - Number(a.hours || 0)).slice(0, 5);
  return ecs.map((e, i) => `${i + 1}. ${e.name || "Activity"} / ${e.position || "Role TBD"} / ${e.hours || "?"} hrs/week / Impact: ${e.impact || e.leadership || "증빙 정리 필요"}`).join("\n");
}
function StageFour({ st, update, schools }) {
  const p = st.stagePlans || {};
  const set = (k, v) => update({ stagePlans: { ...p, [k]: v } });
  return <div className="grid"><div className="card"><div className="right" style={{ justifyContent: "space-between" }}><h3>원서 준비</h3><button className="btn primary" onClick={() => set("topActivities", generateTopActivities(st))}>핵심 액티비티 5개 생성</button></div><Text label="학교별 에세이 주제" val={p.essayTopics} set={v => set("essayTopics", v)} /><Text label="핵심 액티비티 5개 / 원서 기입 초안" val={p.topActivities} set={v => set("topActivities", v)} /><Text label="추천서 전략" val={p.recommendations} set={v => set("recommendations", v)} /><Text label="원서 계정 / 포털" val={p.accounts} set={v => set("accounts", v)} /></div><EnhancedStrategy st={st} update={update} schools={schools} /></div>;
}
function StageFive({ st, update }) {
  const p = st.stagePlans || {};
  const set = (k, v) => update({ stagePlans: { ...p, [k]: v } });
  const checklist = st.enrollmentChecklist || emptyChecklist(enrollmentItems);
  const edit = (i, patch) => update({ enrollmentChecklist: checklist.map((x, idx) => idx === i ? { ...x, ...patch } : x) });
  return <div className="grid"><div className="card"><h3>입학 준비</h3><div className="grid g2"><Input label="최종 입학 학교" val={p.enrollmentSchool} set={v => set("enrollmentSchool", v)} /><Text label="비자" val={p.visa} set={v => set("visa", v)} /><Text label="수강신청" val={p.courseRegistration} set={v => set("courseRegistration", v)} /><Text label="보험/건강서류" val={p.insurance} set={v => set("insurance", v)} /><Text label="기숙사/도착 준비" val={p.arrival} set={v => set("arrival", v)} /></div></div><div className="card"><h3>입학 체크리스트</h3><table className="table"><tbody>{checklist.map((x, i) => <tr key={i}><td><input type="checkbox" checked={x.done} onChange={e => edit(i, { done: e.target.checked })} /></td><td>{x.text}</td><td><input className="input" value={x.note || ""} onChange={e => edit(i, { note: e.target.value })} /></td></tr>)}</tbody></table></div></div>;
}
function StageAdmin({ data, persist, setSelected, setView }) {
  const [tab, setTab] = useState("staff");
  const staff = data.staffAccounts || [];
  const add = () => persist({ ...data, staffAccounts: [...staff, { id: "staff" + Date.now(), name: "새 담당자", role: "staff", email: "new@yesuhak.com", password: "prep2026" }] });
  const edit = (i, patch) => persist({ ...data, staffAccounts: staff.map((a, idx) => idx === i ? { ...a, ...patch } : a) });
  const updateSchools = schools => persist({ ...data, schools });
  return <div className="grid"><div className="tabs"><button className={"tab " + (tab === "staff" ? "active" : "")} onClick={() => setTab("staff")}>담당자 관리</button><button className={"tab " + (tab === "schools" ? "active" : "")} onClick={() => setTab("schools")}>학교 데이터</button><button className={"tab " + (tab === "students" ? "active" : "")} onClick={() => setTab("students")}>학생 현황</button></div>{tab === "staff" && <div className="card"><div className="right" style={{ justifyContent: "space-between" }}><h3>담당자 계정</h3><button className="btn primary" onClick={add}>담당자 추가</button></div><table className="table"><thead><tr><th>이름</th><th>Email</th><th>Password</th><th>ID</th></tr></thead><tbody>{staff.map((a, i) => <tr key={a.id}><td><input className="input" value={a.name} onChange={e => edit(i, { name: e.target.value })} /></td><td><input className="input" value={a.email} onChange={e => edit(i, { email: e.target.value })} /></td><td><input className="input" value={a.password} onChange={e => edit(i, { password: e.target.value })} /></td><td>{a.id}</td></tr>)}</tbody></table></div>}{tab === "schools" && <FinalAdmin data={data} updateSchools={updateSchools} setSelected={setSelected} setView={setView} />}{tab === "students" && <EnhancedAdmin data={data} updateSchools={updateSchools} setSelected={setSelected} setView={setView} />}</div>;
}
ReactDOM.render(<StageApp />, document.getElementById("root"));
