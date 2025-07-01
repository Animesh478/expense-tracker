const form = document.querySelector("form");
const inputExpense = document.getElementById("amount");
const inputDescription = document.getElementById("description");
const inputCategory = document.getElementById("category");
const expenseList = document.querySelector("ul");

function display() {
  const expensesFromStorage = getExpensesFromStorage();

  expensesFromStorage.forEach((expenseDetails) => {
    addExpenseToDOM(
      expenseDetails.expense,
      expenseDetails.description,
      expenseDetails.category
    );
  });
}

function onAddExpense(e) {
  e.preventDefault();

  const expense = inputExpense.value;
  const description = inputDescription.value;
  const category = inputCategory.value;

  // adding the expense to DOM
  addExpenseToDOM(expense, description, category);

  // adding the expense to local storage
  addExpenseToStorage(expense, description, category);

  // resetting the input fields
  inputExpense.value = "";
  inputDescription.value = "";
  inputCategory.value = "";
}

function addExpenseToDOM(expense, description, category) {
  const li = document.createElement("li");
  li.textContent = `${expense} - ${category} - ${description}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Expense";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Expense";

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  expenseList.appendChild(li);
}

function addExpenseToStorage(expense, description, category) {
  let expensesFromStorage = getExpensesFromStorage();

  const obj = {
    expense,
    description,
    category,
  };

  expensesFromStorage.push(obj);

  localStorage.setItem("expenses", JSON.stringify(expensesFromStorage));
}

function getExpensesFromStorage() {
  let expensesFromStorage;

  if (localStorage.getItem("expenses") === null) {
    expensesFromStorage = [];
  } else {
    expensesFromStorage = JSON.parse(localStorage.getItem("expenses"));
  }

  return expensesFromStorage;
}

// Event listeners
form.addEventListener("submit", onAddExpense);

display();
