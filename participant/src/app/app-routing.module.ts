import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DotCancellationTestComponent } from './components/dot-cancellation-test/dot-cancellation-test.component';
import { CarDirectionsTestComponent } from './components/car-directions-test/car-directions-test.component';
import { CompassDirectionsTestComponent } from './components/compass-directions-test/compass-directions-test.component';
import { RoadScenariosTestComponent } from './components/road-scenarios-test/road-scenarios-test.component';
import { TrailMakingTestComponent } from './components/trail-making-test/trail-making-test.component';
import { HomeSelectionComponent } from './components/home-selection/home-selection.component';
import { AssessmentManagerComponent } from './components/assessment-manager/assessment-manager.component'
import { LoginScreenComponent } from './components/login-screen/login-screen.component'


import { Route } from '@angular/compiler/src/core';


export const login : Routes = [ 
  {  path:'login', component: LoginScreenComponent}
]

export const home_route : Routes = [ 
  {  path:'home', component: HomeSelectionComponent}
]


export const trail_making_route : Routes = [ 
  {  path:'trail_making', component: TrailMakingTestComponent}
]

export const test_game_routes : Routes = [{
  path:'dot_cancellation', component: DotCancellationTestComponent
}, {
  path:'car_directions', component: CarDirectionsTestComponent
}, {
  path:'compass_directions', component: CompassDirectionsTestComponent
}, {
  path:'road_scenarios', component: RoadScenariosTestComponent
}]

export const assessment_manager : Routes = [ 
  {  path:'test', component: AssessmentManagerComponent,  children: test_game_routes}
]



// export const re_routing : Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' }
// ]

//Lol the cat
export const all_routes: Routes = 
login
.concat(home_route)
.concat(assessment_manager)
.concat(trail_making_route)
.concat(test_game_routes)
// .concat(re_routing);

@NgModule({
  imports: [ RouterModule.forRoot(all_routes) ],  
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
