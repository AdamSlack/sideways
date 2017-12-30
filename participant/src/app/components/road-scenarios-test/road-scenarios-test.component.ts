import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { RecordTimingService } from '../../services/record-timing.service';
import { FabricService } from '../../services/fabric.service'

//For requesting data structures
import { HttpClient, HttpHeaders } from '@angular/common/http';


import "fabric"
declare const fabric: any;

//Canvas for displaying things
var Canvas: any;
//Should be a json defined classed
var Deck:any[];
var GridSquares:any[];

@Component({
  selector: 'app-road-scenarios-test',
  templateUrl: './road-scenarios-test.component.html',
  styleUrls: ['./road-scenarios-test.component.scss']
})
export class RoadScenariosTestComponent implements OnInit {
  
  public time : number = 0;

  private assets_url = 'api/heroes';  // URL to web api
  
  constructor(private rs: ResultsService, private timer : RecordTimingService, private fab: FabricService, private http: HttpClient,
  ) { }
  
  public sendResults() {
    this.rs.insertRoadScenarioResults(1, 123, 456);
  }

  ngOnInit() {
    Canvas = this.fab.generateFabricCanvas('canvas');
    Deck = [];

    //Need to check width and height and fit in the smallest 
    var percentage_cover = 0.8;
    var grid_length =  (Canvas.width < Canvas.height ? Canvas.width : Canvas.height) * percentage_cover; //- 100 to account for offset
    console.log("Grid Length: ", grid_length);
    console.log("Grid Length Percent: ", grid_length * 0.5)

    //TODO: fabric js has some alignment methods..
    var x_grid_offset = 0;
    var y_grid_offset = 0;

    var square_length =  grid_length/5
    GridSquares = this.fab.createGridBaseSquares(x_grid_offset + square_length ,y_grid_offset + square_length, Canvas, square_length * 4,4);

    //TODO: Check the config for the currently chosen assets
    //XXX: there is a change way to load assets right? like a asset manager?
    let asset_folder = '../../assets/road_scenarios';
    let asset_path  = asset_folder + 'assets/UK';
    this.createDeck(Canvas.width -250 - square_length,  Canvas.height -150 - square_length, asset_path, square_length * 0.9);
    
  }

  private createDeck(xOffset : number = 0, yOffset : number  = 0, asset_path : string, length : number) {
    //Load image image as a sign making them all the same size

    //Initialise deck of compass cards
    // var cards = Array.from({length: deckSize}, (value, key) => key).map((idx : number) => {
    //   let card = this.fab.createReactingObj(Canvas,xOffset,yOffset, length, 'card' + idx.toString());
    //   card.isPlaced = false;
    //   card.lockRotation = true;
    //   card.lockUniScaling = true;
    //   card.selectable = true;
    //   card.lockScalingX = true;
    //   card.lockScalingY = true
    //   Canvas.add(card);
    //   Deck.push(card);
    // });  
  }



}
