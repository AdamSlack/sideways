import { Component, OnInit } from '@angular/core';
import { RecordTimingService } from '../services/record-timing.service';
import { AssetRetrievalService } from '../services/asset-retrieval.service';

import 'fabric';
declare const fabric: any;
var canvas: any;

@Component({
  selector: 'app-trail-making-test',
  templateUrl: './trail-making-test.component.html',
  styleUrls: ['./trail-making-test.component.css']
})
export class TrailMakingTestComponent implements OnInit 
{
  private timer: RecordTimingService;
  private assetService: AssetRetrievalService;
  
  title = 'app';

  constructor() 
  {
  }

  ngOnInit() 
  {
    //using fabric library
    canvas = new fabric.Canvas('myCanvas',
    {
      isDrawingMode: true
    });

    //retrieve server response of characters
    //AssetRetrievalService
    var test1data : string[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"];
    var test2data;
    var coordinates = [
      {x: 555, y: 720}, //1
      {x: 357, y: 526}, //2
      {x: 724, y: 332}, //3
      {x: 345, y: 670}, //4
      {x: 25,  y: 90 }, //5
      {x: 250, y: 312}, //6
      {x: 205, y: 720}, //7
      {x: 105, y: 250}, //8
      {x: 112, y: 600}, //9
      {x: 143, y: 11 }, //10
      {x: 320, y: 167}, //11
      {x: 740, y: 57 }, //12
      {x: 456, y: 37 }, //13
      {x: 600, y: 292}, //14
      {x: 700, y: 728}, //15
      {x: 30,  y: 400}, //16
      {x: 356, y: 30 }, //17
      {x: 670, y: 522}, //18
      {x: 515, y: 467}, //19
      {x: 130, y: 163}, //20
      {x: 700, y: 150}, //21
      {x: 400, y: 310}, //22
      {x: 180, y: 464}, //23
      {x: 488, y: 637}, //24
      {x: 563, y: 135}, //25
    ]; 

    //creates all the circle nodes
    var nodes : any = [];
    for(var i = 0; i < test1data.length; i++)
    {
      nodes.push(this.CircleNode(coordinates[i].x, coordinates[i].y, test1data[i]));
    }

    //drawing path done event handler
    canvas.on('path:created', function (options) 
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

        //checks if current point collides with node, and if node collision was not detected previously
        for(var j = 0; j < nodes.length; j++)
        {
          if (nodes[j].containsPoint(currentPoint) && (intersectedNodes.indexOf(j+1) == -1))
          {
            //console.log("Coordinate ", currentPoint, " was found to be inside object ", nodes[j]);
            //push = push_back so dont worry
            intersectedNodes.push(j+1);
          }
        }
      }
      console.log("Path Crossed through the following nodes: ", intersectedNodes);
      //check if the path is equal to the correct sequence
      var intersectedNodesString = intersectedNodes.map(String); //casts array to string elements
      var equal = test1data.length == intersectedNodesString.length && test1data.every((element, index)=> element === intersectedNodesString[index] );
      if(equal)
      {
        console.log("Path correctly went through all elements in sequence!");
      }
    });

    canvas.renderAll();
  }

  private CircleNode(x: number, y: number, text: string) 
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

    //node event handler to detect mouseover
    group.on('object:over', function (options) 
    {
      if (options.target) 
      {
        console.log("object moused over! EVENT HANDLER WORKED?!", options.target.type);
      }
    });
    canvas.add(group);
    return group;
  }

  private enableDrawing() 
  {
    canvas.isDrawingMode = true;
  }
  private disableDrawing() 
  {
    canvas.isDrawingMode = false;
  }

    //mouse down event handler
    /*
    canvas.on('mouse:down', function (options) 
    {
      console.log(options.e.clientX, options.e.clientY);
      console.log("Mouse clicked");

      if (options.target) 
      {
        console.log("Object clicked! ", options.target.type);
      }
    });
    */
    /*mouse:up
    mouse:down
    mouse:move
    mouse:dblclick
    mouse:wheel
    mouse:over
    mouse:out*/
}
