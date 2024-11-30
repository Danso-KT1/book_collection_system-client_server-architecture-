const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// POST a new book
app.post('/api/books', async (req, res) => {
    const { title, author, price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, price) VALUES ($1, $2, $3) RETURNING *',
            [title, author, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// DELETE a book by title
app.delete('/api/books/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const result = await pool.query('DELETE FROM books WHERE title = $1 RETURNING *', [title]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully', book: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET all books
app.get('/api/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});