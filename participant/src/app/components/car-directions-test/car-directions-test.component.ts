import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { RecordTimingService } from '../../services/record-timing.service';
import { FabricService } from '../../services/fabric.service'
import { ActivatedRoute, Router } from '@angular/router';


import "fabric"
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../services/authentication.service';
import { AssetRetrievalService } from '../../services/asset-retrieval.service';
import { sendRequest } from 'selenium-webdriver/http';
declare const fabric: any;

//Canvas for displaying things
var Canvas: any;
//Should be a json defined classed
var Deck: any[];

var GridSquares: any[];

//Reads row, column
enum CarDirections {
  //Row one
  upright = 0,
  upup,
  upleft,
  updown,
  //Row two
  downright,
  downup,
  downleft,
  downdown,
  //Row three
  rightright,
  rightup,
  rightleft,
  rightdown,
  //Row Four
  leftright,
  leftup,
  leftleft,
  leftdown,
}

var server_root = 'http://localhost:5000/';

var asset_link = "/test/cardirections/";

@Component({
  selector: 'app-car-directions-test',
  templateUrl: './car-directions-test.component.html',
  styleUrls: ['./car-directions-test.component.scss']
})
export class CarDirectionsTestComponent implements OnInit {

  public time: number = 0;

  constructor(
    private rs: ResultsService,
    private timer: RecordTimingService,
    private fab: FabricService,
    public auth: AuthenticationService,
    public locale: AssetRetrievalService,
    private _router: Router

  ) { }

  public localeSubscription: Subscription;
  public testTitle: string = '';
  public testInstructions: string = '';
  public directionsLabel: string = '';
  public deckLabel: string = '';


  public sendResults() {
    //this.rs.insertCarDirectionResults("1", 123, 456);
    this._router.navigateByUrl('/compass_directions');

  }


  /*
   * Subscribes to a request for localisation preset details.
   * If no preset details have successfully been obtained, it returns back to the login screen.
   *
   */
  public initLocaleSettings(): void {
    console.log('Initialising Game Localisation settings.');
    if (this.localeSubscription) {
      console.log('An existing subscription for locale assets was found. Unsubscribing.');
      this.localeSubscription.unsubscribe();
    }
    if (this.auth.PARTICIPANT_TEST_LOCALE == '') {
      alert('No valid localisation details found. returning to login.');
      this.auth.VALIDATED = false;
      this.auth.CLINICIAN_ID = '';
      this.auth.PARTICIPANT_TEST_ID = '';
      this.auth.AUTH_TOKEN = '';
      this.auth.PARTICIPANT_TEST_LOCALE = '';
      return;
    }
    console.log('Requesting asset retrieval service fetches Compass Direction locale assets.');
    this.localeSubscription = this.locale.selectCarDirectionDetails(this.auth.PARTICIPANT_TEST_LOCALE).subscribe((res) => {
      console.log('Response for Compass Direction game assets recieved from servr.');
      this.testTitle = res['name'] ? res['name'] : 'Car Directions';
      this.testInstructions = res['instructions'] ? res['instructions'] : 'No Instructions Found. Please restart the app.';
      this.directionsLabel = res['headingsLabel'] ? res['headingsLabel'] : 'Directions';
      this.deckLabel = res['decklabel'] ? res['deckLabel'] : 'Deck of Cards';
      console.log('Test title: ' + res['name']);
      console.log('Test instructions: ' + res['instructions']);
      console.log('Test compass label: ' + res['headingsLabel']);
      console.log('Test deck label: ' + res['deckLabel']);
    });
  }

  ngOnInit() {
    this.initLocaleSettings();

    Canvas = this.fab.generateFabricCanvas('canvas');
    Deck = [];

    //Need to check width and height and fit in the smallest 
    var percentage_cover = 0.8;
    var grid_length = (Canvas.width < Canvas.height ? Canvas.width : Canvas.height) * percentage_cover; //- 100 to account for offset
    // console.log("Grid Length: ", grid_length);
    // console.log("Grid Length Percent: ", grid_length * 0.5)

    //TODO: fabric js has some alignment methods..
    var x_grid_offset = 0;
    var y_grid_offset = 0;

    var square_length = grid_length / 5
    this.addIdentifyingImages(Canvas, x_grid_offset, y_grid_offset, square_length);
    GridSquares = this.fab.createGridBaseSquares(x_grid_offset + square_length, y_grid_offset + square_length, Canvas, square_length * 4, 4);


    let line_padding = 5;
    //Break line
    this.fab.createBreakLine(this.fab, Canvas, 0, grid_length + line_padding);

    let deck_item_sz = square_length * 0.9;
    this.createDeck(this.fab, (Canvas.width / 2) - deck_item_sz / 2, (Canvas.height * 0.8) + (line_padding * 2), deck_item_sz);
    //this.createDeck(this.fab, Canvas.width - 250 - square_length, Canvas.height - 150 - square_length, 16, square_length * 0.9);
  }
  public addIdentifyingImages(canvas: any, xPos: number, yPos: number, arrow_length: number) {
    var group = [];

    //Top row
    //let times=(n,f)=>{while(n-->0)f();}

    const times = n => f => {
      let iter = i => {
        if (i === n) return
        f(i)
        iter(i + 1)
      }
      return iter(0)
    }
    //times(3,()=>console.log('wow'))

    var c_offset = (arrow_length / 4)

    //left 
    this.fab.drawArrow(canvas, 2, xPos + (arrow_length * 1) + c_offset, 0 + c_offset * 2, xPos + (arrow_length * 2) - c_offset, 0 + c_offset * 2)
    //up 
    this.fab.drawArrow(canvas, 2, xPos + (arrow_length * 2) + c_offset * 2, xPos + (arrow_length) - c_offset, xPos + (arrow_length * 2) + c_offset * 2, 0 + c_offset)
    //right 
    this.fab.drawArrow(canvas, 2, xPos + (arrow_length * 3) + c_offset, 0 + c_offset * 2, xPos + (arrow_length * 4) - c_offset, 0 + c_offset * 2)
    //Down 
    this.fab.drawArrow(canvas, 2, xPos + (arrow_length * 4) + c_offset * 2, 0 + c_offset, xPos + (arrow_length * 4) + c_offset * 2, xPos + (arrow_length) - c_offset)


    //up 
    this.fab.drawArrow(canvas, 10, xPos + c_offset * 2, 0 + (arrow_length * 2) - c_offset, xPos + c_offset * 2, xPos + (arrow_length * 1) + c_offset)
    //Down 
    this.fab.drawArrow(canvas, 10, xPos + c_offset * 2, 0 + c_offset + (arrow_length * 2), xPos + c_offset * 2, xPos + (arrow_length * 3) - c_offset)
    //right
    this.fab.drawArrow(canvas, 10, xPos + c_offset, 0 + c_offset * 2 + (arrow_length * 3), xPos + arrow_length - c_offset, 0 + (arrow_length * 3) + c_offset * 2)
    //left 
    this.fab.drawArrow(canvas, 10, xPos + arrow_length - c_offset, 0 + c_offset * 2 + (arrow_length * 4), xPos + c_offset, 0 + c_offset * 2 + (arrow_length * 4))

  }


  public gatherResults() {
    var squareMatches = [...Array(GridSquares.length || 0)].map((v, i) => i)

    console.log(squareMatches.length);
    GridSquares.forEach(square => {
      Deck.forEach(card => {
   

        if (card.intersectsWithObject(square)) {

          let distance = this.fab.get_distance_points(square.top, square.left, card.top, card.left);

          //console.log("Checking interaction: ", square.id , card.id)
          if (distance < card.width / 2) {
            var square_hit = squareMatches[square.d];
            //&& square_hit != -1
            //If no iteracting
            squareMatches[square.id] = +card.id;
          }
        }
        
      });
    });

    console.log(squareMatches);
    //this.sendResults();
  }


  private createDeck(fab: any, xOffset: number = 0, yOffset: number = 0, length: number) {
    //Initialise deck of compass cards

      //Method on server:
      let car_tag = 'C';
      let lorry_tag = 'L';

      let dir_tags = ['L', 'R', 'F', 'B'];
    
      dir_tags.forEach(tag_dir_une => {

        dir_tags.forEach(tag_dir_deux => {

          let id_tag = car_tag + tag_dir_une + lorry_tag + tag_dir_deux;
          let image_path = server_root + asset_link + id_tag + ".png";


          fabric.Image.fromURL(image_path, function (oImg) {
            if (oImg == null) {
              console.log("oh no the path doesn't exist. It should but the directions in use were rando...", image_path);
            } else {
              var group = fab.image_parser(oImg, length, Canvas, Deck, id_tag);

              group.id = id_tag;
              group.type = "card";
              group.set({ left: xOffset, top: yOffset })
              group.scaleToWidth(length);
              group.scaleToHeight(length);

              Deck.push(group);
              Canvas.add(group);
              console.log("The total deck size: ",Deck.length);

            }
          }, { crossOrigin: 'Anonymous' });

        });


      });

  }

}
