const NPC = require('../../game-classes/NPC/NPC');

const uuidv4 = require('uuid').v4;

class TableHandler {

    constructor (io, socket, rooms, room) {
        this.io = io;
        this.socket = socket;
        this.rooms = rooms;
        this.room = room;

        socket.on('get all tables', data => this.sendAllTables(data));

        socket.on('user is ready', data => this.handleUserReady(data));
        socket.on('get ready users', data => this.handleAllReadyUsers(data));

        socket.on('play anyway', data => this.handlePlayAnyway(data));

        socket.on('get players', data => this.handleGetPlayers(data));

    }

    sendTable (location, table) {
        this.io.to(location).emit('new table', {
            table: table
        });
    }

    sendAllTables (data) {
        this.rooms.forEach(table => {
            if (table.name !== 'lobby') {
                this.sendTable(data.user.socketId, table);  
            }
            
        });
    }

    handleUserReady (data) {
        this.rooms.get(data.location.name).userIsReady(data);
        if (this.rooms.get(data.location.name).isAllReady === true) {
            this.rooms.get(data.location.name).startGame();
            this.io.to(data.location.name).emit('game start', {
                table: this.rooms.get(data.location.name),
                game: this.rooms.get(data.location.name).game
            });
            let currentPlayer = this.rooms.get(data.location.name).game.players[this.rooms.get(data.location.name).game.currentTurn];
            setTimeout(() => {
                this.io.to(currentPlayer.socketId).emit('your turn', {
                    location: this.rooms.get(data.location.name),
                    table: this.rooms.get(data.location.name),
                    game: this.rooms.get(data.location.name).game,
                    player: currentPlayer
                });
            }, 1000);
        } else {
            this.io.to(data.location.name).emit('user is ready', {
                table: this.rooms.get(data.location.name),
                user: data.user
            }); 
        }
        
    }

    handleAllReadyUsers (data) {
        this.io.to(this.socket.id).emit('all ready users', {
            seats: this.rooms.get(data.location.name).seats,
            location: this.rooms.get(data.location.name)
        });
    }

    handlePlayAnyway (data) {
        let playAnyway = this.rooms.get(data.location.name).userPlayAnyway(data);
        if (playAnyway === true) {
            this.rooms.get(data.location.name).startGame();
            this.io.to(data.location.name).emit('game start', {
                table: this.rooms.get(data.location.name),
                game: this.rooms.get(data.location.name).game
            });
            this.io.to(data.location.name).emit('all players', {
                players: this.rooms.get(data.location.name).game.players,
                table: this.rooms.get(data.location.name),
                location: this.rooms.get(data.location.name)
            });

            this.handleFirstTurn(data);
        }
    }

    handleFirstTurn (data) {
        let firstPlayer = this.rooms.get(data.location.name).game.getCurrentPlayer();

        this.handleNextTurn({
            player: firstPlayer.player,
            table: this.rooms.get(data.location.name),
            game: this.rooms.get(data.location.name).game
        });
    }

    handleNextTurn (data) {
        this.io.to(data.table.name).emit('new message', {
            location: data.table.name,
            message: {
                id: uuidv4(),
                value: 'it\'s ' + data.player.name + '\'s turn',
                user: 'server',
                player: data.player,
                type: 'turn notifier'
            }
        });
        this.io.to(data.table.name).emit('player turn', {
            player: data.player,
            players: this.rooms.get(data.table.name).game.players,
            table: this.rooms.get(data.table.name),
            currentTurn: this.rooms.get(data.table.name).game.getCurrentPlayer().currentTurn
        });
        if (data.player.playerType === 'NPC') {
            setTimeout(() => {
                this.executeNPCTurn({
                    player: data.player,
                    table: data.table,
                    game: data.game
                });
            }, 2000);
        } 
        else 
        {
            this.notifyPlayerOfTurn({
                player: data.player,
                location: data.table
            });
        }
    }

    executeNPCTurn (data) {
        let npcTurn =  NPC.executeTurn({
            player: data.player,
            table: data.table,
            game: data.game
        });
        setTimeout(() => {
            this.io.to(data.table.name).emit('update boards', {
                location: data.table,
                players: this.rooms.get(data.table.name).game.players,
                table: this.rooms.get(data.table.name)
            });
            this.io.to(data.table.name).emit('new message', {
                location: data.table.name,
                message: {
                    value: npcTurn.player.name + ' flipped over a card on their board',
                    id: uuidv4(),
                    user: 'server'
                }
            });
            let nextPlayer = this.rooms.get(data.table.name).game.startNextPlayerTurn();
            setTimeout(() => {
                this.handleNextTurn({
                    player: nextPlayer,
                    table: data.table,
                    game: this.rooms.get(data.table.name).game
                });
            }, 2000);
        }, 2000);
    }

    notifyPlayerOfTurn (data) {
        this.io.to(data.player.socketId).emit('your turn', {
            location: this.rooms.get(data.location.name),
            table: this.rooms.get(data.location.name),
            game: this.rooms.get(data.location.name).game,
            player: data.player
        });
        // this.io.to(data.location.name).emit('new message', {
        //     location: data.location.name,
        //     message: {
        //         id: uuidv4(),
        //         value: 'it\'s ' + data.player.name + '\'s turn',
        //         user: 'server',
        //         type: 'turn notifier',
        //         player: data.player
        //     }
        // });
    }

    sendPlayer (data) {
        this.io.to(data.location).emit('user seating', {
            seat: data.seat,
            user: data.user,
            location: data.table.name,
            table: data.table
        });
    }

    handleGetPlayers (data) {
        let table = this.rooms.get(data.location.name);
        let seats = Object.entries(table.seats);
        this.io.to(this.socket.id).emit('all players', {
            location: this.socket.id,
            table: this.rooms.get(data.location.name),
            players: seats
        });
    }

}

module.exports = TableHandler;