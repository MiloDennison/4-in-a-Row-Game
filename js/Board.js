class Board {
    constructor(rows, columns) {

        this.rows = rows;
        this.columns = columns;
        this.spaces = this.createSpaces();

    }

    /**
     * 
     * @returns {array}
     */
    createSpaces() {
        const spaceArrayRow = [];
        
        for (let x = 0; x < this.columns; x++) {
            const spaceArrayCol = [];
            
            for (let y = 0; y < this.rows; y++) {

                spaceArrayCol.push( new Space(x, y) );

            }

            spaceArrayRow.push(spaceArrayCol);
        }

        return spaceArrayRow;
    }

    drawHTMLBoard() {

        for (let x = 0; x < this.columns; x++) {
            
            for (let y = 0; y < this.rows; y++) {

                this.spaces[x][y].drawSVGSpace();

            }

        }
    }
}