import dotenv from 'dotenv';
import { z } from 'zod';
import cryto from 'crypto';

dotenv.config()

const ConfigSchema = z.object({
  port: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val);
    }
    return val;
  }, z.number().int().default(8050)),
  jwtSecret: z.string().default(cryto.randomBytes(32).toString()),
  jwtExpireTimeSeconds: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val);
    }
    return val;
  }, z.number().int().default(7200))
})

const config = ConfigSchema.parse({
  port: process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireTimeSeconds: process.env.JWT_EXPIRE_TIME_SECONDS
})

export default config;