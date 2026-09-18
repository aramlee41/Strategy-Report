const PC = window.PrepCloud;
function PPContactSupport(){return <footer className="portal-contact"><PPIcon name="Mail" size={17}/><span>서비스 문의</span><a href="mailto:yesboarding@gmail.com">yesboarding@gmail.com</a></footer>;}
function PPPortalChoice() {
  return <div className="portal-shell"><header className="portal-header"><div className="portal-brand"><PPIcon name="GraduationCap" size={36}/><strong>예스유학 · Prep LMS</strong></div></header><main className="portal-entry"><h1>Prep LMS 로그인</h1><nav className="portal-entry-options" aria-label="로그인 유형"><a href="?portal=parent" className="portal-entry-option"><PPIcon name="GraduationCap" size={32}/><span>학생·학부모 로그인</span><PPIcon name="ArrowRight" size={22}/></a><a href="?portal=staff" className="portal-entry-option staff"><PPIcon name="BriefcaseBusiness" size={32}/><span>직원 로그인</span><PPIcon name="ArrowRight" size={22}/></a></nav></main></div>;
}
function PPCloudLogin({ inviteToken, onReady }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [repeat,setRepeat]=useState("");
  const [existing,setExisting]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const parentEntry=new URLSearchParams(location.search).get("portal")==="parent";
  const submit=async e=>{
    e.preventDefault();setBusy(true);setError("");
    try {
      let loginEmail=email;
      if(inviteToken&&!existing) {
        if(password!==repeat) throw new Error("비밀번호 확인이 일치하지 않습니다.");
        const result=await PC.call({action:"redeemInvitation",inviteToken,password},true);
        loginEmail=result.email;
      }
      const result=await PC.authClient().auth.signInWithPassword({email:loginEmail.trim(),password});
      if(result.error) throw new Error("이메일 또는 비밀번호를 확인해 주세요.");
      if(inviteToken&&existing) await PC.call({action:"redeemInvitation",inviteToken});
      setPassword("");setRepeat("");await onReady();
    }catch(e){if(e.code==="USE_EXISTING_LOGIN")setExisting(true);setError(e.message);}finally{setBusy(false);}
  };
  return <div className="portal-shell"><header className="portal-header"><div className="portal-brand"><PPIcon name="GraduationCap" size={36}/><strong>예스유학 · {parentEntry?"Family Portal":"Prep LMS"}</strong></div></header><main className="portal-login"><h1>{inviteToken?"초대받은 계정 연결":parentEntry?"학생·학부모 로그인":"직원 로그인"}</h1><p className="portal-muted">{inviteToken?"초대받은 계정에 사용할 비밀번호를 설정해 주세요. 초대 링크는 한 번만 사용할 수 있습니다.":"등록된 이메일과 비밀번호로 로그인해 주세요."}</p><form onSubmit={submit}>{(!inviteToken||existing)&&<label className="field" style={{display:"block"}}><span className="label">이메일</span><input className="input" type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/></label>}<label className="field" style={{display:"block"}}><span className="label">비밀번호{inviteToken&&!existing?" (12자 이상)":""}</span><input className="input" type="password" minLength={inviteToken&&!existing?12:undefined} maxLength={128} autoComplete={inviteToken&&!existing?"new-password":"current-password"} value={password} onChange={e=>setPassword(e.target.value)} required/></label>{inviteToken&&!existing&&<label className="field" style={{display:"block"}}><span className="label">비밀번호 확인</span><input className="input" type="password" autoComplete="new-password" value={repeat} onChange={e=>setRepeat(e.target.value)} required/></label>}<p role="alert" style={{color:"#9c3925"}}>{error}</p><button className="btn primary" type="submit" disabled={busy}>{busy?"연결 중…":inviteToken?"계정 연결":"로그인"}</button></form>{inviteToken&&<button className="btn ghost" style={{marginTop:12}} onClick={()=>setExisting(!existing)}>{existing?"새 계정으로 연결":"이미 계정이 있습니다"}</button>}<p className="portal-muted">계정이 없거나 비밀번호를 잊으셨다면 담당 컨설턴트에게 문의해 주세요.</p><p><a className="portal-back" href="index.html"><PPIcon name="ArrowLeft" size={18}/> 로그인 유형 선택</a></p></main></div>;
}
function PPCloudAccounts({ students = [], fixedStudent, admin = false, onImport }) {
  const [name,setName]=useState("");const [email,setEmail]=useState("");const [role,setRole]=useState("parent");
  const [selected,setSelected]=useState(fixedStudent?[fixedStudent.id]:[]);
  const [link,setLink]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);
  const [list,setList]=useState({invitations:[],members:[]});
  const refresh=async()=>{try{setList(await PC.call({action:"accounts"}));}catch(e){setMessage(e.message);}};
  React.useEffect(()=>{refresh();},[]);
  const invite=async()=>{setBusy(true);setMessage("");try{
    const result=await PC.call({action:"invite",name,email,role,studentIds:role==="parent"?selected:[]});
    setLink(location.origin+location.pathname+"?portal="+(role==="parent"?"parent":"staff")+"#invite="+result.inviteToken);
    setMessage("초대 링크를 만들었습니다. 유효기간은 3일입니다. 해당 보호자 또는 직원에게 직접 전달해 주세요.");await refresh();
  }catch(e){setMessage(e.message);}finally{setBusy(false);}};
  return <section className="portal-band"><h2>{fixedStudent?"학생·학부모 계정 초대":"계정 / 초대 관리"}</h2><div className="grid g3"><V2Field label="이름" val={name} set={setName}/><V2Field label="이메일" type="email" val={email} set={setEmail}/>{admin&&!fixedStudent&&<label className="field"><span className="label">권한</span><select className="select" value={role} onChange={e=>setRole(e.target.value)}><option value="parent">학생·학부모</option><option value="staff">컨설턴트</option><option value="admin">관리자</option></select></label>}</div>{role==="parent"&&!fixedStudent&&<fieldset><legend>접근을 허용할 학생</legend>{students.map(s=><label key={s.id} style={{display:"block",padding:8}}><input type="checkbox" checked={selected.includes(s.id)} onChange={e=>setSelected(e.target.checked?[...selected,s.id]:selected.filter(x=>x!==s.id))}/> {s.name}</label>)}</fieldset>}<button className="btn primary" disabled={busy} onClick={invite}>{busy?"생성 중…":"초대 링크 만들기"}</button><p role="status">{message}</p>{link&&<div className="portal-notice"><label className="label">일회용 초대 링크</label><input className="input" readOnly value={link} onFocus={e=>e.target.select()}/><button className="btn ghost" onClick={async()=>{try{await navigator.clipboard.writeText(link);setMessage("초대 링크를 복사했습니다.");}catch(e){setMessage("초대 링크 입력창의 주소를 선택해 복사해 주세요.");}}}>링크 복사</button></div>}
    <h3>초대 현황</h3>{list.invitations.map(i=><div className="portal-row" key={i.id}><div><b>{i.name}</b><p>{i.email} · {i.role==="parent"?"학생·학부모":i.role==="admin"?"관리자":"컨설턴트"} · {{pending:"초대 대기",reserved:"연결 중",accepted:"연결 완료",revoked:"취소"}[i.status]}</p></div>{["pending","reserved"].includes(i.status)&&<button className="btn ghost" onClick={async()=>{try{await PC.call({action:"revokeInvitation",id:i.id});await refresh();setLink("");}catch(e){setMessage(e.message);}}}>초대 취소</button>}</div>)}
    {admin&&<><h3>등록 계정</h3>{list.members.map(m=><div className="portal-row" key={m.user_id}><div><b>{m.name}</b><p>{m.email} · {{parent:"학생·학부모",staff:"컨설턴트",admin:"관리자"}[m.role]} · {m.active?"사용 중":"중지"}</p></div><button className="btn ghost" onClick={async()=>{if(!window.confirm(m.active?"이 계정의 LMS 접근을 중지할까요?":"이 계정의 접근을 다시 허용할까요?"))return;try{await PC.call({action:"disableAccount",id:m.user_id,disabled:m.active});await refresh();}catch(e){setMessage(e.message);}}}>{m.active?"이용 중지":"다시 허용"}</button></div>)}</>}
    {admin&&onImport&&<details className="portal-migration"><summary>기존 자료 이전</summary><button className="btn ghost" disabled={busy} onClick={async()=>{setBusy(true);try{await onImport();}finally{setBusy(false);}}}>기존 브라우저 자료 가져오기</button><a href="index.html?mode=local" target="_blank" rel="noopener">이전 자료 확인</a></details>}
  </section>;
}
function PPCloudApp() {
  const entry=new URLSearchParams(location.search).get("portal");
  const hasEntry=["parent","staff"].includes(entry);
  const [inviteToken,setInviteToken]=useState(()=>{
    const value=new URLSearchParams(location.hash.slice(1)).get("invite");
    if(value)history.replaceState(null,"",location.pathname+location.search);
    return value;
  });
  const [ready,setReady]=useState(false);const [loaded,setLoaded]=useState(null);const [error,setError]=useState("");
  const [status,setStatus]=useState("");const [epoch,setEpoch]=useState(0);const [busy,setBusy]=useState(false);
  const versions=React.useRef({});const shadow=React.useRef(null);const queue=React.useRef(Promise.resolve());const blocked=React.useRef(false);const pending=React.useRef(0);
  const workspaceVersion=React.useRef(0);
  const [remoteAvailable,setRemoteAvailable]=useState(false);
  const normalize=data=>{
    const schools=(data.schools||window.PREP_SCHOOLS||DEFAULT_SCHOOLS).map(v2NormalizeSchool);
    return {...data,cloudConnected:true,schools,schoolDataVersion:window.PREP_SCHOOL_DATA_VERSION,students:data.students.map(v2NormalizeStudent).map(st=>v2AttachAnalysis(st,schools))};
  };
  const refresh=async()=>{setBusy(true);setError("");try{
    const result=await PC.call({action:"load"});versions.current=result.versions;workspaceVersion.current=result.workspaceVersion||0;blocked.current=false;setRemoteAvailable(false);
    const data=result.user.role==="parent"?result:normalize(result);shadow.current=data;setLoaded(data);setEpoch(e=>e+1);setStatus("공용 저장소 연결됨");
  }catch(e){
    setLoaded(null);shadow.current=null;setError(e.message);
    if(e.code==="PORTAL_MISMATCH")await PC.authClient().auth.signOut();
  }finally{setReady(true);setBusy(false);}};
  React.useEffect(()=>{
    if(inviteToken||!hasEntry){setReady(true);return;}
    PC.authClient().auth.getSession().then(({data})=>data.session?refresh():setReady(true)).catch(e=>{setError(e.message);setReady(true);});
    const {data:{subscription}}=PC.authClient().auth.onAuthStateChange(event=>{if(event==="SIGNED_OUT"){setLoaded(null);shadow.current=null;versions.current={};}});
    return ()=>subscription.unsubscribe();
  },[]);
  const save=next=>{
    const changes=PC.changesBetween(shadow.current,next);shadow.current=next;
    if(!changes.length)return Promise.resolve();
    pending.current++;setStatus("저장 중…");
    const task=queue.current.then(async()=>{
      if(blocked.current)throw new Error("저장 충돌을 먼저 확인해 주세요.");
      const result=await PC.call({action:"save",changes:changes.map(c=>({...c,expectedVersion:versions.current[c.id]||0}))});
      Object.assign(versions.current,result.versions);
    });
    queue.current=task.catch(e=>{blocked.current=true;setError(e.message);});
    task.then(()=>{pending.current--;if(!pending.current)setStatus("공용 저장 완료");},()=>{pending.current--;setStatus("저장되지 않은 변경사항이 있습니다.");});
    return task;
  };
  const saveWorkspace=payload=>{
    pending.current++;setStatus("개인 업무 저장 중…");
    const task=queue.current.then(async()=>{
      if(blocked.current)throw new Error("저장 오류를 확인한 후 다시 시도해 주세요.");
      const result=await PC.call({action:"saveWorkspace",version:workspaceVersion.current,payload});
      workspaceVersion.current=result.version;
      return result.payload;
    });
    queue.current=task.catch(e=>{blocked.current=true;setError(e.message);});
    task.then(()=>{pending.current--;if(!pending.current)setStatus("공용 저장 완료");},()=>{pending.current--;setStatus("개인 업무 저장 실패");});
    return task;
  };
  React.useEffect(()=>{const handler=e=>{if(pending.current||blocked.current){e.preventDefault();e.returnValue="";}};window.addEventListener("beforeunload",handler);return()=>window.removeEventListener("beforeunload",handler);},[]);
  React.useEffect(()=>{
    if(!loaded)return;
    const poll=async()=>{if(document.visibilityState!=='visible'||pending.current||blocked.current)return;try{const result=await PC.call({action:'revisions'});if(pending.current)return;const ids=new Set([...Object.keys(versions.current),...Object.keys(result.versions)]);setRemoteAvailable([...ids].some(id=>versions.current[id]!==result.versions[id])||workspaceVersion.current!==result.workspaceVersion);}catch{/* Keep unsaved forms open during a transient connection error. */}};
    const timer=setInterval(poll,60000);return()=>clearInterval(timer);
  },[loaded?.user?.id,epoch]);
  const logout=async()=>{if((pending.current||blocked.current)&&!window.confirm("저장하지 못한 변경사항이 있습니다. 로그아웃할까요?"))return;await queue.current;await PC.authClient().auth.signOut();setLoaded(null);setError("");setStatus("");};
  const parentSave=async(id,p,operation)=>{
    const result=await PC.call({action:"parentSave",studentId:id,operation,version:versions.current[id],profile:p.draft,declarations:p.declarations,parentName:p.parentName,contactPhone:p.contactPhone});
    Object.assign(versions.current,result.versions);setLoaded(old=>({...old,students:old.students.map(s=>s.id===id?result.student:s)}));
  };
  const replyRequest=async(id,requestId,reply)=>{
    const result=await PC.call({action:'requestReply',studentId:id,requestId,reply,version:versions.current[id]});
    Object.assign(versions.current,result.versions);setLoaded(old=>({...old,students:old.students.map(s=>s.id===id?result.student:s)}));
  };
  const importLocal=async()=>{
    if(pending.current||blocked.current){setError("진행 중인 저장 또는 저장 오류를 먼저 확인해 주세요.");return;}
    const raw=localStorage.getItem(STORE);
    if(!raw){setError("이 브라우저에 저장된 기존 LMS 자료가 없습니다. 기존 자료가 있는 브라우저에서 로그인해 주세요.");return;}
    let data;try{data=JSON.parse(raw);}catch(e){setError("기존 자료를 읽지 못했습니다.");return;}
    if(!Array.isArray(data.students)||!data.students.length){setError("가져올 학생 자료가 없습니다.");return;}
    if(!window.confirm(`이 브라우저의 학생 ${data.students.length}명과 학교 데이터를 공용 저장소에 추가할까요? 기존 로컬 자료는 그대로 보관됩니다.`))return;
    setBusy(true);setError("");try{
      let source=localStorage.getItem("prep-cloud-import-source");if(!source){source=crypto.randomUUID();localStorage.setItem("prep-cloud-import-source",source);}
      for(const local of data.students){
        const id=`import-${source}-${local.id}`;
        if(versions.current[id])continue;
        const payload=v2NormalizeStudent({...local,id,owners:[loaded.user.id],owner:loaded.user.id,legacyOwners:local.owners||[local.owner]});
        payload.localPortalArchive=PP.normalize(payload);
        payload.parentPortal={...PP.normalize(payload),enabled:false,submissions:[],publications:[],updates:[]};
        const result=await PC.call({action:"save",changes:[{id,kind:"student",expectedVersion:0,payload}]});Object.assign(versions.current,result.versions);
      }
      if(!versions.current.__schools){const result=await PC.call({action:"save",changes:[{id:"__schools",kind:"config",expectedVersion:0,payload:{schools:data.schools||loaded.schools}}]});Object.assign(versions.current,result.versions);}
      await refresh();setStatus("기존 자료를 공용 저장소로 가져왔습니다.");
    }catch(e){setError(e.message+" 이미 가져온 학생은 보존됩니다. 다시 시도하면 남은 학생부터 가져옵니다.");}finally{setBusy(false);}
  };
  if(!hasEntry)return <div className="portal-access"><PPPortalChoice/><PPContactSupport/></div>;
  if(!ready)return <main className="portal-login">로그인 상태를 확인하고 있습니다.</main>;
  if(!loaded)return <div className="portal-access"><PPCloudLogin inviteToken={inviteToken} onReady={()=>{setInviteToken(null);return refresh();}}/>{error&&<div className="portal-notice warn" role="alert">{error}<button className="btn ghost" onClick={refresh}>다시 연결</button></div>}<PPContactSupport/></div>;
  if(loaded.user.role==="parent")return <>{remoteAvailable&&<div className="portal-notice" role="status">담당자가 자료를 업데이트했습니다. 저장 후 새로 불러오기를 눌러 확인해 주세요.</div>}<PPParentPortal key={epoch} students={loaded.students} saveStudent={parentSave} replyRequest={replyRequest} schools={window.PREP_SCHOOLS||DEFAULT_SCHOOLS} exit={logout}/><button className="btn ghost" style={{position:"fixed",bottom:12,right:12,zIndex:30}} onClick={()=>{if(window.confirm("작성 중인 내용이 있다면 먼저 임시저장해 주세요. 자료를 새로 불러올까요?"))refresh();}} disabled={busy}>새로 불러오기</button>{error&&<div className="portal-notice warn" role="alert">{error}</div>}</>;
return <><div className="cloud-status"><span role="status">{remoteAvailable?"새 업데이트가 있습니다. 작성 내용을 저장한 후 공용 자료를 새로 불러와 주세요.":status}</span><div className="portal-actions"><button className="btn ghost" disabled={busy||!!pending.current} onClick={()=>{if(!blocked.current||window.confirm("저장하지 못한 변경을 닫고 공용 자료를 다시 불러올까요?"))refresh();}}>공용 자료 새로 불러오기</button></div></div>{error&&<div className="portal-notice warn" role="alert">{error}</div>}<V2App key={epoch} cloud={{data:loaded,user:loaded.user,save,logout,importLocal,saveWorkspace}}/></>;
}
ReactDOM.render(<PPEntry />, document.getElementById("root"));
