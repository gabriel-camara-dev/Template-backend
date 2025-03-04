import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['dev', 'production', 'test'])
    .default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('🚨 Invalid environment variables:', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data