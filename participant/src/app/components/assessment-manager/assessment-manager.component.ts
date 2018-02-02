import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Route } from '@angular/router/src/config';
import { Router } from '@angular/router';
// import { assessmentRouting } from '../../app-routing.module';


@Component({
  selector: 'app-assessment-manager',
  templateUrl: './assessment-manager.component.html',
  styleUrls: ['./assessment-manager.component.css']
})
export class AssessmentManagerComponent implements OnInit {
  

  public router : Router;
  current_test : Route; 
  private base_assessment : Route;
  private tests_length : number;

  constructor(private _router: Router) { 
    this.router = _router;
    console.log("Current route: ",   this.router.url)
    console.log('configured routes: ',   this.router.config[2]); 

    this.base_assessment =   this.router.config[2];
    // this.tests_length = this.base_assessment.children.length;
    // this.current_test = this.base_assessment.children[0];

    // .children.forEach(element => {
    //   console.log(element.path);
    //   this.current_test = element;
    // });
    // console.log(assessmentRouting);
  }

  // start_test : number = 0;
  
  // public next_game_tests() {

  //   this.start_test += 1;
  //   console.log("Next test: ",this.current_test.path);
    
  //   this.router.navigate([ '/test', this.current_test.path]);

  // }

  ngOnInit() {
  }

}
