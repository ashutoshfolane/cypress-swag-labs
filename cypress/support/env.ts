import * as path from 'node:path';
import * as fs from 'node:fs';
import * as dotenv from 'dotenv';
import { z } from 'zod';

const EnvSchema = z.object({
  TEST_ENV: z.enum(['local', 'qa', 'stage']).default('local'),
  BASE_URL: z.string().url(),
  USERNAME: z.string().min(1),
  PASSWORD: z.string().min(1),
  ENABLE_ALLURE: z.coerce.boolean().default(false),
  ENABLE_VISUAL: z.coerce.boolean().default(false),
});

export type ValidatedEnv = z.infer<typeof EnvSchema>;

let cached: ValidatedEnv | null = null;

export function loadAndValidateEnv(): ValidatedEnv {
  if (cached) return cached;

  const testEnv = (process.env.TEST_ENV ?? 'local') as ValidatedEnv['TEST_ENV'];
  const envFile = path.resolve(process.cwd(), `env/.env.${testEnv}`);

  // Load env file if present; allow CI to inject env vars directly.
  // override:true allows the file to win over existing process.env (useful locally).
  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile, override: true });
    console.log(`[env] Loaded ${envFile}`);
  } else {
    console.log(`[env] No env file found at ${envFile}. Using process.env only.`);
  }

  const parsed = EnvSchema.safeParse({
    TEST_ENV: process.env.TEST_ENV ?? testEnv,
    BASE_URL: process.env.BASE_URL,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    ENABLE_ALLURE: process.env.ENABLE_ALLURE,
    ENABLE_VISUAL: process.env.ENABLE_VISUAL,
  });

  if (!parsed.success) {
    console.error('[env] Invalid env configuration:', parsed.error.flatten().fieldErrors);
    throw new Error(`Invalid env configuration. Fix env/.env.${testEnv} or set CI env vars.`);
  }

  cached = parsed.data;
  return cached;
}
