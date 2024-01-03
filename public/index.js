const SIZE = 5;

function onLoad() {
    document.getElementById("generateButton").onclick = (ev) => {
        const input = document.getElementById("optionsInput").value;
        const bingoCard = generateBingoObject(input);
        console.log(bingoCard);
    }
    document.getElementById("optionsInput").oninput = (ev) => {
        setErrorMessage("");
    }
}

// Bingo obj is a 2D array
// inputText: string
function generateBingoObject(inputText) {
    const lines = inputText.split('\n');
    if (lines.length < SIZE*SIZE) {
        setErrorMessage(`Must provide at least ${SIZE*SIZE} options; only ${lines.length} given.`);
        return;
    }
    // Start grabbing random items from the lines, adding it to the 2D array, and then removing it from lines
    let bingoCard = [];
    let currentRow = [];
    for (let i = 0; i < SIZE; i++) {
        currentRow = [];
        for (let j = 0; j < SIZE; j++) {
            let item = popRandomItem(lines);
            currentRow.push(item);
        }
        bingoCard.push(currentRow);
    }
    return bingoCard;
}

function setErrorMessage(msg) {
    document.getElementById("errorText").innerText = msg;
}

function popRandomItem(list) {
    const removedElems = list.splice(Math.floor(Math.random()*list.length), 1);
    return removedElems[0];
}