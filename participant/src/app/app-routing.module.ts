import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



// Tests
import { DotCancellationTestComponent } from './components/dot-cancellation-test/dot-cancellation-test.component';
import { CarDirectionsTestComponent } from './components/car-directions-test/car-directions-test.component';
import { CompassDirectionsTestComponent } from './components/compass-directions-test/compass-directions-test.component';
import { RoadScenariosTestComponent } from './components/road-scenarios-test/road-scenarios-test.component';
import { TrailMakingTestComponent } from './components/trail-making-test/trail-making-test.component';

const TestRoutes = [{
  path:'dot_cancellation', component: DotCancellationTestComponent
}, {
  path:'car_directions', component: CarDirectionsTestComponent
}, {
  path:'compass_directions', component: CompassDirectionsTestComponent
}, {
  path:'road_scenarios', component: RoadScenariosTestComponent
}, {
  path:'trail_making', component: TrailMakingTestComponent
}]

// const GenericTestRoute =[{
//   { path: 'test/:test_id', component:  },
// }]

//TODO: default route?
//path: '', redirectTo: '/', pathMatch: 'full'
//Create the desired routeing
const routes: Routes = TestRoutes;

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],  
  exports: [ RouterModule ],
})
export class AppRoutingModule { }


