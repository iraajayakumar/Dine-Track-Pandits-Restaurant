// Data Display and Pagination Controls
let currentCategory = "Vegetables"; // default category
let page = 1;
const limit = 10; // Adjust as per your backend
const tableBody = document.querySelector('#inventory-table tbody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function fetchInventory() {
  fetch(`http://localhost:5000/api/inventory?page=${page}&limit=${limit}&category=${encodeURIComponent(currentCategory)}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      renderTable(data);
      prevBtn.disabled = page === 1;
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
      <td>${item.name || 'N/A'}</td>
      <td>${item.stock_quantity || '0'}</td>
      <td>${item.price_per_unit || '0.00'}</td>
      <td>${item.unit || 'N/A'}</td>
      <td>${item.reorder_level || '0'}</td>
      <td>${item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : 'N/A'}</td>
    `;
    tableBody.appendChild(row);
  });
}

const navItems = document.querySelectorAll('.inventory-nav-item');
const tableHeader = document.getElementById('category-heading');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const selectedCategory = item.textContent.trim();

    if (selectedCategory === currentCategory) return; // Do nothing if same

    // Update active class
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    // Set category and reset page
    currentCategory = selectedCategory;
    page = 1;

    // Update table heading
    tableHeader.textContent = selectedCategory;

    // Fetch new data
    fetchInventory();
  });
});

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
