import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';

export class GeneralDetails {
    public testHeading: string = '';
    public testInstructions: string = '';

    public constructor() {
        this.testHeading = '';
        this.testInstructions = '';
    }
}

export class MatrixDetails {
    public headingsLabel : string = '';
    public deckLabel : string = '';

    public constructor() {
        this.headingsLabel = '';
        this.deckLabel = '';
    }
}
export class Coords {
    
    public x : number;
    public y : number;

    public constructor(x : number = 0, y : number = 0) {
    this.x = x;
    this.y = y;
    }
}
export class RoadSignScenario {
    public roadSignName : string = '';
    public scenarioName : string = '';
    public scenarioImage : string = '';
    public roadSignImage : string = '';
    public signPos : Coords = new Coords();

    public constructor() {
        this.roadSignName = '';
        this.scenarioName = '';
        this.scenarioImage = '';
        this.roadSignImage = '';
        this.signPos = new Coords();
    }
}

export class DotCancellationInstructions {
    // Dot Cancellation Instructions
    public general : GeneralDetails = new GeneralDetails();
    
    public constructor() {
        this.general = new GeneralDetails();
    }
}

export class CompassDirections {
    // Compass Directions Instructions
    public general : GeneralDetails = new GeneralDetails();
    public matrix : MatrixDetails = new MatrixDetails();

    public constructor() {
        this.general = new GeneralDetails();
        this.matrix = new MatrixDetails();
    }
}

export class CarDirections {
    // Car Directions Instructions
    public general : GeneralDetails = new GeneralDetails();
    public matrix : MatrixDetails = new MatrixDetails();
}

export class RoadSigns {
    // Road Signs Instructions
    public general : GeneralDetails = new GeneralDetails();
    public deckLabel : string  = '';
    public scenarios : Array<RoadSignScenario> = []
}

export class TrailMaking {
    public general : GeneralDetails = new GeneralDetails();
    public trailA : Array<string> = [];
    public trailB : Array<string> = [];
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
