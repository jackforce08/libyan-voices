// Signup
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      if (!username || !password) return;

      localStorage.setItem("lv_user", JSON.stringify({ username, password }));
      alert("Account created! You can now log in.");
      window.location.href = "login.html";
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;
      const storedUser = JSON.parse(localStorage.getItem("lv_user"));

      if (storedUser && username === storedUser.username && password === storedUser.password) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username", username);
        window.location.href = "forum.html";
      } else {
        alert("Invalid username or password");
      }
    });
  }
});

