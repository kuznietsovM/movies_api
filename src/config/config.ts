import dotenv from 'dotenv';

dotenv.config()

interface Config {
  app: {
    port: number
  }
  db: {
    port: number
  }
}

const config: Config = {
  app: {
    port: Number(process.env.APP_PORT) || 8050,
  },
  db: {
    port: Number(process.env.DB_PORT) || 5432,
  }
}

export default config;