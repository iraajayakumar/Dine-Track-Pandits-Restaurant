// Import the PostgreSQL client from the 'pg' package
const { Pool } = require('pg');

// Create a connection pool to Neon DB
const pool = new Pool({
  user: 'Sanskriti Tiwari',       // Replace with your Neon DB username
  host: 'postgresql://neondb_owner:npg_GoPMV3YugAj9@ep-sweet-sunset-a8qrf0qe-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',         // Replace with your Neon DB URL (e.g., dbname.neon.tech)
  database: "Pandit's Restaurant",   // Replace with your Neon database name
  password: 'npg_GoPMV3YugAj9',   // Replace with your Neon password
  port: 5432,                       // Default port for PostgreSQL
  ssl: {
    rejectUnauthorized: false,      // Required by Neon for SSL connection
  },
});

// Export the pool for use in other files
module.exports = pool;
