import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

// Components
import { AppComponent } from './app.component';
import { TestInstructionsComponent } from './components/test-instructions/test-instructions.component';
import { DotCancellationTestComponent } from './components/dot-cancellation-test/dot-cancellation-test.component';
import { CarDirectionsTestComponent } from './components/car-directions-test/car-directions-test.component';
import { CompassDirectionsTestComponent } from './components/compass-directions-test/compass-directions-test.component';
import { RoadScenariosTestComponent } from './components/road-scenarios-test/road-scenarios-test.component';
import { TrailMakingTestComponent } from './components/trail-making-test/trail-making-test.component';

import { HomeSelectionComponent } from './components/home-selection/home-selection.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { AssessmentManagerComponent } from './components/assessment-manager/assessment-manager.component';



import { BoardComponent} from './components/dot-cancellation-test/presentation/board/board.component';
import { CellComponent} from './components/dot-cancellation-test/presentation/cell/cell.component';


// services
import { ResultsService } from './services/results.service';
import { RecordTimingService } from './services/record-timing.service';
import { FabricService } from './services/fabric.service';

import { AuthenticationService } from './services/authentication.service';
import { AssetRetrievalService } from './services/asset-retrieval.service';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'home', component: HomeSelectionComponent },
  { path: 'dotCancellation',component: DotCancellationTestComponent },
  { path: 'carDirections',component: CarDirectionsTestComponent },
  { path: 'compassDirections',component: CompassDirectionsTestComponent },
  { path: 'roadSignScenarios', component: RoadScenariosTestComponent },
  { path: 'trailMaking', component: TrailMakingTestComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeSelectionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeSelectionComponent,
    AssessmentManagerComponent,
    TestInstructionsComponent,
    DotCancellationTestComponent,
    CarDirectionsTestComponent,
    CompassDirectionsTestComponent,
    RoadScenariosTestComponent,
    TrailMakingTestComponent,
    LoginScreenComponent,
	CellComponent,
	BoardComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // For Debugging.
    )
  ],
  providers: [
    ResultsService,
    RecordTimingService,
    AuthenticationService,
    FabricService,
    AssetRetrievalService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
