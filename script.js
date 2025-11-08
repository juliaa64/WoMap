// Accessibility and Language Management
document.addEventListener("DOMContentLoaded", () => {
  // Initialize settings from localStorage
  const savedTheme = localStorage.getItem("womap_theme") || "light"
  const savedFontSize = localStorage.getItem("womap_fontsize") || "medium"
  const savedLanguage = localStorage.getItem("womap_language") || "es"

  // Apply saved settings
  document.documentElement.setAttribute("data-theme", savedTheme)
  document.body.className = `font-${savedFontSize}`
  updateLanguage(savedLanguage)

  // Update UI controls
  const themeToggle = document.getElementById("themeToggle")
  const fontSizeSelect = document.getElementById("fontSizeSelect")
  const languageSelect = document.getElementById("languageSelect")
  const accessibilityToggle = document.getElementById("accessibilityToggle")
  const accessibilityContent = document.getElementById("accessibilityContent")

  if (themeToggle) {
    const icon = themeToggle.querySelector(".toggle-icon")
    icon.textContent = savedTheme === "dark" ? "☀️" : "🌙"
  }

  if (fontSizeSelect) {
    fontSizeSelect.value = savedFontSize
  }

  if (languageSelect) {
    languageSelect.value = savedLanguage
  }

  if (accessibilityToggle && accessibilityContent) {
    accessibilityToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      accessibilityContent.classList.toggle("active")
    })

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".accessibility-panel")) {
        accessibilityContent.classList.remove("active")
      }
    })
  }

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("womap_theme", newTheme)

      const icon = this.querySelector(".toggle-icon")
      icon.textContent = newTheme === "dark" ? "☀️" : "🌙"
    })
  }

  // Font size change
  if (fontSizeSelect) {
    fontSizeSelect.addEventListener("change", function () {
      document.body.className = `font-${this.value}`
      localStorage.setItem("womap_fontsize", this.value)
    })
  }

  // Language change
  if (languageSelect) {
    languageSelect.addEventListener("change", function () {
      updateLanguage(this.value)
      localStorage.setItem("womap_language", this.value)
    })
  }

  // Account dropdown functionality
  const accountBtn = document.getElementById("accountBtn")
  const accountMenu = document.getElementById("accountMenu")
  const accountDropdown = document.getElementById("accountDropdown")

  if (accountBtn && accountMenu) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("womap_user")

    // Update menu based on login status
    if (isLoggedIn) {
      accountMenu.innerHTML = `
        <a href="account.html"><span data-es="Mi Cuenta" data-en="My Account">Mi Cuenta</span></a>
        <a href="dashboard.html"><span data-es="Dashboard" data-en="Dashboard">Dashboard</span></a>
        <hr>
        <button id="logoutBtnDropdown"><span data-es="Cerrar Sesión" data-en="Logout">Cerrar Sesión</span></button>
      `

      // Add logout functionality
      const logoutBtnDropdown = document.getElementById("logoutBtnDropdown")
      if (logoutBtnDropdown) {
        logoutBtnDropdown.addEventListener("click", () => {
          localStorage.removeItem("womap_user")
          window.location.href = "index.html"
        })
      }
    } else {
      accountMenu.innerHTML = `
        <a href="login.html"><span data-es="Iniciar Sesión" data-en="Login">Iniciar Sesión</span></a>
        <a href="register.html"><span data-es="Registrarse" data-en="Sign Up">Registrarse</span></a>
      `
    }

    // Toggle menu
    accountBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      accountMenu.classList.toggle("active")
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!accountDropdown.contains(e.target)) {
        accountMenu.classList.remove("active")
      }
    })

    // Update language for dynamically added elements
    updateLanguage(savedLanguage)
  }
})

// Update language function
function updateLanguage(lang) {
  document.documentElement.setAttribute("lang", lang)

  // Update all elements with data-es and data-en attributes
  const elements = document.querySelectorAll("[data-es][data-en]")
  elements.forEach((element) => {
    const text = element.getAttribute(`data-${lang}`)
    if (text) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = text
      } else if (element.tagName === "OPTION") {
        element.textContent = text
      } else {
        element.textContent = text
      }
    }
  })

  // Update select options
  const selects = document.querySelectorAll("select")
  selects.forEach((select) => {
    const options = select.querySelectorAll("option")
    options.forEach((option) => {
      const text = option.getAttribute(`data-${lang}`)
      if (text) {
        option.textContent = text
      }
    })
  })
}
