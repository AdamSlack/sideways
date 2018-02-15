import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { home_route } from '../../app-routing.module';
// import { trail_making_route } from '../../app-routing.module';
// import { assessment_manager } from '../../app-routing.module';

import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-home-selection',
  templateUrl: './home-selection.component.html',
  styleUrls: ['./home-selection.component.scss']
})
export class HomeSelectionComponent implements OnInit {
  
  public trail_making;
  public ass : Route;
  public router;

  constructor(private _router: Router) { 
    this.router = _router;
    console.log('Current Route: ', JSON.stringify(this.router.url, undefined, 2));
    // console.log("Assess Route: ", assessment_manager)
    // this.ass = assessment_manager[0];
    // this.trail_making = trail_making_route[0];
    this.trail_making = "trail_making";
    this.router.events.subscribe(path => {
      console.log('path = ', path);
    });
  }

  ngOnInit() {
  }

}
