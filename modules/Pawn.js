'use strict';

import Figure from './Figure.js';
import Knight from './Knight.js';
import Rook from './Rook.js';
import Bishop from './Bishop.js';
import Queen from './Queen.js';
import Cell from './Cell.js';

class Pawn extends Figure {
  constructor(board, coords, color) {
    super(board, coords, color);
    if (color === 'white') this.domFigure.src = 'img/white/pawn.png';
    if (color === 'black') this.domFigure.src = 'img/black/pawn-xl.png';
    this.firstStep = true;
    this.initialCell = this.cell;
    this.chooseFigure = this.chooseFigure.bind(this);
  }

  backMove() {
    if (this.prevCell === this.initialCell) {
      this.firstStep = true;
    }
    super.backMove();
  }

  move(cell) {
    super.move(cell);
    this.firstStep = false;
    const topBorder = this.board.height;
    const bottomBorder = 1;
    if (cell.y === topBorder || cell.y === bottomBorder) {
      const choicePanel = document.querySelector('.chooseFigure');
      choicePanel.addEventListener('click', this.chooseFigure);
      choicePanel.style.display = 'flex';
    }
  }

  chooseFigure(event) {
    const choicePannel = document.querySelector('.chooseFigure');
    if (event.target.classList.contains('Knight')) {
      const knight = new Knight(
        this.board,
        { x: this.cell.x, y: this.cell.y },
        this.side
      );
    }
    if (event.target.classList.contains('Rook')) {
      const rook = new Rook(
        this.board,
        { x: this.cell.x, y: this.cell.y },
        this.side
      );
    }
    if (event.target.classList.contains('Queen')) {
      const queen = new Queen(
        this.board,
        { x: this.cell.x, y: this.cell.y },
        this.side
      );
    }
    if (event.target.classList.contains('Bishop')) {
      const bishop = new Bishop(
        this.board,
        { x: this.cell.x, y: this.cell.y },
        this.side
      );
    }
    this.board.removeFigure(this);
    choicePannel.removeEventListener('click', this.chooseFigure);
    choicePannel.style.display = 'none';
  }

  canMove(cell) {
    const toward = this.moves.filter((cell) => cell && cell.x === this.cell.x);
    if (toward.includes(cell)) {
      if (cell.curFigure) return false;
      else return super.canMove(cell);
    } else {
      if (!cell.curFigure) return false;
      else return super.canMove(cell);
    }
  }

  get moves() {
    const x = this.cell.x;
    const y = this.cell.y;
    const moves = [];
    if (this.side === 'white') {
      moves.push(this.board.getCell(x, y + 1));
      if (this.firstStep) moves.push(this.board.getCell(x, y + 2));
      const right = this.board.getCell(x + 1, y + 1);
      const left = this.board.getCell(x - 1, y + 1);
      if (right) moves.push(right);
      if (left) moves.push(left);
    }
    if (this.side === 'black') {
      moves.push(this.board.getCell(x, y - 1));
      if (this.firstStep) moves.push(this.board.getCell(x, y - 2));
      const right = this.board.getCell(x + 1, y - 1);
      const left = this.board.getCell(x - 1, y - 1);
      if (right) moves.push(right);
      if (left) moves.push(left);
    }
    return moves;
  }
}

export default Pawn;
