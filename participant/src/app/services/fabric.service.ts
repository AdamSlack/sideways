import { Injectable } from '@angular/core';
import "fabric"
import { deprecate } from 'util';
declare const fabric: any;

/*
  Note: would be singleton service
  TODO: any to a canvas type..
*/
@Injectable()
export class FabricService {

  box_length: number;

  constructor() { }

  public generateFabricCanvas(id: string) {
    var canvas = new fabric.Canvas(id);
    return canvas;
  }

  public createInteractableCard(canvas: any, x: number, y: number) {
      // create a rectangle object
      var rect = new fabric.Rect({
        left: x, 
        top: y, 
        width: 50, 
        height: 50, 
        fill: '#faa', 
        originX: 'left', 
        originY: 'top',
        centeredRotation: true
      });

      canvas.on('mouse:down', function(options) {
        if (options.target) {
          console.log('an object was clicked! ', options.target.type);
          if (options.target.type == rect.type) {
            rect.animate('angle', '+=5', { onChange: canvas.renderAll.bind(canvas) });        
          }
        }
      });

      canvas.on('mouse:up', function(options) {
        if (options.target) {
          console.log('an object was clicked! ', options.target.type);
          if (options.target.type == rect.type) {
            rect.animate('angle', '-=5', { onChange: canvas.renderAll.bind(canvas) });        
          }
        }
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

  public addCompassImage(canvas: any) {
    // fabric.Image.loadSVGFromURL('../assets/compass_north.svg', function(oImg) {
    //   oImg.width = this.box_length
      
    //   oImg.height = this.box_length;
    //   canvas.add(oImg);
    // });
    var compass_url = '../assets/compass_north.svg';

    var group = [];
    var rotate = 0;
    var increment_rotation = 45;

    //Top row

    //Just messing... es6
    // let times=(n,f)=>{while(n-->0)f();}
    // times (3, console.log('times repeat'));
    const times = n => f => {
      let iter = i => {
        if (i === n) return
        f (i)
        iter (i + 1)
      }
      return iter (0)
    }
    
    times (4) (i => {
      fabric.loadSVGFromURL(compass_url, (objects, options) => {
        var obj = fabric.util.groupSVGElements(objects, {
          left: 0 + (this.box_length/2) + (this.box_length * (i+1)),
          top: 0 + (this.box_length/2),
          originX: 'center', 
          originY: 'center',
          selectable: false
        });
        console.log(obj.rotate);
        obj.rotate(rotate);
        rotate += increment_rotation;
        obj.scaleToWidth(this.box_length);
        canvas.add(obj).renderAll();
        
      });
    })

    rotate = 0;
    times (4) (i => {
      fabric.loadSVGFromURL(compass_url, (objects, options) => {
        var obj = fabric.util.groupSVGElements(objects, {
          left: 0 + (this.box_length/2),
          top: 0 + ((this.box_length/2)  + (this.box_length * (i+1))),
          originX: 'center', 
          originY: 'center',
          selectable: false
        });
        obj.rotate(rotate);
        rotate += increment_rotation;
        obj.scaleToWidth(this.box_length);
        canvas.add(obj).renderAll();
      });
    })

  }

  /*
  @deprecate why even even activate snapping though?
  */
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
      });
    }
  }

}


