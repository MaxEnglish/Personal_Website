import React, {useState, useEffect} from 'react';
import LetterSpace from '../Wordle/components-wordle/letter-space';

export default function WordleGame () {

    const [iteration, setIteration] = useState(0);

    const letters = /^[A-Za-z]+$/;

    useEffect(()=> {
        document.addEventListener('keydown', (e)=> {
            if (e.key === 'Backspace' && e.target.tagName === "INPUT") {
                e.preventDefault()
                if (e.target.value)
                    e.target.value = '';
                if (e.target.id !== '0'){
                    document.getElementById(e.target.id - 1).select();
                }
            }
        });

        
    },[])

    return (
        <>
            {[...Array(4)].map((row, rowNum) => (
                <div className='wordle-row' key={rowNum}>
                {[...Array(4)].map((space, i) => (
                    <LetterSpace key = {i} index = {rowNum * 4 + i}/>
                ))}
                </div> 
            ))}
        </>
    )
}

