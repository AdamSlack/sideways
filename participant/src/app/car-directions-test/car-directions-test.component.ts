import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-car-directions-test',
  templateUrl: './car-directions-test.component.html',
  styleUrls: ['./car-directions-test.component.scss']
})
export class CarDirectionsTestComponent implements OnInit {

  constructor(private rs: ResultsService) { }

  public sendResults() {
    this.rs.insertCarDirectionResults(1, 123, 456);
  }
  
  ngOnInit() {

  }

}
