function OpsRoutines({goal,setRoutines}) {
 const rows=goal.routines||[],edit=(id,p)=>setRoutines(rows.map(r=>r.id===id?{...r,...p}:r));
 return <section className="ops-band"><div className="ops-toolbar"><h3>주간 실행 일정</h3><OpsButton icon="CalendarPlus" onClick={()=>setRoutines([...rows,{id:O.id(),title:'',weekday:'1',time:'',hours:'1',from:goal.from,to:goal.to,timezone:'Asia/Seoul'}])}>반복 일정 추가</OpsButton></div>{rows.map(r=><div className="ops-item" key={r.id}><div className="ops-grid three"><OpsField label="실행할 일" value={r.title} onChange={v=>edit(r.id,{title:v})}/><OpsField label="요일" value={r.weekday} options={['일','월','화','수','목','금','토'].map((s,i)=>[String(i),s+'요일'])} onChange={v=>edit(r.id,{weekday:v})}/><OpsField label="시작 시각" type="time" value={r.time} onChange={v=>edit(r.id,{time:v})}/><OpsField label="회당 시간" type="number" min="0.25" max="12" step="0.25" value={r.hours} onChange={v=>edit(r.id,{hours:v})}/><OpsField label="반복 시작일" type="date" value={r.from} onChange={v=>edit(r.id,{from:v})}/><OpsField label="반복 종료일 (최대 1년)" type="date" value={r.to} onChange={v=>edit(r.id,{to:v})}/><OpsField label="시간대" value={r.timezone} options={['Asia/Seoul','America/New_York','America/Chicago','America/Denver','America/Los_Angeles','Europe/London']} onChange={v=>edit(r.id,{timezone:v})}/><OpsButton icon="Trash2" onClick={()=>setRoutines(rows.filter(x=>x.id!==r.id))}>일정 삭제</OpsButton></div></div>)}</section>;
}
function opsValidateRoutines(goal){
 for(const r of goal.routines||[])if(!r.title?.trim()||!O.date(r.from)||!O.date(r.to)||r.from>r.to||O.days(r.to,r.from)>366||!r.time||!r.timezone||Number(r.hours)<=0||Number(r.hours)>12)throw Error('주간 실행 일정의 제목·시각·시간대·기간·회당 시간을 확인해 주세요. 반복 기간은 한 번에 1년까지 설정합니다.');
}
function OpsSavedRoadmaps({st,onEdit}) {
 const entries=Object.entries(st.activityGoalMap||{}).filter(([,g])=>g.selectedGoal||g.userGoal);
 if(!entries.length)return null;
 return <details className="ops-band"><summary>Stage 2에서 저장한 활동 로드맵 {entries.length}개</summary>{entries.map(([activityId,g])=>{
  const ec=O.rows(st.ecs,'ec').find(x=>x.id===activityId),existing=O.operations(st).goals.find(x=>x.sourceActivityId===activityId);
  return <div className="ops-log" key={activityId}><h3>{ec?.name||'연결 활동'}</h3><p>{g.selectedGoal||g.userGoal}</p><OpsButton icon="Target" onClick={()=>onEdit(existing||{id:O.id(),sourceActivityId:activityId,activityId,title:g.selectedGoal||g.userGoal,metric:'milestones',horizon:'컨설팅 최종',from:O.today(),to:O.date(st.programEndDate),milestones:(g.roadmap||[]).map(r=>({id:O.id(),title:`${r.period} · ${r.goal}`,notes:[r.deliverable,r.successCriteria].filter(Boolean).join('\n'),date:'',sessions:g.weeklyActionPlan?.[0]?.timesPerWeek||2,hours:g.weeklyActionPlan?.[0]?.hoursPerSession||1,done:false}))})}>{existing?'연결된 실행 목표 열기':'실행 목표로 연결'}</OpsButton></div>;
 })}</details>;
}
