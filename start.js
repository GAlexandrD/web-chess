'use strict';

import Game from './modules/Game.js';
import Board from './modules/Board.js';
import King from './modules/King.js';
import Knight from './modules/Knight.js';
import Queen from './modules/Queen.js';
import Bishop from './modules/Bishop.js';
import Rook from './modules/Rook.js';
import Pawn from './modules/Pawn.js';

const startChess = () => {
  const board = new Board(8, 8);
  const game = new Game(board);
  for (let i = 1; i <= 8; i++) {
    new Pawn(board, { x: i, y: 2 }, 'white');
    new Pawn(board, { x: i, y: 7 }, 'black');
  }
  new King(board, { x: 5, y: 1 }, 'white');
  new King(board, { x: 5, y: 8 }, 'black');
  new Queen(board, { x: 4, y: 1 }, 'white');
  new Queen(board, { x: 4, y: 8 }, 'black');
  new Bishop(board, { x: 6, y: 8 }, 'black');
  new Bishop(board, { x: 3, y: 8 }, 'black');
  new Bishop(board, { x: 6, y: 1 }, 'white');
  new Bishop(board, { x: 3, y: 1 }, 'white');
  new Knight(board, { x: 7, y: 8 }, 'black');
  new Knight(board, { x: 2, y: 8 }, 'black');
  new Knight(board, { x: 7, y: 1 }, 'white');
  new Knight(board, { x: 2, y: 1 }, 'white');
  new Rook(board, { x: 8, y: 8 }, 'black');
  new Rook(board, { x: 1, y: 8 }, 'black');
  new Rook(board, { x: 8, y: 1 }, 'white');
  new Rook(board, { x: 1, y: 1 }, 'white');
  game.start();
};

startChess();