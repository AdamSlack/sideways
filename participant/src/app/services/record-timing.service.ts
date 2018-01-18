import { Injectable } from '@angular/core';
import { endTimeRange } from '@angular/core/src/profile/wtf_impl';

@Injectable()
export class RecordTimingService {

  public startTime : number;
  public endTime : number;

  constructor() { 
  }
  
  public recordStartTime() : number {
    this.startTime = performance.now(); 
    return this.startTime;     
  }

  public recordEndTime() : number {
    this.endTime = performance.now();
    return this.endTime;
  }

  public getTimeElapsed(inSeconds : boolean = false) : number {
    if (!this.startTime) {
      return 0
    }
    if (!this.endTime) {
      this.recordEndTime()
    }
    if (this.endTime < this.startTime) {
      this.recordEndTime()
    }
    let elapsedTime = (this.endTime - this.startTime);
    return inSeconds ? elapsedTime / 1000 : elapsedTime;
  }

  public sendTimeResults(testId: string) {
    //API CALL
    //throw err on bad call
  }
}
