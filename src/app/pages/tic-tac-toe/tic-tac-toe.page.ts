import { Component } from '@angular/core';
import { Symbols } from './symbols.enum';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.page.html',
  styleUrls: ['./tic-tac-toe.page.scss'],
})



export class TicTacToePage  {
  generateVisualInterface = false;
  grid: Array<any> = [];
  playerTurn: string = Math.random() > 0.5 ? Symbols.X : Symbols.O;

  constructor() { 
    this.createInitialGrid();
  }

  createInitialGrid(){
    let rows = 3;
    let columns = 3;
    for (let i = 0; i < rows; i++) {
      this.grid.push([]);
      for (let j = 0; j < columns; j++) {
        this.grid[i].push(Symbols.NONE);
      }
    }
  }

  selectCell(row: number, column:number){
    if(this.grid[row][column] == Symbols.NONE){
      this.grid[row][column] = this.playerTurn;
      this.playerTurn = this.getAnotherPlayerSymbol();
    }
    
  }

  getAnotherPlayerSymbol(): string{
    if(this.playerTurn == Symbols.O){
      return Symbols.X;
    }
    return Symbols.O;
  }

}
