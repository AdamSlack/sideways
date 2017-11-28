import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-compass-directions-test',
  templateUrl: './compass-directions-test.component.html',
  styleUrls: ['./compass-directions-test.component.scss']
})
export class CompassDirectionsTestComponent implements OnInit {

  constructor(private rs: ResultsService) { }
  
  public sendResults() {
    this.rs.insertCompassDirectionResults(1, 123, 456);
  }
  
  ngOnInit() {
  }

}
