import React from 'react';
import '../css-wordle/keyboard.css'

export default function Keyboard () {

    const letters = [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['Enter','Z','X','C','V','B','N','M','Backspace']]

    return (
        <div className='keyboard-container'>
            {letters.map((row, rowIndex) => (
                <div className='keyboard-row' key={'keyboard-row-' + rowIndex}>
                    {row.map((letter, letterIndex) => (
                        <button className='keyboard-letter' key={'keyboard-letter-' + letterIndex}>{letter}</button>
                    ))}
                </div>
            ))}
        </div>
    )
}