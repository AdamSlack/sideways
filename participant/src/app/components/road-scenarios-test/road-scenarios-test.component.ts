import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { RecordTimingService } from '../../services/record-timing.service';
import { FabricService } from '../../services/fabric.service'
import { ActivatedRoute, Router } from '@angular/router';

//For requesting data structures
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { AssetRetrievalService } from '../../services/asset-retrieval.service';
import { Subscription } from 'rxjs/Subscription';

import "fabric"
import { element } from 'protractor';
import { sendRequest } from 'selenium-webdriver/http';
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

  private assets_url = '';  // URL to web api
  
  constructor(
    private rs: ResultsService, 
    private timer : RecordTimingService, 
    private fab: FabricService, 
    private http: HttpClient,
    public auth : AuthenticationService,
    public locale : AssetRetrievalService,
    private _router: Router

  ) { }

  public startTest() {
    this.test_started = true;
    this.initalise_board_components();
    this.startTimer(); 
  }

  public startTimer() {
    this.timer.recordStartTime();
  }

  public stopTimer() {
    this.timer.recordEndTime();
    this.time = this.timer.getTimeElapsed(true);
  }


  public sendResults(time_taken: number, score: number) {
    this.rs.insertRoadScenarioResults(this.auth.PARTICIPANT_TEST_ID, parseInt(time_taken.toString()), score);
    this.rs.roadSignScenariosHasResults = true;
  }

  private finishGame(score: number) {
    this.stopTimer(); //should be called by button really

    //Now route to move game forward
    this.sendResults(this.time, score);
  }

  
  private calculateResults(squareMatches: any) {
    let score = 0;
    var results_dump = []
    
    // One point for each sign correctly matched. The example is not included in
    // the score. If the client puts several cards in a pile, score only the top card
    // on the pile. Maximum score 12 points.
    let element;
    for (element in squareMatches) {
 
        results_dump.push({ "match_type": "all", "scene": element, "card": squareMatches[element] })

        if (element == squareMatches[element][0]) {
          console.log("Get's a point")
          score += score;
        }
    }

    console.log(score);
    console.log(results_dump);

    this.finishGame(score);
  }

  

  public gatherResults() {
    let squareMatches = {};

    GridSquares.forEach(square => {
      let square_ids = []
      Deck.forEach(card => {

        if (card.intersectsWithObject(square)) {

          let distance = this.fab.get_distance_points(square.top, square.left, card.top, card.left);

          //console.log("Checking interaction: ", square.id , card.id)
          if (distance < card.width / 2) {
            var square_hit = squareMatches[square.d];
            //&& square_hit != -1
            //If no iteracting
            square_ids.push(card.id);
          }
        }
      });
      console.log("Grid id",square.id);
      squareMatches[square.id] = square_ids;
    });
    console.log(squareMatches);
    this.calculateResults(squareMatches);
  }

  public localeSubscription : Subscription;
  public testTitle : string = '';
  public testInstructions : string = '';
  public roadSigns : any[] = [];
  public roadScenarios : any[];
  public test_started : boolean;

  /*
   * Subscribes to a request for localisation preset details.
   * If no preset details have successfully been obtained, it returns back to the login screen.
   */
  public initLocaleSettings() : void {
    console.log('Initialising Game Localisation settings.');
    if (this.localeSubscription) {
      console.log('An existing subscription for locale assets was found. Unsubscribing.');
      this.localeSubscription.unsubscribe();
    }

    // if(this.auth.PARTICIPANT_TEST_LOCALE == '') {
    //   alert('No valid localisation details found. returning to login.');
    //   this.auth.VALIDATED = false;
    //   this.auth.CLINICIAN_ID = '';
    //   this.auth.PARTICIPANT_TEST_ID = '';
    //   this.auth.AUTH_TOKEN = '';
    //   this.auth.PARTICIPANT_TEST_LOCALE = '';
    //   return;
    // }

    console.log('Requesting asset retrieval service fetches Compass Direction locale assets.');
    this.localeSubscription = this.locale.selectRoadSignScenarioDetails(this.auth.PARTICIPANT_TEST_LOCALE).subscribe((res) => {
      console.log('Response for Compass Direction game assets recieved from server.', res);
      this.testTitle = res['name'] ? res['name'] : 'Road Sign Scenarios';
      console.log('Test title: ' + res['name']);
      this.testInstructions = res['instructions'] ? res['instructions'] : 'No Instructions Found. Please restart the app.';
      console.log('Test instructions: ' + res['instructions']);
      this.roadScenarios = res['roadSignScenarios'].map((asset) => 'http://localhost:5000/' + asset['sceneImage'] + '.png');
      console.log("All road scenarios: ",this.roadScenarios);
      this.roadSigns = res['roadSignScenarios'].map((asset) => 'http://localhost:5000/' + asset['signImage'] + '.png');
      console.log("All road signs: ",this.roadSigns);
    
      //TODO: sorry, did not have time to fix and propagate through awits/promises
    });
  }

  private initalise_board_components() {
    Canvas = this.fab.generateFabricCanvas('canvas');
    Deck = [];

    //Need to check width and height and fit in the smallest 
    var percentage_cover = 0.8;
    var grid_length =  (Canvas.width < Canvas.height ? Canvas.width : Canvas.height) * percentage_cover; //- 100 to account for offset
    console.log("Grid Length: ", grid_length);

    //TODO: fabric js has some alignment methods..
    var x_grid_offset =  Canvas.width * (1 - percentage_cover) / 2;
    var y_grid_offset = 0;

    var square_length =  grid_length/5
    GridSquares = this.fab.createGridBaseSquares(x_grid_offset  ,y_grid_offset, Canvas, square_length * 4,4, square_length * 0.1);

    //TODO: Check the config for the currently chosen assets
    let line_padding = 5;
    //Break line
    this.fab.createBreakLine(this.fab, Canvas, 0, grid_length + line_padding);

    let deck_item_sz = square_length * 0.5;
    
    this.load_scenarios_into_grid(this.fab);

    this.createDeck(this.fab, (Canvas.width / 2) - deck_item_sz / 2, (Canvas.height * 0.8) + (line_padding * 2), deck_item_sz);
  }

  ngOnInit() {
    this.initLocaleSettings();    
  }

  private load_scenarios_into_grid(fab : any) {
    console.log("All road scenarios loading: ",this.roadScenarios);

    this.roadScenarios.forEach( (scenario_path, idx) => {
      //Refernece sqaure
      let ref_component = GridSquares[idx];
      console.log("Item refing: ", ref_component);
      ref_component.stroke = '#FFFFFF';

      fabric.Image.fromURL(scenario_path, function (oImg) {
        console.log("Getting scenario: ", scenario_path);
        if (oImg == null) {
          console.log("oh no the path doesn't exist. It should but the directions in use were rando...", scenario_path);
        } else {
          console.log(ref_component.width);
          //var group = fab.image_parser(oImg, ref_component.width, Canvas, scenario_path, false);
          oImg.crossOrigin = "Anonymous";

          oImg.scale(ref_component.width).set({
            originX: 'left', 
            originY: 'top',
            centeredRotation: true,
            lockUniScaling: true,
            lockScalingY: true, 
            lockScalingX: true,
            hasControls: false
          },);
      
          //oImg.scaleToWidth(img_length);
          oImg.scaleToHeight(ref_component.width);

          let path_broken = scenario_path.split("/");
          let id_name =  path_broken[path_broken.length -1];
          
          oImg.id = id_name;
          oImg.selectable = false;
          oImg.set({ left: ref_component.left, top: ref_component.top })
          oImg.scaleToWidth(ref_component.width);
          oImg.stroke = 'black';
          oImg.strokeWidth = 3;

          fab.addInteractionObjLogic(oImg, Canvas, "board" );

          //Rip let's overwrite grid squares to capture lgoic quicker
          GridSquares[idx] = oImg;
          //Deck.push(group);
          Canvas.add(oImg);
        }
      }, { crossOrigin: 'Anonymous' });
    });
  }

  private createDeck(fab: any, xOffset : number = 0, yOffset : number  = 0,  length : number) {
    //Load image image as a sign making them all the same size
    console.log("All road signs loading: ",this.roadSigns);

    this.roadSigns.forEach(road_path => {
      fabric.Image.fromURL(road_path, function (oImg) {
        console.log("Getting sigcreateGridBaseSquaresn: ", road_path);
        if (oImg == null) {
          console.log("oh no the path doesn't exist. It should but the directions in use were rando...", road_path);
        } else {
          
          let path_broken =road_path.split("/");
          let id_name =  path_broken[path_broken.length -1];
          var group = fab.image_parser(oImg, length, Canvas, id_name, road_path);
          
          group.id = id_name;
          group.type = "scenario";
          group.set({ left: xOffset, top: yOffset })
          group.scaleToWidth(length);
          group.scaleToHeight(length);

          Deck.push(group);
          Canvas.add(group);
        }
      }, { crossOrigin: 'Anonymous' });
    });  
  }



}
