function calculateTip() {
    // Get the total bill amount
    let amount = parseFloat(document.getElementById("billAmount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid bill amount.");
        return;
    }

    // Get user feedback from the dropdown options
    let experience = document.getElementById("experience").value;
    let friendliness = document.getElementById("friendliness").value;
    let speed = document.getElementById("speed").value;
    let foodQuality = document.getElementById("foodQuality").value;

    let minTip = 10, maxTip = 20;

    // Calculate min and max tip based on user experience
    switch (experience) {
        case "poor":
            maxTip = 12;
            break;
        case "average":
            minTip = 12;
            maxTip = 18;
            break;
        case "excellent":
            minTip = 18;
            break;
    }

    // Adjust tip based on friendliness
    if (friendliness === "very friendly") {
        minTip += 2;
        maxTip += 2;
    } else if (friendliness === "not friendly") {
        maxTip -= 2;
    }

    // Adjust tip based on service speed
    if (speed === "fast") {
        minTip += 1;
        maxTip += 1;
    } else if (speed === "slow") {
        maxTip -= 1;
    }

    // Adjust tip based on food quality
    if (foodQuality === "great") {
        minTip += 2;
        maxTip += 2;
    } else if (foodQuality === "bad") {
        maxTip -= 2;
    }

    // Generate random tip percentage
    let tipPercentage = Math.random() * (maxTip - minTip) + minTip;
    let tipAmount = (amount * tipPercentage) / 100;

    // Calculate total amount after adding the tip
    let totalAmount = amount + tipAmount;

    // Display the results
    document.getElementById("result").innerText = `Suggested Tip: ${tipPercentage.toFixed(2)}% ($${tipAmount.toFixed(2)})`;
    document.getElementById("totalAmount").innerText = `Total Amount (Including Tip): $${totalAmount.toFixed(2)}`;
}
