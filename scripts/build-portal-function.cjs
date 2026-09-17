const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
fs.copyFileSync(path.join(root,'platform','parent-portal-model.js'),path.join(root,'supabase','functions','prep-portal','model.js'));
console.log('Bundled the shared parent-profile validation model for the Edge Function.');
