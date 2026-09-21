const assert=require('node:assert/strict');
const M=require('../platform/meeting-record-linked-model.js');

const legacy={id:'meeting-old',title:'기존 미팅',date:'2026-09-10',agenda:'에세이 방향 결정',notes:'시험 준비 상황 확인',familySummary:'학부모 공유 내용',effects:[{id:'task-old',kind:'task',title:'초안 작성',date:'2026-09-20',ownerId:'staff-1',url:'https://example.com'}],appliedAt:'2026-09-10T10:00:00Z'};
const normalized=M.normalize(legacy);
assert.equal(normalized.todayGoal,'에세이 방향 결정');
assert.equal(normalized.discussion.other,'시험 준비 상황 확인');
assert.equal(normalized.parentSummary,'학부모 공유 내용');
assert.equal(normalized.actionItems.length,1);
assert.equal(normalized.actionItems[0].url,'https://example.com');

const copied=M.copyForNew(legacy,'meeting-new','2026-09-21');
assert.equal(copied.id,'meeting-new');
assert.equal(copied.sourceMeetingId,'meeting-old');
assert.equal(copied.appliedAt,'');
assert.equal(copied.todayGoal,'에세이 방향 결정');
assert.equal(copied.actionItems.length,0);
assert.equal(copied.sinceLastMeetingItems[0].title,'초안 작성');
assert.equal(legacy.appliedAt,'2026-09-10T10:00:00Z');

copied.actionItems.push({id:'next-task',title:'다음 초안 작성',createTask:true,done:true});
const saved=M.payload(copied,()=> 'generated');
assert.equal(saved.agenda,'에세이 방향 결정');
assert(saved.notes.includes('오늘 목표'));
assert.equal(saved.effects.length,1);
assert.equal(saved.effects[0].done,true);
assert.equal(saved.effects[0].title,'다음 초안 작성');
console.log('PASS meeting record normalization, immutable copy, structured payload, and linked action metadata.');

assert.equal(M.formatMeetingTitle('2026-09-21'),'09/21/2026 미팅');
assert.equal(M.parseDueDate('9/21까지 작성하고 제출하기','2026-09-10'),'2026-09-21');
assert.equal(M.parseDueDate('2027년 1월 8일까지 제출','2026-09-10'),'2027-01-08');
assert.equal(M.parseDueDate('날짜 없이 자료 검토','2026-09-10'),'');
const hydrated=M.hydrate({date:'2026-09-21',academicRows:[{id:'academic-term-old-0',subject:'Old History'}]},{
 school:'IMS',
 academicTerms:[{termId:'term-old',school:'IMS',year:'2026',season:'Spring',subjects:[{subject:'Old History'}]},{termId:'term-1',school:'IMS',year:'2026',season:'Fall',subjects:[{subject:'Algebra'}]}],
 tests:[{id:'test-1',type:'SSAT',nextDate:'2026-10-01'}],
 ecs:[{activityId:'ec-1',name:'Varsity Soccer',status:'진행 중',activityScope:'school'},{activityId:'ec-2',name:'Research Project',status:'진행 중',activityScope:'external'}],
 applications:[{id:'app-1',school:'Exeter',essays:[{id:'essay-1',title:'Community'}]}]
});
assert.equal(hydrated.title,'09/21/2026 미팅');
assert.equal(hydrated.academicRows.length,1);
assert.equal(hydrated.academicRows[0].subject,'Algebra');
assert.equal(hydrated.activityRows[0].group,'school');
assert.equal(hydrated.activityRows[1].group,'project');
assert.equal(hydrated.interviewRows[0].school,'Exeter');
assert.equal(hydrated.essayRows[0].title,'Community');
assert.deepEqual(M.defaultSectionOrder,['since','focus','academics','testing','activities','other','actions','notes']);
assert(!M.defaultSectionOrder.includes('interviews'));
const seeded=M.seedPreviousActions({id:'meeting-next',date:'2026-09-21'},[{id:'meeting-prev',date:'2026-09-20',actionItems:[{id:'todo-1',title:'수학 과제',dueDate:'2026-09-21'}]}],{tasks:[{meetingId:'meeting-prev',title:'수학 과제',done:true}]});
assert.equal(seeded.previousMeetingId,'meeting-prev');
assert.equal(seeded.sinceLastMeetingItems[0].resultStatus,'완료');
