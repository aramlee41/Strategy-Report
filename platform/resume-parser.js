(function(root){
 const oldExtract=root.PrepIntake.extract;
 const clean=s=>String(s||'').replace(/\b(20|19)\s+(\d)\s*(\d)\b/g,'$1$2$3').replace(/\b(20\d)\s+(\d)\b/g,'$1$2').replace(/\bJun\s+e\b/gi,'June').replace(/\bCo\s*-\s*founder\b/gi,'Co-founder').replace(/\bM\s+ember\b/g,'Member').replace(/\b(\d+)\s+(st|nd|rd|th)\b/g,'$1$2').replace(/[ \t]+/g,' ').trim();
 const heads=[[/^(education(?:al background)?|academic background|학력|학교 정보)$/i,'education'],[/^(work|professional|employment|internship)( experience| history)?$/i,'work'],[/^(extracurricular(?: activities| experience)?|activities(?: & leadership)?|leadership(?: experience)?|활동|EC 활동)$/i,'ec'],[/^(community service|volunteer(?:ing)?(?: experience)?|봉사활동)$/i,'service'],[/^(honors?(?:\s*(?:&|and)\s*awards?)?|awards?|수상내역|수상)$/i,'award'],[/^(skills(?:\s*(?:&|and)\s*interests)?|interests|languages?|references?|certifications?|additional information|personal information|summary|objective|testing|test scores|시험|연락처)$/i,'other']];
 const head=s=>heads.find(([p])=>p.test(s.replace(/[:：]\s*$/,'')))?.[1];
 const months='(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sept?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';
 const numbers={jan:'01',feb:'02',mar:'03',apr:'04',may:'05',jun:'06',jul:'07',aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'};
 const token=months+'\\.?\\s*(?:19|20)\\d{2}|(?:19|20)\\d{2}[-/.](?:0?[1-9]|1[0-2])(?:[-/.]\\d{2})?';
 function month(s){const n=s.match(/((?:19|20)\d{2})[-/.](\d{1,2})/);if(n)return n[1]+'-'+n[2].padStart(2,'0');const m=s.match(new RegExp('('+months+')\\.?\\s*((?:19|20)\\d{2})','i'));return m?m[2]+'-'+numbers[m[1].slice(0,3).toLowerCase()]:'';}
 function period(s){const m=s.match(new RegExp('('+token+')\\s*[-–—]\\s*('+token+'|Present|Current|현재)','i'));return m?{from:month(m[1]),to:month(m[2]),status:/present|current|현재/i.test(m[2])?'진행 중':'완료',prefix:s.slice(0,m.index).replace(/[|;, ]+$/,'')}:null;}
 const category=s=>[/baseball|soccer|football|skiing|swimming|tennis|basketball|lineman|varsity|야구|축구|스키|수영/i.test(s)?'Sports':'',/cello|piano|violin|orchestra|첼로|피아노/i.test(s)?'Music':'',/math|robot|coding|ukmt|amc|수학|로봇/i.test(s)?'STEM':'',/volunteer|tutoring|봉사/i.test(s)?'Community Services':'',/debate|speech|토론/i.test(s)?'Debate/Speech':'',/painting|theater|미술|연극/i.test(s)?'Arts':''].find(Boolean)||'';
 const strip=s=>s.replace(/^[-*•●▪◦]\s*/,'');
 function extract(text,student={}){
  const input=String(text||'').split(/\r?\n/).map(raw=>({raw:raw.trim(),s:clean(raw)})).filter(x=>x.s),rows=[],unmatched=[];
  let section='',active=null,org='',orgRaw='',basic=null,lastDescription=false;
  const add=(r,raw)=>{r.evidence=raw;r.issues=r.issues||[];rows.push(r);active=r;lastDescription=false;return r;};
  const append=(r,raw)=>{r.evidence+='\n'+raw;};
  const dates=(r,s)=>{const p=period(s);if(p){Object.assign(r,{from:p.from,to:p.to,status:p.status});if(p.from&&p.to&&p.from>p.to)r.issues.push('시작일이 종료일보다 늦습니다. 원문 날짜를 확인해 주세요.');}};
  const details=(r,s)=>{dates(r,s);const h=s.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\s*\/\s*week/i)||s.match(/주당\s*(\d+(?:\.\d+)?)\s*시간/);if(h)r.hours=h[1];if(!r.cat)r.cat=category(s);};
  const schoolName=s=>{
   if(/diploma|graduat|participated|won |league|team|gpa|degree|^[-*•●]/i.test(s))return '';
   const korean=s.match(/^([가-힣A-Za-z0-9·. ]+?(?:대학교|고등학교|중학교|초등학교))(?=\s|$)/);
   if(korean)return korean[1];
   if(/^University of /i.test(s))return s.replace(/\s+(?:Online|[A-Z][a-z]+,\s*[A-Z]{2})$/,'');
   const m=s.match(/^(.+?\b(?:School|College|Academy|University))\b/);return m&&m[1].split(' ').length<=12?m[1]:'';
  };
  const title=s=>s.replace(/\s+(?:(?:San Diego|Daegu|Seoul|Busan|New York|Los Angeles)\s*,\s*(?:CA|NY|South Korea|Korea)|Online)$/i,'').trim();
  for(let i=0;i<input.length;i++){
   const {raw,s}=input[i],next=input[i+1]?.s||'',heading=head(s);
   if(heading){section=heading;active=null;org='';lastDescription=false;continue;}
   const email=s.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0];
   if(email){if(!basic)basic=add({kind:'basic'},raw);else append(basic,raw);basic.email=email;const phone=s.match(/\(?(\+\d{1,3})\)?\s*([\d][\d ()-]{7,}\d)/);if(phone){basic.phoneCountry=phone[1];basic.phone=phone[2].replace(/[ ()-]/g,'');}continue;}
   if(i===0&&!section&&/^[A-Za-z][A-Za-z .,'()’-]+$/.test(s)&&s.split(/\s+/).length<=6&&!/resume|curriculum|portfolio|school|college|university/i.test(s)&&input.slice(1,3).some(x=>/@/.test(x.s))){const alias=s.match(/\(([^)]+)\)/)?.[1]||'',parts=s.replace(/\([^)]+\)/g,'').trim().split(/\s+/);if(parts.length>=2){basic=add({kind:'basic',firstNameEn:parts.slice(0,-1).join(' '),lastNameEn:parts.at(-1),preferredName:alias,issues:['영문 이름과 성의 순서를 확인해 주세요.']},raw);continue;}}
   if(/^(?:활동|Activity|학교|School|수상|Award|Honor|할 일|TODO|Action|다음 액션|일정|Event|미팅 일정)\s*[:：]/i.test(s)||/^(SSAT|TOEFL|SAT|PSAT|ACT|IELTS|DET)\b/i.test(s)){
    const found=oldExtract(s,student).rows;if(found.length){for(const r of found)add(r,raw);continue;}
   }
   const bullet=/^[-*•●▪◦]\s*/.test(s),p=period(s),nextP=period(next);
   if(bullet&&active?.kind==='ec'){active.impact=(active.impact?active.impact+'\n':'')+strip(s);append(active,raw);details(active,s);lastDescription=true;continue;}
   if(section==='education'){
    const name=schoolName(s);if(name){add({kind:'education',school:name,schoolPlacement:student.school?.toLowerCase()===name.toLowerCase()?'current':'previous'},raw);continue;}
    if(active?.kind==='education'&&!bullet){append(active,raw);active.details=(active.details?active.details+'\n':'')+s;dates(active,s);if(/graduat/i.test(s))active.graduationMonth=month(s);const g=s.match(/\bGPA\s*[:：]?\s*(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+(?:\.\d+)?))?/i);if(g){active.reportedGpa=g[1];active.reportedGpaScale=g[2]||'';active.issues.push('이 GPA는 학기 성적으로 자동 변환하지 않습니다. 성적표에서 기간과 체계를 확인해 주세요.');}continue;}
   }
   if(section==='award'){const r=oldExtract('Awards\n'+s,student).rows[0];if(r){r.date=month(s)||r.date;add(r,raw);continue;}}
   if(['work','ec','service'].includes(section)){
    const cat=section==='work'?'Internship/Entrepreneurship':section==='service'?'Community Services':'';
    if(p&&!p.prefix&&active?.kind==='ec'){dates(active,s);append(active,raw);continue;}
    if(p&&org&&p.prefix){const r=add({kind:'ec',name:org,position:p.prefix,cat:cat||category(org)},orgRaw+'\n'+raw);details(r,s);continue;}
    const nextRoleHeader=nextP&&!/^[a-z]/.test(s)&&(!/[.!?]$/.test(s)||/Ltd\.$/i.test(s));
    if(!bullet&&(nextRoleHeader||!active||!lastDescription)){
     org=title(p?p.prefix:s).split(/\s*[|;]\s*/)[0];orgRaw=raw;
     if(nextP?.prefix){active=null;continue;}
     const r=add({kind:'ec',name:org,cat:cat||category(org)},raw);details(r,s);continue;
    }
    if(active?.kind==='ec'){active.impact=(active.impact?active.impact+' ':'')+strip(s);append(active,raw);details(active,s);continue;}
   }
   unmatched.push(raw);
  }
  for(const r of rows)if(r.kind==='ec'&&!r.cat)r.issues.push('활동 분류를 확인해 주세요. 관심사만으로 활동을 만들지 않습니다.');
  return {rows,unmatched,warnings:['섹션과 활동별로 묶은 입력 후보입니다. 선택한 항목만 저장되며, 날짜·이름·분류를 검토해 주세요.',...(unmatched.length?['자동 분류하지 않은 원문 '+unmatched.length+'줄이 있습니다. 아래 미분류 내용을 확인해 주세요.']:[])]};
 }
 root.PrepIntake.extractResume=extract;
 if(typeof module!=='undefined'&&module.exports)module.exports={extract};
})(typeof window==='undefined'?globalThis:window);
