import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

export class GeneralDetails {
    testHeading: string;
    testInstructions: string;
}

export class MatrixDetails {
    headingsLabel : string;
    deckLabel : string;
}

export class RoadSignScenario {
    roadSignName : string;
    scenarioName : string;
    scenarioImage : string;
    roadSignImage : string
    signXPos : number;
    signYPos : number;
}

export class DotCancellationInstructions {
    // Dot Cancellation Instructions
    general : GeneralDetails;
}

export class CompassDirections {
    // Compass Directions Instructions
    general : GeneralDetails;
    matrix : MatrixDetails;
}

export class CarDirections {
    // Car Directions Instructions
    general : GeneralDetails;
    matrix : MatrixDetails;
}

export class RoadSigns {
    // Road Signs Instructions
    general : GeneralDetails;
    deckLabel : string;
    scenarios : Array<RoadSignScenario>
}

export class TrailMaking {
    general : GeneralDetails;
    trailA : Array<string>;
    trailB : Array<string>;
}


export class LocalePreset {
    public name : string;
    public dotCancellation : DotCancellationInstructions;
    public compassDirections : CompassDirections;
    public carDirections : CarDirections;
    public roadSigns : RoadSigns;
    public trailMaking : TrailMaking;
}

@Injectable()
export class LocalisationService {

    constructor(private http : HttpClient, private auth : AuthenticationService) { }

    public ROOT : string = 'http://localhost:8080/';
    
    public localePreset : LocalePreset;

    public createHeaders() {
        return {
            headers: new HttpHeaders().set('Authorization', 'my-auth-token')
        }
    }

    public requestLocaleSetup(locale : string, localeData : LocalePreset) : Observable<any> {
        let url = this.ROOT + 'localisation/';
        let headers = this.createHeaders();
        return this.http.post(url, '');        
    }

    
    
}
