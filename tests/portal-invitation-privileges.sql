-- Run against the deployed database: no account or invitation is created.
begin;
set local role service_role;
do $$
begin
  if not has_column_privilege(current_user,'auth.users','id','SELECT')
     or not has_column_privilege(current_user,'auth.users','email','SELECT') then
    raise exception 'Invitation acceptance cannot verify the Auth identity';
  end if;
  if has_column_privilege(current_user,'auth.users','encrypted_password','SELECT') then
    raise exception 'Invitation service has excessive Auth access';
  end if;
  perform id,email from auth.users limit 1;
  if has_function_privilege('anon','public.prep_finish_invitation(uuid,uuid,uuid)','EXECUTE')
     or has_function_privilege('authenticated','public.prep_finish_invitation(uuid,uuid,uuid)','EXECUTE') then
    raise exception 'Browser roles must not finalize invitations directly';
  end if;
end $$;
rollback;
