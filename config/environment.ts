import path from 'path';
import dotenv from 'dotenv';

const envName = process.env.TEST_ENV ?? 'qa';
const envFile = path.resolve(process.cwd(), `.env.${envName}`);

dotenv.config({ path: envFile });

function getRequiredValue(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function toBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === 'true';
}

export const env = {
  name: envName,
  baseUrl: getRequiredValue('BASE_URL'),
  username: getRequiredValue('USERNAME', 'standard_user'),
  password: getRequiredValue('PASSWORD', 'secret_sauce'),
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT ?? 30_000),
  expectTimeout: Number(process.env.EXPECT_TIMEOUT ?? 7_000),
  headless: toBoolean(process.env.HEADLESS, false)
} as const;
