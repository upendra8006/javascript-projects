// selectors
let inputDate = document.querySelector("#input-date");
let inputNumber = document.querySelector("#input-number");
let inputText = document.querySelector("#input-text");
let AddBtn = document.querySelector("button");
let createList = document.querySelector("#transactionList");
const msg = document.getElementById("msg");

// array (load from localStorage first)
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// helper function
function saveToLocal() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// render function
function renderTransaction() {
  createList.innerHTML = "";

  transactions.forEach(c => {
    let li = document.createElement("li");
    li.textContent = `Date: ${c.date} | Description: ${c.description} | Amount: ${c.amount}`;

    // delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    createList.appendChild(li);

    // delete functionality
    deleteBtn.addEventListener("click", () => {
      transactions = transactions.filter(item => item.id !== c.id);
      saveToLocal();
      renderTransaction();
    });

    // edit functionality
    editBtn.addEventListener("click", () => {
      const newDesc = prompt("Update description:", c.description);
      if (newDesc === null) return;

      const newAmtStr = prompt("Update amount:", c.amount);
      if (newAmtStr === null) return;

      const newDate = prompt("Update date (YYYY-MM-DD):", c.date);
      if (newDate === null) return;

      const newAmt = Number(newAmtStr);
      if (isNaN(newAmt)) {
        alert("Amount invalid — number डालो।");
        return;
      }

      c.description = newDesc.trim();
      c.amount = newAmt;
      c.date = newDate;

      saveToLocal();
      renderTransaction();
    });
  });
}

// event listener for adding
AddBtn.addEventListener("click", function () {
  if (inputDate.value === "" || inputNumber.value === "" || inputText.value === "") {
    msg.textContent = "❌ Please fill all fields!";
    msg.style.color = "red";
  } else {
    let transaction = {
      id: Date.now(),
      date: inputDate.value,
      description: inputText.value,
      amount: Number(inputNumber.value),
    };

    transactions.push(transaction);
    saveToLocal();
    renderTransaction();

    inputDate.value = "";
    inputText.value = "";
    inputNumber.value = "";
    msg.textContent = ""; // clear message
  }
});

// app load पर पहले से saved data दिखाओ
renderTransaction();
