(function(root){
  const list=value=>Array.isArray(value)?value:[];
  const clone=value=>JSON.parse(JSON.stringify(value||{}));
  const text=value=>String(value||'').trim();
  const legacyDiscussion=meeting=>({
    academics:'',
    testing:'',
    activities:'',
    other:text(meeting.notes)
  });
  function normalize(meeting={}){
    const source=clone(meeting);
    const effects=list(source.effects);
    const actionItems=list(source.actionItems).length?list(source.actionItems):effects.filter(e=>e.kind==='task').map((e,index)=>({
      id:e.actionId||e.id||`legacy-action-${index}`,
      title:e.title||'',
      responsibleId:e.responsibleId||e.ownerId||'student',
      responsibleName:e.responsibleName||'',
      dueDate:e.dueDate||e.date||'',
      done:!!e.done,
      url:e.url||'',
      createTask:e.selected!==false
    }));
    return {
      id:source.id||'',
      title:source.title||'학생 코칭 미팅',
      date:source.date||'',
      time:source.time||'',
      sinceLastMeeting:source.sinceLastMeeting||'',
      todayGoal:source.todayGoal||source.focus||source.agenda||'',
      discussion:{...legacyDiscussion(source),...(source.discussion||{})},
      snapshot:{effort:'',timeline:'',engagement:'',...(source.snapshot||{})},
      actionItems,
      parentSummary:source.parentSummary||source.familySummary||'',
      internalNotes:source.internalNotes||'',
      shareWithFamily:!!source.shareWithFamily,
      effects:effects.filter(e=>e.kind!=='task'),
      sourceMeetingId:source.sourceMeetingId||'',
      appliedAt:source.appliedAt||'',
      cancelled:!!source.cancelled,
      createdAt:source.createdAt||'',
      updatedAt:source.updatedAt||''
    };
  }
  function copyForNew(meeting,id,today){
    const value=normalize(meeting);
    return {...value,id:id||'',date:today||'',time:'',title:`후속 미팅 · ${value.title}`,sourceMeetingId:value.id,appliedAt:'',cancelled:false,createdAt:'',updatedAt:'',actionItems:value.actionItems.map(item=>({...item,id:'',createTask:false}))};
  }
  function payload(value,idFactory=()=>Math.random().toString(36).slice(2)){
    const d=normalize(value);
    const sections=[
      ['지난 미팅 이후',d.sinceLastMeeting],
      ['오늘 목표',d.todayGoal],
      ['학업',d.discussion.academics],
      ['시험 / 준비',d.discussion.testing],
      ['활동 / 인터뷰',d.discussion.activities],
      ['기타',d.discussion.other],
      ['내부 메모',d.internalNotes]
    ].filter(([,value])=>text(value)).map(([label,value])=>`${label}\n${text(value)}`).join('\n\n');
    const actionItems=d.actionItems.filter(item=>text(item.title)).map(item=>({...item,id:item.id||idFactory()}));
    const taskEffects=actionItems.filter(item=>item.createTask!==false).map(item=>({
      id:`action-${item.id}`,
      actionId:item.id,
      kind:'task',
      selected:true,
      title:text(item.title),
      date:item.dueDate||'',
      ownerId:item.responsibleId==='student'?'':item.responsibleId||'',
      responsibleId:item.responsibleId||'student',
      responsibleName:item.responsibleName||'',
      done:!!item.done,
      url:item.url||'',
      fromActionItem:true
    }));
    return {
      ...d,
      agenda:d.todayGoal,
      notes:sections,
      familySummary:d.parentSummary,
      actionItems,
      effects:[...d.effects.filter(e=>e.kind!=='task'),...taskEffects],
      updatedAt:new Date().toISOString()
    };
  }
  const api={normalize,copyForNew,payload};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.PrepMeetingRecords=api;
})(typeof window!=='undefined'?window:globalThis);
