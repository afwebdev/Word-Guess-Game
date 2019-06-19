//DOM Has loaded. Proceed with work.
document.addEventListener('DOMContentLoaded', function (e) {

    //Declare DOM object vars
    var gameDiv = document.getElementById("game")
    var start = document.getElementById("startBtn")
    var word = document.getElementById("word");
    var newGameBtn = document.getElementById("gameBtn")
    var guessTrack = document.getElementById("guesses")
    var guessLeft = document.getElementById("guessLeft")

    //DECLARE VARIABLES
    var gameStarted = false;
    var words = [
        "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino",
        "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp",
        "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone",
        "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops",
        "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
    ];
    var randHidden = [];
    var randWord = [];
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
                HERE, EVERYTHING IS LOADED FOR FIRST RUN.   */


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
        guessLeft.innerText = randWord.length + 1;
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
        var key = e.key.toLowerCase();
        if (gameStarted) {
            if (guessLeft.innerText <= 0) {
                console.log("GAME OVER")
                word.setAttribute("class", "fail");
                word.innerText = "Game Over.."
            }
            else {
                //returns index of potential found key.
                var findLetter = randWord.indexOf(key);
                console.log(findLetter)

                //Filter out alt/ctrl/function keys
                if (avoidKeys.indexOf(key) > -1) {
                    console.log("BAD KEY")
                }
                //if a letter (user key press) was found in the chosen random word.
                else if (findLetter > -1) {
                    randHidden[findLetter] = key;
                    randWord[findLetter] = "*"
                    console.log(randWord[findLetter]);
                    console.log(findLetter);
                    console.log(randHidden);
                    word.innerText = randHidden.join('');
                } else { //Letter not found, add to tracker, and decrement guesses left
                    guessLeft.innerText = parseInt(guessLeft.innerText - 1);
                    lettersGuessed.push(key)
                    guessTrack.innerText = lettersGuessed.join(', ');
                }

                //WINNER WINNER CHICKEN DINNER.
                if (randHidden.indexOf("*") === -1) {
                    console.log("Winner")
                    word.setAttribute("class", "winner")
                }
            }

        } else { console.log("Game has not started") }


    })






















});