'use strict';

import Figure from './Figure.js';

class Bishop extends Figure {
  constructor(board, cell, color) {
    super(board, cell, color);
    if (color === 'white') this.domFigure.src = 'img/white/bishop-xxl.png';
    if (color === 'black') this.domFigure.src = 'img/black/bishop-xl.png';
  }

  get moves() {
    const moves = [
      ...this.board.getMainDiagonal(this),
      ...this.board.getSecDiagonal(this),
    ];
    return moves;
  }
}

export default Bishop;
