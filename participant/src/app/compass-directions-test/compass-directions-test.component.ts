import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { RecordTimingService } from '../services/record-timing.service';
import { Time } from '@angular/common/src/i18n/locale_data_api';

@Component({
  selector: 'app-compass-directions-test',
  templateUrl: './compass-directions-test.component.html',
  styleUrls: ['./compass-directions-test.component.scss']
})
export class CompassDirectionsTestComponent implements OnInit {

  public time : number = 0 ;
  constructor(private rs: ResultsService, private timer : RecordTimingService) { }
  
  public startTimer() {
    this.timer.recordStartTime()
  }

  public stopTimer() {
    this.timer.recordEndTime();
    this.time = this.timer.getTimeElapsed(true);
  }

  public sendResults() {
    this.rs.insertCompassDirectionResults(1, 123, 456);
  }
  
  

  ngOnInit() {
  }

}
