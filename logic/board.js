import {getBoardModel, addPlayer, throwingDice, nextTurn, getPlayers, newGame, getCurrentPlayer, startGame, replase} from './logicToModel.js'
import zim from "https://zimjs.org/cdn/015/zim";

const moveGlobal = 50;
let finish = false;

function showMassage(S, massage, size,  color="white"){
    const victoryText = new Label(massage, size, "Arial", color)
    .centerReg()
    .addTo(S);
    victoryText.animate({
        obj: { scaleX: 1.2, scaleY: 1.2, y: victoryText.y - 50 },
        time: 1000,
        loop: false,
        call: () => {
            victoryText.animate({
                obj: { scaleX: 1, scaleY: 1, y: victoryText.y },
                time: 500,
                loop: false
            });
        }});

        timeout(3, ()=>{victoryText.visible = false});

}

function win(S){
    finish == true;

    showMassage(S, "ניצחון", 60)
}

function placeSnake(snak, size, rectangles){
    let toCenter = size/3;
    const x1 =  moveGlobal + snak.i_start*size + toCenter;
    const y1 =   moveGlobal + snak.j_start*size + toCenter;
    const cx1 = x1 - size;
    const cy1 = y1 + size;
    const x2 =  moveGlobal + snak.i_finish*size + toCenter;
    const y2 =  moveGlobal + snak.j_finish*size + toCenter;
    
    const spline = new Shape()
        .loc(null, null, rectangles)
        .graphics
        .ss(15) 
        .s("gray") 
        .mt(x1, y1)
        .curveTo(cx1, cy1, x2, y2);


}
function packagelaceLadder(ladder, size, rectangles){
 

    let toCenter = size/3;
    const image = new Pic("../assets/ladder.png", ladder.h, ladder.w)
    .loc(ladder.i_start * size + moveGlobal + 10, (ladder.j_start - 2) * size, rectangles);


}
function placeCell(cell, size, rectangles){
    let i = moveGlobal + size*cell.i;
    let j = moveGlobal + size*cell.j; 
    new Rectangle(size,size, green, black)
        .loc(i, j, rectangles) 
    new Label(cell.numberToShow,size/3,null, red)
        .loc(i, j, rectangles)
}
let listTokens = [];
function placeToken(token, size, W, S, isAnimate = false, jumpTo = 0){
    if(!token.active){
        let x = W-5*moveGlobal + token.id*size;
        let y = moveGlobal+3*size;
        if(listTokens[token.id]==null){
            let circle = new Circle(size/3, token.color)
            .loc(x, y, S);
            listTokens[token.id] = circle;

        }
        else{
            let circle = listTokens[token.id];
            circle.x = x;
            circle.y = y;
        }
    }
    else{
        let cell =  boardModel.returnCellByNum(token.progress);
        let circle = listTokens[token.id];

        let x = moveGlobal + size*cell.i + size/2 + token.id*3;
        let y = moveGlobal + size*cell.j + size/2;
        
        circle.x = x;
        circle.y = y;

        if(isAnimate){
            replase(jumpTo);
            let cell =  boardModel.returnCellByNum(jumpTo);
            let x = moveGlobal + size*cell.i + size/2 + token.id*3;
            let y = moveGlobal + size*cell.j + size/2;
            
            circle.animate({x:x,y:y}, 1);  
        }
    }

}
function placeDice(size, S, W, H){
    let buttonDice = new Button(2*size, 2*size, "1")
    .loc(W-5*moveGlobal, H-5*moveGlobal, S);
    buttonDice.on("click", () => {
        buttonDice.label.text = "";
        let numDice = throwingDice();
        buttonDice.label.text = numDice;
        S.update();

        let player = getCurrentPlayer();
        if(player!=null&&finish == false){
            if(player.progress+numDice>=100){
                replase(100);
                placeToken(player, size, W, S);
                win(S);
                return;
            }
            let goTo = player.progress+numDice;
            let cell =  boardModel.returnCellByNum(player.progress+numDice);

            replase(goTo);
            if(cell.jumpTo!=null){
                placeToken(player, size, W, S, true, cell.jumpTo);
            }
            else{
                placeToken(player, size, W, S);
            }
    
            nextTurn();
            player = getCurrentPlayer();
            CurrentPlayerColor(player.color);
        }

      })


}

function placeButtons(size, S, W, H){
    // Add player: 
    let buttonAddPlayer = new Button(3*size, size, "הוסף שחקן")
    .loc(W-5*moveGlobal, moveGlobal, S);
    buttonAddPlayer.on("click", () => {
        let player = addPlayer();
        if(player!=null){
            placeToken(player, size, W, S);
        }
        else{
            showMassage(S, "אפשר רק 4 שחקנים", 30)
        }
    })

    // Start play: 
    let startPlay = new Button(3*size, size, "התחל משחק")
        .loc(W-5*moveGlobal, moveGlobal+size+10, S);
    startPlay.on("click", () => {
        finish = false;
        startGame();
        let p = getCurrentPlayer();
        if(p==undefined){
            showMassage(S, "אין שחקנים ", 30)
            return;
        }
        startPlay.visible = false;
        nowPlay.visible = true;
        buttonAddPlayer.visible = false; 
        FrameCurrent.visible = true;
        CurrentPlayerColor(p.color);
        
    })
    // Now play: 
    let nowPlay = new Button(3*size, size, "משחק חדש")
        .loc(W-5*moveGlobal, moveGlobal+size+10, S);
    nowPlay.visible = !startPlay.visible;
    nowPlay.on("click", () => {
        startPlay.visible = !startPlay.visible;
        nowPlay.visible = !nowPlay.visible;
        buttonAddPlayer.visible = !buttonAddPlayer.visible;
        FrameCurrent.visible = !FrameCurrent.visible
        newGame();
        for (let player of getPlayers()){
            placeToken(player, size, W, S)
        }
        CurrentPlayerColor();
    })

    
    let FrameCurrent = new Container().addTo(S);
    FrameCurrent.visible = !startPlay.visible;
    new Label("משחק כעת", size/2)
        .loc(W-5*moveGlobal+size, moveGlobal+4*(size+10), FrameCurrent)
    RectangleCurrent = new Rectangle(size/2,size/2, black)
        .loc(W-5*moveGlobal, moveGlobal+4*(size+10), FrameCurrent);
}
let RectangleCurrent;
function CurrentPlayerColor(color = black){
    RectangleCurrent.color = color;
}

let boardModel = getBoardModel();
export class ShowBoard{
    constructor(F, S, W, H){
        this.F =F;
        this.S =S;
        this.W =W;
        this.H =H;
        this.laod(F, S, W, H);
    }
    laod(F, S, W, H){

        this.sizeBoard = (W>H?H:W) - 2*moveGlobal;
        let size = this.sizeBoard/10;
        this.size = size;
        let rectangles = new Container().addTo(S);

        for (let cell of boardModel.listCells){
            placeCell(cell, size, rectangles);
        }
        for (let ladder of boardModel.listLadders){
            packagelaceLadder(ladder, size, S);
        }
        for (let snake of boardModel.listSnakes){
            placeSnake(snake, size, S);
        }
        for (let player of getPlayers()){
            placeToken(player, size, W, S)
        }
        
        placeDice(size, S, W, H);
        placeButtons(size, S, W, H);
    }
    currentPlayerLocation(player){
        placeToken(player, this.size, this.W, this.S);
        CurrentPlayerColor(player.color);
    }
}
export default ShowBoard;
