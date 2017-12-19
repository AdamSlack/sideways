import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { RecordTimingService } from '../services/record-timing.service';

@Component({
  selector: 'app-compass-directions-test',
  templateUrl: './compass-directions-test.component.html',
  styleUrls: ['./compass-directions-test.component.scss']
})
export class CompassDirectionsTestComponent implements OnInit {

  private timer : RecordTimingService;  

  constructor(private rs: ResultsService) { }
  
  public sendResults() {
    this.rs.insertCompassDirectionResults(1, 123, 456);
  }
  
  ngOnInit() {
  }

}
