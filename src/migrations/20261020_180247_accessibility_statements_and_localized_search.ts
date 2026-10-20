import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_accessibility_statements_compliance_status" AS ENUM('conformant', 'partiallyConformant', 'nonConformant');
  CREATE TYPE "public"."enum_accessibility_statements_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__accessibility_statements_v_version_compliance_status" AS ENUM('conformant', 'partiallyConformant', 'nonConformant');
  CREATE TYPE "public"."enum__accessibility_statements_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__accessibility_statements_v_published_locale" AS ENUM('en', 'de', 'fr', 'es');
  CREATE TABLE "pages_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_data_table_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cell" varchar
  );
  
  CREATE TABLE "pages_blocks_data_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cell" varchar
  );
  
  CREATE TABLE "pages_blocks_data_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_data_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_to_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_how_to_supply" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_to_tool" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_to" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"total_time" varchar,
  	"estimated_cost_currency" varchar,
  	"estimated_cost_value" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_modal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"trigger_label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tabs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_asset_id" integer,
  	"video_captions_id" integer,
  	"video_transcript" jsonb,
  	"video_audio_description_id" integer,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_data_table_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cell" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_data_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cell" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_data_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_data_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_to_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_to_supply" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_to_tool" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_to" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"total_time" varchar,
  	"estimated_cost_currency" varchar,
  	"estimated_cost_value" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_modal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"trigger_label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_asset_id" integer,
  	"video_captions_id" integer,
  	"video_transcript" jsonb,
  	"video_audio_description_id" integer,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "nccriteria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criterion" varchar,
  	"thematic" varchar,
  	"derogation" boolean
  );
  
  CREATE TABLE "nccriteria_locales" (
  	"justification" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accessibility_statements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"compliance_status" "enum_accessibility_statements_compliance_status" DEFAULT 'partiallyConformant',
  	"audit_date" timestamp(3) with time zone,
  	"referentiel_version" varchar DEFAULT 'RGAA 4.1.2',
  	"global_compliance_rate" numeric,
  	"contact_email" varchar,
  	"schema_pluriannuel_url" varchar,
  	"plan_action_annuel_url" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_accessibility_statements_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "accessibility_statements_locales" (
  	"title" varchar,
  	"statement" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "accessibility_statements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_nccriteria_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"criterion" varchar,
  	"thematic" varchar,
  	"derogation" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_nccriteria_v_locales" (
  	"justification" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_accessibility_statements_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_compliance_status" "enum__accessibility_statements_v_version_compliance_status" DEFAULT 'partiallyConformant',
  	"version_audit_date" timestamp(3) with time zone,
  	"version_referentiel_version" varchar DEFAULT 'RGAA 4.1.2',
  	"version_global_compliance_rate" numeric,
  	"version_contact_email" varchar,
  	"version_schema_pluriannuel_url" varchar,
  	"version_plan_action_annuel_url" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__accessibility_statements_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__accessibility_statements_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_accessibility_statements_v_locales" (
  	"version_title" varchar,
  	"version_statement" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_accessibility_statements_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "search" DROP CONSTRAINT "search_meta_image_id_media_id_fk";
  
  DROP INDEX "search_meta_meta_image_idx";
  ALTER TABLE "search_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "search_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "search_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "accessibility_statements_id" integer;
  ALTER TABLE "pages_blocks_accordion_items" ADD CONSTRAINT "pages_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_data_table_header" ADD CONSTRAINT "pages_blocks_data_table_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_data_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_data_table_rows_cells" ADD CONSTRAINT "pages_blocks_data_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_data_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_data_table_rows" ADD CONSTRAINT "pages_blocks_data_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_data_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_data_table" ADD CONSTRAINT "pages_blocks_data_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_embed" ADD CONSTRAINT "pages_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_to_steps" ADD CONSTRAINT "pages_blocks_how_to_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_to_supply" ADD CONSTRAINT "pages_blocks_how_to_supply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_to_tool" ADD CONSTRAINT "pages_blocks_how_to_tool_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_to" ADD CONSTRAINT "pages_blocks_how_to_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_modal" ADD CONSTRAINT "pages_blocks_modal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_items" ADD CONSTRAINT "pages_blocks_tabs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs" ADD CONSTRAINT "pages_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_video_asset_id_media_id_fk" FOREIGN KEY ("video_asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_video_captions_id_media_id_fk" FOREIGN KEY ("video_captions_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_video_audio_description_id_media_id_fk" FOREIGN KEY ("video_audio_description_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_items" ADD CONSTRAINT "_pages_v_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion" ADD CONSTRAINT "_pages_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_data_table_header" ADD CONSTRAINT "_pages_v_blocks_data_table_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_data_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_data_table_rows_cells" ADD CONSTRAINT "_pages_v_blocks_data_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_data_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_data_table_rows" ADD CONSTRAINT "_pages_v_blocks_data_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_data_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_data_table" ADD CONSTRAINT "_pages_v_blocks_data_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embed" ADD CONSTRAINT "_pages_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_to_steps" ADD CONSTRAINT "_pages_v_blocks_how_to_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_to_supply" ADD CONSTRAINT "_pages_v_blocks_how_to_supply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_to_tool" ADD CONSTRAINT "_pages_v_blocks_how_to_tool_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_to" ADD CONSTRAINT "_pages_v_blocks_how_to_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_modal" ADD CONSTRAINT "_pages_v_blocks_modal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_items" ADD CONSTRAINT "_pages_v_blocks_tabs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_video_asset_id_media_id_fk" FOREIGN KEY ("video_asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_video_captions_id_media_id_fk" FOREIGN KEY ("video_captions_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_video_audio_description_id_media_id_fk" FOREIGN KEY ("video_audio_description_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nccriteria" ADD CONSTRAINT "nccriteria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accessibility_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nccriteria_locales" ADD CONSTRAINT "nccriteria_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nccriteria"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessibility_statements_locales" ADD CONSTRAINT "accessibility_statements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accessibility_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessibility_statements_rels" ADD CONSTRAINT "accessibility_statements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accessibility_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessibility_statements_rels" ADD CONSTRAINT "accessibility_statements_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessibility_statements_rels" ADD CONSTRAINT "accessibility_statements_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_nccriteria_v" ADD CONSTRAINT "_nccriteria_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_accessibility_statements_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_nccriteria_v_locales" ADD CONSTRAINT "_nccriteria_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_nccriteria_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accessibility_statements_v" ADD CONSTRAINT "_accessibility_statements_v_parent_id_accessibility_statements_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accessibility_statements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_accessibility_statements_v_locales" ADD CONSTRAINT "_accessibility_statements_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_accessibility_statements_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accessibility_statements_v_rels" ADD CONSTRAINT "_accessibility_statements_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_accessibility_statements_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accessibility_statements_v_rels" ADD CONSTRAINT "_accessibility_statements_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accessibility_statements_v_rels" ADD CONSTRAINT "_accessibility_statements_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_accordion_items_order_idx" ON "pages_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_items_parent_id_idx" ON "pages_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_items_locale_idx" ON "pages_blocks_accordion_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_accordion_order_idx" ON "pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_parent_id_idx" ON "pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_path_idx" ON "pages_blocks_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_accordion_locale_idx" ON "pages_blocks_accordion" USING btree ("_locale");
  CREATE INDEX "pages_blocks_data_table_header_order_idx" ON "pages_blocks_data_table_header" USING btree ("_order");
  CREATE INDEX "pages_blocks_data_table_header_parent_id_idx" ON "pages_blocks_data_table_header" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_data_table_header_locale_idx" ON "pages_blocks_data_table_header" USING btree ("_locale");
  CREATE INDEX "pages_blocks_data_table_rows_cells_order_idx" ON "pages_blocks_data_table_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_data_table_rows_cells_parent_id_idx" ON "pages_blocks_data_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_data_table_rows_cells_locale_idx" ON "pages_blocks_data_table_rows_cells" USING btree ("_locale");
  CREATE INDEX "pages_blocks_data_table_rows_order_idx" ON "pages_blocks_data_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_data_table_rows_parent_id_idx" ON "pages_blocks_data_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_data_table_rows_locale_idx" ON "pages_blocks_data_table_rows" USING btree ("_locale");
  CREATE INDEX "pages_blocks_data_table_order_idx" ON "pages_blocks_data_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_data_table_parent_id_idx" ON "pages_blocks_data_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_data_table_path_idx" ON "pages_blocks_data_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_data_table_locale_idx" ON "pages_blocks_data_table" USING btree ("_locale");
  CREATE INDEX "pages_blocks_embed_order_idx" ON "pages_blocks_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_embed_parent_id_idx" ON "pages_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embed_path_idx" ON "pages_blocks_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_embed_locale_idx" ON "pages_blocks_embed" USING btree ("_locale");
  CREATE INDEX "pages_blocks_how_to_steps_order_idx" ON "pages_blocks_how_to_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_to_steps_parent_id_idx" ON "pages_blocks_how_to_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_to_steps_locale_idx" ON "pages_blocks_how_to_steps" USING btree ("_locale");
  CREATE INDEX "pages_blocks_how_to_supply_order_idx" ON "pages_blocks_how_to_supply" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_to_supply_parent_id_idx" ON "pages_blocks_how_to_supply" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_to_supply_locale_idx" ON "pages_blocks_how_to_supply" USING btree ("_locale");
  CREATE INDEX "pages_blocks_how_to_tool_order_idx" ON "pages_blocks_how_to_tool" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_to_tool_parent_id_idx" ON "pages_blocks_how_to_tool" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_to_tool_locale_idx" ON "pages_blocks_how_to_tool" USING btree ("_locale");
  CREATE INDEX "pages_blocks_how_to_order_idx" ON "pages_blocks_how_to" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_to_parent_id_idx" ON "pages_blocks_how_to" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_to_path_idx" ON "pages_blocks_how_to" USING btree ("_path");
  CREATE INDEX "pages_blocks_how_to_locale_idx" ON "pages_blocks_how_to" USING btree ("_locale");
  CREATE INDEX "pages_blocks_modal_order_idx" ON "pages_blocks_modal" USING btree ("_order");
  CREATE INDEX "pages_blocks_modal_parent_id_idx" ON "pages_blocks_modal" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_modal_path_idx" ON "pages_blocks_modal" USING btree ("_path");
  CREATE INDEX "pages_blocks_modal_locale_idx" ON "pages_blocks_modal" USING btree ("_locale");
  CREATE INDEX "pages_blocks_tabs_items_order_idx" ON "pages_blocks_tabs_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_items_parent_id_idx" ON "pages_blocks_tabs_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_items_locale_idx" ON "pages_blocks_tabs_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_tabs_order_idx" ON "pages_blocks_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_parent_id_idx" ON "pages_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_path_idx" ON "pages_blocks_tabs" USING btree ("_path");
  CREATE INDEX "pages_blocks_tabs_locale_idx" ON "pages_blocks_tabs" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_order_idx" ON "pages_blocks_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_parent_id_idx" ON "pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_path_idx" ON "pages_blocks_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_locale_idx" ON "pages_blocks_video" USING btree ("_locale");
  CREATE INDEX "pages_blocks_video_video_video_asset_idx" ON "pages_blocks_video" USING btree ("video_asset_id");
  CREATE INDEX "pages_blocks_video_video_video_captions_idx" ON "pages_blocks_video" USING btree ("video_captions_id");
  CREATE INDEX "pages_blocks_video_video_video_audio_description_idx" ON "pages_blocks_video" USING btree ("video_audio_description_id");
  CREATE INDEX "_pages_v_blocks_accordion_items_order_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_items_parent_id_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_items_locale_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_accordion_order_idx" ON "_pages_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_parent_id_idx" ON "_pages_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_path_idx" ON "_pages_v_blocks_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_locale_idx" ON "_pages_v_blocks_accordion" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_data_table_header_order_idx" ON "_pages_v_blocks_data_table_header" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_data_table_header_parent_id_idx" ON "_pages_v_blocks_data_table_header" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_data_table_header_locale_idx" ON "_pages_v_blocks_data_table_header" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_data_table_rows_cells_order_idx" ON "_pages_v_blocks_data_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_data_table_rows_cells_parent_id_idx" ON "_pages_v_blocks_data_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_data_table_rows_cells_locale_idx" ON "_pages_v_blocks_data_table_rows_cells" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_data_table_rows_order_idx" ON "_pages_v_blocks_data_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_data_table_rows_parent_id_idx" ON "_pages_v_blocks_data_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_data_table_rows_locale_idx" ON "_pages_v_blocks_data_table_rows" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_data_table_order_idx" ON "_pages_v_blocks_data_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_data_table_parent_id_idx" ON "_pages_v_blocks_data_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_data_table_path_idx" ON "_pages_v_blocks_data_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_data_table_locale_idx" ON "_pages_v_blocks_data_table" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_embed_order_idx" ON "_pages_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_embed_parent_id_idx" ON "_pages_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_embed_path_idx" ON "_pages_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_embed_locale_idx" ON "_pages_v_blocks_embed" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_how_to_steps_order_idx" ON "_pages_v_blocks_how_to_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_to_steps_parent_id_idx" ON "_pages_v_blocks_how_to_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_to_steps_locale_idx" ON "_pages_v_blocks_how_to_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_how_to_supply_order_idx" ON "_pages_v_blocks_how_to_supply" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_to_supply_parent_id_idx" ON "_pages_v_blocks_how_to_supply" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_to_supply_locale_idx" ON "_pages_v_blocks_how_to_supply" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_how_to_tool_order_idx" ON "_pages_v_blocks_how_to_tool" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_to_tool_parent_id_idx" ON "_pages_v_blocks_how_to_tool" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_to_tool_locale_idx" ON "_pages_v_blocks_how_to_tool" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_how_to_order_idx" ON "_pages_v_blocks_how_to" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_to_parent_id_idx" ON "_pages_v_blocks_how_to" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_to_path_idx" ON "_pages_v_blocks_how_to" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_how_to_locale_idx" ON "_pages_v_blocks_how_to" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_modal_order_idx" ON "_pages_v_blocks_modal" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_modal_parent_id_idx" ON "_pages_v_blocks_modal" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_modal_path_idx" ON "_pages_v_blocks_modal" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_modal_locale_idx" ON "_pages_v_blocks_modal" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_tabs_items_order_idx" ON "_pages_v_blocks_tabs_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_items_parent_id_idx" ON "_pages_v_blocks_tabs_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_items_locale_idx" ON "_pages_v_blocks_tabs_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_tabs_order_idx" ON "_pages_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_parent_id_idx" ON "_pages_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_path_idx" ON "_pages_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tabs_locale_idx" ON "_pages_v_blocks_tabs" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_order_idx" ON "_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_parent_id_idx" ON "_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_path_idx" ON "_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_locale_idx" ON "_pages_v_blocks_video" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_video_video_video_asset_idx" ON "_pages_v_blocks_video" USING btree ("video_asset_id");
  CREATE INDEX "_pages_v_blocks_video_video_video_captions_idx" ON "_pages_v_blocks_video" USING btree ("video_captions_id");
  CREATE INDEX "_pages_v_blocks_video_video_video_audio_description_idx" ON "_pages_v_blocks_video" USING btree ("video_audio_description_id");
  CREATE INDEX "nccriteria_order_idx" ON "nccriteria" USING btree ("_order");
  CREATE INDEX "nccriteria_parent_id_idx" ON "nccriteria" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nccriteria_locales_locale_parent_id_unique" ON "nccriteria_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "accessibility_statements_slug_idx" ON "accessibility_statements" USING btree ("slug");
  CREATE INDEX "accessibility_statements_updated_at_idx" ON "accessibility_statements" USING btree ("updated_at");
  CREATE INDEX "accessibility_statements_created_at_idx" ON "accessibility_statements" USING btree ("created_at");
  CREATE INDEX "accessibility_statements__status_idx" ON "accessibility_statements" USING btree ("_status");
  CREATE UNIQUE INDEX "accessibility_statements_locales_locale_parent_id_unique" ON "accessibility_statements_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accessibility_statements_rels_order_idx" ON "accessibility_statements_rels" USING btree ("order");
  CREATE INDEX "accessibility_statements_rels_parent_idx" ON "accessibility_statements_rels" USING btree ("parent_id");
  CREATE INDEX "accessibility_statements_rels_path_idx" ON "accessibility_statements_rels" USING btree ("path");
  CREATE INDEX "accessibility_statements_rels_pages_id_idx" ON "accessibility_statements_rels" USING btree ("pages_id");
  CREATE INDEX "accessibility_statements_rels_posts_id_idx" ON "accessibility_statements_rels" USING btree ("posts_id");
  CREATE INDEX "_nccriteria_v_order_idx" ON "_nccriteria_v" USING btree ("_order");
  CREATE INDEX "_nccriteria_v_parent_id_idx" ON "_nccriteria_v" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_nccriteria_v_locales_locale_parent_id_unique" ON "_nccriteria_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_accessibility_statements_v_parent_idx" ON "_accessibility_statements_v" USING btree ("parent_id");
  CREATE INDEX "_accessibility_statements_v_version_version_slug_idx" ON "_accessibility_statements_v" USING btree ("version_slug");
  CREATE INDEX "_accessibility_statements_v_version_version_updated_at_idx" ON "_accessibility_statements_v" USING btree ("version_updated_at");
  CREATE INDEX "_accessibility_statements_v_version_version_created_at_idx" ON "_accessibility_statements_v" USING btree ("version_created_at");
  CREATE INDEX "_accessibility_statements_v_version_version__status_idx" ON "_accessibility_statements_v" USING btree ("version__status");
  CREATE INDEX "_accessibility_statements_v_created_at_idx" ON "_accessibility_statements_v" USING btree ("created_at");
  CREATE INDEX "_accessibility_statements_v_updated_at_idx" ON "_accessibility_statements_v" USING btree ("updated_at");
  CREATE INDEX "_accessibility_statements_v_snapshot_idx" ON "_accessibility_statements_v" USING btree ("snapshot");
  CREATE INDEX "_accessibility_statements_v_published_locale_idx" ON "_accessibility_statements_v" USING btree ("published_locale");
  CREATE INDEX "_accessibility_statements_v_latest_idx" ON "_accessibility_statements_v" USING btree ("latest");
  CREATE INDEX "_accessibility_statements_v_autosave_idx" ON "_accessibility_statements_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_accessibility_statements_v_locales_locale_parent_id_unique" ON "_accessibility_statements_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_accessibility_statements_v_rels_order_idx" ON "_accessibility_statements_v_rels" USING btree ("order");
  CREATE INDEX "_accessibility_statements_v_rels_parent_idx" ON "_accessibility_statements_v_rels" USING btree ("parent_id");
  CREATE INDEX "_accessibility_statements_v_rels_path_idx" ON "_accessibility_statements_v_rels" USING btree ("path");
  CREATE INDEX "_accessibility_statements_v_rels_pages_id_idx" ON "_accessibility_statements_v_rels" USING btree ("pages_id");
  CREATE INDEX "_accessibility_statements_v_rels_posts_id_idx" ON "_accessibility_statements_v_rels" USING btree ("posts_id");
  ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accessibility_statements_fk" FOREIGN KEY ("accessibility_statements_id") REFERENCES "public"."accessibility_statements"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "search_meta_meta_image_idx" ON "search_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "payload_locked_documents_rels_accessibility_statements_i_idx" ON "payload_locked_documents_rels" USING btree ("accessibility_statements_id");
  ALTER TABLE "search" DROP COLUMN "meta_title";
  ALTER TABLE "search" DROP COLUMN "meta_description";
  ALTER TABLE "search" DROP COLUMN "meta_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_data_table_header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_data_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_data_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_data_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_to_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_to_supply" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_to_tool" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_to" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_modal" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tabs_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_data_table_header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_data_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_data_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_data_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_to_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_to_supply" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_to_tool" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_to" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_modal" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nccriteria" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nccriteria_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accessibility_statements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accessibility_statements_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accessibility_statements_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_nccriteria_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_nccriteria_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_accessibility_statements_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_accessibility_statements_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_accessibility_statements_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "pages_blocks_data_table_header" CASCADE;
  DROP TABLE "pages_blocks_data_table_rows_cells" CASCADE;
  DROP TABLE "pages_blocks_data_table_rows" CASCADE;
  DROP TABLE "pages_blocks_data_table" CASCADE;
  DROP TABLE "pages_blocks_embed" CASCADE;
  DROP TABLE "pages_blocks_how_to_steps" CASCADE;
  DROP TABLE "pages_blocks_how_to_supply" CASCADE;
  DROP TABLE "pages_blocks_how_to_tool" CASCADE;
  DROP TABLE "pages_blocks_how_to" CASCADE;
  DROP TABLE "pages_blocks_modal" CASCADE;
  DROP TABLE "pages_blocks_tabs_items" CASCADE;
  DROP TABLE "pages_blocks_tabs" CASCADE;
  DROP TABLE "pages_blocks_video" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_data_table_header" CASCADE;
  DROP TABLE "_pages_v_blocks_data_table_rows_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_data_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_data_table" CASCADE;
  DROP TABLE "_pages_v_blocks_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_how_to_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_how_to_supply" CASCADE;
  DROP TABLE "_pages_v_blocks_how_to_tool" CASCADE;
  DROP TABLE "_pages_v_blocks_how_to" CASCADE;
  DROP TABLE "_pages_v_blocks_modal" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_video" CASCADE;
  DROP TABLE "nccriteria" CASCADE;
  DROP TABLE "nccriteria_locales" CASCADE;
  DROP TABLE "accessibility_statements" CASCADE;
  DROP TABLE "accessibility_statements_locales" CASCADE;
  DROP TABLE "accessibility_statements_rels" CASCADE;
  DROP TABLE "_nccriteria_v" CASCADE;
  DROP TABLE "_nccriteria_v_locales" CASCADE;
  DROP TABLE "_accessibility_statements_v" CASCADE;
  DROP TABLE "_accessibility_statements_v_locales" CASCADE;
  DROP TABLE "_accessibility_statements_v_rels" CASCADE;
  ALTER TABLE "search_locales" DROP CONSTRAINT "search_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_accessibility_statements_fk";
  
  DROP INDEX "search_meta_meta_image_idx";
  DROP INDEX "payload_locked_documents_rels_accessibility_statements_i_idx";
  ALTER TABLE "search" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "search" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "search" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  ALTER TABLE "search_locales" DROP COLUMN "meta_title";
  ALTER TABLE "search_locales" DROP COLUMN "meta_description";
  ALTER TABLE "search_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "accessibility_statements_id";
  DROP TYPE "public"."enum_accessibility_statements_compliance_status";
  DROP TYPE "public"."enum_accessibility_statements_status";
  DROP TYPE "public"."enum__accessibility_statements_v_version_compliance_status";
  DROP TYPE "public"."enum__accessibility_statements_v_version_status";
  DROP TYPE "public"."enum__accessibility_statements_v_published_locale";`)
}
