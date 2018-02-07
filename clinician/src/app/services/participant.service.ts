import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParticipantService {

  constructor(
    public auth : AuthenticationService,
    public http : HttpClient  
  ) { }

  public requestClinicianParticipant() : Observable<{participants : Array<number>}> {
    let url = this.auth.ROOT + 'Participant/clinician/' + this.auth.CLINICIAN_ID;
    let headers = this.auth.createHeaders();
    return this.http.get<any>(url);
  }

  public requestParticipantTests(p_id : number) : Observable<{tests : Array<number>}> {
    let url = this.auth.ROOT + 'Participant/' + p_id + '/Tests';
    return this.http.get<any>(url);
  }
3
  public requestParticipantTestTypes(t_id : number) : Observable<Array<string>> {
    let url = this.auth.ROOT + 'Participant/tests/types/' + t_id;
    return this.http.get<any>(url);
  }

  public requestTestResults(t_id : number, testType : number) {
    let url = this.auth.ROOT + 'Participant/results/' + t_id + '/' +  testType;
    return this.http.get<any>(url);
  }

}
