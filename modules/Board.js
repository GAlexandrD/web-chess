'use strict';

import Cell from './Cell.js';

class Board {
  constructor(height, width) {
    this.figures = [];
    this.cells = [];
    this.height = height;
    this.width = width;
    const DOMBoard = document.createElement('div');
    DOMBoard.classList.add('field');
    document.body.append(DOMBoard);
    this.DOMBoard = DOMBoard;
    this.#createField();
  }

  #createField() {
    for (let i = 1, flag = true; i <= this.height; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      this.DOMBoard.append(row);
      for (let j = 1; j <= this.width; j++, flag = !flag) {
        let cell = new Cell(this, j, i, 'white');
        if (flag) {
          cell = new Cell(this, j, i, 'black');
        }
        this.cells.push(cell);
        row.append(cell.domCell);
      }
      flag = !flag;
    }
  }

  addFigure(figure, cell) {
    this.figures.push(figure);
    cell.domCell.append(figure.domFigure);
    figure.board = this;
    cell.curFigure = figure;
  }

  removeFigure(figure) {
    this.figures = this.figures.filter((piece) => piece !== figure);
    figure.board = null;
    figure.cell.curFigure = null;
    figure.domFigure.remove();
  }

  getCell(x, y) {
    return this.cells.find((cell) => cell.x === x && cell.y === y);
  }

  findFigure(domEl) {
    return this.figures.find((figure) => figure.domFigure === domEl);
  }

  getHorizontal(figure) {
    const x = figure.cell.x;
    const y = figure.cell.y;
    const moves = [];
    for (let i = x + 1; ; i++) {
      const cell = this.getCell(i, y);
      if (!cell) break;
      moves.push(cell);
      if (cell.curFigure) break;
    }
    for (let i = x - 1; ; i--) {
      const cell = this.getCell(i, y);
      if (!cell) break;
      moves.push(cell);
      if (cell.curFigure) break;
    }
    return moves;
  }

  getVertical(figure) {
    const x = figure.cell.x;
    const y = figure.cell.y;
    const moves = [];
    for (let i = y + 1; ; i++) {
      const cell = this.getCell(x, i);
      if (!cell) break;
      moves.push(cell);
      if (cell.curFigure) break;
    }
    for (let i = y - 1; ; i--) {
      const cell = this.getCell(x, i);
      if (!cell) break;
      moves.push(cell);
      if (cell.curFigure) break;
    }
    return moves;
  }

  getMainDiagonal(figure) {
    const x = figure.cell.x;
    const y = figure.cell.y;
    const moves = [];
    for (let i = x + 1, j = y + 1; ; i++, j++) {
      const cell = this.getCell(i, j);
      if (!cell) break;
      moves.push(cell);
      if (cell.curFigure) break;
    }
    for (let i = x - 1, j = y - 1; ; i--, j--) {
      const cell = this.getCell(i, j);
      if (!cell) break;
      moves.push(cell);
      if (cell.curFigure) break;
    }
    return moves;
  }

  getSecDiagonal(figure) {
    const x = figure.cell.x;
    const y = figure.cell.y;
    const moves = [];
    for (let i = x + 1, j = y - 1; ; i++, j--) {
      const cell = this.getCell(i, j);
      if (!cell) break;
      moves.push(cell);
      if (cell.curFigure) break;
    }
    for (let i = x - 1, j = y + 1; ; i--, j++) {
      const cell = this.getCell(i, j);
      if (!cell) break;
      moves.push(cell);
      if (cell.curFigure) break;
    }
    return moves;
  }
}

export default Board;
