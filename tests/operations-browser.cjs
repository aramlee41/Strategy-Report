const {chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const P=require('../platform/parent-portal-model.js');
const base=process.argv[2]||'http://127.0.0.1:8765/platform/index.html';
const out=process.env.OPS_SCREENSHOTS||'C:/Users/USER/.codex/visualizations/2026/06/15/019ec9d5-ff53-7d50-b6cc-5252e07856c3';
const admin={id:'test-admin',name:'검증 관리자',email:'admin@example.com',role:'admin'};
const parent={id:'test-parent',name:'검증 학부모',email:'parent@example.com',role:'parent'};
const colleague={id:'test-staff',name:'김 컨설턴트',email:'staff@example.com',role:'staff'};
const expires=Math.floor(Date.now()/1000)+3600;
const jwt=u=>[Buffer.from('{}').toString('base64url'),Buffer.from(JSON.stringify({sub:u.id,exp:expires})).toString('base64url'),'test'].join('.');
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});const errors=[];let page;
 try {
 const ctx=await b.newContext({viewport:{width:1440,height:1000}});ctx.setDefaultTimeout(20000);page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'?portal=staff');await page.getByRole('heading',{name:'직원 로그인'}).waitFor({timeout:60000});
 const fixture=await page.evaluate(()=>{
  if(v2TestOverall('TOEFL',{Reading:5,Listening:5.5,Speaking:5,Writing:5.5},'','6')!==5.5)throw Error('TOEFL band average incorrect');
  if(v2LegacyTestOverall({type:'TOEFL',scoreScale:'6',overall:5.5})!==0)throw Error('New scale incorrectly fed to legacy 120 scale');
  if(v2LegacyTestOverall({type:'TOEFL',scoreScale:'6',overall:5.5,comparableOverall120:107})!==107)throw Error('Comparable score not preserved');
  if(v2TestChartRows({tests:[{type:'TOEFL',scoreScale:'6',overall:5.5,details:{Reading:'',Listening:5.5}}]})[0].metrics.some(m=>m.max!==6||m.label==='Reading'))throw Error('Test chart scale / missing score incorrect');
  const untouched={id:'untouched',name:'Unchanged'},schools=[];const prepared=v2PrepareCloudSave({students:[untouched],schools},{students:[untouched],schools,teamEvents:[{title:'Event'}]});if(prepared.students[0]!==untouched)throw Error('Unrelated save recomputed student');
  const s=v2NormalizeStudent({...blankStudent(),id:'ops-student',name:'업무 검증 학생',en:'Test Student',school:'Phillips Exeter Academy',currentGrade:'8학년',targetYear:'2027',program:'시니어보딩',owners:['test-admin'],owner:'test-admin',ecs:[{id:'ec-math',activityId:'ec-math',cat:'STEM',name:'Math Club',hours:'2',status:'진행 중'}],tests:[{type:'SSAT',date:'2026-09-01',overall:'2200',details:{'Overall Percentile':'97'}}],awards:[],academicTerms:[],actionPlans:[],tasks:[],applications:[],calendarEvents:[],operations:{}});
  s.parentPortal={...PrepParentModel.normalize(s),enabled:true,parentName:'검증 학부모',parentEmail:'parent@example.com'};
  return {students:[s],schools:PREP_SCHOOLS};
 });
 const versions={'ops-student':1,__schools:1};let workspace={events:[],tasks:[],subscriptions:{schoolIds:[],staffIds:[],team:true,marketing:false}},workspaceVersion=0,opportunities;
 const attach=async context=>{
  await context.route('**/auth/v1/**',async route=>{
   if(route.request().url().includes('/logout'))return route.fulfill({status:204});
   const body=route.request().postDataJSON()||{},u=body.email===parent.email?parent:admin;
   await route.fulfill({json:{access_token:jwt(u),refresh_token:'test',token_type:'bearer',expires_in:3600,user:u}});
  });
  await context.route('**/functions/v1/prep-portal',async route=>{
   const body=route.request().postDataJSON(),u=route.request().headers().authorization==='Bearer '+jwt(parent)?parent:admin;let result;
   if(body.action==='load')result={user:u,students:u.role==='parent'?fixture.students.map(P.publicStudent):fixture.students,schools:u.role==='parent'?undefined:fixture.schools,staffAccounts:[admin,colleague],versions,workspace,workspaceVersion,opportunities,teamEvents:[{id:'team-a',title:'회사 공개 일정',date:'2026-09-25',category:'team'}],sharedCalendar:[{id:'shared-a',ownerId:colleague.id,ownerName:colleague.name,title:'직원 공개 미팅',date:'2026-09-22'}]};
   else if(body.action==='revisions')result={versions,workspaceVersion};
   else if(body.action==='saveWorkspace'){assert.equal(body.version,workspaceVersion);workspace=body.payload;result={payload:workspace,version:++workspaceVersion};}
   else if(body.action==='save'){
    for(const c of body.changes){assert.equal(c.expectedVersion,versions[c.id]||0);if(c.kind==='student')fixture.students[0]=c.payload;if(c.id==='__settings')opportunities=c.payload.opportunities;versions[c.id]=(versions[c.id]||0)+1;}result={versions};
   }else if(body.action==='accounts')result={members:[{user_id:admin.id,...admin,active:true}],invitations:[]};
   else throw Error('Unexpected action '+body.action);
   return route.fulfill({json:result});
  });
 };
 await attach(ctx);
 const login=async(p,u)=>{await p.getByLabel('이메일',{exact:true}).fill(u.email);await p.getByLabel('비밀번호',{exact:true}).fill('test-only-password');await p.getByRole('button',{name:'로그인',exact:true}).click();await p.getByRole('button',{name:'로그아웃',exact:true}).waitFor();};
 const btn=(name,scope=page)=>scope.getByRole('button',{name,exact:true});
 const dialog=()=>page.getByRole('dialog');
 const saved=()=>page.getByText('공용 저장 완료',{exact:true}).waitFor();
 await login(page,admin);
 await btn('개인 할 일').click();await dialog().getByLabel('할 일 *',{exact:true}).fill('개인 서류 검토');await btn('저장',dialog()).click();await saved();assert.equal(workspace.tasks.length,1);
 await page.getByText('캘린더 구독',{exact:true}).click();await page.getByLabel('김 컨설턴트',{exact:true}).check();await saved();assert(workspace.subscriptions.staffIds.includes(colleague.id));
 await page.getByLabel('마케팅 일정',{exact:true}).check();await page.getByLabel('회사 전체 일정',{exact:true}).uncheck();await saved();await page.waitForTimeout(100);assert(workspace.subscriptions.marketing);assert(!workspace.subscriptions.team);
 await page.screenshot({path:out+'/ops-workspace-desktop.png'});
 await btn('학생 관리').click();await btn('열기').click();await btn('미팅 기록').click();await btn('미팅 추가').click();
 await dialog().getByLabel('미팅 제목 *').fill('학기 목표 점검');await dialog().getByLabel('확인할 어젠다').fill('수학 발표와 목표');await dialog().getByLabel('내부 미팅 기록').fill('내부 비공개 코칭 기록');
 await dialog().getByLabel('학부모 전달 요약').fill('수학 발표 준비가 순조롭게 진행되고 있습니다.');await dialog().getByLabel('공개 진행상황에 전달 요약 포함').check();
 await btn('활동 추가',dialog()).click();await dialog().getByLabel('기존 활동 연결 (미선택 시 새 활동)').selectOption('ec-math');await dialog().getByLabel('주당 시간').fill('4');await dialog().getByLabel('학교 / 외부 활동').selectOption('school');
 await btn('할 일 추가',dialog()).click();await dialog().getByLabel('제목 *',{exact:true}).fill('발표 슬라이드 완성');await dialog().getByLabel('마감일',{exact:true}).fill('2026-09-24');
 await btn('검토 완료 · 기록과 변경사항 반영',dialog()).click();await saved();await page.waitForTimeout(150);
 assert.equal(fixture.students[0].ecs.length,1);assert.equal(fixture.students[0].ecs[0].hours,'4');assert(fixture.students[0].tasks.some(t=>t.title==='발표 슬라이드 완성'));
 await btn('목표 / EC 실행').click();await btn('목표 추가').click();await dialog().getByLabel('목표 이름 *').fill('가을 SSAT 목표');await dialog().getByLabel('목표일 *').fill('2026-12-31');await dialog().getByLabel('시작일 *').fill('2026-08-01');await dialog().getByLabel('측정 기준').selectOption('SSAT');await dialog().getByLabel('목표 총 퍼센타일').fill('97');await dialog().getByLabel('학부모 공개 진행상황에 포함').check();await btn('일정 초안 만들기',dialog()).click();assert.equal(await dialog().getByLabel('완료 목표일',{exact:true}).count(),4);await btn('저장',dialog()).click();await saved();await page.locator('.ops-tag.good').getByText('목표 달성',{exact:true}).waitFor();
 await btn('대회·활동 탐색').click();await page.getByLabel('대회 검색').fill('AMC');await btn('상세 / 활동 등록').first().click();await dialog().getByLabel('등록 / 준비 완료 목표일 *').fill('2027-01-10');await btn('준비 활동 및 마일스톤 등록',dialog()).click();await saved();assert.equal(fixture.students[0].ecs.length,1);assert.equal(fixture.students[0].operations.plannedActivities.length,1);
 await btn('캘린더').click();await page.getByLabel('캘린더 월').fill('2026-09');await page.getByRole('button',{name:/발표 슬라이드 완성/}).waitFor();
 await btn('방학 계획').click();await btn('계획 추가').click();await dialog().getByLabel('계획명 *').fill('Thanksgiving 귀가');await dialog().getByLabel('시작일',{exact:true}).fill('2026-11-25');await dialog().getByLabel('종료일',{exact:true}).fill('2026-11-30');await btn('저장',dialog()).click();await saved();assert.equal(fixture.students[0].operations.breakPlans.length,1);
 await btn('Resume').click();await btn('현재 버전 저장').click();await saved();assert.equal(fixture.students[0].operations.resumeVersions.length,1);assert.equal(fixture.students[0].operations.resumeVersions[0].activities.length,1);
 await page.evaluate(()=>window.print=()=>{});await btn('PDF / 인쇄').click();await page.emulateMedia({media:'print'});assert(await page.locator('#ops-print-root').isVisible());await page.screenshot({path:out+'/ops-resume-print.png'});await page.pdf({path:out+'/ops-resume-test.pdf',format:'A4',printBackground:true});await page.emulateMedia({media:'screen'});await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
 await page.getByLabel('목표 달성 가정 초안').check();await page.getByText('예상 성과는 아직 달성되지 않았으며 실제 지원서 이력으로 사용할 수 없습니다.').waitFor();
 await page.getByText('Resume PDF / 텍스트 가져오기',{exact:true}).click();await page.getByLabel('파일 선택 (PDF / TXT)').setInputFiles(out+'/ops-resume-test.pdf');await page.waitForFunction(()=>Array.from(document.querySelectorAll('textarea')).some(t=>t.value.includes('Test Student')));await page.getByLabel('파일 선택 (PDF / TXT)').setInputFiles({name:'resume.txt',mimeType:'text/plain',buffer:Buffer.from('Activity: Cello Ensemble\nTOEFL 110 2026-09-01\nstudent@example.com')});await btn('기록에서 입력 후보 찾기').click();assert.equal(await dialog().getByLabel('활동명 / 회사명',{exact:true}).inputValue(),'Cello Ensemble');await btn('닫기',dialog()).click();
 await require('./resume-import-browser-check.cjs')(page,fixture,out);
 await btn('원서 준비 시작').click();await saved();await btn('원서').click();const schoolInput=page.locator('.field').filter({has:page.locator('.label').getByText('지원 학교 검색',{exact:true})}).locator('input');await schoolInput.fill('Phillips Exeter Academy');await btn('학교 추가 · 요건 불러오기').click();await saved();assert.equal(fixture.students[0].applications[0].deadline,'2027-01-15');assert(fixture.students[0].applications[0].requirements.length>3);
 await btn('원서 관리').click();await btn('에세이',dialog()).click();await btn('질문 추가',dialog()).click();await dialog().getByLabel('질문',{exact:true}).fill('공식 포털에서 확인한 질문 테스트');await dialog().getByLabel('작성 초안').fill('A meaningful student essay.');await btn('초안 버전 보관',dialog()).click();await btn('저장',dialog()).click();await saved();assert.equal(fixture.students[0].applications[0].essays[0].versions.length,1);
 await btn('학생 현황').click();await page.getByLabel('학부모님께 전달할 진행 요약').fill('이번 학기 목표와 미팅 후속 업무를 확인했습니다.');await btn('공개 내용 검토').click();await btn('검토 완료 · 공개',dialog()).click();await saved();assert.equal(fixture.students[0].parentPortal.progressSnapshots.length,1);
 await btn('Stage 1–5').click();await page.getByRole('button',{name:/Stage 1: 학생 분석/}).waitFor();
 await btn('어드민').click();await btn('대회 / 활동').click();await page.getByRole('heading',{name:'대회 / 활동 데이터'}).waitFor();
 await btn('대시보드').first().click();await page.setViewportSize({width:390,height:844});await page.screenshot({path:out+'/ops-workspace-mobile.png'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const pctx=await b.newContext({viewport:{width:390,height:844}});await attach(pctx);const p=await pctx.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'?portal=parent');await login(p,parent);await p.getByRole('button',{name:'학생 진행상황',exact:true}).click();await p.getByText('이번 학기 목표와 미팅 후속 업무를 확인했습니다.').waitFor();assert.equal(await p.getByText('내부 비공개 코칭 기록').count(),0);await p.screenshot({path:out+'/ops-family-mobile.png'});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);console.log('PASS operations E2E: workspace subscriptions, meeting linked writes, goals, planned competitions, calendars, breaks, Resume, intake, application checklist/essays, preserved Stages, parent approval boundary, responsive layouts. Isolated authenticated API fixtures; no live student writes.');
 }catch(e){if(page){console.error((await page.locator('body').innerText()).slice(-3500));await page.screenshot({path:out+'/ops-test-failure.png'});}throw e;}finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
