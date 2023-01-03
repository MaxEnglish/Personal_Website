import React,{useEffect, useState} from 'react';
import '../css-crossword/puzzle.css';
import {puzzleLoad} from '../js/crossword.js';

export default function Puzzle () {

    const letters = /^[A-Za-z]{1}$/;

    const [orientation, setOrientation] = useState(true); //true = horizontal, false = vertical

    const [currentSquare, setCurrentSquare] = useState([null, null]);

    const handleClick = (coords, dynamicOrientation) => {
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

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === "backspace") {

            } else if (e.key === "backspace") {

            } else if (e.key.match(letters)) {
                const space = document.querySelector(`[data-coords="${currentSquare}"]`);
                if (space) {
                    space.textContent = e.key;
                }
                console.log(space.getAttribute('data-coords'))
                const coords = space.getAttribute('data-coords');
                const commaIndex = coords.indexOf(',');
                if (orientation) {
                    setCurrentSquare([parseInt(coords.substring(0,commaIndex),10),parseInt(coords.substring(commaIndex, -1),10) + 1])
                } else {
                    setCurrentSquare([parseInt(coords.substring(0,commaIndex),10) + 1,parseInt(coords.substring(commaIndex, -1),10)])
                }

            }
        })
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