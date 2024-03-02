create table "public"."bank_account_link" (
    "id" uuid not null default gen_random_uuid(),
    "link_id" uuid not null,
    "institution" text not null,
    "status" text not null default 'pending'::text,
    "customer_id" uuid not null
);


CREATE UNIQUE INDEX banking_account_link_link_id_key ON public.bank_account_link USING btree (link_id);

CREATE UNIQUE INDEX banking_account_link_pkey ON public.bank_account_link USING btree (id);

alter table "public"."bank_account_link" add constraint "banking_account_link_pkey" PRIMARY KEY using index "banking_account_link_pkey";

alter table "public"."bank_account_link" add constraint "banking_account_link_link_id_key" UNIQUE using index "banking_account_link_link_id_key";

alter table "public"."bank_account_link" add constraint "public_banking_account_link_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id) not valid;

alter table "public"."bank_account_link" validate constraint "public_banking_account_link_customer_id_fkey";

grant delete on table "public"."bank_account_link" to "anon";

grant insert on table "public"."bank_account_link" to "anon";

grant references on table "public"."bank_account_link" to "anon";

grant select on table "public"."bank_account_link" to "anon";

grant trigger on table "public"."bank_account_link" to "anon";

grant truncate on table "public"."bank_account_link" to "anon";

grant update on table "public"."bank_account_link" to "anon";

grant delete on table "public"."bank_account_link" to "authenticated";

grant insert on table "public"."bank_account_link" to "authenticated";

grant references on table "public"."bank_account_link" to "authenticated";

grant select on table "public"."bank_account_link" to "authenticated";

grant trigger on table "public"."bank_account_link" to "authenticated";

grant truncate on table "public"."bank_account_link" to "authenticated";

grant update on table "public"."bank_account_link" to "authenticated";

grant delete on table "public"."bank_account_link" to "service_role";

grant insert on table "public"."bank_account_link" to "service_role";

grant references on table "public"."bank_account_link" to "service_role";

grant select on table "public"."bank_account_link" to "service_role";

grant trigger on table "public"."bank_account_link" to "service_role";

grant truncate on table "public"."bank_account_link" to "service_role";

grant update on table "public"."bank_account_link" to "service_role";


