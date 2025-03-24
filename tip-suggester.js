// Dark Mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDarkMode
        ? '<span class="moon"><i class="fas fa-sun"></i></span> Light Mode'
        : '<span class="moon"><i class="fas fa-moon"></i></span> Dark Mode';
});

// Enable or disable the Calculate button based on input values
const billAmountInput = document.getElementById('billAmount');
const calculateButton = document.getElementById('calculateButton');

billAmountInput.addEventListener('input', () => {
    calculateButton.disabled = !billAmountInput.value;
});

// Calculate the tip based on user input
calculateButton.addEventListener('click', () => {
    const amount = parseFloat(billAmountInput.value);
    const experience = document.getElementById('experience').value;
    const friendliness = document.getElementById('friendliness').value;
    const speed = document.getElementById('speed').value;
    const foodQuality = document.getElementById('foodQuality').value;

    let minTip = 5, maxTip = 15; // Base tip range

    // Adjust the min and max tip based on experience rating
    switch (experience) {
        case "poor":
            maxTip = 7;
            break;
        case "average":
            minTip = 7;
            maxTip = 12;
            break;
        case "excellent":
            minTip = 12;
            break;
    }

    // Modify the tip range based on friendliness
    if (friendliness === "very friendly") {
        minTip += 2;
        maxTip += 2;
    } else if (friendliness === "not friendly") {
        maxTip -= 2;
    }

    // Modify the tip range based on service speed
    if (speed === "fast") {
        minTip += 1;
        maxTip += 1;
    } else if (speed === "slow") {
        maxTip -= 1;
    }

    // Modify the tip range based on food quality
    if (foodQuality === "great") {
        minTip += 2;
        maxTip += 2;
    } else if (foodQuality === "bad") {
        maxTip -= 2;
    }

    // Generate a random tip percentage within the specified range
    let tipPercentage = Math.random() * (maxTip - minTip) + minTip;
    tipPercentage = Math.min(Math.max(tipPercentage, 5), 15); // Clamp between 5% and 15%

    // Calculate the tip amount
    let tipAmount = (amount * tipPercentage) / 100;
    let totalAmount = amount + tipAmount;

    // Round up the total amount to the next cent
    // const totalAmount = Math.round(totalAmount);

    // Adjust the tip amount to match the rounded total
    // tipAmount = roundedTotalAmount - amount;  // Subtract the bill amount from the rounded total to get the adjusted tip
    // tipPercentage = (tipAmount * 100) / totalAmount;  // Subtract the bill amount from the rounded total to get the adjusted tip

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Suggested tip: <strong>$${tipAmount.toFixed(2)}</strong> (<strong>${tipPercentage.toFixed(2)}%</strong>) <br> Total amount: <strong class="total-amount">$${totalAmount.toFixed(2)}</strong>`;
});
