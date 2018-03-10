//This is the 'dictionary' of words that our game will rely on
var theWords = ["island", "coconut", "wave", "aloha"]

// Choose a word at random
var getRandomNumber = Math.floor(Math.random() * theWords.length)
var guessWord = theWords[getRandomNumber]
var displayWord = [];
var badLetters = [];

var allowedGuesses = 13

//An Array of booleans meant to track what letters have been guessed or not
var ourWordTable = [];
for (var i = 0; i < guessWord.length; i++) {
	ourWordTable.push(false);
	displayWord.push('_')
}

function updateDisplayWord(){
	for (var i = 0; i < guessWord.length; i++)
	{
		// If false, set letter to '-'
		if (!ourWordTable[i])
		{
			displayWord[i] = '_'
		}
		else
		{
			displayWord[i] = guessWord[i]
		}
	}	
}

console.log

document.onkeyup = function(event) {
    var guessKey = event.key

    console.log("got key " + guessKey + "index is " + guessWord.indexOf(guessKey))

    if (guessWord.indexOf(guessKey) > -1)
    {
    	for (var i = 0; i < guessWord.length; i++)
    	{
    		if (guessWord[i] === guessKey)
    		{
    			ourWordTable[i] = true;
    		}
    	}
    }
    else {
    	badLetters.push(guessKey)
    	allowedGuesses--;
    }

    updateDisplayWord();

    document.getElementById("guess-word").innerHTML = displayWord;
    document.getElementById("num-user-guesses").innerHTML = allowedGuesses;
    document.getElementById("guessed-letters").innerHTML = badLetters;
}

