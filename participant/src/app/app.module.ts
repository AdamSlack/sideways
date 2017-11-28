import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestInstructionsComponent } from './test-instructions/test-instructions.component';
import { DotCancellationTestComponent } from './dot-cancellation-test/dot-cancellation-test.component';
import { CarDirectionsTestComponent } from './car-directions-test/car-directions-test.component';
import { CompassDirectionsTestComponent } from './compass-directions-test/compass-directions-test.component';
import { RoadScenariosTestComponent } from './road-scenarios-test/road-scenarios-test.component';
import { TrailMakingTestComponent } from './trail-making-test/trail-making-test.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    TestInstructionsComponent,
    DotCancellationTestComponent,
    CarDirectionsTestComponent,
    CompassDirectionsTestComponent,
    RoadScenariosTestComponent,
    TrailMakingTestComponent,
    LoginScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
