const main = document.getElementById('main');

const addUserBtn = document.getElementById('add-user');

const doubleBtn = document.getElementById('double');

const showMillionairBtn = document.getElementById('show-millionair');

const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');

    const data = await res.json();
    console.log(data);

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2};
    });
    updateDOM();
}

function sortByRichest() {
    data = data.sort((a, b) => {
        return b.money - a.money;
    });
    updateDOM()
}

function showMillionair() {
    data = data.filter(item => {
        return item.money >= 500000;
    });
    updateDOM();
}

function calculateWealth() {

    const total = data.reduce((acc, user) => (acc += user.money),0);
    const wealthEl = document.createElement('div')

    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;

    main.appendChild(wealthEl);
}

function addData(obj) {
    data.push(obj);

    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;

        main.appendChild(element)
    });
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

// Event Listener

addUserBtn.addEventListener('click', getRandomUser);

doubleBtn.addEventListener('click', doubleMoney);

sortBtn.addEventListener('click', sortByRichest);

showMillionairBtn.addEventListener('click', showMillionair);

calculateWealthBtn.addEventListener('click', calculateWealth);