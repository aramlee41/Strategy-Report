// Public-key-only checks. Never logs in or writes a student record.
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../platform/portal-config.js'),'utf8'),context);
const {url,publishableKey,functionName}=context.window.PREP_CLOUD_CONFIG;
async function request(body,token){return fetch(`${url}/functions/v1/${functionName}`,{method:'POST',headers:{apikey:publishableKey,'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:JSON.stringify(body)});}
(async()=>{
 for(const action of ['load','revisions','saveWorkspace','requestReply']){
  assert.equal((await request({action})).status,401,action+' requires login');
  assert.equal((await request({action},'forged')).status,401,action+' rejects forged sessions');
 }
 for(const table of ['prep_members','prep_records','prep_student_access','prep_invitations','prep_audit','prep_workspaces']){
  const response=await fetch(`${url}/rest/v1/${table}?select=*`,{headers:{apikey:publishableKey}});
  assert([401,403].includes(response.status),table+' must deny direct client access');
 }
 const response=await fetch(`${url}/functions/v1/${functionName}`,{method:'OPTIONS',headers:{Origin:'https://unauthorized.example'}});
 assert.equal(response.status,403);
 console.log('PASS live API: anonymous/forged CRM requests denied, all six tables deny direct public access, unknown origin denied. No student writes.');
})().catch(e=>{console.error(e.message);process.exitCode=1;});
