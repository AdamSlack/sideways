import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { StudyInitComponent } from './study-init/study-init.component';
import { ParticipantService } from './services/participant.service';
import { InitialisationService } from './services/initialisation.service';


@NgModule({
  declarations: [
    AppComponent,
    StudyInitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule  ],
  providers: [ParticipantService, InitialisationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
