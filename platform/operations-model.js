(function(root){
  const clone=x=>JSON.parse(JSON.stringify(x));
  const list=x=>Array.isArray(x)?x:[];
  const id=()=>globalThis.crypto.randomUUID();
  const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const date=x=>{const s=String(x||'');return /^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s?s:'';};
  const addDays=(day,n)=>{const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
  const days=(day,now=today())=>date(day)?Math.round((Date.parse(day)-Date.parse(now))/86400000):null;
  const number=x=>x!==''&&x!=null&&Number.isFinite(Number(x))?Number(x):null;
  const rows=(values,prefix)=>list(values).map((x,i)=>({...x,id:x.id||x.activityId||x.termId||`${prefix}-${i}`}));
  function operations(st){const o=st.operations||{};return {...o,version:1,meetings:rows(o.meetings,'meeting'),goals:rows(o.goals,'goal'),breakPlans:rows(o.breakPlans,'break'),resumeVersions:list(o.resumeVersions),plannedActivities:rows(o.plannedActivities,'planned'),updates:list(o.updates)};}
  function workspace(w={}){return {...w,events:rows(w.events,'personal-event'),tasks:rows(w.tasks,'personal-task'),subscriptions:{schoolIds:[],staffIds:[],team:true,marketing:false,...w.subscriptions},readAt:w.readAt||''};}
  function tasks(st){
    const manual=['actionPlans','tasks'].flatMap(key=>rows(st[key],key).map(t=>({...t,key,title:t.title||t.text||t.task||'',date:t.deadline||t.due||t.date||'',done:t.done===true||t.status==='완료'})));
    const goals=operations(st).goals.flatMap(g=>rows(g.milestones,'milestone').map(m=>({...m,key:'goalMilestone',goalId:g.id,title:m.title,context:g.title,date:m.date,importance:m.importance||g.importance||3,ownerId:m.ownerId||g.ownerId,shareWithFamily:m.shareWithFamily??g.shareWithFamily})));
    const applications=rows(st.applications,'application').flatMap(a=>[
      ...(a.school&&a.deadline?[{id:a.id,key:'applicationDeadline',applicationId:a.id,title:`${a.school} 원서 제출`,date:a.deadline,done:/submitted|accepted|waitlisted|denied|withdrawn|제출|합격|불합격/i.test(a.status||''),statusLocked:/accepted|waitlisted|denied|withdrawn|합격|불합격|대기|철회/i.test(a.status||''),importance:5}]:[]),
      ...rows(a.requirements,'requirement').map(r=>({...r,key:'applicationRequirement',applicationId:a.id,title:r.title,context:a.school,date:r.deadline||a.deadline||'',done:r.status==='완료',importance:r.importance||4}))
    ]);
    return [...manual,...goals,...applications].filter(t=>t.title).map(t=>({...t,uid:`${st.id}:${t.key}:${t.applicationId||t.goalId||''}:${t.id}`,studentId:st.id,studentName:st.name}));
  }
  function updateTask(st,t,remove=false){
    if(t.key==='goalMilestone')return {operations:{...operations(st),goals:operations(st).goals.map(g=>g.id!==t.goalId?g:{...g,milestones:rows(g.milestones,'milestone').flatMap(m=>m.id!==t.id?[m]:remove?[]:[{...m,title:t.title,date:t.date,done:!!t.done,notes:t.notes,ownerId:t.ownerId,importance:t.importance,shareWithFamily:t.shareWithFamily}])})}};
    if(t.key==='applicationRequirement')return {applications:rows(st.applications,'application').map(a=>a.id!==t.applicationId?a:{...a,requirements:rows(a.requirements,'requirement').flatMap(r=>r.id!==t.id?[r]:remove?[]:[{...r,title:t.title,deadline:t.date,status:t.done?'완료':r.status==='완료'?'진행 중':r.status,notes:t.notes,ownerId:t.ownerId,importance:t.importance,shareWithFamily:t.shareWithFamily}])})};
    if(t.key==='applicationDeadline')return {applications:rows(st.applications,'application').map(a=>a.id!==t.applicationId?a:{...a,deadline:t.date,status:/accepted|waitlisted|denied|withdrawn|합격|불합격|대기|철회/i.test(a.status||'')?a.status:t.done?'Submitted':/submitted|제출/i.test(a.status)?'In Progress':a.status})};
    const key=t.key==='actionPlans'?'actionPlans':'tasks',items=rows(st[key],key),row={...t,title:t.title,text:t.title,deadline:t.date,done:!!t.done,status:t.done?'완료':'진행 중'};
    return {[key]:remove?items.filter(x=>x.id!==t.id):items.some(x=>x.id===t.id)?items.map(x=>x.id===t.id?{...x,...row}:x):[...items,row]};
  }
  function routineEvents(st){
    return operations(st).goals.flatMap(g=>list(g.routines).flatMap(r=>{
      if(!date(r.from)||!date(r.to)||r.from>r.to||days(r.to,r.from)>366)return [];
      const result=[];for(let day=r.from;day<=r.to;day=addDays(day,1))if(new Date(day+'T12:00:00Z').getUTCDay()===Number(r.weekday))result.push({id:`${g.id}-${r.id}-${day}`,title:r.title||g.title,date:day,time:r.time||'',timezone:r.timezone||'',duration:r.hours,source:'routine',shareWithFamily:!!g.shareWithFamily,goalId:g.id});
      return result;
    }));
  }
  function eventRows(st){
    const o=operations(st);
    return [
      ...rows(st.calendarEvents,'calendar').map(e=>({...e,source:'student'})),
      ...tasks(st).map(t=>({...t,source:'task'})),
      ...o.meetings.filter(m=>!m.cancelled).map(m=>({...m,title:m.title||'학생 미팅',source:'meeting',done:!!m.appliedAt})),
      ...routineEvents(st),
      ...o.breakPlans.filter(b=>!b.cancelled).map(b=>({...b,date:b.from,title:`${b.type||'방학'} · ${b.title||'계획'}`,source:'break'})),
      ...list(st.parentPortal?.requests).map(r=>({id:r.id,date:r.dueDate,title:`자료 회신 · ${r.title}`,source:'material',done:['accepted','cancelled'].includes(r.status)})),
      ...rows(st.applications,'application').filter(a=>a.interviewDate).map(a=>({id:`${a.id}-interview`,date:a.interviewDate,time:a.interviewTime||'',timezone:a.interviewTimezone||'',title:`${a.school} 인터뷰`,source:'application',done:a.interviewStatus==='완료'}))
    ].filter(e=>date(e.date)).map(e=>({...e,studentId:st.id,studentName:st.name,uid:e.uid||`${st.id}:${e.source}:${e.id}`}));
  }
  function calendar(students,schools,w,shared=[],team=[]){
    const ws=workspace(w),sub=ws.subscriptions;
    const events=[...students.flatMap(eventRows),...ws.events.map(e=>({...e,uid:'personal:'+e.id,source:'personal'})),...ws.tasks.filter(t=>!t.done).map(t=>({...t,uid:'personal-task:'+t.id,source:'personalTask'}))];
    for(const s of schools.filter(s=>sub.schoolIds.includes(s.name)))for(const [i,e] of list(s.calendar).entries())events.push({...e,uid:`school:${s.name}:${i}`,title:`${s.name} · ${e.title}`,source:'school',schoolName:s.name});
    for(const e of shared)if(sub.staffIds.includes(e.ownerId))events.push({...e,uid:`staff:${e.ownerId}:${e.id}`,source:'staff'});
    for(const [i,e] of team.entries())if(e.category==='marketing'?sub.marketing:sub.team)events.push({...e,uid:'team:'+(e.id||i),source:e.category==='marketing'?'marketing':'team'});
    return events.filter(e=>date(e.date)).sort((a,b)=>a.date.localeCompare(b.date)||String(a.time||'').localeCompare(b.time||''));
  }
  function recordUpdate(st,title,detail,now=new Date().toISOString()){
    const o=operations(st);return {...o,updates:[{id:id(),title,detail,at:now},...o.updates].slice(0,300)};
  }
  function applyMeeting(st,meeting,now=new Date().toISOString()){
    if(!meeting.title?.trim()||!date(meeting.date))throw Error('미팅 제목과 날짜를 입력해 주세요.');
    const o=operations(st),mid=meeting.id||id();
    if(o.meetings.some(m=>m.id===mid&&m.appliedAt))throw Error('이미 반영된 미팅입니다. 후속 미팅으로 추가해 주세요.');
    const next=clone(st);next.ecs=rows(st.ecs,'ec');next.awards=rows(st.awards,'award');next.tasks=rows(st.tasks,'tasks');next.calendarEvents=rows(st.calendarEvents,'calendar');
    const effects=list(meeting.effects).filter(e=>e.selected!==false);
    for(const [i,e] of effects.entries()){
      const eid=e.id||`${mid}-${i}`,origin={meetingId:mid,updatedAt:now};
      if(e.kind==='ec'){
        const patch=Object.fromEntries(['name','cat','org','from','to','hours','position','level','status','activityScope','impact'].filter(k=>e[k]!==undefined&&e[k]!=='').map(k=>[k,e[k]]));
        if(!patch.name&&!e.targetId)throw Error('반영할 활동명 또는 기존 활동을 선택해 주세요.');
        if(number(patch.hours)!=null&&(number(patch.hours)<0||number(patch.hours)>168))throw Error('활동 시간은 주당 0~168시간으로 입력해 주세요.');
        if(e.targetId){const ix=next.ecs.findIndex(x=>x.id===e.targetId);if(ix<0)throw Error('연결된 활동을 찾을 수 없습니다. 다시 선택해 주세요.');next.ecs[ix]={...next.ecs[ix],...patch,...origin};}
        else next.ecs.push({id:'meeting-ec-'+eid,activityId:'meeting-ec-'+eid,status:'진행 중',...patch,...origin});
      }else if(e.kind==='task'){
        if(!e.title?.trim())throw Error('할 일의 제목을 입력해 주세요.');
        next.tasks.push({id:'meeting-task-'+eid,title:e.title,deadline:date(e.date),done:!!e.done,importance:Number(e.importance)||3,ownerId:e.ownerId||'',responsibleName:e.responsibleName||'',url:e.url||'',...origin});
      }else if(e.kind==='event'){
        if(!e.title?.trim()||!date(e.date))throw Error('일정의 제목과 날짜를 입력해 주세요.');
        next.calendarEvents.push({id:'meeting-event-'+eid,title:e.title,date:e.date,time:e.time||'',type:'Meeting action',...origin});
      }else if(e.kind==='award'){
        if(!e.awardName?.trim()||!/^\d{4}-(0[1-9]|1[0-2])$/.test(e.date||''))throw Error('수상명과 수상 연월을 입력해 주세요.');
        next.awards.push({id:'meeting-award-'+eid,awardName:e.awardName,competition:e.competition||'',level:e.level||'School',date:e.date,...origin});
      }
    }
    next.operations={...recordUpdate(st,'미팅 기록 반영',meeting.title,now),meetings:[{...meeting,id:mid,effects,appliedAt:now},...o.meetings.filter(m=>m.id!==mid)]};
    return next;
  }
  const inPeriod=(value,g)=>{const v=String(value||'');if(!v)return false;const d=v.length===7?v+'-01':v;return (!g.from||d>=g.from)&&(!g.to||d<=g.to);};
  function measure(st,g){
    const target=number(g.target),metric=g.metric;let value=null,reason='아직 비교할 자료가 없습니다.';
    if(metric==='activities'){
      const eligible=list(st.ecs).filter(e=>e.name&&!e.planned&&e.status!=='계획'&&(!g.scope||g.scope==='all'||e.activityScope===g.scope)&&(!g.to||!e.from||String(e.from).slice(0,7)<=g.to.slice(0,7))&&(!g.from||!e.to||String(e.to).slice(0,7)>=g.from.slice(0,7)));
      value=eligible.length;reason='계획 상태를 제외한 등록 활동 수';
    }else if(metric==='awards'){
      const all=[...list(st.awards),...list(st.ecs).flatMap(e=>list(e.awards))];const seen=new Set();
      value=all.filter(a=>{const key=[a.awardName,a.competition,a.date].join('|');if(seen.has(key)||!a.awardName||!inPeriod(a.date,g)||(g.level&&a.level!==g.level))return false;seen.add(key);return true;}).length;reason='설정 기간·수상 레벨과 일치하는 수상 내역';
    }else if(metric==='GPA'){
      const terms=list(st.academicTerms).filter(t=>number(t.termGpa??t.gpa)!=null&&(g.school? t.school===g.school:true)).filter(t=>{const start={Winter:'01-01',Spring:'01-01',Summer:'06-01',Fall:'08-01'}[t.season||t.term],end={Winter:'03-31',Spring:'06-30',Summer:'08-31',Fall:'12-31'}[t.season||t.term];return !g.from&&!g.to||start&&(!g.to||`${t.year}-${start}`<=g.to)&&(!g.from||`${t.year}-${end}`>=g.from);}).filter(t=>!g.term||`${t.year} ${t.season||t.term}`.includes(g.term)).filter(t=>!g.scale||String(t.gradingScale?.gpaScale||st.schoolGradingScales?.[t.school]?.gpaScale||'').includes(String(g.scale))).sort((a,b)=>String(b.year||'').localeCompare(String(a.year||''))||({Fall:4,Summer:3,Spring:2,Winter:1}[b.season||b.term]||0)-({Fall:4,Summer:3,Spring:2,Winter:1}[a.season||a.term]||0));
      if(terms.length){value=number(terms[0].termGpa??terms[0].gpa);reason=`${terms[0].school||''} ${terms[0].year||''} ${terms[0].season||terms[0].term||''} 학기 GPA`;}else reason='일치하는 학기·학교·GPA 체계의 입력 점수가 필요합니다.';
    }else if(['SSAT','TOEFL','TOEFL Jr','SAT','ACT','IELTS','DET'].includes(metric)){
      const tests=list(st.tests).filter(t=>t.type===metric&&date(t.date)&&inPeriod(t.date,g));
      const scores=tests.map(t=>{if(metric==='SSAT')return number(t.details?.['Overall Percentile']??t.percentile);const n=number(t.overall);if(metric==='TOEFL'){const scale=t.scoreScale||(n>6?'120':'');if(String(scale)!==String(g.scale||'120'))return null;}return n;}).filter(n=>n!=null);
      if(scores.length){value=Math.max(...scores);reason=metric==='SSAT'?'기간 내 응시한 SSAT 총 퍼센타일 최고값':'같은 점수 체계의 기간 내 응시 최고점';}
    }else if(metric==='milestones'){
      const ms=list(g.milestones);value=ms.filter(m=>m.done).length;reason='완료로 확인된 마일스톤 수';
    }
    const denominator=metric==='milestones'?list(g.milestones).length:target;
    return {value,target:denominator,percent:value==null||!denominator?0:Math.max(0,Math.min(100,Math.round(value/denominator*100))),achieved:value!=null&&denominator>0&&value>=denominator,reason};
  }
  function milestones(goal){
    if(!date(goal.from)||!date(goal.to)||goal.from>goal.to)throw Error('목표 시작일과 종료일을 확인해 주세요.');
    const span=Math.max(0,days(goal.to,goal.from));
    const labels=goal.metric==='awards'?['대회 자격·평가기준 확인','작품 또는 풀이 초안 완성','멘토 피드백 및 수정','제출·응시 및 결과 확인']:goal.metric==='activities'?['활동 선택·주간 시간 확정','활동 착수 및 역할 설정','중간 결과물·피드백 확인','최종 결과물 및 기여 정리']:['현재 수준 확인·약점 선정','주간 학습·연습 루틴 실행','중간 평가 및 계획 조정','최종 성과·점수 확인'];
    return labels.map((title,i)=>({id:id(),title,date:addDays(goal.from,Math.round(span*i/3)),done:false,sessions:2,hours:1}));
  }
  function applicationFromSchool(s,st,now=today()){
    const a=s.admissions||{},year=String(st.targetYear||''),matched=String(a.entryYear||'')===year,verified=matched&&a.verifiedAt&&a.sourceUrl;
    const deadline=verified?date(a.deadline):'';
    const known=list(a.requirements).map((r,i)=>({...r,id:r.id||'req-'+i,deadline:verified?date(r.deadline):'',status:'미시작'}));
    return {id:id(),school:s.name,status:'Not Started',portal:a.platform||s.appPortal||'',deadline,interviewDate:'',interviewInstructions:a.interviewInstructions||'',interviewUrl:a.interviewUrl||'',requirements:known,essays:list(a.essays).map((e,i)=>({...e,id:e.id||'essay-'+i,status:'미시작',draft:''})),sourceUrl:a.sourceUrl||s.website||'',sourceVerifiedAt:a.verifiedAt||'',entryYear:year||a.entryYear||'',sourceEntryYear:a.entryYear||'',essayNotice:a.essayNotice||'',sourceStatus:verified?'확인됨':'지원연도·요건 확인 필요',legacyDeadline:s.deadline||'',createdAt:now};
  }
  function resume(st,forecast=false,now=new Date().toISOString()){
    const o=operations(st),ecs=list(st.ecs).filter(e=>e.name&&!e.planned&&e.status!=='계획');
    return clone({id:id(),createdAt:now,type:forecast?'목표 달성 가정':'현재 이력',name:st.en||st.name,school:st.school,grade:st.currentGrade||st.grade,education:[{school:st.school,grade:st.currentGrade||st.grade},...list(st.previousSchools).filter(s=>s.school||s.name).map(s=>({school:s.school||s.name,grade:[s.gradeFrom,s.gradeTo].filter(Boolean).join(' - ')}))],activities:ecs.map(e=>({name:e.name,category:e.cat,organization:e.team||e.org,role:e.position,from:e.from,to:e.to,hours:e.hours,impact:e.impact||'',scope:e.activityScope||''})),awards:[...list(st.awards),...ecs.flatMap(e=>list(e.awards))].filter(a=>a.awardName),tests:list(st.tests).filter(t=>date(t.date)).map(t=>({type:t.type,date:t.date,score:t.type==='SSAT'?(t.details?.['Overall Percentile']??t.percentile):t.overall,scale:t.scoreScale||''})),academicTerms:list(st.academicTerms).filter(t=>(t.termGpa??t.gpa)!==''&&(t.termGpa??t.gpa)!=null).map(t=>({school:t.school,year:t.year,term:t.season||t.term,gpa:t.termGpa??t.gpa})),projected:forecast?o.goals.map(g=>({title:g.title,target:g.target,metric:g.metric,deadline:g.to})):[]});
  }
  function publishProgress(st,summary,author,now=new Date().toISOString()){
    if(!summary.trim())throw Error('학부모에게 전달할 요약을 작성해 주세요.');
    const o=operations(st);
    return {id:id(),publishedAt:now,authorName:author||'',summary,stage:st.stage,goals:o.goals.filter(g=>g.shareWithFamily).map(g=>({title:g.title,horizon:g.horizon,deadline:g.to,...measure(st,g)})),tasks:tasks(st).filter(t=>t.shareWithFamily).map(t=>({title:t.title,date:t.date,done:t.done})),events:eventRows(st).filter(e=>e.shareWithFamily).map(e=>({title:e.title,date:e.date,time:e.time||''})),applications:list(st.applications).map(a=>({school:a.school,status:a.status,deadline:a.deadline,completed:list(a.requirements).filter(r=>r.status==='완료').length,total:list(a.requirements).length})),meetingSummaries:o.meetings.filter(m=>m.shareWithFamily&&m.familySummary).map(m=>({date:m.date,summary:m.familySummary})).slice(0,8)};
  }
  function opportunityMatch(st,item,now=today()){
    const grade=Number(String(st.currentGrade||st.grade||'').match(/\d+/)?.[0]);
    const matchText=list(st.ecs).map(e=>`${e.cat} ${e.name}`).join(' ').toLowerCase();
    const matches=list(item.tags).filter(t=>matchText.includes(t.toLowerCase()));
    const eligible=(!item.minGrade||grade>=item.minGrade)&&(!item.maxGrade||grade<=item.maxGrade);
    return {eligible,score:matches.length,expired:date(item.deadline)&&item.deadline<now,reason:!grade?'학년 확인 필요':!eligible?'학년 요건 불일치':matches.length?`기존 활동과 연결: ${matches.join(', ')}`:'새로운 관심 분야로 검토',qualification:item.eligibility||'세부 자격 확인 필요'};
  }
  function registerOpportunity(st,item,deadline){
    if([...list(st.ecs),...operations(st).plannedActivities].some(e=>e.opportunityId===item.id))throw Error('이미 등록된 대회입니다.');
    const activity={id:id(),opportunityId:item.id,name:item.name,cat:item.category,activityScope:'external',planned:true,status:'계획',from:today().slice(0,7),sourceUrl:item.url};
    const goal={id:id(),title:`${item.name} 준비`,metric:'milestones',horizon:'학기/방학',from:today(),to:date(deadline),shareWithFamily:false,activityId:activity.id};
    goal.milestones=milestones(goal);return {...st,operations:{...recordUpdate(st,'대회 준비 등록',item.name),plannedActivities:[...operations(st).plannedActivities,activity],goals:[...operations(st).goals,goal]}};
  }
  const api={clone,list,id,today,date,addDays,days,rows,operations,workspace,tasks,updateTask,routineEvents,eventRows,calendar,recordUpdate,applyMeeting,measure,milestones,applicationFromSchool,resume,publishProgress,opportunityMatch,registerOpportunity};
  root.PrepOperations=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window==='undefined'?globalThis:window);
