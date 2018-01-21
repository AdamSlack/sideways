import { Component, OnInit } from '@angular/core';
import { LocalisationService, LocalePreset, Coords } from '../services/localisation.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { lchmod } from 'fs';


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

  constructor(public locale : LocalisationService) { }

  public startLocaleCreation() : void {
    this.creationStarted = true;
    this.locale.selectDotCancellationDetails(this.localeName).subscribe((res) => {
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
      this.localePreset.trailMaking.general.testHeading = res['name'];
      this.localePreset.trailMaking.trailA = res['trailA'];
      this.trailAArray = res['trailA'];
      this.trailAString = res['trailA'].join(', ');
      this.localePreset.trailMaking.trailB = res['trailB'];
      this.trailBArray = res['trailB'];
      this.trailBString = res['trailB'].join(', ');
    });
    
  }

  public scenarioCompleted(index : number)  {
    let a = this.scenarioUploaded[index],
        b = this.roadSignUpladed[index],
        c = this.placementFinisihed[index];

    this.scenarioComplete[index] = a && b && c
    console.log(a && b && c)
    return a && b && c;
  }

  public toggleScenario(index : number) {
    this.scenarioVisible[index] = !this.scenarioVisible[index];
  }

  public toggle(sectionName : string) {
    // ENUM....
    if (sectionName == 'dot') {
      this.dot = !this.dot;
    }
    if (sectionName == 'compass') {
      this.compass = !this.compass;      
    }
    if (sectionName == 'car') {
      this.car = !this.car;
    }
    if (sectionName == 'road') {
      this.road = !this.road;
    }
    if (sectionName == 'trail') {
      this.trail = !this.trail;
    }
  }

  public onSelectScenario(event, index) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let target : any = event.target;
        this.scenarioImages[index] = target.result;
        this.scenarioUploaded[index] = true;
        this.scenarioCompleted(index);
      }
    }
  }
  
  public onSelectRoadSign(event, index) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let target : any = event.target;
        this.roadSignImages[index] = target.result;
        this.roadSignUpladed[index] = true;
        this.scenarioCompleted(index);
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
    
    console.log(this.localePreset.dotCancellation.general.testHeading);
    console.log(this.localePreset.dotCancellation.general.testInstructions);
    if (this.localeSubmissionSubscription) {
      this.localeSubmissionSubscription.unsubscribe()
    }
    this.localeSubmissionSubscription = this.locale.requestLocaleSetup(this.localeName, new LocalePreset).subscribe(
      (res) => {
        if(!res.err) {
          this.creationStarted = false;
        }
        else {
          console.log('Form Error')
          console.log(res.err)
        }
      },
      (err : HttpErrorResponse) => {
        alert('HTTP Error Response: Error Submitting Form.')
        this.creationStarted = false;
      }
    );
  }

  ngOnInit() {
    console.log('Preset Name:' + this.locale.localePreset.name + '!');
    this.locale.localePreset.name = 'TEST';
    console.log('Preset Name:' + this.locale.localePreset.name + '!');    

  }

}
