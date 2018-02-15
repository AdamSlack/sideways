
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RecordTimingService } from './record-timing.service';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';


@Injectable()
export class AuthenticationService {
  
  public VALIDATED : boolean = false;
  public VALIDATION_FAILED : boolean = false;

  public CLINICIAN_ID : string = '';
  
  public PARTICIPANT_TEST_ID : string = '';
  public PARTICIPANT_TEST_LOCALE : string = '';

  public AUTH_TOKEN : string = '';

  constructor(private http: HttpClient, public timer : RecordTimingService) {}
  
  public ROOT : string = 'http://localhost:5000';

  public timerSubscription : Subscription ;
  public authSubscription : Subscription ;

  public createHeaders(contentType : string = 'application/json') : HttpHeaders {
    let headers = new HttpHeaders();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*')
    return headers;
  }

  public requestToken(email:string, password:string) : Subscription {
    let url : string = this.ROOT + '/login';
    let headers = this.createHeaders();
    let body = {
      'Email' : email,
      'Password' : password,
      'UserType' : 1
    };

    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    this.authSubscription =  this.http.post(url,body,{headers : headers}).subscribe((res) => {
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
    },
    (err) => {
      alert('Please check your login details are correct');
    });
    return this.authSubscription;
  }

  public startTimeoutPeriod() : Observable<number>{
    let timer = interval(5000);
    let timerSubscription = timer.subscribe((time) => {
      console.log('Time Elapsed: ' + time);
      if(
        this.AUTH_TOKEN != '' &&
        this.PARTICIPANT_TEST_LOCALE != '' &&
        !this.VALIDATION_FAILED &&
        this.VALIDATED
      ) {
        console.log('Timer All Good.');
        timerSubscription.unsubscribe();
      }
      else {
        if(this.authSubscription) {
          this.authSubscription.unsubscribe();
        }
        if (this.AUTH_TOKEN == '' && this.VALIDATED) {
          alert('Please check you have the correct Test ID');          
        }
        this.AUTH_TOKEN = '';
        this.PARTICIPANT_TEST_ID = '';
        this.PARTICIPANT_TEST_LOCALE = '';
        this.VALIDATED = false;
        this.VALIDATION_FAILED = true;
        timerSubscription.unsubscribe();
      }
      
    });
    return timer;
  }

  public requestParticipantTestPresetName(participantTestID : string = this.PARTICIPANT_TEST_ID) : Observable<any> {
    // This URL is not Correct, need to implement something server side... check back later.
    let url : string = this.ROOT + '/Test/participant/' + participantTestID;
    let headers = this.createHeaders();

    return this.http.get(url, {headers : headers})
  }

}
