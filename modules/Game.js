'use strict';

import King from './figures/King.js';

class Game {
  constructor(board) {
    this.board = board;
    this.movingSide = 'white';
    this.choosen = null;
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
    if (!figure) return;
    if (figure.side !== this.movingSide) return;
    if (this.choosen) this.noHighlight();
    this.highlight(figure);
    this.choosen = figure;
    this.board.domBoard.addEventListener('click', this.moveFigureEvent);
  }

  moveFigureEvent(event) {
    const cell = this.board.findCell(event.target);
    if (!this.choosen.canMove(cell)) return;
    if (this.isCheckMove(this.choosen, cell)) return;
    this.choosen.move(cell);
    this.switchMovingSide();
    this.choosen = null;
    this.noHighlight();
    if (this.isCheckmate(this.movingSide)) {
      if (this.movingSide === 'black') this.gameOver('white');
      else this.gameOver('black');
    }
    this.board.domBoard.removeEventListener('click', this.moveFigureEvent);
  }

  isCheck(side) {
    const king = this.board.figures.find(
      (figure) => figure instanceof King && figure.side === side
    );
    const figures = this.board.figures;
    const enemies = figures.filter((figure) => figure.side !== side);
    const kingCell = king.cell;
    for (const figure of enemies) {
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
    const figures = this.board.figures;
    const allies = figures.filter((figure) => figure.side === side);
    for (const figure of allies) {
      for (const cell of figure.moves) {
        const isCheck = this.isCheckMove(figure, cell);
        if (!isCheck) return false;
      }
    }
    return true;
  }

  highlight(figure) {
    for (const cell of figure.moves) {
      const canMove = figure.canMove(cell);
      const isCheckMove = this.isCheckMove(figure, cell);
      if (canMove && !isCheckMove) {
        cell.highlight = true;
      }
    }
  }

  noHighlight() {
    for (const cell of this.board.cells) {
      cell.highlight = false;
    }
  }

  gameOver(winner) {
    document.body.innerHTML = '';
    const massage = document.createElement('div');
    massage.classList.add('gameover');
    massage.innerHTML = `Game over, ${winner} side won!`;
    document.body.append(massage);
  }
}

export default Game;
