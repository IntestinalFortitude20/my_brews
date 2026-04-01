import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || process.env.DB_PASS,
    port: Number.parseInt(process.env.DB_PORT || '3306', 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const databaseName = process.env.DB_DATABASE || process.env.DB_NAME;

const pool = mysql.createPool({
    ...connectionConfig,
    database: databaseName
}).promise();

function mapRowToBrewery(row) {
    return {
        id: row.id,
        name: row.name,
        brewery_type: row.brewery_type,
        address: row.address,
        city: row.city,
        state: row.state,
        postal_code: row.postal_code,
        country: row.country,
        phone: row.phone,
        website: row.website,
        longitude: row.longitude,
        latitude: row.latitude
    };
}

export async function ensureSchema() {
    const setupConnection = await mysql.createConnection(connectionConfig).promise();

    await setupConnection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
    await setupConnection.end();

    await pool.query(`
        CREATE TABLE IF NOT EXISTS breweries (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            brewery_type VARCHAR(100),
            address VARCHAR(255),
            city VARCHAR(100),
            state VARCHAR(100),
            postal_code VARCHAR(20),
            country VARCHAR(100),
            phone VARCHAR(20),
            website VARCHAR(255),
            longitude VARCHAR(50),
            latitude VARCHAR(50),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

export async function upsertBreweries(breweries = []) {
    if (!Array.isArray(breweries) || breweries.length === 0) {
        return;
    }

    const values = breweries.map((brewery) => [
        brewery.id,
        brewery.name,
        brewery.brewery_type || null,
        brewery.address || null,
        brewery.city || null,
        brewery.state || null,
        brewery.postal_code || null,
        brewery.country || null,
        brewery.phone || null,
        brewery.website || null,
        brewery.longitude || null,
        brewery.latitude || null
    ]);

    await pool.query(
        `
        INSERT INTO breweries
        (id, name, brewery_type, address, city, state, postal_code, country, phone, website, longitude, latitude)
        VALUES ?
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            brewery_type = VALUES(brewery_type),
            address = VALUES(address),
            city = VALUES(city),
            state = VALUES(state),
            postal_code = VALUES(postal_code),
            country = VALUES(country),
            phone = VALUES(phone),
            website = VALUES(website),
            longitude = VALUES(longitude),
            latitude = VALUES(latitude)
        `,
        [values]
    );
}

export async function searchBreweriesInDb(query, filters = {}) {
    const whereParts = [];
    const values = [];

    if (query) {
        whereParts.push('(name LIKE ? OR city LIKE ? OR state LIKE ?)');
        const likeQuery = `%${query}%`;
        values.push(likeQuery, likeQuery, likeQuery);
    }

    if (filters.city) {
        whereParts.push('city = ?');
        values.push(filters.city);
    }

    if (filters.state) {
        whereParts.push('state = ?');
        values.push(filters.state);
    }

    if (filters.country) {
        whereParts.push('country = ?');
        values.push(filters.country);
    }

    if (filters.postal) {
        whereParts.push('postal_code = ?');
        values.push(filters.postal);
    }

    const whereClause = whereParts.length > 0 ? `WHERE ${whereParts.join(' AND ')}` : '';

    const page = Number.parseInt(filters.page || '1', 10);
    const perPage = Number.parseInt(filters.per_page || '50', 10);
    const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
    const safePerPage = Number.isNaN(perPage) || perPage < 1 ? 50 : perPage;
    const offset = (safePage - 1) * safePerPage;

    const [rows] = await pool.query(
        `SELECT * FROM breweries ${whereClause} ORDER BY name ASC LIMIT ? OFFSET ?`,
        [...values, safePerPage, offset]
    );

    return rows.map(mapRowToBrewery);
}

export async function getBreweryByIdFromDb(id) {
    const [rows] = await pool.query('SELECT * FROM breweries WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) {
        return null;
    }

    return mapRowToBrewery(rows[0]);
}

export async function getRandomBreweryFromDb() {
    const [rows] = await pool.query('SELECT * FROM breweries ORDER BY RAND() LIMIT 1');
    if (rows.length === 0) {
        return null;
    }

    return mapRowToBrewery(rows[0]);
}

export async function getAllBreweriesFromDb(page = 1, perPage = 50) {
    const safePage = page < 1 ? 1 : page;
    const safePerPage = perPage < 1 ? 50 : perPage;
    const offset = (safePage - 1) * safePerPage;

    const [rows] = await pool.query(
        'SELECT * FROM breweries ORDER BY name ASC LIMIT ? OFFSET ?',
        [safePerPage, offset]
    );

    return rows.map(mapRowToBrewery);
}