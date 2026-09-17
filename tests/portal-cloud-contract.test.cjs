const test=require('node:test');
const assert=require('node:assert/strict');
const {changesBetween}=require('../platform/portal-cloud.js');
test('cloud persistence sends only modified student records',()=>{
 const before={students:[{id:'a',name:'A'},{id:'b',name:'B'}],schools:[{name:'school'}]};
 const after={...before,students:[{id:'a',name:'New A'},before.students[1]]};
 assert.deepEqual(changesBetween(before,after),[{id:'a',kind:'student',payload:after.students[0]}]);
});
test('account changes cannot flow through the ordinary student save endpoint',()=>{
 const before={students:[],schools:[],staffAccounts:[]};
 assert.deepEqual(changesBetween(before,{...before,staffAccounts:[{role:'admin'}]}),[]);
});
test('derived recalculation does not write every student but snapshots are saved',()=>{
 const student={id:'a',name:'A',studentProfile:{name:'A'},evaluationResult:{at:'old'},strategyResult:{id:'old'},reportSnapshots:[]};
 const before={students:[student],schools:[]};
 const after={...before,students:[{...student,evaluationResult:{at:'new'},strategyResult:{id:'new'},studentProfile:{name:'A',normalized:true}}]};
 assert.deepEqual(changesBetween(before,after),[]);
 after.students[0].reportSnapshots=[{id:'report',content:'saved'}];
 assert.equal(changesBetween(before,after)[0].id,'a');
});
test('remote config changes are explicit records',()=>{
 const changes=changesBetween({students:[],schools:[],teamEvents:[]},{students:[],schools:[{name:'A'}],teamEvents:[{title:'B'}]});
 assert.deepEqual(changes.map(c=>c.id),['__schools','__settings']);
});
test('backend rejects malformed parent profiles',async()=>{
 const {shapeProfile}=await import('../supabase/functions/prep-portal/service.mjs');
 assert.throws(()=>shapeProfile({basic:[],tests:[]}),/기본/);
 assert.throws(()=>shapeProfile({basic:{},tests:'wrong'}),/형식/);
 assert.throws(()=>shapeProfile({basic:{nationalities:{}}}),/형식/);
 assert.deepEqual(shapeProfile({basic:{},tests:[]}),{basic:{},tests:[]});
});
