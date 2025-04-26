const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  console.log("✅ /api/suppliers route hit");

  try {
    const query = `
    SELECT s.supplier_id, s.name, s.contact_person, s.phone_number, s.email, s.address, c.name as Category from supplier s, inventory_category c
    where s.category_id = c.category_id;
    `;

    const menuResult = await pool.query(query);

    res.json(menuResult.rows);
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
