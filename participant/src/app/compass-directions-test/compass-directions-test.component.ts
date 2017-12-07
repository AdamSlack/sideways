import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { FabricService } from '../services/fabric.service'


import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-compass-directions-test',
  templateUrl: './compass-directions-test.component.html',
  styleUrls: ['./compass-directions-test.component.scss']
})
export class CompassDirectionsTestComponent implements OnInit {

  //Canvas for displaying things
  canvas:any;

  constructor(private rs: ResultsService, private fab: FabricService) { }
  
  ngOnInit() {
    console.log("requesting a fabric canvas");
    //this.fab.generateFabricCanvas();
    this.canvas = new fabric.Canvas('canvas', { selection: false });
        
    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });
    
    // "add" rectangle onto canvas
    this.canvas.add(rect);
  }
  public sendResults() {
    this.rs.insertCompassDirectionResults(1, 123, 456);
  }
  

}
