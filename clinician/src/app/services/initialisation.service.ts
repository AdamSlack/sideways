import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InitialisationService {

    constructor(private http: HttpClient) {}

    public ROOT : string = 'http://localhost:5000';
    
    public createHeaders() : HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.set('Access-Control-Allow-Origin', '*')
        return headers;
      }

    public fetchTestOptions() : Observable<any> {
        let url =  this.ROOT + '/tests';

        console.log('Test Option Requests')
        
        let headers = this.createHeaders();
        return this.http.get(url);
    }

    public fetchLocalisationOption() : Observable<any> {
        let url =  this.ROOT + '/Localisation';

        console.log('Locale Options Requests')
        
        let headers = this.createHeaders();
        return this.http.get(url);
    }

    public requestParticipantInit() : Observable<any> {
        let url =  this.ROOT + '/Participant/Create';

        let headers = this.createHeaders();
        let body = JSON.stringify({});
        return this.http.post(url,body,{headers:headers});
    }
    
    public requestStudyInit(p_id : number, c_id : number, locale_name : string) : Observable<any> {
        let url =  this.ROOT + '/Participant/Create/Test';
        let headers = this.createHeaders();

        let body = {
            'ParticipantId' : p_id,
            'ClinicianId' : c_id,
            'LocalePreset' : locale_name
        };

        console.log(url);
        console.log(body);

        return this.http.post(url, body, {headers : headers});

    }

}

