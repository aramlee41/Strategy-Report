const assert=require('node:assert/strict');
module.exports=async function checkDesign(page,out){
  const button=name=>page.getByRole('button',{name,exact:true});
  assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex, nofollow, noarchive');
  // Mobile reads the same table data in task-sized rows, without duplicate controls.
  for(const width of [320,390,768,1024,1500]){
    await page.setViewportSize({width,height:1000});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Page overflow at ${width}`);
    if(width<=650){
      const table=page.locator('.ops-task-table').first();
      assert(await table.evaluate(el=>el.scrollWidth<=el.clientWidth),`Task table overflow at ${width}`);
      assert.equal(await table.locator('tbody tr').first().evaluate(el=>getComputedStyle(el).display),'grid');
    }
  }
  const placement=await page.evaluate(()=>{const q=document.querySelector('.workspace-queues').getBoundingClientRect(),i=document.querySelector('.workspace-inbox').getBoundingClientRect();return {next:i.x>=q.right,top:i.y<innerHeight};});
  assert(placement.next&&placement.top,'Updates must be beside work, not buried after the calendar');
  assert.equal(await page.getByRole('navigation',{name:'직원 메뉴'}).getByRole('button',{name:'대시보드',exact:true}).getAttribute('aria-current'),'page');
  await button('팀 구성').click();const dialog=page.getByRole('dialog');await dialog.waitFor();
  await page.keyboard.press('Tab');assert(await dialog.evaluate(el=>el.contains(document.activeElement)));
  await dialog.getByRole('button',{name:'팀 구성 저장',exact:true}).focus();await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'닫기');
  await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').count(),0);
  assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'팀 구성');
  await page.locator('.skip-link').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'workspace-main');
  const contrast=await page.evaluate(()=>{
    const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number);
    const lum=c=>c.map(x=>{const v=x/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
    return ['.side .navbtn:not(.active)','.navbtn.active','.work-title b','.work-owner','.ops-table thead th','.ops-team-filter .label','.ops-tag.late','.workspace-context time'].map(selector=>{
      const el=document.querySelector(selector);if(!el)throw Error('Missing contrast target '+selector);let p=el,bg;
      while(p){const s=getComputedStyle(p).backgroundColor;if(s!=='rgba(0, 0, 0, 0)'&&s!=='transparent'){bg=s;break;}p=p.parentElement;}
      const a=lum(rgb(getComputedStyle(el).color)),b=lum(rgb(bg||'rgb(255,255,255)'));return {selector,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
    });
  });
  for(const c of contrast)assert(c.ratio>=4.5,`${c.selector} contrast ${c.ratio}`);
  await page.mouse.move(0,0);await page.screenshot({path:out+'/workspace-redesign-desktop.png'});
  await page.setViewportSize({width:390,height:1000});await page.screenshot({path:out+'/workspace-redesign-mobile.png'});
  await button('업무 메뉴').click();await button('학생 관리').click();assert.equal(await button('업무 메뉴').getAttribute('aria-expanded'),'false');
  await page.getByLabel('학생·학교·태그 검색',{exact:true}).fill('시니어');
  await button('열기').first().click();await page.getByRole('navigation',{name:'학생 관리 영역'}).waitFor();
  await button('Stage 1–5').click();await button('기본 정보').click();
  const input=page.getByLabel('영문 이름',{exact:true});await input.waitFor();const inputId=await input.getAttribute('id');assert(inputId);
  await page.locator('label').filter({hasText:/^영문 이름$/}).click();assert.equal(await page.evaluate(()=>document.activeElement.id),inputId);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Student form mobile overflow');
  await page.screenshot({path:out+'/workspace-student-mobile.png'});
  await page.setViewportSize({width:1500,height:1050});await page.screenshot({path:out+'/workspace-student-desktop.png'});
  console.log('PASS design: 320/390/768/1024/1500 widths, work/update hierarchy, mobile task rows, navigation/skip link, dialog keyboard trap/return, form labels, sampled text contrast >=4.5:1, private-page noindex.');
};
