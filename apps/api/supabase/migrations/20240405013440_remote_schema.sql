revoke delete on table "public"."bank_accounts" from "anon";

revoke insert on table "public"."bank_accounts" from "anon";

revoke references on table "public"."bank_accounts" from "anon";

revoke select on table "public"."bank_accounts" from "anon";

revoke trigger on table "public"."bank_accounts" from "anon";

revoke truncate on table "public"."bank_accounts" from "anon";

revoke update on table "public"."bank_accounts" from "anon";

revoke delete on table "public"."bank_accounts" from "authenticated";

revoke insert on table "public"."bank_accounts" from "authenticated";

revoke references on table "public"."bank_accounts" from "authenticated";

revoke select on table "public"."bank_accounts" from "authenticated";

revoke trigger on table "public"."bank_accounts" from "authenticated";

revoke truncate on table "public"."bank_accounts" from "authenticated";

revoke update on table "public"."bank_accounts" from "authenticated";

revoke delete on table "public"."bank_accounts" from "service_role";

revoke insert on table "public"."bank_accounts" from "service_role";

revoke references on table "public"."bank_accounts" from "service_role";

revoke select on table "public"."bank_accounts" from "service_role";

revoke trigger on table "public"."bank_accounts" from "service_role";

revoke truncate on table "public"."bank_accounts" from "service_role";

revoke update on table "public"."bank_accounts" from "service_role";

revoke delete on table "public"."connection_link" from "anon";

revoke insert on table "public"."connection_link" from "anon";

revoke references on table "public"."connection_link" from "anon";

revoke select on table "public"."connection_link" from "anon";

revoke trigger on table "public"."connection_link" from "anon";

revoke truncate on table "public"."connection_link" from "anon";

revoke update on table "public"."connection_link" from "anon";

revoke delete on table "public"."connection_link" from "authenticated";

revoke insert on table "public"."connection_link" from "authenticated";

revoke references on table "public"."connection_link" from "authenticated";

revoke select on table "public"."connection_link" from "authenticated";

revoke trigger on table "public"."connection_link" from "authenticated";

revoke truncate on table "public"."connection_link" from "authenticated";

revoke update on table "public"."connection_link" from "authenticated";

revoke delete on table "public"."connection_link" from "service_role";

revoke insert on table "public"."connection_link" from "service_role";

revoke references on table "public"."connection_link" from "service_role";

revoke select on table "public"."connection_link" from "service_role";

revoke trigger on table "public"."connection_link" from "service_role";

revoke truncate on table "public"."connection_link" from "service_role";

revoke update on table "public"."connection_link" from "service_role";

revoke delete on table "public"."customers" from "anon";

revoke insert on table "public"."customers" from "anon";

revoke references on table "public"."customers" from "anon";

revoke select on table "public"."customers" from "anon";

revoke trigger on table "public"."customers" from "anon";

revoke truncate on table "public"."customers" from "anon";

revoke update on table "public"."customers" from "anon";

revoke delete on table "public"."customers" from "authenticated";

revoke insert on table "public"."customers" from "authenticated";

revoke references on table "public"."customers" from "authenticated";

revoke select on table "public"."customers" from "authenticated";

revoke trigger on table "public"."customers" from "authenticated";

revoke truncate on table "public"."customers" from "authenticated";

revoke update on table "public"."customers" from "authenticated";

revoke delete on table "public"."customers" from "service_role";

revoke insert on table "public"."customers" from "service_role";

revoke references on table "public"."customers" from "service_role";

revoke select on table "public"."customers" from "service_role";

revoke trigger on table "public"."customers" from "service_role";

revoke truncate on table "public"."customers" from "service_role";

revoke update on table "public"."customers" from "service_role";

revoke delete on table "public"."sessions" from "anon";

revoke insert on table "public"."sessions" from "anon";

revoke references on table "public"."sessions" from "anon";

revoke select on table "public"."sessions" from "anon";

revoke trigger on table "public"."sessions" from "anon";

revoke truncate on table "public"."sessions" from "anon";

revoke update on table "public"."sessions" from "anon";

revoke delete on table "public"."sessions" from "authenticated";

revoke insert on table "public"."sessions" from "authenticated";

revoke references on table "public"."sessions" from "authenticated";

revoke select on table "public"."sessions" from "authenticated";

revoke trigger on table "public"."sessions" from "authenticated";

revoke truncate on table "public"."sessions" from "authenticated";

revoke update on table "public"."sessions" from "authenticated";

revoke delete on table "public"."sessions" from "service_role";

revoke insert on table "public"."sessions" from "service_role";

revoke references on table "public"."sessions" from "service_role";

revoke select on table "public"."sessions" from "service_role";

revoke trigger on table "public"."sessions" from "service_role";

revoke truncate on table "public"."sessions" from "service_role";

revoke update on table "public"."sessions" from "service_role";

revoke delete on table "public"."ynab_accounts" from "anon";

revoke insert on table "public"."ynab_accounts" from "anon";

revoke references on table "public"."ynab_accounts" from "anon";

revoke select on table "public"."ynab_accounts" from "anon";

revoke trigger on table "public"."ynab_accounts" from "anon";

revoke truncate on table "public"."ynab_accounts" from "anon";

revoke update on table "public"."ynab_accounts" from "anon";

revoke delete on table "public"."ynab_accounts" from "authenticated";

revoke insert on table "public"."ynab_accounts" from "authenticated";

revoke references on table "public"."ynab_accounts" from "authenticated";

revoke select on table "public"."ynab_accounts" from "authenticated";

revoke trigger on table "public"."ynab_accounts" from "authenticated";

revoke truncate on table "public"."ynab_accounts" from "authenticated";

revoke update on table "public"."ynab_accounts" from "authenticated";

revoke delete on table "public"."ynab_accounts" from "service_role";

revoke insert on table "public"."ynab_accounts" from "service_role";

revoke references on table "public"."ynab_accounts" from "service_role";

revoke select on table "public"."ynab_accounts" from "service_role";

revoke trigger on table "public"."ynab_accounts" from "service_role";

revoke truncate on table "public"."ynab_accounts" from "service_role";

revoke update on table "public"."ynab_accounts" from "service_role";

alter table "public"."bank_accounts" drop constraint "bank_accounts_customer_id_fkey";

alter table "public"."bank_accounts" drop constraint "bank_accounts_link_id_fkey";

alter table "public"."connection_link" drop constraint "banking_account_link_link_id_key";

alter table "public"."connection_link" drop constraint "public_banking_account_link_customer_id_fkey";

alter table "public"."customers" drop constraint "customers_user_id_fkey";

alter table "public"."ynab_accounts" drop constraint "public_ynab_account_bank_account_id_fkey";

alter table "public"."ynab_accounts" drop constraint "ynab_account_customer_id_fkey";

alter table "public"."ynab_accounts" drop constraint "ynab_account_ynab_account_id_key";

alter table "public"."bank_accounts" drop constraint "bank_accounts_pkey";

alter table "public"."connection_link" drop constraint "banking_account_link_pkey";

alter table "public"."customers" drop constraint "customers_pkey";

alter table "public"."sessions" drop constraint "sessions_pkey";

alter table "public"."ynab_accounts" drop constraint "ynab_account_pkey";

drop index if exists "public"."bank_accounts_pkey";

drop index if exists "public"."banking_account_link_link_id_key";

drop index if exists "public"."banking_account_link_pkey";

drop index if exists "public"."customers_pkey";

drop index if exists "public"."sessions_pkey";

drop index if exists "public"."ynab_account_pkey";

drop index if exists "public"."ynab_account_ynab_account_id_key";

drop table "public"."bank_accounts";

drop table "public"."connection_link";

drop table "public"."customers";

drop table "public"."sessions";

drop table "public"."ynab_accounts";

create table "public"."banking.bank_accounts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "type" text not null,
    "customer_id" uuid not null,
    "balance" real not null,
    "institution" text not null,
    "connection_link_id" uuid,
    "account_name" text not null,
    "number" text not null,
    "last_synced_at" timestamp without time zone,
    "ynab_account_id" uuid
);


create table "public"."banking.connection_link" (
    "id" uuid not null default gen_random_uuid(),
    "link_id" uuid not null,
    "institution" text not null,
    "status" text not null default 'pending'::text,
    "customer_id" uuid not null
);


create table "public"."identity.customers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "full_name" text,
    "user_id" uuid not null
);


create table "public"."sync.sessions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "start_date" timestamp without time zone not null,
    "end_date" timestamp without time zone not null,
    "bank_account_ids" text[]
);


create table "public"."ynab.acounts" (
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


CREATE UNIQUE INDEX bank_accounts_pkey ON public."banking.bank_accounts" USING btree (id);

CREATE UNIQUE INDEX banking_account_link_link_id_key ON public."banking.connection_link" USING btree (link_id);

CREATE UNIQUE INDEX banking_account_link_pkey ON public."banking.connection_link" USING btree (id);

CREATE UNIQUE INDEX customers_pkey ON public."identity.customers" USING btree (id);

CREATE UNIQUE INDEX sessions_pkey ON public."sync.sessions" USING btree (id);

CREATE UNIQUE INDEX ynab_account_pkey ON public."ynab.acounts" USING btree (id);

CREATE UNIQUE INDEX ynab_account_ynab_account_id_key ON public."ynab.acounts" USING btree (ynab_account_id);

alter table "public"."banking.bank_accounts" add constraint "bank_accounts_pkey" PRIMARY KEY using index "bank_accounts_pkey";

alter table "public"."banking.connection_link" add constraint "banking_account_link_pkey" PRIMARY KEY using index "banking_account_link_pkey";

alter table "public"."identity.customers" add constraint "customers_pkey" PRIMARY KEY using index "customers_pkey";

alter table "public"."sync.sessions" add constraint "sessions_pkey" PRIMARY KEY using index "sessions_pkey";

alter table "public"."ynab.acounts" add constraint "ynab_account_pkey" PRIMARY KEY using index "ynab_account_pkey";

alter table "public"."banking.bank_accounts" add constraint "bank_accounts_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES "identity.customers"(id) not valid;

alter table "public"."banking.bank_accounts" validate constraint "bank_accounts_customer_id_fkey";

alter table "public"."banking.bank_accounts" add constraint "bank_accounts_link_id_fkey" FOREIGN KEY (connection_link_id) REFERENCES "banking.connection_link"(id) not valid;

alter table "public"."banking.bank_accounts" validate constraint "bank_accounts_link_id_fkey";

alter table "public"."banking.bank_accounts" add constraint "public_bank_accounts_ynab_account_id_fkey" FOREIGN KEY (ynab_account_id) REFERENCES "ynab.acounts"(id) not valid;

alter table "public"."banking.bank_accounts" validate constraint "public_bank_accounts_ynab_account_id_fkey";

alter table "public"."banking.connection_link" add constraint "banking_account_link_link_id_key" UNIQUE using index "banking_account_link_link_id_key";

alter table "public"."banking.connection_link" add constraint "public_banking_account_link_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES "identity.customers"(id) not valid;

alter table "public"."banking.connection_link" validate constraint "public_banking_account_link_customer_id_fkey";

alter table "public"."identity.customers" add constraint "customers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."identity.customers" validate constraint "customers_user_id_fkey";

alter table "public"."ynab.acounts" add constraint "public_ynab_account_bank_account_id_fkey" FOREIGN KEY (bank_account_id) REFERENCES "banking.bank_accounts"(id) not valid;

alter table "public"."ynab.acounts" validate constraint "public_ynab_account_bank_account_id_fkey";

alter table "public"."ynab.acounts" add constraint "ynab_account_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES "identity.customers"(id) not valid;

alter table "public"."ynab.acounts" validate constraint "ynab_account_customer_id_fkey";

alter table "public"."ynab.acounts" add constraint "ynab_account_ynab_account_id_key" UNIQUE using index "ynab_account_ynab_account_id_key";

grant delete on table "public"."banking.bank_accounts" to "anon";

grant insert on table "public"."banking.bank_accounts" to "anon";

grant references on table "public"."banking.bank_accounts" to "anon";

grant select on table "public"."banking.bank_accounts" to "anon";

grant trigger on table "public"."banking.bank_accounts" to "anon";

grant truncate on table "public"."banking.bank_accounts" to "anon";

grant update on table "public"."banking.bank_accounts" to "anon";

grant delete on table "public"."banking.bank_accounts" to "authenticated";

grant insert on table "public"."banking.bank_accounts" to "authenticated";

grant references on table "public"."banking.bank_accounts" to "authenticated";

grant select on table "public"."banking.bank_accounts" to "authenticated";

grant trigger on table "public"."banking.bank_accounts" to "authenticated";

grant truncate on table "public"."banking.bank_accounts" to "authenticated";

grant update on table "public"."banking.bank_accounts" to "authenticated";

grant delete on table "public"."banking.bank_accounts" to "service_role";

grant insert on table "public"."banking.bank_accounts" to "service_role";

grant references on table "public"."banking.bank_accounts" to "service_role";

grant select on table "public"."banking.bank_accounts" to "service_role";

grant trigger on table "public"."banking.bank_accounts" to "service_role";

grant truncate on table "public"."banking.bank_accounts" to "service_role";

grant update on table "public"."banking.bank_accounts" to "service_role";

grant delete on table "public"."banking.connection_link" to "anon";

grant insert on table "public"."banking.connection_link" to "anon";

grant references on table "public"."banking.connection_link" to "anon";

grant select on table "public"."banking.connection_link" to "anon";

grant trigger on table "public"."banking.connection_link" to "anon";

grant truncate on table "public"."banking.connection_link" to "anon";

grant update on table "public"."banking.connection_link" to "anon";

grant delete on table "public"."banking.connection_link" to "authenticated";

grant insert on table "public"."banking.connection_link" to "authenticated";

grant references on table "public"."banking.connection_link" to "authenticated";

grant select on table "public"."banking.connection_link" to "authenticated";

grant trigger on table "public"."banking.connection_link" to "authenticated";

grant truncate on table "public"."banking.connection_link" to "authenticated";

grant update on table "public"."banking.connection_link" to "authenticated";

grant delete on table "public"."banking.connection_link" to "service_role";

grant insert on table "public"."banking.connection_link" to "service_role";

grant references on table "public"."banking.connection_link" to "service_role";

grant select on table "public"."banking.connection_link" to "service_role";

grant trigger on table "public"."banking.connection_link" to "service_role";

grant truncate on table "public"."banking.connection_link" to "service_role";

grant update on table "public"."banking.connection_link" to "service_role";

grant delete on table "public"."identity.customers" to "anon";

grant insert on table "public"."identity.customers" to "anon";

grant references on table "public"."identity.customers" to "anon";

grant select on table "public"."identity.customers" to "anon";

grant trigger on table "public"."identity.customers" to "anon";

grant truncate on table "public"."identity.customers" to "anon";

grant update on table "public"."identity.customers" to "anon";

grant delete on table "public"."identity.customers" to "authenticated";

grant insert on table "public"."identity.customers" to "authenticated";

grant references on table "public"."identity.customers" to "authenticated";

grant select on table "public"."identity.customers" to "authenticated";

grant trigger on table "public"."identity.customers" to "authenticated";

grant truncate on table "public"."identity.customers" to "authenticated";

grant update on table "public"."identity.customers" to "authenticated";

grant delete on table "public"."identity.customers" to "service_role";

grant insert on table "public"."identity.customers" to "service_role";

grant references on table "public"."identity.customers" to "service_role";

grant select on table "public"."identity.customers" to "service_role";

grant trigger on table "public"."identity.customers" to "service_role";

grant truncate on table "public"."identity.customers" to "service_role";

grant update on table "public"."identity.customers" to "service_role";

grant delete on table "public"."sync.sessions" to "anon";

grant insert on table "public"."sync.sessions" to "anon";

grant references on table "public"."sync.sessions" to "anon";

grant select on table "public"."sync.sessions" to "anon";

grant trigger on table "public"."sync.sessions" to "anon";

grant truncate on table "public"."sync.sessions" to "anon";

grant update on table "public"."sync.sessions" to "anon";

grant delete on table "public"."sync.sessions" to "authenticated";

grant insert on table "public"."sync.sessions" to "authenticated";

grant references on table "public"."sync.sessions" to "authenticated";

grant select on table "public"."sync.sessions" to "authenticated";

grant trigger on table "public"."sync.sessions" to "authenticated";

grant truncate on table "public"."sync.sessions" to "authenticated";

grant update on table "public"."sync.sessions" to "authenticated";

grant delete on table "public"."sync.sessions" to "service_role";

grant insert on table "public"."sync.sessions" to "service_role";

grant references on table "public"."sync.sessions" to "service_role";

grant select on table "public"."sync.sessions" to "service_role";

grant trigger on table "public"."sync.sessions" to "service_role";

grant truncate on table "public"."sync.sessions" to "service_role";

grant update on table "public"."sync.sessions" to "service_role";

grant delete on table "public"."ynab.acounts" to "anon";

grant insert on table "public"."ynab.acounts" to "anon";

grant references on table "public"."ynab.acounts" to "anon";

grant select on table "public"."ynab.acounts" to "anon";

grant trigger on table "public"."ynab.acounts" to "anon";

grant truncate on table "public"."ynab.acounts" to "anon";

grant update on table "public"."ynab.acounts" to "anon";

grant delete on table "public"."ynab.acounts" to "authenticated";

grant insert on table "public"."ynab.acounts" to "authenticated";

grant references on table "public"."ynab.acounts" to "authenticated";

grant select on table "public"."ynab.acounts" to "authenticated";

grant trigger on table "public"."ynab.acounts" to "authenticated";

grant truncate on table "public"."ynab.acounts" to "authenticated";

grant update on table "public"."ynab.acounts" to "authenticated";

grant delete on table "public"."ynab.acounts" to "service_role";

grant insert on table "public"."ynab.acounts" to "service_role";

grant references on table "public"."ynab.acounts" to "service_role";

grant select on table "public"."ynab.acounts" to "service_role";

grant trigger on table "public"."ynab.acounts" to "service_role";

grant truncate on table "public"."ynab.acounts" to "service_role";

grant update on table "public"."ynab.acounts" to "service_role";


