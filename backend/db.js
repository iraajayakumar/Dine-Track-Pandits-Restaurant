// Import the PostgreSQL client from the 'pg' package
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_GoPMV3YugAj9@ep-sweet-sunset-a8qrf0qe-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

// Export the pool for use in other files
module.exports = pool;
