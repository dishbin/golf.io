class Scorecard {
    constructor () {
        this.first = 0;
        this.second = 0;
        this.third = 0;
        this.fourth = 0;
        this.final = 0;
    }

    update (score, value) {
        switch(score) {
            case 'first':
                this.first = value;
                break;
            case 'second':
                this.second = value;
                break;
            case 'third':
                this.third = value;
                break;
            case 'fourth':
                this.fourth = value;
                break;
            case 'final':
                this.final = value;
                break;
        }
    }

    calculateFinal () {
        this.final = this.first + this.second + this.third + this.fourth;
        return this.final;
    }
}

module.exports = Scorecard;