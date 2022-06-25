const uuidv4 = require('uuid').v4;

class Card {
    constructor(value, suit) {
        this.suit = suit;
        this.value = value;
        switch (value) {
            case 'ace':
                this.score = 1;
                break;
            case 'two': 
                this.score = -2;
                break;
            case 'three': 
                this.score = 3;
                break;
            case 'four': 
                this.score = 4;
                break;
            case 'five': 
                this.score = 5;
                break;
            case 'six': 
                this.score = 6;
                break;
            case 'seven':
                this.score = 7;
                break;
            case 'eight': 
                this.score = 8;
                break;
            case 'nine': 
                this.score = 9;
                break;
            case 'ten': 
                this.score = 10;
                break;
            case 'jack': 
                this.score = 10;
                break;
            case 'queen': 
                this.score = 10;
                break;
            case 'king': 
                this.score = 0;
                this.isWild = true;
                break;
            case 'joker': 
                this.score = 0;
                this.isWild = true;
                break;
            default:
                this.score = 0;
                this.value = 'error',
                this.suit = 'error'
        }
        this.id = uuidv4();
    }

    get color() {
        if (this.suit === 'joker') 
            return 'purple';
        if (this.suit === 'clubs' || this.suit === 'spades')
            return 'black';
        return 'red';
    }
}

module.exports = Card;