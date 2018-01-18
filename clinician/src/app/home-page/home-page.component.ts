import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  public optionSelected : boolean = false;
  public initialisationSelected : boolean = false;
  public viewResultsSelected : boolean = false;
  public localisationCreatorSelected : boolean = false;

  public pageTitle: string = 'SDSA Home Page';

  public email : string = "";
  public password : string = "";
  //
  //  Should use Routing... TODO later...
  //

  constructor(public authService : AuthenticationService) { }

  public login() {
    this.authService.requestToken(this.email, this.password);
  }

  public resetSelection() {
    // Toggle all options off
    this.optionSelected = false;
    this.initialisationSelected = false;
    this.viewResultsSelected = false;
    this.localisationCreatorSelected = false;    
    this.pageTitle = 'SDSA Home Page';    
    
  }

  public selectInitialisation() {
    // toggle selection of study initialisation screen
    this.initialisationSelected = true;
    this.optionSelected = true
    this.pageTitle = 'Study Initialisation';    
  }

  public selectViewResults() {
    // toggle selection of results viewing screen.
    this.viewResultsSelected = true;
    this.optionSelected = true    
    this.pageTitle = 'View Results';
  }

  public selectLocalisationCreator() {
    this.localisationCreatorSelected = true;
    this.optionSelected = true;
    this.pageTitle = 'Localisation Preset'
  }


  ngOnInit() {
  }

}
