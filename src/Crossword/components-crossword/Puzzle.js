import React,{useEffect, useState} from 'react';
import '../css-crossword/puzzle.css';
import {puzzleLoad, clues} from '../js/crossword.js';

export default function Puzzle () {

    const letters = /^[A-Za-z]{1}$/;

    const [orientation, setOrientation] = useState(true); //true = horizontal, false = vertical

    const [currentSquare, setCurrentSquare] = useState([null, null]);

    ///// Auxilliary Functions /////

    const updateHighlighting = (dynamicOrientation, coords) => {

        document.removeEventListener('keydown', onKeyDown);

        setCurrentSquare(coords);

        document.querySelectorAll('.highlighted').forEach((square) => square.classList.remove('highlighted'));

        const selectedSquare = document.querySelector(`[data-coords="${coords}"]`);
        selectedSquare.classList.add('highlighted');
        selectedSquare.classList.add('selected');

        //find which squares need to be highlighted
        if (dynamicOrientation) {
            let left = true, right = true, leftCounter = 1, rightCounter = 1;
            while (left || right) {
                if (left) {
                    const leftSquare = document.querySelector(`[data-coords="${[coords[0],coords[1] - leftCounter]}"]`);
                    if (leftSquare && leftSquare.id !== "black-square") {
                        leftSquare.classList.add('highlighted');
                        ++leftCounter
                    } else {
                        left = false;
                    }
                };
                if (right) {
                    const rightSquare = document.querySelector(`[data-coords="${[coords[0],coords[1] + rightCounter]}"]`);
                    if (rightSquare && rightSquare.id !== "black-square") {
                        rightSquare.classList.add('highlighted');
                        ++rightCounter
                    } else {
                        right = false;
                    }
                }
            }
        } else {
            let top = true, bottom = true, topCounter = 1, bottomCounter = 1;
            while (top || bottom) {
                if (top) {
                    const topSquare = document.querySelector(`[data-coords="${[coords[0] - topCounter,coords[1]]}"]`);
                    if (topSquare && topSquare.id !== "black-square") {
                        topSquare.classList.add('highlighted');
                        ++topCounter
                    } else {
                        top = false;
                    }
                };
                if (bottom) {
                    const bottomSquare = document.querySelector(`[data-coords="${[coords[0] + bottomCounter,coords[1]]}"]`);
                    if (bottomSquare && bottomSquare.id !== "black-square") {
                        bottomSquare.classList.add('highlighted');
                        ++bottomCounter
                    } else {
                        bottom = false;
                    }
                }
            }
        }
    }

    //Board click event function
    const handleClick = (coords, dynamicOrientation, target) => {

        //remove the clue selection
        const prevClue = document.querySelector('.clue-clicked');
        if (prevClue) prevClue.classList.remove('clue-clicked');

        //getting the clue number
        let num;
        if (!target.id) target = target.parentElement;
        const spans = target.getElementsByTagName('SPAN');
        if (spans.length > 0) {
            num = spans[0].textContent;
        }

        //change the orientation if we've click a square twice
        if (currentSquare[0] === coords[0] && currentSquare[1] === coords[1]) {
                setOrientation(!dynamicOrientation);
                dynamicOrientation = !dynamicOrientation;
        }

        //remove selected square
        const selected = document.querySelector('.selected');
        if (selected) selected.classList.remove('selected');

        //correct label for clue getting
        let string;
        dynamicOrientation ?
        string = '-across' :
        string = '-down';
        
        //finding the correct clue if we clicked on a numbered square directly
        let correctClue;
        if (num) correctClue = document.getElementById(num + string);
        
        //finding the correct clue if we didn't click on a numbered square directly
        if (!num || !correctClue) {
            let nextCoords = coords;
            if (dynamicOrientation) {
                while (!correctClue) {
                    nextCoords = [nextCoords[0], nextCoords[1] - 1]
                    const testSpace = document.querySelector(`[data-coords="${nextCoords}"]`);
                    if (testSpace.id !== 0) {
                        correctClue = document.getElementById(testSpace.id + string);
                    }
                }
            } else {
                while (!correctClue) {
                    nextCoords = [nextCoords[0] - 1, nextCoords[1]]
                    const testSpace = document.querySelector(`[data-coords="${nextCoords}"]`);
                    if (testSpace.id !== 0) {
                        correctClue = document.getElementById(testSpace.id + string);
                    }
                }
            }
        } 
        
        //selecting and scrolling into view the correct clue
        correctClue.scrollIntoView({ behavior: 'smooth', block: 'center' });
        correctClue.classList.add('clue-clicked');
         
        //remove existing and add new highlighting
        updateHighlighting(dynamicOrientation, coords);
        
    }

    //holds key for rendering the board layout
    const renderPuzzle = (char,x,y) => {
        switch (char) {
            case -1:
                return <div 
                        key={[x,y]}
                        className="puzzle-square black-square" 
                        data-coords={[x,y]} 
                        id="black-square"
                        >
                        </div>;
            case 0:
                return <div 
                        key={[x,y]}
                        className="puzzle-square" 
                        data-coords={[x,y]} 
                        id= {char}
                        onClick={(event) => handleClick([x,y], orientation, event.target)}
                        >
                        </div>;
            default:
                return <div 
                        key={[x,y]}
                        className="puzzle-square" 
                        data-coords={[x,y]} 
                        id= {char}
                        onClick={(event) => handleClick([x,y], orientation, event.target)}
                        >
                            <span className="square-number">{char}</span>
                        </div>;
        }
    }

    //trigger on keypress
    const onKeyDown = (e) => {
        e.preventDefault();
        
        //current space DOM element
        const space = document.querySelector(`[data-coords="${currentSquare}"]`);

        if (space) {
            const key = e.key;

            let nextSpaceCoords;
            orientation ?
            nextSpaceCoords = [currentSquare[0], currentSquare[1] + 1] :
            nextSpaceCoords = [currentSquare[0] + 1, currentSquare[1]];
            
            const selectedSquare = document.querySelector('.selected');
            const nextSpace = document.querySelector(`[data-coords="${nextSpaceCoords}"]`);

            //conditionals for removing the selected square
            if ((selectedSquare && key !== "Backspace" && nextSpace && nextSpace.id !== "black-square" && key.match(letters)) || key === "Tab")
                selectedSquare.classList.remove('selected');

            if (key === "Backspace") {
                let previousSpaceCoords;
                orientation ?
                previousSpaceCoords = [currentSquare[0], currentSquare[1] - 1] :
                previousSpaceCoords = [currentSquare[0] - 1, currentSquare[1]];

                const previousSpace = document.querySelector(`[data-coords="${previousSpaceCoords}"]`);

                if (space.childNodes[1] || (space.childNodes[0] && space.childNodes[0].tagName !== 'SPAN')) {
                    //handle removing character
                    space.childNodes[1] ?
                    space.removeChild(space.childNodes[1]) :
                    space.removeChild(space.childNodes[0]);
                } else if (previousSpace && previousSpace.id !== 'black-square') {
                    //handle moving back a space
                    space.classList.remove('selected');
                    setCurrentSquare(previousSpaceCoords);
                    previousSpace.classList.add('selected')
                    document.removeEventListener('keydown', onKeyDown);
                }
            } else if (key === "Tab") {
                document.querySelector('.clue-clicked').classList.remove('clue-clicked');
                //find the next number
                let done = false;

                if (orientation) {
                    //handle horizontal
                    let next = nextSpaceCoords;     //current iterator
                    let nextBehind = [nextSpaceCoords[0], nextSpaceCoords[1] - 1];  //space before current iterator
                    while (!done) {
                        const nextBox = document.querySelector(`[data-coords="${next}"]`);  //element corrosponding to next
                        const nextBoxBehind = document.querySelector(`[data-coords="${nextBehind}"]`);  //element corrosponding to nextBehind
                        if (!nextBox) {
                            //handle if iterator reaches end of board
                            if (next[1] > 13) {
                                next = [next[0] + 1, 0];
                                nextBehind = [nextBehind[0] + 1, -1]
                            } else {
                                next = [0,0];
                                nextBehind = [0,-1]
                            }  
                        } else if (nextBox.id === "black-square") {
                            //handle if iterator reaches a black square
                            next = [next[0], next[1] + 1];
                            nextBehind = [nextBehind[0], nextBehind[1] + 1]
                        } else {
                            if (!nextBoxBehind || nextBoxBehind.id === 'black-square') {
                                //correct spot
                                const correctClue =  document.getElementById(nextBox.childNodes[0].innerText + '-across');
                                correctClue.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                correctClue.classList.add('clue-clicked');
                                updateHighlighting(orientation, next);
                                done = true;
                            } else {
                                next = [next[0], next[1] + 1];
                                nextBehind = [nextBehind[0], nextBehind[1] + 1];
                            }
                        }
                    }
                } else {
                    //handle vertical
                    let next = [currentSquare[0], currentSquare[1] + 1];    //current iterator
                    let nextAbove = [currentSquare[0] - 1, currentSquare[1] + 1];   //space above current iterator
                    while (!done) {
                        const nextBox = document.querySelector(`[data-coords="${next}"]`);  //element corrosponding to next
                        const nextBoxAbove = document.querySelector(`[data-coords="${nextAbove}"]`);    //element corrosponding  to nextAbove
                        if (!nextBox) {
                            //handle iterator reaching end of board
                            if (next[0] < 13) {
                                next = [next[0] + 1, 0];
                                nextAbove = [nextAbove[0] + 1, 0];
                            } else {
                                next = [0,0];
                                nextAbove = [-1,0]
                            }
                        } else if (nextBox.id === "black-square") {
                            //handle iterator hitting black square
                            next = [next[0], next[1] + 1];
                            nextAbove = [nextAbove[0], nextAbove[1] + 1]
                        } else {
                            if (!nextBoxAbove || nextBoxAbove.id === 'black-square') {
                                //correct spot
                                done = true;
                                const correctClue =  document.getElementById(nextBox.children[0].innerText + '-down')
                                correctClue.scrollIntoView({ behavior: 'smooth', block: 'center'});
                                correctClue.classList.add('clue-clicked');
                                updateHighlighting(orientation, next)
                            } else {
                                next = [next[0], next[1] + 1];
                                nextAbove = [nextAbove[0], nextAbove[1] + 1];
                            }
                        }
                    }
                }
            } else if (key.match(letters)) {
                //handle replacing current letter if space already contains one
                if (space.childNodes[0] && space.childNodes[0].tagName !== 'SPAN') {
                    space.removeChild(space.childNodes[0])
                } else if (space.childNodes[1]) {
                    space.removeChild(space.childNodes[1])
                }
                
                //create a new element for the letter typed
                const textContainer = document.createElement('p');
                textContainer.appendChild(document.createTextNode(key.toUpperCase()))
                space.appendChild(textContainer);

                //handle setting the next square
                if (nextSpace && nextSpace.id !== "black-square") {
                    nextSpace.classList.add('selected');
                    setCurrentSquare(nextSpaceCoords);
                    document.removeEventListener('keydown', onKeyDown);
                }
            }
        }
    }

    const goToClue = (number, across) => {
        const correctSquareCoords = document.getElementById(number).dataset.coords;
        const indexOfComma = correctSquareCoords.indexOf(',');
        const parsedCoords = [parseInt(correctSquareCoords.substring(0,indexOfComma),10), parseInt(correctSquareCoords.substring(indexOfComma + 1, correctSquareCoords.length, 10))];

        const selectedSquare = document.querySelector('.selected');
        if (selectedSquare) selectedSquare.classList.remove('selected');

        updateHighlighting(across, parsedCoords);
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
    }, [currentSquare]);

    return (
        <div className='page-backing'>
            <div className='crossword-backing'>
                <div className='puzzle-clues'>
                    <header className='clues-header'>Across</header>
                    {clues[0].map((clue, acrossIndex) => (
                        <div 
                        className='clue' 
                        key={acrossIndex}
                        id={clue.number + '-across'}
                        onClick={(e)=> {
                            const clicked = document.querySelector('.clue-clicked');
                            if (clicked) clicked.classList.remove('clue-clicked');

                            e.target.classList.contains('clue') ?
                            e.target.classList.add('clue-clicked') :
                            e.target.parentElement.classList.add('clue-clicked');

                            goToClue(clue.number, true);
                        }}
                        >
                            <div className='clue-number'>{clue.number}</div>
                            <div className='clue-text'>{clue.clue}</div>
                        </div>
                    ))}
                    <hr className='separator'/>
                    <header className='clues-header'>Down</header>
                    {clues[1].map((clue, downIndex) => (
                        <div 
                        className='clue' 
                        key={downIndex}
                        id={clue.number + '-down'}
                        onClick={(e)=> {
                            const clicked = document.querySelector('.clue-clicked');
                            if (clicked) clicked.classList.remove('clue-clicked');

                            e.target.classList.contains('clue') ?
                            e.target.classList.add('clue-clicked') :
                            e.target.parentElement.classList.add('clue-clicked');
                            
                            goToClue(clue.number, false);
                        }}
                        >
                            <div className='clue-number'>{clue.number}</div>
                            <div className='clue-text'>{clue.clue}</div>
                        </div>
                    ))}
                </div>
                <div className='puzzle-backing'>
                    {puzzleLoad.map((row, rowIndex) => (
                        <div className='puzzle-row' id={"row-" + rowIndex} key={"row-" + rowIndex}>
                            {row.map((square, squareIndex) => (
                                renderPuzzle(square, rowIndex, squareIndex)
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}