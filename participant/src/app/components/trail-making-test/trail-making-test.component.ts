import { Component, OnInit } from '@angular/core';
import { RecordTimingService } from '../../services/record-timing.service';

@Component({
  selector: 'app-trail-making-test',
  templateUrl: './trail-making-test.component.html',
  styleUrls: ['./trail-making-test.component.css']
})
export class TrailMakingTestComponent implements OnInit {

  private timer : RecordTimingService;
  
  
  constructor() { }

  ngOnInit() {
  }

}
