import React, {useEffect} from 'react';
import LetterSpace from '../Wordle/components-wordle/letter-space';

export default function WordleGame () {

    const letters = /^[A-Za-z]{1}$/;
    const endPoints = [3,7,11,15];
    const startPoints = [0,4,8,12];
    var inFetch = false;
    var theWord = 'FREE';

    const getValueOfRow = (rowNum) => {
        let finalString = '';
        Array.from(document.getElementById(rowNum).children).forEach((space) => {
            finalString += space.value;
        });
        return finalString.toLowerCase();
    }

    useEffect(()=> {
        document.addEventListener('keydown', async (e)=> {
            e.preventDefault();
            const id = parseInt(e.target.id,10);

            if (!inFetch) {
                //user press backspace
                if (e.key === 'Backspace') {
                    if (e.target.value)
                        e.target.value = '';
                    if (!startPoints.includes(id)){
                        document.getElementById(id - 1).select();
                    }
                //user press a letter
                } else if (e.key.match(letters)) {
                    document.getElementById(id).value = e.key.toUpperCase();
                    if (!endPoints.includes(id))
                        document.getElementById(id + 1).select();
                //user press Enter
                } else if (e.key === "Enter" && endPoints.includes(id) && e.target.value.match(letters)) {
                    
                    inFetch = true;

                    const word = getValueOfRow(e.target.parentElement.id);

                    await fetch('https://api.wordnik.com/v4/word.json/' + word + '/scrabbleScore?api_key=ewnok8gtygsnov62psuoiwe6qckl8qfpzxa4wue8nhk14468l')
                    .then((response) => response.json())
                    .then((data) => {
                        const spaces = Array.from(e.target.parentElement.children);
                        if (!data.value) {
                            e.target.style.outline = 'none';
                            spaces.forEach((space) => {
                                space.style.animation = 'shake .5s'
                            });
                        } else {
                            e.target.classList.add('no-outline');
                            const word = [...theWord];
                            var counter = 0;
                            spaces.forEach((space, index) => {
                                const val = space.value;
                                setTimeout(() => {
                                    if (val === word[index]) {
                                        space.classList.add('my-green');
                                        ++counter;
                                    } else if (word.includes(val)) {
                                        space.classList.add('my-yellow')
                                    } else {
                                        space.classList.add('my-gray')
                                    }
                                }, index * 800) 
                            })

                            setTimeout(()=> {
                                if (counter === 4) {
                                    //show winning modal
                            } else if (id !== 15) {
                                document.getElementById(parseInt(id,10) + 1).select();
                            } else {
                                //show losing modal
                            }
                            
                        }, 3200) ;

                        }
                        setTimeout(() => {
                            spaces.forEach((space) => {
                                space.style = null;
                            })
                        },500);
                        
                    })
                    .catch((err) => { 
                        console.log(err);
                    })

                    inFetch = false;   
                }
            }
        }); 

        document.getElementById(0).select();

        document.addEventListener('mousedown', (e) => e.preventDefault())
    },[])

    return (
        <>
            <header>FREE</header>
            {[...Array(4)].map((row, rowNum) => (
                <div className='wordle-row' key={'row-' + rowNum} id={'row-' + rowNum}>
                {[...Array(4)].map((space, i) => (
                    <LetterSpace key = {i} index = {rowNum * 4 + i}/>
                ))}
                </div> 
            ))}
        </>
    )
}

