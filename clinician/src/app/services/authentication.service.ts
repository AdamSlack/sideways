import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable()
export class AuthenticationService {

  public AUTH_TOKEN : string = '';
  public VALIDATED : boolean = false;
  public CLINICIAN_ID : string = '';

  constructor(private http: HttpClient) {}
  
  public ROOT : string = 'http://localhost:5000/';
  
  public createHeaders() : HttpHeaders {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
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
      }
      if (res['token']) {
        this.AUTH_TOKEN = res['token'];
        this.VALIDATED = true;
        this.CLINICIAN_ID = res['clinician_id'];
      }
    });
  }

}
