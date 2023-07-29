// Function LOGIN
function login() {
  // This will get email and password input from user
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Regular expression to check for a valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // This to check email and passowrd corect or no
  if (!emailRegex.test(email)) {
    document.getElementById("email-error").textContent = "Email is not valid.";
  } else {
    document.getElementById("email-error").textContent = "";
  }
  
  if (password.length < 6) {
    document.getElementById("password-error").textContent =
      "Password length must be at least 6 characters.";
  } else {
    document.getElementById("password-error").textContent = "";
  }
  
  // If email and password  invalid, this result will show alert together
  if (!emailRegex.test(email) && password.length < 6) {
    document.getElementById("email-error").textContent = "Email is not valid.";
    document.getElementById("password-error").textContent =
      "Password length must be at least 6 characters.";
  }
  
  // If both email and password are valid, authenticate the user
  if (emailRegex.test(email) && password.length >= 6) {
    authenticateUser(email, password);
  }
  
}

// Function to authenticate user using the API
function authenticateUser(email, password) {
  // This API endpoint for authentication
  const apiUrl = "https://interview-api.pilihjurusan.id/users/authenticate";

  // API request data
  const requestData = {
    email: email,
    password: password,
  };

  // Make the API request
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CF-Access-Client-Id": "8853ca70ca342d5659242857edb234de.access",
      "CF-Access-Client-Secret":
        "eec6df88a2637183a3df2171f944a2b58eed7ed645eb368edb51437ee8cdd777",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid credentials"); // Handle invalid credentials error
      }
      return response.json();
    })
    .then((data) => {
      // If successful, you will receive the token in data.token
      const token = data.token;
      // You can use the token for further authenticated requests or redirect to another page
      console.log("Token:", token);
      // To redirecting to another page
      displayDashboard(email);
    })
    .catch((error) => {
      // This handle error
      console.error("Error:", error);
      displayErrorMessage("Invalid credentials");
    });
    //When error will show pop up invalid credential 3s
    function displayErrorMessage(message) {
      const invalidCredentialError = document.createElement("div");
      invalidCredentialError.textContent = "Invalid credentials";
      invalidCredentialError.style.color = "red";
      invalidCredentialError.style.position = "fixed";
      invalidCredentialError.style.top = "50px";
      invalidCredentialError.style.right = "50px";
      document.body.appendChild(invalidCredentialError);
    
      setTimeout(() => {
        invalidCredentialError.remove();
      }, 3000);
    
      console.error("Error:", error);
    }
}
//food data 
const foodData = [
  {
    id: 1,
    name: 'Rendang',
    price: 23000,
    description: 'Lorem ipsum dolor amet.',
    links: {
      self: 'https://interview-api.pilihjurusan.id/foods/1',
    },
  },
  {
    id: 2,
    name: 'Ayam Goreng',
    price: 15000,
    description: 'Lorem ipsum dolor amet.',
    links: {
      self: 'https://interview-api.pilihjurusan.id/foods/2',
    },
  },
];

// Function to display the dashboard content
function displayDashboard(email) {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <div class="container-dash">
      <h1>DASHBOARD<h1>
      <h2>Selamat datang ${email}</h2>
      <p>Daftar Makanan:</p>
      <div class="food-list">
        <ul>
          ${getFoodList()}
        </ul>
        <button class="button-logout" onclick="logout()">Keluar</button>
      </div>
    </div>
  `;
}

function getFoodList() {
  // When we have the ID of the food want to display
  const desiredFoodIds = [1, 2]; // ID
  
  const foodListItems = foodData
    .filter((food) => desiredFoodIds.includes(food.id))
    .map((food) => `<li>${food.name} [${food.price}]</li>`)
    .join("");

  return foodListItems;
}

// Function to log out the user and redirect to the login page again
function logout() {
  sessionStorage.removeItem('sessionToken');

  
  window.location.href = 'index.html';
}




