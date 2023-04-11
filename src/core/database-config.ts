
import dotenv from 'dotenv';
import { DataSource } from "typeorm"
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
      "src/entity/*.ts"
  ],
  synchronize: true,
  logging: false
});
