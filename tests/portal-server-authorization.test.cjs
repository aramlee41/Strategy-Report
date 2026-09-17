const test=require('node:test');
const assert=require('node:assert/strict');
const model=require('../platform/parent-portal-model.js');
function fakeDatabase() {
 const members=[{user_id:'a',role:'admin',active:true,name:'Admin'}, {user_id:'s',role:'staff',active:true,name:'Staff'},{user_id:'p',role:'parent',active:true,name:'Parent'},{user_id:'q',role:'parent',active:true,name:'Other Parent'},{user_id:'disabled',role:'admin',active:false}];
 const profile={id:'one',name:'Student A',basic:{},tests:[],ecs:[],awards:[],academicTerms:[],owners:['s'],stagePlans:{private:'secret'}};
 const portal={...model.normalize(profile),enabled:true,publications:[{id:'r',status:'published',html:'approved',authorId:'a',authorName:'Admin',publishedAt:'2026-01-01'}, {id:'private',status:'draft',html:'never-share'}]};
 const tables={prep_members:members,prep_student_access:[{student_id:'one',user_id:'s',access_role:'staff'},{student_id:'one',user_id:'p',access_role:'parent'},{student_id:'two',user_id:'q',access_role:'parent'}],prep_records:[{id:'one',kind:'student',version:1,payload:{...profile,parentPortal:portal}},{id:'two',kind:'student',version:1,payload:{id:'two',name:'Private B',parentPortal:{...portal,publications:[]}}}],prep_invitations:[]};
 const calls=[];
 const db={auth:{getUser:async token=>({data:{user:members.some(m=>m.user_id===token)?{id:token}:null},error:null})},from(table){
   let rows=tables[table]; let one=false;const filters=[];let operation='select';let patch;
   const q={select(){return q;},eq(k,v){filters.push(x=>x[k]===v);return q;},in(k,vs){filters.push(x=>vs.includes(x[k]));return q;},order(){return q;},limit(){return q;},maybeSingle(){one=true;return q;},single(){one=true;return q;},update(v){operation='update';patch=v;return q;},insert(v){operation='insert';patch=v;return q;},then(resolve,reject){try{let result=rows.filter(x=>filters.every(fn=>fn(x)));if(operation==='update')result.forEach(x=>Object.assign(x,patch));if(operation==='insert'){tables[table].push(patch);result=[patch];}return Promise.resolve({data:one?(result[0]||null):result,error:null}).then(resolve,reject);}catch(e){return Promise.reject(e).then(resolve,reject);}}};return q;
 },async rpc(name,args){calls.push({name,args});if(name==='prep_commit'){
   for(const c of args.changes){const row=tables.prep_records.find(r=>r.id===c.id);if(row&&row.version!==c.expectedVersion)return {error:{code:'40001',message:'VERSION_CONFLICT'}};}
   const versions={};for(const c of args.changes){let row=tables.prep_records.find(r=>r.id===c.id);if(row){row.payload=c.payload;row.version++;}else{row={...c,version:1};tables.prep_records.push(row);}versions[row.id]=row.version;}return {data:versions,error:null};
 }throw new Error('unexpected rpc '+name);}};
 return {db,tables,calls};
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
