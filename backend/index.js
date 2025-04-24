const express = require('express');    // Import express
const cors = require('cors');        // Import CORS to allow cross-origin requests

const app = express();
const PORT = 5000;                    // Port for local development

// Middleware
app.use(cors());                      // Enable CORS
app.use(express.json());              // Parse JSON data from the body of requests

// Import product routes (we will create these later)
const productRoutes = require('./routes/inventory');
app.use('/api/inventory', productRoutes);  // Set up a route to handle requests for products

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
