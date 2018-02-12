import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { RecordTimingService } from '../../services/record-timing.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dot-cancellation-test',
  templateUrl: './dot-cancellation-test.component.html',
  styleUrls: ['./dot-cancellation-test.component.scss']
})
export class DotCancellationTestComponent implements OnInit {

  private timer : RecordTimingService;
  
  constructor(private rs: ResultsService, private _router: Router, 		private route: ActivatedRoute  ) { }

  public sendResults() {
    //this.rs.insertDotCancellationResults("1", 123, 1, 2, 3);
    console.log(this._router.url)
    console.log(this.route)
    // this._router.navigate([ '../'],  { relativeTo: this.route });
    this._router.navigateByUrl('/car_directions');
  }
  
  ngOnInit() {
  }

}
