import cors from 'cors';
import express, { Request, Response } from 'express';
import mysql, { Pool, MysqlError } from 'mysql'; // Added types for mysql
import process from 'process';

const app = express();

// Create a connection pool for MySQL
const pool: Pool = mysql.createPool({
    host: process.env.MYSQL_HOST_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Use CORS middleware
app.use(cors());

// Start the server, ensuring that the port is properly typed
const port = Number(process.env.EXPRESS_PORT) || 8000;
app.listen(port, () => {
    console.log(`App server now listening on port ${port}`);
});

// Define a route to handle GET requests
app.get('/test', (req: Request, res: Response) => {
    const { table } = req.query;

    // Ensure table name is a string
    if (typeof table !== 'string') {
        return res.status(400).send('Invalid table name');
    }

    // Perform MySQL query with parameterized query to avoid SQL injection
    pool.query(`SELECT * FROM ??`, [table], (err: MysqlError | null, results: any) => {
        if (err) {
            return res.status(500).send(err.message); // Send error message as response
        } else {
            return res.json(results); // Send query results as JSON response
        }
    });
});