const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  console.log("✅ /api/sales route hit");

  try {
    const query = `
    SELECT s.sale_id, m.name, s.quantity, s.total_price, s.sale_date from sales s, menu m
    where s.menu_id = m.menu_id;
    `;

    const menuResult = await pool.query(query);

    res.json(menuResult.rows);
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
