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
          backgroundColor: 'rgba(67, 119, 203, 0.6)',
          borderColor: 'rgb(75, 81, 192)',
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
            'rgba(7, 4, 61, 0.6)',
            'rgba(16, 9, 153, 0.6)',
            'rgba(68, 60, 221, 0.6)',
            'rgba(116, 109, 255, 0.6)',
            'rgba(163, 159, 245, 0.7)'
          ],
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  })
  .catch(error => console.error('Error fetching orders data:', error));
