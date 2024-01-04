function onLoad() {
    // Grab the bingo card from the URL params, then print it out
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('card')) {
        const card = urlParams.get('card');
        const bingoCardObj = JSON.parse(card);
        renderBingoCard(bingoCardObj);
    }
}