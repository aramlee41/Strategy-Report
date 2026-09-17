create table public.prep_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  role text not null check (role in ('admin','staff','parent')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.prep_records (
  id text primary key,
  kind text not null check (kind in ('student','config')),
  payload jsonb not null,
  version bigint not null default 1,
  updated_at timestamptz not null default now()
);
create table public.prep_student_access (
  student_id text not null references public.prep_records(id) on delete cascade,
  user_id uuid not null references public.prep_members(user_id) on delete cascade,
  access_role text not null check (access_role in ('staff','parent')),
  primary key (student_id,user_id)
);
create index prep_student_access_user_idx on public.prep_student_access(user_id,student_id);
create table public.prep_invitations (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  email text not null,
  name text not null,
  role text not null check (role in ('admin','staff','parent')),
  student_ids text[] not null default '{}',
  created_by uuid references public.prep_members(user_id),
  expires_at timestamptz not null default now() + interval '3 days',
  status text not null default 'pending' check (status in ('pending','reserved','accepted','revoked')),
  reservation uuid,
  reserved_at timestamptz,
  accepted_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create index prep_invitations_creator_idx on public.prep_invitations(created_by);
create table public.prep_audit (
  id bigint generated always as identity primary key,
  actor_id uuid,
  event text not null,
  record_ids text[] not null default '{}',
  created_at timestamptz not null default now()
);
alter table public.prep_members enable row level security;
alter table public.prep_records enable row level security;
alter table public.prep_student_access enable row level security;
alter table public.prep_invitations enable row level security;
alter table public.prep_audit enable row level security;
-- The Edge Function is the sole data API; browser roles have no table access.
revoke all on public.prep_members,public.prep_records,public.prep_student_access,public.prep_invitations,public.prep_audit from anon,authenticated;
grant all on public.prep_members,public.prep_records,public.prep_student_access,public.prep_invitations,public.prep_audit to service_role;
grant usage,select on sequence public.prep_audit_id_seq to service_role;

create function public.prep_commit(actor uuid, changes jsonb, event_name text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare m public.prep_members; c jsonb; r public.prep_records; versions jsonb := '{}'; ids text[] := '{}'; owner_id text;
begin
  select * into m from public.prep_members where user_id=actor and active;
  if not found then raise exception 'ACCESS_DENIED' using errcode='42501'; end if;
  if jsonb_array_length(changes)>250 then raise exception 'BATCH_TOO_LARGE'; end if;
  for c in select value from jsonb_array_elements(changes) order by value->>'id' loop
    select * into r from public.prep_records where id=c->>'id' for update;
    if found then
      if r.version is distinct from (c->>'expectedVersion')::bigint then raise exception 'VERSION_CONFLICT:%',r.id using errcode='40001'; end if;
      if m.role <> 'admin' and (r.kind='config' or not exists(select 1 from public.prep_student_access where student_id=r.id and user_id=actor)) then
        raise exception 'ACCESS_DENIED' using errcode='42501';
      end if;
      if m.role='parent' and coalesce((r.payload#>>'{parentPortal,enabled}')::boolean,false) is not true then raise exception 'ACCESS_DENIED' using errcode='42501'; end if;
      update public.prep_records set payload=c->'payload', version=version+1, updated_at=now() where id=r.id returning * into r;
    else
      if coalesce((c->>'expectedVersion')::bigint,0) <> 0 then raise exception 'VERSION_CONFLICT' using errcode='40001'; end if;
      if m.role='parent' or (c->>'kind'='config' and m.role<>'admin') then raise exception 'ACCESS_DENIED' using errcode='42501'; end if;
      insert into public.prep_records(id,kind,payload) values(c->>'id',c->>'kind',c->'payload') returning * into r;
      if r.kind='student' then insert into public.prep_student_access(student_id,user_id,access_role) values(r.id,actor,'staff') on conflict do nothing; end if;
    end if;
    if r.kind='student' and m.role='admin' then
      delete from public.prep_student_access where student_id=r.id and access_role='staff';
      for owner_id in select jsonb_array_elements_text(coalesce(r.payload->'owners','[]')) loop
        if exists(select 1 from public.prep_members where user_id::text=owner_id and role in ('admin','staff') and active) then
          insert into public.prep_student_access values(r.id,owner_id::uuid,'staff') on conflict do nothing;
        end if;
      end loop;
    end if;
    versions := versions || jsonb_build_object(r.id,r.version);
    ids := array_append(ids,r.id);
  end loop;
  insert into public.prep_audit(actor_id,event,record_ids) values(actor,event_name,ids);
  return versions;
end $$;

create function public.prep_reserve_invitation(hash text, claim uuid)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare inv public.prep_invitations;
begin
  select * into inv from public.prep_invitations where token_hash=hash for update;
  if not found or inv.expires_at < now() or inv.status in ('accepted','revoked') or (inv.status='reserved' and inv.reserved_at > now()-interval '5 minutes') then
    raise exception 'INVALID_INVITATION' using errcode='42501';
  end if;
  update public.prep_invitations set status='reserved', reservation=claim, reserved_at=now() where id=inv.id;
  return jsonb_build_object('id',inv.id,'email',inv.email,'name',inv.name,'role',inv.role);
end $$;

create function public.prep_finish_invitation(invitation_id uuid, claim uuid, account_id uuid)
returns void language plpgsql security invoker set search_path = '' as $$
declare inv public.prep_invitations; existing public.prep_members; sid text; account_email text;
begin
  select * into inv from public.prep_invitations where id=invitation_id for update;
  if not found or inv.status <> 'reserved' or inv.reservation <> claim or inv.expires_at < now() then raise exception 'INVALID_INVITATION' using errcode='42501'; end if;
  select lower(email) into account_email from auth.users where id=account_id;
  if account_email is distinct from lower(inv.email) then raise exception 'EMAIL_MISMATCH' using errcode='42501'; end if;
  if inv.created_by is not null and not exists(select 1 from public.prep_members where user_id=inv.created_by and active and role in ('admin','staff')) then raise exception 'INVITER_DISABLED' using errcode='42501'; end if;
  select * into existing from public.prep_members where user_id=account_id;
  if found and existing.role <> inv.role then raise exception 'ACCOUNT_ROLE_CONFLICT' using errcode='42501'; end if;
  insert into public.prep_members(user_id,email,name,role) values(account_id,lower(inv.email),inv.name,inv.role) on conflict(user_id) do nothing;
  if not exists(select 1 from public.prep_members where user_id=account_id and active) then raise exception 'ACCOUNT_DISABLED' using errcode='42501'; end if;
  foreach sid in array inv.student_ids loop
    if inv.created_by is not null and not exists(select 1 from public.prep_members where user_id=inv.created_by and role='admin' and active) and not exists(select 1 from public.prep_student_access where student_id=sid and user_id=inv.created_by and access_role='staff') then raise exception 'ACCESS_DENIED' using errcode='42501'; end if;
    insert into public.prep_student_access values(sid,account_id,case when inv.role='parent' then 'parent' else 'staff' end) on conflict do nothing;
    if inv.role='parent' then
      update public.prep_records set payload=jsonb_set(jsonb_set(payload,'{parentPortal,parentEmail}',to_jsonb(lower(inv.email)),true),'{parentPortal,enabled}','true',true),version=version+1,updated_at=now() where id=sid;
    end if;
  end loop;
  update public.prep_invitations set status='accepted',accepted_by=account_id,reservation=null where id=inv.id;
  insert into public.prep_audit(actor_id,event,record_ids) values(account_id,'invitation_accepted',inv.student_ids);
end $$;

revoke all on function public.prep_commit(uuid,jsonb,text), public.prep_reserve_invitation(text,uuid), public.prep_finish_invitation(uuid,uuid,uuid) from public,anon,authenticated;
grant execute on function public.prep_commit(uuid,jsonb,text), public.prep_reserve_invitation(text,uuid), public.prep_finish_invitation(uuid,uuid,uuid) to service_role;
