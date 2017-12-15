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

    public requestLocaleSetup(locale : string, localeData : any) : Observable<any> {
        let url = this.ROOT + 'localisation/';
        let headers = this.createHeaders();
        return this.http.post(url, '');        
    }

    
}
