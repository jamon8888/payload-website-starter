import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_pages_blocks_media_block_image_role" AS ENUM('informative', 'decorative');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_image_role" AS ENUM('informative', 'decorative');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'de', 'fr', 'es');
  CREATE TYPE "public"."enum_media_role" AS ENUM('informative', 'decorative');
  CREATE TABLE "pages_aeo_answer_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"source_link" varchar
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"aeo_aeo_summary" varchar,
  	"_status" "enum_pages_status" DEFAULT 'draft',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_aeo_answer_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"source_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_aeo_aeo_summary" varchar,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_aeo_answer_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"source_link" varchar
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"aeo_aeo_summary" varchar,
  	"_status" "enum_posts_status" DEFAULT 'draft',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_version_aeo_answer_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"source_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_aeo_aeo_summary" varchar,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"caption" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "search_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "accessibility_statement_non_conform_criteria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criterion" varchar NOT NULL,
  	"thematic" varchar NOT NULL,
  	"derogation" boolean
  );
  
  CREATE TABLE "accessibility_statement_non_conform_criteria_locales" (
  	"justification" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accessibility_statement" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"audit_date" timestamp(3) with time zone NOT NULL,
  	"referentiel_version" varchar DEFAULT 'RGAA 4.1.2' NOT NULL,
  	"global_compliance_rate" numeric NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"schema_pluriannuel_url" varchar,
  	"plan_action_annuel_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_media_block" DROP CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_media_block" DROP CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_media_block_media_idx";
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "pages__status_idx";
  DROP INDEX "_pages_v_blocks_media_block_media_idx";
  DROP INDEX "_pages_v_version_meta_version_meta_image_idx";
  DROP INDEX "_pages_v_version_version__status_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "posts__status_idx";
  DROP INDEX "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX "_posts_v_version_version__status_idx";
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "pages_rels_posts_id_idx";
  DROP INDEX "pages_rels_categories_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_posts_id_idx";
  DROP INDEX "_pages_v_rels_categories_id_idx";
  DROP INDEX "posts_rels_posts_id_idx";
  DROP INDEX "posts_rels_categories_id_idx";
  DROP INDEX "posts_rels_users_id_idx";
  DROP INDEX "_posts_v_rels_posts_id_idx";
  DROP INDEX "_posts_v_rels_categories_id_idx";
  DROP INDEX "_posts_v_rels_users_id_idx";
  DROP INDEX "header_rels_pages_id_idx";
  DROP INDEX "header_rels_posts_id_idx";
  DROP INDEX "footer_rels_pages_id_idx";
  DROP INDEX "footer_rels_posts_id_idx";
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "image_asset_id" integer;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "image_role" "enum_pages_blocks_media_block_image_role" DEFAULT 'informative';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "image_alt" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "image_asset_id" integer;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "image_role" "enum__pages_v_blocks_media_block_image_role" DEFAULT 'informative';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "image_alt" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "enum__pages_v_published_locale";
  ALTER TABLE "_pages_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "posts_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_posts_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "published_locale" "enum__posts_v_published_locale";
  ALTER TABLE "_posts_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "media" ADD COLUMN "role" "enum_media_role" DEFAULT 'informative' NOT NULL;
  ALTER TABLE "categories_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "header_nav_items" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "header_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "footer_nav_items" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "footer_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "pages_aeo_answer_blocks" ADD CONSTRAINT "pages_aeo_answer_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_aeo_answer_blocks" ADD CONSTRAINT "_pages_v_version_aeo_answer_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_aeo_answer_blocks" ADD CONSTRAINT "posts_aeo_answer_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_aeo_answer_blocks" ADD CONSTRAINT "_posts_v_version_aeo_answer_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessibility_statement_non_conform_criteria" ADD CONSTRAINT "accessibility_statement_non_conform_criteria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accessibility_statement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessibility_statement_non_conform_criteria_locales" ADD CONSTRAINT "accessibility_statement_non_conform_criteria_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accessibility_statement_non_conform_criteria"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_aeo_answer_blocks_order_idx" ON "pages_aeo_answer_blocks" USING btree ("_order");
  CREATE INDEX "pages_aeo_answer_blocks_parent_id_idx" ON "pages_aeo_answer_blocks" USING btree ("_parent_id");
  CREATE INDEX "pages_aeo_answer_blocks_locale_idx" ON "pages_aeo_answer_blocks" USING btree ("_locale");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "pages__status_idx" ON "pages_locales" USING btree ("_status","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_aeo_answer_blocks_order_idx" ON "_pages_v_version_aeo_answer_blocks" USING btree ("_order");
  CREATE INDEX "_pages_v_version_aeo_answer_blocks_parent_id_idx" ON "_pages_v_version_aeo_answer_blocks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_aeo_answer_blocks_locale_idx" ON "_pages_v_version_aeo_answer_blocks" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v_locales" USING btree ("version__status","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_aeo_answer_blocks_order_idx" ON "posts_aeo_answer_blocks" USING btree ("_order");
  CREATE INDEX "posts_aeo_answer_blocks_parent_id_idx" ON "posts_aeo_answer_blocks" USING btree ("_parent_id");
  CREATE INDEX "posts_aeo_answer_blocks_locale_idx" ON "posts_aeo_answer_blocks" USING btree ("_locale");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "posts__status_idx" ON "posts_locales" USING btree ("_status","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_version_aeo_answer_blocks_order_idx" ON "_posts_v_version_aeo_answer_blocks" USING btree ("_order");
  CREATE INDEX "_posts_v_version_aeo_answer_blocks_parent_id_idx" ON "_posts_v_version_aeo_answer_blocks" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_aeo_answer_blocks_locale_idx" ON "_posts_v_version_aeo_answer_blocks" USING btree ("_locale");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v_locales" USING btree ("version__status","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "search_locales_locale_parent_id_unique" ON "search_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accessibility_statement_non_conform_criteria_order_idx" ON "accessibility_statement_non_conform_criteria" USING btree ("_order");
  CREATE INDEX "accessibility_statement_non_conform_criteria_parent_id_idx" ON "accessibility_statement_non_conform_criteria" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accessibility_statement_non_conform_criteria_locales_locale_" ON "accessibility_statement_non_conform_criteria_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_image_asset_id_media_id_fk" FOREIGN KEY ("image_asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_image_asset_id_media_id_fk" FOREIGN KEY ("image_asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_cta_links_locale_idx" ON "pages_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_locale_idx" ON "pages_blocks_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_columns_locale_idx" ON "pages_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_locale_idx" ON "pages_blocks_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_block_locale_idx" ON "pages_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_block_image_image_asset_idx" ON "pages_blocks_media_block" USING btree ("image_asset_id");
  CREATE INDEX "pages_blocks_archive_locale_idx" ON "pages_blocks_archive" USING btree ("_locale");
  CREATE INDEX "pages_blocks_form_block_locale_idx" ON "pages_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_blocks_cta_links_locale_idx" ON "_pages_v_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_locale_idx" ON "_pages_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_columns_locale_idx" ON "_pages_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_locale_idx" ON "_pages_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_block_locale_idx" ON "_pages_v_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_block_image_image_asset_idx" ON "_pages_v_blocks_media_block" USING btree ("image_asset_id");
  CREATE INDEX "_pages_v_blocks_archive_locale_idx" ON "_pages_v_blocks_archive" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_form_block_locale_idx" ON "_pages_v_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "posts_rels_locale_idx" ON "posts_rels" USING btree ("locale");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_rels_locale_idx" ON "_posts_v_rels" USING btree ("locale");
  CREATE INDEX "categories_breadcrumbs_locale_idx" ON "categories_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "header_nav_items_locale_idx" ON "header_nav_items" USING btree ("_locale");
  CREATE INDEX "header_rels_locale_idx" ON "header_rels" USING btree ("locale");
  CREATE INDEX "footer_nav_items_locale_idx" ON "footer_nav_items" USING btree ("_locale");
  CREATE INDEX "footer_rels_locale_idx" ON "footer_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id","locale");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id","locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id","locale");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id","locale");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id","locale");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id","locale");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id","locale");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id","locale");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id","locale");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id","locale");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id","locale");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id","locale");
  -- Backfill pre-localization rows into the new _locales tables (mapped to the
  -- default locale) BEFORE their source columns are dropped below. Without this
  -- the DROP COLUMN statements would silently delete all existing content.
  INSERT INTO "pages_locales" ("title", "hero_type", "hero_rich_text", "meta_title", "meta_image_id", "meta_description", "_status", "_locale", "_parent_id")
  SELECT "title", "hero_type", "hero_rich_text", "meta_title", "meta_image_id", "meta_description", "_status", 'en', "id" FROM "pages";
  INSERT INTO "_pages_v_locales" ("version_title", "version_hero_type", "version_hero_rich_text", "version_meta_title", "version_meta_image_id", "version_meta_description", "version__status", "_locale", "_parent_id")
  SELECT "version_title", "version_hero_type", "version_hero_rich_text", "version_meta_title", "version_meta_image_id", "version_meta_description", "version__status", 'en', "id" FROM "_pages_v";
  INSERT INTO "posts_locales" ("title", "content", "meta_title", "meta_image_id", "meta_description", "_status", "_locale", "_parent_id")
  SELECT "title", "content", "meta_title", "meta_image_id", "meta_description", "_status", 'en', "id" FROM "posts";
  INSERT INTO "_posts_v_locales" ("version_title", "version_content", "version_meta_title", "version_meta_image_id", "version_meta_description", "version__status", "_locale", "_parent_id")
  SELECT "version_title", "version_content", "version_meta_title", "version_meta_image_id", "version_meta_description", "version__status", 'en', "id" FROM "_posts_v";
  INSERT INTO "media_locales" ("alt", "caption", "_locale", "_parent_id")
  SELECT "alt", "caption", 'en', "id" FROM "media";
  INSERT INTO "categories_locales" ("title", "_locale", "_parent_id")
  SELECT "title", 'en', "id" FROM "categories";
  INSERT INTO "search_locales" ("title", "_locale", "_parent_id")
  SELECT "title", 'en', "id" FROM "search";
  INSERT INTO "forms_locales" ("submit_button_label", "confirmation_message", "_locale", "_parent_id")
  SELECT "submit_button_label", "confirmation_message", 'en', "id" FROM "forms";
  INSERT INTO "forms_blocks_checkbox_locales" ("label", "_locale", "_parent_id")
  SELECT "label", 'en', "id" FROM "forms_blocks_checkbox";
  INSERT INTO "forms_blocks_country_locales" ("label", "_locale", "_parent_id")
  SELECT "label", 'en', "id" FROM "forms_blocks_country";
  INSERT INTO "forms_blocks_email_locales" ("label", "_locale", "_parent_id")
  SELECT "label", 'en', "id" FROM "forms_blocks_email";
  INSERT INTO "forms_blocks_message_locales" ("message", "_locale", "_parent_id")
  SELECT "message", 'en', "id" FROM "forms_blocks_message";
  INSERT INTO "forms_blocks_number_locales" ("label", "_locale", "_parent_id")
  SELECT "label", 'en', "id" FROM "forms_blocks_number";
  INSERT INTO "forms_blocks_select_options_locales" ("label", "_locale", "_parent_id")
  SELECT "label", 'en', "id" FROM "forms_blocks_select_options";
  INSERT INTO "forms_blocks_select_locales" ("label", "default_value", "_locale", "_parent_id")
  SELECT "label", "default_value", 'en', "id" FROM "forms_blocks_select";
  INSERT INTO "forms_blocks_state_locales" ("label", "_locale", "_parent_id")
  SELECT "label", 'en', "id" FROM "forms_blocks_state";
  INSERT INTO "forms_blocks_text_locales" ("label", "default_value", "_locale", "_parent_id")
  SELECT "label", "default_value", 'en', "id" FROM "forms_blocks_text";
  INSERT INTO "forms_blocks_textarea_locales" ("label", "default_value", "_locale", "_parent_id")
  SELECT "label", "default_value", 'en', "id" FROM "forms_blocks_textarea";
  INSERT INTO "forms_emails_locales" ("subject", "message", "_locale", "_parent_id")
  SELECT "subject", "message", 'en', "id" FROM "forms_emails";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "media_id";
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "hero_type";
  ALTER TABLE "pages" DROP COLUMN "hero_rich_text";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "pages" DROP COLUMN "_status";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version__status";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "content";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_image_id";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  ALTER TABLE "posts" DROP COLUMN "_status";
  ALTER TABLE "_posts_v" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_content";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version__status";
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "categories" DROP COLUMN "title";
  ALTER TABLE "forms_blocks_checkbox" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_country" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_email" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_message" DROP COLUMN "message";
  ALTER TABLE "forms_blocks_number" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select_options" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "default_value";
  ALTER TABLE "forms_blocks_state" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "default_value";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "default_value";
  ALTER TABLE "forms_emails" DROP COLUMN "subject";
  ALTER TABLE "forms_emails" DROP COLUMN "message";
  ALTER TABLE "forms" DROP COLUMN "submit_button_label";
  ALTER TABLE "forms" DROP COLUMN "confirmation_message";
  ALTER TABLE "search" DROP COLUMN "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_aeo_answer_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_aeo_answer_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_aeo_answer_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_aeo_answer_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_checkbox_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_country_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_email_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_message_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_number_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_state_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_textarea_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_emails_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "search_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accessibility_statement_non_conform_criteria" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accessibility_statement_non_conform_criteria_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accessibility_statement" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_aeo_answer_blocks" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_version_aeo_answer_blocks" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "posts_aeo_answer_blocks" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v_version_aeo_answer_blocks" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "search_locales" CASCADE;
  DROP TABLE "accessibility_statement_non_conform_criteria" CASCADE;
  DROP TABLE "accessibility_statement_non_conform_criteria_locales" CASCADE;
  DROP TABLE "accessibility_statement" CASCADE;
  ALTER TABLE "pages_blocks_media_block" DROP CONSTRAINT "pages_blocks_media_block_image_asset_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_media_block" DROP CONSTRAINT "_pages_v_blocks_media_block_image_asset_id_media_id_fk";
  
  DROP INDEX "pages_blocks_cta_links_locale_idx";
  DROP INDEX "pages_blocks_cta_locale_idx";
  DROP INDEX "pages_blocks_content_columns_locale_idx";
  DROP INDEX "pages_blocks_content_locale_idx";
  DROP INDEX "pages_blocks_media_block_locale_idx";
  DROP INDEX "pages_blocks_media_block_image_image_asset_idx";
  DROP INDEX "pages_blocks_archive_locale_idx";
  DROP INDEX "pages_blocks_form_block_locale_idx";
  DROP INDEX "pages_rels_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_locale_idx";
  DROP INDEX "_pages_v_blocks_content_columns_locale_idx";
  DROP INDEX "_pages_v_blocks_content_locale_idx";
  DROP INDEX "_pages_v_blocks_media_block_locale_idx";
  DROP INDEX "_pages_v_blocks_media_block_image_image_asset_idx";
  DROP INDEX "_pages_v_blocks_archive_locale_idx";
  DROP INDEX "_pages_v_blocks_form_block_locale_idx";
  DROP INDEX "_pages_v_snapshot_idx";
  DROP INDEX "_pages_v_published_locale_idx";
  DROP INDEX "_pages_v_rels_locale_idx";
  DROP INDEX "posts_rels_locale_idx";
  DROP INDEX "_posts_v_snapshot_idx";
  DROP INDEX "_posts_v_published_locale_idx";
  DROP INDEX "_posts_v_rels_locale_idx";
  DROP INDEX "categories_breadcrumbs_locale_idx";
  DROP INDEX "header_nav_items_locale_idx";
  DROP INDEX "header_rels_locale_idx";
  DROP INDEX "footer_nav_items_locale_idx";
  DROP INDEX "footer_rels_locale_idx";
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "pages_rels_posts_id_idx";
  DROP INDEX "pages_rels_categories_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_posts_id_idx";
  DROP INDEX "_pages_v_rels_categories_id_idx";
  DROP INDEX "posts_rels_posts_id_idx";
  DROP INDEX "posts_rels_categories_id_idx";
  DROP INDEX "posts_rels_users_id_idx";
  DROP INDEX "_posts_v_rels_posts_id_idx";
  DROP INDEX "_posts_v_rels_categories_id_idx";
  DROP INDEX "_posts_v_rels_users_id_idx";
  DROP INDEX "header_rels_pages_id_idx";
  DROP INDEX "header_rels_posts_id_idx";
  DROP INDEX "footer_rels_pages_id_idx";
  DROP INDEX "footer_rels_posts_id_idx";
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "_status" "enum_pages_status" DEFAULT 'draft';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version__status" "enum__pages_v_version_status" DEFAULT 'draft';
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "_status" "enum_posts_status" DEFAULT 'draft';
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version__status" "enum__posts_v_version_status" DEFAULT 'draft';
  ALTER TABLE "media" ADD COLUMN "alt" varchar;
  ALTER TABLE "media" ADD COLUMN "caption" jsonb;
  ALTER TABLE "categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_country" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_email" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_message" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms_blocks_number" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_state" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN "subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL;
  ALTER TABLE "forms_emails" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms" ADD COLUMN "submit_button_label" varchar;
  ALTER TABLE "forms" ADD COLUMN "confirmation_message" jsonb;
  ALTER TABLE "search" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "image_asset_id";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "image_role";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "image_alt";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "_locale";
  ALTER TABLE "pages_rels" DROP COLUMN "locale";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "image_asset_id";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "image_role";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "image_alt";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v" DROP COLUMN "snapshot";
  ALTER TABLE "_pages_v" DROP COLUMN "published_locale";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "locale";
  ALTER TABLE "posts_rels" DROP COLUMN "locale";
  ALTER TABLE "_posts_v" DROP COLUMN "snapshot";
  ALTER TABLE "_posts_v" DROP COLUMN "published_locale";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "locale";
  ALTER TABLE "media" DROP COLUMN "role";
  ALTER TABLE "categories_breadcrumbs" DROP COLUMN "_locale";
  ALTER TABLE "header_nav_items" DROP COLUMN "_locale";
  ALTER TABLE "header_rels" DROP COLUMN "locale";
  ALTER TABLE "footer_nav_items" DROP COLUMN "_locale";
  ALTER TABLE "footer_rels" DROP COLUMN "locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_media_block_image_role";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_image_role";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_media_role";`)
}
