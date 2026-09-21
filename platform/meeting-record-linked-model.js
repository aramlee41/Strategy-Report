(function(root){
  const list=value=>Array.isArray(value)?value:[];
  const clone=value=>JSON.parse(JSON.stringify(value||{}));
  const text=value=>String(value||'').trim();
  const pad=value=>String(value).padStart(2,'0');
  const validDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value||''))&&!Number.isNaN(Date.parse(`${value}T12:00:00`));
  const today=()=>{const now=new Date();return `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;};
  const sectionKeys=['since','focus','academics','testing','activities','interviews','essays','other','actions','notes'];
  const defaultSectionOrder=['since','focus','academics','testing','activities','other','actions','notes'];
  const normalizeSectionOrder=value=>[...new Set(list(value).filter(key=>sectionKeys.includes(key)))];
  function formatMeetingTitle(value){
    const date=validDate(value)?value:today(),[year,month,day]=date.split('-');
    return `${month}/${day}/${year} 미팅`;
  }
  function parseDueDate(value,baseDate=today()){
    const raw=text(value);if(!raw)return '';
    let match=raw.match(/\b(20\d{2})[-./년\s]+(0?[1-9]|1[0-2])[-./월\s]+(0?[1-9]|[12]\d|3[01])(?:일)?\b/),year,month,day;
    if(match){year=Number(match[1]);month=Number(match[2]);day=Number(match[3]);}
    else {
      match=raw.match(/(0?[1-9]|1[0-2])(?:[./]|월\s*)(0?[1-9]|[12]\d|3[01])(?:일)?(?:까지|\s|$)/);
      if(!match)return '';
      year=Number((validDate(baseDate)?baseDate:today()).slice(0,4));month=Number(match[1]);day=Number(match[2]);
    }
    const result=`${year}-${pad(month)}-${pad(day)}`,parsed=new Date(`${result}T12:00:00`);
    return parsed.getFullYear()===year&&parsed.getMonth()+1===month&&parsed.getDate()===day?result:'';
  }
  const legacyDiscussion=meeting=>({academics:'',testing:'',activities:'',other:text(meeting.notes)});
  const activityGroup=activity=>{
    const scope=String(activity.activityScope||'').toLowerCase(),category=String(activity.cat||activity.category||'').toLowerCase(),name=String(activity.name||'').toLowerCase();
    if(scope==='project'||/research|project|portfolio|연구|프로젝트/.test(`${category} ${name}`))return 'project';
    return scope==='school'?'school':'external';
  };
  function academicSeason(value=today()){
    const date=validDate(value)?new Date(`${value}T12:00:00`):new Date(),month=date.getMonth()+1;
    return {year:String(date.getFullYear()),season:month<=5?'Spring':month<=8?'Summer':'Fall'};
  }
  function sourceRows(student={},referenceDate=today()){
    const current=academicSeason(referenceDate);
    const academicRows=list(student.academicTerms).flatMap((term,termIndex)=>{
      const termSeason=text(term.season||term.term),termYear=text(term.year);
      if(termYear!==current.year||termSeason.toLowerCase()!==current.season.toLowerCase())return [];
      return list(term.subjects).map((subject,subjectIndex)=>({id:`academic-${term.termId||termIndex}-${subjectIndex}`,termId:term.termId||'',termIndex,subjectIndex,school:term.school||student.school||'',termLabel:[term.year,term.season||term.term].filter(Boolean).join(' '),subject:subject.subject||'',progressStatus:subject.meetingProgressStatus||'',progressNote:subject.meetingProgressNote||'',issue:subject.meetingIssue||''})).filter(row=>text(row.subject));
    });
    const operations=student.operations||{},testTypes=new Set(['SSAT','PSAT','SAT','ACT','TOEFL','TOEFL Jr','IELTS','DET','ISEE','MAP']);
    const testRows=list(operations.goals).filter(goal=>testTypes.has(goal.metric)).map(goal=>({id:`test-goal-${goal.id}`,goalId:goal.id,testId:'',type:goal.metric,target:goal.target??'',nextDate:goal.to||'',progressStatus:goal.progressStatus||'',progressNote:goal.progressNote||'',issue:goal.issue||''}));
    for(const [index,test] of list(student.tests).entries())if(test.type&&!testRows.some(row=>row.type===test.type))testRows.push({id:`test-${test.id||index}`,testId:test.id||'',testIndex:index,goalId:'',type:test.type,target:'',nextDate:test.nextDate||'',progressStatus:test.prepStatus||'',progressNote:test.prepProgress||'',issue:test.prepIssue||''});
    const activityRows=list(student.ecs).filter(activity=>activity.name&&activity.status!=='완료').map((activity,index)=>({id:`activity-${activity.activityId||activity.id||index}`,activityId:activity.activityId||activity.id||'',activityIndex:index,group:activityGroup(activity),name:activity.name,category:activity.cat||'',progressStatus:activity.meetingProgressStatus||'',progressNote:activity.meetingProgressNote||'',issue:activity.meetingIssue||''}));
    const interviewRows=list(student.applications).map((application,index)=>({id:`interview-${application.id||index}`,applicationId:application.id||'',applicationIndex:index,school:application.school||'',date:application.interviewDate||'',status:application.interviewStatus||'미예약',prepStatus:application.interviewPrepStatus||'',notes:application.interviewNotes||'',docUrl:application.interviewDocUrl||''}));
    const essayRows=list(student.applications).flatMap((application,applicationIndex)=>list(application.essays).map((essay,essayIndex)=>({id:`essay-${application.id||applicationIndex}-${essay.id||essayIndex}`,applicationId:application.id||'',applicationIndex,essayId:essay.id||'',essayIndex,school:application.school||'',title:essay.title||`에세이 ${essayIndex+1}`,prompt:essay.prompt||'',deadline:essay.deadline||application.deadline||'',priority:essay.priority||'',status:essay.status||'미시작',progressNote:essay.progressNote||'',docUrl:essay.docUrl||''})));
    return {academicRows,testRows,activityRows,interviewRows,essayRows};
  }
  function mergeRows(saved,generated){
    if(!list(saved).length)return generated;
    const map=new Map(generated.map(row=>[row.id,row]));
    return saved.map(row=>({...map.get(row.id),...row})).concat(generated.filter(row=>!saved.some(old=>old.id===row.id)));
  }
  function normalize(meeting={}){
    const source=clone(meeting),effects=list(source.effects),date=source.date||'';
    const actionItems=list(source.actionItems).length?list(source.actionItems):effects.filter(e=>e.kind==='task').map((e,index)=>({id:e.actionId||e.id||`legacy-action-${index}`,title:e.title||'',responsibleId:e.responsibleId||e.ownerId||'student',responsibleName:e.responsibleName||'',dueDate:e.dueDate||e.date||'',dueDateAuto:false,done:!!e.done,url:e.url||'',createTask:e.selected!==false}));
    return {id:source.id||'',title:source.title||formatMeetingTitle(date),autoTitle:source.autoTitle!==false&&!source.title,date,time:source.time||'',sinceLastMeeting:source.sinceLastMeeting||'',sinceLastMeetingItems:list(source.sinceLastMeetingItems),previousMeetingId:source.previousMeetingId||'',todayGoal:source.todayGoal||source.focus||source.agenda||'',sectionOrder:normalizeSectionOrder(source.sectionOrder),discussion:{...legacyDiscussion(source),...(source.discussion||{})},academicRows:list(source.academicRows),testRows:list(source.testRows),activityRows:list(source.activityRows),interviewRows:list(source.interviewRows),essayRows:list(source.essayRows),otherRows:list(source.otherRows),snapshot:{effort:'',timeline:'',engagement:'',...(source.snapshot||{})},actionItems,parentSummary:source.parentSummary||source.familySummary||'',internalNotes:source.internalNotes||'',shareWithFamily:!!source.shareWithFamily,effects:effects.filter(e=>e.kind!=='task'),sourceMeetingId:source.sourceMeetingId||'',appliedAt:source.appliedAt||'',cancelled:!!source.cancelled,createdAt:source.createdAt||'',updatedAt:source.updatedAt||''};
  }
  function hydrate(meeting,student){
    const value=normalize(meeting),generated=sourceRows(student,value.date||today());
    const academicRows=generated.academicRows.map(row=>({...row,...(value.academicRows.find(saved=>saved.id===row.id)||{})}));
    return {...value,academicRows,testRows:mergeRows(value.testRows,generated.testRows),activityRows:mergeRows(value.activityRows,generated.activityRows),interviewRows:mergeRows(value.interviewRows,generated.interviewRows),essayRows:mergeRows(value.essayRows,generated.essayRows),otherRows:value.otherRows.length?value.otherRows:[{id:'other-1',note:value.discussion.other||''}]};
  }
  function seedPreviousActions(meeting,history=[],student={}){
    const value=normalize(meeting);
    if(value.sinceLastMeetingItems.length||text(value.sinceLastMeeting)||value.previousMeetingId)return value;
    const previous=list(history).map(normalize).filter(item=>item.id!==value.id&&!item.cancelled&&validDate(item.date)&&item.date<=value.date&&(item.appliedAt||item.date<value.date)).sort((a,b)=>b.date.localeCompare(a.date)||String(b.updatedAt||b.createdAt).localeCompare(String(a.updatedAt||a.createdAt)))[0];
    if(!previous)return value;
    const tasks=list(student.tasks);
    const items=previous.actionItems.filter(item=>text(item.title)).map((item,index)=>{
      const linked=tasks.find(task=>task.meetingId===previous.id&&text(task.title)===text(item.title));
      const done=!!(linked?.done||item.done);
      return {id:`previous-${previous.id}-${item.id||index}`,sourceMeetingId:previous.id,sourceActionId:item.id||'',title:item.title,dueDate:item.dueDate||'',resultStatus:done?'완료':'확인 필요',note:'',wasDone:done};
    });
    return {...value,previousMeetingId:previous.id,sinceLastMeetingItems:items};
  }
  function copyForNew(meeting,id,date){
    const value=normalize(meeting),nextDate=date||today();
    const previousItems=value.actionItems.filter(item=>text(item.title)).map((item,index)=>({id:`previous-${value.id}-${item.id||index}`,sourceMeetingId:value.id,sourceActionId:item.id||'',title:item.title,dueDate:item.dueDate||'',resultStatus:item.done?'완료':'확인 필요',note:'',wasDone:!!item.done}));
    return {...value,id:id||'',date:nextDate,time:'',title:formatMeetingTitle(nextDate),autoTitle:true,sourceMeetingId:value.id,previousMeetingId:value.id,sinceLastMeeting:'',sinceLastMeetingItems:previousItems,appliedAt:'',cancelled:false,createdAt:'',updatedAt:'',actionItems:[]};
  }
  function payload(value,idFactory=()=>Math.random().toString(36).slice(2)){
    const d=normalize(value);
    const rowNotes=[...d.academicRows.map(row=>['학업',`${row.termLabel} ${row.subject}`,row.progressNote,row.issue]),...d.testRows.map(row=>['시험',row.type,row.progressNote,row.issue]),...d.activityRows.map(row=>['활동',row.name,row.progressNote,row.issue]),...d.interviewRows.map(row=>['인터뷰',row.school,row.notes]),...d.essayRows.map(row=>['에세이',`${row.school} ${row.title}`,row.progressNote]),...d.otherRows.map(row=>['기타','',row.note])].filter(row=>row.slice(2).some(text)).map(row=>`${row[0]} · ${row[1]}\n${row.slice(2).filter(text).join('\n')}`);
    const previousSummary=d.sinceLastMeetingItems.length?d.sinceLastMeetingItems.map(item=>`${item.title} · ${item.resultStatus||'확인 필요'}${text(item.note)?` · ${text(item.note)}`:''}`).join('\n'):d.sinceLastMeeting;
    const sections=[['지난 미팅 이후',previousSummary],['오늘 목표',d.todayGoal],...rowNotes.map(note=>['진행 기록',note]),['내부 메모',d.internalNotes]].filter(([,value])=>text(value)).map(([label,value])=>`${label}\n${text(value)}`).join('\n\n');
    const actionItems=d.actionItems.filter(item=>text(item.title)).map(item=>({...item,id:item.id||idFactory(),dueDate:item.dueDate||parseDueDate(item.title,d.date)}));
    const taskEffects=actionItems.filter(item=>item.createTask!==false).map(item=>({id:`action-${item.id}`,actionId:item.id,kind:'task',selected:true,title:text(item.title),date:item.dueDate||'',ownerId:item.responsibleId==='student'?'':item.responsibleId||'',responsibleId:item.responsibleId||'student',responsibleName:item.responsibleName||'',done:!!item.done,url:item.url||'',fromActionItem:true}));
    return {...d,sectionOrder:normalizeSectionOrder(d.sectionOrder),sinceLastMeeting:previousSummary,agenda:d.todayGoal,notes:sections,familySummary:d.parentSummary,actionItems,effects:[...d.effects.filter(e=>e.kind!=='task'),...taskEffects],updatedAt:new Date().toISOString()};
  }
  const api={normalize,hydrate,sourceRows,seedPreviousActions,copyForNew,payload,parseDueDate,formatMeetingTitle,activityGroup,academicSeason,sectionKeys,defaultSectionOrder,normalizeSectionOrder};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.PrepMeetingRecords=api;
})(typeof window!=='undefined'?window:globalThis);
