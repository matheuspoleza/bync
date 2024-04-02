
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "supabase_migrations";

ALTER SCHEMA "supabase_migrations" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."bank_account_types" AS ENUM (
    'checking',
    'savings',
    'credit'
);

ALTER TYPE "public"."bank_account_types" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."bank_accounts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "type" "text" NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "balance" real,
    "institution" "text" NOT NULL,
    "connection_link_id" "uuid" NOT NULL,
    "account_name" "text" NOT NULL,
    "number" "text" NOT NULL,
    "last_synced_at" timestamp without time zone,
    "ynab_account_id" "uuid"
);

ALTER TABLE "public"."bank_accounts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."connection_link" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "link_id" "uuid" NOT NULL,
    "institution" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "customer_id" "uuid" NOT NULL
);

ALTER TABLE "public"."connection_link" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."customers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "full_name" "text",
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."customers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "start_date" timestamp without time zone NOT NULL,
    "end_date" timestamp without time zone NOT NULL,
    "bank_account_ids" "text"[]
);

ALTER TABLE "public"."sessions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."ynab_account" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "balance" real DEFAULT '0'::real NOT NULL,
    "budget_id" "uuid" NOT NULL,
    "ynab_account_id" "uuid" NOT NULL,
    "id" "uuid" NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "type" "text" NOT NULL,
    "bank_account_id" "uuid",
    "last_synced_at" timestamp without time zone
);

ALTER TABLE "public"."ynab_account" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "supabase_migrations"."schema_migrations" (
    "version" "text" NOT NULL,
    "statements" "text"[],
    "name" "text"
);

ALTER TABLE "supabase_migrations"."schema_migrations" OWNER TO "postgres";

ALTER TABLE ONLY "public"."bank_accounts"
    ADD CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."connection_link"
    ADD CONSTRAINT "banking_account_link_link_id_key" UNIQUE ("link_id");

ALTER TABLE ONLY "public"."connection_link"
    ADD CONSTRAINT "banking_account_link_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."ynab_account"
    ADD CONSTRAINT "ynab_account_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."ynab_account"
    ADD CONSTRAINT "ynab_account_ynab_account_id_key" UNIQUE ("ynab_account_id");

ALTER TABLE ONLY "supabase_migrations"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");

ALTER TABLE ONLY "public"."bank_accounts"
    ADD CONSTRAINT "bank_accounts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id");

ALTER TABLE ONLY "public"."bank_accounts"
    ADD CONSTRAINT "bank_accounts_link_id_fkey" FOREIGN KEY ("connection_link_id") REFERENCES "public"."connection_link"("id");

ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."connection_link"
    ADD CONSTRAINT "public_banking_account_link_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id");

ALTER TABLE ONLY "public"."ynab_account"
    ADD CONSTRAINT "public_ynab_account_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "public"."bank_accounts"("id");

ALTER TABLE ONLY "public"."ynab_account"
    ADD CONSTRAINT "ynab_account_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id");

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."bank_accounts" TO "anon";
GRANT ALL ON TABLE "public"."bank_accounts" TO "authenticated";
GRANT ALL ON TABLE "public"."bank_accounts" TO "service_role";

GRANT ALL ON TABLE "public"."connection_link" TO "anon";
GRANT ALL ON TABLE "public"."connection_link" TO "authenticated";
GRANT ALL ON TABLE "public"."connection_link" TO "service_role";

GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";

GRANT ALL ON TABLE "public"."sessions" TO "anon";
GRANT ALL ON TABLE "public"."sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."sessions" TO "service_role";

GRANT ALL ON TABLE "public"."ynab_account" TO "anon";
GRANT ALL ON TABLE "public"."ynab_account" TO "authenticated";
GRANT ALL ON TABLE "public"."ynab_account" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
