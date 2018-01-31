import { Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/router/src/config';

import { home_route } from '../app-routing.module';
import { test_game_routes } from '../app-routing.module';

@Injectable()
export class TestDealerService {

  start_test : number = 0;

  current_test : Route = test_game_routes[0];

  constructor() {}
  
  public get_next_game_tests() {
    this.start_test += 1;
    this.current_test = test_game_routes[this.start_test];
    console.log("Next test: ",this.current_test.path);
  }

}
