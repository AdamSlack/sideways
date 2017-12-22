import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { RecordTimingService } from '../services/record-timing.service';
import { Time } from '@angular/common/src/i18n/locale_data_api';
import { FabricService } from '../services/fabric.service'

import "fabric"
declare const fabric: any;
//TODO: place in inherited class the global canvas components. Only ever one canvas on screen
//TODO: debug mode enables the skeleton view of all objects

//Canvas for displaying things
var Canvas: any;
//Should be a json defined classed
var Deck:any[];

var GridSquares:any[];

//Reads row, column
enum compassDir {
  //Row one
  SouthEastWest= 0,
  NorthEastWest,
  SouthWestWest,
  EastWest,
  //Row two
  SouthEastNorthWest,
  NorthEastNorthWest,
  SouthWestNorthWest,
  EastNorthWest,
  //Row three
  SouthEastNorth,
  NorthEastNorth,
  SouthWestNorth,
  EastNorth,
  //Row Four
  SouthEastSouth,
  NorthEastSouth,
  SouthWestSouth,
  EastWestSouth,
} 

@Component({
  selector: 'app-compass-directions-test',
  templateUrl: './compass-directions-test.component.html',
  styleUrls: ['./compass-directions-test.component.scss']
})
export class CompassDirectionsTestComponent implements OnInit {

  public time : number = 0 ;
  constructor(private rs: ResultsService, private timer : RecordTimingService, private fab: FabricService) { }
  
  public startTimer() {
    this.timer.recordStartTime()
  }

  public stopTimer() {
    this.timer.recordEndTime();
    this.time = this.timer.getTimeElapsed(true);
  }

  public sendResults() {
    this.rs.insertCompassDirectionResults(1, 123, 456);

  ngOnInit() {
    console.log("requesting a fabric canvas");
    //this.fab.generateFabricCanvas();
    //this.canvas = new fabric.Canvas('canvas', { selection: false });
    Canvas = this.fab.generateFabricCanvas('canvas');
    Deck = [];

    var grid_length = 300;
    GridSquares = this.fab.createGridBaseSquares(100,100, Canvas, grid_length,4);
    this.addCompassImages(Canvas, 100 - (grid_length/4),  100 - (grid_length/4), grid_length/4);

    this.createDeck(Canvas.width - 100, Canvas.width - 110);
    

    // Commented out cause we don't really need it?
    //Canvas.add(this.createShuffleButton(Canvas.width - 100, Canvas.width - 150));
    Canvas.add(this.createDonezoButton(Canvas.width - 100, Canvas.width - 300));
  }

  
  private createDeck(xOffset : number = 0, yOffset : number  = 0, deckSize : number = 16) {
      //Initialise deck of compass cards
      var cards = Array.from({length: deckSize}, (value, key) => key).map((idx : number) => {
        let card = this.fab.createReactingObj(Canvas,xOffset,yOffset, 40, 'card' + idx.toString());
        card.isPlaced = false;
        card.lockRotation = true;
        card.lockUniScaling = true;
        card.selectable = true;
        card.lockScalingX = true;
        card.lockScalingY = true
        Canvas.add(card);
        Deck.push(card);
      });
  }

  private gatherResults() {
    var squareMatches = [...Array(GridSquares.length||0)].map((v,i)=>i)
  
    console.log(squareMatches.length);
    GridSquares.forEach( square => {
      Deck.forEach( card => {
        //card.intersectsWithObject()
        if (card.intersectsWithObject(square)) {
          squareMatches[square.id] = card.id;
        }
      });
    });
    
    console.log(squareMatches);
  }

  private createDonezoButton(x: number, y: number) {

    var butt = new fabric.Text( 'Donezo', {
      left:x,
      top:y,
      width:40,
      height:40,
      fontSize: 30,
      font: "roboto",
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      lockUniScaling: true,
      selectable: true,
      lockScalingX: true,
      lockScalingY: true
    });
    
    butt.on('selected', options => {
      this.gatherResults();
    });

    return butt;
  }
  
  //TODO: in inherited behaviour...
  private createShuffleButton(xPos: number, yPos: number) {
    //Create shuffle button
    var butt = new fabric.Text( 'Shuffle', {
      left:xPos,
      top:yPos,
      width:40,
      height:40,
      fontSize: 30,
      font: "roboto",
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      lockUniScaling: true,
      selectable: true,
      lockScalingX: true,
      lockScalingY: true
    });

    console.log("current deck",Deck);

    //Shuffle and place logic
    butt.on('selected', function(options) {
      console.log("shuffling");

      //Shuffle all those in deck that are not in placed state.
      //XXX: not real random, first deck compoennts are heavily weighted
      console.log("Current deck", Deck)
      Deck.sort(function (a,b) {
        console.log("Deck item:",a);
        if(a.isPlaced) { 
          return -1; //pop too front so were only shuffling the non placed section
        
        }  else { //give a rnadom sort position
          //Reset card position
      
        //TODO: get origin position from Deck
        var reset = (obj) => {
          obj.left = 30;
          obj.top = 30;
          //a.animate('top', 45, { duration: 4, onChange:Canvas.renderAll.bind(Canvas) });    
        }

        reset(a);
        reset(b);

        console.log("current deck",Deck);          
        return 0.5 - Math.random();
        }
      });
    });

    return butt;
  }

  public addCompassImages(canvas: any, xPos: number, yPos: number, compass_length: number) {
    // fabric.Image.loadSVGFromURL('../assets/compass_north.svg', function(oImg) {
    //   oImg.width = this.box_length
      
    //   oImg.height = this.box_length;
    //   canvas.add(oImg);
    // });
    var compass_url = '../assets/compass_north.svg';

    var group = [];
    var rotate = 0;
    var increment_rotation = 45;

    //Top row

    //Just messing... es6
    // let times=(n,f)=>{while(n-->0)f();}
    // times (3, console.log('times repeat'));
    const times = n => f => {
      let iter = i => {
        if (i === n) return
        f (i)
        iter (i + 1)
      }
      return iter (0)
    }
    
    times (4) (i => {
      fabric.loadSVGFromURL(compass_url, (objects, options) => {
        var obj = fabric.util.groupSVGElements(objects, {
          left: xPos + (compass_length/2) + (compass_length * (i+1)),
          top: yPos + (compass_length/2),
          originX: 'center', 
          originY: 'center',
          selectable: false
        });
        console.log(obj.rotate);
        obj.rotate(rotate);
        rotate += increment_rotation;
        obj.scaleToWidth(compass_length);
        canvas.add(obj).renderAll();
      });
    })

    rotate = 0;
    times (4) (i => {
      fabric.loadSVGFromURL(compass_url, (objects, options) => {
        var obj = fabric.util.groupSVGElements(objects, {
          left: xPos + (compass_length/2),
          top: yPos + ((compass_length/2)  + (compass_length * (i+1))),
          originX: 'center', 
          originY: 'center',
          selectable: false
        });
        obj.rotate(rotate);
        rotate += increment_rotation;
        obj.scaleToWidth(compass_length);
        canvas.add(obj).renderAll();
      });
    })

  }


  public sendResults() {
    this.rs.insertCompassDirectionResults(1, 123, 456);
  }
}