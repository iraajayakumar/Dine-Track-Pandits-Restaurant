const express = require('express');    // Import express
const cors = require('cors');        // Import CORS to allow cross-origin requests

const app = express();
const PORT = 5000;                    // Port for local development

// Middleware
app.use(cors());                      // Enable CORS
app.use(express.json());              // Parse JSON data from the body of requests

// Import routes
const productRoutes = require('./routes/inventory');
const manageMenuRoutes = require('./routes/managemenu');
app.use('/api/inventory', productRoutes);
app.use('/api/managemenu', manageMenuRoutes);

app.get('/', (req, res) => {
  res.send('🏠 Hello from backend root');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
