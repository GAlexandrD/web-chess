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
    this.board.domBoard.addEventListener('click', this.chooseFigureEvent);
  }

  switchMovingSide() {
    if (this.movingSide === 'white') {
      this.movingSide = 'black';
    } else this.movingSide = 'white';
  }

  chooseFigureEvent(event) {
    const figure = this.board.findFigure(event.target);
    console.log(event.target);
    if (!figure) return;
    if (figure.side !== this.movingSide) return;
    if (this.choosenFigure) this.noHighlight();
    this.highlight(figure);
    this.choosenFigure = figure;
    this.board.domBoard.addEventListener('click', this.moveFigureEvent);
  }

  moveFigureEvent(event) {
    const cell = this.board.cells.find(
      (cell) =>
        cell.domCell === event.target ||
        cell.domCell === event.target.parentElement
    );
    if (!this.choosenFigure.canMove(cell)) return;
    if (this.isCheckMove(this.choosenFigure, cell)) return;
    this.choosenFigure.move(cell);
    this.switchMovingSide();
    this.choosenFigure = null;
    this.noHighlight();
    if (this.isCheckmate(this.movingSide)) {
      console.log(this.movingSide, this.movingSide === 'black');
      if (this.movingSide === 'black') this.gameOver('white');
      else this.gameOver('black');
    }
    this.board.domBoard.removeEventListener('click', this.moveFigureEvent);
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

  isCheckMove(figure, cell) {
    figure.testMove(cell);
    const isCheck = this.isCheck(figure.side);
    figure.backMove();
    return isCheck;
  }

  isCheckmate(side) {
    if (!this.isCheck(side)) return false;
    const figures = this.board.figures.filter((figure) => figure.side === side);
    for (const figure of figures) {
      for (const cell of figure.moves) {
        const isCheck = this.isCheckMove(figure, cell);
        if (!isCheck) return false;
      }
    }
    return true;
  }

  highlight(figure) {
    for (const cell of figure.moves) {
      if (figure.canMove(cell)) {
        cell.highlight = true;
        if (this.isCheckMove(figure, cell)) {
          cell.highlight = false;
        }
      }
    }
  }

  noHighlight() {
    for (const cell of this.board.cells) {
      cell.highlight = false;
    }
  }

  gameOver(winner) {
    console.log(winner);
    document.body.innerHTML = '';
    const massage = document.createElement('div');
    massage.classList.add('gameover');
    massage.innerHTML = `Game over, ${winner} side won!`;
    document.body.append(massage);
  }
}

export default Game;
