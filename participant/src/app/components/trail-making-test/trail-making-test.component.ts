import { Component, OnInit } from '@angular/core';
import { RecordTimingService } from '../../services/record-timing.service';
import { AssetRetrievalService } from '../../services/asset-retrieval.service';
import { ResultsService } from '../../services/results.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../services/authentication.service';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-trail-making-test',
  templateUrl: './trail-making-test.component.html',
  styleUrls: ['./trail-making-test.component.scss']
})

export class TrailMakingTestComponent implements OnInit 
{
  constructor(
    private rs: ResultsService, 
    public assetService : AssetRetrievalService, 
    private auth : AuthenticationService, 
    private test1timer : RecordTimingService, 
    private test2timer : RecordTimingService,
  ) {}
  
  public title : string = 'app';
  public localisationSubscription : Subscription;

  private test1Canvas: any;
  private test2Canvas: any;
  private test1data : string[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"];
  private test2data : string[] = ["1","A","2","B","3","C","4","D","5","E","6","F","7","G","8","H","9","I","10","J","11","K","12","L","13"];
  private testInstructions : string;
  private test1Mistakes = 0;
  private test2Mistakes = 0;
  private test1IntersectedNodes : number[] = [];
  private test2IntersectedNodes : number[] = [];
  private test1CorrectPath = true;
  private test2CorrectPath = true;
  
  //for interaction logging
  private userDrawnPaths : any[] = [];

  private test1coordinates = [
    {x: 935, y: 720 }, //1
    {x: 357, y: 1067}, //2
    {x: 824, y: 390 }, //3
    {x: 510, y: 470 }, //4
    {x: 45,  y: 90  }, //5
    {x: 270, y: 912 }, //6
    {x: 50,  y: 770 }, //7
    {x: 105, y: 990 }, //8
    {x: 772, y: 900 }, //9
    {x: 690, y: 1095}, //10
    {x: 320, y: 560 }, //11
    {x: 700, y: 30  }, //12
    {x: 532, y: 1270}, //13
    {x: 625, y: 250 }, //14
    {x: 530, y: 990 }, //15
    {x: 30,  y: 400 }, //16
    {x: 366, y: 75  }, //17
    {x: 740, y: 522 }, //18
    {x: 575, y: 670 }, //19
    {x: 130, y: 1205}, //20
    {x: 900, y: 150 }, //21
    {x: 300, y: 285 }, //22
    {x: 180, y: 464 }, //23
    {x: 350, y: 800 }, //24
    {x: 870, y: 1160}, //25
  ]; 
  private test2coordinates = [
    {x: 130, y: 1205}, //20
    {x: 772, y: 900 }, //9
    {x: 320, y: 560 }, //11
    {x: 366, y: 75  }, //17
    {x: 625, y: 250 }, //14
    {x: 824, y: 390 }, //3
    {x: 870, y: 1160}, //25
    {x: 25,  y: 90  }, //5
    {x: 180, y: 464 }, //23
    {x: 270, y: 912 }, //6
    {x: 50,  y: 770 }, //7
    {x: 300, y: 285 }, //22
    {x: 105, y: 990 }, //8
    {x: 510, y: 470 }, //4
    {x: 357, y: 1067}, //2
    {x: 690, y: 1095}, //10
    {x: 935, y: 720 }, //1
    {x: 700, y: 30  }, //12
    {x: 532, y: 1270}, //13
    {x: 30,  y: 400 }, //16
    {x: 530, y: 990 }, //15
    {x: 575, y: 670 }, //19
    {x: 740, y: 522 }, //18
    {x: 350, y: 800 }, //24   
    {x: 900, y: 150 }, //21  
  ];  

  ngOnInit() 
  {
    console.log("Initialising Localisation Settings");
    if(this.localisationSubscription)
    {
      this.localisationSubscription.unsubscribe();
    }
    
    if(this.auth.PARTICIPANT_TEST_LOCALE == '') {
      alert('No valid localisation details found. returning to login.');
      this.auth.VALIDATED = false;
      this.auth.CLINICIAN_ID = '';
      this.auth.PARTICIPANT_TEST_ID = '';
      this.auth.AUTH_TOKEN = '';
      this.auth.PARTICIPANT_TEST_LOCALE = '';
      return;
    }

    this.localisationSubscription = this.assetService.selectTrailMakingDetails(this.auth.PARTICIPANT_TEST_LOCALE).subscribe((res) => 
    {
      console.log('Response for Trail Making Test Localisation Data recieved from server.');
      console.log(res)
      var trailA = res['trailA'] ? res['trailA'] : ['Failed To Obtain Trail A Data'];
      var trailB = res['trailB'] ? res['trailB'] : ['Failed To Obtain Trail B Data'];
      this.testInstructions = res['instructions'] ? res['instructions'] : 'Failed To Obtain Instructions, Please restart the app';
      this.title = res['name'] ? res['name'] : 'Trail Making Test';
      this.test1data = trailA;
      this.test2data = trailB;
    });
  }

  public beginTest1()
  {
    //canvas background color
    //background-color: #FFFFFF;
    //disable done button
    document.getElementById('test1donebutton').hidden = true;

    this.test1Canvas = new fabric.Canvas('test1',{isDrawingMode: true});

    //creates all the circle nodes
    var nodes : any = [];
    for(var i = 0; i < this.test1data.length && i < 25; i++)
    {
      nodes.push(this.createCircleNode(this.test1coordinates[i].x, this.test1coordinates[i].y, this.test1data[i], this.test1Canvas));
    }

    this.test1timer.recordStartTime();

    this.test1Canvas.on('mouse:up', (options) =>
    {
      console.log("mouse up detected");
      
      /*this.test1CorrectPath = true;
      for (var k = 0; k < this.test1IntersectedNodes.length - 1; k++)
      {
        if(this.test1IntersectedNodes[k] != (this.test1IntersectedNodes[k+1] - 1))
        {
          console.log(this.test1IntersectedNodes[k], " does not come before ", this.test1IntersectedNodes[k+1]);
          this.test1CorrectPath = false;
          this.test1IntersectedNodes = [];
        }
      }*/
    });

    //drawing path done event handler
    this.test1Canvas.on('path:created', (options) =>
    {
      var spammed = false;
      console.log("path created");
      //store the coordinates of path created
      this.userDrawnPaths.push(JSON.stringify(options.path.path));
      //array of all coords of path created
      var pathCoordsArray = options.path.path;

      //strange path class, uses nested arrays instead of raw points, 
      //possibly to be efficient if there are straight lines 
      for(var i = 0; i < pathCoordsArray.length; i++)
      {
        var pathCoordsArrayArray = pathCoordsArray[i];
        
        //check if each point collides with 1, 
        //starting from the beginning and working through sequentially
        //each element is of type fabric.Point
        //if it was previously found, dont count it again

        /*
        so apparently each element isnt a fabric.Point, 
        but from the object we can derive it by obtaining the numerical elements within the  object
        and attempt to reconstruct the point in order to perform a comparison
        */
        var currentPoint = new fabric.Point(pathCoordsArrayArray[1],pathCoordsArrayArray[2]);
        var errorMade = false;
        //checks if current point collides with node, and if node collision was not detected previously
        for(var j = 0; j < nodes.length; j++)
        {
          if (nodes[j].containsPoint(currentPoint) && (this.test1IntersectedNodes.indexOf(j+1) == -1))
          {
            if(this.test1IntersectedNodes.length > 0 && this.test1IntersectedNodes.indexOf(j) != -1 || this.test1IntersectedNodes.length == 0 && j+1 == 1 )
            {
              //only add if there is at least 1 pre-intersected node, and the decrement intersected node value that is to be inserted to the array, exists in the array
              //*unless* there are 0 pre-intersecting nodes and the node to push is 1, then we also add it
              this.test1IntersectedNodes.push(j+1);
            }
            else if(!spammed)
            {
              spammed = true;
              //error has been made
              errorMade = true;
              this.test1Mistakes++;
              console.log("Error detected");
              //find index of current point in the array
              var index = pathCoordsArray.indexOf(pathCoordsArrayArray);
              //trim the array                   
              //var trimmedPathCoords = pathCoordsArray.splice(index);
              var trimmedPathCoords = pathCoordsArray.slice(0,index);
              console.log(pathCoordsArray);
              console.log(trimmedPathCoords);
              //reconstruct path using trimmed array
              var newPath = new fabric.Path(trimmedPathCoords);
              
              newPath.setGradient('fill',
              {
                type: 'linear',
                x1: -newPath.width / 2,
                y1: 0,
                x2: newPath.width / 2,
                y2: 0,
                colorStops: 
                {
                  0: 'rgba(0,0,0,0)',
                  0.5: 'rgba(0,0,0,0)',
                  1: 'rgba(0,0,0,0)'
                }
              });
              
              newPath.set(
              {
                stroke: 'rgba(255,0,0,0.1)',
                strokeWidth: 2,
                selectable: false,
              });
              console.log("attempting to delete old path");
              
              //delete the old path
              this.test1Canvas.remove(options.path);
              
              //add new path WIP FEATURE: BUGGY
              this.test1Canvas.add(newPath);
              
              //clear the intersected nodes array
              //this.test1IntersectedNodes = [];
              
              //console.log(pathCoordsArray);
              //test1Canvas.add(pathCoordsArray);
              
              this.test1Canvas.renderAll();
            }            
            
            //check if error was made
            if((this.test1IntersectedNodes[this.test1IntersectedNodes.length-1] - this.test1IntersectedNodes[this.test1IntersectedNodes.length-2]) != 1)  //e.g 17-14 != 1
            { 
              console.log("intersectedNodes -1 = ", this.test1IntersectedNodes[this.test1IntersectedNodes.length-1], "\n intersected Nodes -2 = ", this.test1IntersectedNodes[this.test1IntersectedNodes.length-2]);
              //special case if first node
              if(typeof this.test1IntersectedNodes[this.test1IntersectedNodes.length-2] == 'undefined')
              {
                console.log("array is size 1 and contains 1");
                //this is fine if the only object inside is "1"
                //but actually we want to kill the path 
                //this.test1Mistakes++;
                //this.test1Canvas.remove(options.path);
              }
              else
              {                  
                //error has been made
                errorMade = true;
                this.test1Mistakes++;
                console.log("Error detected");
                

                //find index of current point in the array
                var index = pathCoordsArray.indexOf(pathCoordsArrayArray);
                //trim the array                   
                //var trimmedPathCoords = pathCoordsArray.splice(index);
                var trimmedPathCoords = pathCoordsArray.slice(0,index);
                console.log(pathCoordsArray);
                console.log(trimmedPathCoords);
                //reconstruct path using trimmed array
                var newPath = new fabric.Path(trimmedPathCoords);

                newPath.setGradient('fill',
                {
                  type: 'linear',
                  x1: -newPath.width / 2,
                  y1: 0,
                  x2: newPath.width / 2,
                  y2: 0,
                  colorStops: {
                    0: 'rgba(0,0,0,0)',
                    0.5: 'rgba(0,0,0,0)',
                    1: 'rgba(0,0,0,0)'
                  }
                });

                newPath.set(
                  {
                    stroke: 'rgba(255,0,0,0.1)',
                    strokeWidth: 2,
                    selectable: false,
                  });
                console.log("attempting to delete old path");

                //delete the old path
                this.test1Canvas.remove(options.path);

                //add new path WIP FEATURE: BUGGY
                this.test1Canvas.add(newPath);

                //clear the intersected nodes array
                //this.test1IntersectedNodes = [];
                
                //console.log(pathCoordsArray);
                //test1Canvas.add(pathCoordsArray);
                
                this.test1Canvas.renderAll();
                break;
              }
            }
          }
        }
      }
      console.log("Path Crossed through the following nodes: ", this.test1IntersectedNodes);

      ///check if its crossed through nothing
      if(this.test1IntersectedNodes.length == 0)
      {
        //delete path if so
        console.log("Crossed through nothing... deleting path");
        this.test1Mistakes++;
        this.test1Canvas.remove(options.path);
        this.test1Canvas.renderAll();
      }

      //check if the path is equal to the correct sequence
      var intersectedNodesString = this.test1IntersectedNodes.map(String); //casts array to string elements
      //var equal = this.test1data.length == intersectedNodesString.length && this.test1data.every((element, index)=> element === intersectedNodesString[index] );
      
      /*var correctPath = true;
      for (var k = 0; k < this.test1data.length - 1; k++)
      {
        if(this.test1IntersectedNodes[k] != (this.test1IntersectedNodes[k+1] - 1))
        {
          correctPath = false;
        }
      }*/

      if(this.test1CorrectPath && this.test1IntersectedNodes.length == this.test1data.length)
      {
        console.log("Path correctly went through all elements in sequence!");
        console.log("Test 1 Mistakes: ", this.test1Mistakes);
        this.test1timer.recordEndTime();
        document.getElementById('instructionsdiv').style.display = "block";
        document.getElementById('beginbutton').style.display = "none";
        document.getElementById('test1donebutton').hidden = false;
        this.test1Canvas.isDrawingMode = false;
        this.test1Canvas.setHeight(0);
        this.test1Canvas.setWidth(0);
      }
    });

    this.test1Canvas.renderAll();
  }

  public beginTest2()
  {
    //hide done button and instructions
    document.getElementById('test2donebutton').style.display = "none";
    document.getElementById('instructionsdiv').style.display = "none";

    this.test2Canvas = new fabric.Canvas('test2',{isDrawingMode: true});
    document.getElementById('test2donebutton').style.display = "none";
    //creates all the circle nodes
    var nodes : any = [];
    for(var i = 0; i < this.test2data.length; i++)
    {
      nodes.push(this.createCircleNode(this.test2coordinates[i].x, this.test2coordinates[i].y, this.test2data[i], this.test2Canvas));
    }

    this.test2timer.recordStartTime();

    //drawing path done event handler
    this.test2Canvas.on('path:created', (options) =>
    {
      var spammed = false;
      console.log("path created");
      //store the coordinates of path created
      this.userDrawnPaths.push(JSON.stringify(options.path.path));
      //array of all coords of path created
      var pathCoordsArray = options.path.path;

      //strange path class, uses nested arrays instead of raw points, 
      //possibly to be efficient if there are straight lines 
      for(var i = 0; i < pathCoordsArray.length; i++)
      {
        var pathCoordsArrayArray = pathCoordsArray[i];
        
        //check if each point collides with 1, 
        //starting from the beginning and working through sequentially
        //each element is of type fabric.Point
        //if it was previously found, dont count it again

        /*

        so apparently each element isnt a fabric.Point, 
        but from the object we can derive it by obtaining the numerical elements within the  object
        and attempt to reconstruct the point in order to perform a comparison
        */
        var currentPoint = new fabric.Point(pathCoordsArrayArray[1],pathCoordsArrayArray[2]);
        var errorMade = false;
        //checks if current point collides with node, and if node collision was not detected previously
        for(var j = 0; j < nodes.length; j++)
        {
          if (nodes[j].containsPoint(currentPoint) && (this.test2IntersectedNodes.indexOf(j+1) == -1))
          {
            if(this.test2IntersectedNodes.length > 0 && this.test2IntersectedNodes.indexOf(j) != -1 || this.test2IntersectedNodes.length == 0 && j+1 ==1)
            {
              this.test2IntersectedNodes.push(j+1);
            }
            
            else if(!spammed)
            {
              spammed = true;
              errorMade = true;
              this.test2Mistakes++;
              console.log("Error detected");
              //find index of current point in the array
              var index = pathCoordsArray.indexOf(pathCoordsArrayArray);
              //trim the array                   
              //var trimmedPathCoords = pathCoordsArray.splice(index);
              var trimmedPathCoords = pathCoordsArray.slice(0,index);
              console.log(pathCoordsArray);
              console.log(trimmedPathCoords);
              //reconstruct path using trimmed array
              var newPath = new fabric.Path(trimmedPathCoords);
              
              newPath.setGradient('fill',
              {
                type: 'linear',
                x1: -newPath.width / 2,
                y1: 0,
                x2: newPath.width / 2,
                y2: 0,
                colorStops: 
                {
                  0: 'rgba(0,0,0,0)',
                  0.5: 'rgba(0,0,0,0)',
                  1: 'rgba(0,0,0,0)'
                }
              });
              
              newPath.set(
              {
                stroke: 'rgba(255,0,0,0.1)',
                strokeWidth: 2,
                selectable: false,
              });
              console.log("attempting to delete old path");
              
              //delete the old path
              this.test2Canvas.remove(options.path);
              
              //add new path WIP FEATURE: BUGGY
              this.test2Canvas.add(newPath);
              
              //clear the intersected nodes array
              //this.test1IntersectedNodes = [];
              
              //console.log(pathCoordsArray);
              //test1Canvas.add(pathCoordsArray);
              
              this.test2Canvas.renderAll();
            }  

            //check if error was made
            if((this.test2IntersectedNodes[this.test2IntersectedNodes.length-1] - this.test2IntersectedNodes[this.test2IntersectedNodes.length-2]) != 1)  //e.g 17-14 != 1
            { 
              console.log("intersectedNodes -1 = ", this.test2IntersectedNodes[this.test2IntersectedNodes.length-1], "\n intersected Nodes -2 = ", this.test2IntersectedNodes[this.test2IntersectedNodes.length-2]);
              //special case if first node
              if(typeof this.test2IntersectedNodes[this.test2IntersectedNodes.length-2] == 'undefined')
              {
                console.log("array is size 1 and contains 1");
                //this is fine if the only object inside is "1"
                //but actually we want to kill the path 
                //this.test2Mistakes++;
              }
              else
              {                  
                //error has been made
                errorMade = true;
                this.test2Mistakes++;
                console.log("Error detected");
                
                //find index of current point in the array
                var index = pathCoordsArray.indexOf(pathCoordsArrayArray);
                //trim the array                   
                //var trimmedPathCoords = pathCoordsArray.splice(index);
                var trimmedPathCoords = pathCoordsArray.slice(0,index);
                console.log(pathCoordsArray);
                console.log(trimmedPathCoords);
                //reconstruct path using trimmed array
                var newPath = new fabric.Path(trimmedPathCoords);

                newPath.setGradient('fill',
                {
                  type: 'linear',
                  x1: -newPath.width / 2,
                  y1: 0,
                  x2: newPath.width / 2,
                  y2: 0,
                  colorStops: {
                    0: 'rgba(0,0,0,0)',
                    0.5: 'rgba(0,0,0,0)',
                    1: 'rgba(0,0,0,0)'
                  }
                });

                newPath.set(
                  {
                    stroke: 'rgba(255,0,0,0.1)',
                    strokeWidth: 2,
                    selectable: false,
                  });
                console.log("attempting to delete old path");

                //delete the old path
                this.test2Canvas.remove(options.path);

                //clear the intersected nodes array
                //this.test2IntersectedNodes = [];

                //add new path WIP FEATURE: BUGGY
                this.test2Canvas.add(newPath);
                
                this.test2Canvas.renderAll();
                break;
              }
            }
          }
        }
      }
      console.log("Path Crossed through the following nodes: ", this.test2IntersectedNodes);

      ///check if its crossed through nothing
      if(this.test2IntersectedNodes.length == 0)
      {
        //delete path if so
        console.log("Crossed through nothing... deleting path");
        this.test2Mistakes++;
        this.test2Canvas.remove(options.path);
        this.test2Canvas.renderAll();
      }

      //check if the path is equal to the correct sequence
      var intersectedNodesString = this.test2IntersectedNodes.map(String); //casts array to string elements

      //var equal = this.test2data.length == intersectedNodesString.length && this.test2data.every((element, index)=> element === intersectedNodesString[index] );
      
      /*var correctPath = true;
      for (var k = 0; k < this.test2data.length - 1; k++)
      {
        if(this.test2IntersectedNodes[k] != (this.test2IntersectedNodes[k+1] - 1))
        {
          correctPath = false;
        }
      }*/
      
      if(this.test2CorrectPath && this.test2IntersectedNodes.length == this.test2data.length)
      {
        console.log("Path correctly went through all elements in sequence!");
        console.log("Test 2 Mistakes: ", this.test2Mistakes)
        console.log("Test 2 Complete, Sending Results...");
        this.test2timer.recordEndTime();
        document.getElementById('test2donebutton').style.display = "block";
        this.test2Canvas.isDrawingMode = false;
        this.test2Canvas.setHeight(0);
        this.test2Canvas.setWidth(0);
      }
    });
    this.test2Canvas.renderAll();
  }

  private createCircleNode(x: number, y: number, text: string, canvas: any) 
  {
    //construct shape first
    var circle = new fabric.Circle(
      {
        fill: 'white',
        borderColor: 'black',
        radius: 20,
        selectable: false,
        originX: 'center',
        originY: 'center',
        stroke: 'black',
        strokeWidth: 2
      });

    //construct text to put on shape
    var circletext = new fabric.Text(text,
      {
        fontFamily: 'Calibri',
        fontSize: 20,
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
      });

    //join them in a group
    var group = new fabric.Group([circle, circletext],
    {
      left: x,
      top: y
    });

    canvas.add(group);
    return group;
  }

  clickHandlerInstructions()
  {
    var firstTest = document.getElementById("test1div");
    var instructionsDiv = document.getElementById("instructionsdiv");
    firstTest.style.display = "block";
    instructionsDiv.style.display = "none";

    this.beginTest1();
  }

  clickHandlerTest1()
  {  
    var firstTest = document.getElementById("test1div");
    firstTest.style.display = "none";
    var secondTest = document.getElementById("test2div");
    secondTest.style.display = "block";

    this.beginTest2();
  }

  sendResults()
  {
    //send test results
    var timeTaken = this.test1timer.getTimeElapsed(true) + this.test2timer.getTimeElapsed(true);
    var totalMistakes = this.test1Mistakes + this.test2Mistakes;

    this.rs.insertTrailMaking(this.auth.PARTICIPANT_TEST_ID,parseInt(timeTaken.toString()),totalMistakes);

    console.log("Results sent");

    //send interaction logs
    this.rs.insertInteractionLogs(this.auth.PARTICIPANT_TEST_ID,5,JSON.stringify(this.userDrawnPaths)).subscribe((res) => console.log(res));
  }
}
