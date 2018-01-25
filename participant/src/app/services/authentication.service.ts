import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable()
export class AuthenticationService {
  
  public VALIDATED : boolean = false;
  public VALIDATION_FAILED : boolean = false;

  public CLINICIAN_ID : string = '';
  
  public PARTICIPANT_TEST_ID : string = '';
  public PARTICIPANT_TEST_LOCALE : string = '';

  public AUTH_TOKEN : string = '';

  constructor(private http: HttpClient) {}
  
  public ROOT : string = 'http://localhost:5000/';
  
  public createHeaders(contentType : string = 'application/json') : HttpHeaders {
    let headers = new HttpHeaders();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*')
    return headers;
  }

  public requestToken(email:string, password:string) : Subscription {
    let url : string = this.ROOT + 'login';
    let headers = this.createHeaders();
    let body = {
      'Email' : email,
      'Password' : password,
      'UserType' : 1
    };
    return this.http.post(url,body,{headers : headers}).subscribe((res) => {
      if (res['message']) {
        this.VALIDATED = false;
        this.VALIDATION_FAILED = true;
      }
      if (res['token']) {
        this.AUTH_TOKEN = res['token'];
        this.CLINICIAN_ID = res['clinician_id'];
        this.VALIDATED = true;
        this.VALIDATION_FAILED = false;        
      }
    });
  }
  public requestParticipantTestPresetName() : Subscription {
    // This URL is not Correct, need to implement something server side... check back later.
    let url : string = this.ROOT + '/participant/' + this.PARTICIPANT_TEST_ID;
    let headers = this.createHeaders();
    return this.http.get(url, {headers : headers}).subscribe((res) => {
      if(res['PresetName']) {
        this.PARTICIPANT_TEST_LOCALE = res['PresetName'];
        console.log('The selected localisation preset for this participant\'s test is: ' + res['PresetName']);
      }
      else {
        this.PARTICIPANT_TEST_LOCALE = '';
        console.log('No Preset Name Present in HTTP Response...');
      }
    })
  }

}
