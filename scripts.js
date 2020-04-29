/*
* Developed by Michael Chaplin
* As a part of the Odin Project Curriculumn Etch-A-Sketch project
* April 29th, 2020
*/

// Finds the main DOM items to help create the grid
const colorPickers = document.getElementsByClassName('color-picker');
const gridSizeText = document.querySelector('#grid-size');
const gridContainer = document.querySelector('#sketch-container');

// Initializing the main variables
let gridSize;
let selectedColorID;
let selectedColor;
let selectedGridItem;
initGrid();

// -----------------------------------------------------------------------------
/* Initializes the webpage to create the grid with default settings
*
*  @params  None
*/
function initGrid () {
    gridSize = 16;
    selectedColorID = 'white';
    selectedColor = '#FFFFFF';
    createGrid(gridSize);
}

const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', function resetGrid() {
    
    // Prompts the user for a valid grid size
    while (true) {
        gridSize = prompt("Please enter desired grid size:");

        if(gridSize == null) {
            console.log(`User clicked cancel. gridSize = ${gridSize}`);
            return false;

        } else if(isNaN(gridSize) || gridSize.length <= 0 || gridSize < 1) {
            alert("Invalid input. Please enter a valid number");
            console.log(`Invalid input of: ${gridSize}`);

        } else {
            // Clears the grid of all DOM elements from previous grid
            while (gridContainer.firstChild) {
                gridContainer.removeChild(gridContainer.lastChild);
            }
            parseInt(gridSize);
            createGrid(gridSize);
            console.log(`Changing grid size to ${gridSize}`);
            break;
        }
    }
});

// -----------------------------------------------------------------------------
/* Creates the Etch-A-Sketch grid on the webpage given a user's requested number of columns/rows
*
*  @params   gridSize    An integer that indicates the number of squares in the grid
*/
function createGrid (gridSize) {
    // Creates the rows for the grid
    for (i = 0; i < gridSize; i++) {
        const gridRow = document.createElement('div');
        gridRow.className = 'grid-row';

        // Populates each row with the corresponding number of 'column' items
        for (j = 0; j < gridSize; j++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridRow.appendChild(gridItem);

            // Adds functionality for colour changing when interacting with the mouse
            gridItem.addEventListener("mouseover", function changeColor() {
                if(selectedColorID == 'multi'){
                    // Sets the decreasing opacity with each pass over by the ouse
                    if(gridItem.style.opacity.length > 0){
                        opacity = Number(gridItem.style.opacity);
                        (opacity > 0) ? (opacity -= 0.1) : opacity = 0;
                        gridItem.style.opacity = `${opacity}`;
                    } else {
                        gridItem.style.backgroundColor = `${randColor()}`;
                        gridItem.style.opacity = `1`;
                    }
                } else {
                    gridItem.style.backgroundColor = selectedColor;
                    gridItem.style.opacity = '1';
                    console.log(`Color is ${selectedColor}`);
                }
            });
        }
        gridContainer.appendChild(gridRow);
    }
    gridSizeText.textContent = `Grid Size: ${gridSize}x${gridSize}`;
}

// -----------------------------------------------------------------------------
/* Generates a random HSL color for the multicolour sketch mode  
*
*  @params   None
*  @return  A string that represents a random hue with 100% saturation and 50% lightness
*/
function randColor() {
    return `hsl(${Math.floor(Math.random()*360)}, 100%, 50%)`;
}

// Adds color selection capability for sketching
for (let i = 0; i < colorPickers.length; i++) {
    colorPickers[i].addEventListener('click', (event) => {
        selectedColorID = event.target.id;
        switch (selectedColorID) {
            case 'multi':
                selectedColor = 'multi';
                break;
            case 'white':
                selectedColor = '#FFFFFF';
                break;
            case 'red':
                selectedColor = '#DB4437';
                break;
            case 'yellow':
                selectedColor = '#F4B400';
                break;
            default:
                selectedColor = '#252525';
                console.log(`selectedColorID is invalid and = ${selectedColorID}`);
                break;
        }
        console.log(`Selected color = ${selectedColorID}`);
    });
}