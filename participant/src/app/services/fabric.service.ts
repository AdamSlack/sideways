import { Injectable } from '@angular/core';
import "fabric"
declare const fabric: any;


@Injectable()
export class FabricService {

  constructor() { }

  public generateFabricCanvas(id: string) {
    var canvas = new fabric.Canvas(id);
    return canvas;
  }

  //TODO: any to a canvas type..
  public placeBox(canvas: any) {
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
  }

}


