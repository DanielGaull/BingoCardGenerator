const SIZE = 5;

function onLoad() {
    document.getElementById("generateButton").onclick = (ev) => {
        const input = document.getElementById("optionsInput").value;
        const bingoCard = generateBingoObject(input);
        renderBingoCard(bingoCard);
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

function renderBingoCard(bingoCard) {
    let html = '';
    for (let i = 0; i < bingoCard.length; i++) {
        html += '<tr>';
        for (let j = 0; j < bingoCard[i].length; j++) {
            const entry = bingoCard[i][j];
            html += `<td><div class="cell">${entry}</div></td>`;
        }
        html += '</tr>';
    }
    html = `<table><tbody>${html}</tbody></table>`;
    document.getElementById('output').innerHTML = html;
}

function setErrorMessage(msg) {
    document.getElementById("errorText").innerText = msg;
}

function popRandomItem(list) {
    const removedElems = list.splice(Math.floor(Math.random()*list.length), 1);
    return removedElems[0];
}