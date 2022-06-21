'use strict';

import Figure from './Figure.js';
import Pawn from './Pawn.js';

class King extends Figure {
  constructor(board, cell, color) {
    super(board, cell, color);
    if (color === 'white') this.domFigure.src = 'img/white/king-xl.png';
    if (color === 'black') this.domFigure.src = 'img/black/king-xl.png';
  }

  getKingBasicMoves(king) {
    const x = king.cell.x;
    const y = king.cell.y;
    return king.board.cells.filter(
      (cell) =>
        cell.x - x <= 1 &&
        cell.x - x >= -1 &&
        cell.y - y <= 1 &&
        cell.y - y >= -1
    );
  }

  get moves() {
    const x = this.cell.x;
    const y = this.cell.y;
    let moves = this.getKingBasicMoves(this);
    const enemies = this.board.figures.filter(
      (figure) => figure.side !== this.side
    );
    for (const enemy of enemies) {
      let figureMoves = [];
      if (enemy instanceof King) {
        figureMoves = this.getKingBasicMoves(enemy);
      } else if (enemy instanceof Pawn) {
        figureMoves = enemy.moves.filter((cell) => cell && cell.x !== x);
      } else figureMoves = enemy.moves;
      moves = moves.filter((cell) => !figureMoves.includes(cell));
    }
    return moves;
  }
}

export default King;
