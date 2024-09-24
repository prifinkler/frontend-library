/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const themeToggle = document.querySelector('input[type="checkbox"]');
const bodyEl = document.querySelector("body")
const input = document.getElementById("input-value")
const convertBtn = document.getElementById("convert-btn")
let lengthResult = document.getElementById("length-result")
let volumeResult = document.getElementById("volume-result")
let massResult = document.getElementById("mass-result")

function convert() {
  const inputVal = Number(input.value)

  const metersToFeet = inputVal * 3.281;
  const feetToMeters = inputVal / 3.281;
  lengthResult.innerHTML = `${inputVal} meters = ${metersToFeet.toFixed(3)} feet | ${inputVal} feet = ${feetToMeters.toFixed(3)} meters`

  const litersToGallons = inputVal * 0.264
  const gallonsToLiters = inputVal / 0.264
  volumeResult.innerHTML = `${inputVal} liters = ${litersToGallons.toFixed(3)} gallons | ${inputVal} gallons = ${gallonsToLiters.toFixed(3)} liters`

  const kilogramsToPounds = inputVal * 2.204
  const poundsToKilograms = inputVal / 2.204
  massResult.innerHTML = `${inputVal} kilos = ${kilogramsToPounds.toFixed(3)} pounds | ${inputVal} pounds = ${poundsToKilograms.toFixed(3)} kilos`
}

convertBtn.addEventListener("click", function() {
  convert()
})

themeToggle.addEventListener('change', () => {
  bodyEl.classList.toggle('dark-theme');
});
