create policy "all"
on "storage"."buckets"
as permissive
for all
to public
using (true)
with check (true);


create policy "all"
on "storage"."objects"
as permissive
for all
to public
using (true)
with check (true);



