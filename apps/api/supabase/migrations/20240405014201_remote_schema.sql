revoke delete on table "public"."ynab_acounts" from "anon";

revoke insert on table "public"."ynab_acounts" from "anon";

revoke references on table "public"."ynab_acounts" from "anon";

revoke select on table "public"."ynab_acounts" from "anon";

revoke trigger on table "public"."ynab_acounts" from "anon";

revoke truncate on table "public"."ynab_acounts" from "anon";

revoke update on table "public"."ynab_acounts" from "anon";

revoke delete on table "public"."ynab_acounts" from "authenticated";

revoke insert on table "public"."ynab_acounts" from "authenticated";

revoke references on table "public"."ynab_acounts" from "authenticated";

revoke select on table "public"."ynab_acounts" from "authenticated";

revoke trigger on table "public"."ynab_acounts" from "authenticated";

revoke truncate on table "public"."ynab_acounts" from "authenticated";

revoke update on table "public"."ynab_acounts" from "authenticated";

revoke delete on table "public"."ynab_acounts" from "service_role";

revoke insert on table "public"."ynab_acounts" from "service_role";

revoke references on table "public"."ynab_acounts" from "service_role";

revoke select on table "public"."ynab_acounts" from "service_role";

revoke trigger on table "public"."ynab_acounts" from "service_role";

revoke truncate on table "public"."ynab_acounts" from "service_role";

revoke update on table "public"."ynab_acounts" from "service_role";

alter table "public"."ynab_acounts" drop constraint "public_ynab_account_bank_account_id_fkey";

alter table "public"."ynab_acounts" drop constraint "ynab_account_customer_id_fkey";

alter table "public"."ynab_acounts" drop constraint "ynab_account_ynab_account_id_key";

alter table "public"."banking_bank_accounts" drop constraint "public_bank_accounts_ynab_account_id_fkey";

alter table "public"."ynab_acounts" drop constraint "ynab_account_pkey";

drop index if exists "public"."ynab_account_pkey";

drop index if exists "public"."ynab_account_ynab_account_id_key";

drop table "public"."ynab_acounts";

create table "public"."ynab_accounts" (
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "balance" real not null default '0'::real,
    "budget_id" uuid not null,
    "ynab_account_id" uuid not null,
    "id" uuid not null default gen_random_uuid(),
    "customer_id" uuid not null,
    "type" text not null,
    "bank_account_id" uuid,
    "last_synced_at" timestamp without time zone
);


CREATE UNIQUE INDEX ynab_account_pkey ON public.ynab_accounts USING btree (id);

CREATE UNIQUE INDEX ynab_account_ynab_account_id_key ON public.ynab_accounts USING btree (ynab_account_id);

alter table "public"."ynab_accounts" add constraint "ynab_account_pkey" PRIMARY KEY using index "ynab_account_pkey";

alter table "public"."ynab_accounts" add constraint "public_ynab_account_bank_account_id_fkey" FOREIGN KEY (bank_account_id) REFERENCES banking_bank_accounts(id) not valid;

alter table "public"."ynab_accounts" validate constraint "public_ynab_account_bank_account_id_fkey";

alter table "public"."ynab_accounts" add constraint "ynab_account_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES identity_customers(id) not valid;

alter table "public"."ynab_accounts" validate constraint "ynab_account_customer_id_fkey";

alter table "public"."ynab_accounts" add constraint "ynab_account_ynab_account_id_key" UNIQUE using index "ynab_account_ynab_account_id_key";

alter table "public"."banking_bank_accounts" add constraint "public_bank_accounts_ynab_account_id_fkey" FOREIGN KEY (ynab_account_id) REFERENCES ynab_accounts(id) not valid;

alter table "public"."banking_bank_accounts" validate constraint "public_bank_accounts_ynab_account_id_fkey";

grant delete on table "public"."ynab_accounts" to "anon";

grant insert on table "public"."ynab_accounts" to "anon";

grant references on table "public"."ynab_accounts" to "anon";

grant select on table "public"."ynab_accounts" to "anon";

grant trigger on table "public"."ynab_accounts" to "anon";

grant truncate on table "public"."ynab_accounts" to "anon";

grant update on table "public"."ynab_accounts" to "anon";

grant delete on table "public"."ynab_accounts" to "authenticated";

grant insert on table "public"."ynab_accounts" to "authenticated";

grant references on table "public"."ynab_accounts" to "authenticated";

grant select on table "public"."ynab_accounts" to "authenticated";

grant trigger on table "public"."ynab_accounts" to "authenticated";

grant truncate on table "public"."ynab_accounts" to "authenticated";

grant update on table "public"."ynab_accounts" to "authenticated";

grant delete on table "public"."ynab_accounts" to "service_role";

grant insert on table "public"."ynab_accounts" to "service_role";

grant references on table "public"."ynab_accounts" to "service_role";

grant select on table "public"."ynab_accounts" to "service_role";

grant trigger on table "public"."ynab_accounts" to "service_role";

grant truncate on table "public"."ynab_accounts" to "service_role";

grant update on table "public"."ynab_accounts" to "service_role";


