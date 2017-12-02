import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  public optionSelected : boolean = false;
  public initialisationSelected : boolean = false;
  public viewResultsSelected : boolean = false;


  //
  //  Should use Routing... TODO later...
  //


  public resetSelection() {
    // Toggle all options off
    this.optionSelected = false;
    this.initialisationSelected = false;
    this.viewResultsSelected = false;
  }

  public selectInitialisation() {
    // toggle selection of study initialisation screen
    this.initialisationSelected = true;
    this.optionSelected = true    
  }

  public selectViewResults() {
    // toggle selection of results viewing screen.
    this.viewResultsSelected = true;
    this.optionSelected = true    
  }

  constructor() { }

  ngOnInit() {
  }

}
