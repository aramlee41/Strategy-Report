const {chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const base=process.argv[2]||'http://127.0.0.1:8765/platform/index.html';
const out=process.env.OPS_SCREENSHOTS||'C:/Users/USER/.codex/visualizations/2026/06/15/019ec9d5-ff53-7d50-b6cc-5252e07856c3';
const admin={id:'a',name:'관리자',email:'admin@example.com',role:'admin'},s={id:'s',name:'김 담당',email:'s@example.com',role:'staff'},t={id:'t',name:'이 담당',email:'t@example.com',role:'staff'},empty={id:'empty',name:'신규 담당',role:'staff'};
const jwt=u=>[Buffer.from('{}').toString('base64url'),Buffer.from(JSON.stringify({sub:u.id,exp:Math.floor(Date.now()/1000)+3600})).toString('base64url'),'test'].join('.');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});let page;const errors=[];
 try{
  const ctx=await browser.newContext({viewport:{width:1500,height:1050}});ctx.setDefaultTimeout(20000);page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'?portal=staff');await page.getByRole('heading',{name:'직원 로그인'}).waitFor({timeout:60000});
  const data=await page.evaluate(()=>{
   const make=(id,name,program,owners,tasks)=>v2NormalizeStudent({...blankStudent(),id,name,program,owners,owner:owners[0],tasks,ecs:[],tests:[],awards:[],applications:[],academicTerms:[],actionPlans:[],calendarEvents:[],operations:{},programEndDate:'2027-06-30'});
   const day=PrepOperations.addDays(PrepOperations.today(),1),past=PrepOperations.addDays(PrepOperations.today(),-1);
   return {students:[make('senior','시니어 학생','시니어보딩',['s','t'],[{id:'s-task',title:'김 담당 전용 업무',ownerId:'s',deadline:past},{id:'t-task',title:'이 담당 전용 업무',ownerId:'t',deadline:past},{id:'joint',title:'공동 관리 업무',deadline:day}]),make('junior','주니어 학생','주니어보딩',['t'],[{id:'j-task',title:'주니어 원서 확인',ownerId:'t',deadline:past}])],schools:PREP_SCHOOLS,day};
  });
  let staffTeams={empty:['대학원']},version=1;const versions={senior:1,junior:1,__settings:1};
  await ctx.route('**/auth/v1/**',route=>route.fulfill({json:{access_token:jwt(admin),refresh_token:'test',token_type:'bearer',expires_in:3600,user:admin}}));
  await ctx.route('**/functions/v1/prep-portal',async route=>{
   const b=route.request().postDataJSON();let response;
   if(b.action==='load')response={...data,user:admin,staffAccounts:[admin,s,t,empty],staffTeams,versions,workspaceVersion:0,workspace:{events:[],tasks:[{id:'personal',title:'관리자 개인 업무',date:data.day}],subscriptions:{team:true}},teamEvents:[],sharedCalendar:[]};
   else if(b.action==='revisions')response={versions,workspaceVersion:0};
   else if(b.action==='save'){assert.equal(b.changes.length,1);assert.equal(b.changes[0].id,'__settings');staffTeams=b.changes[0].payload.staffTeams;versions.__settings=++version;response={versions};}
   else throw Error('Unexpected action '+b.action);
   return route.fulfill({json:response});
  });
  const button=name=>page.getByRole('button',{name,exact:true});
  await page.getByLabel('이메일',{exact:true}).fill(admin.email);await page.getByLabel('비밀번호',{exact:true}).fill('test-password-only');await button('로그인').click();await button('로그아웃').waitFor();
  assert.equal(await page.locator('.ops-workspace .ops-stat').count(),0);assert.equal(await page.getByLabel('전체 학생',{exact:true}).count(),0);
  await page.getByLabel('팀',{exact:true}).waitFor();const teams=await page.getByLabel('팀',{exact:true}).locator('option').allTextContents();assert.deepEqual(teams,['전체 팀','시니어보딩','주니어보딩','보딩프렙','대학','편입','대학원','플래티넘']);
  await page.getByLabel('팀',{exact:true}).selectOption('시니어보딩');assert(!(await page.locator('main').innerText()).includes('주니어 원서 확인'));assert(!(await page.locator('main').innerText()).includes('관리자 개인 업무'));
  assert.deepEqual(await page.getByLabel('팀원',{exact:true}).locator('option').allTextContents(),['전체 담당자','김 담당','이 담당']);
  await page.getByLabel('팀원',{exact:true}).selectOption('s');let body=await page.locator('main').innerText();assert(body.includes('김 담당 전용 업무'));assert(body.includes('공동 관리 업무'));assert(!body.includes('이 담당 전용 업무'));assert(body.includes('지연 업무 1건'));
  await page.locator('.brand-logo').evaluate(img=>img.decode());await page.locator('.ops-toolbar svg').first().waitFor();
  await page.screenshot({path:out+'/dashboard-gold-navy-desktop.png'});
  await page.getByLabel('팀',{exact:true}).selectOption('주니어보딩');assert.equal(await page.getByLabel('팀원',{exact:true}).inputValue(),'');assert((await page.locator('main').innerText()).includes('주니어 원서 확인'));
  await page.getByLabel('팀',{exact:true}).selectOption('대학원');assert((await page.getByLabel('팀원',{exact:true}).locator('option').allTextContents()).includes('신규 담당'));assert.equal(await page.locator('.ops-workspace .ops-table tbody tr').count(),0);
  await button('팀 구성').click();const dialog=page.getByRole('dialog');await dialog.getByLabel('신규 담당 시니어보딩',{exact:true}).check();await dialog.getByRole('button',{name:'팀 구성 저장',exact:true}).click();await page.getByText('공용 저장 완료',{exact:true}).waitFor();assert(staffTeams.empty.includes('시니어보딩'));
  await page.reload();await button('로그아웃').waitFor();await page.getByLabel('팀',{exact:true}).selectOption('시니어보딩');assert((await page.getByLabel('팀원',{exact:true}).locator('option').allTextContents()).includes('신규 담당'));
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:out+'/dashboard-gold-navy-mobile.png'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const colors=await page.evaluate(()=>{const heading=document.querySelector('.ops-band h2'),table=document.querySelector('.ops-table thead th');return {bg:getComputedStyle(document.body).backgroundColor,sidebar:getComputedStyle(document.querySelector('.side')).backgroundColor,nav:getComputedStyle(document.querySelector('.navbtn.active')).backgroundColor,logo:document.querySelector('.brand-logo').naturalWidth,headingBg:getComputedStyle(heading.parentElement.matches('.ops-toolbar')?heading.parentElement:heading).backgroundColor,headingText:getComputedStyle(heading).color,tableBg:getComputedStyle(table).backgroundColor,tableText:getComputedStyle(table).color,tableBorder:getComputedStyle(table.closest('table')).borderLeftWidth,rowBg:getComputedStyle(document.querySelector('.ops-table tbody tr:nth-child(2)>td')).backgroundColor};});
  assert.equal(colors.bg,'rgb(255, 255, 255)');assert.equal(colors.sidebar,'rgb(241, 242, 245)');assert.equal(colors.nav,'rgb(243, 231, 201)');assert(colors.logo>0);assert.equal(colors.headingBg,'rgb(255, 255, 255)');assert.equal(colors.headingText,'rgb(36, 50, 82)');assert.equal(colors.tableBg,'rgb(232, 236, 242)');assert.equal(colors.tableText,'rgb(36, 50, 82)');assert.equal(colors.tableBorder,'1px');assert.equal(colors.rowBg,'rgb(247, 248, 250)');
  assert.deepEqual(errors,[]);console.log('PASS team dashboard: no stat strip/toggle; 7 teams; joint-owner task and alert filtering; team change resets member; empty team; persisted membership; private work separation; gold/navy desktop/mobile. Isolated fixtures, no real student writes.');
 }catch(e){if(page)await page.screenshot({path:out+'/dashboard-teams-failure.png'});throw e;}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
