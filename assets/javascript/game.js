//DOM Has loaded. Proceed with work.
document.addEventListener('DOMContentLoaded', function (e) {

    //Declare DOM object vars
    var gameDiv = document.getElementById("game")
    var start = document.getElementById("startBtn")
    var word = document.getElementById("word");
    var newGameBtn = document.getElementById("gameBtn")

    //DECLARE VARIABLES
    var intro = "Press any key to continue.."
    var score = 0;
    var words = [
        "Pikachu",
        "Mewtwo",
        "Charizard",
        "Weedle",
        "Jigglypuff"
    ];
    var randHidden = [];
    var randWord = []




    /*          THIS IS
                WHERE THE
                GAME BEGINS
                HERE, EVERYTHING IS LOADED FOR FIRST RUN.
    */
    //On click of button, run function that will return a random string from pokemon array.
    start.onclick = function () {
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
        newGameBtn.setAttribute("style", "display: block;")
    }

    newGameBtn.onclick = function () {
        randWord = words[Math.floor(Math.random(1) * words.length)].toLowerCase();
        wordWork(randWord)
    }

    document.addEventListener('keyup', function (e) {
        //returns index of potential found key.
        var findLetter = randWord.indexOf(e.key);
        console.log(findLetter)
        //if a letter (user key press) was found in the chosen random word.
        if (findLetter > -1) {
            randHidden[findLetter] = e.key;
            randWord[findLetter] = "*"
            console.log(randWord[findLetter]);
            console.log(findLetter);
            console.log(randHidden);
            word.innerText = randHidden.join('');
        }
        if (randHidden.indexOf("*") === -1) {
            console.log("Winner")
        }
    })






















});