import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getMinigames(): Array<any>{
    return [
      {
        "name": "Tres en línea",
        id: 1,
        "backgroundColor": "",
        "image": "tic-tac-toe.png"
      },
      {
        "name": "Sudoku",
        id: 2,
        "backgroundColor": "",
        "image": "sudoku.png"
      },
      {
        "name": "Sopa de letras",
        id: 3,
        "backgroundColor": "",
        "image": "word-search.png"
      },
      {
        "name": "Ahorcado",
        id: 4,
        "backgroundColor": "",
        "image": "hangman-game.png"
      },
      {
        "name": "Geoguessr",
        id: 5,
        "backgroundColor": "",
        "image": ""
      },
      {
        "name": "Crucigrama",
        id: 6,
        "backgroundColor": "",
        "image": "crossword.png"
      }
    ]
  }
}
