const prompt = require('prompt-sync')();

let rounds = 0
let input
let checkGame
let game = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
function printGame() {
    console.clear();
    console.log("-------");
    for (let i = 0; i < game.length; i++) {
        console.log(game[i][0], "   ", game[i][1], "   ", game[i][2], "   ", game[i][3]);
        console.log("");
    }
    console.log("-------");
}
function newNumber() {
    let randomRow = game[Math.floor(Math.random() * game.length)];
    let randomSlot = Math.floor(Math.random() * randomRow.length);
    while (randomRow[randomSlot] != 0) {
        randomRow = game[Math.floor(Math.random() * game.length)];
        randomSlot = Math.floor(Math.random() * randomRow.length);
    }
    randomRow[randomSlot] = [2, 4][Math.floor(Math.random() * 2)];
}
function move(direction) {
    if (direction == "w") {
        for (let i = 1; i != 4; i++) {
            for (let j = 0; j < game[i].length; j++) {
                if (game[i][j] != 0 && game[i-1][j] == 0) {
                    game[i-1][j] = game[i][j];
                    game[i][j] = 0;
                }
            }
        }
    }
    else if (direction == "s") {
        for (let i = 2; i != -1; i--) {
            for (let j = 0; j < game[i].length; j++) {
                if (game[i][j]!= 0 && game[i+1][j] == 0) {
                    game[i+1][j] = game[i][j];
                    game[i][j] = 0;
                }
            }
        }
    }
    else if (direction == "a") {
        for (let i = 0; i != 4; i++) {
            for (let j = 1; j < game[i].length; j++) {
                if (game[i][j]!= 0 && game[i][j-1] == 0) {
                    game[i][j-1] = game[i][j];
                    game[i][j] = 0;
                }
            }
        }   
    }
    else if (direction == "d") {
        for (let i = 0; i != 4; i++) {
            for (let j = 2; j != -1 ; j--) {
                if (game[i][j]!= 0 && game[i][j+1] == 0) {
                    game[i][j+1] = game[i][j];
                    game[i][j] = 0;
                }
            }
        }
    }
}
function merge(direction) {
    if (direction == "w") {
        for (let i = 0; i!= 3; i++) {
            for (let j = 0; j < game[i].length; j++) {
                if (game[i+1][j] != 0 && game[i][j] == game[i+1][j]) {
                    game[i][j] = game[i][j]*2;
                    game[i+1][j] = 0;
                }
            }
        }
    }
    else if (direction == "s") {
        for (let i = 3; i != 0; i--) {
            for (let j = 0; j < game[i].length; j++) {
                if (game[i-1][j]!= 0 && game[i][j] == game[i-1][j]) {
                    game[i][j] = game[i][j]*2;
                    game[i-1][j] = 0;
                }
            }
        }
    }
    else if (direction == "a") {
        for (let i = 0; i!= 3; i++) {
            for (let j = 0; j < game[i].length; j++) {
                if (game[j][i] != 0 && game[j][i+1] == game[j][i]) {
                    game[j][i] = game[j][i]*2;
                    game[j][i+1] = 0;
                }
            }
        }
    }
    else if (direction == "d") {
        for (let i = 0; i!= 4; i++) {
            for (let j = 2; j!= -1 ; j--) {
                if (game[i][j]!= 0 && game[i][j+1] == game[i][j]) {
                    game[i][j+1] = game[i][j+1]*2;
                    game[i][j] = 0;
                }
            }
        }
    }
}

while (true) {
    rounds++;
    newNumber();
    printGame();
    checkGame = 0;
    input = prompt("");

    while (input != "w" && input != "s" && input != "a" && input != "d") {
        if (input != "w" && input != "s" && input != "a" && input != "d") {
            console.log("-------------------------------------------------------------");
            console.log('Type s to go up, s to go down, a to go left and b to go right.');
            console.log("-------------------------------------------------------------");
        }
        input = prompt('');
    }

    for (let i = 0; i < game.length-1; i++) {
        move(input);
        merge(input);
    }

    printGame();

    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game[i].length; j++) {
            if (game[i][j] != 0) {
                checkGame++
            }
        }
    }

    if (checkGame == game.length*game[0].length) {
        console.log("-----------------------");
        console.log("Game Over!");
        console.log("You survived " + rounds + " rounds!");
        console.log("-----------------------");
        break;
    }
}
