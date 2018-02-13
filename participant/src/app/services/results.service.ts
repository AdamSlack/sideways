import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {}

  public ROOT : string = 'http://localhost:5000/Test/';
  
  public createHeaders(contentType : string = 'application/json') : HttpHeaders {
    let headers = new HttpHeaders();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*')
    return headers;
  }

  public insertDotCancellationResults(p_id: string, time_taken: number, true_pos: number, false_pos: number, false_neg: number ) {
    let url =  this.ROOT + p_id + '/results/dot_cancellation';
    let body = {
      'TimeTaken': time_taken,
      'TruePos': true_pos,
      'falsePos': false_pos,
      'falseNeg': false_neg,
     // 'TestId' : t_id
    }
    console.log('DOT CANCELLATION RESULTS: ')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }

  public insertCarDirectionResults(p_id: string, time_taken: number, points: number) {
    let url =  this.ROOT + p_id + '/results/car_directions';
    let body = {
      'time_taken': time_taken,
      'points': points
    }
    console.log('CAR DIRECTIONS')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }

  public insertCompassDirectionResults(p_id: string, time_taken: number, points: number) {
    let url =  this.ROOT + p_id + "/" +  "CompassDirectionResult" ;
    let body = {
      'time_taken': time_taken,
      'points': points
    }
    console.log('COMPASS DIRECTIONS: ')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }

  public insertRoadScenarioResults(p_id: string, time_taken: number, points: number) {
    let url =  this.ROOT + p_id + '/results/road_scenarios';
    let body = {
      'time_taken': time_taken,
      'points': points
    }
    console.log('ROAD SCENARIOS: ')    
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }

  public insertTrailMaking(p_id: string, time_taken: number, mistakes: number) {
    let url =  this.ROOT + p_id + '/results/road_scenarios';
    
    let body = {
      'TimeTaken': time_taken,
      'Mistakes': mistakes
    }

    console.log('TRAIL MAKING: ')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }
   

  public insertInteractionLogs(testID : number, testType : number, interactionLog : string) : Observable<{message : string }>{
    let url = this.ROOT + 'Test/Interaction/' + testID + '/' + testType;
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
