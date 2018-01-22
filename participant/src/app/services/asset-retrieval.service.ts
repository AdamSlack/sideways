
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class AssetRetrievalService {

  constructor(private http: HttpClient) {}
  
    public ROOT : string = 'http://localhost:8080/';
    
    public createHeaders() : HttpHeaders {
      let headers = new HttpHeaders();
      // headers.set('Content-Type', 'application/json');
      headers.set('Access-Control-Allow-Origin', '*')
      return headers;
    }

    public fetchInstructions(localisation: string, testName: string) {
      let url = this.ROOT + '/localisation/' + localisation + '/' + testName + '/instructions';
      console.log('Test Name: ' + testName);
      console.log('Localisation Preset: ' + localisation);
      let headers = this.createHeaders();

      this.http.get(url, {headers : headers});
    }
}
