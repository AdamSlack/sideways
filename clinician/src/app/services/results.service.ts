import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {}

  public ROOT : string = 'http://localhost:5000';
  
  public createHeaders() : HttpHeaders {
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.set('Access-Control-Allow-Origin', '*')
      return headers;
    }

    
  }
