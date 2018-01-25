
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AssetRetrievalService {

  constructor(private http : HttpClient, private auth : AuthenticationService) { }

  public ROOT : string = 'http://localhost:5000';
  
  public createHeaders() : HttpHeaders {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*')
    return headers;
  }

  public selectLocalisationDetails(testType : number, localeName : string) : Observable<any> {
    let url = this.ROOT + '/Localisation/' + localeName + '/' + testType.toString();
    let headers = this.createHeaders();
    return this.http.get(url, {headers : headers});
  }

  public selectDotCancellationDetails(localeName : string) : Observable<any>{
    return this.selectLocalisationDetails(1, localeName);
  }

  public selectCompassDirectionDetails(localeName : string) : Observable<any>{
    return this.selectLocalisationDetails(2, localeName);
  }

  public selectcarDirectionDetails(localeName : string) : Observable<any>{
    return this.selectLocalisationDetails(3, localeName);
  }

  public selectRoadSignScenarioDetails(localeName : string) : Observable<any>{
    return this.selectLocalisationDetails(4, localeName);
  }

  public selectTrailMakingDetails(localeName : string) : Observable<any>{
    return this.selectLocalisationDetails(5, localeName);
  }
}
