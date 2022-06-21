'use strict';

import King from './King.js';

class Game {
  constructor(board) {
    this.board = board;
    this.movingSide = 'white';
    this.choosenFigure = null;
    this.chooseFigureEvent = this.chooseFigureEvent.bind(this);
    this.moveFigureEvent = this.moveFigureEvent.bind(this);
  }

  start() {
    this.board.DOMBoard.addEventListener('click', this.chooseFigureEvent);
  }

  switchMovingSide() {
    if (this.movingSide === 'white') {
      this.movingSide = 'black';
    } else this.movingSide = 'white';
  }

  chooseFigureEvent(event) {
    const figure = this.board.findFigure(event.target);
    if (!figure) return;
    if (figure.side !== this.movingSide) return;
    if (this.choosenFigure) this.noHighlight();
    this.highlight(figure);
    this.choosenFigure = figure;
    this.board.DOMBoard.addEventListener('click', this.moveFigureEvent);
  }

  moveFigureEvent(event) {
    const cell = this.board.cells.find(
      (cell) =>
        cell.domCell === event.target ||
        cell.domCell === event.target.parentElement
    );
    if (!this.choosenFigure.canMove(cell)) return;
    this.choosenFigure.move(cell);
    if (this.isCheck(this.movingSide)) {
      this.choosenFigure.backMove();
      return;
    }
    this.switchMovingSide();
    this.choosenFigure = null;
    this.noHighlight();
    if (this.isCheckmate(this.movingSide)) {
      document.body.innerHTML = '<h1>GAME OVER</h1>';
    }
    this.board.DOMBoard.removeEventListener('click', this.moveFigureEvent);
  }

  isCheck(side) {
    const king = this.board.figures.find(
      (figure) => figure instanceof King && figure.side === side
    );
    const figures = this.board.figures.filter((figure) => figure.side !== side);
    const kingCell = king.cell;
    for (const figure of figures) {
      if (figure.canMove(kingCell)) {
        return true;
      }
    }
    return false;
  }

  isCheckmate(side) {
    const figures = this.board.figures.filter((figure) => figure.side === side);
    for (const figure of figures) {
      for (const cell of figure.moves) {
        figure.move(cell);
        if (!this.isCheck(side)) {
          figure.backMove();
          return false;
        }
        figure.backMove();
      }
    }
    return true;
  }

  highlight(figure) {
    for (const cell of figure.moves) {
      if (figure.canMove(cell)) {
        cell.highlight = true;
        if (this.isCheck(figure.side)) {
          figure.move(cell);
          if (this.isCheck(figure.side)) {
            cell.highlight = false;
          }
          figure.backMove();
        }
      }
    }
  }

  noHighlight() {
    for (const cell of this.board.cells) {
      cell.highlight = false;
    }
  }
}

export default Game;
