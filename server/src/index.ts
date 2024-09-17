import cors from 'cors';
import express, { Request, Response } from 'express';
import mysql, { Pool, MysqlError } from 'mysql'; // Added types for mysql
import process from 'process';

const app = express();

// Middleware to parse JSON requests
app.use(express.json()); // This will parse incoming JSON bodies

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

// Define a route to handle POST requests for inserting data
app.post('/test', (req: Request, res: Response) => {
    console.log(`POST request received: ${JSON.stringify(req.body)}`);
    const { table, data } = req.body;

    // Ensure table name is a string
    if (typeof table !== 'string') {
        return res.status(400).send('Invalid table name');
    }

    // Ensure data is an object
    if (typeof data !== 'object') {
        return res.status(400).send('Invalid data object');
    }

    // Perform MySQL query with parameterized query to avoid SQL injection
    pool.query(`INSERT INTO ?? SET ?`, [table, data], (err: MysqlError | null, results: any) => {
        if (err) {
            return res.status(500).send(err.message); // Send error message as response
        } else {
            return res.json(results); // Send query results as JSON response
        }
    });
});

// Define a route to handle DELETE requests
app.delete('/test/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    // Ensure ID is a valid number
    if (isNaN(Number(id))) {
        return res.status(400).send('Invalid ID');
    }

    // Perform MySQL query with parameterized query to avoid SQL injection
    pool.query(`DELETE FROM styles WHERE style_id = ?`, [id], (err: MysqlError | null, results: any) => {
        if (err) {
            return res.status(500).send(err.message); // Send error message as response
        } else if (results.affectedRows === 0) {
            return res.status(404).send('Style not found');
        } else {
            return res.status(200).send(`Style with ID ${id} deleted successfully`);
        }
    });
});

// Define a route to handle PUT requests
app.put('/test/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body; // Directly use req.body instead of req.body.data
    console.log(`Id: ${id}, Data: ${JSON.stringify(data)}`);

    // Ensure ID is a valid number
    if (isNaN(Number(id))) {
        return res.status(400).send('Invalid ID');
    }

    // Ensure data is an object
    if (typeof data !== 'object') {
        return res.status(400).send('Invalid data object');
    }

    // Perform MySQL query with parameterized query to avoid SQL injection
    pool.query(`UPDATE styles SET ? WHERE style_id = ?`, [data, id], (err: MysqlError | null, results: any) => {
        if (err) {
            return res.status(500).send(err.message); // Send error message as response
        } else if (results.affectedRows === 0) {
            return res.status(404).send('Style not found');
        } else {
            return res.status(200).send(`Style with ID ${id} updated successfully`);
        }
    });
});


