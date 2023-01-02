import React from 'react';
import "../css-scrabble/blank-tile-modal.css";
import "../css-scrabble/universal.css";
import {removeTilePlayed} from '../js/scrabble';

export default function BlankTileModal () {

    const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    return (
        <div className='bt-container' id="bt-container">
            <title className='bt-title'>Pick a Letter</title>
            <div className='bt-body'>
                {alphabet.map((letter,i) => (
                    <div className='bt-letter' 
                    key={i} 
                    onClick={(e) => {
                        const highlightedTile = document.querySelector('.bt-highlighted');
                        if (highlightedTile)
                            highlightedTile.classList.remove('bt-highlighted');
                        e.target.classList.add('bt-highlighted');
                        document.getElementById('bt-confirm-btn').style.display = 'block';
                    }}
                    >
                    {letter}
                    </div>
                ))}
            </div>
            <div className='bt-footer'>
                <button
                className='bt-cancel-btn bt-btn'
                onClick={()=> {
                    document.getElementById('bt-container').style.display = 'none';
                    const editTile = Array.from(document.querySelectorAll('#draggable')).find(tile => !tile.children.length && tile.classList.contains('trough-letter-shrunk'));
                    removeTilePlayed(editTile);
                    if (editTile.innerHTML) 
                        editTile.innerHTML = '';
                    editTile.classList.remove('trough-letter-shrunk');
                    const availableSpace = Array.from(document.querySelectorAll('.trough-drop')).find(zone => !zone.children.length);
                    availableSpace.appendChild(editTile);
                    const highlightedTile = document.querySelector('.bt-highlighted');
                    if (highlightedTile)
                        highlightedTile.classList.remove('bt-highlighted');
                    document.getElementById('bt-confirm-btn').style.display = 'none';
                }}
                >Cancel</button>

                <button 
                id="bt-confirm-btn"
                className='bt-confirm-btn bt-btn'
                onClick={()=> {
                    const highlightedTileText = document.querySelector('.bt-highlighted').innerHTML;
                    const editTile = Array.from(document.querySelectorAll('#draggable')).find(tile => !tile.children.length && tile.classList.contains('trough-letter-shrunk'));
                    
                    editTile.innerHTML = highlightedTileText;
                    document.getElementById('bt-container').style.display = 'none';
                    const highlightedTile = document.querySelector('.bt-highlighted');
                    if (highlightedTile)
                        highlightedTile.classList.remove('bt-highlighted');
                    document.getElementById('bt-confirm-btn').style.display = 'none';
                }}
                >Confirm</button>
            </div>
            
        </div>
    ) 
}


