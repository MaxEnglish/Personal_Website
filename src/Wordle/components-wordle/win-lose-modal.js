import React from 'react';
import '../css-wordle/win-lose-modal.css'

export default function WinLoseModal (props) {

    return (
       <div className='wl-container'>
            <header className='wl-title'>{props.title}</header>
            <p className='wl-text'>{props.text}</p>
            <button onClick={props.close} className='wl-btn'>Close</button>
       </div>
    )
}