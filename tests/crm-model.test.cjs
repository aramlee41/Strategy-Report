const test=require('node:test');const assert=require('node:assert/strict');
const C=require('../platform/crm-model.js');const O=require('../platform/operations-model.js');const P=require('../platform/parent-portal-model.js');
const actor={id:'staff',name:'Staff'};
test('CRM defaults are additive and independent of admissions stage',()=>{
 const s={stage:'stage4',operations:{goals:[{id:'g'}]}};assert.equal(C.crm(s).status,'active');assert.equal(C.crm(s).cadence,14);
 const patch=C.settings(s,{status:'completed',cadence:30,tags:['EC 집중','EC 집중']});assert.equal(patch.operations.goals[0].id,'g');assert.deepEqual(patch.operations.crm.tags,['EC 집중']);assert.equal(s.operations.crm,undefined);assert.equal(s.stage,'stage4');
});
test('contact log creates exactly one linked private followup without mutating input',()=>{
 const st={id:'s',tasks:[],operations:{goals:[{id:'g'}]}};
 const c={id:'c',date:'2026-09-17',party:'학부모',channel:'전화',outcome:'연락 완료',summary:'Private consultation',nextStep:'Send checklist',nextDate:'2026-09-20'};
 const saved=C.saveContact(st,c,actor,'2026-09-17T12:00:00Z');assert.equal(st.tasks.length,0);assert.equal(saved.tasks.length,1);assert.equal(saved.tasks[0].ownerId,'staff');assert.equal(saved.tasks[0].shareWithFamily,false);assert.equal(C.crm(saved).contacts[0].followupTaskId,saved.tasks[0].id);assert(O.eventRows(saved).some(e=>e.title==='Send checklist'));assert.throws(()=>C.saveContact(saved,c,actor),/이미/);assert(!JSON.stringify(P.publicStudent(saved)).includes('Private consultation'));
});
test('contact validation rejects future dates, invalid dates and incomplete followup',()=>{
 const c={date:'2026-09-17',party:'학부모',channel:'전화',outcome:'연락 완료',summary:'A'};
 assert.throws(()=>C.saveContact({}, {...c,date:'2026-02-31'},actor,'2026-09-17T00:00:00Z'),/날짜/);
 assert.throws(()=>C.saveContact({}, {...c,date:'2026-09-18'},actor,'2026-09-17T00:00:00Z'),/미래/);
 assert.throws(()=>C.saveContact({}, {...c,nextStep:'Follow up'},actor,'2026-09-17T00:00:00Z'),/기한/);
});
test('attempts and waiting replies do not reset successful contact cadence',()=>{
 const st={operations:{crm:{cadence:14,contacts:[{date:'2026-09-15',outcome:'연락 시도'},{date:'2026-08-20',outcome:'연락 완료'}]}}};
 assert.equal(C.lastContact(st,'2026-09-17'),'2026-08-20');assert(C.attention(st,'2026-09-17').some(a=>a.key==='contact'));
 st.operations.meetings=[{date:'2026-09-16',appliedAt:'2026-09-16'}];assert.equal(C.lastContact(st,'2026-09-17'),'2026-09-16');assert(!C.attention(st,'2026-09-17').some(a=>a.key==='contact'));
});
test('attention distinguishes missing records from actual overdue work and suppresses completed students',()=>{
 const st={id:'s',tasks:[{id:'t',title:'Late',deadline:'2026-09-10',done:false}],parentPortal:{submissions:[{status:'submitted'}]}};
 const a=C.attention(st,'2026-09-17');assert.equal(a[0].key,'overdue');assert.equal(a.find(x=>x.key==='contactMissing').level,1);assert(a.some(x=>x.tab==='familyReview'));
 assert.deepEqual(C.attention({...st,operations:{crm:{status:'completed'}}},'2026-09-17'),[]);
});
test('student filters combine owner, program, CRM state and attention',()=>{
 const students=[{id:'a',name:'Alice',program:'Boarding',owners:['staff'],stage:'stage1',tasks:[{title:'Late',date:'2026-01-01'}]},{id:'b',name:'Bob',program:'Prep',owners:['other'],operations:{crm:{status:'completed'}}}];
 assert.deepEqual(C.filterStudents(students,{owner:'staff',program:'Boarding',status:'active',attention:'overdue'},'2026-09-17').map(s=>s.id),['a']);assert.deepEqual(C.filterStudents(students,{status:'completed'}).map(s=>s.id),['b']);
});
test('bulk task creation is scoped, idempotent and preserves nonselected students',()=>{
 const students=[{id:'a',owners:['one']},{id:'b',owners:['two']},{id:'c'}],draft={title:'Review',date:'2026-10-01',ownerMode:'primary'};
 const next=C.batchTasks(students,['a','b'],draft,actor,'batch');assert.equal(next[0].tasks[0].ownerId,'one');assert.equal(next[1].tasks[0].ownerId,'two');assert.equal(next[2],students[2]);assert.equal(C.batchTasks(next,['a','b'],draft,actor,'batch')[0].tasks.length,1);assert.throws(()=>C.batchTasks(students,['unknown'],draft,actor),/선택/);
});
test('checklists are dated editable tasks and duplicate import is prevented',()=>{
 const patch=C.checklist({},'onboarding','2026-09-17','staff');assert.equal(patch.tasks.length,4);assert.equal(patch.tasks[0].deadline,'2026-09-19');assert.throws(()=>C.checklist(patch,'onboarding','2026-09-17'),/이미/);assert.equal(C.checklist(patch,'semester','2026-09-17').tasks.length,8);
});
test('workload separates explicit task ownership and shared undelgated tasks',()=>{
 const students=[{id:'s',owners:['a','b'],tasks:[{title:'Owned',ownerId:'a',deadline:'2026-09-10'},{title:'Shared',deadline:'2026-09-20'}]},{id:'closed',owners:['a'],operations:{crm:{status:'completed'}},tasks:[{title:'Old'}]}];
 const [a,b]=C.workload(students,[{id:'a'},{id:'b'}],'2026-09-17');assert.equal(a.students,1);assert.equal(a.shared,1);assert.equal(a.tasks,2);assert.equal(b.tasks,1);assert.equal(b.overdue,0);
});
test('duplicate detection requires a name and exact birth date and never merges',()=>{
 const students=[{id:'a',name:'홍 정협',basic:{dob:'2012-01-01'}},{id:'b',name:'홍정협',basic:{dob:'2012-01-01'}},{id:'c',name:'홍정협'},{id:'d',name:'홍정협',basic:{dob:'2013-01-01'}}];assert.equal(C.duplicateCandidates(students).length,1);assert.equal(C.duplicateCandidates(students)[0].length,2);assert.equal(students.length,4);
});
test('material request alerts stop after review and retain calendar provenance',()=>{
 const s={id:'a',parentPortal:{requests:[{id:'r1',title:'Transcript',dueDate:'2026-09-10',status:'requested'},{id:'r2',title:'Test',dueDate:'2026-09-20',status:'submitted'}]}};
 assert(C.attention(s,'2026-09-17').some(a=>a.key==='requestOverdue'&&a.tab==='requests'));
 assert(C.attention(s,'2026-09-17').some(a=>a.key==='requestReview'));
 s.parentPortal.requests.forEach(r=>r.status='accepted');
 assert(!C.attention(s,'2026-09-17').some(a=>a.key.startsWith('request')));
 assert(O.eventRows(s).filter(e=>e.source==='material').every(e=>e.done&&e.studentId==='a'));
});
test('admin handover moves only unfinished tasks owned by removed consultants at their source',()=>{
 const st={id:'a',owners:['old','shared'],tasks:[{id:'t',title:'Open',ownerId:'old'},{id:'done',title:'Done',ownerId:'old',done:true},{id:'stay',title:'Shared',ownerId:'shared'}],operations:{goals:[{id:'g',title:'Goal',ownerId:'old',milestones:[{id:'m',title:'Step'}]}]},applications:[{id:'app',school:'School',requirements:[{id:'r',title:'Essay',ownerId:'old'}]}]};
 const next=C.reassignOwners(st,['new','shared'],true,{id:'admin',name:'Admin',role:'admin'});
 assert.equal(next.tasks[0].ownerId,'new');assert.equal(next.tasks[1].ownerId,'old');assert.equal(next.tasks[2].ownerId,'shared');
 assert.equal(next.operations.goals[0].milestones[0].ownerId,'new');assert.equal(next.applications[0].requirements[0].ownerId,'new');assert.equal(st.tasks[0].ownerId,'old');
 assert.equal(C.handoffTasks(st,['new','shared']).length,3);
 assert.equal(C.reassignOwners(st,['new'],false,{role:'admin'}).tasks[0].ownerId,'old');
 assert.throws(()=>C.reassignOwners(st,['new'],true,{role:'staff'}),/관리자/);
});
test('team scope uses exact program/team values and separates joint-owner tasks',()=>{
 const a={id:'a',program:'시니어 보딩',owners:['s','t'],tasks:[{id:'x',title:'S',ownerId:'s',deadline:'2026-01-01'},{id:'y',title:'T',ownerId:'t',deadline:'2026-01-01'}]},b={id:'b',program:'대학원',owners:['t']},c={id:'c',program:'대학',owners:['s']};
 assert.equal(C.teamOfStudent(a),'시니어보딩');assert.deepEqual(C.dashboardScope([a,b,c],'대학').map(s=>s.id),['c']);
 assert.deepEqual(C.teamMembers([a,b,c],[{id:'s'},{id:'t'},{id:'empty'}],{empty:['시니어보딩']},'시니어보딩').map(p=>p.id),['s','t','empty']);
 assert.equal(C.attention(a,'2026-09-18','s').find(x=>x.key==='overdue').title,'지연 업무 1건');
 assert.deepEqual(O.tasks(a).filter(t=>C.taskForOwner(t,a,'s')).map(t=>t.id),['x']);
 assert.equal(C.teamOfStudent({...a,operations:{crm:{team:'플래티넘'}}}),'플래티넘');
 assert.equal(C.teamOfStudent({program:'알 수 없는 프로그램'}),'');
 assert.deepEqual(C.dashboardScope([a],'보딩프렙','s'),[]);
});
