const PP = window.PrepParentModel;
const ppTime = value => value ? new Date(value).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" }) : "-";
const ppStatus = { submitted: "검토 대기", returned: "보완 요청", accepted: "반영 완료" };
function PPIcon({ name, size = 20 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.lucide) return;
    const icon = window.lucide.createElement(window.lucide.icons[name] || window.lucide.icons.FileText, { width: size, height: size, "aria-hidden": "true" });
    ref.current.replaceChildren(icon);
  }, [name, size]);
  return <span ref={ref} style={{ display: "inline-flex", flexShrink: 0, width: size, height: size }} />;
}
function PPDialog({ title, children, close, wide = false }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const previous = document.activeElement;
    ref.current?.focus();
    const key = e => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      const nodes = [...ref.current.querySelectorAll('button, input, select, textarea, a[href], [tabindex="0"]')].filter(n => !n.disabled);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("keydown", key); previous?.focus(); };
  }, []);
  return <div className="portal-dialog-backdrop" onClick={e => { if (e.target === e.currentTarget) close(); }}><section ref={ref} tabIndex={-1} className="portal-dialog" style={wide ? { maxWidth: 1180 } : undefined} role="dialog" aria-modal="true" aria-label={title}><div className="portal-actions" style={{ justifyContent: "space-between" }}><h2>{title}</h2><button className="btn ghost" aria-label="닫기" onClick={close}><PPIcon name="X" /></button></div>{children}</section></div>;
}
function ppReportDocument(element) {
  const doc = new DOMParser().parseFromString(element.innerHTML, "text/html");
  doc.querySelectorAll("script,iframe,object,embed,form,button,input,link,meta,.report-actions").forEach(n => n.remove());
  doc.querySelectorAll("*").forEach(n => [...n.attributes].forEach(a => {
    if (/^on/i.test(a.name) || a.name === "srcdoc" || (["href", "src", "xlink:href", "action"].includes(a.name) && !/^(https?:|data:image\/|#)/i.test(a.value))) n.removeAttribute(a.name);
  }));
  const css = [...document.querySelectorAll("style")].map(x => x.textContent).join("\n");
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>학생 기초 보고서</title><style>' + css + '\nbody{background:white;margin:0;padding:20px}.report-actions{display:none!important}</style></head><body>' + doc.body.innerHTML + '</body></html>';
}
function PPReportViewer({ report, close }) {
  return <PPDialog title={report.title} close={close} wide><p className="portal-muted">배포일 {ppTime(report.publishedAt)} · {report.authorName}</p><iframe className="portal-report" sandbox="" title={report.title} srcDoc={report.html} /></PPDialog>;
}
function PPApplication({ student, save, schools, onDirty }) {
  const portal = student.parentPortal;
  const [draft, setDraft] = useState(() => PP.clone(portal.draft));
  const [declarations, setDeclarations] = useState(() => PP.clone(portal.declarations || {}));
  const [tab, setTab] = useState("identity");
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState("");
  const [issues, setIssues] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const setChanged = () => { setDirty(true); onDirty(true); setMessage(""); };
  const update = patch => { setDraft(s => ({ ...s, ...(typeof patch === "function" ? patch(s) : patch) })); setChanged(); };
  const normalized = v2NormalizeStudent({ ...draft, id: student.id, name: student.name });
  const allIssues = PP.requirements(draft, declarations);
  const completed = PP.sections.filter(([key]) => !allIssues.some(i => i.tab === key)).length;
  const persist = async submit => {
    setBusy(true);
    try {
      const next = submit ? PP.submit({ ...draft, parentPortal: portal }, draft, declarations) : PP.saveDraft({ ...draft, parentPortal: portal }, draft, declarations);
      await save(next, submit ? "submit" : "draft");
      setDirty(false); onDirty(false); setConfirm(false); setMessage(submit ? "제출되었습니다. 담당 컨설턴트가 확인한 후 안내드리겠습니다." : "임시저장했습니다.");
    } catch (e) { setMessage("저장하지 못했습니다. " + e.message); }
    finally { setBusy(false); }
  };
  return <div>
    <h1>{student.name} 학생 자료</h1><p className="portal-muted">작성 중에는 임시저장할 수 있습니다. 필수 정보를 확인한 후 제출해 주세요.</p>
    <div className="portal-actions"><span className="portal-tag">{completed} / 6 영역 작성 완료</span><span className="portal-muted">최근 저장 {ppTime(portal.savedAt)}</span></div>
    <progress value={completed} max={6} aria-label="자료 작성 진행률" />
    {allIssues.length > 0 && <details className="portal-notice"><summary>제출에 필요한 항목 {allIssues.length}개 확인</summary><ul className="portal-issues">{allIssues.map((i,n) => <li key={n}><button onClick={() => setTab(i.tab)}>{PP.sections.find(s => s[0] === i.tab)[1]} · {i.label}</button></li>)}</ul></details>}
    {portal.submissions[0]?.status === "returned" && <div className="portal-notice warn"><b>담당자 보완 요청</b><p>{portal.submissions[0].reviewNote}</p></div>}
    <div className="portal-section-tabs">{PP.sections.map(([key, label]) => <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label}{!allIssues.some(i => i.tab === key) ? " · 완료" : ""}</button>)}</div>
    <div key={tab}>
      {tab === "identity" && <V2Identity st={normalized} basic={normalized.basic} staff={[]} parentMode setBasic={(k, v) => update({ basic: typeof k === "object" ? { ...normalized.basic, ...k } : { ...normalized.basic, [k]: v } })} update={update} />}
      {tab === "schools" && <V2SchoolInfo st={normalized} update={update} schools={schools} />}
      {["grades", "tests", "ecs", "awards"].includes(tab) && <div className="portal-notice"><label className="label" htmlFor="pp-declaration">자료 유무 확인 *</label><select id="pp-declaration" className="select" value={declarations[tab] || ""} onChange={e => { setDeclarations({ ...declarations, [tab]: e.target.value }); setChanged(); }}><option value="">선택해 주세요</option><option value="provided">입력할 자료가 있습니다</option><option value="none">해당 내역이 없습니다</option><option value="pending">자료를 준비 중입니다</option></select>{declarations[tab] === "pending" && <V2Field label="자료 준비 예정일 *" type="date" val={declarations[tab + "Due"]} set={v => { setDeclarations({ ...declarations, [tab + "Due"]: v }); setChanged(); }} />}</div>}
      {(!declarations[tab] || declarations[tab] === "provided") && <>
        {tab === "grades" && <V2TranscriptWithScale st={normalized} update={update} schools={schools} />}
        {tab === "tests" && <V2Tests st={normalized} update={update} />}
        {tab === "ecs" && <V2Ecs st={normalized} update={update} />}
        {tab === "awards" && <V2Section title="수상내역 / Honors"><V2AwardEditor awards={normalized.awards} setAwards={awards => update({ awards })} /></V2Section>}
      </>}
    </div>
    <div className="portal-savebar"><span role="status">{message || (dirty ? "저장하지 않은 변경사항이 있습니다." : "필수 정보를 입력한 후 제출할 수 있습니다.")}</span><div className="portal-actions"><button className="btn ghost" disabled={busy} onClick={() => persist(false)}>임시저장</button><button className="btn primary" disabled={busy} onClick={() => allIssues.length ? setIssues(allIssues) : setConfirm(true)}>제출하기</button></div></div>
    {issues && <PPDialog title="제출 전 확인해 주세요" close={() => setIssues(null)}><p>아래 항목을 입력해야 제출할 수 있습니다. 임시저장은 언제든 가능합니다.</p><ul className="portal-issues">{issues.map((i, n) => <li key={n}><button onClick={() => { setTab(i.tab); setIssues(null); window.scrollTo(0, 0); }}>{PP.sections.find(s => s[0] === i.tab)[1]} · {i.label}</button></li>)}</ul><button className="btn primary" onClick={() => setIssues(null)}>계속 작성</button></PPDialog>}
    {confirm && <PPDialog title="학생 자료를 제출하시겠습니까?" close={() => setConfirm(false)}><p>현재 작성한 자료가 담당 컨설턴트에게 전달됩니다. 제출 후에도 추가 자료를 작성해 다시 제출할 수 있습니다.</p><button className="btn primary" disabled={busy} onClick={() => persist(true)}>{busy ? "제출 중…" : "확인 후 제출"}</button></PPDialog>}
  </div>;
}
function PPParentPortal({ students, saveStudent, schools = [], preview = false, exit }) {
  const [view, setView] = useState("dashboard");
  const [selected, setSelected] = useState(students[0]?.id);
  const [dirty, setDirty] = useState(false);
  const [report, setReport] = useState(null);
  const [readAt, setReadAt] = useState("");
  const child = students.find(s => s.id === selected) || students[0];
  const publications = students.flatMap(s => s.parentPortal.publications.filter(r => r.status === "published").map(r => ({ ...r, studentName: s.name }))).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const payments = students.flatMap(s => s.parentPortal.payments.map(p => ({ ...p, studentName: s.name })));
  const updates = students.flatMap(s => s.parentPortal.updates.map(u => ({ ...u, studentName: s.name }))).sort((a, b) => b.at.localeCompare(a.at));
  const unread = updates.filter(u => !readAt || u.at > readAt).length;
  const navigate = (target, id = selected) => { if (dirty && !window.confirm("저장하지 않은 내용이 있습니다. 이동하시겠습니까?")) return; setDirty(false); setSelected(id); setView(target); };
  React.useEffect(() => { const handler = e => { if (dirty) { e.preventDefault(); e.returnValue = ""; } }; window.addEventListener("beforeunload", handler); return () => window.removeEventListener("beforeunload", handler); }, [dirty]);
  const menus = [["dashboard", "대시보드", "LayoutDashboard"], ["application", "학생 자료 입력", "ClipboardList"], ["reports", "공개 보고서", "FileChartColumn"], ["payments", "입금 안내", "CalendarDays"], ["account", "내 정보", "UserRound"]];
  return <div className="portal-shell">{preview && <div className="portal-preview"><span>학부모 화면 미리보기 · 이 브라우저의 자료로 확인 중입니다.</span><button className="btn ghost" onClick={() => { if (!dirty || window.confirm("저장하지 않은 내용을 닫을까요?")) exit(); }}>실무자 화면으로 돌아가기</button></div>}
    <header className="portal-header"><div className="portal-brand"><PPIcon name="GraduationCap" size={36} /><div><strong>예스유학 · Family Portal</strong><small>학생의 준비 과정을 함께 확인합니다</small></div></div><div className="portal-actions"><span>{child?.parentPortal.parentName || "학부모"}님</span>{!preview && <button className="btn ghost" onClick={exit}>로그아웃</button>}</div></header>
    <div className="portal-layout"><nav className="portal-nav" aria-label="학부모 메뉴">{menus.map(([key, label, icon]) => <button className={view === key ? "active" : ""} key={key} onClick={() => navigate(key)}><PPIcon name={icon} />{label}</button>)}</nav><main className="portal-content">
      {view === "dashboard" && <><h1>우리 아이의 준비 현황</h1><p className="portal-muted">새로운 안내와 준비할 자료를 확인해 주세요.</p><div className="portal-stats"><div>등록 자녀<strong>{students.length}명</strong><span className="portal-muted">진행 중인 프로그램</span></div><div>공개 보고서<strong>{publications.length}건</strong><span className="portal-muted">담당자가 배포한 자료</span></div><div>새로운 안내<strong>{unread}건</strong><span className="portal-muted">최근 업데이트</span></div></div><section className="portal-band"><h2>등록된 자녀</h2>{students.map(s => { const p = s.parentPortal; const n = PP.requirements(p.draft, p.declarations); const completed = PP.sections.filter(([k]) => !n.some(x => x.tab === k)).length; return <article className="portal-child" key={s.id}><div style={{ flex: 1 }}><h3>{s.name}</h3><p>{s.program || "프로그램 확인 중"} · 종료일 {s.programEndDate || "미정"}</p><span className="portal-tag">{p.submissions[0] ? ppStatus[p.submissions[0].status] : "자료 작성 중"}</span><p className="portal-muted">{completed}/6 영역 작성 완료</p><progress value={completed} max={6} aria-label={s.name + " 작성 진행률"} /></div><button className="btn primary" onClick={() => navigate("application", s.id)}>자료 입력</button></article>; })}{!students.length && <p className="portal-empty">연결된 자녀가 없습니다. 담당 컨설턴트에게 자녀 연결을 요청해 주세요.</p>}</section><section className="portal-band"><div className="portal-actions" style={{ justifyContent: "space-between" }}><h2>최근 업데이트</h2><button className="btn ghost" onClick={() => setReadAt(new Date().toISOString())}>모두 확인</button></div>{updates.slice(0, 10).map(u => <div className="portal-row" key={u.id}><div><b>{u.title}</b><p>{u.studentName} · {u.detail}</p></div><time className="portal-muted">{ppTime(u.at)}</time></div>)}{!updates.length && <p className="portal-empty">아직 새로운 안내가 없습니다.</p>}</section><section className="portal-band"><h2>다가오는 입금 예정일</h2><PPPayments payments={payments.filter(p => p.status !== "paid").sort((a,b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999"))} /></section></>}
      {view === "application" && <>{students.length > 1 && <label className="field"><span className="label">자녀 선택</span><select className="select" value={child?.id || ""} onChange={e => navigate("application", e.target.value)}>{students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>}{child ? <PPApplication key={child.id} student={child} schools={schools} onDirty={setDirty} save={(p, action) => saveStudent(child.id, p, action)} /> : <p className="portal-empty">연결된 자녀가 없습니다.</p>}</>}
      {view === "reports" && <><h1>공개 보고서</h1><p className="portal-muted">컨설턴트가 검토하고 배포한 보고서입니다.</p>{publications.map(r => <div className="portal-row" key={r.id}><div><b>{r.title}</b><p>{r.studentName} · {ppTime(r.publishedAt)}</p></div><button className="btn primary" onClick={() => setReport(r)}>보고서 열기</button></div>)}{!publications.length && <p className="portal-empty">공개된 보고서가 없습니다. 담당자가 검토 후 배포하면 이곳에서 확인하실 수 있습니다.</p>}</>}
      {view === "payments" && <><h1>입금 안내</h1><p className="portal-muted">프로그램별 입금 예정일과 확인된 입금 내역입니다.</p><PPPayments payments={payments} /></>}
      {view === "account" && child && <PPAccount key={child.id} student={child} save={saveStudent} />}
    </main></div>{report && <PPReportViewer report={report} close={() => setReport(null)} />}</div>;
}
function PPPayments({ payments }) {
  return payments.length ? <div className="portal-table-wrap"><table className="table"><thead><tr><th>학생 / 프로그램</th><th>항목</th><th>금액</th><th>예정일</th><th>입금일</th><th>상태</th></tr></thead><tbody>{payments.map(p => <tr key={p.id}><td>{p.studentName}<br />{p.program}</td><td>{p.title}</td><td>{Number(p.amount || 0).toLocaleString("ko-KR")} {p.currency || "KRW"}</td><td>{p.dueDate || "-"}</td><td>{p.paidDate || "-"}</td><td><span className={"portal-tag " + (p.status === "paid" ? "green" : "amber")}>{p.status === "paid" ? "입금 확인" : "입금 예정"}</span></td></tr>)}</tbody></table></div> : <p className="portal-empty">등록된 입금 안내가 없습니다.</p>;
}
function PPAccount({ student, save }) {
  const [name, setName] = useState(student.parentPortal.parentName || "");
  const [phone, setPhone] = useState(student.parentPortal.contactPhone || "");
  const [message, setMessage] = useState("");
  return <><h1>내 정보</h1><p className="portal-muted">연락받으실 정보를 최신 상태로 유지해 주세요.</p><div className="portal-grid"><V2Field label="보호자 성함" val={name} set={setName} /><V2Field label="연락처" type="tel" val={phone} set={setPhone} /></div><p>계정 이메일: {student.parentPortal.parentEmail || "미등록"}</p><button className="btn primary" onClick={async () => { try { await save(student.id, { ...student.parentPortal, parentName: name, contactPhone: phone }, "account"); setMessage("연락처를 저장했습니다."); } catch (e) { setMessage(e.message); } }}>저장</button><p role="status">{message}</p></>;
}
function PPManager({ data, persist, user }) {
  const students = user.role === "admin" ? data.students : data.students.filter(s => (s.owners || [s.owner]).includes(user.id));
  const [selected, setSelected] = useState(students[0]?.id);
  const [preview, setPreview] = useState(false);
  const [review, setReview] = useState(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [publish, setPublish] = useState(false);
  const [report, setReport] = useState(null);
  const reportRef = React.useRef(null);
  const st = students.find(s => s.id === selected) || students[0];
  const portal = st ? PP.normalize(st) : null;
  const update = p => persist({ ...data, students: data.students.map(s => s.id === st.id ? { ...s, parentPortal: p } : s) });
  const saveParent = (id, p, action) => {
    const original = students.find(s => s.id === id);
    if (!original || !PP.normalize(original).enabled) throw new Error("이 학생의 포털이 활성화되지 않았습니다.");
    persist({ ...data, students: data.students.map(s => s.id === id ? { ...s, parentPortal: p } : s) });
  };
  if (!st) return <V2Section title="학부모 포털 관리">담당 학생을 먼저 등록해 주세요.</V2Section>;
  if (preview) {
    const family = students.filter(s => PP.normalize(s).enabled && (portal.parentEmail ? PP.normalize(s).parentEmail.toLowerCase() === portal.parentEmail.toLowerCase() : s.id === st.id)).map(PP.publicStudent);
    return <div style={{ position: "fixed", inset: 0, overflow: "auto", zIndex: 90 }}><PPParentPortal students={family} saveStudent={saveParent} schools={data.schools} preview exit={() => setPreview(false)} /></div>;
  }
  const finishReview = accepted => {
    if (!accepted && !note.trim()) { setMessage("보완 요청 사유를 작성해 주세요."); return; }
    const now = new Date().toISOString();
    let profile = {};
    if (accepted) {
      const merged = PP.mergeSubmission(st, review);
      if (merged.conflicts.length) { setMessage("제출 이후 담당자가 수정한 항목과 충돌합니다: " + merged.conflicts.join(", ") + ". 자료를 확인한 후 보완 요청해 주세요."); return; }
      profile = merged.profile;
      Object.assign(profile, v2NamePatch(profile.basic || st.basic));
    }
    const draftMatchesSubmission = JSON.stringify(portal.draft) === JSON.stringify(review.profile);
    const p = { ...portal, ...(accepted && draftMatchesSubmission ? { draft: PP.pickProfile({ ...st, ...profile }), draftBase: PP.pickProfile({ ...st, ...profile }) } : {}), submissions: portal.submissions.map(s => s.id === review.id ? { ...s, status: accepted ? "accepted" : "returned", reviewedAt: now, reviewedBy: user.id, reviewNote: note } : s), updates: [{ id: "review-" + now, at: now, title: accepted ? "제출 자료 확인 완료" : "학생 자료 보완 요청", detail: accepted ? "제출하신 자료를 학생 정보에 반영했습니다." : note }, ...portal.updates] };
    persist({ ...data, students: data.students.map(s => s.id === st.id ? { ...s, ...profile, parentPortal: p } : s) }); setReview(null); setMessage(accepted ? "기존 Stage 1 학생 정보에 반영했습니다." : "보완 요청을 등록했습니다.");
  };
  const release = () => {
    if (!reportRef.current?.querySelector(".report")) { setMessage("보고서가 아직 준비되지 않았습니다."); return; }
    const now = new Date().toISOString();
    const p = { id: "report-" + now, title: `${st.name} 학생 기초 보고서`, status: "published", publishedAt: now, authorId: user.id, authorName: user.name, dataVersion: V2_DATA_MODEL_VERSION, html: ppReportDocument(reportRef.current) };
    update({ ...portal, publications: [p, ...portal.publications], updates: [{ id: p.id, at: now, title: "새 기초 보고서가 공개되었습니다", detail: p.title }, ...portal.updates] }); setPublish(false); setMessage("현재 보고서를 학부모에게 배포했습니다.");
  };
  return <div className="portal-manager"><h2>학부모 포털 관리</h2><p className="portal-muted">학생 자료 제출을 검토하고, 학부모에게 공개할 보고서와 입금 안내를 관리합니다.</p><div className="portal-notice warn">현재는 같은 브라우저에서 확인하는 미리보기입니다. 외부 학부모 로그인과 기기 간 공유는 공용 데이터베이스 연결 후 활성화됩니다.</div><label className="field"><span className="label">학생 선택</span><select className="select" value={st.id} onChange={e => { setSelected(e.target.value); setMessage(""); }}>{students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
    <fieldset><legend>{st.name} · 학부모 연결</legend><div className="grid g3"><V2Field label="학부모 성함" val={portal.parentName} set={v => update({ ...portal, parentName: v })} /><V2Field label="학부모 이메일" type="email" val={portal.parentEmail} set={v => update({ ...portal, parentEmail: v })} /><V2Field label="연락처" type="tel" val={portal.contactPhone} set={v => update({ ...portal, contactPhone: v })} /></div><div className="portal-actions"><label><input type="checkbox" checked={portal.enabled} onChange={e => update({ ...portal, enabled: e.target.checked })} /> 학부모 포털 사용</label><button className="btn ghost" disabled={!portal.enabled} onClick={() => setPreview(true)}>학부모 화면 미리보기</button></div></fieldset>
    <section className="portal-band"><h2>제출 자료 검토</h2>{portal.submissions.map(s => <div className="portal-row" key={s.id}><div><span className="portal-tag">{ppStatus[s.status]}</span><p>{ppTime(s.submittedAt)}</p></div><button className="btn ghost" onClick={() => { setReview(s); setNote(s.reviewNote || ""); setMessage(""); }}>제출 자료 확인</button></div>)}{!portal.submissions.length && <p className="portal-empty">학부모가 제출한 자료가 없습니다. 임시저장 자료는 제출 전까지 학생 원자료에 반영되지 않습니다.</p>}</section>
    <section className="portal-band"><div className="portal-actions" style={{ justifyContent: "space-between" }}><h2>기초 보고서 배포</h2><button className="btn primary" disabled={!portal.enabled} onClick={() => setPublish(true)}>현재 보고서 검토 / 배포</button></div>{portal.publications.map(r => <div className="portal-row" key={r.id}><div><b>{r.title}</b><p>{ppTime(r.publishedAt)} · {r.authorName} · {r.status === "published" ? "공개 중" : "배포 취소"}</p></div><div className="portal-actions"><button className="btn ghost" onClick={() => setReport(r)}>저장본 보기</button>{r.status === "published" && <button className="btn ghost" onClick={() => { if (window.confirm("이 보고서의 학부모 공개를 취소할까요?")) update({ ...portal, publications: portal.publications.map(x => x.id === r.id ? { ...x, status: "revoked", revokedAt: new Date().toISOString() } : x) }); }}>공개 취소</button>}</div></div>)}</section>
    <PPPaymentManager key={st.id} student={st} portal={portal} update={update} /><p role="status">{message}</p>
    {review && <PPDialog title="제출 자료 검토" close={() => setReview(null)}><p>{ppTime(review.submittedAt)} · {ppStatus[review.status]}</p><PPSubmissionSummary profile={review.profile} declarations={review.declarations} /><label className="label" htmlFor="pp-review-note">검토 메모 / 보완 요청 사유</label><textarea id="pp-review-note" className="portal-textarea" value={note} onChange={e => setNote(e.target.value)} /><p role="status">{message}</p>{review.status === "submitted" && <div className="portal-actions"><button className="btn primary" onClick={() => finishReview(true)}>학생 정보에 반영</button><button className="btn ghost" onClick={() => finishReview(false)}>보완 요청</button></div>}</PPDialog>}
    {publish && <PPDialog title="학부모 배포 전 검토" close={() => setPublish(false)} wide><p>아래 보고서를 확인하고 승인하면 학부모 포털에 공개됩니다. 배포한 저장본은 이후 학생 정보를 변경해도 그대로 유지됩니다.</p><div ref={reportRef}><V2ClientStrategyReport st={{ ...st, academics: v2AcademicSummary(st) }} schools={data.schools} /></div><button className="btn primary" onClick={release}>검토 완료 · 배포 승인</button></PPDialog>}
    {report && <PPReportViewer report={report} close={() => setReport(null)} />}
  </div>;
}
function PPSubmissionSummary({ profile, declarations }) {
  const labels = { basic: "기본 정보", school: "현재 학교", currentSchoolInfo: "현재 학교 상세", currentGrade: "현재 학년", grade: "학년", previousSchools: "이전 학교", academicTerms: "성적표", tests: "시험", ecs: "EC 활동", awards: "수상내역" };
  const render = value => {
    if (value === null || value === undefined || value === "") return <span className="portal-muted">미입력</span>;
    if (typeof value !== "object") return String(value);
    if (Array.isArray(value)) return value.length ? <ol>{value.map((v, i) => <li key={i}>{render(v)}</li>)}</ol> : "없음";
    return <dl>{Object.entries(value).filter(([k]) => !["normalizedGrade", "gradingScale", "termId", "activityId"].includes(k)).map(([k,v]) => <div key={k}><dt style={{ fontWeight: 700 }}>{labels[k] || k}</dt><dd style={{ marginLeft: 12, overflowWrap: "anywhere" }}>{render(v)}</dd></div>)}</dl>;
  };
  return <div>{Object.entries(profile).map(([k,v]) => <details key={k}><summary style={{ padding: 12, cursor: "pointer" }}>{labels[k] || k}</summary>{render(v)}</details>)}<p className="portal-muted">자료 상태: {Object.entries(declarations || {}).map(([k,v]) => `${k}: ${v}`).join(" · ")}</p></div>;
}
function PPPaymentManager({ student, portal, update }) {
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const empty = () => ({ id: crypto.randomUUID(), program: student.program || "", title: "", amount: "", currency: "KRW", dueDate: "", paidDate: "", status: "planned" });
  const save = () => {
    if (!editing.title || !editing.dueDate || !(Number(editing.amount) > 0) || (editing.status === "paid" && !editing.paidDate)) { setError("항목, 금액, 예정일과 입금 확인 시 입금일을 입력해 주세요."); return; }
    const now = new Date().toISOString();
    update({ ...portal, payments: [...portal.payments.filter(p => p.id !== editing.id), { ...editing, updatedAt: now }], updates: [{ id: "payment-" + now, at: now, title: "입금 안내가 업데이트되었습니다", detail: `${editing.title} · ${editing.dueDate}` }, ...portal.updates] }); setEditing(null);
  };
  return <section className="portal-band"><div className="portal-actions" style={{ justifyContent: "space-between" }}><h2>입금 안내</h2><button className="btn ghost" onClick={() => { setEditing(empty()); setError(""); }}>입금 일정 추가</button></div><PPPayments payments={portal.payments.map(p => ({ ...p, studentName: student.name }))} />{portal.payments.map(p => <div className="portal-actions" key={p.id} style={{ marginTop: 8 }}><span>{p.title}</span><button className="btn ghost" onClick={() => { setEditing({ ...p }); setError(""); }}>수정</button><button className="btn ghost" onClick={() => { if (window.confirm("입금 안내를 삭제할까요?")) update({ ...portal, payments: portal.payments.filter(x => x.id !== p.id) }); }}>삭제</button></div>)}{editing && <PPDialog title="입금 안내 등록" close={() => setEditing(null)}><div className="portal-grid"><V2Field label="프로그램" val={editing.program} set={v => setEditing({ ...editing, program: v })} /><V2Field label="항목 *" val={editing.title} set={v => setEditing({ ...editing, title: v })} /><V2Field label="금액 *" type="number" val={editing.amount} set={v => setEditing({ ...editing, amount: v })} /><V2Select label="통화" val={editing.currency} set={v => setEditing({ ...editing, currency: v })} options={["KRW", "USD"]} /><V2Field label="입금 예정일 *" type="date" val={editing.dueDate} set={v => setEditing({ ...editing, dueDate: v })} /><label className="field"><span className="label">상태</span><select className="select" value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })}><option value="planned">입금 예정</option><option value="paid">입금 확인</option></select></label>{editing.status === "paid" && <V2Field label="입금일 *" type="date" val={editing.paidDate} set={v => setEditing({ ...editing, paidDate: v })} />}</div><p role="alert">{error}</p><button className="btn primary" onClick={save}>저장 / 안내 반영</button></PPDialog>}</section>;
}
function PPEntry() {
  if (new URLSearchParams(location.search).get("portal") !== "parent") return <V2App />;
  return <div className="portal-shell"><header className="portal-header"><div className="portal-brand"><PPIcon name="GraduationCap" size={36} /><strong>예스유학 · Family Portal</strong></div></header><main className="portal-login"><h1>학부모 포털</h1><p className="portal-muted">외부 계정 연결을 준비하고 있습니다. 담당 컨설턴트의 초대 안내를 받은 후 로그인해 주세요.</p><div className="portal-notice">현재는 외부 로그인이 활성화되지 않았습니다.</div><a href="index.html">실무자 LMS로 이동</a></main></div>;
}
ReactDOM.render(<PPEntry />, document.getElementById("root"));
