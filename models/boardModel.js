const listNumberToShow = [[100,99,98,97,96,95,94,93,92,91],
                        [81,82,83,84,85,86,87,88,89,90],
                        [80,79,78,77,76,75,74,73,72,71],
                        [61,62,63,64,65,66,67,68,69,70],
                        [60,59,58,57,56,55,54,53,52,51],
                        [41,42,43,44,45,46,47,48,49,50],
                        [40,39,38,37,36,35,34,33,32,31],
                        [21,22,23,24,25,26,27,28,29,30],
                        [20,19,18,17,16,15,14,13,12,11],
                        [1,2,3,4,5,6,7,8,9,10]];
const Ladders = [[5,35], [23,57], [64,96], [69,91]]
const Snakes = [[24,18], [32,13], [67,46], [73,49], [80,58], [94,76]]
class Cell{
    constructor(number, i, j, maxNamber){
        this.i = i;
        this.j = j;
        this.jumpTo = null;
        this.numberToShow = listNumberToShow[j][i];
    }
}
class Ladder{
    constructor(numberS, numberF, i1,j1,i2,j2){
        this.numberStart = numberS;
        this.jumpTo = numberF;
        this.i_start = i1;
        this.j_start = j1;
        this.h = Math.abs(i1-i2);
        this.w = Math.abs(j1-j2);
    }
}
class Snake{
    constructor(numberS, numberF, i1,j1,i2,j2){
        this.numberStart = numberS;
        this.numberFinish = numberF;
        this.i_start = i1;
        this.j_start = j1;
        this.i_finish = i2;
        this.j_finish = j2;
    }
}


class BoardModel{
    constructor(){
        let maxNamber=10;
        this.listCells = [];
        this.listLadders = [];
        this.listSnakes = [];
        for (let i=0; i<maxNamber; i++){
            for (let j=0; j<maxNamber; j++){
                let number = i+10*j;
                this.listCells[number] = new Cell(number, i, j);
            }
        }
        
        for(let ladder of Ladders){
            let cell1 = this.listCells.find(c=>{
                return c.numberToShow==ladder[0];
            })
            cell1.jumpTo = ladder[1];
            let cell2 = this.listCells.find(c=>{
                return c.numberToShow==ladder[1];
            })
            this.listLadders.push(new Ladder(ladder[0], ladder[1], cell1.i, cell1.j, cell2.i, cell2.j));
        }
        for(let snake of Snakes){
            let cell1 = this.listCells.find(c=>{
                return c.numberToShow==snake[0];
            }) 
            cell1.jumpTo = snake[1]
            let cell2 = this.listCells.find(c=>{
                return c.numberToShow==snake[1];
            }) 
            this.listSnakes.push(new Snake(snake[0], snake[1], cell1.i, cell1.j, cell2.i, cell2.j));
        }
    }
    returnCellByNum(num){
        return this.listCells.find(c=>{
            return c.numberToShow==num;
        })
    }
 }   

export default BoardModel;