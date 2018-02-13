import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

import { LoginScreenComponent } from './components/login-screen/login-screen.component'

import { AssessmentManagerComponent } from './components/assessment-manager/assessment-manager.component'

import { DotCancellationTestComponent } from './components/dot-cancellation-test/dot-cancellation-test.component';
import { CarDirectionsTestComponent } from './components/car-directions-test/car-directions-test.component';
import { CompassDirectionsTestComponent } from './components/compass-directions-test/compass-directions-test.component';
import { RoadScenariosTestComponent } from './components/road-scenarios-test/road-scenarios-test.component';
import { TrailMakingTestComponent } from './components/trail-making-test/trail-making-test.component';

import { HomeSelectionComponent } from './components/home-selection/home-selection.component';




const login : Routes = [ 
  {  path:'login', component: LoginScreenComponent}
]

const home_route : Routes = [ 
  {  path:'home', component: HomeSelectionComponent}
]

const trail_making_route : Routes = [ 
  {  path:'trail_making', component: TrailMakingTestComponent}
]

const test_game_routes : Routes = [{
  path:'dot_cancellation', component: DotCancellationTestComponent
}, {
  path:'car_directions', component: CarDirectionsTestComponent
}, {
  path:'compass_directions', component: CompassDirectionsTestComponent
}, {
  path:'road_scenarios', component: RoadScenariosTestComponent
}]

 const assessment_manager : Routes = [ 
  {  path:'test', component: AssessmentManagerComponent} //children: test_game_routes
]

 const assessmentRouting: ModuleWithProviders = RouterModule.forChild(assessment_manager);

const re_routing : Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

//Lol the cat
export const appRoutes: Routes = 
login
.concat(home_route)
.concat(assessment_manager)
.concat(test_game_routes)
.concat(trail_making_route)
.concat(re_routing);

export default appRoutes;

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],  
  exports: [
    RouterModule,

  ]
})
export class AppRoutingModule { }
