import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

// Components
import { AppComponent } from './app.component';
import { TestInstructionsComponent } from './test-instructions/test-instructions.component';
import { DotCancellationTestComponent } from './dot-cancellation-test/dot-cancellation-test.component';
import { CarDirectionsTestComponent } from './car-directions-test/car-directions-test.component';
import { CompassDirectionsTestComponent } from './compass-directions-test/compass-directions-test.component';
import { RoadScenariosTestComponent } from './road-scenarios-test/road-scenarios-test.component';
import { TrailMakingTestComponent } from './trail-making-test/trail-making-test.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

// services
import { ResultsService } from './services/results.service';
import { RecordTimingService } from './services/record-timing.service';
import { FabricService } from './services/fabric.service';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    TestInstructionsComponent,
    DotCancellationTestComponent,
    CarDirectionsTestComponent,
    CompassDirectionsTestComponent,
    RoadScenariosTestComponent,
    TrailMakingTestComponent,
    LoginScreenComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [ResultsService,RecordTimingService, FabricService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
