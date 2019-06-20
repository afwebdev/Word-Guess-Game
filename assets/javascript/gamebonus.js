//DOM Has loaded. Proceed with work.
document.addEventListener('DOMContentLoaded', function (e) {


    let gameDiv = document.getElementById("game")
    let start = document.getElementById("startBtn")
    let word = document.getElementById("word")
    let newGameBtn = document.getElementById("gameBtn")
    let guessTrack = document.getElementById("guesses")
    let guessLeft = document.getElementById("guessLeft")
    let winCount = document.getElementById("winCount")



    const pokeGame = {
        //Declare DOM object vars


        count: 0,
        gameStarted: false,
        words: [
            "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino",
            "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp",
            "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone",
            "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops",
            "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
        ],
        randHidden: [],
        randWord: [],
        lettersGuessed: [],

        avoidKeys: [
            "meta",
            "alt",
            "control",
            "shift",
            "enter",
            "backspace"
        ],

        wordWork: function wordWork(word) {
            //Random word, split into characters for new Array (randToArr)
            var randToArr = word.split("");
            //For each letter in randToArr, replace with * and store in new array
            var hiddenLetterArr = []
            randToArr.forEach(function (x) {
                hiddenLetterArr.push("*")
            })
            //We have a random word now, and a converted version to asterisk's.
            //Push it out now
            this.randHidden = hiddenLetterArr;
            this.randWord = randToArr;

            console.log(this.randWord);
            console.log(this.randHidden);

            this.newGame(hiddenLetterArr)
        },

        newGame: function newGameSetup(randHidden) {
            word.innerText = this.randHidden.join('');
            guessLeft.innerText = this.randWord.length + 1;
            start.setAttribute("style", "display: none;")
            newGameBtn.setAttribute("style", "display: inline-block;")
        },
        keyPress: function keyPress(key) {
            var key = key.toLowerCase();
            if (this.gameStarted) {
                if (guessLeft.innerText <= 0) {
                    console.log("GAME OVER")
                    word.setAttribute("class", "fail");
                    word.innerText = "Game Over.."
                }
                else {
                    //returns index of potential found key.
                    var findLetter = this.randWord.indexOf(key);
                    console.log(findLetter)

                    //Filter out alt/ctrl/function keys
                    if (this.avoidKeys.indexOf(key) > -1) {
                        console.log("BAD KEY")
                    }
                    //if a letter (user key press) was found in the chosen random word.
                    else if (findLetter > -1) {
                        this.randHidden[findLetter] = key;
                        this.randWord[findLetter] = "*"
                        console.log(this.randWord[findLetter]);
                        console.log(findLetter);
                        console.log(this.randHidden);
                        word.innerText = this.randHidden.join('');
                    } else { //Letter not found, add to tracker, and decrement guesses left
                        guessLeft.innerText = parseInt(guessLeft.innerText - 1);
                        this.lettersGuessed.push(key)
                        guessTrack.innerText = this.lettersGuessed.join(', ');
                    }

                    //WINNER WINNER CHICKEN DINNER.
                    if (this.randHidden.indexOf("*") === -1) {
                        this.count++;
                        winCount.innerText = this.count;
                        console.log("Winner")
                        word.setAttribute("class", "winner")

                    }
                }

            } else { console.log("Game has not started") }

        }

    }

    //-------------------\\
    // -EVENT LISTENERS -\\
    //-------------------\\

    //On click of button, run function that will return a random string from pokemon array.
    start.onclick = function () {
        pokeGame.gameStarted = true;
        var randWord = pokeGame.words[Math.floor(Math.random(1) * pokeGame.words.length)].toLowerCase();
        //Send out the random word to external function.
        pokeGame.wordWork(randWord)
    }


    //START NEW GAME INSTANCE
    newGameBtn.onclick = function () {
        pokeGame.lettersGuessed = [];
        guessTrack.innerText = ""
        word.setAttribute("class", "")
        pokeGame.randWord = pokeGame.words[Math.floor(Math.random(1) * pokeGame.words.length)].toLowerCase();
        pokeGame.wordWork(pokeGame.randWord)
    }

    document.addEventListener('keyup', function (e) {
        pokeGame.keyPress(e.key);
    })




















});