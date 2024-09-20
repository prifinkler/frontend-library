let homeCounter = 0
let guestCounter = 0

let homeTotalScoreEl = document.getElementById("home-total-score")
let guestTotalScoreEl = document.getElementById("guest-total-score")

function updateScore(team, points) {
  if (team == 'home') {
      homeCounter += points
      homeTotalScoreEl.textContent = homeCounter
  } else if (team == 'guest') {
      guestCounter += points
      guestTotalScoreEl.textContent = guestCounter
  }
}
