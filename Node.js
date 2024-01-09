// Fetch and display expenses
fetch('/expenses')
    .then(response => response.json())
    .then(data => {
        const expenseList = document.getElementById('expenseList');
        data.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expense.description}: $${expense.amount}`;
            expenseList.appendChild(listItem);
        });
    });
