const test = require('node:test');
const assert = require('node:assert/strict');
const P = require('../platform/parent-portal-model.js');
const student = () => ({ id: 'one', name: '테스트 학생', owners: ['consultant'], stagePlans: { private: 'internal' }, basic: { lastNameKo: '김', firstNameKo: '학생', firstNameEn: 'Student', lastNameEn: 'Kim', dob: '2012-01-01', birthCountry: '대한민국', nationalities: ['대한민국'], usStatus: '없음', personalEmail: 'test@example.com', parents: { mother: { phone: '01012345678' } }, addresses: [{ type: 'Permanent Address', koreanAddress: '서울' }] }, school: 'Test School', currentGrade: '8학년', currentSchoolInfo: { type: '보딩스쿨' }, tests: [], academicTerms: [], ecs: [], awards: [] });
const declarations = { grades: 'none', tests: 'none', ecs: 'none', awards: 'none' };
test('migration preserves the student and does not publish existing reports', () => {
  const s = student(); s.reportSnapshots = [{ html: 'private report' }];
  const before = JSON.stringify(s); const p = P.normalize(s);
  assert.equal(JSON.stringify(s), before); assert.equal(p.enabled, false); assert.deepEqual(p.publications, []);
  assert.equal(p.draft.stagePlans, undefined); assert.equal(p.draft.owners, undefined);
});
test('incomplete forms can save drafts but cannot submit', () => {
  const s = student(); const draft = P.pickProfile(s); draft.basic.firstNameKo = '';
  assert.equal(P.saveDraft(s, draft, declarations).draft.basic.firstNameKo, '');
  assert.throws(() => P.submit(s, draft, declarations), /이름/);
  assert.equal(s.basic.firstNameKo, '학생');
});
test('no test or award is a valid explicit declaration; pending needs a date', () => {
  const s = student(); assert.deepEqual(P.requirements(s, declarations), []);
  assert.ok(P.requirements(s, { ...declarations, tests: 'pending' }).some(x => x.label === '자료 준비 예정일'));
  assert.ok(P.requirements(s, { ...declarations, tests: 'provided' }).some(x => x.tab === 'tests'));
});
test('submission copies inputs and never alters canonical scores or identity', () => {
  const s = student(); const draft = P.pickProfile(s); draft.basic.firstNameKo = '변경';
  const p = P.submit(s, draft, declarations); draft.basic.firstNameKo = '다시변경';
  assert.equal(p.submissions[0].profile.basic.firstNameKo, '변경'); assert.equal(s.basic.firstNameKo, '학생');
});
test('parent projection excludes internal student data and revoked reports', () => {
  const s = student(); s.parentPortal = { publications: [{ id: 'approved', status: 'published', html: 'frozen' }, { id: 'draft', status: 'draft', html: 'secret' }, { id: 'revoked', status: 'revoked' }] };
  const p = P.publicStudent(s); assert.equal(p.owners, undefined); assert.equal(p.stagePlans, undefined);
  assert.deepEqual(p.parentPortal.publications.map(r => r.id), ['approved']);
  s.parentPortal.publications[0].html = 'changed'; assert.equal(p.parentPortal.publications[0].html, 'frozen');
});
test('review preserves unrelated consultant updates and flags overlapping edits', () => {
  const s = student(); const draft = P.pickProfile(s); draft.basic.firstNameKo = '새이름';
  const submitted = P.submit(s, draft, declarations).submissions[0];
  s.basic.personalEmail = 'consultant@example.com';
  const merged = P.mergeSubmission(s, submitted); assert.deepEqual(merged.conflicts, []);
  assert.equal(merged.profile.basic.personalEmail, 'consultant@example.com'); assert.equal(merged.profile.basic.firstNameKo, '새이름');
  s.basic.firstNameKo = '직원수정'; const conflicting = P.mergeSubmission(s, submitted);
  assert.deepEqual(conflicting.conflicts, ['basic.firstNameKo']); assert.equal(conflicting.profile.basic.firstNameKo, '직원수정');
});
test('zero score is input, missing score is not', () => {
  const s = student(); s.tests = [{ type: 'SSAT', date: '2026-01-01', overall: 0 }];
  assert.deepEqual(P.requirements(s, { ...declarations, tests: 'provided' }), []);
  s.tests[0].overall = ''; assert.ok(P.requirements(s, { ...declarations, tests: 'provided' }).length);
});
