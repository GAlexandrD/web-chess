'use strict';
import Figure from './Figure.js';

class Knight extends Figure {
  constructor(color) {
    super(color);
    if (color === 'white') this.domFigure.src = 'img/white/horse.png';
    if (color === 'black') this.domFigure.src = 'img/black/knight-xl.png';
  }

  get moves() {
    const x = this.cell.x;
    const y = this.cell.y;
    const moves = [];
    const potentialMoves = [
      { x: x + 1, y: y + 2 },
      { x: x + 1, y: y - 2 },
      { x: x - 1, y: y + 2 },
      { x: x - 1, y: y - 2 },
      { x: x + 2, y: y + 1 },
      { x: x + 2, y: y - 1 },
      { x: x - 2, y: y + 1 },
      { x: x - 2, y: y - 1 },
    ];
    for (const move of potentialMoves) {
      const cell = this.board.getCell(move.x, move.y);
      if (!cell) continue;
      moves.push(cell);
    }
    console.log(moves);
    return moves;
  }
}

export default Knight;
