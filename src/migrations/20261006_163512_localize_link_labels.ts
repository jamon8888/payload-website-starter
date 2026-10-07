import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  CREATE INDEX "pages_hero_links_locale_idx" ON "pages_hero_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_hero_links_locale_idx" ON "_pages_v_version_hero_links" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "pages_hero_links_locale_idx";
  DROP INDEX "_pages_v_version_hero_links_locale_idx";
  ALTER TABLE "pages_hero_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "_locale";`)
}
