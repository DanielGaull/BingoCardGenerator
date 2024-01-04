const SIZE = 5;
const REQUIRED_ENTRIES = SIZE * SIZE - 1;
const MIDDLE = Math.floor(SIZE / 2);

function onLoad() {
    document.getElementById("generateButton").onclick = (ev) => {
        const input = document.getElementById("optionsInput").value;
        const bingoCard = generateBingoObject(input);
        renderBingoCard(bingoCard);
        // Provide an output link
        const anchor = document.getElementById("outputLink");
        anchor.innerText = "Permanent link to this card";
        const encodedCard = encodeCard(bingoCard);
        anchor.setAttribute('href', `/bingo-card?card=${encodedCard}`);
        console.log(`/bingo-card?card=${encodedCard}`);
    }
    document.getElementById("optionsInput").oninput = (ev) => {
        setErrorMessage("");
    }
}

function setErrorMessage(msg) {
    document.getElementById("errorText").innerText = msg;
}