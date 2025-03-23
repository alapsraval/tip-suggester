function suggestTip() {
    let amount = parseFloat(prompt("Enter the total bill amount: "));
    if (isNaN(amount) || amount <= 0) {
        return "Please enter a valid bill amount.";
    }

    let experience = prompt("Rate your experience (Poor, Average, Excellent): ").toLowerCase();
    let friendliness = prompt("How friendly was the server? (Not Friendly, Neutral, Very Friendly): ").toLowerCase();
    let speed = prompt("How fast was the service? (Slow, Average, Fast): ").toLowerCase();
    let foodQuality = prompt("How was the food quality? (Bad, Okay, Great): ").toLowerCase();

    let minTip = 10, maxTip = 20;

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
        default:
            return "Invalid experience rating. Choose 'Poor', 'Average', or 'Excellent'.";
    }

    if (friendliness === "very friendly") {
        minTip += 2;
        maxTip += 2;
    } else if (friendliness === "not friendly") {
        maxTip -= 2;
    }

    if (speed === "fast") {
        minTip += 1;
        maxTip += 1;
    } else if (speed === "slow") {
        maxTip -= 1;
    }

    if (foodQuality === "great") {
        minTip += 2;
        maxTip += 2;
    } else if (foodQuality === "bad") {
        maxTip -= 2;
    }

    let tipPercentage = Math.random() * (maxTip - minTip) + minTip;
    let tipAmount = (amount * tipPercentage) / 100;
    return `Based on your experience rating, friendliness, service speed, and food quality, a ${tipPercentage.toFixed(2)}% tip would be $${tipAmount.toFixed(2)}.`;
}
