

document.addEventListener("DOMContentLoaded", function (event) {

    var startGame = false;

    var hangMan = {

        wins: 0,
        guessesLeft: 10,
        wordBank: ["matrix", "yourname", "spiderman", "superman", "batman", "inception", "mulan", "thor", "flubber", "nosferatu", "seven", "zootopia", "it", "psycho", "birdbox", "ironman", "chinatown"],
        currentWord: "none",
        lettersUsed: "",
        hiddenWord: "",
        getWord: function () {
            return this.currentWord;
        },
        changeWord: function () {
            var len = Math.floor((Math.random() * this.wordBank.length));

            var cw = this.wordBank[len];
            this.currentWord = cw;

            document.getElementById("word").textContent = cw;
            console.log(cw.length);
            this.hiddenWord = "";
            for (let i = 0; i < cw.length; i++) {

                this.hiddenWord += "_";
            }
            document.getElementById("unseen").textContent = this.hiddenWord;



        },

        wrongGuess: function (ex) {


            var wrong = ex;
            if (this.lettersUsed.indexOf(wrong) > -1) {

            }
            else {
                this.lettersUsed += ex;
                document.getElementById("wrongLetters").textContent = this.lettersUsed;

                this.guessesLeft--;
                document.getElementById("guessLeft").textContent = this.guessesLeft;
            }

            if (this.guessesLeft == 0) {
                this.lostGame();


            }
        },

        changeWrong: function () {
            this.lettersUsed = "";
            document.getElementById("wrongLetters").textContent = this.lettersUsed;
        },
        changeGuess: function () {
            this.guessesLeft = 10;
            document.getElementById("guessLeft").textContent = this.guessesLeft;
        },

        correctGuess: function (ex) {
            var cor = ex;
            var str = "";

            for (let i = 0; i < this.currentWord.length; i++) {

                if (this.hiddenWord.charAt(i) == this.currentWord.charAt(i)) {

                    str += this.currentWord.charAt(i);

                }
                else if (cor == this.currentWord.charAt(i) && this.hiddenWord.charAt(i) == "_") {

                    str += cor;
                }
                else {
                    str += "_";
                }


            }
            this.hiddenWord = str;
            document.getElementById("unseen").textContent = this.hiddenWord;
            if (this.hiddenWord.indexOf('_') == -1) {
                this.wonGame();
            }
        },

        wonGame() {
            this.wins++;
            document.getElementById("winHere").textContent = this.wins;
            this.changeWord();
            this.changeGuess();
            this.changeWrong();
            var x = document.getElementById("sound2");
            x.play();
        },

        lostGame: function () {
            this.changeWord();
            this.changeGuess();
            this.changeWrong();
            var x = document.getElementById("sound");
            x.play();
        }

    }

    function start() {
        hangMan.changeWord();



        document.addEventListener("keyup", function playerGuess(event) {
            var press = event.key;
            var nw = hangMan.getWord();
            if (event.keyCode >= 65 && event.keyCode <= 90 && nw.indexOf(press) > -1) {


                hangMan.correctGuess(press);

            }
            else if (event.keyCode >= 65 && event.keyCode <= 90 && nw.indexOf(press) == -1) {

                hangMan.wrongGuess(press);

            }
            else {

            }

        })

    }
    start();






})

