
import { db } from "./db";
import { sql } from "drizzle-orm";

async function main() {
    await db.execute(sql`
    CREATE TABLE IF NOT EXISTS tenant_config (
      config_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      council_id VARCHAR NOT NULL REFERENCES councils(council_id) ON DELETE CASCADE,
      council_name TEXT,
      short_name TEXT,
      logo_url TEXT,
      favicon_url TEXT,
      tagline TEXT,
      primary_color TEXT DEFAULT '#1e40af',
      secondary_color TEXT DEFAULT '#7c3aed',
      accent_color TEXT DEFAULT '#f59e0b',
      background_root_color TEXT DEFAULT '#EBECED',
      background_default_color TEXT DEFAULT '#FCFCFC',
      background_higher_color TEXT DEFAULT '#F0F1F2',
      foreground_default_color TEXT DEFAULT '#07080A',
      foreground_dimmer_color TEXT DEFAULT '#3D4047',
      outline_color TEXT DEFAULT '#C0C3C4',
      primary_foreground TEXT,
      positive_color TEXT DEFAULT '#10b981',
      warning_color TEXT DEFAULT '#f59e0b',
      negative_color TEXT DEFAULT '#ef4444',
      sidebar_background TEXT,
      sidebar_foreground TEXT,
      header_background TEXT,
      header_foreground TEXT,
      card_background TEXT,
      border_radius INTEGER DEFAULT 4,
      button_radius INTEGER DEFAULT 4,
      card_radius INTEGER DEFAULT 8,
      input_radius INTEGER DEFAULT 4,
      font_family TEXT DEFAULT 'Inter',
      location_levels JSONB DEFAULT '["Country", "Province", "District", "Ward"]'::jsonb,
      locale TEXT DEFAULT 'en-PG',
      timezone TEXT DEFAULT 'Pacific/Port_Moresby',
      date_format TEXT DEFAULT 'DD/MM/YYYY',
      time_format TEXT DEFAULT 'HH:mm',
      first_day_of_week TEXT DEFAULT 'monday',
      currency TEXT DEFAULT 'PGK',
      currency_symbol TEXT DEFAULT 'K',
      currency_position TEXT DEFAULT 'before',
      decimal_separator TEXT DEFAULT '.',
      thousands_separator TEXT DEFAULT ',',
      address TEXT,
      phone TEXT,
      email TEXT,
      website TEXT,
      emergency_contact TEXT,
      facebook TEXT,
      twitter TEXT,
      linkedin TEXT,
      enable_multi_language TEXT DEFAULT 'false',
      supported_languages JSONB DEFAULT '["en"]'::jsonb,
      enabled_modules JSONB DEFAULT '["registry", "licensing", "services", "payments", "portal"]'::jsonb,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);
    console.log("Table created");
    process.exit(0);
}

main().catch(console.error);
