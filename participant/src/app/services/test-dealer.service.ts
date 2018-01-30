import { Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { test_game_routes } from '../app-routing.module';
import { start } from 'repl';


@Injectable()
export class TestDealerService {


  start_test = 0;

  current_test : Routes;

  constructor() {}
  
  public step_tests() {
    start_test++;
  }

  public begin_core_test() {
    //Starting testing
  }

}
