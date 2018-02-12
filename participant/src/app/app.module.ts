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
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService } from './services/authentication.service';
import { AssetRetrievalService } from './services/asset-retrieval.service';
import { RouterModule } from '@angular/router/src/router_module';


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
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ResultsService,RecordTimingService,AuthenticationService, FabricService, AssetRetrievalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
