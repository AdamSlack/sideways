import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {}

  public ROOT : string = 'http://localhost:5000/';
  
  public createHeaders(contentType : string = 'application/json') : HttpHeaders {
    let headers = new HttpHeaders();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*')
    return headers;
  }

  public insertDotCancellationResults(t_id: number, time_taken: number, true_pos: number, false_pos: number, false_neg: number ) {
    let url =  this.ROOT + "Test/" +t_id + '/DotCancellationResult';
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

    //[HttpPost("[controller]/{TestId}/DotCancellationInteractionLogs")]
  public insertDotCancellationInteractionLogs(t_id: number, interaction: string ) {
    let url =  this.ROOT  +t_id + '/DotCancellationInteractionLogs';
    let body = {
      'TestId': t_id,
      'Interaction': interaction
    }
    console.log('DOT CANCELLATION INTERACTION LOGS: ')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }


  public insertCarDirectionResults(p_id: number, time_taken: number, points: number) {
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

  public insertCompassDirectionResults(p_id: number, time_taken: number, points: number) {
    let url =  this.ROOT + p_id + '/results/compass_directions';
    let body = {
      'time_taken': time_taken,
      'points': points
    }
    console.log('COMPASS DIRECTIONS: ')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }

  public insertRoadScenarioResults(p_id: number, time_taken: number, points: number) {
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

  public insertTrailMaking(p_id: number, time_taken: number, mistakes: number) {
    console.log("Sending: ", time_taken, mistakes);
    let url =  this.ROOT + 'Test/' + p_id + '/results/trail_making';
    
    let body = {
      'TimeTaken': time_taken,
      'Mistakes': mistakes
    }

    console.log('TRAIL MAKING: ')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, {headers:headers}).subscribe();
  }
   
}
