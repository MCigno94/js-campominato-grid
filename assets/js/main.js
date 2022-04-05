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
 * Seleziono tutti gli elementi ed inserisco i valori e lo stile al momento del click
 * @param {string} selector css selector
 * @param {string} active_class a css class name
 */
function selectElements(selector, active_class) {
    const cells = document.querySelectorAll(selector);
    const numbers = sequenceInteger(1, 100);
    const numbersBomb = generateCellsNumbers();
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const spanElement = document.createElement('span');
        spanElement.append(numbers[i]);
        cell.append(spanElement);

        cell.addEventListener('click', function() {

            if (cell.textContent == numbersBomb.toString) {
                this.classList.add('active_red');

            } else {
                cell.classList.add('active_blue');

            }
        });
        //console.log(Number(cell.textContent));
        //console.log(numbersBomb.toString);
    }
    //console.log(numbersBomb);
}

/** creo una sequenza di numeri
 * @param {number} min valore di partenza
 * @param {number} max valore di arrivo
 * @returns array di numeri
 */
function sequenceInteger(min, max) {
    let numbers = []; // array contenitore
    for (let i = min; i <= max; i++) {
        let number = i;
        numbers.push(number);
    }
    return numbers;
}

let btnElement = document.getElementById('play');
let levelSelectElement = document.getElementById('level');
let cells = document.querySelector('.cells');


btnElement.addEventListener('click', function(event) {
    event.preventDefault()
    cells.innerHTML = '';
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
});

/** genero 16 numeri casuali per simulare le bombe
 * 
 * @param {number} min Minimun number to generate
 * @param {number} max Max number
 * @returns {number}
 */
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCellsNumbers() {
    const randomNumbers = [];
    // genero 16 numeri casuali unici
    while (randomNumbers.length !== 6) {
        const randomNumber = getRandomInteger(1, 10)

        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber)
        }
    }
    return randomNumbers;
}
//console.log(generateCellsNumbers());


//console.log(selectBomb(10, generateCellsNumbers()));