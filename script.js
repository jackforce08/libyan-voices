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
// Forum page logic
document.addEventListener("DOMContentLoaded", () => {
  const welcomeMsg = document.getElementById("welcomeMsg");
  const logoutBtn = document.getElementById("logoutBtn");

  if (welcomeMsg && logoutBtn) {
    const loggedIn = sessionStorage.getItem("loggedIn");
    const username = sessionStorage.getItem("username");

    if (!loggedIn || !username) {
      alert("Please log in first.");
      window.location.href = "login.html";
      return;
    }

    welcomeMsg.textContent = `Welcome, ${username}!`;

    logoutBtn.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = "login.html";
    });
  }
});
// Forum post handling
document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("postForm");
  const postTitle = document.getElementById("postTitle");
  const postMessage = document.getElementById("postMessage");
  const postsContainer = document.getElementById("postsContainer");

  // Load existing posts
  if (postsContainer) {
    const posts = JSON.parse(localStorage.getItem("lv_posts")) || [];
    displayPosts(posts);
  }

  // Handle new post
  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = postTitle.value.trim();
      const message = postMessage.value.trim();
      const username = sessionStorage.getItem("username");

      if (!title || !message) return;

      const newPost = {
        title,
        message,
        username,
        time: new Date().toLocaleString(),
      };

      const posts = JSON.parse(localStorage.getItem("lv_posts")) || [];
      posts.unshift(newPost);
      localStorage.setItem("lv_posts", JSON.stringify(posts));

      postTitle.value = "";
      postMessage.value = "";
      displayPosts(posts);
    });
  }

  function displayPosts(posts) {
    postsContainer.innerHTML = "";
    posts.forEach((post) => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.message}</p>
        <small>By ${post.username} • ${post.time}</small>
        <hr>
      `;
      postsContainer.appendChild(div);
    });
  }
});
