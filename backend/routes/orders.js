const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  console.log("✅ /api/orders route hit");

  try {
    const query = `
      SELECT o.order_id, s.name AS supplier_name, c.name AS category_name, 
      COALESCE(
        vi.name,
        fi.name,
        di.name,
        gi.name,
        si.name,
        oi.name,
        swi.name,
        ci.name,
        mi.name
    ) AS inventory_item_name,
    o.quantity,
    o.unit,
    o.timestamp

    FROM stock_orders o
    JOIN supplier s ON o.supplier_id = s.supplier_id
    JOIN inventory_category c ON o.category_id = c.category_id

LEFT JOIN veg_inventory vi
  ON o.category_id = 1 AND o.inventory_id = vi.inventory_id
LEFT JOIN fruits_inventory fi
  ON o.category_id = 2 AND o.inventory_id = fi.inventory_id
LEFT JOIN dairy_inventory di
  ON o.category_id = 3 AND o.inventory_id = di.inventory_id
LEFT JOIN grain_flours_inventory gi
  ON o.category_id = 4 AND o.inventory_id = gi.inventory_id
LEFT JOIN spices_herbs_inventory si
  ON o.category_id = 5 AND o.inventory_id = si.inventory_id
LEFT JOIN oils_fats_inventory oi
  ON o.category_id = 6 AND o.inventory_id = oi.inventory_id
LEFT JOIN sweetners_inventory swi
  ON o.category_id = 7 AND o.inventory_id = swi.inventory_id
LEFT JOIN condiments_sauces_inventory ci
  ON o.category_id = 8 AND o.inventory_id = ci.inventory_id
LEFT JOIN miscellaneous_inventory mi
  ON o.category_id = 9 AND o.inventory_id = mi.inventory_id;
    `;

    const menuResult = await pool.query(query);

    res.json(menuResult.rows);
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
