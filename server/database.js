import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();


export async function getAllBreweries() {
    const [result] = await pool.query("SELECT * FROM Breweries");
    const allBreweries = result;
    return allBreweries;
}