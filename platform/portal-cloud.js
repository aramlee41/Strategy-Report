(function(root) {
  let client;
  function authClient() {
    if (!client) {
      const config=root.PREP_CLOUD_CONFIG;
      if (!config || !root.supabase) throw new Error('로그인 서비스를 불러오지 못했습니다. 새로고침해 주세요.');
      client=root.supabase.createClient(config.url,config.publishableKey,{auth:{storage:sessionStorage,persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
    }
    return client;
  }
  async function call(body, anonymous = false) {
    const config=root.PREP_CLOUD_CONFIG;
    const {data:{session}}=await authClient().auth.getSession();
    const headers={'Content-Type':'application/json',apikey:config.publishableKey};
    if(session?.access_token && !anonymous) headers.Authorization='Bearer '+session.access_token;
    else if(!anonymous) throw new Error('로그인이 필요합니다.');
    const portal=new URLSearchParams(root.location.search).get('portal');
    const response=await fetch(config.url+'/functions/v1/'+config.functionName,{method:'POST',headers,body:JSON.stringify({...body,portal}),cache:'no-store'});
    const data=await response.json();
    if(!response.ok) { const e=new Error(data.error||'서버 연결에 실패했습니다.');e.code=data.code;e.status=response.status;throw e; }
    return data;
  }
  function changesBetween(before, after) {
    const changes=[];
    const previous=new Map((before.students||[]).map(s=>[s.id,s]));
    // Recalculation timestamps are not student edits; report snapshots remain persisted.
    const source=s=>s&&Object.fromEntries(Object.entries(s).filter(([key])=>!['evaluationResult','strategyResult','studentProfile'].includes(key)));
    for(const s of after.students||[]) if(JSON.stringify(source(previous.get(s.id)))!==JSON.stringify(source(s))) changes.push({id:s.id,kind:'student',payload:s});
    if(JSON.stringify(before.schools)!==JSON.stringify(after.schools)) changes.push({id:'__schools',kind:'config',payload:{schools:after.schools}});
    if(JSON.stringify(before.teamEvents||[])!==JSON.stringify(after.teamEvents||[])||JSON.stringify(before.opportunities)!==JSON.stringify(after.opportunities)||JSON.stringify(before.staffTeams||{})!==JSON.stringify(after.staffTeams||{})) changes.push({id:'__settings',kind:'config',payload:{teamEvents:after.teamEvents||[],staffTeams:after.staffTeams||{},...(after.opportunities?{opportunities:after.opportunities}:{})}});
    return changes;
  }
  root.PrepCloud={authClient,call,changesBetween};
  if(typeof module!=='undefined'&&module.exports) module.exports={changesBetween};
})(typeof window==='undefined'?globalThis:window);
