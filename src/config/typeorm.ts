import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host:  process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Asegúrate de incluir tanto .ts como .js
    migrations: [__dirname + '/../migrations/*.ts'],
    autoLoadEntities: process.env.STAGE === 'dev' ? true : false,
    synchronize:  process.env.STAGE === 'dev' ? true : false
}



export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);