class XO{
    /**
     * @param {Array<Array>} field 
     * @returns {String} 
     * 'x': win x 
     * 'o': win 0
     * 'draw': 'draw' if all field fill and no one win
     * null: game continue
     */
    static solveField(field){
        for(let i = 0; i < 3; ++i){
            if(field[i][0] == field[i][1] && field[i][0] == field[i][2]) return field[i][0];
            if(field[0][i] == field[1][i] && field[0][i] == field[2][i]) return field[0][i];
        }
        if(field[0][0] == field[1][1] && field[0][0] == field[2][2]) return field[0][0];
        if(field[2][0] == field[1][1] && field[0][2] == field[1][1]) return field[2][0];

        if(
            field[0].filter(Boolean).length === 3
            && field[1].filter(Boolean).length === 3
            && field[2].filter(Boolean).length === 3
        ) return 'draw';
        return null;
    }
}
class Node{
    static getNextPlayer(player){
        const mapPlNextPl = {
            'x': 'o',
            'o': 'x'
        }
        return mapPlNextPl[player];
    }

    constructor(field, player='o'){
        this.player = player;
        this.field = JSON.parse(JSON.stringify(
            field 
            ||  Array.from({ length: 3 }, () => 
                    Array.from({ length: 3 }, () => null)
                )
        ));
        this.items = [];
        this.result = null;
    }
    getResult(){
        console.log(this.result)
        return this.result;
    }
    setResult(result){
        this.result = result;
    }
    getArrayNoFillPoints(){
        const res = [];
        for(let i = 0; i < 3; ++i){
            for(let j = 0; j < 3; ++j){
                if(this.field[i][j]) continue;
                res.push({
                    i: i,
                    j: j
                })
            }
        }
        return res;
    }
    getItemsToChange(){
        return this.items;
    }
    getPlayer(){
        return this.player;
    }
    getField(){
        return this.field;
    }
    getFieldToCopy(){
        return JSON.parse(JSON.stringify(this.field));
    }
}
class XOTreeSolver {
    constructor(){
        this.root = new Node([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]);
    }
    fillTree(){
        this.fillNodesRecursive(this.root);
    }
    getCountParties(){

    }
    /**
     * @param {Node} node 
     */
    fillNodesRecursive(node){
        const player = node.getPlayer();
        const nextPlayer = Node.getNextPlayer(player);

        const noFillPointsArr = node.getArrayNoFillPoints();
        let fieldToChange = null;

        for(const point of noFillPointsArr){
            fieldToChange = node.getFieldToCopy();
            fieldToChange[point.i][point.j] = nextPlayer;
            const nextNode = new Node(fieldToChange, nextPlayer);

            node.items.push(nextNode);
        }

        for(const childNode of node.getItemsToChange()){
            this.fillNodesRecursive(childNode);
        }
    }

    fillNodesResultByRoot(){
        this.fillNodeRecursive(this.root);
    }
    fillNodeRecursive(node){
        const lenItems = node.getItemsToChange().length;

        const resultOfNode = XO.solveField(node.getField());
        if(
            resultOfNode === 'x' 
            || resultOfNode === 'o' 
            || lenItems === 0
        ){
            node.setResult(resultOfNode);
            return;
        }

        for(const n of node.getItemsToChange()){
            const res_n = XO.solveField(n.getField())
            if(res_n === 'x' || res_n === 'o'){
                n.setResult(res_n);
            }
            else{
                this.fillNodeRecursive(n);
            }
        }

        const filterRes = (el) => (solved) => el.getResult() === solved;
        for(const r of ['x', 'o', 'draw']){
            if(
                node.getItemsToChange()
                .filter(el => filterRes(el)(r))
                .length === lenItems
            ){
                node.setResult(r);
                for(const n of node.getItemsToChange()){
                    n.setResult(null);
                }
                return;
            }
        }
        node.setResult(null);
    }

    getInfo(){
        return this.getCountsParties();
    }
    getCountsParties(){
        const strRoot = JSON.stringify(this.root);
        const countX = (strRoot.match(new RegExp('"result":"x"', 'g')) || []).length;
        const countO = (strRoot.match(new RegExp('"result":"o"', 'g')) || []).length;
        const countDraw = (strRoot.match(new RegExp('"result":"draw"', 'g')) || []).length;
        return {
            all: countDraw + countX + countO,
            x: countX,
            o: countO,
            draw: countDraw
        }
    }
}
export {
    XOTreeSolver, XO, Node
}