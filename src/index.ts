import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
import { DataSource } from "typeorm"
dotenv.config();

const start = () => {
    try {
        const AppDataSource = new DataSource({
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
        
        AppDataSource.initialize()
            .then(() => {
                const app = express();
        
                app.use(express.json());
                app.use(cors({
                    origin: ["http://localhost:3000"]
                }));
        
                routes(app);
        
                app.listen(8000, () => {
                    console.log('listenig to port 8000');
                });
            })
            .catch((error) => console.log(error))

    } catch (error) {
        console.log(error);
        throw new Error('Unable to connect db');
    }
};

start();


