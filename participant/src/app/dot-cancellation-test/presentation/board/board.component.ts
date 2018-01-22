import { Component } from '@angular/core';
declare var angular: any;
@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor() {
    this.RandomlyPopulateDots();
  }


  squares = Array(25).fill(null);

  dotones = Array(525).fill(null);
  dottwos = Array(25).fill(null);
  dotthrees = Array(25).fill(null);
  dotfours = Array(25).fill(null);
  dotfives = Array(25).fill(null);

  //hold ='red';


  player = 'X';
  winner = null;

  get gameStatusMessage() {
    return this.winner ? 'Player ${this.winner} has won!' : `Player ${this.player}'s turn`;
  }
  createDot(position) {

  }

  GetResults() {
    for (var i = 0; i < this.dotones.length; i++) {
      let TruePos = 0;
      let TrueNeg = 0;
      let FalsePos = 0;
      let FalseNeg = 0;

      //get no of dots
      let numOfDots : number = this.getNumberOfDotsForCell(i);

      //Store if ticked or not
      let ticked : boolean = (this.squares[i] == "X");

      if (ticked) {
        if (numOfDots == 4) {
          //if ticked and 4 then TruePos
          TruePos += 1;
        }
        else {
          //else if ticked and not 4 then TrueNeg
          TrueNeg += 1;
        }
      }
      else if (!ticked) {
        if (numOfDots == 4) {
          //else if not ticked and 4 then FalsePos
          FalsePos += 1;
        }
        else {
          // else if not ticked and not 4 then FalseNeg
          FalseNeg += 1;
        }
      }
    }


  }

  handleMove(position) {
    if (!this.winner && !this.squares[position]) {
      this.squares[position] = this.player;
      if (this.winnigMove()) {
        this.winner = this.player;
      }
      this.player = this.player === 'X' ? 'O' : 'X';
    }
  }

  AddDot(position) {

    if (!this.squares[position]) {
      this.squares[position] = 'X';

    }

  }

  getNumberOfDotsForCell(position) {
    var result = 0;

    if (this.dotones[position] == ".") { result = result + 1; }
    if (this.dottwos[position] == ".") { result = result + 1; }
    if (this.dotthrees[position] == ".") { result = result + 1; }
    if (this.dotfours[position] == ".") { result = result + 1; }
    if (this.dotfives[position] == ".") { result = result + 1; }

    return result;
  }

  RandomlyPopulateDots() {

    var NoOfDots = [3, 4, 5];

    //NoOfDots = [5];

    var dotsToInit = [1, 2, 3, 4, 5];

    for (var i = 0; i < this.dotones.length; i++) {
      //Rand choose either 3,4 or 5 dots 
      var rand = NoOfDots[Math.floor(Math.random() * NoOfDots.length)];


      //Until the number of dots chosen has been populated
      while (this.getNumberOfDotsForCell(i) != rand) {

        //Rand choose either 1,2,3,4 or 5 to populate 
        var RowNum = dotsToInit[Math.floor(Math.random() * dotsToInit.length)];
        if (RowNum == 1) {
          this.dotones[i] = ".";
        }
        else if (RowNum == 2) {
          this.dottwos[i] = ".";
        }
        else if (RowNum == 3) {
          this.dotthrees[i] = ".";
        }
        else if (RowNum == 4) {
          this.dotfours[i] = ".";
        }
        else if (RowNum == 5) {
          this.dotfives[i] = ".";
        }


      }
    }

  }

  winnigMove() {
    const conditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colums
      [0, 4, 8], [2, 4, 6]             // diagonal 
    ];
    for (let condition of conditions) {
      if (this.squares[condition[0]]
        && this.squares[condition[0]] === this.squares[condition[1]]
        && this.squares[condition[1]] === this.squares[condition[2]]) {
        return true;
      }
    }
    return false;
  }


  toggleClock() {
    // get the clock 
    var myClock = document.getElementById('clock');

    // get the current value of the clock's display property 
    var displaySetting = myClock.style.display;

    // also get the clock button, so we can change what it says 
    var clockButton = document.getElementById('clockButton');

    // now toggle the clock and the button text, depending on current state
    if (displaySetting == 'block') {
      // clock is visible. hide it
      myClock.style.display = 'none';
      // change button text
      clockButton.innerHTML = 'Show clock';
    }
    else {
      // clock is hidden. show it 
      myClock.style.display = 'block';
      // change button text
      clockButton.innerHTML = 'Hide clock';
    }
  }

  restartGame() {
    this.squares = Array(9).fill(null);
    this.player = 'X';
    this.winner = null;
  }

}
