// main.js
const API_URL = 'http://127.0.0.1:5000';

// Fetch the list of engines from the API and add them to the table
async function fetchEngines() {
  const response = await fetch(`${API_URL}/engines`);
  const engines = await response.json();
  const table = document.querySelector('#engine-table');

  // Loop over the engines and create a table with 3 data points for each engine
  for (const engine of engines) {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = engine.id;
    row.appendChild(idCell);
    const nameCell = document.createElement('td');
    nameCell.textContent = engine.name;
    row.appendChild(nameCell);
    const manufactureDateCell = document.createElement('td');
    // Manufacture Date input field and listener to updateEngine()
    const manufactureDateInput = document.createElement('input');
    manufactureDateInput.type = 'text';
    manufactureDateInput.value = engine.manufacture_date;
    manufactureDateInput.addEventListener('change', () => {
      updateEngine(engine.id, manufactureDateInput.value);
    });
    
    manufactureDateCell.appendChild(manufactureDateInput);
    row.appendChild(manufactureDateCell);
    row.addEventListener('click', event => {
      // Remove the "selected" class from all rows
      const rows = table.querySelectorAll('tr');
      for (const row of rows) {
        row.classList.remove('selected');
      }
      // Add the "selected" class to the clicked row
      row.classList.add('selected');
    });
    table.appendChild(row);
  }
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
  } else {
    alert('Error updating engine');
  }
}


fetchEngines();
