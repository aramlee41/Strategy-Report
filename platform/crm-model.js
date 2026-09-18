(function(root){
  const O=root.PrepOperations||(typeof require==='function'?require('./operations-model.js'):null);
  const list=O.list;
  const statuses=['active','paused','completed'];
  const channels=['전화','이메일','KakaoTalk','문자','화상 미팅','대면 미팅','기타'];
  const teams=['시니어보딩','주니어보딩','보딩프렙','대학','편입','대학원','플래티넘'];
  function teamOfStudent(st){
    if(teams.includes(st.operations?.crm?.team))return st.operations.crm.team;
    const program=String(st.program||'').replace(/\s+/g,'');
    return teams.includes(program)?program:'';
  }
  function teamMembers(students,staff,staffTeams={},team=''){
    if(!team)return staff;
    const assigned=new Set(students.filter(s=>teamOfStudent(s)===team).flatMap(s=>[...list(s.owners),...O.tasks(s).map(t=>t.ownerId).filter(Boolean)]));
    return staff.filter(p=>list(staffTeams[p.id]).includes(team)||assigned.has(p.id));
  }
  function taskForOwner(task,st,ownerId){return !ownerId||(task.ownerId?task.ownerId===ownerId:list(st.owners).includes(ownerId));}
  function dashboardScope(students,team='',ownerId=''){
    return students.filter(s=>crm(s).status!=='completed'&&(!team||teamOfStudent(s)===team)&&(!ownerId||list(s.owners).includes(ownerId)||O.tasks(s).some(t=>t.ownerId===ownerId)));
  }
  function crm(st){
    const value=st.operations?.crm||{};
    return {...value,status:statuses.includes(value.status)?value.status:'active',priority:value.priority==='high'?'high':'standard',cadence:[7,14,30,60].includes(Number(value.cadence))?Number(value.cadence):14,tags:list(value.tags),contacts:O.rows(value.contacts,'contact')};
  }
  function lastContact(st,now=O.today()){
    const c=crm(st).contacts.filter(x=>x.outcome==='연락 완료'&&O.date(x.date)&&x.date<=now).map(x=>x.date);
    const meetings=O.operations(st).meetings.filter(x=>x.appliedAt&&!x.cancelled&&O.date(x.date)&&x.date<=now).map(x=>x.date);
    return [...c,...meetings].sort().at(-1)||'';
  }
  function attention(st,now=O.today(),ownerId=''){
    const c=crm(st);if(c.status==='completed')return [];
    const out=[],tasks=O.tasks(st).filter(t=>!t.done&&taskForOwner(t,st,ownerId)),late=tasks.filter(t=>O.date(t.date)&&t.date<now);
    if(late.length)out.push({key:'overdue',level:3,title:`지연 업무 ${late.length}건`,detail:`가장 이른 기한 ${late.map(t=>t.date).sort()[0]}`,tab:'overview'});
    const submissions=list(st.parentPortal?.submissions).filter(s=>s.status==='submitted');
    if(submissions.length)out.push({key:'submissions',level:2,title:`학부모 자료 검토 ${submissions.length}건`,detail:'학부모가 제출한 자료를 검토해 주세요.',tab:'familyReview'});
    const requests=list(st.parentPortal?.requests),replies=requests.filter(r=>r.status==='submitted'),lateRequests=requests.filter(r=>['requested','returned'].includes(r.status)&&O.date(r.dueDate)&&r.dueDate<now);
    if(replies.length)out.push({key:'requestReview',level:2,title:`요청 자료 회신 검토 ${replies.length}건`,detail:replies.map(r=>r.title).join(', '),tab:'requests'});
    if(lateRequests.length)out.push({key:'requestOverdue',level:2,title:`요청 자료 기한 경과 ${lateRequests.length}건`,detail:lateRequests.map(r=>r.title).join(', '),tab:'requests'});
    if(c.status==='active'){
      const last=lastContact(st,now),age=last?-O.days(last,now):null;
      if(age!=null&&age>=c.cadence)out.push({key:'contact',level:2,title:`최근 연락 후 ${age}일`,detail:`설정한 연락 주기 ${c.cadence}일`,tab:'crm'});
      if(!last)out.push({key:'contactMissing',level:1,title:'연락 기록 없음',detail:'완료된 연락 또는 미팅 기록이 없습니다.',tab:'crm'});
      const end=O.days(st.programEndDate,now);
      if(end!=null&&end<=30)out.push({key:'programEnd',level:end<0?2:1,title:end<0?'프로그램 종료일 경과':`프로그램 종료 D-${end}`,detail:st.programEndDate,tab:'crm'});
      const unknown=list(st.applications).filter(a=>a.school&&!O.date(a.deadline)&&!['Submitted','Accepted','Denied','Withdrawn'].includes(a.status));
      if(unknown.length)out.push({key:'applicationDate',level:2,title:`원서 마감 미확인 ${unknown.length}개교`,detail:unknown.map(a=>a.school).join(', '),tab:'applications'});
    }
    const due=tasks.filter(t=>O.date(t.date)&&O.days(t.date,now)>=0&&O.days(t.date,now)<=3);
    if(due.length)out.push({key:'soon',level:2,title:`3일 내 마감 ${due.length}건`,detail:due.slice(0,2).map(t=>t.title).join(', '),tab:'overview'});
    return out.sort((a,b)=>b.level-a.level);
  }
  function saveContact(st,contact,actor,now=new Date().toISOString()){
    if(!contact.summary?.trim()||!O.date(contact.date))throw Error('연락 날짜와 내용을 입력해 주세요.');
    const local=new Date(now),localDay=`${local.getFullYear()}-${String(local.getMonth()+1).padStart(2,'0')}-${String(local.getDate()).padStart(2,'0')}`;
    if(contact.date>localDay)throw Error('미래 연락은 일정이나 후속 업무로 등록해 주세요.');
    if(!channels.includes(contact.channel)||!['학생','학부모','학교','기타'].includes(contact.party)||!['연락 완료','연락 시도','회신 대기'].includes(contact.outcome))throw Error('연락 대상·수단·결과를 선택해 주세요.');
    const c=crm(st),id=contact.id||O.id();
    if(c.contacts.some(x=>x.id===id))throw Error('이미 저장한 연락입니다. 정정 내용은 새 기록으로 남겨 주세요.');
    const row={...contact,id,summary:contact.summary.trim(),createdAt:now,authorId:actor.id,authorName:actor.name};
    const tasks=O.rows(st.tasks,'tasks');
    if(contact.nextStep?.trim()){
      if(!O.date(contact.nextDate))throw Error('후속 업무의 기한을 입력해 주세요.');
      tasks.push({id:'crm-followup-'+id,title:contact.nextStep.trim(),deadline:contact.nextDate,ownerId:contact.nextOwnerId||actor.id,importance:Number(contact.importance)||3,done:false,contactId:id,shareWithFamily:false,createdAt:now});
      row.followupTaskId='crm-followup-'+id;
    }else if(contact.nextDate)throw Error('후속 업무 내용을 입력해 주세요.');
    return {...st,tasks,operations:{...O.recordUpdate(st,'연락 기록',`${contact.party} · ${contact.channel}`,now),crm:{...c,contacts:[row,...c.contacts]}}};
  }
  function settings(st,patch){
    const c=crm(st),next={...c,...patch};
    if(!statuses.includes(next.status)||![7,14,30,60].includes(Number(next.cadence)))throw Error('관리 상태와 연락 주기를 확인해 주세요.');
    next.tags=[...new Set(list(next.tags).map(x=>String(x).trim()).filter(Boolean))].slice(0,12);
    return {operations:{...O.recordUpdate(st,'CRM 관리 설정 변경',next.status),crm:next}};
  }
  function timeline(st){
    const o=O.operations(st);
    return [
      ...crm(st).contacts.map(x=>({id:'contact:'+x.id,date:x.date,at:x.createdAt,kind:'contact',label:'연락',title:`${x.party} · ${x.channel} · ${x.outcome}`,detail:x.summary,author:x.authorName})),
      ...o.meetings.map(x=>({id:'meeting:'+x.id,date:x.date,at:x.appliedAt||x.date,kind:'meeting',label:'미팅',title:x.title,detail:x.agenda,author:''})),
      ...o.updates.map(x=>({id:'update:'+x.id,date:x.at?.slice(0,10),at:x.at,kind:'update',label:'업무',title:x.title,detail:x.detail})),
      ...list(st.parentPortal?.submissions).map(x=>({id:'submission:'+x.id,date:x.submittedAt?.slice(0,10),at:x.submittedAt,kind:'family',label:'학부모',title:'학부모 자료 제출',detail:{submitted:'검토 대기',accepted:'반영 완료',returned:'보완 요청'}[x.status]||x.status})),
      ...list(st.parentPortal?.progressSnapshots).map(x=>({id:'progress:'+x.id,date:x.publishedAt?.slice(0,10),at:x.publishedAt,kind:'family',label:'공개',title:x.status==='revoked'?'진행상황 공개 취소':'진행상황 공개',detail:x.summary,author:x.authorName})),
      ...list(st.parentPortal?.requests).map(x=>({id:'request:'+x.id,date:x.createdAt?.slice(0,10),at:x.createdAt,kind:'family',label:'자료 요청',title:x.title,detail:`기한 ${x.dueDate}`,author:x.authorName})),
      ...o.resumeVersions.map(x=>({id:'resume:'+x.id,date:x.createdAt?.slice(0,10),at:x.createdAt,kind:'document',label:'문서',title:'Resume 버전 저장',detail:x.type,author:x.authorName}))
    ].filter(x=>O.date(x.date)).sort((a,b)=>b.date.localeCompare(a.date)||String(b.at).localeCompare(String(a.at)));
  }
  function filterStudents(students,f={},now=O.today()){
    const search=String(f.search||'').trim().toLocaleLowerCase();
    return students.filter(s=>{
      const c=crm(s),alerts=attention(s,now);
      return (!search||[s.name,s.en,s.school,s.program,...c.tags].join(' ').toLocaleLowerCase().includes(search))&&(!f.owner||list(s.owners).includes(f.owner))&&(!f.program||s.program===f.program)&&(!f.stage||s.stage===f.stage)&&(!f.status||c.status===f.status)&&(!f.priority||c.priority===f.priority)&&(!f.attention||alerts.some(a=>f.attention==='any'||a.key===f.attention))&&(!f.tag||c.tags.includes(f.tag));
    }).sort((a,b)=>{
      if(f.sort==='name')return (a.name||'').localeCompare(b.name||'');
      if(f.sort==='end')return (a.programEndDate||'9999').localeCompare(b.programEndDate||'9999');
      return Math.max(0,...attention(b,now).map(x=>x.level))-Math.max(0,...attention(a,now).map(x=>x.level))||Number(crm(b).priority==='high')-Number(crm(a).priority==='high')||(a.name||'').localeCompare(b.name||'');
    });
  }
  function batchTasks(students,ids,draft,actor,batchId=O.id()){
    if(!ids.length||ids.length>100)throw Error('1~100명의 학생을 선택해 주세요.');
    if(!draft.title?.trim()||!O.date(draft.date))throw Error('업무와 기한을 입력해 주세요.');
    const set=new Set(ids);if(students.filter(s=>set.has(s.id)).length!==set.size)throw Error('선택 학생을 다시 확인해 주세요.');
    return students.map(s=>{
      if(!set.has(s.id))return s;
      const id=`crm-batch-${batchId}-${s.id}`;
      if(list(s.tasks).some(t=>t.id===id))return s;
      const ownerId=draft.ownerMode==='primary'?s.owners?.[0]:draft.ownerId||actor.id;
      return {...s,tasks:[...list(s.tasks),{id,title:draft.title.trim(),deadline:draft.date,ownerId:ownerId||actor.id,importance:Number(draft.importance)||3,done:false,createdAt:new Date().toISOString(),batchId,notes:draft.notes||'',shareWithFamily:false}],operations:O.recordUpdate(s,'일괄 업무 등록',draft.title)};
    });
  }
  function handoffTasks(st,owners){
    const removed=list(st.owners).filter(id=>!owners.includes(id));
    return O.tasks(st).filter(t=>!t.done&&t.ownerId&&removed.includes(t.ownerId));
  }
  function reassignOwners(st,owners,transferTasks,actor){
    if(actor.role!=='admin')throw Error('담당자 변경은 관리자만 가능합니다.');
    const ids=[...new Set(list(owners).filter(Boolean))];
    if(!ids.length)throw Error('새 담당자를 선택해 주세요.');
    let next={...st,owners:ids,owner:ids[0]};
    const tasks=transferTasks?handoffTasks(st,ids):[];
    for(const t of tasks)next={...next,...O.updateTask(next,{...t,ownerId:ids[0]})};
    return {...next,operations:O.recordUpdate(next,'담당자 인수인계',`${actor.name} · 미완료 업무 ${tasks.length}건 인계`)};
  }
  const templates={onboarding:[['학생 기본 자료 확인',2],['성적표·시험·활동 자료 검토',5],['초기 상담 및 목표 합의',7],['기초 보고서 검토',10]],semester:[['학기 성적·Teacher Comment 확인',0],['EC 진행 및 수상 업데이트',2],['목표 달성 현황 검토',3],['학부모 진행상황 안내',5]],application:[['학교별 공식 요건·마감 확인',0],['추천서 후보 및 요청 일정 확인',3],['에세이 소재·작성 일정 확정',5],['인터뷰 예약 및 준비 확인',7]]};
  function checklist(st,type,start=O.today(),ownerId=''){
    if(!templates[type]||!O.date(start))throw Error('체크리스트와 기준일을 확인해 주세요.');
    const stamp=type+':'+start,existing=new Set(list(st.tasks).map(t=>t.templateKey));
    const added=templates[type].map(([title,offset],i)=>({id:O.id(),title,deadline:O.addDays(start,offset),ownerId,importance:3,done:false,templateKey:stamp+':'+i})).filter(t=>!existing.has(t.templateKey));
    if(!added.length)throw Error('같은 체크리스트가 이미 등록되어 있습니다.');
    return {tasks:[...list(st.tasks),...added],operations:O.recordUpdate(st,'체크리스트 등록',type)};
  }
  function workload(students,staff,now=O.today()){
    const active=students.filter(s=>crm(s).status!=='completed'),tasks=active.flatMap(O.tasks).filter(t=>!t.done);
    return staff.map(person=>{
      const assigned=active.filter(s=>list(s.owners).includes(person.id));
      const owned=tasks.filter(t=>t.ownerId?t.ownerId===person.id:assigned.some(s=>s.id===t.studentId));
      return {person,students:assigned.length,shared:assigned.filter(s=>list(s.owners).length>1).length,tasks:owned.length,overdue:owned.filter(t=>O.date(t.date)&&t.date<now).length,week:owned.filter(t=>O.date(t.date)&&O.days(t.date,now)>=0&&O.days(t.date,now)<=7).length,attention:assigned.filter(s=>attention(s,now).some(a=>a.level>=2)).length};
    });
  }
  function duplicateCandidates(students){
    const groups=new Map();
    for(const s of students){const name=String(s.en||s.name||'').replace(/\s+/g,'').toLowerCase(),dob=s.basic?.dob;if(!name||!O.date(dob))continue;const key=name+'|'+dob;groups.set(key,[...(groups.get(key)||[]),s]);}
    return [...groups.values()].filter(g=>g.length>1);
  }
  const api={crm,channels,teams,teamOfStudent,teamMembers,taskForOwner,dashboardScope,lastContact,attention,saveContact,settings,timeline,filterStudents,batchTasks,handoffTasks,reassignOwners,checklist,templates,workload,duplicateCandidates};
  root.PrepCRM=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window==='undefined'?globalThis:window);
