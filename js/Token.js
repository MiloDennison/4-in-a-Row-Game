class Token {
    constructor(owner, index) {

        this.owner = owner;
        this.id = `token-${owner.id ? '1' : '2'}-${index}`;
        this.dropped = false;
        this.columnLocation = 0;
        this.rowLocation = 0;
    }

    get htmlToken() {

        return document.querySelector(`#${this.id}`);

    }

    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }

    get cardinality() {
        let cardinalArray = new Array(8).fill(false);
        if (this.rowLocation < 3) {
            cardinalArray[0] = true;
        }
        if (this.columnLocation < 4) {
            cardinalArray[2] = true;
        }
        if (this.rowLocation > 2) {
            cardinalArray[4] = true;
        }
        if (this.columnLocation > 2) {
            cardinalArray[6] = true;
        }
        if (cardinalArray[0] && cardinalArray[2]) {
            cardinalArray[1] = true;
        }
        if (cardinalArray[2] && cardinalArray[4]) {
            cardinalArray[3] = true;
        }
        if (cardinalArray[4] && cardinalArray[6]) {
            cardinalArray[5] = true;
        }
        if (cardinalArray[6] && cardinalArray[0]) {
            cardinalArray[7] = true;
        }
       console.table(cardinalArray);
       return cardinalArray;
    }

    /**
     * 
     */
    drawHTMLToken() {

        const element = document.createElement("div");

        element.setAttribute("id", this.id);
        element.setAttribute("class", "token");
        element.style.backgroundColor = this.owner.color;

        document.querySelector("#game-board-underlay").appendChild(element);
    }

    /**
     * 
     */
    moveLeft() {
        if(this.columnLocation > 0){
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation--;
        }
    }

    /**
     * 
     * @param {integer} columns 
     */
    moveRight(columns) {
        if(this.columnLocation < columns - 1){
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation++;
        }
    }

    /**
     * 
     * @param {Object} target 
     * @param {Function} reset 
     */
    drop(target, reset) {
        this.dropped = !this.dropped;
        console.log(`{${this.columnLocation},${this.rowLocation})`)
        this.cardinality;

        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }
}