// Sample data (items object)
const dateOptions = {
  weekday: "long", // Full day name (Giovedì)
  year: "numeric", // Full year (2024)
  month: "long", // Full month name (settembre)
  day: "numeric", // Day of the month (15)
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // 24-hour format
};

function formatDate(date) {
  const formattedDate = date.toLocaleDateString("it-IT", dateOptions);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

let selectedItem = null;

let items = {
  id1: {
    name: "Event 1",
    desc: "Event 1 description",
    img: "img_1.jpg",
    date: new Date("2024-10-27T14:30:00"),
    type: 1, // availableTypes[type]
    availableTypes: [
      { desc: "Posto 1 evento 1", price: 10 },
      { desc: "Posto 2 evento 1", price: 20 },
      { desc: "Posto 3 evento 1", price: 30 },
    ],
    quantity: 2,
    price: function () {
      return this.availableTypes[this.type].price;
    },
    typeDesc: function () {
      return this.availableTypes[this.type].desc;
    },
  },
  id2: {
    name: "Event 2",
    desc: "Event 2 description",
    img: "img_2.jpg",
    date: new Date("2025-01-07T19:30:00"),
    type: 1, // availableTypes[type]
    availableTypes: [
      { desc: "Posto 1 evento 2", price: 10 },
      { desc: "Posto 2 evento 2", price: 20 },
      { desc: "Posto 3 evento 2", price: 30 },
    ],
    quantity: 3,
    price: function () {
      return this.availableTypes[this.type].price;
    },
    typeDesc: function () {
      return this.availableTypes[this.type].desc;
    },
  },
};

// Function to render empty ticket list
function renderEmptyTicketList() {
  const ticketsContainer = document.getElementById("tickets");
  ticketsContainer.innerHTML = ""; // Clear the existing content
  const noTikets = /*html*/ `
<div
  class="d-flex flex-row align-items-center justify-content-center mb-3 bg-light p-3 hover-effect"
  style="
    border-radius: 15px;
    height: 200px;
    position: relative;
    text-align: center;
    gap: 10px;
  "
>
  <!-- Triangle with exclamation mark -->
  <div style="font-size: 40px; position: relative">&#x26A0;</div>
  <div class="d-flex flex-column">
    <div style="font-size: 18px; margin: 10px 0">Your cart is empty!</div>
    <a href="/homepage" class="link-opacity-100">Go Shopping</a>
  </div>
</div>
`;
  ticketsContainer.insertAdjacentHTML("beforeend", noTikets);
}
// Function to render each ticket card
function renderTickets(items) {
  if (Object.keys(items).length == 0) {
    renderEmptyTicketList();
    return;
  }
  const ticketsContainer = document.getElementById("tickets");
  ticketsContainer.innerHTML = ""; // Clear the existing content
  // Iterate over each item in the items object

  for (const id in items) {
    if (items.hasOwnProperty(id)) {
      const item = items[id];

      // Create the HTML structure for the card item
      const ticketHtml = /*_html*/ `
<option>
  <div
    id="${id}"
    class="d-flex mb-3 justify-content-between flex-wrap bg-light p-3 hover-effect ticket-list-entry"
    style="row-gap: 20px; border-radius: 15px"
  >
    <!-- First column: event image, name, description -->
    <div class="d-flex">
      <div
        class="card shadow"
        style="
          background-color: black;
          overflow: hidden;
          border-radius: 10% 35%;
          margin-right: 10px;
          height: 100%;
        "
      >
        <img
          src="/resources/${item.img}"
          alt="Ticket Image"
          style="object-fit: cover; height: 50px"
        />
      </div>
      <div class="d-flex flex-column">
        <h6 class="mb-0 ticket-name">${item.name}</h6>
        <small class="text-muted"
          >€ <span class="ticket-price">${item.price()}</span></small
        >
        <small class="text-muted ticket-type">${item.typeDesc()}</small>
      </div>
    </div>
    <!-- Second column: quantity input and delete button -->
    <div class="d-flex align-items-center">
      <div class="text-right mx-2" style="text-align: right; flex-shrink: 0">
        <span>€ </span>
        <span class="ticket-total-price">${item.price() * item.quantity} </span>
      </div>
      <input
        type="number"
        class="form-control me-2 ticket-quantity"
        min="1"
        max="99"
        data-id="${id}"
        value="${item.quantity}"
        style="width: 100px"
      />
      <button class="btn btn-sm btn-outline-danger ticket-remove-ticket">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</option>
        `;

      // Insert the HTML into the tickets container
      ticketsContainer.insertAdjacentHTML("beforeend", ticketHtml);
    }
  }
}

function toggleTicketDetails(open) {
  const left = document.getElementById("leftCol");
  const right = document.getElementById("rightCol");
  if (open === true) {
    left.className = "col-md-6";
    right.className = "col-md-6";
  } else if (open === false) {
    left.className = "col-md-10 mx-auto";
    right.className = "col-md-6 d-none";
  }
}

// Update ui function
function updateTicketUI(ticketId) {
  const ticketElement = document.getElementById(ticketId);

  //Quantity
  const quantityElement = ticketElement.querySelector(".ticket-quantity");
  const ticketTotalPriceElement = ticketElement.querySelector(
    ".ticket-total-price",
  );

  const updatedPrice = items[ticketId].price() * items[ticketId].quantity;
  ticketTotalPriceElement.textContent = updatedPrice;
  quantityElement.value = items[ticketId].quantity;

  // Summary price
  const summaryPrice = document.getElementById("total-price");
  let newTotalPrice = 0;
  Object.keys(items).map((key) => {
    if (items.hasOwnProperty(key)) {
      newTotalPrice += items[key].price() * items[key].quantity;
    }
  });
  summaryPrice.innerHTML = newTotalPrice;

  // Type
  const typeElement = ticketElement.querySelector(".ticket-type");
  console.log(items[ticketId].typeDesc());
  typeElement.innerHTML = items[ticketId].typeDesc();

  const priceElement = ticketElement.querySelector(".ticket-price");
  priceElement.innerHTML = items[ticketId].price();
}

function updateTicketListUI() {
  if (Object.keys(items).length == 0) {
    renderEmptyTicketList();
    toggleTicketDetails(false);
    return;
  }
  Object.keys(items).map((key) => {
    if (items.hasOwnProperty(key)) updateTicketUI(key);
  });

  // Clear deleted items
  const entries = document.querySelectorAll(".ticket-list-entry");
  console.log(entries);
  entries.forEach((entry) => {
    if (!items[entry.id]) entry.remove();
  });
}

function updateCardUI() {
  if (!items[selectedItem]) return;

  let options = "";
  items[selectedItem].availableTypes.map((item, index) => {
    options =
      options +
      `<option value="${index}">${item.desc} - €${item.price}</option>\n`;
  });

  document.getElementById("card-name").innerHTML = items[selectedItem].name;
  document.getElementById("card-desc").innerHTML = items[selectedItem].desc;
  document.getElementById("card-date").innerHTML = formatDate(
    items[selectedItem].date,
  );
  document.getElementById("card-type").innerHTML = options;
  document.getElementById("card-type").value = items[selectedItem].type;
  document.getElementById("card-quantity").value = items[selectedItem].quantity;

  // console.log(document.getElementById("card-quantity").value)
}

function updateUI(options) {
  if (!options) {
    // update everything
    return;
  }
  if (options.card === true) {
    updateCardUI();
  }
  if (options.ticketId) {
    updateTicketUI(options.ticketId);
  } else if (options.ticketList === true) {
    updateTicketListUI();
  }
}

function setupListeners() {
  // Ticket body clicked
  const ticketBodies = document.querySelectorAll(".ticket-list-entry");
  ticketBodies?.forEach((ticket) => {
    ticket.addEventListener("click", function (event) {
      if (
        event.target.classList.contains("ticket-quantity") ||
        event.target.classList.contains("btn") ||
        event.target.classList.contains("bi-trash")
      )
        return;
      if (selectedItem != null) {
        const prevSelected = document.getElementById(selectedItem);
        prevSelected.classList.remove("selected-item");
      }

      // select current
      const element = document.getElementById(ticket.id);
      element.classList.add("selected-item");

      if (selectedItem == null) toggleTicketDetails(true);

      selectedItem = ticket.id;
      updateUI({ card: true });
    });
  });

  // Ticket quantity changed
  const quantityInputs = document.querySelectorAll(".ticket-quantity");
  quantityInputs?.forEach((input) => {
    input.addEventListener("change", function () {
      const ticketId = this.getAttribute("data-id");
      const newQuantity = parseInt(this.value, 10);

      if (!isNaN(newQuantity) && newQuantity > 0) {
        items[ticketId].quantity = newQuantity;
        updateUI({ card: true, ticketList: true });
      }
    });
  });

  // Ticket removed
  const ticketEntries = document.querySelectorAll(".ticket-list-entry");
  ticketEntries?.forEach((entry) => {
    const removeButton = entry.querySelector(".ticket-remove-ticket");
    removeButton.addEventListener("click", function (event) {
      event.preventDefault();
      const id = entry.id;
      delete items[id];
      if (entry.id === selectedItem) {
        selectedItem = null;
        toggleTicketDetails(false);
      }
      updateUI({ ticketList: true });
    });
  });

  // Card quantity changed
  document
    .getElementById("card-quantity")
    .addEventListener("change", function () {
      const newQuantity = parseInt(this.value, 10);
      if (!isNaN(newQuantity) && newQuantity > 0) {
        items[selectedItem].quantity = newQuantity;
        updateUI({ ticketList: true, card: true });
      }
    });

  // Card ticket type changed
  document.getElementById("card-type").addEventListener("change", function () {
    items[selectedItem].type = parseInt(this.value, 10);

    updateUI({ ticketId: selectedItem });
  });
}

renderTickets(items);
setupListeners();
