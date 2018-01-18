import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InitialisationService {

    constructor(private http: HttpClient) {}

    public ROOT : string = 'http://localhost:8080/';
    
    public createHeaders() {
        return {
            headers: new HttpHeaders().set('Authorization', 'my-auth-token')
        }
    }

    public fetchTestOptions() : Observable<any> {
        let url =  this.ROOT + '/tests';

        console.log('Test Option Requests')
        
        let headers = this.createHeaders();
        return this.http.get(url);
    }

    public fetchLocalisationOption() : Observable<any> {
        let url =  this.ROOT + '/localisation';

        console.log('Locale Options Requests')
        
        let headers = this.createHeaders();
        return this.http.get(url);
    }

    public requestStudyInit(p_id : string, locale: string, test: string ) : Observable<any> {
        let url = this.ROOT + 'tests/' + test + '/localisation/' + locale + '/participant/';
        if(p_id) {
            url += p_id;
        }
        if (locale && test){
            console.log('Requesting Test be made: ' + url)
            let headers = this.createHeaders()
            return this.http.post(url, '');
        }
        console.log('you messed up... ');
    }

}

