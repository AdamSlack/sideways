import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { FabricService } from '../services/fabric.service'


@Component({
  selector: 'app-compass-directions-test',
  templateUrl: './compass-directions-test.component.html',
  styleUrls: ['./compass-directions-test.component.scss']
})
export class CompassDirectionsTestComponent implements OnInit {

  //Canvas for displaying things
  canvas:any;

  //Should be a json defined classed
  deck:any[];

  constructor(private rs: ResultsService, private fab: FabricService) { }
  
  ngOnInit() {
    console.log("requesting a fabric canvas");
    //this.fab.generateFabricCanvas();
    //this.canvas = new fabric.Canvas('canvas', { selection: false });
    this.canvas = this.fab.generateFabricCanvas('canvas');
    this.fab.createGridBase(this.canvas, 5);
    //this.fab.activateSnapping(this.canvas);
    this.fab.addCompassImage(this.canvas);
    
    //Initialise deck of compass cards
    this.fab.createCard(this.canvas,20,20);
    


  }


  public sendResults() {
    this.rs.insertCompassDirectionResults(1, 123, 456);
  }
  

}
