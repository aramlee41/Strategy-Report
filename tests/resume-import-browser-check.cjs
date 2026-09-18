const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=async(page,fixture,out)=>{
 const source=fs.readFileSync(__dirname+'/fixtures/resume-multisection.txt','utf8'),before=JSON.stringify(fixture.students[0]);
 await page.getByLabel('파일 선택 (PDF / TXT)').setInputFiles({name:'multi-section-resume.txt',mimeType:'text/plain',buffer:Buffer.from(source)});
 await page.getByRole('button',{name:'기록에서 입력 후보 찾기',exact:true}).click();
 const dialog=page.getByRole('dialog'),cards=dialog.locator('article.ops-item');
 assert.equal(await cards.count(),14);assert.equal(await dialog.getByLabel('학교',{exact:true}).count(),3);assert.equal(await dialog.getByLabel('활동명 / 회사명',{exact:true}).count(),10);
 assert.equal(await dialog.getByLabel('영문 이름',{exact:true}).inputValue(),'Alex');assert.equal(await dialog.getByLabel('Preferred Name',{exact:true}).inputValue(),'Andy');
 assert.equal(await dialog.getByRole('checkbox',{checked:true}).count(),0);assert.equal(JSON.stringify(fixture.students[0]),before);
 await dialog.getByText('미분류 원문 (3줄)',{exact:true}).click();await dialog.getByText('Technical: Microsoft Office (Intermediate)',{exact:false}).waitFor();
 const schools=cards.filter({has:page.getByLabel('학교',{exact:true})});
 await schools.nth(1).getByRole('checkbox').check();await dialog.getByRole('button',{name:'선택 항목 반영',exact:true}).click();
 await dialog.getByText('시작 연월이 종료 연월보다 늦습니다. 날짜를 수정하거나 해당 항목을 선택 해제해 주세요.',{exact:true}).waitFor();assert.equal(JSON.stringify(fixture.students[0]),before);
 await schools.nth(1).getByLabel('재학 종료 연월',{exact:true}).fill('2025-01');
 for(let i=0;i<3;i++)await schools.nth(i).getByRole('checkbox').check();
 const activities=cards.filter({has:page.getByLabel('활동명 / 회사명',{exact:true})});
 for(let i=0;i<10;i++){
  const a=activities.nth(i);if(await a.getByLabel('활동명 / 회사명',{exact:true}).inputValue()==='PUBG Live Streaming')await a.getByLabel('활동 분류',{exact:true}).selectOption('Journalism/Publication');
  await a.getByRole('checkbox').check();
 }
 await cards.nth(0).scrollIntoViewIfNeeded();await page.screenshot({path:out+'/resume-intake-review-desktop.png'});
 await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:out+'/resume-intake-review-mobile.png'});
 await page.setViewportSize({width:1440,height:1000});await dialog.getByRole('button',{name:'선택 항목 반영',exact:true}).click();await dialog.waitFor({state:'hidden'});
 const s=fixture.students[0];assert.equal(s.school,'Phillips Exeter Academy');assert.equal(s.ecs.length,11);assert.equal(s.ecs.filter(x=>x.name==='Example Industrial Co.,Ltd.').length,3);assert.equal(s.previousSchools.filter(x=>x.name).length,3);assert(s.previousSchools.find(x=>x.name==='Calvin Christian High School').notes.includes('Diploma'));
 assert.equal(s.previousSchools.find(x=>x.name==='University of North Dakota').intakeSource.toMonth,'2025-01');assert(s.ecs.find(x=>x.name==='Calvin Christian Crusaders').impact.includes('local high school league'));assert(!s.basic.personalEmail);assert(s.academicTerms.every(t=>!t.termGpa)); 
 await page.getByLabel('추출한 텍스트 (외부 전송 없음)').fill('student@example.com | (+82) 10 - 0000 - 0000');
 await page.getByRole('button',{name:'기록에서 입력 후보 찾기',exact:true}).click();await dialog.getByRole('checkbox').check();
 await dialog.getByRole('button',{name:'선택 항목 반영',exact:true}).click();await dialog.waitFor({state:'hidden'});
 assert.equal(fixture.students[0].basic.personalEmail,'student@example.com');assert(fixture.students[0].basic.phones.some(p=>p.countryCode==='+82 대한민국'&&p.number==='1000000000'));
 await page.getByRole('button',{name:'기록에서 입력 후보 찾기',exact:true}).click();await dialog.getByRole('checkbox').check();
 await dialog.getByRole('button',{name:'선택 항목 반영',exact:true}).click();await dialog.waitFor({state:'hidden'});
 assert.equal(fixture.students[0].basic.phones.filter(p=>p.number==='1000000000').length,1);
 console.log('PASS Resume import: 3 schools / 10 activities, source grouping, editable review, no auto-save, invalid dates blocked, real previous-school schema, 3 separate company roles, contacts deduplicated, mobile, no semester GPA fabricated. Synthetic source; no real student writes.');
};
