import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { RecordTimingService } from '../../services/record-timing.service';
import { TestDealerService } from '../../services/test-dealer.service';


@Component({
  selector: 'app-dot-cancellation-test',
  templateUrl: './dot-cancellation-test.component.html',
  styleUrls: ['./dot-cancellation-test.component.scss']
})
export class DotCancellationTestComponent implements OnInit {

  private timer : RecordTimingService;

  constructor(private rs: ResultsService, private test_dealer : TestDealerService  ) { }

  public sendResults() {
    this.test_dealer.next_game_tests();
    //this.rs.insertDotCancellationResults("1", 123, 1, 2, 3);
  }
  
  ngOnInit() {
  }

}
