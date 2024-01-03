const SIZE = 5;

function onLoad() {
    document.getElementById("generateButton").onclick = (ev) => {
        const input = document.getElementById("optionsInput").value;
        const bingoCard = generateBingoObject(input);
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
}

function setErrorMessage(msg) {
    document.getElementById("errorText").innerText = msg;
}