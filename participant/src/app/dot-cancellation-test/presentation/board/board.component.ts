import { Component } from '@angular/core';

declare var angular: any;
@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent 
{
  constructor() {
	
	this.ViewInstructions();
    this.RandomlyPopulateDots();
	//this.CentreDotsWithinEachCell();
	this.RandomlyPositionDots();		
}

  public NumberOfTotalDots = 625;
  public background_color= 'red';
   
   GameTitle = 'Dot Cancellation Test';
   
  ShowInstructions = false;
  
  DisableInstructions = false;
  
  InstructionVisibiliy = "'visible'";
  
  InstructionsButtonText = 'Hide Instructions';
  
  public InstructionHeight : number = 0;
   
  ContainerClass = 'Hidecontainer'; 
   
  NoOfClicksOnEachCell = Array(this.NumberOfTotalDots).fill(null);

  squares = Array(this.NumberOfTotalDots).fill(null);
  
  Styles = Array(this.NumberOfTotalDots).fill(null);
  
  dotoneX = Array(this.NumberOfTotalDots).fill(null);
  dotoneY = Array(this.NumberOfTotalDots).fill(null);
  
  dotTwoX = Array(this.NumberOfTotalDots).fill(null);
  dotTwoY = Array(this.NumberOfTotalDots).fill(null);
  
  dotThreeX = Array(this.NumberOfTotalDots).fill(null);
  dotThreeY = Array(this.NumberOfTotalDots).fill(null);
  
  dotFourX = Array(this.NumberOfTotalDots).fill(null);
  dotFourY = Array(this.NumberOfTotalDots).fill(null);
  
  dotFiveX = Array(this.NumberOfTotalDots).fill(null);
  dotFiveY = Array(this.NumberOfTotalDots).fill(null);

  dotones = Array(this.NumberOfTotalDots).fill(null);
  dottwos = Array(this.NumberOfTotalDots).fill(null);
  dotthrees = Array(this.NumberOfTotalDots).fill(null);
  dotfours = Array(this.NumberOfTotalDots).fill(null);
  dotfives = Array(this.NumberOfTotalDots).fill(null);

  //hold ='red';


  player = 'X';
  winner = null;

  // get gameStatusMessage() {
    // return this.winner ? 'Player ${this.winner} has won!' : `Player ${this.player}'s turn`;
  // }

  InitGametext()
  {
	  
  }
  
  
  ViewInstructions()
  {
	 	  
	  if (this.ShowInstructions)
	  {
		  

		  //Hide Instructions
		  this.ContainerClass = 'Showcontainer';
		  this.InstructionsButtonText = 'Show Instructions (Hide Test)';
		  this.ShowInstructions = false;
		  this.InstructionHeight = 3;
		  
		  
	  }
	  else if (!this.ShowInstructions)
	  {
		  //Hide Instructions  
		 
		  this.ContainerClass = 'Hidecontainer';
		  this.InstructionHeight = 200;
		  this.InstructionsButtonText = 'Hide Instructions (Show Test)';
		  this.ShowInstructions = true;
		  
	  }
  }
  
  
  CentreDotsWithinEachCell(i, NoOfDots)
  {
	  
	     
       // Xvalues = Array(5).fill(null); 
	  
	  
	  //for each dot if it is populated then centre it relative to the cell
	 //   for (var i = 0; i < this.dotones.length; i++)
	if (NoOfDots==5)
	{
          this.dotoneX[i] = -15;   
		  this.dotTwoX[i] = -8; 
		  this.dotThreeX[i] = 0;
		  this.dotFourX[i] = 8;
		  this.dotFiveX[i] = 15;
    }	

	if (NoOfDots==3)
	{
          this.dotoneX[i] = -15;   
		  this.dotTwoX[i] = -8; 
		  this.dotThreeX[i] = 0;
		  this.dotFourX[i] = 8;
		  this.dotFiveX[i] = 12;
    }	 	
  }
  
  
  //Returns an array with (TruePos, TrueNeg, FalsePos, FalseNeg)
  GetResults() {
	  
	 
	 var results = Array(4).fill(null); 
	  
	//Miss out the first row as that is a practice row
	 let TruePos = 0;
      let TrueNeg = 0;
      let FalsePos = 0;
      let FalseNeg = 0;
    
	for (var i = 25; i < this.dotones.length; i++) {
    
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
	
	
	results[0] = (TruePos);
	results[1] = (TrueNeg);
	results[2] = (FalsePos);
	results[3] = (FalseNeg);
	
	return results;

  }



  AddDot(position) {
	  	
	//if (!this.squares[position]) 
	{
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
		
		 
		XValues[4] = this.getRandomInt(6,11);
		  
		
		
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
		
		
	  for (var i =0; i < this.dotoneX.length; i++)
	  {
	     	
		// While dots are touching
	 
		
		//while (this.isDotsTouchingTwo(XValues, YValues))
	    
		{    
		
		XValues = this.getXValues();
		YValues = this.getYValues();
		
	 
		 
		}
		
		
		
		
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
  
  differenceLessThan2(x1, y1, x2, y2)
  {
	  
	 // console.log("Num1 is ", num1);
	  //console.log("Num2 is ", num2);
	  
	  //if difference < 2 return false else return true
	  // var result = Math.abs(num1 - num2);
	  
	  // if (Math.sign(result) == -1 )
	  // {
		  // result = result*-1;
	  // }
	  
	  // if (result<2)
	  // {
		// console.log("Num1 is ", num1);
	  // console.log("Num2 is ", num2);
	  // console.log("CALCCC IS ", result);
	  // }
	  	  
	   		
		  
		var x_dist = (x2 - x1);
        var y_dist = (y2 - y1);
        var distance = Math.sqrt( (x_dist * x_dist) + (y_dist * y_dist));
	  
	  //console.log("CALCCC IS ", distance);
	  
	  if ( distance < 4 )
	  {
      console.log("CALCC IS:",distance);
	  console.log("VALUES ARE: ",x1, y1, x2, y2);
	  
	  }   
	  return ( distance < 7 );
	
  }
  
  
   isDotsTouchingTwo(XValues, YValues)
  {
	  var result = false;
	  
	   for (var i =0; i< XValues.length; i++ )
		{
		
		for (var j =i+1; j< XValues.length; j++ )
		{
			
			 if ( this.differenceLessThan2(XValues[i], YValues[i],  XValues[j], YValues[j])  ) 
			 {
				 return true;
			 }
		}		
		
			
						
		} 
	  
	  
	  
	  return result;
	  
	  
  }
  
  // isDotsTouching(XValues, YValues)
  // {
	  // var result = false;
	  
	 // check x with every other x, if same then check y if y same then false
	  
	 // var XValuesTouching = false;
	 // var YValuesTouching = false;
	  
	  // console.log("Got here");
	  
	    // for (var i =0; i< XValues.length; i++ )
		// {
			// for (var j =i+1; j<XValues.length; j++ )
		    // {
			  // if ( this.differenceLessThan2(XValues[i],XValues[j] ))
			  // {
				  // XValuesTouching = true;
			  // }				  
		    // }
						
		// } 
      
	  // console.log("Got here 2");
	  
	 // If x values touching then check y values touching
	  // if (XValuesTouching)
	  // {
		   // for (var i =0; i< YValues.length; i++ )
		// {
			// for (var j =i+1; j < YValues.length; j++ )
		    // {
			 // if ( this.differenceLessThan2(YValues[i],YValues[j] ))
			  // {
				  // YValuesTouching = true;
			  // }				  
		    // }
						 
		// } 
	  // }
	
	 // Only if y and x values touching 
	  // if (( XValuesTouching== true) && (YValuesTouching==true))
	  // {
		  // result = true;
	  // }
	  // else
      // {
		  // result = false;
	  // }
	  
	 
	  
	  // return result;
	  
  // }
  
  
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
  GenerateRandomWholeNum(XorY)
  {
	  var Range=0;
	  if (XorY == "X")
	  {
		  Range =4;
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
	  
	  //pass in positon, NoOfDots
	//  this.CentreDotsWithinEachCell(i, rand);
    }

  }




 

  restartGame() {
  
    //Disable instructions button
	 this.DisableInstructions = true;
	 
	 //Hide instructions and show the board
	 this.ShowInstructions = true;
	 this.ViewInstructions();
	 
	 	 
	 //Start timer and log all interactions
  
  
  
  
	
	var results = this.GetResults();
	
	console.log("TruePos  :", results[0] );
	console.log("TrueNeg  :", results[1] );
	console.log("FalsePos : ", results[2] );
	console.log("FalseNeg : ", results[3] );
	
  }

}
