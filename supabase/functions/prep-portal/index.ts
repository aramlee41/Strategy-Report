import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import { allowedOrigins, createService, PortalError } from "./service.mjs";
// Deployment bundles the same model used by the browser as ./model.js.
import "./model.js";
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false, autoRefreshToken: false } });
const dispatch = createService(db, (globalThis as any).PrepParentModel);
Deno.serve(async req => {
  const origin = req.headers.get("origin");
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store", "Vary": "Origin", "Access-Control-Allow-Headers": "authorization,apikey,content-type,x-client-info", "Access-Control-Allow-Methods": "POST, OPTIONS", ...(origin && allowedOrigins.has(origin) ? { "Access-Control-Allow-Origin": origin } : {}) };
  if (origin && !allowedOrigins.has(origin)) return new Response(JSON.stringify({error:"허용되지 않은 주소입니다."}),{status:403,headers});
  if (req.method === "OPTIONS") return new Response(null,{status:204,headers});
  if (req.method !== "POST") return new Response(JSON.stringify({error:"POST 요청이 필요합니다."}),{status:405,headers});
  try {
    const text=await req.text();
    if(text.length>8_000_000) throw new PortalError("한 번에 저장할 자료가 너무 많습니다.",413);
    const token=req.headers.get("Authorization")?.replace(/^Bearer\s+/i,"") || "";
    const result=await dispatch(JSON.parse(text),token);
    return new Response(JSON.stringify(result),{headers});
  } catch(e) {
    const status=e instanceof PortalError?e.status:400;
    const message=e instanceof PortalError?e.message:(e instanceof SyntaxError?"요청 형식을 확인해 주세요.":"요청을 처리하지 못했습니다. 입력 내용을 확인해 주세요.");
    return new Response(JSON.stringify({error:message,code:e instanceof PortalError?e.code:"INVALID_REQUEST"}),{status,headers});
  }
});
