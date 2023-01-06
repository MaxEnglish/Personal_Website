
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



//First array are acrosses, second are downs
export const clues = [[{number: 1, clue: "DC Donors", answer: ""},{number: 5, clue: "Old Icelandic Literature", answer: ""}, 
                       {number: 9, clue: "Himilayan Land", answer: ""}, {number: 14, clue: "Model Macpherson", answer: ""}, 
                       {number: 15, clue: "Socially clueless one", answer: ""}, {number: 16, clue: "Steer clear of", answer: ""},
                       {number: 17, clue: "Chimney Schmultz", answer: ""}, {number: 18, clue: "No longer mint", answer: ""},
                       {number: 19, clue: "Hart-to-combine gas", answer: ""}, {number: 20, clue: "It may be on the house", answer: ""},
                       {number: 23, clue: "John's 'Exodus' role", answer: ""}, {number: 24, clue: "Signed, informally", answer: ""},
                       {number: 25, clue: "Writer Sarah ___ Jewett", answer: ""}, {number: 26, clue: "Straw in the wind", answer: ""}, 
                       {number: 27, clue: "Revert to 12:00, say", answer: ""}, {number: 29, clue: "Mushy food", answer: ""},
                       {number: 31, clue: "GI address", answer: ""}, {number: 33, clue: "Numeral in a Uris title", answer: ""},
                       {number: 35, clue: "Inpenetrable, in a way", answer: ""},{number: 39, clue: "Brief bio, maybe", answer: ""},
                       {number: 43, clue: "San ___ 'site of Hearst's castle'", answer: ""},{number: 44, clue: "Prefix with dermis", answer: ""},
                       {number: 45, clue: "Clerical vestment", answer: ""},{number: 46, clue: "Target for a quarterback", answer: ""},
                       {number: 47, clue: "Obie contender", answer: ""}, {number: 50, clue: "Issue a caveat to", answer: ""},
                       {number: 53, clue: "Rebuke from Caeser", answer: ""}, {number: 56, clue: "Straight: Prefix", answer: ""},
                       {number: 59, clue: "Lacto-___-vegetarian", answer: ""},{number: 60, clue: "Daniel Boone, for one", answer: ""},
                       {number: 62, clue: "Sal of 'Rebel Without a Cause'", answer: ""},{number: 64, clue: "1997 role for Fonda", answer: ""},
                       {number: 65, clue: "Triangle tone", answer: ""},{number: 66, clue: "Little green man", answer: ""},
                       {number: 67, clue: "Kennel guests", answer: ""},{number: 68, clue: "Sicilian spewer", answer: ""},
                       {number: 69, clue: "Fran Drescher role", answer: ""},{number: 70, clue: "Flying 'A' competitor", answer: ""},
                       {number: 71, clue: "Penn name?", answer: ""}],
                       //Down
                       [{number: 1, clue: "Joe of 'GoodFellas'", answer: ""}, {number: 2, clue: "Crazy as ___", answer: ""},
                       {number: 3, clue: "Legislative-chamber adjunct", answer: ""}, {number: 4, clue: "Couch potato's perch", answer: ""},
                       {number: 5, clue: "Sufficient, slangily", answer: ""}, {number: 6, clue: "Like Stalin", answer: ""},
                       {number: 7, clue: "Bleak, in verse", answer: ""}, {number: 8, clue: "Contribute to the mix", answer: ""},
                       {number: 9, clue: "Barbershop call", answer: ""}, {number: 10, clue: "Party time, perhaps", answer: ""},
                       {number: 11, clue: "Airline that flew Clippers, for short", answer: ""}, {number: 12, clue: "Be gaga over", answer: ""},  
                       {number: 13, clue: "1917 revolution leader", answer: ""}, {number: 21, clue: "'___ bodkins!'", answer: ""},
                       {number: 22, clue: "Patronizing, in a way", answer: ""}, {number: 26, clue: "Autumn birthstone", answer: ""},
                       {number: 28, clue: "Former ring champ Holyfield", answer: ""}, {number: 30, clue: "NYPD broadcast", answer: ""},
                       {number: 31, clue: "Sit-ups strengthen them", answer: ""}, {number: 32, clue: "Islands dish", answer: ""},
                       {number: 34, clue: "Five-star nickname", answer: ""}, {number: 36, clue: "Metamorphosed sandstone", answer: ""},
                       {number: 37, clue: "http://www.macnamarasband.com, e.g.", answer: ""}, {number: 38, clue: "Drop in the tide", answer: ""},
                       {number: 40, clue: "Sharp as a tack", answer: ""}, {number: 41, clue: "Rock's Bon Jovi", answer: ""},
                       {number: 42, clue: "Uniform adornments", answer: ""}, {number: 48, clue: "'My mama done ___ me...'", answer: ""},
                       {number: 49, clue: "Speaks from the soapbox", answer: ""}, {number: 50, clue: "Nonvoter before 1920", answer: ""},
                       {number: 51, clue: "St. Theresa's birthplace", answer: ""}, {number: 52, clue: "De Niro film of '98", answer: ""},
                       {number: 54, clue: "Hosiery shade", answer: ""}, {number: 55, clue: "Pagoda rooting materials", answer: ""},
                       {number: 57, clue: "Salon tint", answer: ""}, {number: 58, clue: "Heart, but not soul", answer: ""},
                       {number: 60, clue: "Cereal-huckstering feline", answer: ""}, {number: 61, clue: "Anka's 'Eso___'", answer: ""},
                       {number: 63, clue: "Bard's nightfall", answer: ""}]];

