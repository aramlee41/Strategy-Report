const CRM=window.PrepCRM;
const CRM_STATUS=[['active','관리 중'],['paused','일시 중지'],['completed','관리 종료']];
function CRMAlertBadges({student}){const items=CRM.attention(student);return <div className="ops-inline">{items.length?items.map(a=><span key={a.key} className={'ops-tag '+(a.level>=2?'warn':'')} title={a.detail}>{a.title}</span>):<span className="ops-tag good">확인된 지연 없음</span>}</div>;}
function CRMStudentLink({student,openStudent,tab='overview',children}){return <button type="button" className="crm-text-button" onClick={()=>openStudent(student,tab)}>{children||student.name||'신규 학생'}</button>;}
function CRMContactEditor({st,user,staff,update,close}){
  const [d,setD]=useState({id:O.id(),date:O.today(),party:'학부모',channel:CRM.crm(st).preferredChannel||'전화',outcome:'연락 완료',summary:'',nextStep:'',nextDate:'',nextOwnerId:user.id,importance:3});
  const set=(key,value)=>setD({...d,[key]:value});
  return <PPDialog title="연락 기록 추가" close={close} wide><div className="ops">
    <div className="ops-grid three"><OpsField label="연락 날짜 *" type="date" value={d.date} onChange={v=>set('date',v)}/><OpsField label="연락 대상" value={d.party} options={['학생','학부모','학교','기타']} onChange={v=>set('party',v)}/><OpsField label="연락 수단" value={d.channel} options={CRM.channels} onChange={v=>set('channel',v)}/><OpsField label="연락 결과" value={d.outcome} options={['연락 완료','연락 시도','회신 대기']} onChange={v=>set('outcome',v)}/></div>
    <OpsField label="연락 내용 *" type="textarea" rows={5} value={d.summary} onChange={v=>set('summary',v)}/>
    <section className="ops-band"><h3>후속 업무</h3><OpsField label="다음에 할 일" value={d.nextStep} onChange={v=>set('nextStep',v)}/>{d.nextStep&&<div className="ops-grid three"><OpsField label="후속 기한 *" type="date" value={d.nextDate} onChange={v=>set('nextDate',v)}/><OpsField label="후속 담당자" value={d.nextOwnerId} options={staff.filter(p=>(st.owners||[]).includes(p.id)||p.id===user.id).map(p=>[p.id,p.name])} onChange={v=>set('nextOwnerId',v)}/><OpsField label="후속 중요도" value={d.importance} options={[1,2,3,4,5].map(n=>[String(n),'★'.repeat(n)])} onChange={v=>set('importance',Number(v))}/></div>}</section>
    <OpsSave run={()=>update(CRM.saveContact(st,d,user))} onDone={close}>연락 기록과 후속 업무 저장</OpsSave>
  </div></PPDialog>;
}
function CRMSettings({st,update,close}){
  const [d,setD]=useState(CRM.crm(st));const set=(k,v)=>setD({...d,[k]:v});
  return <PPDialog title="학생 관리 설정" close={close}><div className="ops"><div className="ops-grid"><OpsField label="관리 팀" emptyLabel={`프로그램 기준 (${CRM.teamOfStudent({...st,operations:{...st.operations,crm:{...d,team:''}}})||'미분류'})`} value={d.team||''} options={CRM.teams} onChange={v=>set('team',v)}/><OpsField label="CRM 관리 상태" value={d.status} options={CRM_STATUS} onChange={v=>set('status',v)}/><OpsField label="관리 우선순위" value={d.priority} options={[["standard","일반"],["high","우선 관리"]]} onChange={v=>set('priority',v)}/><OpsField label="정기 연락 주기" value={String(d.cadence)} options={[7,14,30,60].map(n=>[String(n),n+'일'])} onChange={v=>set('cadence',Number(v))}/><OpsField label="선호 연락 수단" value={d.preferredChannel} options={CRM.channels} onChange={v=>set('preferredChannel',v)}/></div>
    <fieldset><legend>관리 태그</legend><div className="crm-check-grid">{['신규 등록','원서 준비','시험 집중','EC 집중','학업 보완','방학 준비','보호자 연락 필요','인수인계'].map(tag=><OpsCheck key={tag} label={tag} value={d.tags.includes(tag)} onChange={v=>set('tags',v?[...d.tags,tag]:d.tags.filter(t=>t!==tag))}/>)}</div></fieldset>
    <OpsField label="담당자 인수인계 메모 (내부)" type="textarea" value={d.handoff} onChange={v=>set('handoff',v)}/><OpsSave run={()=>update(CRM.settings(st,{team:d.team||'',status:d.status,priority:d.priority,cadence:d.cadence,preferredChannel:d.preferredChannel,tags:d.tags,handoff:d.handoff||''}))} onDone={close}/>
  </div></PPDialog>;
}
function CRMChecklist({st,update,user,close}){
  const [type,setType]=useState('onboarding'),[date,setDate]=useState(O.today());
  return <PPDialog title="업무 체크리스트" close={close}><div className="ops"><OpsField label="체크리스트 종류" value={type} options={[["onboarding","신규 학생 등록"],["semester","학기 점검"],["application","원서 준비 점검"]]} onChange={setType}/><OpsField label="기준일" type="date" value={date} onChange={setDate}/><ul className="ops-list">{CRM.templates[type].map(([title,offset])=><li key={title}>{O.date(date)?O.addDays(date,offset):''} · {title}</li>)}</ul><OpsSave run={()=>update(CRM.checklist(st,type,date,st.owners?.[0]||user.id))} onDone={close}>업무에 추가</OpsSave></div></PPDialog>;
}
function CRMMessageDraft({st,close}){
  const [purpose,setPurpose]=useState('update'),[text,setText]=useState(''),[copied,setCopied]=useState(false);
  const make=p=>{
    const publicLatest=(st.parentPortal?.progressSnapshots||[]).find(x=>x.status==='published');
    if(p==='update')return `${st.name} 학생 학부모님, 안녕하세요.\n\n${publicLatest?.summary||'학생의 최근 준비 상황을 함께 확인하고자 연락드립니다.'}\n\n궁금하신 사항이나 상담이 필요한 내용이 있으시면 편하게 알려주세요. 감사합니다.`;
    if(p==='meeting')return `${st.name} 학생 학부모님, 안녕하세요.\n\n이번 상담에서 학생의 학업 및 활동 진행 상황과 앞으로의 계획을 함께 점검하고자 합니다. 편하신 상담 일정과 미리 논의하고 싶은 내용을 알려주시면 일정을 조율하겠습니다.\n\n감사합니다.`;
    return `${st.name} 학생 학부모님, 안녕하세요.\n\n학생 자료를 최신 상태로 확인하고자 합니다. 최근 성적표, 시험 결과 또는 활동에 변경 사항이 있다면 학부모 포털에 입력 후 제출해 주세요. 해당 자료가 없거나 준비 중인 경우에도 자료 상태를 선택해 주시면 됩니다.\n\n감사합니다.`;
  };
  React.useEffect(()=>setText(make(purpose)),[purpose]);
  return <PPDialog title="학부모 안내 초안" close={close} wide><div className="ops"><OpsField label="안내 목적" value={purpose} options={[["update","진행상황 안내"],["meeting","상담 일정 조율"],["materials","학생 자료 요청"]]} onChange={v=>{setPurpose(v);setCopied(false);}}/><OpsField label="안내 문구" type="textarea" rows={10} value={text} onChange={setText}/><OpsSave run={async()=>{await navigator.clipboard.writeText(text);setCopied(true);}}>안내 문구 복사</OpsSave>{copied&&<p role="status">복사했습니다. 발송 전 내용을 확인해 주세요.</p>}</div></PPDialog>;
}
function CRMStudent({st,update,user,staff}){
  const [modal,setModal]=useState(''),[filter,setFilter]=useState('all'),[search,setSearch]=useState('');const c=CRM.crm(st),last=CRM.lastContact(st);
  const entries=CRM.timeline(st).filter(e=>(filter==='all'||e.kind===filter)&&`${e.title} ${e.detail||''}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="ops"><div className="ops-toolbar"><h2>연락 / 관리 이력</h2><OpsButton icon="Phone" onClick={()=>setModal('contact')}>연락 기록</OpsButton><OpsButton icon="ListChecks" onClick={()=>setModal('checklist')}>체크리스트</OpsButton><OpsButton icon="MessageSquare" onClick={()=>setModal('message')}>안내 초안</OpsButton><OpsButton icon="Settings2" onClick={()=>setModal('settings')}>관리 설정</OpsButton></div>
    <div className="crm-summary"><span className="ops-tag">{CRM_STATUS.find(x=>x[0]===c.status)?.[1]}</span><span>최근 연락 {last||'기록 없음'}</span><span>연락 주기 {c.cadence}일</span>{c.priority==='high'&&<span className="ops-tag warn">우선 관리</span>}{c.tags.map(t=><span className="ops-tag" key={t}>{t}</span>)}</div><CRMAlertBadges student={st}/>
    {c.handoff&&<section className="ops-band"><h3>인수인계 메모</h3><p className="crm-prewrap">{c.handoff}</p></section>}
    {c.contacts.some(x=>x.followupTaskId)&&<section className="ops-band"><h3>연락 후속 업무</h3>{c.contacts.filter(x=>x.followupTaskId).map(x=>{const task=O.tasks(st).find(t=>t.id===x.followupTaskId);return <div key={x.id} className="ops-log"><b>{x.nextStep}</b><p>{task?`${task.done?'완료':'진행 중'} · ${task.date}`:'연결 업무가 삭제되었습니다.'}</p></div>;})}</section>}
    <section className="ops-band"><h3>통합 이력</h3><div className="ops-grid"><OpsField label="이력 검색" value={search} onChange={setSearch}/><OpsField label="이력 종류" value={filter} options={[["all","전체"],["contact","연락"],["meeting","미팅"],["update","업무 업데이트"],["family","학부모 제출 / 공개"],["document","문서 저장본"]]} onChange={setFilter}/></div>{entries.slice(0,100).map(e=><article className="crm-timeline" key={e.id}><div><time>{e.date}</time><span className="ops-tag">{e.label}</span></div><div><b>{e.title}</b><p className="crm-prewrap">{e.detail}</p>{e.author&&<small className="ops-muted">{e.author}</small>}</div></article>)}{entries.length>100&&<p className="ops-muted">최근 100개를 표시합니다. 종류 또는 검색어로 범위를 좁혀 주세요.</p>}{!entries.length&&<OpsEmpty>해당하는 기록이 없습니다.</OpsEmpty>}</section>
    {modal==='contact'&&<CRMContactEditor st={st} user={user} staff={staff} update={update} close={()=>setModal('')}/>} {modal==='settings'&&<CRMSettings st={st} update={update} close={()=>setModal('')}/>} {modal==='checklist'&&<CRMChecklist st={st} update={update} user={user} close={()=>setModal('')}/>} {modal==='message'&&<CRMMessageDraft st={st} close={()=>setModal('')}/>}
  </div>;
}
