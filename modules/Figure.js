'use strict';

class Figure {
  constructor(color) {
    const domFigure = document.createElement('img');
    domFigure.classList.add('figure');
    this.side = color;
    this.domFigure = domFigure;
    this.cell = null;
    this.board = null;
    this.beatedFigure = null;
    this.prevCell = null;
  }

  move(cell) {
    if (!this.canMove(cell)) return;
    if (cell.curFigure) this.beat(cell.curFigure);
    this.cell.curFigure = null;
    this.cell = cell;
    cell.domCell.append(this.domFigure);
    cell.curFigure = this;
  }

  beat(figure) {
    this.board.removeFigure(figure);
    let beated = document.querySelector('.beatedWhite');
    if (figure.side === 'black') {
      beated = document.querySelector('.beatedBlack');
    }
    figure.domFigure.classList.add('beated');
    beated.append(figure.domFigure);
  }

  testMove(cell) {
    this.prevCell = this.cell;
    this.beatedFigure = null;
    if (!this.canMove(cell)) return;
    if (cell.curFigure) this.testBeat(cell.curFigure);
    this.cell.curFigure = null;
    this.cell = cell;
    cell.curFigure = this;
  }

  testBeat(figure) {
    this.beatedFigure = figure;
    this.board.removeFigure(figure);
  }

  backMove() {
    if (!this.prevCell) return;
    if (this.beatedFigure) {
      this.board.addFigure(this.beatedFigure, this.cell);
    } else this.cell.curFigure = null;
    this.cell = this.prevCell;
    this.cell.curFigure = this;
  }

  canMove(cell) {
    if (!this.board) return false;
    if (!cell) return false;
    if (!this.moves.includes(cell)) return false;
    if (!cell.curFigure) return true;
    if (cell.curFigure.side !== this.side) return true;
    return false;
  }
}

export default Figure;
