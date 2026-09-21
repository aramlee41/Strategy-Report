const assert=require('node:assert/strict');
const M=require('../platform/meeting-record-model.js');

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
assert.equal(copied.actionItems[0].createTask,false);
assert.equal(legacy.appliedAt,'2026-09-10T10:00:00Z');

copied.actionItems[0].createTask=true;
copied.actionItems[0].done=true;
const saved=M.payload(copied,()=> 'generated');
assert.equal(saved.agenda,'에세이 방향 결정');
assert(saved.notes.includes('오늘 목표'));
assert.equal(saved.effects.length,1);
assert.equal(saved.effects[0].done,true);
assert.equal(saved.effects[0].url,'https://example.com');
console.log('PASS meeting record normalization, immutable copy, structured payload, and linked action metadata.');
