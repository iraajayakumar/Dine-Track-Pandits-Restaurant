// Add Button Modal Popup
const modal = document.getElementById("modalOverlay");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Data Display
const tableBody = document.querySelector('#inventory-table tbody');

async function fetchOrders() {
  try {
    const response = await fetch(`http://localhost:5000/api/sales`); // No category anymore
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
      <td>${item.sale_id}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.total_price}</td>
      <td>${new Date(item.sale_date).toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Initial fetch
fetchOrders();
