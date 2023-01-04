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
                if (space.childNodes[1]) {
                    space.removeChild(space.childNodes[1])
                } else {
                    setCurrentSquare(nextSpaceCoords);
                    nextSpace.classList.add('selected')
                    document.removeEventListener('keydown', onKeyDown);
                }
                
            }
        } else if (e.key === "tab") {

        } else if (e.key.match(letters)) {
            if (space) {
                
                //fill in letter
                const firstChild = space.childNodes[0];
                if (firstChild) {
                    const check = space.childNodes[0].tagName === 'SPAN';
                
                    if ((check && space.childNodes[1])) {
                        space.removeChild(space.childNodes[1])
                    } else if ((!check && space.childNodes[0])) {
                        space.removeChild(space.childNodes[0])
                    }
                }

                const textContainer = document.createElement('p');
                textContainer.classList.add('center-text')
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