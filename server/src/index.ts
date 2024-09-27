import cors from 'cors';
import express, { Request, Response } from 'express';
import mysql, { Pool, MysqlError } from 'mysql';
import process from 'process';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

console.log(cors)
console.log(express)

// Create a connection pool for MySQL
const pool: Pool = mysql.createPool({
    host: process.env.MYSQL_HOST_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Use CORS middleware
app.use(cors());

// Start the server
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

app.post('/products/search', (req: Request, res: Response) => {
    const { porosity_val, course_val, density_val, length_val, curl_val, category_val, max_price, max_po } = req.body;

    const query = `
    SELECT *
    FROM products
    WHERE 
    category_name = ?
    AND price_per_container <= ?
    AND price_per_oz <= ?
    AND ABS(porosity_score - ?) +
    ABS(course_score - ?) +
    ABS(density_score - ?) +
    ABS(length_score - ?) +
    ABS(curl_type - ?) = (
        SELECT MIN(
            ABS(porosity_score - ?) +
            ABS(course_score - ?) +
            ABS(density_score - ?) +
            ABS(length_score - ?) +
            ABS(curl_type - ?)
        )
        FROM products
        WHERE category_name = ? 
        AND price_per_container <= ? 
        AND price_per_oz <= ?
    );
    `;

    const values = [
        category_val,
        max_price,
        max_po,
        porosity_val,
        course_val,
        density_val,
        length_val,
        curl_val,
        porosity_val,
        course_val,
        density_val,
        length_val,
        curl_val,
        category_val,
        max_price,
        max_po,
    ];

    pool.query(query, values, (err: MysqlError | null, results: any) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
});

app.get('/combinations', (req: Request, res: Response) => {
    const { style_name } = req.query;

    if (typeof style_name !== 'string') {
        return res.status(400).send('Invalid style name');
    }

    const query = `
        SELECT GROUP_CONCAT(DISTINCT category_name ORDER BY category_name SEPARATOR ', ') AS category_combination
        FROM styles_has_categories
        WHERE style_name = ?
        GROUP BY combo_number
    `;

    pool.query(query, [style_name], (err: MysqlError | null, results: any) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results.length > 0 ? results : []);
    });
});

// Endpoint to fetch categories
app.get('/categories', (req: Request, res: Response) => {
    const query = 'SELECT category_name FROM categories';
    
    pool.query(query, (err: MysqlError | null, results: any) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ message: 'Error fetching categories' });
        }
        res.json(results); // Send the result as a JSON response
    });
});

// Endpoint to fetch styles
app.get('/styles', (req: Request, res: Response) => {
    const query = 'SELECT style_name FROM styles';
    
    pool.query(query, (err: MysqlError | null, results: any) => {
        if (err) {
            console.error('Error fetching styles:', err);
            return res.status(500).json({ error: 'Failed to fetch styles' });
        }
        res.json(results); // Respond with the styles data
    });
});
