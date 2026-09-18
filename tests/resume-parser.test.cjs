const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
require('../platform/operations-intake.js');
const I=require('../platform/resume-parser.js');
const source=fs.readFileSync(__dirname+'/fixtures/resume-multisection.txt','utf8');
test('resume sections group school records, roles and multiline descriptions',()=>{
 const r=I.extract(source),schools=r.rows.filter(x=>x.kind==='education'),ecs=r.rows.filter(x=>x.kind==='ec'),basic=r.rows.find(x=>x.kind==='basic');
 assert.deepEqual(schools.map(x=>x.school),['San Diego Mesa College','University of North Dakota','Calvin Christian High School']);
 assert.equal(ecs.length,10);assert.equal(ecs.filter(x=>x.name==='Example Industrial Co.,Ltd.').length,3);
 assert.equal(basic.firstNameEn,'Alex');assert.equal(basic.lastNameEn,'Kim');assert.equal(basic.preferredName,'Andy');assert.equal(basic.phoneCountry,'+82');assert.equal(basic.phone,'1000000000');
 assert.equal(schools[0].from,'2019-08');assert.equal(schools[1].from,'2024-09');assert.equal(schools[1].to,'2024-01');assert(schools[1].issues.some(x=>x.includes('시작일')));assert.equal(schools[2].graduationMonth,'2019-06');
 const sport=ecs.find(x=>x.name==='Calvin Christian Crusaders');assert.equal(sport.cat,'Sports');assert.equal(sport.from,'2016-09');assert.equal(sport.to,'2018-12');assert.match(sport.impact,/Won 1st place/);
 assert.match(ecs[0].impact,/Korea marketplace/);assert.match(ecs[0].impact,/and conduct market research/);
 assert.equal(ecs.find(x=>x.name==='Example Gaming (Professional Gaming Team)').from,'2019-01');
 assert.equal(ecs.filter(x=>x.cat==='Community Services').length,2);
 assert.equal(r.unmatched.length,3);assert(!ecs.some(x=>x.name==='Violin'));assert(r.rows.every(x=>x.evidence));
});
test('uncertain academic GPA remains evidence, never an invented semester grade',()=>{
 const r=I.extract('Education\nExample Academy\nCumulative GPA: 3.8 / 4.0\nHigh School Diploma Graduation: June 2025').rows[0];
 assert.equal(r.reportedGpa,'3.8');assert.equal(r.reportedGpaScale,'4.0');assert.equal(r.gpa,undefined);assert.equal(r.year,undefined);assert.equal(r.graduationMonth,'2025-06');
});
test('explicit legacy commands still work in resume import',()=>{
 const r=I.extract('Activity: Cello Ensemble\nTOEFL 110 2026-09-01\nstudent@example.com');
 assert.deepEqual(r.rows.map(x=>x.kind),['ec','test','basic']);assert.equal(r.rows[0].cat,'Music');
});
test('separate date lines attach to their activity and unrelated sections do not leak',()=>{
 const r=I.extract('ACTIVITIES\nCello Ensemble\nJan 2020 - Present\n● Performed with classmates.\nADDITIONAL INFORMATION\nHigh school graduation planned next year.');
 assert.equal(r.rows.length,1);assert.equal(r.rows[0].name,'Cello Ensemble');assert.equal(r.rows[0].from,'2020-01');assert.equal(r.unmatched.length,1);
});
test('Korean school headings remain supported',()=>{
 const r=I.extract('학력\n서울고등학교\n졸업 2020\n활동\nActivity: Cello Ensemble');
 assert.equal(r.rows[0].school,'서울고등학교');assert.equal(r.rows.filter(x=>x.kind==='education').length,1);
});
