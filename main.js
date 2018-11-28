function getGallows(missedTries) {
    let gallowsEmpty = "  __________\n" +
                       "  |         \n" +
                       "  |         \n" +
                       "  |         \n" +
                       "  |         \n" +
                       "  |         \n" +
                       "__|_________\n";
    let actualGallows = "";
    for (let i = 0; i < gallowsEmpty.length; i++) {
        actualGallows += getRightChar(missedTries, gallowsEmpty, i);
    }
    return (actualGallows);
}

function getRightChar(missedTries, gallowsEmpty, i) {
    if (missedTries >= 1 && i === 20) {
        return ("|");
    } else if (missedTries >= 1 && i === 33) {
        return ("O");
    } else if (missedTries >= 2 && i === 46) {
        return ("|");
    } else if (missedTries >= 3 && i === 45) {
        return ("/");
    } else if (missedTries >= 4 && i === 47) {
        return ("\\");
    } else if (missedTries >= 5 && i === 59) {
        return ("|");
    } else if (missedTries >= 6 && i === 71) {
        return ("/");
    } else if (missedTries >= 7 && i === 73) {
        return ("\\");
    } else {
        return (gallowsEmpty[i]);
    }
}

function initConfirmButton() {
    var confirmButton = document.getElementById("confirm");

    confirmButton.addEventListener("click", function () {
        if (typeof secretWord === "undefined") {
            verifySecretWordInput();
        } else {
            verifyCharacterInput();
        }
    });
}

function verifySecretWordInput() {
    var input = document.getElementById("enterWord");

    if (input.value.length > 2) {
        secretWord = input.value;
        input.parentNode.removeChild(document.getElementById("labelEnterWord"));
        input.parentNode.removeChild(input);
        gallows.innerText = getGallows(missedTries);
        inputCharacter.style.visibility = "visible";
    } else {
        alert("You must enter at least three characters !");
    }
}

function verifyCharacterInput() {
    var input = document.getElementById("enterChar");

    if (input.value.length === 1) {
        var chosenChar = input.value;

        playerChoseCharacter(secretWord, triedCharacters, chosenChar);
        input.value = "";
    } else {
        alert("You must enter a character !");
    }
}

function getPlayersWordString(secretWord, validCharacters) {
    let playersWord = "";

    for (let i = 0; i < secretWord.length; i++) {
        if (characterIsValid(validCharacters, secretWord[i]))
            playersWord += secretWord[i] + " ";
        else
            playersWord += "_ ";
    }
    return (playersWord);
}

function getTriedCharactersString(triedCharacters) {
    let triedString = "";

    for (let i = 0; i < triedCharacters.length; i++) {
        triedString += triedCharacters[i][0] + " ";
    }
    return ("Characters tried :\n" + triedString);
}

function isCharacterInSecretWord(secretWord, char) {
    triedCharacters.push(char);
    for (let i = 0; i < secretWord.length; i++) {
        if (char === secretWord[i]) {
            validCharacters.push(char);
            return (true);
        }
    }
    missedTries++;
    return (false);
}

function characterIsValid(validCharacters, char) {
    for (let i = 0; i < validCharacters.length; i++) {
        if (char[0] === validCharacters[i][0])
            return (true);
    }
    return (false);
}

function characterIsNew(chosenChar, triedCharacters) {
    for (let i = 0; i < triedCharacters.length; i++) {
        if (chosenChar[0] === triedCharacters[i][0])
            return (false);
    }
    return (true);
}

function playerChoseCharacter(secretWord, triedCharacters, chosenChar) {
    var gallows = document.getElementById("gallows");
    var displaySecretWord = document.getElementById("displaySecretWord");
    var displayTriedCharacters = document.getElementById("displayTriedCharacters");

    if (missedTries < 7 && !wordFound(secretWord, validCharacters)) {
        if (!characterIsNew(chosenChar, triedCharacters)) {
            alert("You have already tried this character !");
        } else {
            isCharacterInSecretWord(secretWord, chosenChar);
            gallows.innerText = getGallows(missedTries);
            displaySecretWord.innerText = getPlayersWordString(secretWord, validCharacters);
            displayTriedCharacters.innerText = getTriedCharactersString(triedCharacters);
        }
    }
    if (missedTries === 7 || wordFound(secretWord, validCharacters))
        endGame();
}

function wordFound(secretWord, validCharacters) {
    for (let i = 0; i < secretWord.length; i++) {
        if (!characterIsValid(validCharacters, secretWord[i]))
            return (false);
    }
    return (true);
}

function endGame() {
    var confirmButton = document.getElementById("confirm");

    confirmButton.parentNode.removeChild(confirmButton);
    hideInputCharacter();
    if (missedTries === 7) {
        alert("You lose :( The secret word was : " + secretWord);
    } else if (wordFound(secretWord, validCharacters)) {
        alert("You found the word with " + missedTries + " error(s), congratulations !")
    }
}

function hideInputCharacter() {
    var inputCharacter = document.getElementById("inputCharacter");

    inputCharacter.style.visibility = "hidden";
}

var missedTries = 0;
var secretWord;
var triedCharacters = [];
var validCharacters = [];

hideInputCharacter();
initConfirmButton();