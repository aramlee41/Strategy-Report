create table public.prep_workspaces (
  user_id uuid primary key references public.prep_members(user_id) on delete cascade,
  payload jsonb not null default '{}',
  version bigint not null default 1,
  updated_at timestamptz not null default now()
);
alter table public.prep_workspaces enable row level security;
revoke all on public.prep_workspaces from anon,authenticated;
grant all on public.prep_workspaces to service_role;

create function public.prep_save_workspace(actor uuid, expected_version bigint, content jsonb)
returns bigint language plpgsql security invoker set search_path='' as $$
declare current_version bigint; next_version bigint;
begin
  if not exists(select 1 from public.prep_members where user_id=actor and active and role in ('admin','staff')) then raise exception 'ACCESS_DENIED' using errcode='42501'; end if;
  perform pg_advisory_xact_lock(hashtextextended(actor::text,0));
  select version into current_version from public.prep_workspaces where user_id=actor for update;
  if coalesce(current_version,0) is distinct from expected_version then raise exception 'VERSION_CONFLICT' using errcode='40001'; end if;
  insert into public.prep_workspaces(user_id,payload) values(actor,content)
  on conflict(user_id) do update set payload=excluded.payload,version=prep_workspaces.version+1,updated_at=now()
  returning version into next_version;
  insert into public.prep_audit(actor_id,event) values(actor,'workspace_save');
  return next_version;
end $$;
revoke all on function public.prep_save_workspace(uuid,bigint,jsonb) from public,anon,authenticated;
grant execute on function public.prep_save_workspace(uuid,bigint,jsonb) to service_role;
