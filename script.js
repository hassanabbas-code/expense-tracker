const expenseForm = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function displayExpenses() {
    expenseList.innerHTML = "";

    let totalExpenses = 0;

    expenses.forEach(function (expense, index) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        expenseList.appendChild(row);

        totalExpenses += expense.amount;

        const deleteButton = row.querySelector(".delete-btn");

        deleteButton.addEventListener("click", function () {
            expenses.splice(index, 1);
            saveExpenses();
            displayExpenses();
        });
    });

    totalElement.textContent = totalExpenses.toFixed(2);
}

expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = titleInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (title.trim() === "" || amount <= 0 || date === "") {
        alert("Please enter a valid title, amount, and date.");
        return;
    }

    const expense = {
        title: title,
        amount: amount,
        date: date
    };

    expenses.push(expense);

    saveExpenses();
    displayExpenses();

    expenseForm.reset();
});

displayExpenses();