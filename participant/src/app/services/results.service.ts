import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {}

  public ROOT : string = 'http://localhost:8080';
  
  public createHeaders() {
    return {
      headers: new HttpHeaders().set('Authorization', 'my-auth-token')
    }
  }

  public insertDotCancellationResults(p_id: number, time_taken: number, true_pos: number, false_pos: number, false_neg: number ) {
    let url =  this.ROOT + p_id + '/results/dot_cancellation';

    console.log('participant ID: ' + p_id);
    console.log('time taken: ' + time_taken);
    console.log('true pos: ' + true_pos);
    console.log('false pos: ' + false_pos);
    console.log('fasle neg: ' + false_neg);

    let body = {
      'time_taken': time_taken,
      'true_pos': true_pos,
      'false_pos': false_pos,
      'false_neg': false_neg
    }

    let headers = this.createHeaders();

    this.http.post(url, body, headers);
  }

  public insertCarDirectionResults(p_id: number, time_taken: number, points: number) {
    let url =  this.ROOT + p_id + '/results/car_directions';

    console.log('participant ID: ' + p_id);
    console.log('time taken: ' + time_taken);
    console.log('points: ' + points);


    let body = {
      'time_taken': time_taken,
      'points': points
    }

    let headers = this.createHeaders();

    this.http.post(url, body, headers);
  }

  public insertCompassDirectionResults(p_id: number, time_taken: number, points: number) {
    let url =  this.ROOT + p_id + '/results/compass_directions';

    console.log('participant ID: ' + p_id);
    console.log('time taken: ' + time_taken);
    console.log('points: ' + points);


    let body = {
      'time_taken': time_taken,
      'points': points
    }

    let headers = this.createHeaders();

    this.http.post(url, body, headers);
  }

  public insertRoadScenarioResults(p_id: number, time_taken: number, points: number) {
    let url =  this.ROOT + p_id + '/results/road_scenarios';

    console.log('participant ID: ' + p_id);
    console.log('time taken: ' + time_taken);
    console.log('points: ' + points);


    let body = {
      'time_taken': time_taken,
      'points': points
    }

    let headers = this.createHeaders();

    this.http.post(url, body, headers);
  }

  public insertTrailMaking(p_id: number, time_taken: number, mistakes: number) {
    let url =  this.ROOT + p_id + '/results/road_scenarios';

    console.log('participant ID: ' + p_id);
    console.log('time taken: ' + time_taken);
    console.log('mistakes: ' + mistakes);


    let body = {
      'time_taken': time_taken,
      'mistakes': mistakes
    }

    let headers = this.createHeaders();

    this.http.post(url, body, headers);
  }
   
}
