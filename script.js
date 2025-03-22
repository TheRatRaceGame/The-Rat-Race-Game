document.addEventListener("DOMContentLoaded", function () {
    let cashOnHand = 0;

    // Function to update calculations
    function updateCalculations() {
        // Get Income Values
        let salary = parseFloat(document.getElementById("salary").value) || 0;
        let spouseSalary = parseFloat(document.getElementById("spouseSalary").value) || 0;
        let sideGigSalary = parseFloat(document.getElementById("sideGigSalary").value) || 0;
        let stockBQty = parseFloat(document.getElementById("stockBQty").value) || 0;
        let propertyIncome = 0;

        // Calculate Stock Dividends
        let stockDividends = stockBQty * 0.5;
        document.getElementById("stockDividends").value = stockDividends;

        // Calculate Property/Business Income (Sum of Column 3 in Properties Table)
        document.querySelectorAll(".cashFlowInput").forEach(input => {
            propertyIncome += parseFloat(input.value) || 0;
        });
        document.getElementById("propertyIncome").value = propertyIncome;

        // Total Passive Income
        let totalPassiveIncome = stockDividends + propertyIncome;
        document.getElementById("totalPassiveIncome").value = totalPassiveIncome;

        // Total Income
        let totalIncome = salary + spouseSalary + sideGigSalary + totalPassiveIncome;
        document.getElementById("totalIncome").value = totalIncome;

        // Get Expenses
        let taxes = parseFloat(document.getElementById("taxes").value) || 0;
        let mortgage = parseFloat(document.getElementById("mortgage").value) || 0;
        let schoolLoanAmount = parseFloat(document.getElementById("schoolLoanAmount").value) || 0;
        let schoolLoanPayment = schoolLoanAmount * 0.005;
        document.getElementById("schoolLoanPayment").value = schoolLoanPayment;

        let carLoan = parseFloat(document.getElementById("carLoan").value) || 0;
        let otherExpenses = parseFloat(document.getElementById("otherExpenses").value) || 0;
        let children = parseInt(document.getElementById("children").value) || 0;
        let costPerChild = parseFloat(document.getElementById("costPerChild").value) || 0;
        let totalChildExpenses = children * costPerChild;
        document.getElementById("totalChildExpenses").value = totalChildExpenses;

        let businessLoanAmount = parseFloat(document.getElementById("businessLoan").value) || 0;
        let businessLoanPayment = businessLoanAmount * 0.005;
        document.getElementById("businessLoanPayment").value = businessLoanPayment;

        // Total Expenses
        let totalExpenses = taxes + mortgage + schoolLoanPayment + carLoan + otherExpenses + totalChildExpenses + businessLoanPayment;
        document.getElementById("totalExpenses").value = totalExpenses;

        // Cash Flow Calculation
        let totalCashFlow = totalIncome - totalExpenses;
        document.getElementById("totalCashFlow").value = totalCashFlow;

        // Update Cash on Hand
        document.getElementById("cashOnHand").value = cashOnHand;
    }

    // Function to update cash on hand based on Properties and Businesses table changes (Removed logic for cashOnHand update here)
    function updateCashOnHand() {
        // The logic for adjusting cashOnHand based on DP/Initial Investment is removed.
        document.getElementById("cashOnHand").value = cashOnHand;
    }

    // Add Event Listeners for Real-Time Updates
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
            updateCalculations();
            updateCashOnHand();
        });
    });

    // Get Paid Button
    let getPaidButton = document.getElementById("getPaid");
    let canClick = true;
    getPaidButton.addEventListener("click", function () {
        if (canClick) {
            let totalCashFlow = parseFloat(document.getElementById("totalCashFlow").value) || 0;
            cashOnHand += totalCashFlow;
            document.getElementById("cashOnHand").value = cashOnHand;

            canClick = false;
            setTimeout(() => {
                canClick = true;
            }, 5000);
        }
    });

    // Add Money
    document.getElementById("addMoney").addEventListener("click", function () {
        let amount = parseFloat(prompt("Enter amount to add:")) || 0;
        cashOnHand += amount;
        document.getElementById("cashOnHand").value = cashOnHand;
    });

    // Take Away Money
    document.getElementById("takeMoney").addEventListener("click", function () {
        let amount = parseFloat(prompt("Enter amount to take away:")) || 0;
        cashOnHand -= amount;
        document.getElementById("cashOnHand").value = cashOnHand;
    });

    // Buy Stock
    document.getElementById("buyStock").addEventListener("click", function () {
        let stockType = prompt("Enter Stock Type (A or B):").toUpperCase();
        while(!((["A","B"]).includes(stockType))){
            stockType = prompt("Enter Stock Type (A or B):").toUpperCase();
        }
    
        let quantity = parseInt(prompt("Enter Quantity:")) || 0;
        let costPerShare = parseFloat(prompt("Enter Cost per Share:")) || 0;
        let totalCost = quantity * costPerShare;
        let currentCPS = document.getElementById(`stock${stockType}Cost`).value

        if (cashOnHand >= totalCost) {
            cashOnHand -= totalCost;
            document.getElementById("cashOnHand").value = cashOnHand;
            document.getElementById(`stock${stockType}Qty`).value = parseInt(document.getElementById(`stock${stockType}Qty`).value) + quantity;
            if(currentCPS!=0){
                document.getElementById(`stock${stockType}Cost`).value = (parseInt(document.getElementById(`stock${stockType}Cost`).value)+ costPerShare)/2;
            }else{
                document.getElementById(`stock${stockType}Cost`).value = costPerShare;
            }
            // After purchasing stock, update calculations to refresh the stock dividends
            updateCalculations()
        } else {
            alert("Not enough cash!");
        }
    });

    // Sell Stock
    document.getElementById("sellStock").addEventListener("click", function () {
        let stockType = prompt("Enter Stock Type (A or B):").toUpperCase();
        while(!((["A","B"]).includes(stockType))){
            stockType = prompt("Enter Stock Type (A or B):").toUpperCase();
        }
        let quantity = parseInt(prompt("Enter Quantity:")) || 0;
        let costPerShare = parseFloat(prompt("Enter Selling Price per Share:")) || 0;
        let totalSale = quantity * costPerShare;

        let stockQty = document.getElementById(`stock${stockType}Qty`);
        if (parseInt(stockQty.value) >= quantity) {
            cashOnHand += totalSale;
            document.getElementById("cashOnHand").value = cashOnHand;
            stockQty.value = parseInt(stockQty.value) - quantity;
            // After selling stock, update calculations to refresh the stock dividends
            updateCalculations()
        } else {
            alert("Not enough stock to sell!");
        }
    });

    // Buy Gold
    document.getElementById("buyGold").addEventListener("click", function () {
        let quantity = parseInt(prompt("Enter Quantity of Gold Coins:")) || 0;
        if(quantity>0){
            let costPerCoin = parseFloat(prompt("Enter Cost per Coin:")) || 0;
            let totalCost = quantity * costPerCoin;
            let currentCPC = document.getElementById("goldCost").value;

            if (cashOnHand >= totalCost) {
                cashOnHand -= totalCost;
                document.getElementById("cashOnHand").value = cashOnHand;
                document.getElementById("goldQty").value = parseInt(document.getElementById("goldQty").value) + quantity;
                if(currentCPC!=0){
                    document.getElementById("goldCost").value = ((parseInt(document.getElementById("goldCost").value))+ costPerCoin)/2;
                }else{
                    document.getElementById("goldCost").value = costPerCoin;
                }
            } else {
                alert("Not enough cash!");
            }}
    });

    // Sell Gold
    document.getElementById("sellGold").addEventListener("click", function () {
        if(document.getElementById("goldQty").value!=0){
            let quantity = parseInt(prompt("Enter Quantity to Sell:")) || 0;
            if(quantity>0){
            let costPerCoin = parseFloat(prompt("Enter Selling Price per Coin:")) || 0;
            let totalSale = quantity * costPerCoin;

            if (parseInt(document.getElementById("goldQty").value) >= quantity) {
                cashOnHand += totalSale;
                document.getElementById("cashOnHand").value = cashOnHand;
                if((document.getElementById("goldQty").value) == quantity){
                    document.getElementById("goldCost").value =0;
                }
                document.getElementById("goldQty").value -= quantity;
            } else {
                alert("Not enough gold to sell!");
            }
            }
        }else{
            alert("No gold to sell")
        }
    });

// Buy Trading Cards
document.getElementById("buyTradingCards").addEventListener("click", function () {
    let quantity = parseInt(prompt("Enter Quantity of Trading Cards to Buy:")) || 0;
    if(quantity>0){
        let costPerCard = parseFloat(prompt("Enter Cost per Trading Card:")) || 0;
        let totalCost = quantity * costPerCard;

        if (cashOnHand >= totalCost) {
            cashOnHand -= totalCost;
            document.getElementById("cashOnHand").value = cashOnHand;
            document.getElementById("tradingCardsQty").value = parseInt(document.getElementById("tradingCardsQty").value) + quantity;
            document.getElementById("tradingCardsCost").value = costPerCard;
        } else {
            alert("Not enough cash!");
        }}
});

// Sell Trading Cards
document.getElementById("sellTradingCards").addEventListener("click", function () {
    let quantity = parseInt(prompt("Enter Quantity to Sell:")) || 0;
    if(quantity>0){
    let costPerCard = parseFloat(prompt("Enter Selling Price per Trading Card:")) || 0;
    let totalSale = quantity * costPerCard;

    if (parseInt(document.getElementById("tradingCardsQty").value) >= quantity) {
        cashOnHand += totalSale;
        document.getElementById("cashOnHand").value = cashOnHand;
        document.getElementById("tradingCardsQty").value -= quantity;
    } else {
        alert("Not enough trading cards to sell!");
    }}
 });
});