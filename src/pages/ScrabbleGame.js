import React, {useState} from 'react';
import Board from '../Scrabble/components-scrabble/board';
import TileTrough from '../Scrabble/components-scrabble/tile-trough';
import Button from '../Scrabble/components-scrabble/button';
import Scoreboard from '../Scrabble/components-scrabble/scoreboard';
import InvalidWordModal from '../Scrabble/components-scrabble/invalid-word-modal';
import BlankTileModal from '../Scrabble/components-scrabble/blank-tile-modal';
import ExchangeTileModal from '../Scrabble/components-scrabble/exchange-tiles-modal';
import '../Scrabble/css-scrabble/universal.css';
import {createNewTileBag, createNewBoard, shuffleTiles, recallTiles, resetTilesPlayed, getTilesPlayedThisTurn, getLetterValue} from '../Scrabble/js/scrabble';
import { Shuffle, ArrowDown, PlayFill, ArrowDownUp } from 'react-bootstrap-icons';

export default function ScrabbleGame () {

    const [tileBag, setTileBag] = useState(() => createNewTileBag());
    const [troughLetters, setTroughLetters] = useState(() => tileBag.takeRandomTiles(7));
    const [board, setBoard] = useState(() => createNewBoard());
    const [turn, setTurn] = useState(1);
    const [score1, setScore1] = useState(0);
    const [invalidWord, setInvalidWord] = useState({state: false, title: '', text: '', onClick: null});

    const getTilesBefore = (tile, direction) => {
        let more = true, score = 0, letters = '';
        if (direction === "h") {
            while (more) {
                const [letter, tempScore] = board.getScoreAndLetterByCoords(tile.x, tile.y - 1);
                if (letter) {
                    letters = letter + letters;
                    score += tempScore;
                    tile = {x: tile.x, y: tile.y - 1, letter: letter, modifier: null, score: tempScore};
                } else {
                    more = false;
                }
            }
        } else {
            while (more) {
                const [letter, tempScore] = board.getScoreAndLetterByCoords(tile.x - 1, tile.y);
                if (letter) {
                    letters = letter + letters;
                    score += tempScore;
                    tile = {x: tile.x - 1, y: tile.y, letter: letter, modifier: null, score: tempScore};
                } else {
                    more = false;
                }
            }
        }
        return [letters, score];
    }

    return (
        <div className='page-backing'>
            <button 
            className='toggle-scoreboard shadowing'
            onClick={()=> {
                const toggle = document.querySelector('.scoreboards');
   
                toggle.style.display === 'none' || toggle.style.display === '' ?
                toggle.style.display = 'block' :
                toggle.style.display = 'none';

                function setDisplay (board) {
                    board.style.display = 'block';
                }

                window.addEventListener('resize', () => {
                    if (window.innerWidth > 515) {
                        setDisplay(toggle);
                        window.removeEventListener('resize', setDisplay)
                    }
                })
            }}
            >Toggle Scoreboard
            </button>

            {invalidWord.state && (
                <InvalidWordModal
                    title = {invalidWord.title}
                    text = {invalidWord.text}
                    clickEvent = {invalidWord.onClick}
                />
            )}
            <BlankTileModal/>
            <ExchangeTileModal 
            letters = {troughLetters} 
            clickEvent = {() => {
                recallTiles();
                document.getElementById('et-container').style.display = 'none';
                document.getElementById('et-confirm-btn').style.display = 'none';

                let lettersToRemove = [];

                Array.from(document.getElementById('et-tiles-to-exchange').children).forEach((letter) => {
                    letter.innerHTML ?
                    lettersToRemove.push(letter.innerHTML) :
                    lettersToRemove.push('');
                });

                const newTiles = tileBag.exchangeTiles(lettersToRemove);

                const zones = document.querySelectorAll('.trough-drop');

                let letterArray = [];

                for (const zone of zones) {
                    if (zone.children.length) {
                        const tile = zone.firstChild;
                        const letter = tile.childNodes[0];

                        if (letter) {
                            if (lettersToRemove.includes(letter.textContent)) {
                                lettersToRemove.splice(lettersToRemove.indexOf(letter.textContent),1);
                                letterArray.push(null);
                                tile.remove();
                            } else {
                                letterArray.push(letter.textContent)
                            }
                        } else {
                            if (lettersToRemove.includes('')) {
                                lettersToRemove.splice(lettersToRemove.indexOf(''),1);
                                letterArray.push(null);
                                tile.remove();
                            } else {
                                letterArray.push('');
                            }
                        }
                    } else {
                        letterArray.push(null);
                    }
                }

                let index = 0;
                letterArray.forEach((letter, index2) => {
                    if (!letter && letter !== '' && index < newTiles.length) {
                        letterArray[index2] = newTiles[index];
                        ++index;
                    }
                });

                setTroughLetters(letterArray);
                setTurn(turn + 1);
                const ownedTiles = document.getElementById('et-tiles-that-own');
                Array.from(document.getElementById('et-tiles-to-exchange').children).forEach((tile) => {ownedTiles.appendChild(tile)});

            }}/>

            <div className='flex-row'>
                <div className='flex-col page-body'>
                    <div className='the-board'>
                        <Board board = {board.getBoard()}/>
                    </div>
                    <div className='flex-row page-footer'>
                        
                        <div className='side-buttons'>
                            <Button 
                            title="Recall" 
                            icon={<ArrowDown/>}
                            clickEvent={()=> {
                                recallTiles();
                            }}/>

                            <Button 
                            title="Shuffle" 
                            icon={<Shuffle/>}
                            clickEvent={()=> {
                                setTroughLetters(() => shuffleTiles());
                            }}/>
                        </div>

                        <TileTrough initialTiles = {troughLetters} bag = {tileBag}/>

                        <div className='side-buttons'>
                            <Button 
                            title="Play" 
                            icon={<PlayFill/>} 
                            clickEvent={async ()=> {

                                let tileData = [], valid = true;

                                getTilesPlayedThisTurn().forEach((tile) => {
                                    const parent = tile.parentNode, kids = tile.children;
                                    tileData.push({x: parseInt(parent.dataset.xcoord,10), 
                                                y: parseInt(parent.dataset.ycoord,10), 
                                                letter: tile.childNodes[0].textContent,
                                                modifier: parent.childNodes[1],
                                                score: kids.length ? parseInt(kids[0].innerHTML,10) : 0});
                                });

                                const tileDataLen = tileData.length;

                                if (!tileDataLen) {
                                    //error no words placed
                                    setInvalidWord({state: true, title: 'Invalid Word', text: "Oops! You can't play nothing! Please play a valid word.", onClick: ()=>setInvalidWord({state: false, title: '', text: '', onClick: null})});
                                    valid = false;
                                }

                                if ((turn === 1 || !board.getLetterByCoords(8,8)) && valid) {
                                    if (!tileData.some(tile => tile.x === 8 && tile.y === 8)) {
                                        valid = false;
                                        //error not placed in center on first move
                                        setInvalidWord({state: true, title: 'Invalid Placement', text: 'The first move of the game must overlap the center square.', onClick: ()=>setInvalidWord({state: false, title: '', text: '', onClick: null})});
                                    }
                                }

                                if (valid) {
                                    //handle direction if only one tile is played
                                    var direction = null, score = 0, DWmodifier = 0, TWmodifier = 0;
                                    if (tileDataLen === 1 && turn !== 1) {
                                        const one = tileData[0];
                                        if (board.getLetterByCoords(one.x - 1, one.y) || board.getLetterByCoords(one.x + 1, one.y)) {
                                            //vertical
                                            direction = "v";
                                        } else if (board.getLetterByCoords(one.x, one.y - 1) || board.getLetterByCoords(one.x, one.y + 1)) {
                                            //horizontal
                                            direction = "h";
                                        }
                                    };

                                    //check the axis on which the tiles are located
                                    if (direction === "h" || (tileData.every((tile) => tile.x === tileData[0].x) && !direction)) {

                                        direction = "h";

                                        tileData.sort((a,b) => {
                                            if (a.y > b.y) return 1;
                                            if (a.y < b.y) return -1;});

                                        let presentCheck = tileData[0], 
                                        nextIndex = 1,
                                        nextTilesCheck = tileData[nextIndex];
                                        const [letr, sco] = board.getScoreAndLetterByCoords(presentCheck.x, presentCheck.y + 1);
                                        let nextBoardCheck = {x: presentCheck.x, y: presentCheck.y + 1, letter: letr, modifier: null, score: sco};
                                        var letters = presentCheck.letter, existingLetter;
        
                                        if (presentCheck.modifier) {
                                            switch (presentCheck.modifier.textContent) {
                                                case "DL":
                                                    score += presentCheck.score * 2;
                                                    break;
                                                case "TL":
                                                    score += presentCheck.score * 3;
                                                    break;
                                                case "DW":
                                                    score += presentCheck.score;
                                                    ++DWmodifier;
                                                    break;
                                                case "TW":
                                                    score += presentCheck.score;
                                                    ++TWmodifier;
                                                    break;
                                            };
                                        } else {
                                            score += presentCheck.score;
                                        }
                                        
                                        while (nextTilesCheck || nextBoardCheck.letter) {
                                            
                                            if (nextTilesCheck && nextTilesCheck.y === presentCheck.y + 1) {
                                                ++nextIndex;
                                                presentCheck = nextTilesCheck;
                                                nextTilesCheck = tileData[nextIndex];
                                                const [letr1, sco1] = board.getScoreAndLetterByCoords(presentCheck.x, presentCheck.y + 1);
                                                nextBoardCheck = {x: presentCheck.x, y: presentCheck.y + 1, letter: letr1, modifier: null, score: sco1};
                                                letters += presentCheck.letter;

                                                if (presentCheck.modifier) {
                                                    switch (presentCheck.modifier.textContent) {
                                                        case "DL":
                                                            score += presentCheck.score * 2;
                                                            break;
                                                        case "TL":
                                                            score += presentCheck.score * 3;
                                                            break;
                                                        case "DW":
                                                            score += presentCheck.score;
                                                            ++DWmodifier;
                                                            break;
                                                        case "TW":
                                                            score += presentCheck.score;
                                                            ++TWmodifier;
                                                            break;
                                                    };
                                                } else {
                                                    score += presentCheck.score;
                                                }

                                            } else if (nextBoardCheck.letter) {
                                                presentCheck = nextBoardCheck;
                                                const [letr2, sco2] = board.getScoreAndLetterByCoords(presentCheck.x, presentCheck.y + 1);
                                                nextBoardCheck = {x: presentCheck.x, y: presentCheck.y + 1, letter: letr2, modifier: null, score: sco2};
                                                letters += presentCheck.letter;
                                                score += presentCheck.score;
                                                existingLetter = true;
                                            } else {
                                                valid = false;
                                                nextTilesCheck = null;
                                                //throw error for spaced out letters
                                                setInvalidWord({state: true, title: 'Invalid Word', text: 'Tiles you play must all be next to one another or existing tiles.', onClick: ()=>setInvalidWord({state: false, title: '', text: '', onClick: null})});
                                            }
                                        }
                                    } else if (direction === "v" || tileData.every((tile) => tile.y === tileData[0].y)) {
                                        
                                        direction = "v";

                                        tileData.sort((a,b) => {
                                            if (a.x > b.x) return 1;
                                            if (a.x < b.x) return -1;
                                        });

                                        let presentCheck = tileData[0], 
                                        nextIndex = 1,
                                        nextTilesCheck = tileData[nextIndex];
                                        const [letr, sco] = board.getScoreAndLetterByCoords(presentCheck.x + 1, presentCheck.y); 
                                        let nextBoardCheck = {x: presentCheck.x + 1, y: presentCheck.y, letter: letr, modifier: null, score: sco};
                                        var letters = presentCheck.letter, existingLetter;

                                        if (presentCheck.modifier) {
                                            switch (presentCheck.modifier.textContent) {
                                                case "DL":
                                                    score += presentCheck.score * 2;
                                                    break;
                                                case "TL":
                                                    score += presentCheck.score * 3;
                                                    break;
                                                case "DW":
                                                    score += presentCheck.score;
                                                    ++DWmodifier;
                                                    break;
                                                case "TW":
                                                    score += presentCheck.score;
                                                    ++TWmodifier;
                                                    break;
                                            };
                                        } else {
                                            score += presentCheck.score;
                                        }
                                        
                                        while (nextTilesCheck || nextBoardCheck.letter) {
                                            
                                            if (nextTilesCheck && nextTilesCheck.x === presentCheck.x + 1) {
                                                ++nextIndex;
                                                presentCheck = nextTilesCheck;
                                                nextTilesCheck = tileData[nextIndex];
                                                const [letr1, sco1] = board.getScoreAndLetterByCoords(presentCheck.x + 1, presentCheck.y);
                                                nextBoardCheck = {x: presentCheck.x + 1, y: presentCheck.y, letter: letr1, modifier: null, score: sco1};
                                                letters += presentCheck.letter;

                                                if (presentCheck.modifier) {
                                                    switch (presentCheck.modifier.textContent) {
                                                        case "DL":
                                                            score += presentCheck.score * 2;
                                                            break;
                                                        case "TL":
                                                            score += presentCheck.score * 3;
                                                            break;
                                                        case "DW":
                                                            score += presentCheck.score;
                                                            ++DWmodifier;
                                                            break;
                                                        case "TW":
                                                            score += presentCheck.score;
                                                            ++TWmodifier;
                                                            break;
                                                    };
                                                } else {
                                                    score += presentCheck.score;
                                                }

                                            } else if (nextBoardCheck.letter) {
                                                presentCheck = nextBoardCheck;
                                                const [letr2, sco2] = board.getScoreAndLetterByCoords(presentCheck.x + 1, presentCheck.y);
                                                nextBoardCheck = {x: presentCheck.x + 1, y: presentCheck.y, letter: letr2, modifier: null, score: sco2};
                                                letters += presentCheck.letter;
                                                score += presentCheck.score;
                                                existingLetter = true;
                                            } else {
                                                valid = false;
                                                nextTilesCheck = null;
                                                //throw error for spaced out letters
                                                setInvalidWord({state: true, title: 'Invalid Word', text: 'Tiles you play must all be next to one another or existing tiles.', onClick: ()=>setInvalidWord({state: false, title: '', text: '', onClick: null})});
                                            }
                                        }

                                    } else {
                                        valid = false;
                                        //throw error for misaligned tiles
                                        setInvalidWord({state: true, title: 'Invalid Placement', text: 'Tiles you play must all exist on the same axis. Please try again.', onClick: ()=>setInvalidWord({state: false, title: '', text: '', onClick: null})});
                                    }
                                }
                                
                                if (valid) {
                                    //get tiles before the main word
                                    const [tilesBefore, scoreBefore] = getTilesBefore(tileData[0], direction);

                                    var words = [];

                                    words.push(tilesBefore + letters);
                                    score += scoreBefore;
                                    if (DWmodifier) {score *= DWmodifier * 2;}
                                    if (TWmodifier) {score *= TWmodifier * 3;}

                                    //check for surrounding connected words
                                    if (direction === "h") {
                                        tileData.forEach((tile) => {
                                            let tempWord = tile.letter, tempScore = 0, tempTWmodifier, tempDWmodifier;
                
                                            if (tile.modifier) {
                                                switch (tile.modifier.textContent) {
                                                    case "DL":
                                                        tempScore += tile.score * 2;
                                                        break;
                                                    case "TL":
                                                        tempScore += tile.score * 3;
                                                        break;
                                                    case "DW":
                                                        tempScore += tile.score;
                                                        tempDWmodifier = true;
                                                        break;
                                                    case "TW":
                                                        tempScore += tile.score;
                                                        tempTWmodifier = true;
                                                        break;
                                                };
                                            } else {
                                                tempScore += tile.score;
                                            };
                                            
                                            let checkIndex = 1;
                                            let [checkLetter, checkScore] = board.getScoreAndLetterByCoords(tile.x - checkIndex, tile.y);

                                            while (checkLetter) {
                                                tempWord = checkLetter + tempWord;     
                                                tempScore += checkScore
                                                ++checkIndex;
                                                [checkLetter, checkScore] = board.getScoreAndLetterByCoords(tile.x - checkIndex, tile.y);
                                            };

                                            checkIndex = 1;
                                            [checkLetter, checkScore] = board.getScoreAndLetterByCoords(tile.x + checkIndex, tile.y);

                                            while (checkLetter) {
                                                tempWord += checkLetter;
                                                tempScore += checkScore;
                                                ++checkIndex;
                                                [checkLetter, checkScore] = board.getScoreAndLetterByCoords(tile.x + checkIndex, tile.y);
                                            };

                                            if (tempWord.length > 1) {
                                                tempDWmodifier ?
                                                tempScore *= 2 :
                                                tempTWmodifier ?
                                                tempScore *= 3 :
                                                null;
                                                console.log(tempScore)
                                                words.push(tempWord);
                                                score += tempScore;
                                                existingLetter = true;
                                            }
                                        })
                                    } else {

                                        tileData.forEach((tile) => {

                                            let tempWord = tile.letter, tempScore = 0, tempDWmodifier, tempTWmodifier;

                                            if (tile.modifier) {
                                                switch (tile.modifier.textContent) {
                                                    case "DL":
                                                        tempScore += tile.score * 2;
                                                        break;
                                                    case "TL":
                                                        tempScore += tile.score * 3;
                                                        break;
                                                    case "DW":
                                                        tempScore += tile.score;
                                                        tempDWmodifier = true;
                                                        break;
                                                    case "TW":
                                                        tempScore += tile.score;
                                                        tempTWmodifier = true;
                                                        break;
                                                };
                                            } else {
                                                tempScore += tile.score;
                                            }

                                            let checkIndex = 1;
                                            let [checkLetter, checkScore] = board.getScoreAndLetterByCoords(tile.x, tile.y - checkIndex);
                                           

                                            while (checkLetter) {
                                                tempWord = checkLetter + tempWord;
                                                tempScore += checkScore;
                                                ++checkIndex;
                                                [checkLetter, checkScore] = board.getScoreAndLetterByCoords(tile.x, tile.y - checkIndex);
                                            }
                            
                                            checkIndex = 1;
                                            [checkLetter, checkScore] = board.getScoreAndLetterByCoords(tile.x, tile.y + checkIndex);
                                            
                                            while (checkLetter) {
                                                tempWord += checkLetter;
                                                tempScore += checkScore;
                                                ++checkIndex;
                                                [checkLetter, checkScore] = board.getScoreAndLetterByCoords(tile.x, tile.y + checkIndex);
                                            }

                                            if (tempWord.length > 1) {
                                                tempDWmodifier ?
                                                tempScore *= 2 :
                                                tempTWmodifier ?
                                                tempScore *= 3 :
                                                null;
                                                words.push(tempWord);
                                                score += tempScore;
                                                existingLetter = true;
                                            }
                                        });
                                    }

                                    //ensure the word is connected to an existing word
                                    if (!(existingLetter || tilesBefore || (turn === 1 || !board.getLetterByCoords(8,8)))) {
                                        valid = false
                                        setInvalidWord({state: true, title: 'Invalid Placement', text: 'Tiles you play must be connected to an existing word.', onClick: ()=>setInvalidWord({state: false, title: '', text: '', onClick: null})});
                                    }
                                }

                                if (valid) {
                                    //check if words are valid
                                    for (let word of words) {
                                        if (!valid)
                                            break;
                                        word = word.toLowerCase();
                                        await fetch('https://api.wordnik.com/v4/word.json/' + word + '/scrabbleScore?api_key=ewnok8gtygsnov62psuoiwe6qckl8qfpzxa4wue8nhk14468l')
                                        .then((response) => response.json())
                                        .then((data) => {
                                        if (data.error) {
                                            valid = false;
                                            setInvalidWord({state: true, title: 'Invalid Word', text: `The word: ${word.toUpperCase()} does not exist in the dictionary. Please try again.`, onClick: ()=>setInvalidWord({state: false, title: '', text: '', onClick: null})});
                                        }
                                    })
                                    .catch(() => { 
                                        valid = false;
                                        setInvalidWord({state: true, title: 'Oops! There was a problem', text: 'Uh oh. It seemed our dictionary has stopped working! Please try again later.', onClick: ()=>setInvalidWord({state: false, title: '', text: '', onClick: null})});
                                     })
                                    }
                                }

                                if (valid) {

                                    setScore1(score1 + score);   

                                    tileData.forEach((tile) => {
                                        board.updateLetter(tile);
                                    })
                                    
                                    let emptyIndexes = [], letterArray = [];
                                    //get new tiles
                                    document.querySelectorAll('.trough-drop').forEach((tile, index1) => {
                                        if (tile.childNodes.length === 0) {
                                            emptyIndexes.push(index1);
                                            letterArray.push(null);
                                        } else {
                                            tile.childNodes[0].textContent ?
                                            letterArray.push(tile.childNodes[0].childNodes[0].textContent) :
                                            letterArray.push('');
                                        }
                                    });

                                    const newTiles = tileBag.takeRandomTiles(emptyIndexes.length);

                                    [...Array(emptyIndexes.length)].forEach((i, index2) => {
                                        letterArray[emptyIndexes[index2]] = newTiles[index2];
                                    });
                                    setTroughLetters(letterArray);

                                    /// new turn and reseting tiles played ///
                                    setTurn(turn + 1);    
                                      
                                    resetTilesPlayed();   
                                }                    
                            }}/>

                            <Button
                            title="Exchange" 
                            icon={<ArrowDownUp/>} 
                            clickEvent={()=> {
                                document.getElementById('et-container').style.display = 'flex';
                            }}/>
                        </div>

                    </div>
                </div>
                <div id='scoreboards' className='scoreboards flex-col'>
                    <Scoreboard name = "You" score = {score1} turn = {turn}/>
                </div>
            </div>
        </div>
    )
}



