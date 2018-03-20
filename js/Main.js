function checkInput(input) {
    var c;
    if (input.length === 25) {
        for (var i = 0; i < input.length; i++) {
            c = input.charAt(i);
            if (c !== '1' && c !== '0') {
                return false;
            }
        }
        return true;
    }
    return false;
}

function getPoints(playerMove, opponentMove) {
    if (playerMove === '1' && opponentMove === '1') {
        return 2;
    } else if (playerMove === '0' && opponentMove === '1') {
        return 3
    } else if (playerMove === '1' && opponentMove === '0') {
        return -1;
    } else if (playerMove === '0' && opponentMove === '0') {
        return 0;
    }
}

function matchWithCopyCat(playerMoves) {
    var playerMove;
    var copyCatMove = '1';
    var points = 0;
    for (var i = 0; i < 5; i++) {
        playerMove = playerMoves.charAt(i);
        points += getPoints(playerMove, copyCatMove);
        copyCatMove = playerMove;
    }
    return points;
}

function matchWithAlwaysCheat(playerMoves) {
    var playerMove;
    var alwaysCheatMove = '0';
    var points = 0;
    for (var i = 0; i < 4; i++) {
        playerMove = playerMoves.charAt(i);
        points += getPoints(playerMove, alwaysCheatMove);
    }
    return points;
}

function matchWithAlwaysCoOperate(playerMoves) {
    var playerMove;
    var alwaysCoOperateMove = '1';
    var points = 0;
    for (var i = 0; i < 4; i++) {
        playerMove = playerMoves.charAt(i);
        points += getPoints(playerMove, alwaysCoOperateMove);
    }
    return points;
}

function matchWithGrudger(playerMoves) {
    var playerMove;
    var grudgerMove = '1';
    var points = 0;
    for (var i = 0; i < 5; i++) {
        playerMove = playerMoves.charAt(i);
        points += getPoints(playerMove, grudgerMove);
        if (playerMove === '0' && grudgerMove !== '0') {
            grudgerMove = '0';
        }
    }
    return points;
}

function matchWithDetective(playerMoves) {
    var playerMove;
    var detectiveMove;
    var didCheatBack = false;
    var points = 0;
    for (var i = 0; i < 7; i++) {
        if (i === 0 || i === 2 || i === 3) {
            detectiveMove = '1';
        } else if (i === 1) {
            detectiveMove = '0';
        }
        playerMove = playerMoves.charAt(i);
        points += getPoints(playerMove, detectiveMove);
        if (playerMove === '0' && didCheatBack === false) {
            didCheatBack = true;
        }
        if (i >= 3) {
            if (didCheatBack) {
                detectiveMove = playerMove;
            } else if (!didCheatBack && detectiveMove !== '0') {
                detectiveMove = '0'
            }
        }
    }
    return points;
}

function play(playerMoves) {
    var points = 0;
    points += matchWithCopyCat(playerMoves.substring(0, 5));
    points += matchWithAlwaysCheat(playerMoves.substring(5, 9));
    points += matchWithAlwaysCoOperate(playerMoves.substring(9, 13));
    points += matchWithGrudger(playerMoves.substring(13, 18));
    points += matchWithDetective(playerMoves.substring(18, 25));
    return points;
}

function main() {
    var playerMoves = document.getElementById("moves").value.toString();
    if (checkInput(playerMoves)) {
        return printResult(play(playerMoves));
    } else if (playerMoves.length !== 25) {
        return alert("Wrong number of moves. Yours is " + playerMoves.length);
    } else {
        return alert("Your input contains invalid characters or something else is wrong with it.")
    }
}

function printResult(message) {
    var output = document.getElementById("output");
    output.innerHTML = message;
}
