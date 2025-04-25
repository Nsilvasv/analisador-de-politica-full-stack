import mysql from 'mysql2/promise';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT, 
  user: process.env.DB_USER,      
  database: process.env.DB_DATABASE,  
  password: process.env.DB_PASSWORD,    
  charset: 'utf8mb4'
});

export default pool;