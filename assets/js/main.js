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

let btnElement = document.getElementById('play');
let levelSelectElement = document.getElementById('level');
let cells = document.querySelector('.cells');
let maxCells = 0;
let counterClick = 0;

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
function selectElements(selector) {
    const cells = document.querySelectorAll(selector);
    const numbers = sequenceInteger(1, 100);
    let numbersBomb = generateCellsNumbers(maxCells);

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const spanElement = document.createElement('span');
        spanElement.append(numbers[i]);
        cell.append(spanElement);

        cell.addEventListener('click', function() {

            for (let j = 0; j < numbersBomb.length; j++) {
                if (numbersBomb[j] == cell.textContent) {
                    this.classList.add('active_red')
                    alert('hai perso')
                } else {
                    this.classList.add('active_blue')
                }
                counterClick += 1;
            }
            //console.log(counter);
        });
        //console.log(Number(cell.textContent));
    }
    console.log(numbersBomb);
    console.log(counterClick);
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

btnElement.addEventListener('click', function(event) {
    event.preventDefault()
    cells.innerHTML = '';
    const level = levelSelectElement.value;
    if (level === 'easy') {
        maxCells = 100;
        generateGrid('.cells', 'div', 'cell_10', maxCells);
        selectElements('.cell_10');
    } else if (level === 'medium') {
        maxCells = 81;
        generateGrid('.cells', 'div', 'cell_9', maxCells);
        selectElements('.cell_9');
    } else {
        maxCells = 49;
        generateGrid('.cells', 'div', 'cell_7', maxCells);
        selectElements('.cell_7');
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

function generateCellsNumbers(max) {
    const randomNumbers = [];
    // genero 16 numeri casuali unici
    while (randomNumbers.length !== 16) {
        const randomNumber = getRandomInteger(1, max)

        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber)
        }
    }
    return randomNumbers;
}
//console.log(generateCellsNumbers());

// se clicco su una bomba il gioco si interrompe


// se finisco di cliccare tutti i numeri il gioco si interrompe

// se il gioco si interrompe per aver cliccato su una bomba seleziono le bombe rimaste