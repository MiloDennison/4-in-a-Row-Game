class Game {
    constructor() {

        this.board = new Board(6, 7);
        this.players = this.createPlayers();
        this.ready = false;

    }

    /**
     * 
     * @returns {array}
     */
    createPlayers() {

        const players = [new Player("Player 1", true, "#e15258", true),
                         new Player("Player 2", false, "#e59a13")]

        return players;
    }

    /**
     * Intiates game for play
     */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = !this.ready;
    }

    get activePlayer() {
        return this.players.find(player => player.active);        
    }  
    
    /**
     * 
     * @param {Object} e 
     */
    handleKeydown(e) {
        if(this.ready) {
            console.log("1")
            switch(e.key){
                case "ArrowLeft":
                    console.log("a")
                    this.activePlayer.activeToken.moveLeft();
                    break;
                case "ArrowDown":
                    console.log("b")
                    this.playToken();
                    break;
                case "ArrowRight":
                    console.log("c")
                    this.activePlayer.activeToken.moveRight(this.board.columns)
                    break;
            }
        }
    }

    playToken() {
        const spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        const targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

        for (let space of targetColumn) {
            if (space.token === null) {
                targetSpace = space;
            }
        }

        if (targetSpace !== null) {
            game.ready = !game.ready;
            console.log("A");
            activeToken.drop(targetSpace, () => {
                this.updateGameState(activeToken, targetSpace);
            });
        }
    }

    /**
     * 
     * @param {Object} target 
     * @returns {boolean}
     */    
    checkForWin(target) {
        console.log("C");
        const owner = target.owner;
        const playedTokens = owner.tokens.filter(token => token.dropped);
        const cardinalArray = target.token.cardinality;
        const x = target.token.columnLocation;
        const y = target.token.rowLocation;
        const N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7;
        console.table(cardinalArray);
        let hasWon = false;

        //Checks to make suere at least 4 tokens have been played
        if (playedTokens.length > 3) { 
            console.log("D");
            console.log(cardinalArray[W]);
            //Checks if the space has at least 3 spaces North of it
            if (cardinalArray[N]) { 
                console.log("N");
                if (this.board.spaces[x][y+1].owner === owner &&
                    this.board.spaces[x][y+2].owner === owner &&
                    this.board.spaces[x][y+3].owner === owner) {
                    hasWon = true;
                    return hasWon;
                    }
            }

            //Checks if the space has at least 3 spaces Northeast of it
            if (cardinalArray[NE]) {
                console.log("NE");
                if (this.board.spaces[x+1][y+1].owner === owner &&
                    this.board.spaces[x+2][y+2].owner === owner &&
                    this.board.spaces[x+3][y+3].owner === owner) {
                    hasWon = true;
                    return hasWon;
                    }
            }

            //Checks if the space has at least 3 spaces East of it
            if (cardinalArray[E]) {
                console.log("E");
                if (this.board.spaces[x+1][y].owner === owner &&
                    this.board.spaces[x+2][y].owner === owner &&
                    this.board.spaces[x+3][y].owner === owner) {
                    hasWon = true;
                    return hasWon;
                    }
            }

            //Checks if the space has at least 3 spaces Southeast of it
            if (cardinalArray[SE]) {
                console.log("SE");
                if (this.board.spaces[x+1][y-1].owner === owner &&
                    this.board.spaces[x+2][y-2].owner === owner &&
                    this.board.spaces[x+3][y-3].owner === owner) {
                    hasWon = true;
                    return hasWon;
                    }
            }

            //Checks if the space has at least 3 spaces South of it
            if (cardinalArray[S]) {
                console.log("S");
                if (this.board.spaces[x][y-1].owner === owner &&
                    this.board.spaces[x][y-2].owner === owner &&
                    this.board.spaces[x][y-3].owner === owner) {
                    hasWon = true;
                    return hasWon;
                    }
            }

            //Checks if the space has at least 3 spaces Southwest of it
            if (cardinalArray[SW]) {
                console.log("SW");
                if (this.board.spaces[x-1][y-1].owner === owner &&
                    this.board.spaces[x-2][y-2].owner === owner &&
                    this.board.spaces[x-3][y-3].owner === owner) {
                    hasWon = true;
                    return hasWon;
                    }
            }

            //Checks if the space has at least 3 spaces West of it
            if (cardinalArray[W]) {
                console.log("W");
                if (this.board.spaces[x-1][y].owner === owner &&
                    this.board.spaces[x-2][y].owner === owner &&
                    this.board.spaces[x-3][y].owner === owner) {
                    hasWon = true;
                    return hasWon;
                    }
            }

            //Checks if the space has at least 3 spaces Northwest of it
            if (cardinalArray[NW]) {
                console.log("NW");
                if (this.board.spaces[x-1][y+1].owner === owner &&
                    this.board.spaces[x-2][y+2].owner === owner &&
                    this.board.spaces[x-3][y+3].owner === owner) {
                    hasWon = true;
                    return hasWon;
                    }
            }
        }

        return hasWon;
    }

    switchPlayers() {
        for (let player of this.players) {
            player.active = !player.active;
        }
    }

    gameOver(message) {
        const element = document.querySelector("#game-over");
        element.textContent = message;
        element.style.display = "block";
    }

    updateGameState(token, target) {
        console.log("B");
        target.mark(token);

        if (this.checkForWin(target)) {
            
            this.gameOver(`${token.owner.name} has won!`);

        } else {
            
            this.switchPlayers();

            if(this.activePlayer.checkTokens()){

                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = !this.ready;

            } else {

                this.gameOver(`Game Over!`);

            }
        }
    }
}