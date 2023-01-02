import React from 'react';
import "../css-scrabble/scoreboard.css";
import "../css-scrabble/universal.css";

export default function Scoreboard (props) {

    return (
       <div className='scoreboard-container flex-col'>
            <div className='player-name'> {props.name} </div>
            <div className='score-box scoreboard-box'>Score: {props.score}</div>
            <div className='turn-number scoreboard-box'>Turn: {props.turn}</div>
       </div>
    ) 
}


