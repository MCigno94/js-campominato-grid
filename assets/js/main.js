/*  ---- CONSEGNA ----
L'utente indica un livello di difficoltà 
in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:

con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49

Quando l'utente clicca su ogni cella, 
la cella cliccata si colora di azzurro.
*/


/**
 * Generate a grid
 * @param {string} selector The css selector
 * @param {string} tag_name a tag name
 * @param {string} class_name a class name
 * @param {number} limit number of cells
 */

function generateGrid(selector, tag_name, class_name, limit) {
    const cellsElement = document.querySelector(selector)

    for (let i = 1; i <= limit; i++) {
        const cellItem = document.createElement(tag_name);
        cellItem.classList.add(class_name)
        cellsElement.append(cellItem)
    }

}

/**
 * Select all elements and attach an event listenter
 * @param {string} selector css selector
 * @param {string} active_class a css class name
 */
function selectElements(selector, active_class) {
    const cells = document.querySelectorAll(selector);
    const numbers = sequenceInteger(1, 100);

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const spanElement = document.createElement('span');
        spanElement.append(numbers[i]);
        cell.append(spanElement);

        cell.addEventListener('click', function() {
            this.firstChild.style.opacity = '1'
            this.classList.toggle('active_blue')
        })
    }
}

/**
 * @param {number} min 
 * @param {number} max 
 * @returns array di numeri
 */
function sequenceInteger(min, max) {
    let numbers = [];
    for (let i = min; i <= max; i++) {
        let number = i;
        numbers.push(number);
    }
    return numbers;
}

let btnElement = document.getElementById('play');
let levelSelectElement = document.getElementById('level');

btnElement.addEventListener('click', function() {
    event.preventDefault()
    const level = levelSelectElement.value;
    if (level === 'easy') {
        generateGrid('.cells', 'div', 'cell_10', 100);
        selectElements('.cell_10', 'active');
    } else if (level === 'medium') {
        generateGrid('.cells', 'div', 'cell_9', 81);
        selectElements('.cell_9', 'active');
    } else {
        generateGrid('.cells', 'div', 'cell_7', 49);
        selectElements('.cell_7', 'active');
    }
})