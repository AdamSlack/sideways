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
  
  constructor(public locale : LocalisationService) { }

  public startLocaleCreation() : void {
    this.creationStarted = true;
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
