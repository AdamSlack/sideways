import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service'; 
import { Observable } from 'rxjs/Observable';
import { RoadSignScenario } from './localisation.service';

@Injectable()
export class ParticipantService {

  constructor(
    public auth : AuthenticationService,
    public http : HttpClient  
  ) { }

  public requestClinicianParticipant() : Observable<{participants : Array<number>}> {
    let url = this.auth.ROOT + 'Participant/clinician/' + this.auth.CLINICIAN_ID;
    console.log(url);
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

  public requestTestResults( t_id : number ) : Observable<{
    dotCancellationTest : {testId : number, timeTaken : number, truePos : number, falsePos : number, falseNeg : number},
    compassDirectionsTest : {testId : number, timeTaken : number, points : number},
    carDirectionsTest : {testId : number, timeTaken : number, points : number},
    roadScenariosTest : {testId : number, timeTaken : number, points : number},
    trailMakingTest : {testId : number, timeTaken : number, mistakes : number}
  }>{
    let url = this.auth.ROOT + 'Test/' + t_id + '/results';
    return this.http.get<any>(url);
  }

  public requestAlgorithms() : Observable<{algorithms : [{algorithmId : number, clinicianId: number, algorithmName : string}]}> {
    let url = this.auth.ROOT + 'Test/algorithms'
    return this.http.get<any>(url);
  }

  public requestAlgorithmScore( tid : number, aid : number ) : Observable<{
    testId : number,
    algorithmId : number,
    r1 : number,
    r2 : number,
    passed : boolean,
    components : boolean,
    error : number,
    message : string,
    resultJson : string    
  }>{
    let url = this.auth.ROOT + 'Test/' + tid + '/algorithm/' + aid;
    console.log(url);
    return this.http.get<any>(url);
  }

}
