import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { InitialisationService } from '../services/initialisation.service';
import { AuthenticationService } from '../services/authentication.service';
import { Subscribable } from 'rxjs/Observable';

@Component({
  selector: 'app-study-init',
  templateUrl: './study-init.component.html',
  styleUrls: ['./study-init.component.scss']
})

export class StudyInitComponent implements OnInit {

  public localeOptions : string[];
  public testOptions : string[];
  public p_id : string;
  public localeChoice : string;
  public testChoice : string;
  public initialisationDetails : {c_id : number, p_id : number, t_id : number, testType : string};

  public participant_test_id : string;

  public localOptionsSubscription : Subscription;
  public testInitSubscription : Subscription;
  public participantInitSubscription : Subscription;
  

  constructor(private init : InitialisationService, private auth : AuthenticationService) { }

  public initialiseStudy() {
    console.log(this.p_id);
    console.log(this.localeChoice);
    console.log(this.auth.CLINICIAN_ID)
    
    if(this.participantInitSubscription) {
      this.participantInitSubscription.unsubscribe();
    }

    if(this.testInitSubscription) {
      this.testInitSubscription.unsubscribe();
    }

    if(!this.localeChoice) {
      alert('Please Check All Details are filled Correctly.');
      return;
    }

    if(this.p_id && this.p_id != '' && parseInt(this.p_id) != 0) {
      this.testInitSubscription = this.init.requestStudyInit(parseInt(this.p_id), parseInt(this.auth.CLINICIAN_ID), this.localeChoice).subscribe((res) => {
        this.participant_test_id = res['testId'];
      });
      return ;
    }

    this.participantInitSubscription = this.init.requestParticipantInit().subscribe((res) => {
      this.p_id = res['participantId'];
      this.testInitSubscription = this.init.requestStudyInit(parseInt(res['participantId']), parseInt(this.auth.CLINICIAN_ID), this.localeChoice).subscribe((res) => {
        this.participant_test_id = res['testId'];
      });
    });
  }

  ngOnInit() {
  
    this.init.fetchLocalisationOption().subscribe((res) => {
      this.localeOptions = res.localeNames;
    });
  }

}
