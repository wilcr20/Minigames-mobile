import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getMinigames(): Array<any> {
    return [
      {
        "name": "Tres en línea",
        id: 1,
        "backgroundColor": "",
        "image": "tic-tac-toe.png",
        "url": "tic-tac-toe"
      },
      {
        "name": "Sudoku",
        id: 2,
        "backgroundColor": "",
        "image": "sudoku.png",
        "url": "/"
      },
      {
        "name": "Sopa de letras",
        id: 3,
        "backgroundColor": "",
        "image": "word-search.png",
        "url": "word-search"
      },
      {
        "name": "Ahorcado",
        id: 4,
        "backgroundColor": "",
        "image": "hangman-game.png",
        "url": "/"
      },
      {
        "name": "Geoguessr",
        id: 5,
        "backgroundColor": "",
        "image": "",
        "url": "/"
      },
      {
        "name": "Crucigrama",
        id: 6,
        "backgroundColor": "",
        "image": "crossword.png",
        "url": "/"
      }
    ]
  }

  getTermsForWordSearch(): Array<string> {
    return ["casa", "pato", "avenida", "hielo", "aire", "fuego", "cable", "pantalla", "mañana", "ayer", "wifi", "zorro",
      "mapache", "vaso", "boca", "hueso", "huevo", "palabra", "acento", "color", "azul", "rojo", "verde", "cuadro", "letras"
    ];
  }
}
