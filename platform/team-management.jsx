function OpsTeamManager({data,persist,close}){
 const [values,setValues]=useState(O.clone(data.staffTeams||{})),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const staff=data.staffAccounts||[];
 const toggle=(id,team,on)=>setValues(v=>({...v,[id]:on?[...new Set([...(v[id]||[]),team])]:(v[id]||[]).filter(t=>t!==team)}));
 return <PPDialog title="담당자 소속 팀" close={close} wide><div className="ops"><div className="ops-table"><table className="table team-members-table"><thead><tr><th>담당자</th>{CRM.teams.map(t=><th key={t}>{t}</th>)}</tr></thead><tbody>{staff.map(p=><tr key={p.id}><th>{p.name}</th>{CRM.teams.map(t=><td key={t}><input type="checkbox" aria-label={`${p.name} ${t}`} checked={(values[p.id]||[]).includes(t)} onChange={e=>toggle(p.id,t,e.target.checked)}/></td>)}</tr>)}</tbody></table></div>{error&&<p role="alert">{error}</p>}<button className="btn primary" disabled={busy} onClick={async()=>{setBusy(true);setError('');try{await persist({...data,staffTeams:values});close();}catch(e){setError(e.message);}finally{setBusy(false);}}}>{busy?'저장 중…':'팀 구성 저장'}</button></div></PPDialog>;
}
