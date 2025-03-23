// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const card = document.querySelector('.card');

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    card.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('dark-mode');

    // Update the button text and icon
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
});

// Handle the form submission and tip calculation
const form = document.getElementById('tipForm');
const resultDiv = document.getElementById('result');
const tipPercentageSpan = document.getElementById('tipPercentage');
const tipAmountSpan = document.getElementById('tipAmount');
const totalAmountSpan = document.getElementById('totalAmount');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const experience = document.getElementById('experience').value;
    const friendliness = document.getElementById('friendliness').value;
    const speed = document.getElementById('speed').value;
    const foodQuality = document.getElementById('foodQuality').value;

    if (isNaN(billAmount) || billAmount <= 0) {
        alert('Please enter a valid bill amount');
        return;
    }

    let minTip = 10, maxTip = 20;
    
    switch (experience) {
        case 'poor':
            maxTip = 12;
            break;
        case 'average':
            minTip = 12;
            maxTip = 18;
            break;
        case 'excellent':
            minTip = 18;
            break;
    }
    
    if (friendliness === 'very friendly') {
        minTip += 2;
        maxTip += 2;
    } else if (friendliness === 'not friendly') {
        maxTip -= 2;
    }

    if (speed === 'fast') {
        minTip += 1;
        maxTip += 1;
    } else if (speed === 'slow') {
        maxTip -= 1;
    }

    if (foodQuality === 'great') {
        minTip += 2;
        maxTip += 2;
    } else if (foodQuality === 'bad') {
        maxTip -= 2;
    }

    // Calculate random tip percentage within the range
    let tipPercentage = Math.random() * (maxTip - minTip) + minTip;
    let tipAmount = (billAmount * tipPercentage) / 100;
    let totalAmount = billAmount + tipAmount;

    // Show the result
    tipPercentageSpan.textContent = tipPercentage.toFixed(2);
    tipAmountSpan.textContent = tipAmount.toFixed(2);
    totalAmountSpan.textContent = totalAmount.toFixed(2);

    resultDiv.style.display = 'block';
});

// Share Tip Button functionality
document.getElementById('shareButton').addEventListener('click', function () {
    const tipPercentage = tipPercentageSpan.textContent;
    const tipAmount = tipAmountSpan.textContent;
    const totalAmount = totalAmountSpan.textContent;

    const shareText = `I got a tip suggestion of ${tipPercentage}%! That's $${tipAmount}. My total amount is $${totalAmount}.`;

    if (navigator.share) {
        navigator.share({
            title: 'Tip Suggester',
            text: shareText,
            url: window.location.href
        }).then(() => {
            console.log('Shared successfully');
        }).catch((error) => {
            console.error('Error sharing:', error);
        });
    } else {
        alert('Share functionality is not supported on this device.');
    }
});
