const API_URL = "https://jsonplaceholder.typicode.com/users";

const userListEl = document.getElementById("userList");
const statusEl = document.getElementById("status");
const reloadBtn = document.getElementById("reloadBtn");

// Fetch and render users
async function fetchUsers() {
  // reset UI
  userListEl.innerHTML = "";
  statusEl.textContent = "Loading users...";
  statusEl.classList.remove("status-error");
  statusEl.classList.add("status-loading");

  try {
    const response = await fetch(API_URL);

    // handle HTTP errors
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const users = await response.json();

    // no users edge case (API should always return some, but good practice)
    if (!Array.isArray(users) || users.length === 0) {
      statusEl.textContent = "No users found.";
      statusEl.classList.remove("status-loading");
      return;
    }

    // render cards
    users.forEach(user => {
      const card = document.createElement("article");
      card.className = "user-card";

      const nameEl = document.createElement("h2");
      nameEl.className = "user-name";
      nameEl.textContent = user.name;

      const emailEl = document.createElement("div");
      emailEl.className = "user-email";
      emailEl.innerHTML = `Email: <a href="mailto:${user.email}">${user.email}</a>`;

      const addr = user.address;
      const addressText = `${addr.street}, ${addr.suite}, ${addr.city}, ${addr.zipcode}`;

      const addressEl = document.createElement("p");
      addressEl.className = "user-address";
      addressEl.textContent = `Address: ${addressText}`;

      card.appendChild(nameEl);
      card.appendChild(emailEl);
      card.appendChild(addressEl);

      userListEl.appendChild(card);
    });

    statusEl.textContent = `Loaded ${users.length} users.`;
    statusEl.classList.remove("status-loading");
  } catch (error) {
    console.error("Error fetching users:", error);
    statusEl.textContent =
      "Failed to load users. Check your internet or try again.";
    statusEl.classList.remove("status-loading");
    statusEl.classList.add("status-error");
  }
}

// Reload button handler
reloadBtn.addEventListener("click", () => {
  fetchUsers();
});

// Optionally load on page load
fetchUsers();
