// Data Display
const tableBody = document.querySelector('#inventory-table tbody');

async function fetchOrders() {
  try {
    const response = await fetch(`http://localhost:5000/api/suppliers`); // No category anymore
    const data = await response.json();
    console.log("Fetched data:", data);
    renderTable(data);
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}

function renderTable(items) {
  if (!items || items.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='6'>No data available</td></tr>"; // Adjust colspan based on your table structure
    return;
  }

  tableBody.innerHTML = ''; // Clear old rows
  items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.supplier_id}</td>
      <td>${item.name}</td>
      <td>${item.contact_person}</td>
      <td>${item.phone_number}</td>
      <td>${item.email}</td>
      <td>${item.address}</td>
      <td>${item.category}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Initial fetch
fetchOrders();
