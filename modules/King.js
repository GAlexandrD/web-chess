'use strict';

import Figure from './Figure.js';
import Pawn from './Pawn.js';

class King extends Figure {
  constructor(color) {
    super(color);
    if (color === 'white') this.domFigure.src = 'img/white/king-xl.png';
    if (color === 'black') this.domFigure.src = 'img/black/king-xl.png';
  }

  get moves() {
    const x = this.cell.x;
    const y = this.cell.y;
    let moves = this.board.cells.filter(
      (cell) =>
        cell.x - x <= 1 &&
        cell.x - x >= -1 &&
        cell.y - y <= 1 &&
        cell.y - y >= -1
    );
    return moves;
  }
}

export default King;
