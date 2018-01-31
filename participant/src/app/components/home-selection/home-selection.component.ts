import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { home_route } from '../../app-routing.module';
import { trail_making_route } from '../../app-routing.module';
import { test_game_routes } from '../../app-routing.module';
import { assessment_manager } from '../../app-routing.module';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-home-selection',
  templateUrl: './home-selection.component.html',
  styleUrls: ['./home-selection.component.css']
})
export class HomeSelectionComponent implements OnInit {
  
  public trail_making : Route = trail_making_route[0];
  public assessment : Route = assessment_manager[0];
  
  public router;

  constructor(private _router: Router) { 
    this.router = _router;
    console.log('Current Route: ', JSON.stringify(this.router.url, undefined, 2));

  }

  ngOnInit() {
  }

}
