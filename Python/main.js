// main.js
const API_URL = 'http://127.0.0.1:5000';

// Fetch the list of engines from the API and add them to the table
async function fetchEngines() {
  const response = await fetch(`${API_URL}/engines`);
  const engines = await response.json();
  const table = document.querySelector('#engine-table');
  for (const engine of engines) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${engine.id}</td>
      <td>${engine.name}</td>
      <td>${engine.manufacture_date}</td>
    `;
    row.addEventListener('click', event => {
      // Remove the "selected" class from all rows
      const rows = table.querySelectorAll('tr');
      for (const row of rows) {
        row.classList.remove('selected');
      }
      // Add the "selected" class to the clicked row
      row.classList.add('selected');
      showUpdateForm(engine.id);
    });
    table.appendChild(row);
  }
}

// Display the form to update the manufacture date of an engine
function showUpdateForm(id) {
  const form = document.querySelector('#engine-form');
  form.style.display = 'block';
  form.addEventListener('submit', event => {
    event.preventDefault();
    const manufactureDate = document.querySelector('#manufacture-date-input').value;
    updateEngine(id, manufactureDate);
  });
  const cancelButton = document.querySelector('#cancel-button');
  cancelButton.addEventListener('click', event => {
    form.style.display = 'none';
  });
}


// Update the manufacture date of an engine using the API
async function updateEngine(id, manufactureDate) {
  const response = await fetch(`${API_URL}/engines/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ manufacture_date: manufactureDate }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    // Update the manufacture date in the table
    const table = document.querySelector('#engine-table');
    const rows = table.querySelectorAll('tr');
    for (const row of rows) {
      const cells = row.querySelectorAll('td');
      if (cells[0].textContent === id) {
        cells[2].textContent = manufactureDate;
      }
    }
    // Hide the form
    const form = document.querySelector('#engine-form');
    form.style.display = 'none';
    // Refresh the list of engines
    fetchEngines();
    showUpdateForm(id)
  } else {
    alert('Error updating engine');
  }
}



fetchEngines();
