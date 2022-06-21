'use strict';

import Figure from './Figure.js';

class Rook extends Figure {
  constructor(board, cell, color) {
    super(board, cell, color);
    if (color === 'white') this.domFigure.src = 'img/white/tura.png';
    if (color === 'black') this.domFigure.src = 'img/black/rook-xl.png';
  }

  get moves() {
    const moves = [
      ...this.board.getHorizontal(this),
      ...this.board.getVertical(this),
    ];
    return moves;
  }
}

export default Rook;
