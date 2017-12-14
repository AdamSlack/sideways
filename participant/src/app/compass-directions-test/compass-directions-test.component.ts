import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { FabricService } from '../services/fabric.service'

import "fabric"
declare const fabric: any;
//TODO: place in inherited class the global canvas components. Only ever one canvas on screen
//TODO: debug mode enables the skeleton view of all objects

//Canvas for displaying things
var Canvas: any;
//Should be a json defined classed
var Deck:any[];

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

  constructor(private rs: ResultsService, private fab: FabricService) { }
  
  ngOnInit() {
    console.log("requesting a fabric canvas");
    //this.fab.generateFabricCanvas();
    //this.canvas = new fabric.Canvas('canvas', { selection: false });

    Canvas =  new fabric.Canvas('canvas');//this.fab.generateFabricCanvas('canvas');
    Deck = [];
    this.fab.createGridBaseLines(Canvas, 5);
    
    this.fab.addCompassImage(Canvas);
    
    this.createDeck();
    this.createShuffleButton(30,30);
  }

  private createDeck() {
       //Initialise deck of compass cards
      var card1 = this.fab.createReactingObj(Canvas,20,20, "card1");
      var card2 = this.fab.createReactingObj(Canvas,25,25, "card2");
      
      card1.isPlaced = false; 
      card2.isPlaced = false; 
      
      // "add" card onto canvas
      //TODO: should add whole card group to canvas
      Canvas.add(card1);
      Canvas.add(card2);
      
      Deck.push(card1);
      Deck.push(card2);
      
      console.log("Deck: ",Deck);
  }

  //TODO: in inherited behaviour...
  private createShuffleButton(x: number, y: number) {
    //Create shuffle button
    var button_rect = new fabric.Rect({
      left:x,
      top:y,
      width:40,
      height:40,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      lockUniScaling: true,
      selectable: false
    });

    Canvas.add(button_rect);
    console.log("current deck",Deck);
    

    //Shuffle and place logic
    button_rect.on('selected', function(options) {
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
      
     
          var reset = (obj) => {
            obj.left = 30;
            obj.top = 30;
            //a.animate('top', 45, { duration: 4, onChange: Canvas.renderAll.bind(Canvas) });    
          }

          reset(a);
          reset(b);

          console.log("current deck",Deck);          
          return 0.5 - Math.random();
        }
      });
      


    });
  }

  public sendResults() {
    this.rs.insertCompassDirectionResults(1, 123, 456);
  }
  
}
