import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { PoolOptions } from 'mysql2/promise';

dotenv.config();

const poolConfig: PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'recipe_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(poolConfig);

export default pool; 