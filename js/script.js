// Add Button Model Popup
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

// Data Display and Pagination Controls

let page = 1;
const limit = 10; // Adjust as per your backend
const tableBody = document.querySelector('#inventory-table tbody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function fetchInventory() {
  fetch(`http://localhost:5000/api/inventory?page=${page}&limit=${limit}`)

    .then(res => res.json())
    .then(data => {
      console.log(data); // Debug the data here
      renderTable(data); // Pass the data directly to renderTable
      prevBtn.disabled = offset === 0;
      nextBtn.disabled = data.length < limit;
    })
    .catch(error => console.error('Error:', error));
}


function renderTable(items) {
  if (!items || items.length === 0) {
    console.log("No data available");
    tableBody.innerHTML = "<tr><td colspan='6'>No data available</td></tr>"; // Message when no data is available
    return;
  }

  tableBody.innerHTML = ''; // Clear old rows
  items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.item_name || 'N/A'}</td>
      <td>${item.stock_quantity || '0'}</td>
      <td>${item.price_per_unit || '0.00'}</td>
      <td>${item.unit || 'N/A'}</td>
      <td>${item.reorder_level || '0'}</td>
      <td>${item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : 'N/A'}</td>
    `;
    tableBody.appendChild(row);
  });
}




prevBtn.addEventListener('click', () => {
  if (page > 1) {
    page--;
    fetchInventory();
  }
});

nextBtn.addEventListener('click', () => {
  page++;
  fetchInventory();
});

// Initial fetch
fetchInventory();
