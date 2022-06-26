'use strict';

class Cell {
  constructor(x, y, color) {
    const domCell = document.createElement('div');
    domCell.classList.add(color, 'cell');
    this.x = x;
    this.y = y;
    this.curFigure = null;
    this.domCell = domCell;
  }

  set highlight(value) {
    if (value) this.domCell.classList.add('highlight');
    else this.domCell.classList.remove('highlight');
  }
}

export default Cell;
