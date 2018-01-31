import { Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { home_route } from '../app-routing.module';
import { test_game_routes } from '../app-routing.module';

@Injectable()
export class TestDealerService {


  start_test : number = 0;

  current_test : Routes;

  constructor() {}
  
  public get_next_game_tests() {
    this.start_test += 1;

    test_game_routes[0]
     
    
  }

}
