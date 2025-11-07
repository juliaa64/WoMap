// Registration form handling
let currentStep = 1

function showStep(step) {
  // Hide all forms
  document.getElementById("step1Form").style.display = "none"
  document.getElementById("step2Form").style.display = "none"
  document.getElementById("step3Form").style.display = "none"

  // Show selected form
  document.getElementById(`step${step}Form`).style.display = "block"

  // Update steps indicator
  document.querySelectorAll(".step").forEach((stepEl, index) => {
    if (index + 1 === step) {
      stepEl.classList.add("active")
    } else {
      stepEl.classList.remove("active")
    }
  })

  currentStep = step
}

// Step 1: Basic Info
document.getElementById("step1Form").addEventListener("submit", (e) => {
  e.preventDefault()

  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value

  if (password !== confirmPassword) {
    const lang = localStorage.getItem("womap_language") || "es"
    const message = lang === "es" ? "Las contraseñas no coinciden" : "Passwords do not match"
    alert(message)
    return
  }

  showStep(2)
})

// Step 2: DNI Verification
document.getElementById("step2Form").addEventListener("submit", (e) => {
  e.preventDefault()
  showStep(3)
})

// Step 3: Profile
document.getElementById("step3Form").addEventListener("submit", (e) => {
  e.preventDefault()

  // Save user as logged in
  localStorage.setItem("womap_user", "logged_in")

  // Redirect to dashboard
  window.location.href = "dashboard.html"
})

// Initialize
showStep(1)
