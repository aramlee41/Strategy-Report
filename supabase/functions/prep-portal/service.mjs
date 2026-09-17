export class PortalError extends Error {
  constructor(message, status = 400, code = 'INVALID_REQUEST') { super(message); this.status = status; this.code = code; }
}
export const allowedOrigins = new Set(['https://strategy-report-lake.vercel.app', 'https://aramlee41.github.io', 'http://127.0.0.1:8765', 'http://localhost:8765']);
export function shapeProfile(profile) {
  if (!profile || typeof profile !== 'object' || Array.isArray(profile)) throw new PortalError('학생 정보 형식을 확인해 주세요.');
  if (!profile.basic || typeof profile.basic !== 'object' || Array.isArray(profile.basic)) throw new PortalError('기본 정보를 확인해 주세요.');
  for (const key of ['previousSchools', 'academicTerms', 'tests', 'ecs', 'awards']) if (profile[key] !== undefined && !Array.isArray(profile[key])) throw new PortalError('입력 형식을 확인해 주세요.');
  for (const key of ['addresses','nationalities','phones','firstLanguages','homeLanguages','communicationLanguages','siblings']) if (profile.basic[key] !== undefined && !Array.isArray(profile.basic[key])) throw new PortalError('기본 정보 형식을 확인해 주세요.');
  return profile;
}
export function sharedCalendar(workspaces,members) {
  const names=new Map(members.map(m=>[m.user_id,m.name]));
  return workspaces.filter(w=>names.has(w.user_id)).flatMap(w=>(Array.isArray(w.payload?.events)?w.payload.events:[]).filter(e=>e.visibility==='staff').map(e=>({id:e.id,title:e.title,date:e.date,time:e.time||'',timezone:e.timezone||'',ownerId:w.user_id,ownerName:names.get(w.user_id)})));
}
export function createService(db, model) {
  const requirePortal = (role,portal) => {
    // Older clients omit the entry channel; server membership still enforces data scope.
    if (portal == null) return;
    if ((portal==='parent' && role==='parent') || (portal==='staff' && ['admin','staff'].includes(role))) return;
    throw new PortalError(role==='parent'?'학생·학부모 로그인으로 접속해 주세요.':'직원 로그인으로 접속해 주세요.',403,'PORTAL_MISMATCH');
  };
  const check = result => { if (result.error) { if (result.error.code === '40001' || result.error.message?.includes('VERSION_CONFLICT')) throw new PortalError('다른 사용자가 자료를 변경했습니다. 새로 불러온 후 다시 저장해 주세요.',409,'VERSION_CONFLICT'); throw new PortalError('요청을 처리하지 못했습니다. 다시 로그인하거나 담당자에게 문의해 주세요.',400,result.error.code || 'DATABASE_ERROR'); } return result.data; };
  const hash = async value => [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(x=>x.toString(16).padStart(2,'0')).join('');
  const memberFor = async token => {
    if (!token) throw new PortalError('로그인이 필요합니다.',401,'AUTH_REQUIRED');
    const {data,error} = await db.auth.getUser(token);
    if (error || !data?.user) throw new PortalError('로그인이 만료되었습니다. 다시 로그인해 주세요.',401,'AUTH_REQUIRED');
    const m = check(await db.from('prep_members').select('*').eq('user_id',data.user.id).eq('active',true).maybeSingle());
    if (!m) throw new PortalError('활성화된 LMS 계정이 없습니다. 담당자에게 초대를 요청해 주세요.',403,'ACCESS_DENIED');
    return m;
  };
  const access = async (member, id) => {
    if (member.role === 'admin') return true;
    return !!check(await db.from('prep_student_access').select('student_id').eq('student_id',id).eq('user_id',member.user_id).eq('access_role',member.role === 'parent' ? 'parent' : 'staff').maybeSingle());
  };
  const recordFor = async (member,id) => {
    if (!id || !(await access(member,id))) throw new PortalError('이 학생 자료에 접근할 수 없습니다.',403,'ACCESS_DENIED');
    const r=check(await db.from('prep_records').select('*').eq('id',id).eq('kind','student').maybeSingle());
    if (!r || (member.role==='parent' && !r.payload.parentPortal?.enabled)) throw new PortalError('이 학생 자료에 접근할 수 없습니다.',403,'ACCESS_DENIED');
    return r;
  };
  const versionsOf = records => Object.fromEntries(records.map(r=>[r.id,r.version]));
  const staffOnly = m => { if (!['admin','staff'].includes(m.role)) throw new PortalError('담당자 권한이 필요합니다.',403,'ACCESS_DENIED'); };
  const adminOnly = m => { if (m.role!=='admin') throw new PortalError('관리자 권한이 필요합니다.',403,'ACCESS_DENIED'); };
  async function load(member) {
    let records;
    if (member.role==='admin') records=check(await db.from('prep_records').select('*').order('id'));
    else {
      const grants=check(await db.from('prep_student_access').select('student_id').eq('user_id',member.user_id).eq('access_role',member.role==='parent'?'parent':'staff'));
      records=grants.length ? check(await db.from('prep_records').select('*').in('id',grants.map(g=>g.student_id)).order('id')) : [];
      if (member.role==='staff') records.push(...check(await db.from('prep_records').select('*').eq('kind','config')));
    }
    const rows=records.filter(r=>r.kind==='student' && (member.role!=='parent'||r.payload.parentPortal?.enabled));
    if (member.role==='parent') return {user:{id:member.user_id,name:member.name,email:member.email,role:member.role},students:rows.map(r=>model.publicStudent({...r.payload,id:r.id})),versions:versionsOf(rows)};
    const staff=check(await db.from('prep_members').select('user_id,email,name,role,active').in('role',['admin','staff']).eq('active',true));
    const workspaces=check(await db.from('prep_workspaces').select('user_id,payload,version'));
    const mine=workspaces.find(w=>w.user_id===member.user_id);
    const settings=records.find(r=>r.id==='__settings')?.payload||{};
    return {user:{id:member.user_id,name:member.name,email:member.email,role:member.role},students:rows.map(r=>({...r.payload,id:r.id})),staffAccounts:staff.map(m=>({id:m.user_id,name:m.name,email:m.email,role:m.role})),schools:records.find(r=>r.id==='__schools')?.payload.schools,teamEvents:settings.teamEvents||[],opportunities:settings.opportunities,workspace:mine?.payload||{},workspaceVersion:mine?.version||0,sharedCalendar:sharedCalendar(workspaces,staff),versions:versionsOf(records)};
  }
  async function redeem(body,token) {
    if (!/^[a-f0-9]{64}$/.test(body.inviteToken||'')) throw new PortalError('유효하지 않은 초대입니다.',403,'INVALID_INVITATION');
    const claim=crypto.randomUUID();
    const inv=check(await db.rpc('prep_reserve_invitation',{hash:await hash(body.inviteToken),claim}));
    let done=false;
    try {
      requirePortal(inv.role,body.portal);
      let account;
      if (token) {
        const result=await db.auth.getUser(token);
        if(result.error || result.data.user?.email?.toLowerCase()!==inv.email.toLowerCase()) throw new PortalError('초대받은 이메일 계정으로 로그인해 주세요.',403,'EMAIL_MISMATCH');
        account=result.data.user;
      } else {
        if (typeof body.password!=='string' || body.password.length<12 || body.password.length>128) throw new PortalError('비밀번호를 12자 이상 128자 이하로 설정해 주세요.');
        const result=await db.auth.admin.createUser({email:inv.email,password:body.password,email_confirm:true});
        if(result.error) throw new PortalError('이미 가입한 이메일이라면 기존 비밀번호로 로그인한 후 초대를 수락해 주세요.',409,'USE_EXISTING_LOGIN');
        account=result.data.user;
      }
      check(await db.rpc('prep_finish_invitation',{invitation_id:inv.id,claim,account_id:account.id}));
      done=true;
      return {email:inv.email,name:inv.name,role:inv.role};
    } finally {
      if (!done) await db.from('prep_invitations').update({status:'pending',reservation:null,reserved_at:null}).eq('id',inv.id).eq('reservation',claim).eq('status','reserved');
    }
  }
  return async function dispatch(body,token) {
    if (!body || typeof body!=='object') throw new PortalError('요청 형식이 올바르지 않습니다.');
    if(body.action==='redeemInvitation') return redeem(body,token);
    const member=await memberFor(token);
    requirePortal(member.role,body.portal);
    if(body.action==='load') return load(member);
    if(body.action==='revisions') {
      const current=await load(member);
      return {versions:current.versions,workspaceVersion:current.workspaceVersion||0};
    }
    if(body.action==='saveWorkspace') {
      staffOnly(member);
      const p=body.payload;
      if(!Number.isSafeInteger(body.version)||body.version<0||!p||typeof p!=='object'||Array.isArray(p))throw new PortalError('개인 업무 저장 형식을 확인해 주세요.');
      for(const key of ['events','tasks'])if(!Array.isArray(p[key])||p[key].length>2000)throw new PortalError('개인 업무 목록을 확인해 주세요.');
      for(const e of p.events)if(!e.id||!e.title||!/^\d{4}-\d{2}-\d{2}$/.test(e.date)||!['private','staff'].includes(e.visibility))throw new PortalError('일정 제목·날짜·공개 범위를 확인해 주세요.');
      const payload={events:p.events,tasks:p.tasks,subscriptions:{schoolIds:Array.isArray(p.subscriptions?.schoolIds)?p.subscriptions.schoolIds:[],staffIds:Array.isArray(p.subscriptions?.staffIds)?p.subscriptions.staffIds:[],team:!!p.subscriptions?.team,marketing:!!p.subscriptions?.marketing},readAt:String(p.readAt||'')};
      const version=check(await db.rpc('prep_save_workspace',{actor:member.user_id,expected_version:body.version,content:payload}));
      return {version,payload};
    }
    if(body.action==='parentSave') {
      if(member.role!=='parent') throw new PortalError('학부모 계정으로 로그인해 주세요.',403,'ACCESS_DENIED');
      const r=await recordFor(member,body.studentId);
      if(!Number.isSafeInteger(body.version)||body.version<1) throw new PortalError('자료를 새로 불러온 후 저장해 주세요.',409,'VERSION_CONFLICT');
      let portal=model.normalize(r.payload);
      if(body.operation==='account') {
        portal={...portal,parentName:String(body.parentName||'').slice(0,120),contactPhone:String(body.contactPhone||'').slice(0,80)};
      } else {
        const profile=model.pickProfile(shapeProfile(body.profile));
        const declarations={};
        for(const k of ['grades','tests','ecs','awards']) { declarations[k]=String(body.declarations?.[k]||''); declarations[k+'Due']=String(body.declarations?.[k+'Due']||''); }
        if(body.operation==='submit') portal=model.submit(r.payload,profile,declarations);
        else if(body.operation==='draft') portal=model.saveDraft(r.payload,profile,declarations);
        else throw new PortalError('저장 요청을 확인해 주세요.');
      }
      const versions=check(await db.rpc('prep_commit',{actor:member.user_id,event_name:'parent_'+body.operation,changes:[{id:r.id,kind:'student',expectedVersion:body.version,payload:{...r.payload,parentPortal:portal}}]}));
      return {student:model.publicStudent({...r.payload,parentPortal:portal}),versions};
    }
    if(body.action==='save') {
      staffOnly(member);
      if(!Array.isArray(body.changes)||body.changes.length>250) throw new PortalError('저장 항목을 확인해 주세요.');
      const changes=[];
      for(const change of body.changes) {
        if(!Number.isSafeInteger(change.expectedVersion)||change.expectedVersion<0) throw new PortalError('자료를 새로 불러온 후 저장해 주세요.',409,'VERSION_CONFLICT');
        if(typeof change.id!=='string'||change.id.length>160||!change.payload||typeof change.payload!=='object') throw new PortalError('저장 항목을 확인해 주세요.');
        if(change.kind==='config') { adminOnly(member); if(!['__schools','__settings'].includes(change.id)) throw new PortalError('알 수 없는 설정입니다.'); changes.push(change); continue; }
        if(change.kind!=='student'||change.id.startsWith('__')) throw new PortalError('저장 항목을 확인해 주세요.');
        const existing=check(await db.from('prep_records').select('*').eq('id',change.id).maybeSingle());
        if(existing && !(await access(member,change.id))) throw new PortalError('담당 학생만 수정할 수 있습니다.',403,'ACCESS_DENIED');
        const payload={...change.payload,id:change.id};
        delete payload.password;
        if(member.role!=='admin') { payload.owners=existing?.payload.owners||[member.user_id]; payload.owner=payload.owners[0]; }
        const proposed=model.normalize(payload);
        const prior=existing ? model.normalize(existing.payload) : null;
        // A staff editor cannot replace already published report content or its provenance.
        proposed.publications=(proposed.publications||[]).map(p=>{
          const old=prior?.publications.find(x=>x.id===p.id);
          if(old) return {...old,status:old.status==='revoked'?'revoked':(p.status==='revoked'?'revoked':old.status),...(old.status!=='revoked'&&p.status==='revoked'?{revokedAt:new Date().toISOString()}: {})};
          if(p.status!=='published'||typeof p.html!=='string'||p.html.length>1500000) throw new PortalError('배포 보고서의 내용을 확인해 주세요.');
          return {...p,authorId:member.user_id,authorName:member.name,publishedAt:new Date().toISOString(),status:'published'};
        });
        for(const old of prior?.publications||[]) if(!proposed.publications.some(x=>x.id===old.id)) proposed.publications.push(old);
        const snapshots=Array.isArray(proposed.progressSnapshots)?proposed.progressSnapshots:[];
        const oldSnapshots=Array.isArray(prior?.progressSnapshots)?prior.progressSnapshots:[];
        proposed.progressSnapshots=snapshots.map(p=>{
          const old=oldSnapshots.find(x=>x.id===p.id);
          if(old)return {...old,status:old.status==='revoked'||p.status==='revoked'?'revoked':'published'};
          if(!p.id||typeof p.summary!=='string')throw new PortalError('공개 진행상황 내용을 확인해 주세요.');
          return {...p,status:'published',authorId:member.user_id,authorName:member.name,publishedAt:new Date().toISOString()};
        });
        for(const p of oldSnapshots)if(!proposed.progressSnapshots.some(x=>x.id===p.id))proposed.progressSnapshots.push(p);
        payload.parentPortal=proposed;
        const incomingResumes=payload.operations?.resumeVersions;
        if(incomingResumes!==undefined) {
          if(!Array.isArray(incomingResumes)||incomingResumes.length>200)throw new PortalError('Resume 저장본 목록을 확인해 주세요.');
          const oldResumes=existing?.payload.operations?.resumeVersions||[];
          const immutable=incomingResumes.map(r=>oldResumes.find(x=>x.id===r.id)||{...r,authorId:member.user_id,authorName:member.name,createdAt:new Date().toISOString()});
          for(const r of oldResumes)if(!immutable.some(x=>x.id===r.id))immutable.push(r);
          payload.operations={...payload.operations,resumeVersions:immutable};
        }
        if(existing) {
          const groups=[['기본 정보',['basic','school','previousSchools','program','owners','stage']],['학업·시험',['academicTerms','tests']],['EC·수상',['ecs','awards']],['지원·실행',['tasks','actionPlans','applications']]];
          const changed=groups.filter(([,keys])=>keys.some(k=>JSON.stringify(existing.payload[k])!==JSON.stringify(payload[k]))).map(([name])=>name);
          if(changed.length) {
            const now=new Date().toISOString(),id='staff-update-'+member.user_id+'-'+now.slice(0,10),o=payload.operations||{},incomingUpdates=Array.isArray(o.updates)?o.updates:[],priorUpdates=[...new Map([...(existing.payload.operations?.updates||[]),...incomingUpdates].map(x=>[x.id,x])).values()].sort((a,b)=>String(b.at).localeCompare(String(a.at)));
            payload.operations={...o,updates:[{id,title:'학생 자료 업데이트',detail:member.name+' · '+changed.join(', '),at:now,authorId:member.user_id},...priorUpdates.filter(x=>x.id!==id)].slice(0,300)};
          }
        }
        changes.push({...change,payload});
      }
      const versions=check(await db.rpc('prep_commit',{actor:member.user_id,event_name:'staff_save',changes}));
      return {versions};
    }
    if(body.action==='invite') {
      staffOnly(member);
      if(!['parent','staff','admin'].includes(body.role)||typeof body.email!=='string'||!/^\S+@\S+\.\S+$/.test(body.email)||!String(body.name||'').trim()) throw new PortalError('이름과 이메일, 역할을 확인해 주세요.');
      if(body.role!=='parent') adminOnly(member);
      const ids=[...new Set(Array.isArray(body.studentIds)?body.studentIds:[])];
      if(body.role==='parent' && !ids.length) throw new PortalError('연결할 학생을 선택해 주세요.');
      for(const id of ids) await recordFor(member,id);
      const raw=[...crypto.getRandomValues(new Uint8Array(32))].map(x=>x.toString(16).padStart(2,'0')).join('');
      const invitation={token_hash:await hash(raw),email:body.email.trim().toLowerCase(),name:String(body.name).trim().slice(0,120),role:body.role,student_ids:ids,created_by:member.user_id};
      const saved=check(await db.from('prep_invitations').insert(invitation).select('id,email,name,role,expires_at').single());
      return {...saved,inviteToken:raw};
    }
    if(body.action==='accounts') {
      staffOnly(member);
      let query=db.from('prep_invitations').select('id,email,name,role,status,expires_at,created_at').order('created_at',{ascending:false}).limit(100);
      if(member.role!=='admin') query=query.eq('created_by',member.user_id);
      const invitations=check(await query);
      const members=member.role==='admin'?check(await db.from('prep_members').select('user_id,name,email,role,active').order('name')):[];
      return {invitations,members};
    }
    if(body.action==='revokeInvitation') {
      staffOnly(member);
      const inv=check(await db.from('prep_invitations').select('id,created_by').eq('id',body.id).maybeSingle());
      if(!inv || (member.role!=='admin'&&inv.created_by!==member.user_id)) throw new PortalError('접근 권한이 없습니다.',403,'ACCESS_DENIED');
      check(await db.from('prep_invitations').update({status:'revoked'}).eq('id',inv.id).in('status',['pending','reserved']));
      return {ok:true};
    }
    if(body.action==='disableAccount') {
      adminOnly(member);
      if(body.id===member.user_id) throw new PortalError('자신의 계정은 중지할 수 없습니다.');
      check(await db.from('prep_members').update({active:!body.disabled}).eq('user_id',body.id));
      return {ok:true};
    }
    throw new PortalError('알 수 없는 요청입니다.');
  };
}
