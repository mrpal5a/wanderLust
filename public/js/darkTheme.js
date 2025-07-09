
  const themeToggleBtn = document.getElementById("theme-toggle");

  // Load theme from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }

  themeToggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    // Save theme preference
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

