function OpsWorkQueue({title,items,staff,students,user,onEdit,onStudent}) {
  const [limit,setLimit]=useState(12);
  const sorted=[...items].sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999')||Number(b.importance||3)-Number(a.importance||3));
  const owner=t=>staff.find(p=>p.id===t.ownerId)?.name||(students.find(s=>s.id===t.studentId)?.owners||[]).map(id=>staff.find(p=>p.id===id)?.name).filter(Boolean).join(', ')||(t.studentId?'담당 미지정':user.name);
  return <section className="ops-band work-queue" aria-label={title}>
    <h2>{title} <span className="ops-tag">{items.length}</span></h2>
    {items.length?<div className="ops-table ops-task-table"><table className="table" role="table" aria-label={title}><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">학생 / 담당</th><th scope="col" role="columnheader">할 일</th><th scope="col" role="columnheader">기한</th><th scope="col" role="columnheader">중요도</th><th scope="col" role="columnheader"><span className="sr-only">업무 수정</span></th></tr></thead><tbody role="rowgroup">{sorted.slice(0,limit).map(t=>{
      const student=students.find(s=>s.id===t.studentId),importance=Math.min(5,Math.max(1,Number(t.importance)||3));
      return <tr role="row" key={t.uid||('me'+t.key+t.id)}>
        <td role="cell" className="work-person">{student?<button className="crm-text-button" onClick={()=>onStudent(student)}>{t.studentName}</button>:<b>{t.studentName}</b>}<span className="ops-muted work-owner">{owner(t)}</span></td>
        <td role="cell" className="work-title"><b>{t.title}</b>{t.context&&<span className="ops-muted work-context">{t.context}</span>}</td>
        <td role="cell" className="work-date"><time dateTime={t.date||undefined}>{t.date||'기한 미정'}</time><OpsDeadline date={t.date}/></td>
        <td role="cell" className="work-priority"><span aria-label={`중요도 ${importance}/5`} title={`중요도 ${importance}/5`}>{'★'.repeat(importance)}<span className="priority-empty" aria-hidden="true">{'☆'.repeat(5-importance)}</span></span></td>
        <td role="cell" className="work-edit"><OpsButton icon="Pencil" onClick={()=>onEdit(t)}>수정</OpsButton></td>
      </tr>;
    })}</tbody></table></div>:<OpsEmpty>{title==='기한이 지난 업무'?'기한이 지난 업무가 없습니다.':'현재 표시할 업무가 없습니다.'}</OpsEmpty>}
    {items.length>limit&&<OpsButton icon="ChevronDown" onClick={()=>setLimit(limit+12)}>업무 더 보기 ({items.length-limit})</OpsButton>}
  </section>;
}

function OpsUpdateFeed({updates,readAt,onRead,onStudent}) {
  const [limit,setLimit]=useState(5);
  return <section className="ops-band work-updates"><div className="ops-toolbar"><h2>업무 업데이트</h2><OpsSave run={onRead}>모두 확인</OpsSave></div>
    {updates.slice(0,limit).map(u=><article className="update-row" key={u.student.id+u.id}>
      <div className="ops-inline"><button className="crm-text-button" onClick={()=>onStudent(u.student)}>{u.student.name}</button>{(!readAt||u.at>readAt)&&<span className="update-new">새 소식</span>}</div>
      <p className="update-title">{u.title}</p>{u.detail&&<p className="ops-muted">{u.detail}</p>}<time className="ops-muted" dateTime={u.at}>{ppTime(u.at)}</time>
    </article>)}
    {!updates.length&&<OpsEmpty>새로운 업무 업데이트가 없습니다.</OpsEmpty>}
    {updates.length>limit&&<OpsButton icon="ChevronDown" onClick={()=>setLimit(limit+10)}>업데이트 더 보기 ({updates.length-limit})</OpsButton>}
  </section>;
}
