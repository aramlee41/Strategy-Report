const test=require('node:test');const assert=require('node:assert/strict');const O=require('../platform/operations-model.js');
test('meeting reflection is atomic, links existing EC and cannot be applied twice',()=>{
 const st={id:'s',ecs:[{activityId:'ec-1',name:'Baseball',hours:'2',core:true}],awards:[],tasks:[],calendarEvents:[],applications:[{school:'Keep me'}]};
 const meeting={id:'m1',title:'Coaching',date:'2026-09-17',notes:'private',effects:[{id:'e1',kind:'ec',targetId:'ec-1',hours:'4'},{id:'e2',kind:'task',title:'Draft',date:'2026-09-21'},{id:'e3',kind:'event',title:'Review',date:'2026-09-23'}]};
 const next=O.applyMeeting(st,meeting);assert.equal(st.ecs[0].hours,'2');assert.equal(next.ecs.length,1);assert.equal(next.ecs[0].hours,'4');assert.equal(next.ecs[0].core,true);assert.equal(next.tasks.length,1);assert.equal(next.calendarEvents.length,1);assert.deepEqual(next.applications,st.applications);assert.throws(()=>O.applyMeeting(next,meeting),/이미/);
 assert.throws(()=>O.applyMeeting(st,{...meeting,effects:[{kind:'event',title:'No date'}]}),/날짜/);assert.equal(st.tasks.length,0);
});
test('calendar subscriptions do not expose private staff data and empty toggles hide optional calendars',()=>{
 const s={id:'s',name:'Student',calendarEvents:[{id:'e',date:'2026-09-20',title:'Student'}],tasks:[{id:'t',title:'Task',deadline:'2026-09-21'}]};
 const schools=[{name:'School',calendar:[{date:'2026-09-22',title:'Break'}]}],shared=[{id:'x',ownerId:'other',title:'Public event',date:'2026-09-23'}],team=[{id:'m',date:'2026-09-24',title:'Marketing',category:'marketing'}];
 assert.equal(O.calendar([s],schools,{subscriptions:{schoolIds:[],staffIds:[],team:false,marketing:false}},shared,team).length,2);
 assert.equal(O.calendar([s],schools,{subscriptions:{schoolIds:['School'],staffIds:['other'],marketing:true}},shared,team).length,5);
});
test('test goals require a real test date and never mix TOEFL scoring systems',()=>{
 const st={tests:[{type:'SSAT',details:{'Overall Percentile':99},date:''},{type:'SSAT',details:{'Overall Percentile':97},date:'2026-09-01'},{type:'TOEFL',overall:110,date:'2026-08-01'},{type:'TOEFL',overall:5.5,scoreScale:'6',date:'2026-09-01'}]};
 assert.equal(O.measure(st,{metric:'SSAT',target:98}).value,97);
 assert.equal(O.measure(st,{metric:'TOEFL',target:5.5,scale:'6'}).value,5.5);
 assert.equal(O.measure(st,{metric:'TOEFL',target:115,scale:'120'}).value,110);
 assert.equal(O.measure(st,{metric:'SSAT',target:97,from:'2027-01-01'}).value,null);
});
test('GPA uses stored school termGpa not a fabricated normalized number',()=>{
 const st={academicTerms:[{school:'A',year:'2026',season:'Spring',termGpa:'3.9',gradingScale:{gpaScale:'4.0 GPA Scale'}},{school:'B',year:'2026',season:'Fall',termGpa:'95',gradingScale:{gpaScale:'100 GPA Scale'}}]};
 assert.equal(O.measure(st,{metric:'GPA',target:3.8,scale:'4.0',school:'A'}).value,3.9);
 assert.equal(O.measure(st,{metric:'GPA',target:3.8,scale:'4.3'}).value,null);
 assert.equal(O.measure(st,{metric:'GPA',target:3.8,scale:'4.0',from:'2027-01-01'}).value,null);
});

test('goal and application tasks edit their source, not a duplicate manual task',()=>{
 const st={id:'s',operations:{goals:[{id:'g',title:'Goal',milestones:[{id:'m',title:'Draft',date:'2026-10-01'}]}]},applications:[{id:'a',school:'A',deadline:'2026-11-01',requirements:[{id:'r',title:'Essay',status:'미시작'}]}]};
 const tasks=O.tasks(st);assert.equal(tasks.length,3);
 const patch=O.updateTask(st,{...tasks[0],done:true,date:'2026-09-30'});assert(patch.operations.goals[0].milestones[0].done);assert.equal(patch.operations.goals[0].milestones[0].date,'2026-09-30');assert.equal(patch.tasks,undefined);
 const app=O.updateTask(st,{...tasks[2],done:true});assert.equal(app.applications[0].requirements[0].status,'완료');assert.equal(app.tasks,undefined);
});
test('invalid calendar dates are rejected and nested resume awards are immutable',()=>{
 assert.equal(O.date('2026-02-31'),'');const st={awards:[{awardName:'Gold'}]};const r=O.resume(st);st.awards[0].awardName='Edited';assert.equal(r.awards[0].awardName,'Gold');
});
test('same checklist IDs in different schools keep distinct calendar identities',()=>{
 const st={id:'s',applications:['A','B'].map((school,i)=>({id:'app'+i,school,deadline:'2027-01-15',requirements:[{id:'essay',title:'Essay'}]}))};
 const events=O.eventRows(st);assert.equal(events.length,4);assert.equal(new Set(events.map(e=>e.uid)).size,4);
 const accepted={id:'s',applications:[{id:'app',school:'A',status:'Accepted',deadline:'2027-01-15'}]};
 assert.equal(O.updateTask(accepted,O.tasks(accepted)[0]).applications[0].status,'Accepted');
});
test('completed meetings remain in history but are marked done in calendar',()=>{
 const st={id:'s',operations:{meetings:[{id:'m',title:'Review',date:'2026-09-17',appliedAt:'2026-09-17T10:00:00Z'}]}};
 assert.equal(O.eventRows(st)[0].done,true);
});
test('weekly routines expand only in their explicit period with unique IDs and time zone',()=>{
 const st={id:'s',operations:{goals:[{id:'g',title:'Practice',shareWithFamily:true,routines:[{id:'r',title:'Math practice',weekday:'1',time:'16:00',timezone:'America/New_York',from:'2026-09-01',to:'2026-09-30',hours:1}]}]}};
 const events=O.eventRows(st);assert.equal(events.length,4);assert.equal(events[0].date,'2026-09-07');assert.equal(events[0].timezone,'America/New_York');assert.equal(new Set(events.map(e=>e.uid)).size,4);assert(events.every(e=>e.shareWithFamily));
});
test('awards are deduplicated, period limited and missing grades or tests stay unknown',()=>{
 const a={awardName:'Gold',competition:'X',level:'International',date:'2026-08'};const st={awards:[a,{...a,date:'2025-08'}],ecs:[{awards:[a]}]};
 assert.equal(O.measure(st,{metric:'awards',level:'International',from:'2026-01-01',to:'2026-12-31',target:2}).value,1);
 assert.equal(O.measure(st,{metric:'GPA',target:3.8}).value,null);
});
test('planned competition does not inflate current activity or resume counts',()=>{
 const now=O.today();const next=O.registerOpportunity({id:'s',ecs:[]},{id:'op',name:'AMC 8',category:'STEM',url:'https://maa.org'},O.addDays(now,60));
 assert.equal(next.ecs.length,0);assert.equal(next.operations.plannedActivities.length,1);assert.equal(O.measure(next,{metric:'activities',target:3}).value,0);assert.equal(O.resume(next).activities.length,0);assert.throws(()=>O.registerOpportunity(next,{id:'op'},O.addDays(now,60)),/이미/);
});
test('old school deadlines are not silently promoted to the next cycle',()=>{
 const school={name:'A',deadline:'2026-01-15',admissions:{entryYear:'2027',deadline:'2027-01-15',verifiedAt:'2026-09-17',sourceUrl:'https://school.example'}};
 assert.equal(O.applicationFromSchool(school,{targetYear:'2028'}).deadline,'');assert.equal(O.applicationFromSchool(school,{targetYear:'2027'}).deadline,'2027-01-15');
});
test('published progress and resume versions are independent from later student edits',()=>{
 const st={id:'s',name:'Student',ecs:[{name:'Cello'}],tasks:[{title:'Public',shareWithFamily:true},{title:'Secret'}],operations:{meetings:[{notes:'Private internal notes',familySummary:'Public summary',shareWithFamily:true,date:'2026-09-17'}],goals:[]}};
 const p=O.publishProgress(st,'Summary','Staff');assert(!JSON.stringify(p).includes('Private'));assert(!JSON.stringify(p).includes('Secret'));assert.equal(p.tasks.length,1);const r=O.resume(st);st.ecs[0].name='Edited';assert.equal(r.activities[0].name,'Cello');
});
test('application results cannot be reset from operational task completion',()=>{
 for(const status of ['Accepted','Denied','Waitlisted','합격','불합격']){
  const st={id:'s',applications:[{id:'app',school:'School',deadline:'2026-12-01',status}]};
  const task=O.tasks(st).find(t=>t.key==='applicationDeadline');assert.equal(task.statusLocked,true);
  assert.equal(O.updateTask(st,{...task,done:false}).applications[0].status,status);
 }
});
test('structured meeting rows update their linked source records and natural-date tasks reach the calendar',()=>{
 const st={id:'s',name:'Student',academicTerms:[{termId:'term',subjects:[{subject:'Math'}]}],tests:[{id:'test',type:'SSAT'}],ecs:[{activityId:'ec',name:'Baseball'}],applications:[{id:'app',school:'School',essays:[{id:'essay',title:'Community'}]}],operations:{goals:[{id:'goal',title:'SSAT 목표',metric:'SSAT',target:95}]}};
 const meeting={id:'m',title:'09/21/2026 미팅',date:'2026-09-21',academicRows:[{termId:'term',subjectIndex:0,progressStatus:'on-track',progressNote:'과제 완료',issue:''}],testRows:[{goalId:'goal',testId:'test',type:'SSAT',target:97,nextDate:'2026-10-10',progressStatus:'needs-attention',progressNote:'어휘 보완'}],activityRows:[{activityId:'ec',progressStatus:'on-track',progressNote:'주 3회 훈련'}],interviewRows:[{applicationId:'app',date:'2026-11-01',status:'예약 완료',prepStatus:'on-track',docUrl:'https://docs.google.com/document/d/test'}],essayRows:[{applicationId:'app',essayId:'essay',deadline:'2026-12-01',priority:'높음',status:'진행 중',docUrl:'https://docs.google.com/document/d/essay'}],effects:[{id:'task',kind:'task',title:'초안 제출',date:'2026-09-24'}]};
 const next=O.applyMeeting(st,meeting);
 assert.equal(next.academicTerms[0].subjects[0].meetingProgressNote,'과제 완료');
 assert.equal(next.operations.goals[0].target,97);assert.equal(next.tests[0].nextDate,'2026-10-10');
 assert.equal(next.ecs[0].meetingProgressNote,'주 3회 훈련');
 assert.equal(next.applications[0].interviewStatus,'예약 완료');assert.equal(next.applications[0].essays[0].priority,'높음');
 assert(O.eventRows(next).some(event=>event.title==='초안 제출'&&event.date==='2026-09-24'));
});
