let billInput = document.getElementById('bill');
let tipButtons = document.querySelectorAll('.tip-btn');
let customTipInput = document.getElementById('custom-tip');
let peopleInput = document.getElementById('people');
let tipAmountDisplay = document.getElementById('tip-amount');
let totalAmountDisplay = document.getElementById('total-amount');
let resetButton = document.getElementById('reset');

function removeActiveStates(){
  tipButtons.forEach(button=>button.classList.remove('active'));
  customTipInput.classList.remove('active');
}

function calculateTip(tipPercent = null) {
  let bill = parseFloat(billInput.value);
  let people = parseInt(peopleInput.value);

  if (!bill || !people || people <= 0 ||  bill <= 0) {
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    resetButton.disabled = true;
    return;
  }
  resetButton.disabled = false;

  let tipAmount;
  if (tipPercent) {
    tipAmount = (bill * (tipPercent / 100)) / people;
  } else {
    let customTip = parseFloat(customTipInput.value);
    tipAmount = (bill * (customTip / 100)) / people;
  }

  let totalAmount = bill / people + tipAmount;

  tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}
// calculateTip(parseFloat(button.textContent.replace('%', '')));

tipButtons.forEach(button=>{
  button.addEventListener('click', ()=>{
    removeActiveStates();
    button.classList.add('active');
    calculateTip(parseFloat(button.textContent.replace('%', '')));
  })
})

customTipInput.addEventListener('input', ()=>{
  removeActiveStates();
  customTipInput.classList.add('active');
  calculateTip();
})

  peopleInput.addEventListener("input", () => {
    let activeButton = document.querySelector(".tip-btn.active");
    if (activeButton) {
      calculateTip(parseFloat(activeButton.textContent.replace("%", "")));
    } else {
      calculateTip();
    }
  });

  billInput.addEventListener("input", () => {
    let activeButton = document.querySelector(".tip-btn.active");
    if (activeButton) {
      calculateTip(parseFloat(activeButton.textContent.replace("%", "")));
    } else {
      calculateTip();
    }
  });

resetButton.addEventListener('click', ()=>{
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";

  removeActiveStates();
})