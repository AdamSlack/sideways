import { Component, OnInit } from '@angular/core';
import { home_route } from '../../app-routing.module';
import { trail_making_route } from '../../app-routing.module';
import { test_game_routes } from '../../app-routing.module';


@Component({
  selector: 'app-home-selection',
  templateUrl: './home-selection.component.html',
  styleUrls: ['./home-selection.component.css']
})
export class HomeSelectionComponent implements OnInit {

  public home = home_route[0];
  
  public trail_making = trail_making_route[0];
  public test_game = test_game_routes;

  constructor() { }

  ngOnInit() {
  }

}
