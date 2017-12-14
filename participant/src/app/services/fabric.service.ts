import { Injectable } from '@angular/core';
import { deprecate } from 'util';
import "fabric"
import { startTimeRange } from '@angular/core/src/profile/wtf_impl';
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
    let canvas = new fabric.Canvas(id);
    return canvas;
  }

  public createReactingObj(canvas: any, x: number, y: number, identifer: string) {
      // create a rectangle object
      var card = new fabric.Rect({
        left: x, 
        top: y, 
        width: 60, 
        height: 60, 
        fill: '#ffb366', 
        originX: 'left', 
        originY: 'top',
        centeredRotation: true,
        lockUniScaling: true,
        lockScalingY: true, 
        lockScalingX: true,       
        id: identifer,
      });

      card.type = "card"
      /* Card interaction logic */
      card.on('mousedown', function(options) {
        card.setShadow({ color:"rgba(0,0,0,0.3)",blur:20,offsetX:2,offsetY:2 });            
        card.animate('angle', '4', { onChange: canvas.renderAll.bind(canvas) });    
      });

      card.on('mouseup', function(options) {
        card.setShadow(null);
        card.animate('angle', '0', { onChange: canvas.renderAll.bind(canvas) });  
      });


      //Intesection colissions ....
      canvas.on({
        'object:moving': onChange,
        'object:scaling': onChange,
        'object:rotating': onChange,
      });

      function onChange(options) {
        options.target.setCoords();
        canvas.forEachObject(function(obj) {
          if (obj === options.target) return;
          obj.set('opacity' ,options.target.intersectsWithObject(obj) ? 0.5 : 1);
        });
      }

      return card;
  }

  public createGridBaseLines(canvas: any, gridSize: number) {
    this.box_length = canvas.width / gridSize;
    for (var i = 0; i < (canvas.width / this.box_length); ++i) {
      canvas.add(new fabric.Line([ i * this.box_length, 0, i * this.box_length, canvas.width], { stroke: '#ccc', selectable: false }));
      canvas.add(new fabric.Line([ 0, i * this.box_length, canvas.height, i * this.box_length], { stroke: '#ccc', selectable: false }))
    }
  }


  public createGridBaseSquares(canvas: any, side_length: number, squares: number) {

    var square_length = side_length / squares; 
    console.log(square_length);
    var start_x = 0;
    var start_y = 0;

    var squareSet = [];
    var id = 0; //All grid parts are id 0, ..., Squares. This to map nicely to a enum and therefore see specfic test enum for id tranlation.
    while(start_y < side_length) {
      while(start_x < side_length) {
        var rect = new fabric.Rect({
          left: start_x, 
          top: start_y, 
          width: square_length,
          height: square_length,
          selectable: false,
          id: id++,
          fill: '#99ccff'
        });
        squareSet.push(rect);
        start_x += square_length;
        console.log("created square",rect.id);
        canvas.add(rect); 
      }
      start_x = 0;
      start_y += square_length;
    }

    return squareSet;
  }

  public addCompassImages(canvas: any, compass_length: number) {
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
          left: 0 + (compass_length/2) + (compass_length * (i+1)),
          top: 0 + (compass_length/2),
          originX: 'center', 
          originY: 'center',
          selectable: false
        });
        console.log(obj.rotate);
        obj.rotate(rotate);
        rotate += increment_rotation;
        obj.scaleToWidth(compass_length);
        canvas.add(obj).renderAll();
      });
    })

    rotate = 0;
    times (4) (i => {
      fabric.loadSVGFromURL(compass_url, (objects, options) => {
        var obj = fabric.util.groupSVGElements(objects, {
          left: 0 + (compass_length/2),
          top: 0 + ((compass_length/2)  + (compass_length * (i+1))),
          originX: 'center', 
          originY: 'center',
          selectable: false
        });
        obj.rotate(rotate);
        rotate += increment_rotation;
        obj.scaleToWidth(compass_length);
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


