class DiscardPile {
    constructor (deck) {
        this.linkedDeck = deck.id;
        this.cards = [];
    }

    put (card) {
        this.cards.unshift(card);
    }
}

module.exports = DiscardPile;