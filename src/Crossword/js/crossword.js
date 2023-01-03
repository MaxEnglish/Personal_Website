
//15x15
//-1 = black space
//0 = white space
//1-x = numbered space
export const puzzleLoad = [[1,2,3,4,-1,5,6,7,8,-1,9,10,11,12,13],
                            [14,0,0,0,-1,15,0,0,0,-1,16,0,0,0,0],
                            [17,0,0,0,-1,18,0,0,0,-1,19,0,0,0,0],
                            [20,0,0,0,21,0,0,0,0,22,0,-1,23,0,0],
                            [24,0,0,0,0,-1,25,0,0,0,-1,26,0,0,0],
                            [-1,-1,27,0,0,28,0,-1,-1,29,30,0,-1,-1,-1],
                            [31,32,0,-1,-1,33,0,34,-1,35,0,0,36,37,38],
                            [39,0,0,40,41,0,0,0,42,0,0,0,0,0,0],
                            [43,0,0,0,0,0,-1,44,0,0,-1,-1,45,0,0],
                            [-1,-1,-1,46,0,0,-1,-1,47,0,48,49,0,-1,-1],
                            [50,51,52,0,-1,53,54,55,0,-1,56,0,0,57,58],
                            [59,0,0,-1,60,0,0,0,0,61,0,0,0,0,0],
                            [62,0,0,63,0,-1,64,0,0,0,-1,65,0,0,0],
                            [66,0,0,0,0,-1,67,0,0,0,-1,68,0,0,0],
                            [69,0,0,0,0,-1,70,0,0,0,-1,71,0,0,0]];

export const renderPuzzle = (char,x,y) => {
    switch (char) {
        case -1:
            return <div className="puzzle-square black-square" data-xcoord={x} data-ycoord={y} id="black-square"></div>;
        case 0:
            return <div className="puzzle-square" data-xcoord={x} data-ycoord={y}></div>;
        default:
            return <div className="puzzle-square" data-xcoord={x} data-ycoord={y}><span className="square-number">{char}</span></div>;
    }
}
