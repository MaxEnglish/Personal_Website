import React from 'react';
import "../css-scrabble/button.css";
import "../css-scrabble/universal.css";

export default function Button (props) {

    return (
        
        <div className='button-backing' onClick={props.clickEvent}>
            <span className='button-icon'>{props.icon}</span>
            <span className='button-title'>{props.title}</span>
        </div>
    ) 
}


