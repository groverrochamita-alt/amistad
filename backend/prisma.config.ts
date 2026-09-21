import { defineConfig } from 'prisma/config'
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrate: {
    adapter: new PrismaPg(pool),
  },
})
