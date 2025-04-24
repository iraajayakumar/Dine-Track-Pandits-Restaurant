const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET paginated product data
router.get('/', async (req, res) => {
  try {
    // Pagination params from frontend: page=1, limit=10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Only fetch selected columns
    const query = `
      SELECT i.name, c.name, i.stock_quantity, i.price_per_unit, i.unit, i.reorder_level, i.expiry_date from inventory i, inventory_category c
        WHERE i.category_id = c.category_id
        LIMIT $1 OFFSET $2;
    `;

    const result = await pool.query(query, [limit, offset]);
    res.json(result.rows); // array of rows
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;