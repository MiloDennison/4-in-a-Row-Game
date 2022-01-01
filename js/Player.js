class Player {

    constructor(name, id, color, active = false) {

        if(typeof id !== 'boolean') {

            throw new Error("Boolean expected");

        }
        
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
    }
    
    /**
     * 
     * @param {integer} num 
     * @returns {array} tokenArray
     */
    createTokens(num) {

        const tokenArray = [];
        
        for (let i = 0; i < num; i++) {

            tokenArray.push( new Token(this, i) );

        }

        return tokenArray;

    }

    get unusedTokens() {        
        return this.tokens.filter(token => !token.dropped)
    }

    get activeToken() {
        return this.unusedTokens.shift();
    }

    checkTokens() {
        return (this.unusedTokens.length > 0) ? true : false;
    }
}