const test=require('node:test'),assert=require('node:assert/strict'),I=require('../platform/operations-intake.js');
test('local meeting extraction links only explicit facts to existing activities',()=>{
 const r=I.extract('Math Club 주당 4시간, 역할: 발표 담당\n할 일: 결과 발표 2026-10-01\nTOEFL: 5.5 2026-09-01',{ecs:[{id:'math',name:'Math Club',cat:'STEM'}]});
 assert.equal(r.rows[0].targetId,'math');assert.equal(r.rows[0].hours,'4');assert.equal(r.rows[0].position,'발표 담당');assert.equal(r.rows[1].date,'2026-10-01');assert.equal(r.rows[2].overall,'5.5');assert.equal(r.rows[2].scoreScale,'');
});
test('PDF resume sections produce editable evidence-backed candidates without achievements invented',()=>{
 const r=I.extract('Education\nExample Academy\nActivities\nCello Ensemble | 2 hours/week\nHonors & Awards\nGold Award International 2026-05\nTesting\nSSAT: 97 percentile 2026-08-11');
 assert.deepEqual(r.rows.map(r=>r.kind),['education','ec','award','test']);assert.equal(r.rows[1].cat,'Music');assert.equal(r.rows[2].level,'International');assert.equal(r.rows[3].percentile,'97');assert.equal(r.rows[3].overall,'');assert(r.rows.every(r=>r.evidence));
});
test('vague aspirations are not parsed as accomplished activities or scores',()=>{
 assert.deepEqual(I.extract('학생이 앞으로 수학과 음악에 더 관심을 갖고 성장하면 좋겠습니다.').rows,[]);
});
