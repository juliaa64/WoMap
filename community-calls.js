// Community call tracking and points system

// Function to award points for calls
function awardCallPoints(callDurationMinutes) {
  const userProgress = JSON.parse(localStorage.getItem("womap_user_progress")) || {
    points: 0,
    level: 1,
    callsMade: 0,
    lastUpdated: new Date().toISOString(),
  }

  // Award 10 points per call + 1 point per minute
  const pointsEarned = 10 + Math.floor(callDurationMinutes)
  userProgress.points += pointsEarned
  userProgress.callsMade += 1

  // Calculate level (every 100 points = 1 level)
  userProgress.level = Math.floor(userProgress.points / 100) + 1
  userProgress.lastUpdated = new Date().toISOString()

  localStorage.setItem("womap_user_progress", JSON.stringify(userProgress))

  return {
    pointsEarned,
    totalPoints: userProgress.points,
    level: userProgress.level,
    callsMade: userProgress.callsMade,
  }
}

// Function to get user progress
function getUserProgress() {
  const userProgress = JSON.parse(localStorage.getItem("womap_user_progress")) || {
    points: 0,
    level: 1,
    callsMade: 0,
    lastUpdated: new Date().toISOString(),
  }

  return userProgress
}

// Function to calculate level name
function getLevelName(level, lang = "es") {
  const levelNames = {
    es: [
      "Novata",
      "Exploradora",
      "Compañera",
      "Guardiana",
      "Protectora",
      "Defensora",
      "Heroína",
      "Campeona",
      "Líder",
      "Leyenda",
    ],
    en: [
      "Novice",
      "Explorer",
      "Companion",
      "Guardian",
      "Protector",
      "Defender",
      "Heroine",
      "Champion",
      "Leader",
      "Legend",
    ],
  }

  const names = levelNames[lang] || levelNames["es"]
  const index = Math.min(level - 1, names.length - 1)
  return names[index]
}

// Export functions for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = { awardCallPoints, getUserProgress, getLevelName }
}
