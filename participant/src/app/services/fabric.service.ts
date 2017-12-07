import { Injectable } from '@angular/core';
import "fabric"
declare const fabric: any;


@Injectable()
export class FabricService {

  box_length: number;

  constructor() { }

  public generateFabricCanvas(id: string) {
    var canvas = new fabric.Canvas(id);
    return canvas;
  }

  //TODO: any to a canvas type..
  public createCard(canvas: any, x: number, y: number) {
      // create a rectangle object
      var rect = new fabric.Rect({
        // left: x,
        // top: y,
        // fill: 'red',
        // width: this.box_length,
        // height: this.box_length,
        // originX: 'left', 
        // originY: 'top',
        // centeredRotation: true
        left: 100, 
        top: 100, 
        width: 50, 
        height: 50, 
        fill: '#faa', 
        originX: 'left', 
        originY: 'top',
        centeredRotation: true
      });
      // "add" rectangle onto canvas
      canvas.add(rect);
  }

  public createGridBase(canvas: any, gridSize: number) {

    this.box_length = canvas.width / gridSize;

    for (var i = 0; i < (canvas.width / this.box_length); ++i) {
      canvas.add(new fabric.Line([ i * this.box_length, 0, i * this.box_length, canvas.width], { stroke: '#ccc', selectable: false }));
      canvas.add(new fabric.Line([ 0, i * this.box_length, canvas.height, i * this.box_length], { stroke: '#ccc', selectable: false }))
    }
  }

  public activateSnapping(canvas: any) {
    if (typeof this.box_length === "undefined") {
      console.log('Have not initilaised box_length');      
    } else {
      console.log('locking enabled');
      canvas.on('object:moving', function(options) { 
        options.target.set({
          left: Math.round(options.target.left / this.box_length) * this.box_length,
          top: Math.round(options.target.top / this.box_length) * this.box_length
        });
      });z
    }
  }

}


