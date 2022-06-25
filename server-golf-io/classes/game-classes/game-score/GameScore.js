const Scorecard = require("../scorecard/Scorecard");

class GameScore {

    constructor(players) {
        this.scores = new Map();
        Object.values(players).forEach(player => {
            this.scores.set(player.id, new Scorecard());
        });
    }

    update (player, score, value) {
        this.scores.get(player.id).update(score, value);
    }

    calculateWinner () {
        let scoreOrder = [];
        Object.entries(this.scores).forEach(score => {
            scoreOrder.push([score[0], score[1].calculateWinner()]);
        });
        scoreOrder.sort((a,b) => a[1] - b[1]);
        let order = ['first', 'second', 'third', 'fourth'];
        let rankings = {};
        for (let i = 0; i < 4; i++) {
            rankings[order[i]] = scoreOrder[i][0];
        }
        return rankings;
    }

}

module.exports = GameScore;