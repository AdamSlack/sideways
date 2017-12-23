import { Component, OnInit } from '@angular/core';
import { LocalisationService, LocalePreset } from '../services/localisation.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http/src/response';

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

  public 
  
  constructor(public locale : LocalisationService) { }

  public startLocaleCreation() : void {
    this.creationStarted = true;
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

  public scenario : string;
  public roadSign : string;

  public onSelectScenario(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let target : any = event.target;
        this.scenario = target.result;
      }
    }
  }
  
  public onSelectRoadSign(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let target : any = event.target;
        this.roadSign = target.result;
      }
    }
  }

  public onScenarioClick(event) {
    let target = event.target || event.srcElement,    
        img = target.attributes.src.ownerElement;

    let x = event.clientX - img.offsetLeft,
        y = event.clientY - img.offsetTop;
    
    console.log('Image Co-ords - X: ' + x, ', Y: ' + y);
    
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
