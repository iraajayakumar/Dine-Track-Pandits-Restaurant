const express = require('express');
const multer = require('multer'); // 🛠️ Add multer
const router = express.Router();
const pool = require('../db');
const upload = multer(); // 🛠️ Use memory storage

// GET: Fetch sales
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

// POST: Insert a new sale
router.post('/', upload.none(), async (req, res) => { // 🛠️ Add upload.none()
  console.log("✅ POST /api/sales route hit");

  const { menuID, quantity, price } = req.body;
  console.log("Received data:", req.body);

  try {
    const query = `
      INSERT INTO sales (menu_id, quantity, total_price, sale_date)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const values = [menuID, quantity, price];

    const result = await pool.query(query, values);

    res.status(201).json({ message: "Sale added successfully", sale: result.rows[0] });
  } catch (err) {
    console.error("❌ DB Insert Error:", err);
    res.status(500).json({ error: "Failed to add sale" });
  }
});
module.exports = router;
