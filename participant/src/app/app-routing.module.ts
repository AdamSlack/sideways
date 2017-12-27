import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



// Tests
import { DotCancellationTestComponent } from './dot-cancellation-test/dot-cancellation-test.component';
import { CarDirectionsTestComponent } from './car-directions-test/car-directions-test.component';
import { CompassDirectionsTestComponent } from './compass-directions-test/compass-directions-test.component';
import { RoadScenariosTestComponent } from './road-scenarios-test/road-scenarios-test.component';
import { TrailMakingTestComponent } from './trail-making-test/trail-making-test.component';

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

const GenericTestRoute = [{
  { path: 'test/:test_id', component: HeroDetailComponent },
  
}]
//TODO: default route?
//path: '', redirectTo: '/', pathMatch: 'full'
//Create the desired routeing
const routes: Routes = TestRoutes;

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],  
  exports: [ RouterModule ],
})
export class AppRoutingModule { }


