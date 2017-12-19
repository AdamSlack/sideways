import { Injectable } from '@angular/core';
import { endTimeRange } from '@angular/core/src/profile/wtf_impl';

@Injectable()
export class RecordTimingService {

  public startTime : number;
  public endTime : number;

  constructor() { 
  }
  
  public recordStartTime() {
    this.startTime = performance.now(); 
    return this.startTime;     
  }

  public completeTime() {
    this.endTime = performance.now();
    console.log("StartTime:", this.startTime, "EndTime:", this.endTime);
    return (this.startTime - this.endTime);
  }

  public sendTimeResults(testId: string) {
    //API CALL
    //throw err on bad call
  }
}
