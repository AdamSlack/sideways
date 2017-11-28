import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-road-scenarios-test',
  templateUrl: './road-scenarios-test.component.html',
  styleUrls: ['./road-scenarios-test.component.scss']
})
export class RoadScenariosTestComponent implements OnInit {

  constructor(private rs: ResultsService) { }
  public sendResults() {
    this.rs.insertRoadScenarioResults(1, 123, 456);
  }
  ngOnInit() {

  }
}
