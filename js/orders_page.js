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
const tableBody = document.querySelector('#inventory-table tbody');

async function fetchOrders() {
  try {
    const response = await fetch(`http://localhost:5000/api/orders`); // No category anymore
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

// Initial fetch
fetchOrders();
