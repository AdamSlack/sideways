import { Component, OnInit } from '@angular/core';
import { RecordTimingService } from '../../services/record-timing.service';
import { AssetRetrievalService } from '../../services/asset-retrieval.service';
import { ResultsService } from '../../services/results.service';

import 'fabric';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../services/authentication.service';
declare const fabric: any;

var test1timer : RecordTimingService;
var test2timer : RecordTimingService;
var test1Canvas: any;
var test2Canvas: any;
var test1Mistakes = 0;
var test2Mistakes = 0;
var test1data : string[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"];
var test2data : string[] = ["1","A","2","B","3","C","4","D","5","E","6","F","7","G","8","H","9","I","10","J","11","K","12","L","13"];
var test1coordinates = [
  {x: 705, y: 720}, //1
  {x: 357, y: 167}, //2
  {x: 724, y: 390}, //3
  {x: 510, y: 470}, //4
  {x: 25,  y: 90 }, //5
  {x: 250, y: 312}, //6
  {x: 50, y: 770}, //7
  {x: 105, y: 890}, //8
  {x: 112, y: 600}, //9
  {x: 143, y: 11 }, //10
  {x: 320, y: 560}, //11
  {x: 700, y: 30 }, //12
  {x: 532, y: 70 }, //13
  {x: 600, y: 292}, //14
  {x: 480, y: 860}, //15
  {x: 30,  y: 400}, //16
  {x: 356, y: 30 }, //17
  {x: 670, y: 522}, //18
  {x: 515, y: 670}, //19
  {x: 130, y: 205}, //20
  {x: 700, y: 150}, //21
  {x: 400, y: 310}, //22
  {x: 180, y: 464}, //23
  {x: 300, y: 800}, //24
  {x: 700, y: 890}, //25
]; 
var test2coordinates = [
  {x: 705, y: 720}, //1
  {x: 357, y: 167}, //2
  {x: 724, y: 390}, //3
  {x: 510, y: 470}, //4
  {x: 25,  y: 90 }, //5
  {x: 250, y: 312}, //6
  {x: 50, y: 770}, //7
  {x: 105, y: 890}, //8
  {x: 112, y: 600}, //9
  {x: 143, y: 11 }, //10
  {x: 320, y: 560}, //11
  {x: 700, y: 30 }, //12
  {x: 532, y: 70 }, //13
  {x: 600, y: 292}, //14
  {x: 480, y: 860}, //15
  {x: 30,  y: 400}, //16
  {x: 356, y: 30 }, //17
  {x: 670, y: 522}, //18
  {x: 515, y: 670}, //19
  {x: 130, y: 205}, //20
  {x: 700, y: 150}, //21
  {x: 400, y: 310}, //22
  {x: 180, y: 464}, //23
  {x: 300, y: 800}, //24
  {x: 700, y: 890}, //25
];  

@Component({
  selector: 'app-trail-making-test',
  templateUrl: './trail-making-test.component.html',
  styleUrls: ['./trail-making-test.component.css']
})
export class TrailMakingTestComponent implements OnInit 
{
  private timer : RecordTimingService;
  private assetService : AssetRetrievalService;
  private auth : AuthenticationService;
  public localisationSubscription : Subscription;


  title = 'app';

  constructor(private rs: ResultsService) {}

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

    this.localisationSubscription = this.localisationSubscription.selectTrailMakingTestDetails(this.auth.PARTICIPANT_TEST_LOCALE).subscribe((res) => 
    {
      console.log('Response for Trail Making Test Localisation Data recieved from server.');

      //WIP - Get this stuff converted into Trail making stuff
      /*
      this.testTitle = res['name'] ? res['name'] : 'Compass Directions';
      this.testInstructions = res['instructions'] ? res['instructions'] : 'No Instructions Found. Please restart the app.';
      this.compassLabel = res['headingsLabel'] ? res['headingsLabel'] : 'Compass';
      this.deckLabel = res['decklabel'] ? res['deckLabel'] : 'Deck of Cards';
      console.log('Test title: ' + res['name']);
      console.log('Test instructions: ' + res['instructions']);
      console.log('Test compass label: ' + res['headingsLabel']);
      console.log('Test deck label: ' + res['deckLabel']);
      */

      var trailA : string[] = res['TrailA'] ? res['TrailA'] : 'Failed To Obtain Trail A Data';
      var trailB : string[] = res['TrailB'] ? res['TrailB'] : 'Failed To Obtain Trail B Data';
      var testInstructions : string = res['instructions'] ? res['instructions'] : 'Failed To Obtain Instructions, Please restart the app';
      
      this.title = res['name'] ? res['name'] : 'Trail Making Test';
      if (trailA.length==25) {test1data = trailA;}
      if (trailB.length==25) {test2data = trailB;}
      document.body.innerText = testInstructions;

    });
  }

  private enableDrawing() 
  {
    test1Canvas.isDrawingMode = true;
  }
  private disableDrawing() 
  {
    test1Canvas.isDrawingMode = false;
  }

  private beginTest1()
  {
    //disable done button
    document.getElementById('test1donebutton').hidden = true;

    //using fabric library
    test1Canvas = new fabric.Canvas('test1',{isDrawingMode: true});

    //retrieve server response of characters
    //AssetRetrievalService

    //creates all the circle nodes
    var nodes : any = [];
    for(var i = 0; i < test1data.length; i++)
    {
      nodes.push(this.createCircleNode(test1coordinates[i].x, test1coordinates[i].y, test1data[i], test1Canvas));
    }

    test1timer.recordStartTime();

    //drawing path done event handler
    test1Canvas.on('path:created', function (options) 
    {
      console.log("path created");

      //Checks if object intersects with the first node (1)
      //bool return
      //simple check, but provides no information on the sequence
      /*
      var intersectswith1 = options.path.intersectsWithObject(node01);
      if(intersectswith1)
      {
        console.log("Drawing Path intersects with Object 1");
      }*/

      //options.path.path;
      //stores numbers of every object that was drawn through (in order)
      var intersectedNodes : number[] = [];
      //array of all coords of path created
      var pathCoordsArray = options.path.path;
      
      //25 false default array of bools to determine if each node found already - DEPRECATED
      //var foundObjArray = Array(25).fill(false);

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
          if (nodes[j].containsPoint(currentPoint) && (intersectedNodes.indexOf(j+1) == -1))
          {
            //console.log("Coordinate ", currentPoint, " was found to be inside object ", nodes[j]);
            //push = push_back so dont worry
            intersectedNodes.push(j+1);
  
            //check if error was made
            if((intersectedNodes[intersectedNodes.length-1] - intersectedNodes[intersectedNodes.length-2]) != 1)  //e.g 17-14 != 1
            { 
              console.log("intersectedNodes -1 = ", intersectedNodes[intersectedNodes.length-1], "\n intersected Nodes -2 = ", intersectedNodes[intersectedNodes.length-2]);
              //special case if first node
              if(intersectedNodes.length == 1 && intersectedNodes[0] == 1)
              {
                console.log("array is size 1 and contains 1");
                //this is fine if the only object inside is "1"
              }
              else
              {                  
                //error has been made
                errorMade = true;
                test1Mistakes++;
                console.log("Error detected");
                

                //find index of current point in the array
                var index = pathCoordsArray.indexOf(pathCoordsArrayArray);
                //trim the array                   
                var trimmedPathCoords = pathCoordsArray.splice(index);
                
                //reconstruct path using trimmed array
                var newPath = new fabric.Path(trimmedPathCoords);
                console.log("attempting to delete old path");

                //delete the old path
                test1Canvas.remove(options.path);

                //add new path WIP FEATURE: BUGGY
                //test1Canvas.add(newPath);
                
                //console.log(pathCoordsArray);
                //test1Canvas.add(pathCoordsArray);
                
                //test1Canvas.renderAll();
                break;
              }
            }
          }
        }
      }
      console.log("Path Crossed through the following nodes: ", intersectedNodes);

      ///check if its crossed through nothing
      if(intersectedNodes.length == 0)
      {
        //delete path if so
        console.log("Crossed through nothing... deleting path");
        test1Mistakes++;
        test1Canvas.remove(options.path);
        test1Canvas.renderAll();
      }

      //check if the path is equal to the correct sequence
      var intersectedNodesString = intersectedNodes.map(String); //casts array to string elements
      var equal = test1data.length == intersectedNodesString.length && test1data.every((element, index)=> element === intersectedNodesString[index] );
      if(equal)
      {
        console.log("Path correctly went through all elements in sequence!");
        test1timer.recordEndTime();
        document.getElementById('test1donebutton').hidden = false;
        test1Canvas.isDrawingMode = false;
      }
    });

    test1Canvas.renderAll();
  }

  private beginTest2()
  {
    //hide done button
    document.getElementById('test2donebutton').hidden = false;

    test2Canvas = new fabric.Canvas('test2',{isDrawingMode: true});

    //retrieve server response of characters
    //AssetRetrievalService

    //creates all the circle nodes
    var nodes : any = [];
    for(var i = 0; i < test2data.length; i++)
    {
      nodes.push(this.createCircleNode(test2coordinates[i].x, test2coordinates[i].y, test2data[i], test2Canvas));
    }

    test2timer.recordStartTime();

    //drawing path done event handler
    test2Canvas.on('path:created', function (options) 
    {
      console.log("path created");

      //stores numbers of every object that was drawn through (in order)
      var intersectedNodes : number[] = [];
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
          if (nodes[j].containsPoint(currentPoint) && (intersectedNodes.indexOf(j+1) == -1))
          {
            //console.log("Coordinate ", currentPoint, " was found to be inside object ", nodes[j]);
            //push = push_back so dont worry
            intersectedNodes.push(j+1);
  
            //check if error was made
            if((intersectedNodes[intersectedNodes.length-1] - intersectedNodes[intersectedNodes.length-2]) != 1)  //e.g 17-14 != 1
            { 
              console.log("intersectedNodes -1 = ", intersectedNodes[intersectedNodes.length-1], "\n intersected Nodes -2 = ", intersectedNodes[intersectedNodes.length-2]);
              //special case if first node
              if(intersectedNodes.length == 1 && intersectedNodes[0] == 1)
              {
                console.log("array is size 1 and contains 1");
                //this is fine if the only object inside is "1"
              }
              else
              {                  
                //error has been made
                errorMade = true;
                test2Mistakes++;
                console.log("Error detected");
                

                //find index of current point in the array
                var index = pathCoordsArray.indexOf(pathCoordsArrayArray);
                //trim the array                   
                var trimmedPathCoords = pathCoordsArray.splice(index);
                
                //reconstruct path using trimmed array
                var newPath = new fabric.Path(trimmedPathCoords);
                console.log("attempting to delete old path");

                //delete the old path
                test2Canvas.remove(options.path);

                //add new path WIP FEATURE: BUGGY
                //test1Canvas.add(newPath);
                
                //console.log(pathCoordsArray);
                //test1Canvas.add(pathCoordsArray);
                
                //test1Canvas.renderAll();
                break;
              }
            }
          }
        }
      }
      console.log("Path Crossed through the following nodes: ", intersectedNodes);

      ///check if its crossed through nothing
      if(intersectedNodes.length == 0)
      {
        //delete path if so
        console.log("Crossed through nothing... deleting path");
        test2Mistakes++;
        test2Canvas.remove(options.path);
        test2Canvas.renderAll();
      }

      //check if the path is equal to the correct sequence
      var intersectedNodesString = intersectedNodes.map(String); //casts array to string elements
      var equal = test2data.length == intersectedNodesString.length && test2data.every((element, index)=> element === intersectedNodesString[index] );
      if(equal)
      {
        console.log("Path correctly went through all elements in sequence!");
        console.log("Test 2 Complete, Sending Results...");
        test2timer.recordEndTime();
        document.getElementById('test2donebutton').hidden = false;
        test2Canvas.isDrawingMode = false;

        //Endpoint Expects:
        //insertTrailMaking(p_id: number, time_taken: number, mistakes: number)
        var timeTaken = test1timer.getTimeElapsed(true) + test2timer.getTimeElapsed(true);
        var totalMistakes = test1Mistakes + test2Mistakes;
        this.rs.insertTrailMaking(/*PATIENT ID*/ 1 ,timeTaken,totalMistakes);
        //please change the 1... it needs to send the patient ID!
      }
    });
    test2Canvas.renderAll();
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
}
