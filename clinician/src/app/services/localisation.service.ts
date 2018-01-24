import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { post } from 'selenium-webdriver/http';

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

    public ROOT : string = 'http://localhost:5000';
    
    public localePreset : LocalePreset = new LocalePreset();

    public createHeaders() : HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*')
        return headers;
      }

    public requestLocaleSetup(locale : string, localeData : LocalePreset) : Observable<any> {
        let url = this.ROOT + 'localisation/';
        let headers = this.createHeaders();
        return this.http.post(url, '');           
    }

    public addDotCancellation(localeName : string, name : string, instructions : string) {
        let url = this.ROOT + '/Localisation/' + localeName + '/1';
        let headers = this.createHeaders();
        let body = {
            Type: 'dot_cancellation',
            Name: name,
            Instructions : instructions
        };
        return this.http.post(url, body, {headers : headers});
    }

    public addCompassDirection(
        localeName : string, 
        name : string, 
        instructions : string, 
        headingsLabel : string, 
        deckLabel : string) : Observable<any> {
            return this.addMatrixTest(2, 'compass_directions', localeName, name, instructions, headingsLabel, deckLabel);
    }

    public addCarDirection(
        localeName : string, 
        name : string, 
        instructions : string, 
        headingsLabel : string, 
        deckLabel : string) : Observable<any> {
            return this.addMatrixTest(3, 'car_directions', localeName, name, instructions, headingsLabel, deckLabel);
    }

    public addRoadSignScenario(
        localeName   : string,
        name         : string,
        instructions : string,
        sceneImages  : string[],
        signImages   : string[],
        xPos         : number[],
        yPos         : number[]
    ) : Observable<any> {
        let url = this.ROOT + '/Localisation/' + localeName + '/4';
        let headers = this.createHeaders();
        let body = {
            Type : 'road_sign_scenarios',
            Name : name,
            Instructions : instructions,
            RoadSignScenarios : []
        };
        let reader = new FileReader();
        let roadSignScenarios = sceneImages.map((scene, idx) => {
            let sign = signImages[idx];
            console.log(scene);

            return{
                presetName : localeName,
                xPos : xPos[idx],
                yPos : yPos[idx],
                SceneImage : scene,
                SignImage : sign,
            }
        });
        body.RoadSignScenarios = roadSignScenarios;
        
        return this.http.post(url, body, {headers : headers});
    }

    private addMatrixTest(
        type : number, 
        typeName : string, 
        localeName : string, 
        name : string, 
        instructions : string, 
        headingsLabel : string, 
        deckLabel : string) : Observable<any> {
            let url = this.ROOT + '/Localisation/' + localeName + '/' + type.toString();
            let headers = this.createHeaders();
            let body = {
                Type: typeName,
                Name: name,
                Instructions : instructions,
                HeadingsLabel : headingsLabel,
                DeckLabel : deckLabel
            };
            return this.http.post(url, body, {headers : headers});
    }

    public addTrailMaking(
        localeName : string,
        name : string, 
        instructions : string, 
        trailA : string[], 
        trailB : string[]) : Observable<any> {
            let url = this.ROOT + '/Localisation/' + localeName + '/5';
            let headers = this.createHeaders();
            let body = {
                Type: 'trail_making',
                Name: name,
                Instructions : instructions,
                TrailA : trailA,
                TrailB : trailB
            };
            return this.http.post(url, body, {headers : headers});
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
