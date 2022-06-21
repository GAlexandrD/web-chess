'use strict';

import Figure from './Figure.js';
import Knight from './Knight.js';
import Rook from './Rook.js';
import Bishop from './Bishop.js';
import Queen from './Queen.js';
import Cell from './Cell.js';

class Pawn extends Figure {
  constructor(color) {
    super(color);
    if (color === 'white') this.domFigure.src = 'img/white/pawn.png';
    if (color === 'black') this.domFigure.src = 'img/black/pawn-xl.png';
    this.firstStep = true;
    this.chooseFigure = this.chooseFigure.bind(this);
  }

  move(cell) {
    super.move(cell);
    this.firstStep = false;
    const topBorder = cell.y === this.board.height;
    const bottomBorder = cell.y === 1;
    if (topBorder || bottomBorder) {
      const choicePanel = document.querySelector('.chooseFigure');
      choicePanel.addEventListener('click', this.chooseFigure);
      choicePanel.style.display = 'flex';
    }
  }

  chooseFigure(event) {
    const choicePannel = document.querySelector('.chooseFigure');
    let figure = null;
    if (event.target.classList.contains('Knight')) {
      figure = new Knight(this.side);
    }
    if (event.target.classList.contains('Rook')) {
      figure = new Rook(this.side);
    }
    if (event.target.classList.contains('Queen')) {
      figure = new Queen(this.side);
    }
    if (event.target.classList.contains('Bishop')) {
      figure = new Bishop(this.side);
    }
    this.board.addFigure(figure, { x: this.cell.x, y: this.cell.y });
    this.board.removeFigure(this);
    this.domFigure.remove();
    choicePannel.removeEventListener('click', this.chooseFigure);
    choicePannel.style.display = 'none';
  }

  canMove(cell) {
    if (!super.canMove(cell)) return false;
    const toward = this.moves.filter((cell) => cell.x === this.cell.x);
    if (toward.includes(cell)) {
      if (cell.curFigure) return false;
    } else if (!cell.curFigure) return false;
    return true;
  }

  get moves() {
    const x = this.cell.x;
    const y = this.cell.y;
    const moves = [];
    if (this.side === 'white') {
      moves.push(
        this.board.getCell(x, y + 1),
        this.board.getCell(x + 1, y + 1),
        this.board.getCell(x - 1, y + 1)
      );
      if (this.firstStep) moves.push(this.board.getCell(x, y + 2));
    }
    if (this.side === 'black') {
      moves.push(
        this.board.getCell(x, y - 1),
        this.board.getCell(x + 1, y - 1),
        this.board.getCell(x - 1, y - 1)
      );
      if (this.firstStep) moves.push(this.board.getCell(x, y - 2));
    }
    return moves.filter((cell) => cell);
  }
}

export default Pawn;
