
// Get buttons
const incomeButton = document.getElementById('income-button');
const expenseButton = document.getElementById('expense-button');

// Get sections
const incomeSection = document.getElementById('income');
const expenseSection = document.getElementById('expense');

// Add event listeners for buttons
incomeButton.addEventListener('click', () => { 
    incomeSection.scrollIntoView({ behavior: 'smooth' });
});

expenseButton.addEventListener('click', () => {
    expenseSection.scrollIntoView({ behavior: 'smooth' });
});

// Variables to store the total income, expense, and transactions
let totalIncome = 0;
let totalExpense = 0;
let transactions = [];

// Get elements for income, expense, and summary sections
const totalIncomeElement = document.getElementById('total-income');
const totalExpenseElement = document.getElementById('total-expense');
const netIncomeElement = document.getElementById('net-income');
const transactionListElement = document.getElementById('transaction-list');

// Income form submission
document.getElementById('income-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const date = document.getElementById('income-date').value;
  const description = document.getElementById('income-description').value;
  const category = document.getElementById('income-category').value;
  const amount = parseFloat(document.getElementById('income-amount').value);
  
  if (date && description && category && !isNaN(amount) && amount > 0) {
    // Add income to total income
    totalIncome += amount;
    updateIncomeSection();
    
    // Add transaction
    addTransaction('Income', date, description, category, amount);
  }
});

// Expense form submission
document.getElementById('expense-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const date = document.getElementById('expense-date').value;
  const description = document.getElementById('expense-description').value;
  const category = document.getElementById('expense-category').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);
  
  if (date && description && category && !isNaN(amount) && amount > 0) {
    // Add expense to total expense
    totalExpense += amount;
    updateExpenseSection();
    
    // Add transaction
    addTransaction('Expense', date, description, category, amount);
  }
});

// Function to update the income section
function updateIncomeSection() {
  totalIncomeElement.textContent = totalIncome.toFixed(2);
  updateSummary();
}

// Function to update the expense section
function updateExpenseSection() {
  totalExpenseElement.textContent = totalExpense.toFixed(2);
  updateSummary();
}

// Function to update the summary section
function updateSummary() {
  const netIncome = totalIncome - totalExpense;
  netIncomeElement.textContent = netIncome.toFixed(2);
}

// Function to add a transaction to the transaction list
function addTransaction(type, date, description, category, amount) {
  // Create a transaction object
  const transaction = {
    type,
    date,
    description,
    category,
    amount
  };
  
  // Add transaction to the list
  transactions.push(transaction);
  displayTransactions();
}

// Function to display the transactions in the summary section
function displayTransactions() {
  transactionListElement.innerHTML = ''; // Clear previous list
  
  transactions.forEach((transaction) => {
    const listItem = document.createElement('li');
    listItem.classList.add('transaction-item');
    
    listItem.innerHTML = `
      <span>${transaction.date}</span>
      <span>${transaction.description}</span>
      <span>${transaction.category}</span>
      <span>${transaction.type === 'Income' ? '+' : '-'} ₹${transaction.amount.toFixed(2)}</span>
    `;
    
    transactionListElement.appendChild(listItem);
  });
}

// Example charts using Chart.js (if required for further customization)
const incomeData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Income',
        data: [1200, 1500, 1300, 1600, 1800, 2000], // Example data
        borderColor: '#d81b60',
        fill: false,
        tension: 0.1
    }]
  };

  const expenseData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Expenses',
        data: [800, 900, 700, 950, 1200, 1000], // Example data
        borderColor: '#415f9d',
        fill: false,
        tension: 0.1
    }]
  };

  // Configuration for Income Chart
const incomeConfig = {
    type: 'line',
    data: incomeData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Income Over Time'
            }
        }
    },
  };
  
  // Configuration for Expense Chart
  const expenseConfig = {
    type: 'line',
    data: expenseData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expenses Over Time'
            }
        }
    },
  };
  
  // Create charts
  const incomeChart = new Chart(
    document.getElementById('incomeChart'),
    incomeConfig
  );
  
  const expenseChart = new Chart(
    document.getElementById('expenseChart'),
    expenseConfig
  );
  
