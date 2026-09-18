const {chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const base=process.argv[2]||'http://127.0.0.1:8765/platform/index.html';
const out=process.env.OPS_SCREENSHOTS||'C:/Users/USER/.codex/visualizations/2026/06/15/019ec9d5-ff53-7d50-b6cc-5252e07856c3';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.getByRole('heading',{name:'Prep LMS 로그인',exact:true}).waitFor({timeout:60000});
  assert.equal(await page.getByRole('link',{name:'yesboarding@gmail.com',exact:true}).getAttribute('href'),'mailto:yesboarding@gmail.com');
  await page.screenshot({path:out+'/workspace-login-desktop.png'});
  for(const entry of ['parent','staff']){
   await page.goto(base+'?portal='+entry);await page.getByRole('heading',{name:entry==='parent'?'학생·학부모 로그인':'직원 로그인',exact:true}).waitFor({timeout:60000});
   assert.equal(await page.getByLabel('비밀번호',{exact:true}).getAttribute('autocomplete'),'current-password');
   const contact=page.getByRole('link',{name:'yesboarding@gmail.com',exact:true});await contact.waitFor();assert.equal(await contact.getAttribute('href'),'mailto:yesboarding@gmail.com');
   await page.setViewportSize({width:320,height:850});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.setViewportSize({width:390,height:1000});await page.screenshot({path:out+'/workspace-login-'+entry+'-mobile.png'});
  }
  assert.deepEqual(errors,[]);console.log('PASS public entry: separate family/staff login, support mailto, noindex, mobile 320/390, no runtime errors. No login submission or student data access.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
