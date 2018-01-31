import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { test_game_routes } from '../../app-routing.module';
import { TestDealerService } from '../../services/test-dealer.service';


@Component({
  selector: 'app-assessment-manager',
  templateUrl: './assessment-manager.component.html',
  styleUrls: ['./assessment-manager.component.css']
})
export class AssessmentManagerComponent implements OnInit {

  public dealer : TestDealerService;
  
  constructor(private _router: Router, private test_dealer : TestDealerService) { 
    this.dealer = test_dealer;
    console.log("Current route: ", _router.url)
    console.log("First test: ", this.dealer.current_test);
  }

  ngOnInit() {
  }

}
