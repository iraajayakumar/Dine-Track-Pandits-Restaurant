const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  console.log("✅ /api/managemenu route hit");

  try {
    const categoryName = req.query.category;

    let query = `
      SELECT m.name, m.price, c.category_name
      FROM menu m
      INNER JOIN menucategory c ON m.category_id = c.category_id
    `;
    let params = [];

    if (categoryName) {
      query += ` WHERE c.category_name = $1 ORDER BY m.name`;
      params.push(categoryName);
    } else {
      query += ` ORDER BY m.name`;
    }

    const menuResult = await pool.query(query, params);

    res.json(menuResult.rows);
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;