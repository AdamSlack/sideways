import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {


  // PLACE HOLDERS
  public pt_id : string;
  public password : string;
  public clinicianEmail : string;

  constructor(public auth : AuthenticationService) { }

  public connectToSDSA(){
    this.auth.PARTICIPANT_TEST_ID = this.pt_id;
    this.auth.requestToken(this.clinicianEmail, this.password);
    this.auth.requestParticipantTestPresetName(this.pt_id);
  }

  ngOnInit() {

  }

}
