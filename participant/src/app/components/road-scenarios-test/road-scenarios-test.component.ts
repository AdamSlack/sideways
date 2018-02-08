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
  
  public sendResults() {
    this.rs.insertRoadScenarioResults("1", 123, 456);
    this._router.navigateByUrl('/home');

  }

  public gatherResults() {
    this.sendResults();
  }

  public localeSubscription : Subscription;
  public testTitle : string = '';
  public testInstructions : string = '';
  public roadSigns : any[] = [];
  public roadScenarios : any[];

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

    this.auth.PARTICIPANT_TEST_LOCALE = 'test';

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
      this.initalise_board_components();
    });
  }

  private initalise_board_components() {
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
    let line_padding = 5;
    //Break line
    this.fab.createBreakLine(this.fab, Canvas, 0, grid_length + line_padding);

    //this.createDeck(this.fab, Canvas.width -250 - square_length,  Canvas.height -150 - square_length, square_length * 0.9);

    this.load_scenarios_into_grid(this.fab);
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

      fabric.Image.fromURL(scenario_path, function (oImg) {
        console.log("Getting scenario: ", scenario_path);
        if (oImg == null) {
          console.log("oh no the path doesn't exist. It should but the directions in use were rando...", scenario_path);
        } else {
          console.log(ref_component.width);
          var group = fab.image_parser(oImg, ref_component.width, Canvas, scenario_path);

          let path_broken = scenario_path.split("/");
          let id_name =  path_broken[path_broken.length];
          
          group.id = id_name;
          group.type = "card";
          group.set({ left: ref_component.left, top: ref_component.top })
          group.scaleToWidth(ref_component.width);
          group.scaleToHeight(ref_component.width);

          //Deck.push(group);
          Canvas.add(group);
        }
      }, { crossOrigin: 'Anonymous' });
    });
  }

  private createDeck(fab: any, xOffset : number = 0, yOffset : number  = 0,  length : number) {
    //Load image image as a sign making them all the same size
    console.log("All road signs loading: ",this.roadSigns);

    this.roadSigns.forEach(road_path => {
      fabric.Image.fromURL(road_path, function (oImg) {
        console.log("Getting sign: ", road_path);
        if (oImg == null) {
          console.log("oh no the path doesn't exist. It should but the directions in use were rando...", road_path);
        } else {
          var group = fab.image_parser(oImg, length, Canvas, Deck, road_path);

          let path_broken =road_path.split("/");
          let id_name =  path_broken[path_broken.length];
          
          group.id = id_name;
          group.type = "card";
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
