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
const newSaleForm = document.getElementById('newSaleForm');

newSaleForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent default form action (page reload)

  const formData = new FormData(newSaleForm); // collect all form data including image

  try {
    const response = await fetch('http://localhost:5000/api/sales', {  // <-- Updated endpoint
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('✅ Sale added successfully!');
      modal.style.display = "none"; // close modal on success
      newSaleForm.reset(); // clear form

      fetchOrders(); // ⬅️ Refresh the table after adding a sale
    } else {
      const errorData = await response.json();
      alert('❌ Failed to add sale: ' + errorData.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Error adding sale.');
  }
});
// Discard button should reset and close form
const discardBtn = document.getElementById("discardBtn");

discardBtn.addEventListener("click", () => {
  newSaleForm.reset();
  modal.style.display = "none";
});


// Data Display
// --- Variables for pagination ---
let salesData = []; // All fetched data
let currentPage = 1;
const rowsPerPage = 10; // ⬅️ 10 rows per page

// DOM elements
const tableBody = document.querySelector('#inventory-table tbody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// --- Fetch orders ---
async function fetchOrders() {
  try {
    const response = await fetch(`http://localhost:5000/api/sales`); // <-- Updated endpoint
    const data = await response.json();
    console.log("Fetched data:", data);
    salesData = data; // Save all data globally
    renderTable(); // ⬅️ Call without passing data
    updatePaginationButtons();
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}

// --- Render table based on page ---
function renderTable() {
  tableBody.innerHTML = ''; // Clear old rows

  if (!salesData || salesData.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='7'>No data available</td></tr>";
    return;
  }

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageItems = salesData.slice(startIndex, endIndex); // ⬅️ Only rows for current page

  pageItems.forEach(item => {
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

// --- Update Prev/Next button states ---
function updatePaginationButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage >= Math.ceil(salesData.length / rowsPerPage);
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
  if (currentPage < Math.ceil(salesData.length / rowsPerPage)) {
    currentPage++;
    renderTable();
    updatePaginationButtons();
  }
});

// --- Initial fetch ---
fetchOrders();