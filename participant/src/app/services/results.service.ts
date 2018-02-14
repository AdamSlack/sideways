import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {}

  public ROOT : string = 'http://localhost:5000';

  public dotCancellationHasResults : boolean = false;
  public compassDirectionsHasResults : boolean = false;
  public carDirectionsHasResults : boolean = false;
  public roadSignScenariosHasResults : boolean = false;
  public trailMakingHasResults : boolean = false;
  
  public createHeaders(contentType : string = 'application/json') : HttpHeaders {
    let headers = new HttpHeaders();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*')
    return headers;
  }

  public checkTestResults(t_id) : void {
    let url = this.ROOT + '/Test/' + t_id + '/results';
    let headers = this.createHeaders();
    this.http.get(url, {headers : headers}).subscribe((res) => {
      console.log(res);
      if(res['dotCancellationTest']) {
        this.dotCancellationHasResults = true;
      }
      if(res['compassDirectionsTest']) {
        this.compassDirectionsHasResults = true;
      }
      if(res['carDirectionsTest']) {
        this.carDirectionsHasResults = true;
      }
      if(res['roadScenariosTest']) {
        this.roadSignScenariosHasResults = true;
      }
      if(res['trailMakingTest']) {
        this.trailMakingHasResults = true;
      }
    });
  }

  public insertDotCancellationResults(t_id: string, time_taken: number, true_pos: number, false_pos: number, false_neg: number ) {
    let url = this.ROOT + '/Test/' + t_id + '/DotCancellationResult';
    let body = {
      'TimeTaken': time_taken,
      'TruePos': true_pos,
      'falsePos': false_pos,
      'falseNeg': false_neg,
      'TestId' : t_id
    }
    console.log('DOT CANCELLATION RESULTS: ')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }

  public insertCarDirectionResults(t_id: string, time_taken: number, points: number) {
    let url =  this.ROOT +'/Test/results/CarDirections/' + t_id;
    let body = {
      'TimeTaken': time_taken,
      'points': points
    }
    console.log('CAR DIRECTIONS')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }

  public insertCompassDirectionResults(t_id: string, time_taken: number, points: number) {
    let url =  this.ROOT +'/Test/results/CompassDirections/' + t_id;
    let body = {
      'TimeTaken': time_taken,
      'points': points
    }
    console.log('COMPASS DIRECTIONS: ')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }

  public insertRoadScenarioResults(t_id: string, time_taken: number, points: number) {
    let url =  this.ROOT + '/Test/results/RoadScenarios/'+ t_id;
    let body = {
      'TimeTaken': time_taken,
      'points': points
    }
    console.log('ROAD SCENARIOS: ')    
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }

  public insertTrailMaking(t_id: string, time_taken: number, mistakes: number) {
    let url =  this.ROOT + '/Test/' + t_id + '/results/trail_making';
    
    let body = {
      'TimeTaken': time_taken,
      'Mistakes': mistakes,
      'TestId' : t_id
    }

    console.log('TRAIL MAKING: ');
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }
   

  public insertInteractionLogs(testID : string, testType : number, interactionLog : string) : Observable<{message : string }>{
    let url = this.ROOT + '/Test/Interaction/' + testID + '/' + testType;
    let body = {
      'TestId' : testID,
      'TestType' : testType,
      'Interaction' : interactionLog
    };

    console.log('Requesting Json Log be inserted into the SDSA System - TestID: ' + testID + ' - TestType: ' + testType);
    console.log('JSON Log String being inserted into the server is :');
    console.log(interactionLog);

    let headers = this.createHeaders();
    return this.http.post<{message : string}>(url, body, {headers:headers});
  }

}
