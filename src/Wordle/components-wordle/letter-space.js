import React from 'react';
import '../css-wordle/tile-space.css'

export default function LetterSpace (props) {

    return (
        <input
        type='text'
        className='letter-space'
        id = {props.index}
        ></input>
    )
}