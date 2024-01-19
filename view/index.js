import ShowBoard from '../logic/board.js';
import zim from "https://zimjs.org/cdn/015/zim";

const frame = new Frame(FIT, 1024, 768, light, dark, ready);
function ready() {
    const showBoard = new ShowBoard(frame, frame.stage, frame.width, frame.height);
       
} 