import express from 'express';
import db from '../db.js';

const router = express.Router();

// CREATE (Add New)
router.post('/', (req, res) => {
  const { title, type, director, budget, location, duration, year_or_time } = req.body;
  const sql = 'INSERT INTO movies (title, type, director, budget, location, duration, year_or_time) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, type, director, budget, location, duration, year_or_time], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Movie added successfully', id: result.insertId });
  });
});

// READ (Fetch All)
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM movies ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// UPDATE (Edit)
router.put('/:id', (req, res) => {
  const { title, type, director, budget, location, duration, year_or_time } = req.body;
  const sql = 'UPDATE movies SET title=?, type=?, director=?, budget=?, location=?, duration=?, year_or_time=? WHERE id=?';
  db.query(sql, [title, type, director, budget, location, duration, year_or_time, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Movie updated successfully' });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM movies WHERE id=?';
  db.query(sql, [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Movie deleted successfully' });
  });
});

export default router;
