import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.page.html',
  styleUrls: ['./word-search.page.scss'],
})
export class WordSearchPage {

  wrapEl: any;
  solved: number = 0;
  matrix: any = [];
  settings: any;
  selectFrom: any;
  selected: any;
  gridSize = 10;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) {
    // this.setWordsToUse();
    setTimeout(() => {
      // this.createInitialGrid();
      var gameAreaEl = document.getElementById('ws-area');
      this.WordSearch(gameAreaEl, this.settings);

      // Put words into `.ws-words`
      var words = this.settings.wordsList;
      var wordsWrap = document.querySelector('.ws-words');
      for (const i in words) {
        var liEl = document.createElement('li');
        liEl.setAttribute('class', 'ws-word');
        liEl.innerText = words[i];
        if (wordsWrap) {
          wordsWrap.appendChild(liEl);
        }
      }
    }, 500);

  }

  getWordsToUse() {
    let words = this.dataService.getTermsForWordSearch();
    let count = words.length;
    let quantityOfWordsToUse = 6;
    let wordsToUse: Array<string> = [];

    while (quantityOfWordsToUse > 0) {
      let index = Math.floor(Math.random() * count);
      let word = words[index];
      if (!wordsToUse.includes(word)) {
        wordsToUse.push(word);
        quantityOfWordsToUse--;
      }
    }
    return wordsToUse;
  }

  backToHomePage() {
    this.router.navigateByUrl("home")
  }




  initialize() {
    this.matrix = [];
    this.selectFrom = null;
    this.selected = [];
    this.initmatrix(10);
  }

  initmatrix(size: number) {
    for (var row = 0; row < size; row++) {
      for (var col = 0; col < size; col++) {
        var item = {
          letter: '.', // Default value
          row: row,
          col: col
        }

        if (!this.matrix[row]) {
          this.matrix[row] = [];
        }

        this.matrix[row][col] = item;
      }
    }
  }



  rangeInt(min: number, max?: number) {
    if (max == undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  merge(o1: any, o2: any) {
    for (var i in o1) {
      o2[i] = o1[i];
    }
    return o2;
  }

  WordSearch(wrapEl: any, settings: any) {
    this.wrapEl = wrapEl;

    // Add `.ws-area` to wrap element
    this.wrapEl.classList.add('ws-area');

    //Words solved.
    this.solved = 0;

    // Default settings
    var default_settings = {
      'directions': ['W', 'N', 'WN', 'EN'],
      'words': this.getWordsToUse(),
      'wordsList': []
    }
    this.settings = this.merge(settings, default_settings);

    // Check the words' length if it is overflow the grid
    if (this.parseWords(this.gridSize)) {
      // Add words into the matrix data
      var isWorked = false;

      while (isWorked == false) {
        // initialize the application
        this.initialize();

        isWorked = this.addWords();
      }

      // Fill up the remaining blank items
      this.fillUpFools();

      // Draw the matrix into wrap element
      this.drawmatrix();
    }
  }


  /**
   * Parse words
   * @param {Number} Max size
   * @return {Boolean}
   */
  parseWords(maxSize: number) {
    var itWorked = true;

    for (var i = 0; i < this.settings.words.length; i++) {
      // Convert all the letters to upper case      
      this.settings.wordsList[i] = this.settings.words[i].trim();
      this.settings.words[i] = this.settings.wordsList[i].trim().toUpperCase();

      var word = this.settings.words[i];
      if (word.length > maxSize) {
        itWorked = false;
      }
    }
    return itWorked;
  }


  addWords() {
    var keepGoing = true,
      counter = 0,
      isWorked = true;

    while (keepGoing) {
      // Getting random direction
      var dir = this.settings.directions[this.rangeInt(this.settings.directions.length - 1)],
        result = this.addWord(this.settings.words[counter], dir),
        isWorked = true;

      if (result == false) {
        keepGoing = false;
        isWorked = false;
      }

      counter++;
      if (counter >= this.settings.words.length) {
        keepGoing = false;
      }
    }
    return isWorked;
  }


  addWord(word: string | any[], direction: string) {
    var itWorked = true;
    let directions: any = {
      'W': [0, 1], // Horizontal (From left to right)
      'N': [1, 0], // Vertical (From top to bottom)
      'WN': [1, 1], // From top left to bottom right
      'EN': [1, -1] // From top right to bottom left
    };
    let row = 0;
    let col = 0; // y, x

    switch (direction) {
      case 'W': // Horizontal (From left to right)
        row = this.rangeInt(this.gridSize - 1),
          col = this.rangeInt(this.gridSize - word.length);
        break;

      case 'N': // Vertical (From top to bottom)
        row = this.rangeInt(this.gridSize - word.length),
          col = this.rangeInt(this.gridSize - 1);
        break;

      case 'WN': // From top left to bottom right
        row = this.rangeInt(this.gridSize - word.length),
          col = this.rangeInt(this.gridSize - word.length);
        break;

      case 'EN': // From top right to bottom left
        row = this.rangeInt(this.gridSize - word.length),
          col = this.rangeInt(word.length - 1, this.gridSize - 1);
        break;

      default:
        var error = 'UNKNOWN DIRECTION ' + direction + '!';
        console.log(error);
        break;
    }

    // Add words to the matrix
    for (var i = 0; i < word.length; i++) {
      var newRow = row + i * directions[direction][0],
        newCol = col + i * directions[direction][1];

      // The letter on the board
      var origin = this.matrix[newRow][newCol].letter;

      if (origin == '.' || origin == word[i]) {
        this.matrix[newRow][newCol].letter = word[i];
      } else {
        itWorked = false;
      }
    }

    return itWorked;
  }


  drawmatrix() {
    for (var row = 0; row < this.gridSize; row++) {
      // New row
      var divEl = document.createElement('div');
      divEl.setAttribute('class', 'ws-row');
      this.wrapEl.appendChild(divEl);

      for (var col = 0; col < this.gridSize; col++) {
        var cvEl = document.createElement('canvas');
        cvEl.setAttribute('class', 'ws-col');
        cvEl.setAttribute('width', "31");
        cvEl.setAttribute('height', "31");

        // Fill text in middle center
        var x = cvEl.width / 2,
          y = cvEl.height / 2;

        var ctx = cvEl.getContext('2d');
        if (ctx) {
          ctx.font = '400 25px Calibri';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#333'; // Text color
          ctx.fillText(this.matrix[row][col].letter, x, y);
        }

        // Add event listeners
        // cvEl.addEventListener('onMousedown', this.onMousedown(this.matrix[row][col]));
        // cvEl.addEventListener('onMouseover', this.onMouseover(this.matrix[row][col]));
        // cvEl.addEventListener('onMouseup', this.onMouseup());

        cvEl.addEventListener("touchstart", this.process_touchstart(this.matrix[row][col]));
        cvEl.addEventListener("touchmove", this.process_touchmove(this.matrix[row][col]));
        cvEl.addEventListener("touchend", this.process_touchend());


        divEl.appendChild(cvEl);
      }
    }
  }

  // touchmove handler
  process_touchmove(item: { row: number; col: number; }) {
    // console.log(item)
    var _this = this;
    return function () {
      if (_this.selectFrom) {
        _this.selected = _this.getItems(_this.selectFrom.row, _this.selectFrom.col, item.row, item.col);

        _this.clearHighlight();

        for (var i = 0; i < _this.selected.length; i++) {
          var current = _this.selected[i],
            row = current.row + 1,
            col = current.col + 1,
            el = document.querySelector('.ws-area .ws-row:nth-child(' + row + ') .ws-col:nth-child(' + col + ')');
          if (el) {
            el.className += ' ws-selected';
          }
        }
      }
    }
  }

  // touchstart handler
  process_touchstart(item: any) {
    console.log(item)
    var _this = this;
    return function () {
      _this.selectFrom = item;
    }
  }

  process_touchend() {
    var _this = this;
    return function () {
      _this.selectFrom = null;
      _this.clearHighlight();
      _this.lookup(_this.selected);
      _this.selected = [];
    }
  }


  fillUpFools() {
    var rangeLanguage = [65, 90]; //Latin
    for (var row = 0; row < this.gridSize; row++) {
      for (var col = 0; col < this.gridSize; col++) {
        if (this.matrix[row][col].letter == '.') {
          // Math.rangeInt(65, 90) => A ~ Z
          this.matrix[row][col].letter = String.fromCharCode(this.rangeInt(rangeLanguage[0], rangeLanguage[1]));
        }
      }
    }
  }


  getItems(rowFrom: number, colFrom: number, rowTo: number, colTo: number) {
    var items = [];

    if (rowFrom === rowTo || colFrom === colTo || Math.abs(rowTo - rowFrom) == Math.abs(colTo - colFrom)) {
      var shiftY = (rowFrom === rowTo) ? 0 : (rowTo > rowFrom) ? 1 : -1,
        shiftX = (colFrom === colTo) ? 0 : (colTo > colFrom) ? 1 : -1,
        row = rowFrom,
        col = colFrom;

      items.push(this.getItem(row, col));
      do {
        row += shiftY;
        col += shiftX;
        items.push(this.getItem(row, col));
      } while (row !== rowTo || col !== colTo);
    }

    return items;
  }


  getItem(row: number, col: number) {
    return (this.matrix[row] ? this.matrix[row][col] : undefined);
  }


  clearHighlight() {
    var selectedEls = document.querySelectorAll('.ws-selected');
    for (var i = 0; i < selectedEls.length; i++) {
      selectedEls[i].classList.remove('ws-selected');
    }
  }

  lookup(selected: string | any[]) {
    var words = [''];

    for (var i = 0; i < selected.length; i++) {
      words[0] += selected[i].letter;
    }
    words.push(words[0].split('').reverse().join(''));

    if (this.settings.words.indexOf(words[0]) > -1 ||
      this.settings.words.indexOf(words[1]) > -1) {
      for (var i = 0; i < selected.length; i++) {
        var row = selected[i].row + 1,
          col = selected[i].col + 1,
          el = document.querySelector('.ws-area .ws-row:nth-child(' + row + ') .ws-col:nth-child(' + col + ')');
        if (el) {
          el.classList.add('ws-found');
        }
      }

      //Cross word off list.
      var wordList = document.querySelector(".ws-words");
      if (wordList) {
        var wordListItems = wordList.getElementsByTagName("li");
        for (var i = 0; i < wordListItems.length; i++) {
          if (words[0] == wordListItems[i].innerHTML.toUpperCase()) {
            if (wordListItems[i].innerHTML != "<del>" + wordListItems[i].innerHTML + "</del>") { //Check the word is never found
              wordListItems[i].innerHTML = "<del>" + wordListItems[i].innerHTML + "</del>";
              //Increment solved words.
              this.solved++;
            }
          }
        }
      }
      //Game over?
      if (this.solved == this.settings.words.length) {
        this.gameOver();
      }
    }
  }



  gameOver() {
    //Create overlay.
    alert("GAMEOVER")
  }

  /**
   * Mouse event - Mouse down
   * @param {Object} item
   */
  onMousedown(item: any) {
    var _this = this;
    return function () {
      _this.selectFrom = item;
    }
  }


  onMouseover(item: { row: number; col: number; }) {
    var _this = this;
    return function () {
      if (_this.selectFrom) {
        _this.selected = _this.getItems(_this.selectFrom.row, _this.selectFrom.col, item.row, item.col);

        _this.clearHighlight();

        for (var i = 0; i < _this.selected.length; i++) {
          var current = _this.selected[i],
            row = current.row + 1,
            col = current.col + 1,
            el = document.querySelector('.ws-area .ws-row:nth-child(' + row + ') .ws-col:nth-child(' + col + ')');
          if (el) {
            el.className += ' ws-selected';
          }
        }
      }
    }
  }


  onMouseup() {
    var _this = this;
    return function () {
      _this.selectFrom = null;
      _this.clearHighlight();
      _this.lookup(_this.selected);
      _this.selected = [];
    }
  }




}



