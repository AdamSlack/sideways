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
	this.RandomlyPositionDots();
  }

  
   public background_color= 'red';

  squares = Array(25).fill(null);
  
  Styles = Array(525).fill(null);
  
  dotoneX = Array(525).fill(null);
  dotoneY = Array(525).fill(null);
  
  dotTwoX = Array(525).fill(null);
  dotTwoY = Array(525).fill(null);
  
  dotThreeX = Array(525).fill(null);
  dotThreeY = Array(525).fill(null);
  
  dotFourX = Array(525).fill(null);
  dotFourY = Array(525).fill(null);
  
  dotFiveX = Array(525).fill(null);
  dotFiveY = Array(525).fill(null);

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
	  
	
    //this.background_color = '#cd9e98';
	
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

  
  getXValues()
  {   
	    var XValues = Array(5).fill(null);
	
		//Populate an Array of all the X Values of the Dots
		XValues[0] = this.getRandomInt(-5,-13);
		
		//for (var i = 1; i<4; i++)
		//{
		//	XValues[i] = this.GenerateRandomWholeNum("X");
   	   // }
		
		XValues[1] = this.GenerateRandomWholeNum("X");
		XValues[2] = this.GenerateRandomWholeNum("X");
		XValues[3] = this.GenerateRandomWholeNum("X");
		
		 
		XValues[4] = this.getRandomInt(6,13);
		
		return (XValues);
  }
  
  getYValues()
  {
	  
		var YValues = Array(5).fill(null);

		//Populate an Array of all the Y Values of the Dots
	  //  for (var i = 0; i<YValues.length; i++)
		//{
		//	YValues[i] = this.GenerateRandomWholeNum("Y");
		//}
		
		YValues[0] = this.GenerateRandomWholeNum("Y");
		YValues[1] = this.GenerateRandomWholeNum("Y");
		YValues[2] = this.GenerateRandomWholeNum("Y");
		YValues[3] = this.GenerateRandomWholeNum("Y");
		YValues[4] = this.GenerateRandomWholeNum("Y");
		
		return YValues;
		
  }
  
  RandomlyPositionDots()
  {
	
     
	 var X = "X";
     var Y = "Y";
	 
	 var XValues = this.getXValues();
     var YValues = this.getYValues();
		
		console.log(XValues);
		
		console.log(YValues);
		
	  for (var i =0; i < this.dotoneX.length; i++)
	  {
	     	
		// While dots are touching
	    console.log("Entering While");
		
		while (this.isDotsTouching(XValues, YValues))
	    
		{    
		
		XValues = this.getXValues();
		YValues = this.getYValues();
		
	     console.log(XValues);
		console.log("In while");
		console.log(YValues);
		  
		 
		}
		
		console.log("Out while");
		
		
		 this.dotoneX[i] = XValues[0];
         this.dotoneY[i] = YValues[0]
		  
		  this.dotTwoX[i] = XValues[1];
          this.dotTwoY[i] = YValues[1];
		  
		  this.dotThreeX[i] = XValues[2];
		  this.dotThreeY[i] = YValues[2];
		  
		  this.dotFourX[i] = XValues[3];
          this.dotFourY[i] = YValues[3]
		  
		  this.dotFiveX[i] = XValues[4];
		  this.dotFiveY[i] = YValues[4];
		
		
		 // this.dotoneX[i] = this.getRandomInt(-5,-13);
         // this.dotoneY[i] = this.GenerateRandomWholeNum(Y);
		  
		  // this.dotTwoX[i] = this.GenerateRandomWholeNum(X);
          // this.dotTwoY[i] = this.GenerateRandomWholeNum(Y);
		  
		  // this.dotThreeX[i] = this.GenerateRandomWholeNum(X);
		  // this.dotThreeY[i] = this.GenerateRandomWholeNum(Y);
		  
		  // this.dotFourX[i] = this.GenerateRandomWholeNum(X);
          // this.dotFourY[i] = this.GenerateRandomWholeNum(Y);
		  
		  // this.dotFiveX[i] = this.getRandomInt(6,13);
		  // this.dotFiveY[i] = this.GenerateRandomWholeNum(Y);
		
	  }
	  
  }
  
  differenceLessThan2(num1, num2)
  {
	  
	  console.log("Num1 is ", num1);
	  console.log("Num2 is ", num2);
	  
	  //if difference < 2 return false else return true
	  var result = Math.abs(num1 - num2);
	  
	  if (Math.sign(result) == -1 )
	  {
		  result = result*-1;
	  }
	  	  
	  console.log("CALCCC IS ", result);

	  
	  
	  return ( result < 2 );
	
  }
  
  
  isDotsTouching(XValues, YValues)
  {
	  var result = false;
	  
	  //check x with every other x, if same then check y if y same then false
	  
	 var XValuesTouching = false;
	 var YValuesTouching = false;
	  
	  console.log("Got here");
	  
	    for (var i =0; i< XValues.length; i++ )
		{
			for (var j =i+1; j<XValues.length; j++ )
		    {
			  if ( this.differenceLessThan2(XValues[i],XValues[j] ))
			  {
				  XValuesTouching = true;
			  }				  
		    }
						
		} 
      
	  console.log("Got here 2");
	  
	  //If x values touching then check y values touching
	  if (XValuesTouching)
	  {
		   for (var i =0; i< YValues.length; i++ )
		{
			for (var j =i+1; j < YValues.length; j++ )
		    {
			 if ( this.differenceLessThan2(YValues[i],YValues[j] ))
			  {
				  YValuesTouching = true;
			  }				  
		    }
						 
		} 
	  }
	
	  //Only if y and x values touching 
	  if (( XValuesTouching== true) && (YValuesTouching==true))
	  {
		  result = true;
	  }
	  else
      {
		  result = false;
	  }
	  
	 
	  
	  return result;
	  
  }
  
  
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
  GenerateRandomWholeNum(XorY)
  {
	  var Range=0;
	  if (XorY == "X")
	  {
		  Range =6;
      } 
	  else 
	  {
		  Range =6;
	  }
	  
	  var result = (Math.floor(Math.random() * Range));
	  
	  if (Math.random() >= 0.5) 
	  {
		  result = result * -1;
	  }
      
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
