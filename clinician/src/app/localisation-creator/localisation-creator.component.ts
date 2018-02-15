import { Component, OnInit } from '@angular/core';
import { LocalisationService, LocalePreset, Coords } from '../services/localisation.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import {  } from 'fs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-localisation-creator',
  templateUrl: './localisation-creator.component.html',
  styleUrls: ['./localisation-creator.component.scss']
})

export class LocalisationCreatorComponent implements OnInit {

  public creationStarted : boolean = false;
  public localeName : string = ''
  public localeSubmissionSubscription : Subscription;
  public localePreset : LocalePreset = new LocalePreset();
  
  public dot : boolean = false;
  public car : boolean = false;
  public compass : boolean = false;
  public road : boolean = false;
  public trail : boolean = false;

  // Road Signs , indexed though angular bindings.
  public scenarioCounts     : number = 16
  public scenarioUploaded   : Array<boolean> = Array(this.scenarioCounts).fill(false,0,this.scenarioCounts);
  public roadSignUpladed    : Array<boolean> = Array(this.scenarioCounts).fill(false,0,this.scenarioCounts);
  public scenarioVisible    : Array<boolean> = Array(this.scenarioCounts).fill(false,0,this.scenarioCounts);
  public placementFinisihed : Array<boolean> = Array(this.scenarioCounts).fill(false,0,this.scenarioCounts);
  public scenarioImages     : Array<string>  = Array(this.scenarioCounts).fill('',0,this.scenarioCounts);
  public roadSignImages     : Array<string>  = Array(this.scenarioCounts).fill('',0,this.scenarioCounts);
  public roadSignPositions  : Array<Coords>  = Array(this.scenarioCounts).fill(new Coords, 0, this.scenarioCounts)
  public scenarioComplete   : Array<boolean> = Array(this.scenarioCounts).fill(false, 0, this.scenarioCounts);
  public indicatorCoords    : Array<Coords>  = Array(this.scenarioCounts).fill(new Coords(-100,-100), 0, this.scenarioCounts)

  public scenarioBase64     : Array<string>   = Array(this.scenarioCounts).fill('',0,this.scenarioCounts);
  public sceneBase64        : Array<string>   = Array(this.scenarioCounts).fill('',0,this.scenarioCounts);
  
  public dotName : string = '';
  public dotInstructions : string = '';

  public compDirName : string = '';
  public compDirIns : string = '';
  public compDirHeadings : string = '';
  public compDirDeck : string = '';

  public carDirName : string = '';
  public carDirIns : string = '';
  public carDirHeadings : string = '';
  public carDirDeck : string = '';
  
  public tmName : string = '';
  public tmIns : string = '';
  public trailAString : string = '';
  public trailBString : string = '';
  public trailAArray : Array<string> = [];
  public trailBArray : Array<string> = [];

  constructor(public locale : LocalisationService, public sanitizer : DomSanitizer) { }

  public startLocaleCreation() : void {
    this.creationStarted = true;
    this.locale.selectDotCancellationDetails(this.localeName).subscribe((res) => {
      console.log(res)
      this.localePreset.dotCancellation.general.testHeading = res['name'];
      this.localePreset.dotCancellation.general.testInstructions = res['instructions'];
    });

    this.locale.selectCompassDirectionDetails(this.localeName).subscribe((res) => {
      console.log(res);
      this.localePreset.compassDirections.general.testHeading = res['name'];
      this.localePreset.compassDirections.general.testInstructions = res['instructions'];
      this.localePreset.compassDirections.matrix.headingsLabel = res['headingsLabel'];
      this.localePreset.compassDirections.matrix.deckLabel = res['deckLabel'];
    });

    this.locale.selectcarDirectionDetails(this.localeName).subscribe((res) => {
      console.log(res);
      this.localePreset.carDirections.general.testHeading = res['name'];
      this.localePreset.carDirections.general.testInstructions = res['instructions'];
      this.localePreset.carDirections.matrix.headingsLabel = res['headingsLabel'];
      this.localePreset.carDirections.matrix.deckLabel = res['deckLabel'];
    });

    this.locale.selectTrailMakingDetails(this.localeName).subscribe((res) => {
      console.log(res);
      this.localePreset.trailMaking.general.testHeading = res['name'];
      this.tmName = res['name'];
      this.tmIns = res['name'];
      this.localePreset.trailMaking.general.testInstructions = res['instructions'];
      this.localePreset.trailMaking.trailA = res['trailA'];
      this.trailAArray = res['trailA'];
      this.trailAString = res['trailA'].join(', ');
      this.localePreset.trailMaking.trailB = res['trailB'];
      this.trailBArray = res['trailB'];
      this.trailBString = res['trailB'].join(', ');
    });

    this.locale.selectRoadSignScenarioDetails(this.localeName).subscribe((res) => {
      console.log(res);
      this.localePreset.roadSigns.general.testHeading = res['name'];
      this.localePreset.roadSigns.general.testInstructions = res['instructions'];
      // These are being sanitized...3
      this.roadSignImages = res['roadSignScenarios'].map((rss) => "http://localhost:5000/" + rss['signImage']+".png" );
      this.scenarioImages = res['roadSignScenarios'].map((rss) => "http://localhost:5000/" + rss['sceneImage']+".png");
      this.indicatorCoords = res['roadSignScenarios'].map((rss) => new Coords(rss['xPos'], rss['yPos']));
    });
  }

  public scenarioCompleted(index : number)  {
    let a = this.scenarioUploaded[index],
        b = this.roadSignUpladed[index],
        c = this.placementFinisihed[index];

    this.scenarioComplete[index] = a && b
    console.log(a && b)
    return a && b;
  }

  public toggleScenario(index : number) {
    this.scenarioVisible[index] = !this.scenarioVisible[index];
  }

  public toggle(sectionName : string) {
    // ENUM....
    if (sectionName == 'dot') {
      this.dot = !this.dot;
      this.compass = false;
      this.road = false;
      this.trail= false;
      this.car = false; 
    }
    if (sectionName == 'compass') {
      this.compass = !this.compass;
      this.dot = false;
      this.road = false;
      this.trail= false;
      this.car = false;      
    }
    if (sectionName == 'car') {
      this.car = !this.car;
      this.dot = false;
      this.road = false;
      this.trail= false;
      this.compass = false; 
    }
    if (sectionName == 'road') {
      this.road = !this.road;
      this.dot = false;
      this.compass = false;
      this.trail= false;
      this.car = false; 
    }
    if (sectionName == 'trail') {
      this.trail = !this.trail;
      this.dot = false;
      this.road = false;
      this.compass= false;
      this.car = false; 
    }
  }

  public onSelectScenario(event, index) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let target : any = event.target;        
        if(!target.result){
          console.log('Not updating selected Road Sign');
          console.log('previous road sign is:' + this.roadSignImages[index]);
        }
        else if (target.result == '') {
          console.log('Not updating selected Road Sign');
          console.log('previous road sign is:' + this.roadSignImages[index]);
        }
        else{
        this.scenarioImages[index] = target.result;
        this.scenarioUploaded[index] = true;
        }
      }
    }
  }
  
  public onSelectRoadSign(event, index) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var byteReader = new FileReader();
      
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let target : any = event.target;
        if(!target.result){
          console.log('Not updating selected Road Sign');
          console.log('previous road sign is:' + this.roadSignImages[index]);
        }
        else if (target.result == '') {
          console.log('Not updating selected Road Sign');
          console.log('previous road sign is:' + this.roadSignImages[index]);
        }
        else{
          this.roadSignImages[index] = target.result;
          this.roadSignUpladed[index] = true;
          this.scenarioCompleted(index);
        }
      }
    }
  }

  splitTrailString(str : string, trailA : boolean = true) {
    let arr = str.replace(/ /g, '').split(',').filter((el) => el != '');

    if (trailA) {
      this.trailAArray = arr;
    } else {
      this.trailBArray = arr;
    }
}

  public onScenarioClick(event, index) {
    let target = event.target || event.srcElement,    
        img = target.attributes.src.ownerElement;

    let x = event.pageX - img.offsetLeft,
        y = event.pageY - img.offsetTop;
    
    console.log('Image Co-ords - X: ' + x, ', Y: ' + y);
    this.indicatorCoords[index] = new Coords(event.pageX, event.pageY);
    this.roadSignPositions[index] = new Coords(x-5,y-5);
    this.placementFinisihed[index] = true;
    this.scenarioCompleted(index);    
    return [x,y]
  }

  public completeLocaleCreation() : void {
    console.log('Requesting Locale Preset be added.');

    if (this.localeName && this.localePreset.dotCancellation.general.testHeading && this.localePreset.dotCancellation.general.testInstructions) {
      this.locale.addDotCancellation(
        this.localeName,
        this.localePreset.dotCancellation.general.testHeading,
        this.localePreset.dotCancellation.general.testInstructions
      ).subscribe(() => {
        console.log('Dot Cancellation Addition Request Processed');
      });
    }
    else {
      alert('Please Check All Dot Cancellation Details are Filled Out.');
      console.log(this.localeName,
        this.localePreset.dotCancellation.general.testHeading,
        this.localePreset.dotCancellation.general.testInstructions);
    }

    
    if(this.localeName &&
      this.localePreset.compassDirections.general.testHeading &&
      this.localePreset.compassDirections.general.testInstructions &&
      this.localePreset.compassDirections.matrix.headingsLabel &&
      this.localePreset.compassDirections.matrix.deckLabel) {
        this.locale.addCompassDirection(
          this.localeName,
          this.localePreset.compassDirections.general.testHeading,
          this.localePreset.compassDirections.general.testInstructions,
          this.localePreset.compassDirections.matrix.headingsLabel,
          this.localePreset.compassDirections.matrix.deckLabel
        ).subscribe(() => {
          console.log('Compass Direction Addition Request Processed');
        });
    } else {
      alert('Please Check all compass Direction Details are Complete.');
    }



    if (this.localeName &&
      this.localePreset.carDirections.general.testHeading&&
      this.localePreset.carDirections.general.testInstructions&&
      this.localePreset.carDirections.matrix.headingsLabel&&
      this.localePreset.carDirections.matrix.deckLabel){
        this.locale.addCarDirection(
          this.localeName,
          this.localePreset.carDirections.general.testHeading,
          this.localePreset.carDirections.general.testInstructions,
          this.localePreset.carDirections.matrix.headingsLabel,
          this.localePreset.carDirections.matrix.deckLabel
        ).subscribe(() => {
          console.log('Car Direction Addition Request Processed');
        });
      }
      else {
        alert('Please Check All Car Direction Details are Complete');
      }

      if(
        this.localeName &&
        this.localePreset.trailMaking.general.testHeading &&
        this.localePreset.trailMaking.general.testInstructions &&
        this.trailAArray &&
        this.trailBArray
      )
      {
        if(this.trailAArray.length != 25){
          alert('Please Ensure that Trail A has 25 comma seperated elements');
        }
        else {
          if(this.trailBArray.length != 25){
            alert('Please Ensure that Trail B has 25 comma seperated elements.');
          }
          else {
            this.locale.addTrailMaking(
              this.localeName,
              this.localePreset.trailMaking.general.testHeading,
              this.localePreset.trailMaking.general.testInstructions,
              this.trailAArray,
              this.trailBArray
            ).subscribe(() => {
              console.log('Compass Direction Addition Request Processed');
            });
          }
        }
      }
      else {
        alert('Please Check that All Details of the Trail Making Test are Filled Out.');
      }
    
      if (
        !this.localeName ||
        !this.localePreset.roadSigns.general.testHeading ||
        !this.localePreset.roadSigns.general.testInstructions
      ) {
        alert('Please Make sure that you have filled out all Road Sign Scenario Details');
      }
      else if (this.scenarioImages.every((val) => !val) && this.roadSignImages.every((val) => !val)) {
        alert('Please Make sure that all images have been uploaded for Road Sign Scenarios.');
      }
      else {
        this.locale.addRoadSignScenario(
          this.localeName,
          this.localePreset.roadSigns.general.testHeading,
          this.localePreset.roadSigns.general.testInstructions,
          this.scenarioImages,
          this.roadSignImages,
          this.indicatorCoords.map((co) => co.x),
          this.indicatorCoords.map((co) => co.y)
        ).subscribe(() => {
          console.log('Road Sign Scenario Processed Request Recieved.');
        });
      }
  }

  ngOnInit() {
    console.log('Preset Name:' + this.locale.localePreset.name + '!');
    this.locale.localePreset.name = 'TEST';
    console.log('Preset Name:' + this.locale.localePreset.name + '!');    

  }

}
