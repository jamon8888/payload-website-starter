import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_theme_radius" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_site_settings_theme_font_family" AS ENUM('geist', 'system', 'serif');
  CREATE TYPE "public"."enum_site_settings_theme_default_theme" AS ENUM('light', 'dark', 'system');
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"theme_primary_color" varchar DEFAULT 'oklch(20.5% 0 0deg)',
  	"theme_primary_foreground" varchar DEFAULT 'oklch(98.5% 0 0deg)',
  	"theme_radius" "enum_site_settings_theme_radius" DEFAULT 'md',
  	"theme_font_family" "enum_site_settings_theme_font_family" DEFAULT 'geist',
  	"theme_default_theme" "enum_site_settings_theme_default_theme" DEFAULT 'system',
  	"seo_title_template" varchar DEFAULT '%s | {site}',
  	"seo_og_image_id" integer,
  	"seo_twitter_handle" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"brand_name" varchar DEFAULT 'Payload Website' NOT NULL,
  	"seo_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_seo_seo_og_image_idx" ON "site_settings" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TYPE "public"."enum_site_settings_theme_radius";
  DROP TYPE "public"."enum_site_settings_theme_font_family";
  DROP TYPE "public"."enum_site_settings_theme_default_theme";`)
}
