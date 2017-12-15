import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

export class GeneralDetails {
    testHeading: string = '';
    testInstructions: string = '';
}

export class MatrixDetails {
    headingsLabel : string = '';
    deckLabel : string = '';
}

export class RoadSignScenario {
    roadSignName : string = '';
    scenarioName : string = '';
    scenarioImage : string = '';
    roadSignImage : string = '';
    signXPos : number = 0;
    signYPos : number = 0;
}

export class DotCancellationInstructions {
    // Dot Cancellation Instructions
    general : GeneralDetails = new GeneralDetails();
}

export class CompassDirections {
    // Compass Directions Instructions
    general : GeneralDetails = new GeneralDetails();
    matrix : MatrixDetails = new MatrixDetails();
}

export class CarDirections {
    // Car Directions Instructions
    general : GeneralDetails = new GeneralDetails();
    matrix : MatrixDetails = new MatrixDetails();
}

export class RoadSigns {
    // Road Signs Instructions
    general : GeneralDetails = new GeneralDetails();
    deckLabel : string  = '';
    scenarios : Array<RoadSignScenario> = []
}

export class TrailMaking {
    general : GeneralDetails = new GeneralDetails();
    trailA : Array<string> = [];
    trailB : Array<string> = [];
}


export class LocalePreset {
    public name : string  = '';
    public dotCancellation : DotCancellationInstructions = new DotCancellationInstructions();
    public compassDirections : CompassDirections = new CompassDirections();
    public carDirections : CarDirections = new CarDirections();
    public roadSigns : RoadSigns = new RoadSigns();
    public trailMaking : TrailMaking = new TrailMaking();
}

@Injectable()
export class LocalisationService {

    constructor(private http : HttpClient, private auth : AuthenticationService) { }

    public ROOT : string = 'http://localhost:8080/';
    
    public localePreset : LocalePreset = new LocalePreset();

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
