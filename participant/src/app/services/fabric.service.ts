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

  public createGridBase(canvas: any, gridSize: number) {

    var box_length = canvas.width / gridSize;

    for (var i = 0; i < (canvas.width / box_length); ++i) {
      canvas.add(new fabric.Line([ i * box_length, 0, i * box_length, canvas.width], { stroke: '#ccc', selectable: false }));
      canvas.add(new fabric.Line([ 0, i * box_length, canvas.height, i * box_length], { stroke: '#ccc', selectable: false }))
    }
  }

}


