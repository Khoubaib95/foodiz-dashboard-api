import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  CLIENT_URL,
  SERVER_URL,
  NAME,
  WEBSITE,
  CONTACT,
  VERSION,
  PORT,
  CLOUD_DB,
  LOCAL_DB,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
} = process.env;
