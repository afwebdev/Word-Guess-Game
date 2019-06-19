//DOM Has loaded. Proceed with work.
document.addEventListener('DOMContentLoaded', function (e) {

    //Declare DOM object vars
    var gameDiv = document.getElementById("game")
    var start = document.getElementById("startBtn")
    var word = document.getElementById("word");
    var newGameBtn = document.getElementById("gameBtn")
    var guessTrack = document.getElementById("guesses")

    //DECLARE VARIABLES
    var gameStarted = false;
    var score = 0;
    var words = [
        "Pikachu",
        "Mewtwo",
        "Charizard",
        "Weedle",
        "Jigglypuff"
    ];
    var randHidden = [];
    var randWord = [];
    var count = 0;
    var lettersGuessed = [];

    var avoidKeys = [
        "Meta",
        "Alt",
        "Control",
        "Shift",
        "Enter",
        "Backspace"
    ]




    /*          THIS IS
                WHERE THE
                GAME BEGINS
                HERE, EVERYTHING IS LOADED FOR FIRST RUN.
    */
    //On click of button, run function that will return a random string from pokemon array.
    start.onclick = function () {
        gameStarted = true;
        var randWord = words[Math.floor(Math.random(1) * words.length)].toLowerCase();
        //Send out the random word to external function.
        wordWork(randWord)
    }




    function wordWork(word) {
        //Random word, split into characters for new Array (randToArr)
        var randToArr = word.split("");
        //For each letter in randToArr, replace with * and store in new array
        var hiddenLetterArr = []
        randToArr.forEach(function (x) {
            hiddenLetterArr.push("*")
        })
        //We have a random word now, and a converted version to asterisk's.
        //Push it out now
        randHidden = hiddenLetterArr;
        randWord = randToArr;

        console.log(randWord);
        console.log(randHidden);

        newGameSetup(hiddenLetterArr)
    }

    function newGameSetup(randHidden) {
        word.innerText = randHidden.join('');
        start.setAttribute("style", "display: none;")
        newGameBtn.setAttribute("style", "display: inline-block;")
    }

    //START NEW GAME INSTANCE
    newGameBtn.onclick = function () {
        lettersGuessed = [];
        guessTrack.innerText = ""
        word.setAttribute("class", "")
        randWord = words[Math.floor(Math.random(1) * words.length)].toLowerCase();
        wordWork(randWord)
    }

    document.addEventListener('keyup', function (e) {
        if (gameStarted) {
            //returns index of potential found key.
            var findLetter = randWord.indexOf(e.key);
            console.log(findLetter)
            //Filter out alt/ctrl/function keys
            if (avoidKeys.indexOf(e.key) > -1) {
                console.log("BAD KEY")
            }
            //if a letter (user key press) was found in the chosen random word.
            else if (findLetter > -1) {
                randHidden[findLetter] = e.key;
                randWord[findLetter] = "*"
                console.log(randWord[findLetter]);
                console.log(findLetter);
                console.log(randHidden);
                word.innerText = randHidden.join('');
            } else {
                lettersGuessed.push(e.key)
                guessTrack.innerText = lettersGuessed.join('');
            }

            //WINNER WINNER CHICKEN DINNER.
            if (randHidden.indexOf("*") === -1) {
                console.log("Winner")
                word.setAttribute("class", "winner")
            }
        } else { console.log("Game has not started") }
    })






















});