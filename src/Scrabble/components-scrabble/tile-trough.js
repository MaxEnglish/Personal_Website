import React, {useState, useEffect} from 'react';
import "../css-scrabble/tile-trough.css";
import "../css-scrabble/universal.css";
import {createNewTile, getLetterValue} from '../js/scrabble';

export default function TileTrough (props) {

    const [currentTiles, setCurrentTiles] = useState(props.initialTiles);

    //Check for whenever we get new tiles
    useEffect(() => {
        setCurrentTiles(props.initialTiles);
    },[props.initialTiles]);

    //Load the DOM when we get new tiles
    useEffect(() => {
        //load the current tiles to the trough
        document.querySelectorAll('.trough-drop').forEach(async (zone, index) => {
            if (zone.firstChild) {
                zone.firstChild.remove();
            }
            if (currentTiles[index] || currentTiles[index] === '') {
                const currentTile = currentTiles[index];
                const val = await getLetterValue(currentTile)
                zone.appendChild(createNewTile(currentTile, val));
            }
        });
    }, [currentTiles]);

    return (
        <div id="tile-trough" className='flex-row trough-backing shadowing'>
            {[...Array(7)].map((drop, index) => (
                <div className='trough-drop' key={index}></div>
            ))}
        </div>
    ) 
}


