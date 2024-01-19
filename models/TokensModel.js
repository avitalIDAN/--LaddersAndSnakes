class player {
    constructor(color, i){
        this.id = i;
        this.active = false;
        this.color = color;
        this.progress = 0;
    }
    reset(){
        this.active = false;
        this.progress = 0;
    }
    progressTo(num){
        this.progress = num;
    }
    toActive(){
        this.active = true;
        this.progress = 1;
    }
}
class Dice{
    constructor(){
        
    }
    returnNumber(){
        return rand(1,6); 
    }
}

class TokensModel{
    constructor(){
        this.fourPlayers = [];
        this.fourPlayers[0] = new player("#3cb371", 0);
        this.fourPlayers[1] = new player("#ee82ee", 1);
        this.fourPlayers[2] = new player("#ffa500", 2);
        this.fourPlayers[3] = new player("#6a5acd", 3);

        this.numberActive = 0;
        this.dice = new Dice();

        this.currentPlayer = -1;
    }
    get numberInDice() {
        return this.dice.returnNumber();
    }
    addPlayer(){
        let numC = this.numberActive;
        if(numC < 4){
            this.fourPlayers[numC].toActive();
            this.numberActive +=1;
            return this.fourPlayers[numC];
        }
        else{
            return null;
        }
    }
    start(){
        if(this.numberActive > 0){
            this.currentPlayer = 0;
        }
    }
    reset(){
        this.fourPlayers[0].reset();
        this.fourPlayers[1].reset();
        this.fourPlayers[2].reset();
        this.fourPlayers[3].reset();

        this.numberActive = 0;
        this.currentPlayer = -1;
    }
    newTurn(){
        this.currentPlayer += 1;
        if(this.currentPlayer >= this.numberActive){
            this.currentPlayer -= this.numberActive;
        }
    }
    progressCurrentPlayer(num){
        this.fourPlayers[this.currentPlayer].progressTo(num);
    }
 }   


export default TokensModel;