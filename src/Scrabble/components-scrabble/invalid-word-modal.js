import React from 'react';
import "../css-scrabble/invalid-word-modal.css";
import "../css-scrabble/universal.css";

export default function InvalidWordModal (props) {

    return (
        <div className='iw-container'>
            <title className='iw-title'>{props.title}</title>
            <div className='iw-text'>{props.text}</div>
            <button 
            className='okay-btn'
            onClick={props.clickEvent}
            >Okay</button>
        </div>
    ) 
}


