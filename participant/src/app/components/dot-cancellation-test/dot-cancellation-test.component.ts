import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { RecordTimingService } from '../../services/record-timing.service';


@Component({
  selector: 'app-dot-cancellation-test',
  templateUrl: './dot-cancellation-test.component.html',
  styleUrls: ['./dot-cancellation-test.component.scss']
})
export class DotCancellationTestComponent implements OnInit {

  private timer : RecordTimingService;

  constructor(private rs: ResultsService) { }

  public sendResults() {
    this.rs.insertDotCancellationResults("1", 123, 1, 2, 3);
  }
  
  ngOnInit() {
  }

}
