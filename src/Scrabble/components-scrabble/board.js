import React from 'react';
import "../css-scrabble/board.css";
import "../css-scrabble/universal.css";

export default function Board (props) {

    return (
        <div id="scrabble-board" className='board-background shadowing'>
            {props.board && props.board.map((row, rowIndex) => (
                <div id="board-row" className="flex-row" key={rowIndex}>
                {row.map((tile, tileIndex) => (
                    <div id="board-drop" className={`tile-default ${tile.getColor()}`} key={rowIndex + tileIndex} data-xcoord={tile.getXCoord()} data-ycoord={tile.getYCoord()}>
                        {tile.getTitle()}
                    </div>
                ))}
                </div>
            ))}
        </div>
    ) 
}
