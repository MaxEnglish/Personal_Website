const letterValues = new Map([['A', 1],['B', 3],['C', 3],
                              ['D', 2],['E',1],['F', 4],
                              ['G', 2],['H', 4],['I', 1],
                              ['J', 8],['K', 5],['L', 1],
                              ['M', 3],['N', 1],['O', 1],
                              ['P', 3],['Q', 10],['R', 1],
                              ['S', 1],['T', 1],['U', 1],
                              ['V', 4],['W', 4],['X', 8],
                              ['Y', 4],['Z', 10],['',0]]);

export const getLetterValue = (letter) => {
    return letterValues.get(letter);
}

///// Generating the Board /////

//Generic Tile
class Tile {
    constructor(x,y) {
        this.letter = '';
        this.color = "lightgray";
        this.title = '';
        this.x = x;
        this.y = y;
        this.blank = false;
    }

    getLetter () {return this.letter}
    setLetter (letter) {this.letter = letter}
    getColor () {return this.color}
    getTitle () {return this.title}
    getXCoord () {return this.x}
    getYCoord () {return this.y}
    isBlank () {return this.blank}
    setBlank () {this.blank = true}
} 

//Triple Word Tile
class TW extends Tile {
    constructor(x,y) {
        super();
        this.letter = '';
        this.color = "red";
        this.title = "TW";
        this.x = x;
        this.y = y;
        this.blank = false;
    }
}

//Double Word Tile
class DW extends Tile {
    constructor(x,y) {
        super();
        this.letter = '';
        this.color = "orange";
        this.title = "DW";
        this.x = x;
        this.y = y;
        this.blank = false;
    }
}

//Double Letter Tile
class DL extends Tile {
    constructor(x,y) {
        super();
        this.letter = '';
        this.color = "lightblue";
        this.title = "DL";
        this.x = x;
        this.y = y;
        this.blank = false;
    }
}

//Triple Letter Tile
class TL extends Tile {
    constructor(x,y) {
        super();
        this.letter = '';
        this.color = "darkblue";
        this.title = "TL";
        this.x = x;
        this.y = y;
        this.blank = false;
    }
}

//Creating the board layout

class Board {
    constructor() {
        this.board = [[new TW(1,1), new Tile(1,2), new Tile(1,3), new DL(1,4), new Tile(1,5), new Tile(1,6), new Tile(1,7), new TW(1,8), new Tile(1,9), new Tile(1,10), new Tile(1,11), new DL(1,12), new Tile(1,13), new Tile(1,14), new TW(1,15)],
                      [new Tile(2,1), new DW(2,2), new Tile(2,3), new Tile(2,4), new Tile(2,5), new TL(2,6), new Tile(2,7), new Tile(2,8), new Tile(2,9), new TL(2,10), new Tile(2,11), new Tile(2,12), new Tile(2,13), new DW(2,14), new Tile(2,15)],
                      [new Tile(3,1), new Tile(3,2), new DW(3,3), new Tile(3,4), new Tile(3,5), new Tile(3,6), new DL(3,7), new Tile(3,8), new DL(3,9), new Tile(3,10), new Tile(3,11), new Tile(3,12), new DW(3,13), new Tile(3,14), new Tile(3,15)],
                      [new Tile(4,1), new Tile(4,2), new Tile(4,3), new DW(4,4), new Tile(4,5), new Tile(4,6), new Tile(4,7), new DL(4,8), new Tile(4,9), new Tile(4,10), new Tile(4,11), new DW(4,12), new Tile(4,13), new Tile(4,14), new Tile(4,15)],
                      [new Tile(5,1), new Tile(5,2), new Tile(5,3), new Tile(5,4), new DW(5,5), new Tile(5,6), new Tile(5,7), new Tile(5,8), new Tile(5,9), new Tile(5,10), new DW(5,11), new Tile(5,12), new Tile(5,13), new Tile(5,14), new Tile(5,15)],
                      [new Tile(6,1), new TL(6,2), new Tile(6,3), new Tile(6,4), new Tile(6,5), new DL(6,6), new Tile(6,7), new Tile(6,8), new Tile(6,9), new TL(6,10), new Tile(6,11), new Tile(6,12), new Tile(6,13), new TL(6,14), new Tile(6,15)],
                      [new Tile(7,1), new Tile(7,2), new DL(7,3), new Tile(7,4), new Tile(7,5), new Tile(7,6), new DL(7,7), new Tile(7,8), new DL(7,9), new Tile(7,10), new Tile(7,11), new Tile(7,12), new DL(7,13), new Tile(7,14), new Tile(7,15)],
                      [new TW(8,1), new Tile(8,2), new Tile(8,3), new DL(8,4), new Tile(8,5), new Tile(8,6), new Tile(8,7), new DW(8,8), new Tile(8,9), new Tile(8,10), new Tile(8,11), new DL(8,12), new Tile(8,13), new Tile(8,14), new TW(8,15)],
                      [new Tile(9,1), new Tile(9,2), new DL(9,3), new Tile(9,4), new Tile(9,5), new Tile(9,6), new DL(9,7), new Tile(9,8), new DL(9,9), new Tile(9,10), new Tile(9,11), new Tile(9,12), new DL(9,13), new Tile(9,14), new Tile(9,15)],
                      [new Tile(10,1), new TL(10,2), new Tile(10,3), new Tile(10,4), new Tile(10,5), new DL(10,6), new Tile(10,7), new Tile(10,8), new Tile(10,9), new TL(10,10), new Tile(10,11), new Tile(10,12), new Tile(10,13), new TL(10,14), new Tile(10,15)],
                      [new Tile(11,1), new Tile(11,2), new Tile(11,3), new Tile(11,4), new DW(11,5), new Tile(11,6), new Tile(11,7), new Tile(11,8), new Tile(11,9), new Tile(11,10), new DW(11,11), new Tile(11,12), new Tile(11,13), new Tile(11,14), new Tile(11,15)],
                      [new Tile(12,1), new Tile(12,2), new Tile(12,3), new DW(12,4), new Tile(12,5), new Tile(12,6), new Tile(12,7), new DL(12,8), new Tile(12,9), new Tile(12,10), new Tile(12,11), new DW(12,12), new Tile(12,13), new Tile(12,14), new Tile(12,15)],
                      [new Tile(13,1), new Tile(13,2), new DW(13,3), new Tile(13,4), new Tile(13,5), new Tile(13,6), new DL(13,7), new Tile(13,8), new DL(13,9), new Tile(13,10), new Tile(13,11), new Tile(13,12), new DW(13,13), new Tile(13,14), new Tile(13,15)],
                      [new Tile(14,1), new DW(14,2), new Tile(14,3), new Tile(14,4), new Tile(14,5), new TL(14,6), new Tile(14,7), new Tile(14,8), new Tile(14,9), new TL(14,10), new Tile(14,11), new Tile(14,12), new Tile(14,13), new DW(14,14), new Tile(14,15)],
                      [new TW(15,1), new Tile(15,2), new Tile(15,3), new DL(15,4), new Tile(15,5), new Tile(15,6), new Tile(15,7), new TW(15,8), new Tile(15,9), new Tile(15,10), new Tile(15,11), new DL(15,12), new Tile(15,13), new Tile(15,14), new TW(15,15)]];
    }

    getBoard() {
        return this.board;
    }

    updateLetter({x: x, y: y, letter: letter, score: score}) {
        let result;
        for (let i = 0; i < this.board.length; ++i) {
            result = this.board[i].find(tile => tile.getXCoord() === x && tile.getYCoord() === y);
            if (result) {
                result.setLetter(letter);
                if (score === 0) {
                    result.setBlank();
                }
                break;
            }
        }
    };

    getLetterByCoords(x,y) {
        let result;
        for (let i = 0; i < this.board.length; ++i) {
            result = this.board[i].find(tile => tile.getXCoord() === x && tile.getYCoord() === y);
            if (result) {
                return result.getLetter();
            }
        }
        return null;
    }

    getScoreByCoords(x,y) {
        let result;
        for (let i = 0; i < this.board.length; ++i) {
            result = this.board[i].find(tile => tile.getXCoord() === x && tile.getYCoord() === y);
            if (result) {
                if (result.letter) {
                    if (result.isBlank()) {
                        return 0;
                    } else {
                        return getLetterValue(result.getLetter());
                    }
                } else {
                    return null;
                }
            }
        }
        return null;
    }

    getScoreAndLetterByCoords(x,y) {
        let result;
        for (let i = 0; i < this.board.length; ++i) {
            result = this.board[i].find(tile => tile.getXCoord() === x && tile.getYCoord() === y);
            if (result) {
                const letter = result.getLetter();
                if (letter) {
                    if (result.isBlank()) {
                        return [letter, 0];
                    } else {
                        return [letter, getLetterValue(letter)];
                    }
                }
            }
        }
        return [null, null];
    }
}


export const createNewBoard = () => {
    return new Board();
}

///// Creating the tile bag /////

class TileBag {
    constructor() {
        this.letters = new Map([['A',9],['B',2],['C',2],['D',4],['E',12],['F',2],
                                ['G',3],['H',2],['I',9],['J',1],['K',1],['L',4],
                                ['M',2],['N',6],['O',8],['P',2],['Q',1],['R',6],
                                ['S',4],['T',6],['U',4],['V',2],['W',2],['X',1],
                                ['Y',2],['Z',1],['',2]]);
    };

    //returns total amount of tiles in the bag
    getTilesRemaining () {
        let amountLeft = 0;
        this.letters.forEach((letter) => {
            amountLeft += letter;
        })
        return amountLeft;
    }

    //returns the total amount of tiles of a specific letter in the bag
    getSpecificTileAmountRemaining (tile) {
        return this.letters.get(tile);
    }

    //decreases the amount of a letter by one
    decrementTileAmountFromBag (tile) {
        this.letters.set(tile, this.letters.get(tile) - 1);
    }

    //increases the amount of a letter by one
    incrementTileAmountFromBag (tile) {
        this.letters.set(tile, this.letters.get(tile) + 1);
    }

    //takes in an amount of new tiles needed then returns an array of random tiles
    //handles decreasing the tiles in the back which are taken
    takeRandomTiles (amount) {
        let randomLetters = [], remaining, tileIndexToPick, currentIndex;

        for (let i = 0; i < amount; ++i) {

            remaining = this.getTilesRemaining();

            tileIndexToPick = Math.floor(Math.random() * remaining);

            currentIndex = 0;

            for (let [key, value] of this.letters) {
                if (value > 0) {
                    currentIndex += value;
                    if (currentIndex >= tileIndexToPick) {
                        randomLetters.push(key);
                        this.decrementTileAmountFromBag(key);
                        break;
                    }
                }
            }
        }
        return randomLetters;
    }

    //takes an array of tiles then increments the amount of those letters in the bag
    addTilesBack(tiles) {
        tiles.forEach((tile) => {
            this.incrementTileAmountFromBag(tile);
        })
    }

    //takes an array of tiles to put back, addes them back to the bag, then returns an array of new tiles
    exchangeTiles(tiles) {
        this.addTilesBack(tiles);

        return this.takeRandomTiles(tiles.length);
    }

}

///// Operations for tiles on the DOM /////

export const createNewTileBag = () => {
    return new TileBag();
}

//contains tile objects that the player has played this turn
let tilesPlayedThisTurn = [];

//clears the above array
export const resetTilesPlayed = () => {
    tilesPlayedThisTurn.length = 0;
}

export const getTilesPlayedThisTurn = () => {
    return tilesPlayedThisTurn;
}

//removes a specific tile from tilesPlayedThisTurn
export const removeTilePlayed = (tile) => {
    tilesPlayedThisTurn = tilesPlayedThisTurn.filter(el => el !== tile);
}

//creating a new scrabble tile for DOM 
export const createNewTile = (letter, letterValue) => {

    let temp = document.createElement('div');
    temp.className = 'trough-letter';
    temp.innerHTML = letter;
    temp.draggable = 'true';
    temp.id = 'draggable';
    if (letterValue) {
        let tempScore = document.createElement('div');
        tempScore.className = 'trough-score';
        tempScore.innerHTML = letterValue;
        temp.appendChild(tempScore);
    }
    let initialParent;
    //Trigger when you pick up a tile
    temp.addEventListener('mousedown', function(ev1) {

        initialParent = temp.parentElement;

        if (initialParent.className === 'trough-drop' || tilesPlayedThisTurn.includes(temp)) {

            let shiftX = ev1.clientX - temp.getBoundingClientRect().left;

            let shiftY = ev1.clientY - temp.getBoundingClientRect().top;

            temp.style.position = 'absolute';
            temp.style.zIndex = 1000;

            //Trigger when moving tile
            document.addEventListener('mousemove', function(ev2) {
                moveTile(ev2,shiftX,shiftY, temp);
            });

            //Trigger when you release/place tile
            temp.addEventListener('mouseup', function(ev3) {
                mouseUp(temp,initialParent,ev3, letterValue);
                ev3.preventDefault();
                ev3.stopImmediatePropagation();
                
            });

            temp.ondragstart = function() {return false;};
        }
    }); 
    return temp;
}

//mouse up event for when you release a tile
const mouseUp = (tile, initialParent, ev3, letterValue) => {
    const [dropZone, type] = getDropzone(ev3.clientX, ev3.clientY);
    tile.removeAttribute('style');
    if (type === "trough") {
        handleClassChange(tile, false);
        if (letterValue === 0) 
            tile.innerHTML = '';
        dropZone.appendChild(tile);
        if (dropZone.childNodes.length > 1)
            fixOrder();
        removeTilePlayed(tile);
    } else if (type === "board" && dropZone.children.length === 0) {
        handleClassChange(tile, true);
        if (letterValue === 0) 
            document.getElementById('bt-container').style.display = 'flex';
        dropZone.insertBefore(tile, dropZone.firstChild);
        if (initialParent.parentElement.parentElement.id !== "scrabble-board") 
            tilesPlayedThisTurn.push(tile);
    } else {
        if (tile.classList.contains('trough-letter-shrunk')) {
            initialParent.insertBefore(tile, initialParent.firstChild);
        } else {
            handleClassChange(tile, false);
            initialParent.appendChild(tile);
        }
    }
  document.removeEventListener('mousemove', moveTile);
  tile.onmouseup = null;
}

//add=true to shrink
//add=false to grow
const handleClassChange = (tile, add) => {
    const score = tile.childNodes[1];
    if (add) {
        tile.classList.add('trough-letter-shrunk');
        if (score)
            score.classList.add('score-shrunk');
    } else {
        tile.classList.remove('trough-letter-shrunk');
        if (score)
            score.classList.remove('score-shrunk');
    }
} 

//deduces which dropzone the tile will be placed in
const getDropzone = (cursorX, cursorY) => {
    //check if tile is being dropped in trough
    const trough = document.getElementById('tile-trough').getBoundingClientRect();

    if (cursorX > trough.left && cursorX < trough.right && cursorY > trough.top && cursorY < trough.bottom) {
          
        const troughZones = document.querySelectorAll('.trough-drop');
        for (let i = 0; i < troughZones.length; ++i) {
            const troughDrop = troughZones[i].getBoundingClientRect();
            
            if (cursorX > troughDrop.left && cursorX < troughDrop.right && cursorY > troughDrop.top && cursorY < troughDrop.bottom) {
                return [troughZones[i], "trough"];
            }
        }
    } else {
        //check if tile is being dropped on board
        const board = document.getElementById('scrabble-board').getBoundingClientRect();

        if (cursorX > board.left && cursorX < board.right && cursorY > board.top && cursorY < board.bottom){
            const boardRows = document.querySelectorAll('#board-row');
            const boardRowsLen = boardRows.length;
            let j = 0, correctRow = null;
            while (j < boardRowsLen && !correctRow) {
                const currentRow = boardRows[j].getBoundingClientRect();

                if (cursorX > currentRow.left && cursorX < currentRow.right && cursorY > currentRow.top && cursorY < currentRow.bottom) {
                    correctRow = boardRows[j];
                }
                ++j;
            }
            if (correctRow) {
                const boardZones = correctRow.children;

                for (let i = 0; i < boardZones.length; ++i) {
                    const boardDrop = boardZones[i].getBoundingClientRect();
                    
                    if (cursorX > boardDrop.left && cursorX < boardDrop.right && cursorY > boardDrop.top && cursorY < boardDrop.bottom) {
                        return [boardZones[i], "board"];
                    }
                }
            }
        }
    }
    //if the tile is dropped anywhere other than tile or board
    return [false,false];
}

//adjusts the position of a tile
const moveTile = (event, shiftX, shiftY, tile) => {
    tile.style.left = event.pageX - shiftX + 'px';
    tile.style.top = event.pageY - shiftY + 'px';
}

//Changing the order of the tiles after you rearrange them
const fixOrder = () => {
    let letters = [], indexWithTwo, indexesWithNone = [];

    //organizing the letters into the three above categories
    document.querySelectorAll('.trough-drop').forEach((letter, index) => {
        let children = letter.childNodes;
        if (children[1]) {
            indexWithTwo = index;
        } else if (children.length === 0) {
            indexesWithNone.push(index);
        }
        letters.push(letter);
    });
    //determining the index of the closest open space and how far that space is
    if (indexWithTwo || indexWithTwo === 0) {
        let correctIndex = indexesWithNone[0];
        let smallestDifference = Math.abs(correctIndex - indexWithTwo);
        
        for (let i = 1; i < indexesWithNone.length; ++i) {
            let test = Math.abs(indexesWithNone[i] - indexWithTwo);
            if(test < smallestDifference) {
                smallestDifference = test;
                correctIndex = indexesWithNone[i];
            }
        }

        //rearranging the positions of the tiles
        if (correctIndex < indexWithTwo) {
            for (let j = 0; j < smallestDifference; ++j) {
                //move the child over
                letters[correctIndex + j].appendChild(letters[correctIndex + j + 1].childNodes[0]);
            }
        } else {
            for (let k = 0; k < smallestDifference; ++k) {
                //move the child over
                letters[correctIndex - k].appendChild(letters[correctIndex - k - 1].childNodes[0]);
            }
        }
    }
}

///// Button Functions ////

//shuffles exisiting tiles and returns them
export const shuffleTiles = () => {
    let letterArray = [];
    let shuffledTiles = [];

    document.querySelectorAll('.trough-drop').forEach((tile) => {
        if (tile.children.length) {
            const letter = tile.childNodes[0].childNodes[0];
            letter ?
            letterArray.push(letter.textContent) :
            letterArray.push('');
        } else {
            letterArray.push(null)
        }
    });

    const len = letterArray.length;
    for (let i = len; i > 0; --i) {
        let randomIndex = Math.floor(Math.random() * letterArray.length);
        shuffledTiles.push(letterArray[randomIndex]);
        letterArray.splice(randomIndex,1);
    }
    return shuffledTiles;
}


export const recallTiles = () => {
    let index = 0;
    document.querySelectorAll('.trough-drop').forEach((zone) => {
        if (zone.childNodes.length === 0) {
            const currentTile = tilesPlayedThisTurn[index];
            handleClassChange(currentTile, false);
            if (currentTile.childNodes.length === 1) 
                currentTile.innerHTML = '';
            zone.appendChild(currentTile);
            ++index;
        }
    })
    resetTilesPlayed();
}


