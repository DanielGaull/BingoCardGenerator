const SIZE = 5;
const REQUIRED_ENTRIES = SIZE * SIZE - 1;
const MIDDLE = Math.floor(SIZE / 2);

// Bingo obj is a 2D array
// inputText: string
function generateBingoObject(inputText) {
    const lines = inputText.split('\n');
    if (lines.length < REQUIRED_ENTRIES) {
        setErrorMessage(`Must provide at least ${REQUIRED_ENTRIES} options; only ${lines.length} given.`);
        return;
    }
    // Start grabbing random items from the lines, adding it to the 2D array, and then removing it from lines
    let bingoCard = [];
    let currentRow = [];
    for (let i = 0; i < SIZE; i++) {
        currentRow = [];
        for (let j = 0; j < SIZE; j++) {
            if (i === MIDDLE && j === MIDDLE) {
                currentRow.push("FREE SPACE");
            } else {
                let item = popRandomItem(lines);
                currentRow.push(item);
            }
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

function popRandomItem(list) {
    const removedElems = list.splice(Math.floor(Math.random()*list.length), 1);
    return removedElems[0];
}

function encodeCard(card) {
    // We can essentially flatten it
    let query = '';
    for (let i = 0; i < card.length; i++) {
        for (let j = 0; j < card[i].length; j++) {
            query += encodeEntry(card[i][j]);
            if (i + 1 !== card.length || j + 1 !== card[i].length) {
                // Not yet on the last element, so add a comma
                query += ',';
            }
        }
    }
    return encodeURIComponent(query);
}
// Note: The double comma feature currently means empty squares aren't supported and behavior here is undefined
function encodeEntry(entry) {
    // Replace any commas in any entries with double commas
    entry = entry.replace(',', ',,');
    return entry;
}

function decodeCard(cardString) {
    cardString = decodeURIComponent(cardString);
    // Now need to make sure we detect double commas properly
    // Create 1D array first, then split it into the 2D array
    let currentEntry = '';
    let cardEntries = [];
    for (let i = 0; i < cardString.length; i++) {
        if (cardString.charAt(i) === ',') {
            if (i + 1 < cardString.length && cardString.charAt(i + 1) === ',') {
                // This is just a comma encoded
                currentEntry += ',';
                i++;
            } else {
                // We need to move to the next entry
                cardEntries.push(currentEntry);
                currentEntry = '';
            }
        } else {
            currentEntry += cardString.charAt(i);
        }
    }
    // Add the last entry that's in progress
    cardEntries.push(currentEntry);

    // Now move into a 2D array
    let card = [];
    let currentRow = [];
    for (let i = 0; i < SIZE; i++) {
        currentRow = [];
        for (let j = 0; j < SIZE; j++) {
            currentRow.push(cardEntries[i * SIZE + j]);
        }
        card.push(currentRow);
    }
    return card;
}