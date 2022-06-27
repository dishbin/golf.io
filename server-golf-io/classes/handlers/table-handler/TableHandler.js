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
            // this.io.to(data.location.name).emit('update players', {
            //    players: this.rooms.get(data.location.name).game.players,
            //    table: this.rooms.get(data.location.name),
            //    location: this.rooms.get(data.location.name)
            // });
            this.io.to(data.location.name).emit('all players', {
                players: this.rooms.get(data.location.name).game.players,
                table: this.rooms.get(data.location.name),
                location: this.rooms.get(data.location.name)
            });
            
            let currentPlayer = this.rooms.get(data.location.name).game.getCurrentPlayer();

            this.io.to(data.location.name).emit('player turn', {
                player: currentPlayer,
                players: this.rooms.get(data.location.name).game.players,
                table: this.rooms.get(data.location.name)
            });

            if (currentPlayer.player.playerType === 'NPC') {
                this.io.to(data.location.name).emit('new message', {
                    location: data.location.name,
                    message: {
                        id: uuidv4(),
                        value: 'it\'s ' + currentPlayer.player.name + '\'s turn',
                        user: 'server',
                        player: currentPlayer.player,
                        type: 'turn notifier'
                    }
                });
                let npcTurn = currentPlayer.player.startTurn({
                    game: this.rooms.get(data.location.name).game
                });
                let nextTurn;
                setTimeout(() => {
                    nextTurn = this.rooms.get(data.location.name).game.playerTurn();
                    currentPlayer = this.rooms.get(data.location.name).game.players[nextTurn];
                    this.io.to(data.location.name).emit('player turn', {
                        player: currentPlayer,
                        players: this.rooms.get(data.location.name).game.players,
                        table: this.rooms.get(data.location.name)
                    });
                    if (currentPlayer.playerType === 'NPC') {
                        setTimeout(() => {
                            this.io.to(data.location.name).emit('new message', {
                                location: data.location.name,
                                message: {
                                    id: uuidv4(),
                                    value: 'it\'s ' + currentPlayer.name + '\'s turn',
                                    user: 'server',
                                    player: currentPlayer,
                                    type: 'turn notifier'
                                }
                            });
                            let npcTurn = currentPlayer.startTurn({
                                game: this.rooms.get(data.location.name).game
                            });
                            let anotherNextTurn;
                            setTimeout(() => {
                                anotherNextTurn = this.rooms.get(data.location.name).game.playerTurn();
                                currentPlayer = this.rooms.get(data.location.name).game.players[nextTurn];
                                this.io.to(data.location.name).emit('player turn', {
                                    player: currentPlayer,
                                    players: this.rooms.get(data.location.name).game.players,
                                    table: this.rooms.get(data.location.name)
                                });
                                if (currentPlayer.playerType === 'NPC') {
                                    setTimeout(() => {
                                        this.io.to(data.location.name).emit('new message', {
                                            location: data.location.name,
                                            message: {
                                                id: uuidv4(),
                                                value: 'it\'s ' + currentPlayer.name + '\'s turn',
                                                user: 'server',
                                                player: currentPlayer,
                                                type: 'turn notifier'
                                            }
                                        });
                                        let npcTurn = currentPlayer.startTurn({
                                            game: this.rooms.get(data.location.name).game
                                        });
                                        let theFinalNextTurn = this.rooms.get(data.location.name).game.playerTurn();
                                        currentPlayer = this.rooms.get(data.location.name).game.players[theFinalNextTurn];
                                        setTimeout(() => {
                                            this.io.to(currentPlayer.socketId).emit('your turn', {
                                                location: this.rooms.get(data.location.name),
                                                table: this.rooms.get(data.location.name),
                                                game: this.rooms.get(data.location.name).game,
                                                player: currentPlayer
                                            });
                                        }, 1000);
                                    }, 1000);
                                    this.io.to(data.location.name).emit('update boards', {
                                        location: data.location,
                                        players: this.rooms.get(data.location.name).game.players,
                                        table: this.rooms.get(data.location.name)
                                    });
                                    this.io.to(data.location.name).emit('new message', {
                                        location: data.location.name,
                                        message: {
                                            value: npcTurn.player.name + ' flipped over a card on their board',
                                            id: uuidv4(),
                                            user: 'server'
                                        }
                                    });
                                } else {
                                    setTimeout(() => {
                                        this.io.to(currentPlayer.socketId).emit('your turn', {
                                            location: this.rooms.get(data.location.name),
                                            table: this.rooms.get(data.location.name),
                                            game: this.rooms.get(data.location.name).game,
                                            player: currentPlayer
                                        });
                                    }, 1000);
                                }
                            }, 1000);
                            this.io.to(data.location.name).emit('update boards', {
                                location: data.location,
                                players: this.rooms.get(data.location.name).game.players,
                                table: this.rooms.get(data.location.name)
                            });
                            this.io.to(data.location.name).emit('new message', {
                                location: data.location.name,
                                message: {
                                    value: npcTurn.player.name + ' flipped over a card on their board',
                                    id: uuidv4(),
                                    user: 'server'
                                }
                            });
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.io.to(currentPlayer.socketId).emit('your turn', {
                                location: this.rooms.get(data.location.name),
                                table: this.rooms.get(data.location.name),
                                game: this.rooms.get(data.location.name).game,
                                player: currentPlayer
                            });
                        }, 1000);
                    }
                    this.io.to(data.location.name).emit('update boards', {
                        location: data.location,
                        players: this.rooms.get(data.location.name).game.players,
                        table: this.rooms.get(data.location.name)
                    });
                    this.io.to(data.location.name).emit('new message', {
                        location: data.location.name,
                        message: {
                            value: npcTurn.player.name + ' flipped over a card on their board',
                            id: uuidv4(),
                            user: 'server'
                        }
                    });
                }, 1000);
                setTimeout(() => {
                    let nextPlayer = this.rooms.get(data.location.name).game.players[nextTurn];
                    this.io.to(nextPlayer.socketId).emit('your turn', {
                        location: this.rooms.get(data.location.name),
                        table: this.rooms.get(data.location.name),
                        game: this.rooms.get(data.location.name).game,
                        player: nextPlayer
                    });
                    this.io.to(data.location.name).emit('new message', {
                        location: data.location.name,
                        message: {
                            id: uuidv4(),
                            value: 'it\'s ' + nextPlayer.name + '\'s turn',
                            user: 'server',
                            type: 'turn notifier',
                            player: nextPlayer
                        }
                    });
                }, 2000);
            } else {
                setTimeout(() => {
                    this.io.to(currentPlayer.player.socketId).emit('your turn', {
                        location: this.rooms.get(data.location.name),
                        table: this.rooms.get(data.location.name),
                        game: this.rooms.get(data.location.name).game,
                        player: currentPlayer.player
                    });
                    this.io.to(data.location.name).emit('new message', {
                        location: data.location.name,
                        message: {
                            id: uuidv4(),
                            value: 'it\'s ' + currentPlayer.player.name + '\'s turn',
                            user: 'server',
                            type: 'turn notifier',
                            player: currentPlayer.player
                        }
                    });
                }, 1000);
            }
            
            
        }
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