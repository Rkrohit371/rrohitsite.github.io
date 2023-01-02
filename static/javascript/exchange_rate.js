const currencyElement_one = document.getElementById('currency-one');
const currencyElement_two = document.getElementById('currency-two')

const amountElement_one = document.getElementById('amount-one');
const amountElement_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
    const currencyOne = currencyElement_one.value;
    const currencyTwo = currencyElement_two.value;
    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`).then(res => res.json()).then(data => {
        console.log(data);
        const rates = data.rates[currencyTwo];
        console.log(rates);

        rateEl.innerText = `1 ${currencyOne} = ${rates} ${currencyTwo}`;

        amountElement_two.value = (amountElement_one.value*rates).toFixed(2);
    });

}

// Events Listener
currencyElement_one.addEventListener('change',calculate)
amountElement_one.addEventListener('input',calculate)
currencyElement_two.addEventListener('change',calculate)
amountElement_two.addEventListener('input',calculate);

swap.addEventListener('click', () => {
    const temp = currencyElement_one.value;
    currencyElement_one.value = currencyElement_two.value;
    currencyElement_two.value = temp;
    calculate()

})


calculate()