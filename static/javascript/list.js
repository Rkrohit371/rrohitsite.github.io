const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const topProgrammingLanguages = [
    'Python Programming',
    'Java Programming',
    'Javascript / Node.js Programming',
    'C/C++ Programming',
    'PHP Programming',
    'Google Go Programming',
    'Swift Programming',
    'C# Programming',
    'Scala Programming',
    'R Programming',
]

// Store the List Items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
    [...topProgrammingLanguages].map(a => ({ value: a, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(a => a.value)
    .forEach((language, index) => {
        // console.log(language);
        const listItem = document.createElement('li');

        // listItem.classList.add('over');

        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="lang-name">${language}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;
        listItems.push(listItem);

        draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart( ){
    // console.log('Event', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    // console.log(dragStartIndex);

}

function dragEnter( ){
    // console.log('Event', 'dragenter');
    this.classList.add('over');
}

function dragLeave( ){
    // console.log('Event', 'dragleave');
    this.classList.remove('over');
}

function dragOver(e){
    // console.log('Event', 'dragover');
    e.preventDefault();
}

function dragDrop( ){
    // console.log('Event', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    console.log(dragStartIndex, dragEndIndex);
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// Swap lists items that are dragged and dropped
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable'); 
    const itemTwo = listItems[toIndex].querySelector('.draggable'); 

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

}

// Check the order of the items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const langName = listItem.querySelector('.draggable').innerText.trim();

        if(langName !== topProgrammingLanguages[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);