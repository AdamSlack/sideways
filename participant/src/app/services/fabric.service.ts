import { Injectable } from '@angular/core';
import "fabric"
declare const fabric: any;


@Injectable()
export class FabricService {

  constructor() { }

  public generateFabricCanvas() {
    var canvas = new fabric.Canvas('c');
    
    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });
    
    // "add" rectangle onto canvas
    canvas.add(rect);
    return canvas;
  }

}


