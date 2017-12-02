import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { InitialisationService } from '../services/initialisation.service';

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

  public localOptionsSubscription : Subscription;
  public testOptionSubscription : Subscription;
  public testInitSubscription : Subscription;
  

  constructor(private init : InitialisationService) { }

  public initialiseStudy() {
    console.log(this.p_id);
    console.log(this.localeChoice);
    console.log(this.testChoice);
    this.testInitSubscription = this.init.requestStudyInit(this.p_id, this.localeChoice, this.testChoice).subscribe((res) => {
      this.initialisationDetails = {
        c_id : res.c_id,
        p_id : res.p_id,
        t_id : res.t_id,
        testType : res.testType
      }
      console.log(res);
    });
  }

  ngOnInit() {
  
    this.init.fetchLocalisationOption().subscribe((res) => {
      this.localeOptions = res.locales;
    });

    this.init.fetchTestOptions().subscribe((res) => {
      this.testOptions = res.tests;
    });
  }

}
