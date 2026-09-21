const test=require('node:test');
const assert=require('node:assert/strict');
const model=require('../platform/parent-portal-model.js');
function fakeDatabase() {
 const members=[{user_id:'a',role:'admin',active:true,name:'Admin'}, {user_id:'s',role:'staff',active:true,name:'Staff'},{user_id:'p',role:'parent',active:true,name:'Parent'},{user_id:'q',role:'parent',active:true,name:'Other Parent'},{user_id:'disabled',role:'admin',active:false}];
 const profile={id:'one',name:'Student A',basic:{},tests:[],ecs:[],awards:[],academicTerms:[],owners:['s'],stagePlans:{private:'secret'}};
 const portal={...model.normalize(profile),enabled:true,publications:[{id:'r',status:'published',html:'approved',authorId:'a',authorName:'Admin',publishedAt:'2026-01-01'}, {id:'private',status:'draft',html:'never-share'}]};
 const tables={prep_members:members,prep_student_access:[{student_id:'one',user_id:'s',access_role:'staff'},{student_id:'one',user_id:'p',access_role:'parent'},{student_id:'two',user_id:'q',access_role:'parent'}],prep_records:[{id:'one',kind:'student',version:1,payload:{...profile,parentPortal:portal}},{id:'two',kind:'student',version:1,payload:{id:'two',name:'Private B',parentPortal:{...portal,publications:[]}}}],prep_invitations:[],prep_workspaces:[]};
 const calls=[],queries=[];
 const db={auth:{getUser:async token=>({data:{user:members.some(m=>m.user_id===token)?{id:token}:null},error:null})},from(table){
   let rows=tables[table]; let one=false;const filters=[];let operation='select';let patch;
   const q={select(columns='*'){queries.push({table,columns});return q;},eq(k,v){filters.push(x=>k.includes('->')?String(k.split(/->>?/).reduce((value,key)=>value?.[key],x))===v:x[k]===v);return q;},in(k,vs){filters.push(x=>vs.includes(x[k]));return q;},order(){return q;},limit(){return q;},maybeSingle(){one=true;return q;},single(){one=true;return q;},update(v){operation='update';patch=v;return q;},insert(v){operation='insert';patch=v;return q;},then(resolve,reject){try{let result=rows.filter(x=>filters.every(fn=>fn(x)));if(operation==='update')result.forEach(x=>Object.assign(x,patch));if(operation==='insert'){tables[table].push(patch);result=[patch];}return Promise.resolve({data:one?(result[0]||null):result,error:null}).then(resolve,reject);}catch(e){return Promise.reject(e).then(resolve,reject);}}};return q;
 },async rpc(name,args){calls.push({name,args});if(name==='prep_save_workspace'){const old=tables.prep_workspaces.find(w=>w.user_id===args.actor);if((old?.version||0)!==args.expected_version)return {error:{code:'40001'}};const version=(old?.version||0)+1;if(old)Object.assign(old,{payload:args.content,version});else tables.prep_workspaces.push({user_id:args.actor,payload:args.content,version});return {data:version};}if(name==='prep_commit'){
   for(const c of args.changes){const row=tables.prep_records.find(r=>r.id===c.id);if(row&&row.version!==c.expectedVersion)return {error:{code:'40001',message:'VERSION_CONFLICT'}};}
   const versions={};for(const c of args.changes){let row=tables.prep_records.find(r=>r.id===c.id);if(row){row.payload=c.payload;row.version++;}else{row={...c,version:1};tables.prep_records.push(row);}versions[row.id]=row.version;}return {data:versions,error:null};
 }throw new Error('unexpected rpc '+name);}};
 return {db,tables,calls,queries};
}
async function setup(){const fixture=fakeDatabase();const {createService}=await import('../supabase/functions/prep-portal/service.mjs');return {...fixture,run:createService(fixture.db,model)};}
test('missing, forged and disabled sessions cannot read data',async()=>{
 const {run}=await setup();for(const token of ['', 'forged','disabled'])await assert.rejects(()=>run({action:'load'},token),e=>[401,403].includes(e.status));
});
test('parent receives only their child and approved reports without internal strategy',async()=>{
 const {run}=await setup();const result=await run({action:'load'},'p');assert.deepEqual(result.students.map(s=>s.id),['one']);assert.equal(result.students[0].stagePlans,undefined);assert.deepEqual(result.students[0].parentPortal.publications.map(r=>r.id),['r']);
});
test('parents cannot forge staff writes, other child IDs or account roles',async()=>{
 const {run,calls}=await setup();
 for(const body of [{action:'save',changes:[]},{action:'accounts'},{action:'invite',role:'admin'},{action:'parentSave',studentId:'two',operation:'account'}])await assert.rejects(()=>run(body,'p'),e=>e.status===403);
 assert.equal(calls.length,0);
});
test('staff cannot alter unassigned student, school configuration, or grant staff privileges',async()=>{
 const {run}=await setup();assert.deepEqual((await run({action:'load'},'s')).students.map(s=>s.id),['one']);
 for(const body of [{action:'save',changes:[{id:'two',kind:'student',payload:{},expectedVersion:1}]},{action:'save',changes:[{id:'__schools',kind:'config',payload:{},expectedVersion:0}]},{action:'invite',role:'staff',name:'New',email:'new@example.com'}])await assert.rejects(()=>run(body,'s'),e=>e.status===403);
});
test('parent draft updates cannot smuggle publication or payment changes',async()=>{
 const {run,tables}=await setup();await run({action:'parentSave',studentId:'one',operation:'draft',version:1,profile:{basic:{firstNameKo:'Draft'},publications:[{status:'published'}]},declarations:{},payments:[{amount:0}]},'p');
 const record=tables.prep_records[0];assert.equal(record.payload.basic.firstNameKo,undefined);assert.equal(record.payload.parentPortal.draft.basic.firstNameKo,'Draft');assert.equal(record.payload.parentPortal.publications.length,2);assert.equal(record.payload.parentPortal.payments.length,0);
});
test('server rejects incomplete submissions and stale saves',async()=>{
 const {run,calls}=await setup();await assert.rejects(()=>run({action:'parentSave',studentId:'one',operation:'submit',version:1,profile:{basic:{}},declarations:{}},'p'));assert.equal(calls.length,0);
 await assert.rejects(()=>run({action:'parentSave',studentId:'one',operation:'draft',version:0,profile:{basic:{}},declarations:{}},'p'),e=>e.status===409);
});
test('published snapshot body and author cannot be replaced by staff save',async()=>{
 const {run,tables}=await setup();const payload=JSON.parse(JSON.stringify(tables.prep_records[0].payload));payload.parentPortal.publications=[{id:'r',status:'published',html:'changed',authorId:'forged'}];
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:1,payload}]},'a');
 assert.equal(tables.prep_records[0].payload.parentPortal.publications[0].html,'approved');assert.equal(tables.prep_records[0].payload.parentPortal.publications[0].authorId,'a');
});
test('portal disable revokes access even when authentication remains valid',async()=>{
 const {run,tables}=await setup();tables.prep_records[0].payload.parentPortal.enabled=false;
 assert.equal((await run({action:'load'},'p')).students.length,0);
 await assert.rejects(()=>run({action:'parentSave',studentId:'one',operation:'account'},'p'),e=>e.status===403);
});
test('entry channels reject the wrong role before returning records',async()=>{
 const {run}=await setup();
 for(const [token,portal] of [['p','staff'],['a','parent'],['s','parent'],['a','unknown']]) {
  await assert.rejects(()=>run({action:'load',portal},token),e=>e.code==='PORTAL_MISMATCH'&&e.status===403);
 }
 assert.equal((await run({action:'load',portal:'parent'},'p')).user.role,'parent');
 assert.equal((await run({action:'load',portal:'staff'},'s')).user.role,'staff');
 assert.equal((await run({action:'load',portal:'staff'},'a')).user.role,'admin');
});
test('wrong entry channel cannot bypass checks through write actions',async()=>{
 const {run,calls}=await setup();
 await assert.rejects(()=>run({action:'save',portal:'parent',changes:[]},'a'),e=>e.code==='PORTAL_MISMATCH');
 await assert.rejects(()=>run({action:'parentSave',portal:'staff',studentId:'one',operation:'draft',version:1,profile:{basic:{}}},'p'),e=>e.code==='PORTAL_MISMATCH');
 assert.equal(calls.length,0);
});
test('staff receives only their own workspace and explicit shared-event projection',async()=>{
 const {run,tables}=await setup();tables.prep_workspaces.push({user_id:'a',version:1,payload:{tasks:[{title:'Private task'}],events:[{id:'private',title:'Private meeting',visibility:'private'},{id:'shared',title:'Public time',date:'2026-09-17',visibility:'staff',notes:'Secret notes'}]}});
 const data=await run({action:'load'},'s');assert.deepEqual(data.workspace,{});assert.equal(data.sharedCalendar.length,1);assert.equal(data.sharedCalendar[0].title,'Public time');assert(!JSON.stringify(data).includes('Private task'));assert(!JSON.stringify(data.sharedCalendar).includes('Secret notes'));
});
test('workspace saves use verified actor, enforce versions and deny parents',async()=>{
 const {run,tables}=await setup();const payload={events:[],tasks:[],subscriptions:{}};
 await assert.rejects(()=>run({action:'saveWorkspace',version:0,payload},'p'),e=>e.status===403);
 await run({action:'saveWorkspace',version:0,userId:'a',payload},'s');assert.equal(tables.prep_workspaces[0].user_id,'s');
 await assert.rejects(()=>run({action:'saveWorkspace',version:0,payload},'s'),e=>e.status===409);
});
test('public progress snapshots keep original content and server authorship',async()=>{
 const {run,tables}=await setup();const payload=JSON.parse(JSON.stringify(tables.prep_records[0].payload));payload.parentPortal.progressSnapshots=[{id:'p1',summary:'Approved',authorId:'forged'}];
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:1,payload}]},'s');
 const saved=tables.prep_records[0].payload;assert.equal(saved.parentPortal.progressSnapshots[0].authorId,'s');const patch=JSON.parse(JSON.stringify(saved));patch.parentPortal.progressSnapshots[0].summary='Changed';
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:2,payload:patch}]},'s');assert.equal(tables.prep_records[0].payload.parentPortal.progressSnapshots[0].summary,'Approved');
});
test('resume versions remain immutable and revisions reveal only accessible record IDs',async()=>{
 const {run,tables}=await setup();const payload=JSON.parse(JSON.stringify(tables.prep_records[0].payload));payload.operations={resumeVersions:[{id:'resume-1',name:'Original'}]};
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:1,payload}]},'s');
 const next=JSON.parse(JSON.stringify(tables.prep_records[0].payload));next.operations.resumeVersions[0].name='Changed';
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:2,payload:next}]},'s');assert.equal(tables.prep_records[0].payload.operations.resumeVersions[0].name,'Original');assert.equal(tables.prep_records[0].payload.operations.resumeVersions[0].authorId,'s');
 const revisions=await run({action:'revisions'},'p');assert.deepEqual(Object.keys(revisions.versions),['one']);assert.equal(revisions.students,undefined);
});
test('CRM contacts are private, immutable and stamped with the authenticated author',async()=>{
 const {run,tables}=await setup();const original=JSON.parse(JSON.stringify(tables.prep_records[0].payload));
 original.operations={crm:{status:'active',contacts:[{id:'c',date:'2026-09-17',party:'학부모',channel:'전화',outcome:'연락 완료',summary:'Internal CRM notes',authorId:'forged',createdAt:'2000-01-01'}]}};
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:1,payload:original}]},'s');
 let saved=tables.prep_records[0].payload;assert.equal(saved.operations.crm.contacts[0].authorId,'s');assert.notEqual(saved.operations.crm.contacts[0].createdAt,'2000-01-01');
 const tamper=JSON.parse(JSON.stringify(saved));tamper.operations.crm.contacts[0].summary='Changed history';
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:2,payload:tamper}]},'s');
 saved=tables.prep_records[0].payload;assert.equal(saved.operations.crm.contacts[0].summary,'Internal CRM notes');
 const oldClient=JSON.parse(JSON.stringify(saved));delete oldClient.operations.crm;
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:3,payload:oldClient}]},'s');
 assert.equal(tables.prep_records[0].payload.operations.crm.contacts.length,1);assert(!JSON.stringify(await run({action:'load'},'p')).includes('Internal CRM notes'));
});

test('revision polling selects only version metadata and honors revoked family access',async()=>{
 const {run,tables,queries}=await setup();tables.prep_workspaces.push({user_id:'s',version:4,payload:{tasks:[],events:[]}});
 tables.prep_records.push({id:'__schools',kind:'config',version:3,payload:{schools:[]}});
 const staff=await run({action:'revisions'},'s');assert.deepEqual(staff,{versions:{one:1,__schools:3},workspaceVersion:4});
 assert(queries.filter(q=>q.table==='prep_records').every(q=>q.columns==='id,version'));
 assert(queries.filter(q=>q.table==='prep_workspaces').every(q=>q.columns==='version'));
 tables.prep_records[0].payload.parentPortal.enabled=false;
 const family=await run({action:'revisions'},'p');assert.deepEqual(family,{versions:{},workspaceVersion:0});
 const other=await run({action:'revisions'},'q');assert.deepEqual(Object.keys(other.versions),['two']);
});
test('CRM saved filters stay in the authenticated private workspace and are bounded',async()=>{
 const {run,tables}=await setup();const payload={events:[],tasks:[],subscriptions:{},crmViews:[{id:'v',name:'My overdue students',filters:{attention:'overdue',owner:'s',arbitrary:'discard'}}]};
 await run({action:'saveWorkspace',version:0,payload},'s');assert.equal(tables.prep_workspaces[0].payload.crmViews[0].filters.arbitrary,undefined);
 assert.equal((await run({action:'load'},'a')).workspace.crmViews,undefined);
 await assert.rejects(()=>run({action:'saveWorkspace',version:1,payload:{...payload,crmViews:Array(21).fill(payload.crmViews[0])}},'s'));
});
test('consultants cannot use CRM bulk assignment to change student permissions',async()=>{
 const {run,tables}=await setup();const payload=JSON.parse(JSON.stringify(tables.prep_records[0].payload));payload.owners=['a'];payload.owner='a';
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:1,payload}]},'s');assert.deepEqual(tables.prep_records[0].payload.owners,['s']);
});
test('material requests use a guarded parent reply and consultant review cycle',async()=>{
 const {run,tables}=await setup();let payload=JSON.parse(JSON.stringify(tables.prep_records[0].payload));
 payload.parentPortal.requests=[{id:'r',title:'Transcript',category:'성적표',dueDate:'2026-10-01',status:'requested',authorId:'forged'}];
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:1,payload}]},'s');
 assert.equal(tables.prep_records[0].payload.parentPortal.requests[0].authorId,'s');
 await assert.rejects(()=>run({action:'requestReply',studentId:'two',requestId:'r',version:1,reply:{note:'attack'}},'p'),e=>e.status===403);
 await assert.rejects(()=>run({action:'requestReply',studentId:'one',requestId:'r',version:2,reply:{note:'staff cannot reply'}},'s'),e=>e.status===403);
 const response=await run({action:'requestReply',studentId:'one',requestId:'r',version:2,reply:{note:'Parent response',url:'https://example.com/report.pdf',status:'accepted'}},'p');assert.equal(response.student.parentPortal.requests[0].status,'submitted');
 payload=JSON.parse(JSON.stringify(tables.prep_records[0].payload));payload.parentPortal.requests[0].status='returned';
 await assert.rejects(()=>run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:3,payload}]},'s'),/사유/);
 payload.parentPortal.requests[0].reviewNote='Please send all pages';payload.parentPortal.requests[0].reply.note='Tampered';
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:3,payload}]},'s');assert.equal(tables.prep_records[0].payload.parentPortal.requests[0].reply.note,'Parent response');
 await run({action:'requestReply',studentId:'one',requestId:'r',version:4,reply:{note:'All pages'}},'p');
 payload=JSON.parse(JSON.stringify(tables.prep_records[0].payload));payload.parentPortal.requests[0].status='accepted';
 await run({action:'save',changes:[{id:'one',kind:'student',expectedVersion:5,payload}]},'s');assert.equal(tables.prep_records[0].payload.parentPortal.requests[0].replies.length,2);
 assert.deepEqual(tables.prep_records[0].payload.parentPortal.requests[0].reviews.map(r=>r.status),['returned','accepted']);
 assert(tables.prep_records[0].payload.parentPortal.requests[0].reviews.every(r=>r.authorId==='s'));
});
test('only admins maintain staff teams; team metadata never grants student access',async()=>{
 const {run,tables}=await setup();const changes=[{id:'__settings',kind:'config',expectedVersion:0,payload:{staffTeams:{s:['시니어보딩','시니어보딩']},teamEvents:[]}}];
 await assert.rejects(()=>run({action:'save',changes},'s'),e=>e.status===403);
 await run({action:'save',changes},'a');assert.deepEqual((await run({action:'load'},'a')).staffTeams,{s:['시니어보딩']});
 assert.deepEqual((await run({action:'load'},'s')).students.map(s=>s.id),['one']);
 await run({action:'save',changes:[{id:'__settings',kind:'config',expectedVersion:1,payload:{teamEvents:[{id:'event'}]}}]},'a');
 assert.deepEqual((await run({action:'load'},'a')).staffTeams,{s:['시니어보딩']});
 await assert.rejects(()=>run({action:'save',changes:[{id:'__settings',kind:'config',expectedVersion:2,payload:{staffTeams:{p:['대학']}}}]},'a'),/담당자/);
 await assert.rejects(()=>run({action:'save',changes:[{id:'__settings',kind:'config',expectedVersion:2,payload:{staffTeams:{s:['Unknown']}}}]},'a'),/팀/);
 assert(!JSON.stringify(await run({action:'load'},'p')).includes('staffTeams'));
});
test('only admins can delete students and deletion immediately removes staff and parent visibility',async()=>{
 const {run,tables}=await setup();
 await assert.rejects(()=>run({action:'deleteStudents',students:[{id:'one',expectedVersion:1}]},'s'),error=>error.status===403);
 await assert.rejects(()=>run({action:'deleteStudents',students:[{id:'one',expectedVersion:99}]},'a'),error=>error.status===409);
 const result=await run({action:'deleteStudents',students:[{id:'one',expectedVersion:1}]},'a');
 assert.deepEqual(result.deleted,['one']);assert.equal(result.versions.one,2);assert(tables.prep_records[0].payload.deletedAt);assert.equal(tables.prep_records[0].payload.parentPortal.enabled,false);
 assert.deepEqual((await run({action:'load'},'a')).students.map(student=>student.id),['two']);
 assert.deepEqual((await run({action:'load'},'p')).students,[]);
});
