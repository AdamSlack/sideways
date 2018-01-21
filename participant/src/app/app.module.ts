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
import { LoginScreenComponent } from './components/login-screen/login-screen.component';

// services
import { ResultsService } from './services/results.service';
import { RecordTimingService } from './services/record-timing.service';
import { FabricService } from './services/fabric.service';
import { AppRoutingModule } from './/app-routing.module';


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
    FormsModule,
    AppRoutingModule,
  ],

  providers: [ResultsService,RecordTimingService, FabricService],
  bootstrap: [AppComponent]
})
export class AppModule { }
