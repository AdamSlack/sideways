import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {


  public p_id : string;

  constructor() { }

  public connectToSDSA(){
    console.log('Participant ID: ' + this.p_id);
  }

  ngOnInit() {

  }

}
