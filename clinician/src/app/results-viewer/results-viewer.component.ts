import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../services/participant.service';

@Component({
  selector: 'app-results-viewer',
  templateUrl: './results-viewer.component.html',
  styleUrls: ['./results-viewer.component.scss']
})
export class ResultsViewerComponent implements OnInit {

  constructor(public results : ParticipantService) { }

  public participantIDs : number[] = [];
  public testIDs : number[] = [];
  public testID : number;
  public participantID : number;

  public dotCancellationTest : {testId : number, timeTaken : number, truePos : number, falsePos : number, falseNeg : number};
  public compassDirectionsTest : {testId : number, timeTaken : number, points : number};
  public carDirectionsTest : {testId : number, timeTaken : number, points : number};
  public roadScenariosTest : {testId : number, timeTaken : number, points : number};
  public trailMakingTest : {testId : number, timeTaken : number, mistakes : number};

  ngOnInit() {
    this.results.requestClinicianParticipant().subscribe((res) => {
      this.participantIDs = res.participants;
    });
  }

  public requestParticipantTests() : void {
    this.results.requestParticipantTests(this.participantID).subscribe((res) => {
      this.testIDs = res.tests;
    });
  }

  public requestTestResults() : void {
    this.results.requestTestResults(this.testID).subscribe((res) => {
      this.dotCancellationTest = res.dotCancellationTest;
      this.compassDirectionsTest = res.compassDirectionsTest;
      this.carDirectionsTest = res.carDirectionsTest;
      this.roadScenariosTest = res.roadScenariosTest;
      this.trailMakingTest = res.trailMakingTest;
      console.log(res);
      console.log(this.trailMakingTest);
    })
  }

}
