// Fetch sales data
fetch('http://localhost:5000/api/sales') // replace with your actual route
  .then(response => response.json())
  .then(data => {
    // Group and sum quantities by food name
    const quantities = {};

    data.forEach(sale => {
      if (quantities[sale.name]) {
        quantities[sale.name] += sale.quantity;
      } else {
        quantities[sale.name] = sale.quantity;
      }
    });

    const labels = Object.keys(quantities);
    const values = Object.values(quantities);

    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Quantity Sold',
          data: values,
          backgroundColor: 'rgba(30, 64, 140, 0.6)',  // A more opaque blue shade
          borderColor: 'rgba(30, 64, 140, 1)',  // Matching border color
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => console.error('Error fetching sales data:', error));


// Fetch orders data
fetch('http://localhost:5000/api/orders') // replace with your actual route
  .then(response => response.json())
  .then(data => {
    // Group and sum quantities by category
    const categories = {};

    data.forEach(order => {
      const quantity = parseFloat(order.quantity); // make sure it's a number
      if (categories[order.category_name]) {
        categories[order.category_name] += quantity;
      } else {
        categories[order.category_name] = quantity;
      }
    });

    const labels = Object.keys(categories);
    const values = Object.values(categories);

    const ctx = document.getElementById('ordersChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Inventory Ordered (kg)',
          data: values,
          backgroundColor: [
            'rgba(34, 87, 153, 0.6)',  // Blueish shades with opacity
            'rgba(55, 99, 163, 0.6)',  
            'rgba(72, 121, 185, 0.6)',
            'rgba(100, 149, 225, 0.6)',
            'rgba(119, 172, 238, 0.6)'
          ],
          borderColor: 'rgba(255, 255, 255, 1)', // White border for clarity
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  })
  .catch(error => console.error('Error fetching orders data:', error));

// Fetch menu data
fetch('http://localhost:5000/api/managemenu') // replace with your actual route
  .then(response => response.json())
  .then(data => {
    // 1. Group items by category and count the number of items
    const categoryCounts = {};

    data.forEach(item => {
      if (categoryCounts[item.category_name]) {
        categoryCounts[item.category_name] += 1;
      } else {
        categoryCounts[item.category_name] = 1;
      }
    });

    const categoryLabels = Object.keys(categoryCounts);
    const categoryItemCounts = Object.values(categoryCounts);

    const ctxItemsPerCategory = document.getElementById('itemsPerCategoryChart').getContext('2d');
    new Chart(ctxItemsPerCategory, {
      type: 'bar',
      data: {
        labels: categoryLabels,
        datasets: [{
          label: 'Number of Items',
          data: categoryItemCounts,
          backgroundColor: 'rgba(30, 64, 140, 0.6)',  // Same blue theme as the bar chart
          borderColor: 'rgba(30, 64, 140, 1)',  // Matching border color
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // 2. Group items by category and calculate total price per category
    const categoryPriceSums = {};

    data.forEach(item => {
      const price = parseFloat(item.price);
      if (categoryPriceSums[item.category_name]) {
        categoryPriceSums[item.category_name] += price;
      } else {
        categoryPriceSums[item.category_name] = price;
      }
    });

    const categoryPriceLabels = Object.keys(categoryPriceSums);
    const categoryPriceTotals = Object.values(categoryPriceSums);

    const ctxPricePerCategory = document.getElementById('pricePerCategoryChart').getContext('2d');
    new Chart(ctxPricePerCategory, {
      type: 'pie',
      data: {
        labels: categoryPriceLabels,
        datasets: [{
          label: 'Total Price',
          data: categoryPriceTotals,
          backgroundColor: [
            'rgba(34, 87, 153, 0.6)',  // Blueish shades with opacity
            'rgba(55, 99, 163, 0.6)',  
            'rgba(72, 121, 185, 0.6)',
            'rgba(100, 149, 225, 0.6)',
            'rgba(119, 172, 238, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  })
  .catch(error => console.error('Error fetching menu data:', error));
