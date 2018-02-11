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
  public algorithms : Array<{id : number, name : string}>;
  public algorithmID : number;

  public dotCancellationTest : {testId : number, timeTaken : number, truePos : number, falsePos : number, falseNeg : number};
  public compassDirectionsTest : {testId : number, timeTaken : number, points : number};
  public carDirectionsTest : {testId : number, timeTaken : number, points : number};
  public roadScenariosTest : {testId : number, timeTaken : number, points : number};
  public trailMakingTest : {testId : number, timeTaken : number, mistakes : number};

  public algorithmResults : {pass : string, fail : string, passed : string};

  ngOnInit() {
    this.results.requestClinicianParticipant().subscribe((res) => {
      console.log('Response from request for Clinician Participants Recieved:');
      console.log(res);
      this.participantIDs = res.participants.sort((a,b) => a - b);
    });
  }

  public requestParticipantTests() : void {
    this.results.requestParticipantTests(this.participantID).subscribe((res) => {
      console.log('Response from request for Participant Tests Recieved:');
      console.log(res);
      this.testIDs = res.tests.sort((a,b) => a - b);
    });
  }

  public requestTestResults() : void {
    this.results.requestTestResults(this.testID).subscribe((res) => {
      console.log('Reponse from request for participant test results recieved:');
      console.log(res);
      this.dotCancellationTest = res.dotCancellationTest;
      this.compassDirectionsTest = res.compassDirectionsTest;
      this.carDirectionsTest = res.carDirectionsTest;
      this.roadScenariosTest = res.roadScenariosTest;
      this.trailMakingTest = res.trailMakingTest;
      console.log(res);
    });
  }

  public requestAlgorithms() {
    this.results.requestAlgorithms().subscribe((res) => {
      console.log('Response recieved for request for algorithm types:');
      console.log(res);
      this.algorithms = res.algorithms.map((algo) => {return {id : algo.algorithmId, name : algo.algorithmName}});
      console.log('Algorithms:');
      console.log(this.algorithms);
    });
  }

  public requestAlgorithmResults() {
    this.results.requestAlgorithmScore(this.testID, this.algorithmID).subscribe((res) => {
      console.log("Response recieved for request for algorithm Results:");
      console.log(res);

      this.algorithmResults = {
        pass : res.r1.toFixed(2),
        fail : res.r1.toFixed(2),
        passed : res.passed ? 'PASS' : 'FAIL'
      } 
      console.log(this.algorithmResults);
    });
  }

}
