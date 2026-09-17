(function(root){
 const lines=text=>String(text||'').split(/\n/).map(x=>x.trim()).filter(Boolean);
 const categories=[[/baseball|soccer|skiing|swimming|tennis|basketball|야구|축구|스키|수영/i,'Sports'],[/cello|piano|violin|orchestra|첼로|피아노|바이올린/i,'Music'],[/math|robot|coding|ukmt|amc|수학|로봇|코딩/i,'STEM'],[/volunteer|tutoring|봉사|튜터/i,'Community Services'],[/debate|speech|토론/i,'Debate/Speech'],[/painting|theater|미술|연극/i,'Arts']];
 function extract(text,student={}) {
  const rows=[],warnings=[],known=Array.isArray(student.ecs)?student.ecs:[];
  const date=line=>line.match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0]||'';
  const category=name=>categories.find(([pattern])=>pattern.test(name))?.[1]||'';
  let section='';
  for(const [index,line] of lines(text).entries()) {
   if(/^(education|학력|학교 정보)\s*:?$/i.test(line)){section='education';continue;}
   if(/^(activities|extracurricular activities|활동|EC 활동)\s*:?$/i.test(line)){section='ec';continue;}
   if(/^(honors(?:\s*&\s*awards)?|awards|수상내역|수상)\s*:?$/i.test(line)){section='award';continue;}
   if(/^(skills|testing|test scores|시험|연락처)\s*:?$/i.test(line)){section='';continue;}
   const evidence=line,phone=line.match(/(?:phone|mobile|전화|휴대폰)\s*[:：]\s*([+\d()\s-]+)/i),email=line.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0];
   if(email&&!rows.some(r=>r.email===email))rows.push({kind:'basic',email,evidence});
   if(phone)warnings.push('전화번호는 기본 정보의 지역번호와 함께 확인해 주세요.');
   const test=line.match(/\b(SSAT|TOEFL(?:\s+Jr)?|SAT|PSAT|ACT|IELTS|DET)\b\s*[:：-]?\s*(\d+(?:\.\d+)?)/i);
   if(test){const testType=test[1].toUpperCase()==='TOEFL JR'?'TOEFL Jr':test[1].toUpperCase(),score=test[2],percentile=testType==='SSAT'&&/%|percentile|퍼센타일/i.test(line)?score:'';rows.push({kind:'test',testType,overall:percentile?'':score,percentile,date:date(line),scoreScale:testType==='TOEFL'&&Number(score)>6?'120':'',evidence});continue;}
   const task=line.match(/^(?:[-*•]\s*)?(?:할 일|TODO|Action|다음 액션)\s*[:：]\s*(.+)/i);
   if(task){rows.push({kind:'task',title:task[1].replace(date(line),'').trim(),date:date(line),evidence});continue;}
   const event=line.match(/^(?:일정|Event|미팅 일정)\s*[:：]\s*(.+)/i);
   if(event){rows.push({kind:'event',title:event[1].replace(date(line),'').trim(),date:date(line),evidence});continue;}
   const award=line.match(/^(?:수상|Award|Honor)\s*[:：]\s*(.+)/i);
   if(award||section==='award'){
    const level=/International|국제/i.test(line)?'International':/National|전국/i.test(line)?'National':/Regional|Local|지역/i.test(line)?'Regional/Local':/School|교내/i.test(line)?'School':'';
    rows.push({kind:'award',awardName:(award?.[1]||line).replace(/^[-*•]\s*/,''),level,date:line.match(/\b\d{4}-\d{2}\b/)?.[0]||date(line).slice(0,7),evidence});continue;
   }
   const activity=line.match(/^(?:활동|Activity)\s*[:：]\s*(.+)/i),matched=known.find(e=>e.name&&line.toLowerCase().includes(e.name.toLowerCase()));
   const hours=line.match(/(?:주(?:당)?\s*|weekly\s*[:：]?\s*)(\d+(?:\.\d+)?)\s*(?:시간|hours?|hrs?)/i)||line.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\s*\/\s*week/i);
   const role=line.match(/(?:역할|포지션|role|position)\s*[:：]\s*([^;|,]+)/i);
   if(activity||section==='ec'||matched&&(hours||role)){
    const raw=(activity?.[1]||line).replace(/^[-*•]\s*/,'');const name=matched?.name||raw.split(/\s*[|;]\s*/)[0].trim();
    rows.push({kind:'ec',name,cat:matched?.cat||category(name),targetId:matched?.id||matched?.activityId||(matched?'ec-'+known.indexOf(matched):''),hours:hours?.[1]||'',position:role?.[1]?.trim()||'',activityScope:/교내|학교 활동|school club/i.test(line)?'school':/교외|외부 활동|external/i.test(line)?'external':'',evidence});continue;
   }
   const school=line.match(/^(?:학교|School)\s*[:：]\s*(.+)/i);
   if(school||section==='education'&&/school|academy|학교/i.test(line))rows.push({kind:'education',school:(school?.[1]||line).replace(/^[-*•]\s*/,''),evidence});
  }
  return {rows,warnings:[...new Set([...warnings,'원문에서 확인한 항목만 추출했습니다. 반영할 항목과 날짜·분류를 검토해 주세요.'])]};
 }
 async function readPdf(file) {
  const pdfjs=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
  const pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false}).promise;
  try {
   if(pdf.numPages>30)throw Error('30페이지 이하 Resume를 선택해 주세요.');
   const pages=[];
   for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const content=await page.getTextContent();pages.push(content.items.map(x=>x.str+(x.hasEOL?'\n':' ')).join(''));}
   const raw=pages.join('\n\n');if(raw.trim().length<30)throw Error('스캔 이미지 PDF는 OCR 처리한 PDF 또는 텍스트로 준비해 주세요.');return raw;
  } finally {await pdf.destroy();}
 }
 root.PrepIntake={extract,readPdf};if(typeof module!=='undefined'&&module.exports)module.exports=root.PrepIntake;
})(typeof window==='undefined'?globalThis:window);
