import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { StudyInitComponent } from './study-init/study-init.component';
import { ParticipantService } from './services/participant.service';
import { InitialisationService } from './services/initialisation.service';
import { HomePageComponent } from './home-page/home-page.component';
import { ResultsViewerComponent } from './results-viewer/results-viewer.component';
import { LocalisationCreatorComponent } from './localisation-creator/localisation-creator.component';
import { AuthenticationService } from './services/authentication.service';
import { LocalisationService } from './services/localisation.service';
import { ResultsService } from './services/results.service';


@NgModule({
  declarations: [
    AppComponent,
    StudyInitComponent,
    HomePageComponent,
    ResultsViewerComponent,
    LocalisationCreatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ParticipantService,
    InitialisationService,
    LocalisationService,
    AuthenticationService,
    ResultsService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
