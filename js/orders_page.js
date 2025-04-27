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


// Form submit handling
const newOrderForm = document.getElementById('newOrderForm');

newOrderForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent default form action (page reload)

  const formData = new FormData(newOrderForm); // collect all form data including image

  try {
    const response = await fetch('http://localhost:5000/api/orders', {  // <-- Updated endpoint
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('✅ Order added successfully!');
      modal.style.display = "none"; // close modal on success
      newOrderForm.reset(); // clear form

      fetchOrders(); // ⬅️ Refresh the table after adding a sale
    } else {
      const errorData = await response.json();
      alert('❌ Failed to add order: ' + errorData.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Error adding order.');
  }
});
// Discard button should reset and close form
const discardBtn = document.getElementById("discardBtn");

discardBtn.addEventListener("click", () => {
  newOrderForm.reset();
  modal.style.display = "none";
});

// Data Display
// --- Variables for pagination ---
let ordersData = []; // All fetched data
let currentPage = 1;
const rowsPerPage = 10; // ⬅️ 10 rows per page

// DOM elements
const tableBody = document.querySelector('#inventory-table tbody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// --- Fetch orders ---
async function fetchOrders() {
  try {
    const response = await fetch(`http://localhost:5000/api/orders`);
    const data = await response.json();
    console.log("Fetched data:", data);
    ordersData = data; // Save all data globally
    renderTable(); // ⬅️ Call without passing data
    updatePaginationButtons();
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}

// --- Render table based on page ---
function renderTable() {
  tableBody.innerHTML = ''; // Clear old rows

  if (!ordersData || ordersData.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='7'>No data available</td></tr>";
    return;
  }

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageItems = ordersData.slice(startIndex, endIndex); // ⬅️ Only rows for current page

  pageItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.order_id}</td>
      <td>${item.supplier_name}</td>
      <td>${item.category_name}</td>
      <td>${item.inventory_item_name}</td>
      <td>${item.quantity}</td>
      <td>${item.unit}</td>
      <td>${new Date(item.timestamp).toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

// --- Update Prev/Next button states ---
function updatePaginationButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage >= Math.ceil(ordersData.length / rowsPerPage);
}

// --- Pagination controls ---
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
    updatePaginationButtons();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < Math.ceil(ordersData.length / rowsPerPage)) {
    currentPage++;
    renderTable();
    updatePaginationButtons();
  }
});

// --- Initial fetch ---
fetchOrders();

