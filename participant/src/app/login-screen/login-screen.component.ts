import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {


  // PLACE HOLDERS
  public p_id : string;
  public password : string;
  public c_id : string;

  constructor() { }

  public connectToSDSA(){
    console.log('Participant ID: ' + this.p_id);
    console.log('Password:' + this.password)
    console.log('Clinician ID: ' + this.c_id);
  }

  ngOnInit() {

  }

}
