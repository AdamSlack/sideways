import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Authentication } from './authentication.service';

export class DotCancellationInstructions {
    // Dot Cancellation Instructions
}

export class CompassDirections {
    // Compass Directions Instructions
}

export class CarDirections {
    // Car Directions Instructions
}

export class RoadSigns {
    // Road Signs Instructions
}

export class TrailMaking {
    
}


export class LocalePreset {
    public name : string
    public dotCancellation : DotCancellationInstructions;
    public compassDirections : CompassDirections;
    public carDirections : CarDirections;
    public roadSigns : RoadSigns;
}

@Injectable()
export class LocalisationService {

    constructor(private http : HttpClient, private auth : Authentication) { }

    public ROOT : string = 'http://localhost:8080/';
    
    public createHeaders() {
        return {
            headers: new HttpHeaders().set('Authorization', 'my-auth-token')
        }
    }

    public requestLocaleSetup(locale : string,  ) : Observable<any> {
        let url = this.ROOT + 'localisation/';
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
