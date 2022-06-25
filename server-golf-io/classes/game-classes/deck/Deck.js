const uuidv4 = require('uuid').v4;
const Card = require('../card/Card');

class Deck {

    #cardValues = [
        'ace',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'jack',
        'queen',
        'king',
        'joker'
    ];

    #suits = [
        'spades',
        'clubs',
        'hearts',
        'diamonds'
    ];

    constructor () {
        let cards = [];
        for (let i = 0; i < this.#suits.length; i++) {
            for (let j = 0; j < this.#cardValues.length; j++) {
                let suit = this.#suits[i];
                let val = this.#cardValues[j];
                if (val === 'joker' && (suit === 'diamonds' || suit === 'clubs')) {
                    continue;
                }
                if (val === 'joker') {
                    suit = 'joker';
                }
                for (let k = 0; k < 2; k++) {
                    let randomIndex = (Math.floor(Math.random() * cards.length));
                    cards.splice(randomIndex, 0, new Card(val, suit));
                }
            }
        }
        this.cards = cards;
        for (let i = 0; i < 3; i++) {
            this.shuffle();
        }
        this.id = uuidv4();
    }

    get size() {
        return this.cards.length;
    }

    shuffle() {
        let deckToShuffle = [...this.cards];
        let shuffledDeck = [];
        while (deckToShuffle.length > 1) {
            let i = Math.floor(Math.random() * deckToShuffle.length);
            shuffledDeck.push(deckToShuffle.splice(i, 1)[0]);
        }
        shuffledDeck.push(deckToShuffle[0]);
        this.cards = shuffledDeck;
    }

    draw() {
        return this.cards.splice(0, 1)[0];
    }

    drawBoard() {
        let board = [];
        for (let i = 0; i < 9; i++) {
            board.push(this.cards.splice(Math.floor(Math.random() * this.cards.length - 1), 1)[0]);
        }
        return board;
    }

}

module.exports = Deck;