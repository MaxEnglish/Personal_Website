import React,{useEffect, useState} from 'react';
import '../css-crossword/puzzle.css';
import {puzzleLoad} from '../js/crossword.js';

export default function Puzzle () {

    const letters = /^[A-Za-z]{1}$/;

    const [orientation, setOrientation] = useState(true); //true = horizontal, false = vertical

    const [currentSquare, setCurrentSquare] = useState([null, null]);

    const handleClick = (coords, dynamicOrientation) => {
        document.removeEventListener('keydown', onKeyDown);
        const selected = document.querySelector('.selected');
        if (selected)
            selected.classList.remove('selected');

        //change the orientation if we've click a square twice
        if (currentSquare[0] === coords[0] && currentSquare[1] === coords[1]) {
            setOrientation(!dynamicOrientation);
            dynamicOrientation = !dynamicOrientation;
        }
        setCurrentSquare(coords);

        //remove all the previously highlighted squares
        document.querySelectorAll('.highlighted').forEach((square) => square.classList.remove('highlighted'));
    
        //highlight the pivot square and give border
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
                        onClick={() => handleClick([x,y], orientation)}
                        >
                        </div>;
            default:
                return <div 
                        key={[x,y]}
                        className="puzzle-square" 
                        data-coords={[x,y]} 
                        onClick={() => handleClick([x,y], orientation)}
                        >
                            <span className="square-number">{char}</span>
                        </div>;
        }
    }

    const onKeyDown = (e) => {
        e.preventDefault();
        const space = document.querySelector(`[data-coords="${currentSquare}"]`);

        let nextSpaceCoords;
        orientation ?
        nextSpaceCoords = [currentSquare[0], currentSquare[1] + 1] :
        nextSpaceCoords = [currentSquare[0] + 1, currentSquare[1]];
        
        const selectedSquare = document.querySelector('.selected');
        const nextSpace = document.querySelector(`[data-coords="${nextSpaceCoords}"]`);

        if (selectedSquare && e.key !== "Backspace" && nextSpace && nextSpace.id !== "black-square")
            selectedSquare.classList.remove('selected');

        if (e.key === "Backspace") {
            if (space) {
                let previousSpaceCoords;
                orientation ?
                previousSpaceCoords = [currentSquare[0], currentSquare[1] - 1] :
                previousSpaceCoords = [currentSquare[0] - 1, currentSquare[1]];

                const previousSpace = document.querySelector(`[data-coords="${previousSpaceCoords}"]`);

                if (space.childNodes[1] || (space.childNodes[0] && space.childNodes[0].tagName !== 'SPAN')) {
                    space.childNodes[1] ?
                    space.removeChild(space.childNodes[1]) :
                    space.removeChild(space.childNodes[0]);
                } else if (previousSpace) {
                    space.classList.remove('selected');
                    setCurrentSquare(previousSpaceCoords);
                    previousSpace.classList.add('selected')
                    document.removeEventListener('keydown', onKeyDown);
                }
            }
        } else if (e.key === "Tab") {
            //find the next number
            if (space) {
                let done = false;

                if (orientation) {

                    let next = nextSpaceCoords;
                    while (!done) {
                        const nextBox = document.querySelector(`[data-coords="${next}"]`);
                        if (!nextBox) {
                            //when we go to the next row
                            const newCoords = [next[0] + 1, 0];
                            const newSquare = document.querySelector(`[data-coords="${newCoords}"]`);
                            if (newSquare.id === "black-square") {
                                next = newCoords;
                            } else {
                                done = true;
                                setCurrentSquare(newCoords);
                                newSquare.classList.add('selected');
                            }
                        } else if (nextBox.id === "black-square") {
                            done = true;
                            const newCoords = [next[0], next[1] + 1];
                            setCurrentSquare(newCoords);
                            document.querySelector(`[data-coords="${newCoords}"]`).classList.add('selected');
                        } else {
                            next = [next[0], next[1] + 1];
                        }
                    }
                } else {
                    //handle vertical
                    while (!done) {
                        let currentSquare = [currentSquare[0], currentSquare[1] + 1];
                    }
                }
            }
            document.removeEventListener('keydown', onKeyDown);

        } else if (e.key.match(letters)) {
            if (space) {
                //handle replacing current letter if space already contains one

                    if (space.childNodes[0] && space.childNodes[0].tagName !== 'SPAN') {
                        space.removeChild(space.childNodes[0])
                    } else if (space.childNodes[1]) {
                        space.removeChild(space.childNodes[1])
                    }
                

                //create a new element for the letter typed
                const textContainer = document.createElement('p');
                textContainer.appendChild(document.createTextNode(e.key.toUpperCase()))
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

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
    },[currentSquare])

    return (
        <>
            <div className='puzzle-backing'>
                {puzzleLoad.map((row, rowIndex) => (
                    <div className='puzzle-row' id={"row-" + rowIndex} key={"row-" + rowIndex}>
                        {row.map((square, squareIndex) => (
                            renderPuzzle(square, rowIndex, squareIndex)
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}