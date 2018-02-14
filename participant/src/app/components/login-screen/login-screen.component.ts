import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AssertionError } from 'assert';
import { AssetRetrievalService } from '../../services/asset-retrieval.service';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  // PLACE HOLDERS
  public pt_id : string;
  public password : string;
  public clinicianEmail : string;
  public requestingDetails : boolean = false;  

  // test  

  constructor(public auth : AuthenticationService, public locale : AssetRetrievalService, public results : ResultsService) { }

  public connectToSDSA(){
    console.log("button pressed...")
    this.requestingDetails = true;
    this.auth.PARTICIPANT_TEST_ID = this.pt_id;
    this.auth.requestToken(this.clinicianEmail, this.password);

    this.auth.requestParticipantTestPresetName(this.pt_id).subscribe((res) => {
      if(res['presetName']) {
        this.auth.PARTICIPANT_TEST_LOCALE = res['presetName'];
        console.log('The selected localisation preset for this participant\'s test is: ' + res['presetName']);
        this.results.checkTestResults(this.auth.PARTICIPANT_TEST_ID);
      }
      else {
        this.auth.PARTICIPANT_TEST_LOCALE = '';
        console.log('No Preset Name Present in HTTP Response...');
      }
    });

    let timer = this.auth.startTimeoutPeriod().subscribe((time) => {
      this.requestingDetails = false;
      timer.unsubscribe();
    });
  }

  public 

  ngOnInit() {
    //this.locale.fetchCompass();

  }

}
