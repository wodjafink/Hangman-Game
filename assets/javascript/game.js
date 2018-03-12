//This is the 'dictionary' of words that our game will rely on
var theWords = ["island", "coconut", "wave", "aloha", ]

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

// Since javascript has no native support for if a character is alphabetic,
// I created this function so that the player won't get docked for entering 
// a key that isn't alphabetic.  What's interesting is that if you press the
// 'shift' key to the onKey event, the value of the string is 'Shift' which
// will pass a regex that checks if a character is alphabetic.  So had to add
// a check to see if the length is greater than 1.
function isAlphabetic(s){
	if (s.length > 1)
		return false;

	if (s.match(/[a-z]/i) === null)
	{
		console.log("Non-alpha key is " + s)
		return false;
	}
	else
	{
		return true;
	}
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

// This will return true if all the entries of ourWordTable are true
function checkWin()
{
	for(var i = 0; i < ourWordTable.length; i++){
		if( !(ourWordTable[i]))
			return false
	}
	console.log('A WINNER IS YOU')
	return true
}

// Am I using functions right
function updateHTML()
{
	document.getElementById("guess-word").innerHTML = displayWord.join(" ");
	document.getElementById("num-user-guesses").innerHTML = allowedGuesses;
	document.getElementById("guessed-letters").innerHTML = badLetters.join(" ");
}

// This is pretty sweet because it'll run when the page loads.  So I can set up the
// 'dynamic HTML' or whatever right away rather than waiting for the first characters to be pressed
window.onload = function(event)
{
	updateHTML();
}

document.onkeyup = function(event) {
    var guessKey = event.key;
    guessKey = guessKey.toLowerCase();
    console.log("got key " + guessKey + " index is " + guessWord.indexOf(guessKey));

    if ((allowedGuesses > 0) && !(checkWin()))
    {
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
	    	if ((badLetters.indexOf(guessKey) === -1) && isAlphabetic(guessKey))
	    	{
	    		badLetters.push(guessKey);
	    		allowedGuesses--;
	    	}
	    }
	    updateDisplayWord();
    	updateHTML();
	}
	else if (allowedGuesses === 0)
	{
		//Have to update one more time to show that the guesses actually reaches 0
	    updateDisplayWord();
    	updateHTML();
	}
}

