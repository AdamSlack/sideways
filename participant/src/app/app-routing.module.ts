import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DotCancellationTestComponent } from './components/dot-cancellation-test/dot-cancellation-test.component';
import { CarDirectionsTestComponent } from './components/car-directions-test/car-directions-test.component';
import { CompassDirectionsTestComponent } from './components/compass-directions-test/compass-directions-test.component';
import { RoadScenariosTestComponent } from './components/road-scenarios-test/road-scenarios-test.component';
import { TrailMakingTestComponent } from './components/trail-making-test/trail-making-test.component';
import { HomeSelectionComponent } from './components/home-selection/home-selection.component';
import { AssessmentManagerComponent } from './components/assessment-manager/assessment-manager.component'

import { Route } from '@angular/compiler/src/core';

export const test_game_routes : Routes = [{
  path:'test/dot_cancellation', component: DotCancellationTestComponent
}, {
  path:'test/car_directions', component: CarDirectionsTestComponent
}, {
  path:'test/compass_directions', component: CompassDirectionsTestComponent
}, {
  path:'test/road_scenarios', component: RoadScenariosTestComponent
}
]

export const home_route : Routes = [ 
  {path:'home/', component: HomeSelectionComponent}
]

export const trail_making_route : Routes = [ 
  {  path:'test/trail_making', component: TrailMakingTestComponent}
]

export const assessment_manager : Routes = [ 
  {  path:'test/home', component: AssessmentManagerComponent}
]

// const GenericTestRoute =[{
//   { path: 'test/:test_id', component:  },
// }]

//TODO: default route?
//path: '', redirectTo: '/', pathMatch: 'full'
//Create the desired routeing

//Lol the cat
export const all_routes: Routes = test_game_routes.concat(home_route).concat(trail_making_route).concat(assessment_manager);

@NgModule({
  imports: [ RouterModule.forRoot(all_routes) ],  
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
