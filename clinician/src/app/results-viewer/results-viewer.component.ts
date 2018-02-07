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

}
