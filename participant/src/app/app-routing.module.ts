import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



// Tests
import { DotCancellationTestComponent } from './components/dot-cancellation-test/dot-cancellation-test.component';
import { CarDirectionsTestComponent } from './components/car-directions-test/car-directions-test.component';
import { CompassDirectionsTestComponent } from './components/compass-directions-test/compass-directions-test.component';
import { RoadScenariosTestComponent } from './components/road-scenarios-test/road-scenarios-test.component';
import { TrailMakingTestComponent } from './components/trail-making-test/trail-making-test.component';

export const test_game_routes : Routes = [{
  path:'test/dot_cancellation', component: DotCancellationTestComponent
}, {
  path:'test/car_directions', component: CarDirectionsTestComponent
}, {
  path:'test/compass_directions', component: CompassDirectionsTestComponent
}, {
  path:'test/road_scenarios', component: RoadScenariosTestComponent
}, {
  path:'test/trail_making', component: TrailMakingTestComponent
}]

// const GenericTestRoute =[{
//   { path: 'test/:test_id', component:  },
// }]

//TODO: default route?
//path: '', redirectTo: '/', pathMatch: 'full'
//Create the desired routeing
export const all_routes: Routes = test_game_routes;

@NgModule({
  imports: [ RouterModule.forRoot(all_routes) ],  
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
