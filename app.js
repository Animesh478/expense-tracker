const form = document.querySelector("form");
const inputExpense = document.getElementById("amount");
const inputDescription = document.getElementById("description");
const inputCategory = document.getElementById("category");
const expenseList = document.querySelector("ul");

let isEditMode = false;

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

// Add expense functionality

function onAddExpense(e) {
  e.preventDefault();

  const expense = inputExpense.value;
  const description = inputDescription.value;
  const category = inputCategory.value;

  // check for edit mode
  if (isEditMode) {
    const editedExpense = document.querySelector(".edit-mode");

    let expensesFromStorage = getExpensesFromStorage();
    expensesFromStorage = expensesFromStorage.filter((expenseDetails) => {
      return !editedExpense.textContent.includes(expenseDetails.description);
    });

    // removing the expense from storage
    localStorage.setItem("expenses", JSON.stringify(expensesFromStorage));

    editedExpense.classList.remove("edit-mode");
    editedExpense.remove(); // remove it from DOM
    isEditMode = false;
  }

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
  deleteBtn.className = "delete-btn";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Expense";
  editBtn.className = "edit-btn";

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

// Delete Expense Functionality

function onDeleteExpense(e) {
  removeExpenseFromDOM(e);
  removeExpenseFromStorage(e);
}

function removeExpenseFromDOM(e) {
  const expenseToDelete = e.target.parentElement;
  expenseToDelete.remove();
}

function removeExpenseFromStorage(e) {
  let expensesFromStorage = getExpensesFromStorage();

  expensesFromStorage = expensesFromStorage.filter((expense) => {
    return !e.target.parentElement.textContent.includes(expense.description);
  });

  localStorage.setItem("expenses", JSON.stringify(expensesFromStorage));
}

// Edit expense functionality

function onEditExpense(e) {
  isEditMode = true;
  let expensesFromStorage = getExpensesFromStorage();

  expensesFromStorage.forEach((expenseDetails) => {
    if (
      e.target.parentElement.textContent.includes(expenseDetails.description)
    ) {
      e.target.parentElement.classList.add("edit-mode");
      inputExpense.value = expenseDetails.expense;
      inputCategory.value = expenseDetails.category;
      inputDescription.value = expenseDetails.description;
    }
  });
}

// Retrieving from local Storage

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

expenseList.addEventListener("click", (e) => {
  if (e.target.className === "delete-btn") {
    onDeleteExpense(e);
  } else if (e.target.className === "edit-btn") {
    onEditExpense(e);
  }
});

display();
