import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { RecordTimingService } from '../../services/record-timing.service';

@Component({
  selector: 'app-road-scenarios-test',
  templateUrl: './road-scenarios-test.component.html',
  styleUrls: ['./road-scenarios-test.component.scss']
})
export class RoadScenariosTestComponent implements OnInit {
  
  private timer : RecordTimingService;

  constructor(private rs: ResultsService) { }
  public sendResults() {
    this.rs.insertRoadScenarioResults(1, 123, 456);
  }
  ngOnInit() {
    this.timer = new RecordTimingService();
    //this.timer.recordStartTime();
    //this.timer.completeTime();
  }
}
