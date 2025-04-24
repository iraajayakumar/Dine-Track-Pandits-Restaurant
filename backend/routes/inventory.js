const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET paginated product data

const categoryTableMap = {
  "Vegetables": "veg_inventory",
  "Fruits": "fruits_inventory",
  "Dairy": "dairy_inventory",
  "Grains & Flours": "grain_flours_inventory",
  "Spices & Herbs": "spices_herbs_inventory",
  "Oils & Fats": "oils_fats_inventory",
  "Sweetners": "sweetners_inventory",
  "Condiments & Sauces": "condiments_sauces_inventory",
  "Miscellaneous": "miscellaneous_inventory"
};

router.get('/', async (req, res) => {
  console.log("✅ /api/inventory route hit");
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const category = req.query.category || 'Vegetables';
    const tableName = categoryTableMap[category];

    if (!tableName) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const query = `
      SELECT name, stock_quantity, price_per_unit, unit, reorder_level, expiry_date
      FROM ${tableName}
      LIMIT $1 OFFSET $2;
    `;

    const result = await pool.query(query, [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    console.error("db error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = router;