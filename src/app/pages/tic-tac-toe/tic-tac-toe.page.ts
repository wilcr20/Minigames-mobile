import { Component } from '@angular/core';
import { Symbols } from './symbols.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.page.html',
  styleUrls: ['./tic-tac-toe.page.scss'],
})



export class TicTacToePage {
  generateVisualInterface = false;
  hasWinner = false;
  isDraw = false;
  grid: Array<Array<string>> = [];
  playerTurn: string = Math.random() > 0.5 ? Symbols.X : Symbols.O;
  cellsWinner: Array<String> = [];

  constructor(
    private router: Router
  ) {
    this.createInitialGrid();
  }

  createInitialGrid() {
    let rows = 3;
    let columns = 3;
    this.cellsWinner = [];
    this.grid = [];
    for (let i = 0; i < rows; i++) {
      this.grid.push([]);
      for (let j = 0; j < columns; j++) {
        this.grid[i].push(Symbols.NONE);
      }
    }
  }

  selectCell(row: number, column: number) {
    // console.log(row, column)
    if (this.grid[row][column] == Symbols.NONE && !this.hasWinner) {
      this.grid[row][column] = this.playerTurn;
      this.verifyPlayerWin();
    }

  }

  getAnotherPlayerSymbol(): string {
    if (this.playerTurn == Symbols.O) {
      return Symbols.X;
    }
    return Symbols.O;
  }

  getEmptySpacesCount() {
    let emptySpaces = 0;
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] == Symbols.NONE) {
          emptySpaces++;
        }
      }
    }
    return emptySpaces;
  }

  resetGame() {
    this.hasWinner = false;
    this.isDraw = false;
    this.createInitialGrid();
    this.playerTurn = Math.random() > 0.5 ? Symbols.X : Symbols.O;
  }

  backToHomePage() {
    this.router.navigateByUrl("home")
  }

  verifyPlayerWin() {

    const areSameValuesForRow = (currentValue: string) => currentValue == this.playerTurn;

    //Verify rows
    if (this.grid[0].every(areSameValuesForRow)) {
      this.displayWinnerGameResult(1);
      return;
    }
    if (this.grid[1].every(areSameValuesForRow)) {
      this.displayWinnerGameResult(2);
      return;
    }
    if (this.grid[2].every(areSameValuesForRow)) {
      this.displayWinnerGameResult(3);
      return;
    }

    //Verify columns
    if (this.grid[0][0] == this.playerTurn &&
      this.grid[1][0] == this.playerTurn &&
      this.grid[2][0] == this.playerTurn) {
      this.displayWinnerGameResult(4);
      return;
    }
    if (this.grid[0][1] == this.playerTurn &&
      this.grid[1][1] == this.playerTurn &&
      this.grid[2][1] == this.playerTurn) {
      this.displayWinnerGameResult(5);
      return;
    }
    if (this.grid[0][2] == this.playerTurn &&
      this.grid[1][2] == this.playerTurn &&
      this.grid[2][2] == this.playerTurn) {
      this.displayWinnerGameResult(6);
      return;
    }

    //Verify diagonally
    if (this.grid[0][0] == this.playerTurn &&
      this.grid[1][1] == this.playerTurn &&
      this.grid[2][2] == this.playerTurn) {
      this.displayWinnerGameResult(7);
      return;
    }
    if (this.grid[0][2] == this.playerTurn &&
      this.grid[1][1] == this.playerTurn &&
      this.grid[2][0] == this.playerTurn) {
      this.displayWinnerGameResult(8);
      return;
    }

    if(this.getEmptySpacesCount() == 0){
      this.isDraw = true;
      return;
    }

    this.playerTurn = this.getAnotherPlayerSymbol();

  }

  displayWinnerGameResult(caseId: number) {
    this.hasWinner = true;
    this.cellsWinner = [];
    switch (caseId) {
      case 1:
        this.cellsWinner.push("0,0");
        this.cellsWinner.push("0,1");
        this.cellsWinner.push("0,2");
        break;
      case 2:
        this.cellsWinner.push("1,0");
        this.cellsWinner.push("1,1");
        this.cellsWinner.push("1,2");
        break;
      case 3:
        this.cellsWinner.push("2,0");
        this.cellsWinner.push("2,1");
        this.cellsWinner.push("2,2");
        break;
      case 4:
        this.cellsWinner.push("0,0");
        this.cellsWinner.push("1,0");
        this.cellsWinner.push("2,0");
        break;
      case 5:
        this.cellsWinner.push("0,1");
        this.cellsWinner.push("1,1");
        this.cellsWinner.push("2,1");
        break;
      case 6:
        this.cellsWinner.push("0,2");
        this.cellsWinner.push("1,2");
        this.cellsWinner.push("2,2");
        break;
      case 7:
        this.cellsWinner.push("0,0");
        this.cellsWinner.push("1,1");
        this.cellsWinner.push("2,2");
        break;
      case 8:
        this.cellsWinner.push("0,2");
        this.cellsWinner.push("1,1");
        this.cellsWinner.push("2,0");
        break;
      default:
        break;
    }

  }

}
