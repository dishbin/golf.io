const Board = require("../board/Board");
const Deck = require("../deck/Deck");
const DiscardPile = require('../discard-pile/DiscardPile');
const Scorecard = require("../scorecard/Scorecard");
const GameScore = require('../game-score/GameScore');

class Game {
    constructor (table) {
        this.round = 1;
        this.turnOrder = ['A', 'B', 'D', 'C'];
        this.turnCounter = Math.floor(Math.random() * 4);
        this.currentTurn = this.turnOrder[this.turnCounter];
        this.deck;
        this.players;
        this.scores;
        this.discard;
        

        this.initializeGame(table.seats);
    }

    incrementTurn () {
        this.turnCounter++;
        if (this.turnCounter === 4)
            this.turnCounter = 0;
        this.currentTurn = this.turnOrder[this.turnCounter];
    }

    initializeGame (seats) {
        this.deck = new Deck();

        let players = {};
        Object.entries(seats).forEach(seat => {
            if (seat[1].playerType === undefined) {
                let newPlayer = {
                    ...seat[1],
                    board: new Board(this.deck.drawBoard()),
                    scores: new Scorecard(),
                    playerType: 'player'
                }
                players[seat[0]] = newPlayer;
            } else if (seat[1].playerType === 'NPC') {
                seat[1].assignBoard(new Board(this.deck.drawBoard()));
                seat[1].assignScorecard(new Scorecard());
                players[seat[0]] = seat[1];
            }
        });
        this.players = players;

        this.scores = new GameScore(this.players);

        this.discard = new DiscardPile(this.deck);
        this.discard.put(this.deck.draw());
    }

}

module.exports = Game;