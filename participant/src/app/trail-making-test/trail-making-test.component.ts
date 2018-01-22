import { Component, OnInit } from '@angular/core';
import { RecordTimingService } from '../services/record-timing.service';

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

    var node01 = this.CircleNode(555, 720, "1");
    this.CircleNode(357, 526, "2");
    this.CircleNode(724, 332, "3");
    this.CircleNode(345, 670, "4");
    this.CircleNode(25,  90,  "5");
    this.CircleNode(250, 312, "6");
    this.CircleNode(205, 720, "7");
    this.CircleNode(105, 250, "8");
    this.CircleNode(112, 600, "9");
    this.CircleNode(143,  11,  "10");
    this.CircleNode(320, 167, "11");
    this.CircleNode(740, 57,  "12");
    this.CircleNode(456, 37,  "13");
    this.CircleNode(600, 292, "14");
    this.CircleNode(700, 728, "15");
    this.CircleNode(30,  400, "16");
    this.CircleNode(356, 30,  "17");
    this.CircleNode(670, 522, "18");
    this.CircleNode(515, 467, "19");
    this.CircleNode(130, 163, "20");
    this.CircleNode(700, 150, "21");
    this.CircleNode(400, 310, "22");
    this.CircleNode(180, 464, "23");
    this.CircleNode(488, 637, "24");
    this.CircleNode(563, 135, "25");


    //mouse down event handler
    canvas.on('mouse:down', function (options) 
    {
      console.log(options.e.clientX, options.e.clientY);
      console.log("Mouse clicked");

      if (options.target) 
      {
        console.log("Object clicked! ", options.target.type);
      }
    });



    /*mouse:up
    mouse:down
    mouse:move
    mouse:dblclick
    mouse:wheel
    mouse:over
    mouse:out*/

    //drawing path done event handler
    canvas.on('path:created', function (options) 
    {
      console.log("path created");

      //Checks if object intersects with the first node (1)
      //bool return
      //simple check, but provides no information on the sequence
      var intersectedNodes;
      var intersectswith1 = options.path.intersectsWithObject(node01);
      if(intersectswith1)
      {
        console.log("Drawing Path intersects with Object 1");
      }

      //options.path.path;
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
        if (node01.containsPoint(currentPoint) && (intersectedNodes.indexOf(1) == -1))
        {
          console.log("Coordinate ", currentPoint, " was found to be inside object ", node01);
          intersectedNodes.push(1);
        }

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
}
