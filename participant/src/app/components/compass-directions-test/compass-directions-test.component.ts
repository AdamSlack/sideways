import { Component, OnInit, group } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { RecordTimingService } from '../../services/record-timing.service';
import { Time } from '@angular/common/src/i18n/locale_data_api';
import { FabricService } from '../../services/fabric.service'
import { HttpClient } from '@angular/common/http';
import "fabric"
import { rootRoute } from '@angular/router/src/router_module';
import { AuthenticationService } from '../../services/authentication.service';
import { AssetRetrievalService } from '../../services/asset-retrieval.service';
import { Subscription } from 'rxjs/Subscription';
import { race } from 'q';
import { REACTIVE_DRIVEN_DIRECTIVES } from '@angular/forms/src/directives';

declare const fabric: any;
//TODO: place in inherited class the global canvas components. Only ever one canvas on screen
//TODO: debug mode enables the skeleton view of all objects

//Canvas for displaying things
var Canvas: any;
//Should be a json defined classed
var Deck:any[];

var GridSquares:any[];

//TODO: tbf this could be served in the angular assets folder without the asset_root but wanted to test for other apps

//Reads row, column
/**/ 
//Reads row, column
enum compassDir {
  //Row one
  SouthEast_West= 0,
  NorthEast_West,
  SouthWest_West,
  East_West,
  //Row two
  SouthEast_NorthWest,
  NorthEast_NorthWest,
  SouthWest_NorthWest,
  East_NorthWest,
  //Row three
  SouthEast_North,
  NorthEast_North,
  SouthWest_North,
  East_North,
  //Row Four
  SouthEast_South,
  NorthEast_South,
  SouthWest_South,
  East_WestSouth,
} 

const square_keys = [
  "SEW",
  "NEW",
  "SWW",
  "EW",
  "SENW",
  "NENW",
  "SENW",
  "ENW",
  "SEN",
  "NEN",
  "SWN",
  "EN",
  "SES",
  "NES",
  "SWS",
  "EWS"
]

const card_keys = [
"N" + "NE",
"N" + "E",
"N" + "SE",
"N" + "S",
"N" + "SW",
"N" + "W",
"N" + "NW",
"NE" + "E",
"NE" + "SE",
"NE" + "S",
"NE" + "SW",
"NE" + "W",
"NE" + "NW",
"E" + "SE",
"E" + "S",
"E" + "SW",
"E" + "W",
"E" + "NW",
"SE" + "S",
"SE" + "SW",
"SE" + "W",
"SE" + "NW",
"S" + "SW",
"S" + "W",
"S" + "NW",
"SW" + "W",
"NW" + "NW"]

var server_root = 'http://localhost:5000/';

var asset_link = "/test/compass_directions/";


@Component({
  selector: 'app-compass-directions-test',
  templateUrl: './compass-directions-test.component.html',
  styleUrls: ['./compass-directions-test.component.scss']
})

export class CompassDirectionsTestComponent implements OnInit {

  public time : number = 0 ;
  constructor(private rs: ResultsService,
              private timer : RecordTimingService,
              private fab: FabricService,
              private http: HttpClient,
              private auth : AuthenticationService,
              private locale : AssetRetrievalService
            ) {
            
            }

  // Localisation Preset Data
  public testTitle : string = '';
  public testInstructions : string = '';
  public compassLabel : string = '';
  public deckLabel : string = '';

  public localeSubscription : Subscription;
  
  public startTimer() {
    this.timer.recordStartTime()
  }

  public stopTimer() {
    this.timer.recordEndTime();
    this.time = this.timer.getTimeElapsed(true);
  }

  public sendResults() {
    this.rs.insertCompassDirectionResults(1, 123, 456);
  }

  /*
   * Subscribes to a request for localisation preset details.
   * If no preset details have successfully been obtained, it returns back to the login screen.
   *
   */
  public initLocaleSettings() : void {
    console.log('Initialising Game Localisation settings.');
    if (this.localeSubscription) {
      console.log('An existing subscription for locale assets was found. Unsubscribing.');
      this.localeSubscription.unsubscribe();
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
    console.log('Requesting asset retrieval service fetches Compass Direction locale assets.');
    this.localeSubscription = this.locale.selectCompassDirectionDetails(this.auth.PARTICIPANT_TEST_LOCALE).subscribe((res) => {
      console.log('Response for Compass Direction game assets recieved from servr.');
      this.testTitle = res['name'] ? res['name'] : 'Compass Directions';
      this.testInstructions = res['instructions'] ? res['instructions'] : 'No Instructions Found. Please restart the app.';
      this.compassLabel = res['headingsLabel'] ? res['headingsLabel'] : 'Compass';
      this.deckLabel = res['decklabel'] ? res['deckLabel'] : 'Deck of Cards';
      console.log('Test title: ' + res['name']);
      console.log('Test instructions: ' + res['instructions']);
      console.log('Test compass label: ' + res['headingsLabel']);
      console.log('Test deck label: ' + res['deckLabel']);
    });
  }

  ngOnInit() {
    //console.log("requesting a fabric canvas");
    //this.fab.generateFabricCanvas();
    //this.canvas = new fabric.Canvas('canvas', { selection: false });
    
    this.initLocaleSettings();

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
    this.addIdentifyingImages(Canvas, x_grid_offset ,  y_grid_offset , square_length);
    GridSquares = this.fab.createGridBaseSquares(x_grid_offset + square_length ,y_grid_offset + square_length, Canvas, square_length * 4,4);

    this.createCompassDeck(this.fab, Canvas.width -250 - square_length,  Canvas.height -150 - square_length, 28, square_length * 0.9);
    
    // Commented out cause we don't really need it?
    //Canvas.add(this.createShuffleButton(Canvas.width - 100, Canvas.width - 150));

  }

  

  private createCompassDeck(fab: FabricService, xOffset : number = 0, yOffset : number  = 0, deckSize : number = 28, length : number) {

      //Initialise deck of compass cards
      var cards = Array.from({length: deckSize}, (value, key) => key).map((idx : number) => {
        // let card = this.fab.createReactingObj(Canvas,xOffset,yOffset, length, 'card_' + idx.toString());
        // card.isPlaced = false;
        // card.lockRotation = true;
        // card.lockUniScaling = true;
        // card.selectable = true;
        // card.lockScalingX = true;
        // card.lockScalingY = true

        let image_path = server_root + asset_link + "compass_" +(idx +1) + ".png"
        console.log(image_path)

        //The way it works is like a clock on the server 

        let img;

        function image_parser(oImg) {

          oImg.crossOrigin = "Anonymous";

          oImg.scale(length).set({
            left: xOffset, 
            top: yOffset,
            originX: 'left', 
            originY: 'top',
            centeredRotation: true,
            lockUniScaling: true,
            lockScalingY: true, 
            lockScalingX: true,
            hasControls: false,
            id: idx.toString(), 
          },);

          oImg.scaleToWidth(length);
          oImg.scaleToHeight(length);
                              // Canvas.add(img)
          // Canvas.add(card);
          // Ok we have the image, can add to group/canvas
          if(oImg == undefined) {
            console.log("something went wrong createing image from asset...");
          } else {
            console.log("Adding canvas item")
          }
          
          var group = new fabric.Group([ oImg ], {
            left: xOffset,
            top: yOffset,
            scaleY: length,
            scaleX: length,
            lockScalingY: true, 
            lockScalingX: true,
            hasControls: false
          });
          group.id = idx.toString();
          group.type = "card";
          group.scaleToWidth(length);
          group.scaleToHeight(length);


          fab.addInteractionObjLogic(group, Canvas, group.type);
          fab.addRotatingStyle(group, Canvas);
          
          Deck.push(group);

          Canvas.add(group);
        }

        fabric.Image.fromURL(image_path, image_parser,{ crossOrigin: 'Anonymous'})
      
      });
    }

   

    private calculateResults(squareMatches : any[]) {
      // 1 point for each vehicle correctly placed i.e. a maximum of 2 points per
      // card. This includes the demonstration item, so the maximum possible
      // score is 32 points. It is easiest to score by counting one vehicle for each
      // row and then one vehicle for each column separately.
  
      let score = 0;
      var matches_dump = []
  
      squareMatches.forEach((element, idx) => {
        
        if(element !== undefined)  {
          console.log("Checking : ", element);
          let elemnt_idx :number = element + 1;
          let c_key = card_keys[element];

          console.log("Card key: ", c_key, elemnt_idx);
          console.log("Sqaure key: ", square_keys[idx], idx);
          if (c_key  === square_keys[idx]) {
            console.log("winner winner chicken dinner");
            matches_dump.push({"scene":square_keys[idx],"card": c_key})
          }
        }
        
      });

  
      console.log("dis fellow got dis reuslts: ", matches_dump)
      //Rip let's log your score and also your cards matches because that is bull    
  
      //
  
    }

  public gatherResults() {
    let squareMatches = new Array(GridSquares.length);
    
    function get_distance_points(x1, y1, x2,y2){
      var dx = x2-x1;
      var dy = y2-y1;
      return Math.sqrt(dx*dx+dy*dy);
    }

    console.log(squareMatches.length);
    GridSquares.forEach( square => {
      Deck.forEach( card => {
        //card.intersectsWithObject()
        if (card.intersectsWithObject(square)) {
          
          let distance = get_distance_points(square.top , square.left, card.top, card.left);

          //console.log("Checking interaction: ", square.id , card.id)
          if(distance < card.width/2) {
            var square_hit =  squareMatches[square.d];
              //&& square_hit != -1
              //If no iteracting
              squareMatches[square.id] =  +card.id;

          }
        }

      });
    });
    console.log(squareMatches);
    this.calculateResults(squareMatches);
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

  public addIdentifyingImages(canvas: any, xPos: number, yPos: number, compass_length: number) {
    
    var compass_url = server_root + 'test/compass_directions/compass_north.svg';

    var group = [];
    var rotate = 0;
    var increment_rotation = 45;

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

}
