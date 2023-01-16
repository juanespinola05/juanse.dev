import { configAsync as dotEnvConfig } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';

dotEnvConfig({ export: true });

export { dotEnvConfig };
