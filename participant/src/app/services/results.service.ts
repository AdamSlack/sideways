import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {}

  public ROOT : string = 'http://localhost:5000/';
  
  public createHeaders() {
    return {
      headers: new HttpHeaders().set('Authorization', 'my-auth-token')
    }
  }

  public insertDotCancellationResults(p_id: number, time_taken: number, true_pos: number, false_pos: number, false_neg: number ) {
    let url =  this.ROOT + p_id + '/results/dot_cancellation';
    let body = {
      'time_taken': time_taken,
      'true_pos': true_pos,
      'false_pos': false_pos,
      'false_neg': false_neg
    }
    console.log('DOT CANCELLATION RESULTS: ')
    console.log(body);
    
    let headers = this.createHeaders();

    this.http.post(url, body, headers).subscribe();
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

    this.http.post(url, body, headers).subscribe();
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

    this.http.post(url, body, headers).subscribe();
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

    this.http.post(url, body, headers).subscribe();
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

    this.http.post(url, body, headers).subscribe();
  }
   
}
