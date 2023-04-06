import { ConnectionOptions } from 'typeorm';

export const databaseConfig: ConnectionOptions = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Photo],
  synchronize: true,
  logging: false,
};