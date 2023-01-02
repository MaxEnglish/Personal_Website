import React from 'react';
import "../css-scrabble/exchange-tiles-modal.css";
import "../css-scrabble/universal.css";

export default function ExchangeTileModal (props) {

    return (
        <div className='et-container' id="et-container">
            <title className='et-title'>Select tiles to exchange</title>
            <div className='et-body'>
                <div className='et-tiles-to-exchange' id="et-tiles-to-exchange"></div>
                <div className='et-tiles-that-own' id="et-tiles-that-own">
                    {(props.letters).map((letter, i) => (
                        <div 
                        key={i}
                        className='et-letter'
                        onClick={(e)=> {
                            const tile = e.target;
                            const parentId = tile.parentElement.id;
                            if (parentId === "et-tiles-that-own") {
                                document.getElementById('et-tiles-to-exchange').appendChild(tile);
                                document.getElementById('et-confirm-btn').style.display = 'block';
                            } else {
                                document.getElementById('et-tiles-that-own').appendChild(tile);
                                if (!document.getElementById('et-tiles-to-exchange').children.length) 
                                    document.getElementById('et-confirm-btn').style.display = 'none';
                            }
                        }}
                        >{letter}</div>
                    ))}
                </div>
            </div>
            <div className='et-footer'>
                <button
                className='et-cancel-btn et-btn'
                onClick={()=> {
                    document.getElementById('et-container').style.display = 'none';
                    document.getElementById('et-confirm-btn').style.display = 'none';
                    const ownedTiles = document.getElementById('et-tiles-that-own');
                    Array.from(document.getElementById('et-tiles-to-exchange').children).forEach((tile) => {ownedTiles.appendChild(tile)});
                }}
                >Cancel</button>

                <button 
                id="et-confirm-btn"
                className='et-confirm-btn bt-btn'
                onClick={props.clickEvent}
                >Done</button>
            </div>
        </div>
    ) 
}


