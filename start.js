'use strict';

import Game from './modules/Game.js';
import Board from './modules/Board.js';
import King from './modules/figures/King.js';
import Knight from './modules/figures/Knight.js';
import Queen from './modules/figures/Queen.js';
import Bishop from './modules/figures/Bishop.js';
import Rook from './modules/figures/Rook.js';
import Pawn from './modules/figures/Pawn.js';

const startChess = () => {
  const board = new Board(8, 8);
  const game = new Game(board);
  for (let i = 1; i <= 8; i++) {
    board.addFigure(new Pawn('white'), { x: i, y: 2 });
    board.addFigure(new Pawn('black'), { x: i, y: 7 });
  }
  board.addFigure(new King('white'), { x: 5, y: 1 });
  board.addFigure(new King('black'), { x: 5, y: 8 });
  board.addFigure(new Queen('white'), { x: 4, y: 1 });
  board.addFigure(new Queen('black'), { x: 4, y: 8 });
  board.addFigure(new Bishop('black'), { x: 6, y: 8 });
  board.addFigure(new Bishop('black'), { x: 3, y: 8 });
  board.addFigure(new Bishop('white'), { x: 6, y: 1 });
  board.addFigure(new Bishop('white'), { x: 3, y: 1 });
  board.addFigure(new Knight('black'), { x: 7, y: 8 });
  board.addFigure(new Knight('black'), { x: 2, y: 8 });
  board.addFigure(new Knight('white'), { x: 7, y: 1 });
  board.addFigure(new Knight('white'), { x: 2, y: 1 });
  board.addFigure(new Rook('black'), { x: 8, y: 8 });
  board.addFigure(new Rook('black'), { x: 1, y: 8 });
  board.addFigure(new Rook('white'), { x: 8, y: 1 });
  board.addFigure(new Rook('white'), { x: 1, y: 1 });
  game.start();
};

startChess();
