'use strict';

class Figure {
  constructor(board, coords, color) {
    const cell = board.getCell(coords.x, coords.y);
    const domFigure = document.createElement('img');
    domFigure.classList.add('figure');
    this.side = color;
    this.domFigure = domFigure;
    cell.curFigure = this;
    this.cell = cell;
    this.board = board;
    this.beatedFigure = null;
    this.prevCell = null;
    board.addFigure(this, cell);
  }

  backMove() {
    if (!this.prevCell) return;
    if (this.beatedFigure) {
      this.board.addFigure(this.beatedFigure, this.cell);
    } else this.cell.curFigure = null;
    this.cell = this.prevCell;
    this.cell.curFigure = this;
    this.cell.domCell.append(this.domFigure);
  }

  beat(figure) {
    if (!this.board) return;
    this.prevCell = this.cell;
    this.beatedFigure = figure;
    this.cell.curFigure = null;
    this.cell = figure.cell;
    this.board.removeFigure(figure);
    this.cell.domCell.append(this.domFigure);
    this.cell.curFigure = this;
  }

  move(cell) {
    this.prevCell = this.cell;
    if (!this.canMove(cell)) return;
    if (cell.curFigure) {
      this.beat(cell.curFigure);
      return;
    }
    this.cell.curFigure = null;
    this.cell = cell;
    cell.domCell.append(this.domFigure);
    cell.curFigure = this;
    this.beatedFigure = null;
  }

  canMove(cell) {
    if (!this.board) return;
    if (!this.moves.includes(cell)) return false;
    if (!cell.curFigure) return true;
    if (cell.curFigure.side !== this.side) return true;
    else return false;
  }
}

export default Figure;
