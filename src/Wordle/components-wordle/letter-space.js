import React from 'react';
import '../css-wordle/tile-space.css'

export default function LetterSpace (props) {

    const letters = /^[A-Za-z]+$/;

    return (
        <input
        type='text'
        className='letter-space'
        id = {props.index}
        onInput={(e)=> {
            let target = e.target.value;
         
            if (target.match(letters)) {
                e.target.value = target.toUpperCase();

                if (target.length > 1) {
                    target = target.slice(-1);
                    e.target.value = target.toUpperCase();
                }

                const nextSpace = document.getElementById(props.index + 1);
                if (nextSpace) {
                    nextSpace.select();
                }
            } else {
                e.target.value = '';  
            }
        }}
        ></input>
    )
}