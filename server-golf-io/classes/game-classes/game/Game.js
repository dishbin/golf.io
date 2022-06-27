const Board = require("../board/Board");
const Deck = require("../deck/Deck");
const DiscardPile = require('../discard-pile/DiscardPile');
const Scorecard = require("../scorecard/Scorecard");
const GameScore = require('../game-score/GameScore');
const NPC = require("../NPC/NPC");

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
                seat[1].assignSeat(seat[0]);
                players[seat[0]] = seat[1];
            }
        });
        this.players = players;

        this.scores = new GameScore(this.players);

        this.discard = new DiscardPile(this.deck);
        this.discard.put(this.deck.draw());
    }

    playerTurn () {
        this.incrementTurn();
        return this.currentTurn;
    }

    removePlayer (data) {
        console.log('REMOVING PLAYER');
        console.log(data);

        let playerToRemove = Object.entries(this.players)
                                .filter(player => player[1].socketId === data)[0];
        let npc = new NPC();
        npc.assignBoard(playerToRemove[1].board);
        npc.assignScorecard(playerToRemove[1].scores);
        npc.assignSeat(playerToRemove[0]);
        this.players[playerToRemove[0]] = npc;
        return {
            seat: playerToRemove[0],
            player: npc
        }
    }

    getCurrentPlayer() {
        return {
            player: this.players[this.currentTurn],
            currentTurn: this.currentTurn
        }
    }

}

module.exports = Game;