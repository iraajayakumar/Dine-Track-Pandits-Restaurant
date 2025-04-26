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

// Data Display and Category Controls
let currentCategory = "Chaat Waat"; // default category
const tableBody = document.querySelector('#inventory-table tbody');
const navItems = document.querySelectorAll('.inventory-nav-item');
const tableHeader = document.querySelector('.inventory-management-header h2'); // updated selector

async function fetchMenu() {
  try {
    const response = await fetch(`http://localhost:5000/api/managemenu?category=${encodeURIComponent(currentCategory)}`);
    const data = await response.json();
    console.log("Fetched data:", data);
    renderTable(data);
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
}

function renderTable(items) {
  if (!items || items.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='2'>No data available</td></tr>";
    return;
  }

  tableBody.innerHTML = ''; // Clear old rows
  items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Handle Navbar clicks
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const selectedCategory = item.textContent.trim();

    if (selectedCategory === currentCategory) return; // Do nothing if same

    // Update active class
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    // Update category and heading
    currentCategory = selectedCategory;
    tableHeader.textContent = selectedCategory;

    // Fetch new menu
    fetchMenu();
  });
});

// No pagination for now (optional later)

// Initial fetch
fetchMenu();
