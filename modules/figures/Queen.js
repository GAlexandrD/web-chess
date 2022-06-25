'use strict';

import Figure from './Figure.js';

class Queen extends Figure {
  constructor(color) {
    super(color);
    if (color === 'white') this.domFigure.src = 'img/white/queen-xl.png';
    if (color === 'black') this.domFigure.src = 'img/black/queen-xl.png';
  }

  get moves() {
    const moves = [
      ...this.board.getMainDiagonal(this),
      ...this.board.getSecDiagonal(this),
      ...this.board.getVertical(this),
      ...this.board.getHorizontal(this),
    ];
    return moves;
  }
}

export default Queen;
