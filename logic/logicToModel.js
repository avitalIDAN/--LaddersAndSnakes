import TokensModel from '../models/TokensModel.js';
import BoardModel from '../models/boardModel.js';
let tokensModel = new TokensModel();
let boardModel = new BoardModel();

export function getBoardModel(){
    return boardModel;
}

export function throwingDice(){
    return tokensModel.numberInDice;
}

export function addPlayer(){
    return tokensModel.addPlayer();
}


export function newGame(){
    tokensModel.reset();
}

export function startGame(){
    tokensModel.start()
}

export function replase(numberJump){
    tokensModel.progressCurrentPlayer(numberJump);
}

export function nextTurn(){
    tokensModel.newTurn();
}

export function getPlayers(){
    return tokensModel.fourPlayers;
}

export function getCurrentPlayer(){
    return tokensModel.fourPlayers[tokensModel.currentPlayer];
}