import mysql, { Connection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

export default class DataBase {
    private static instance: Connection | null = null;

    private constructor() {}

    static async initConnection(): Promise<Connection> {
        if (this.instance) {
            return this.instance;
        }
        
        try {
            this.instance = await mysql.createConnection({
                host: process.env.HOSTDB,
                user: process.env.USERDB,
                password: process.env.PASSWORDDB,
                database: process.env.DATABASEDB,
                port: process.env.PORTDB ? Number(process.env.PORTDB) : 3306,
            });

            console.log('Conectado ao banco de dados com o id: ' + this.instance.threadId);
            return this.instance;
        } catch (err) {
            console.error('Erro ao conectar ao banco de dados: ' + (err as Error).message);
            throw err;
        }
    }

    static async getInstance(): Promise<Connection> {
        if (!this.instance) {
            return this.initConnection();
        }
        return this.instance;
    }
}