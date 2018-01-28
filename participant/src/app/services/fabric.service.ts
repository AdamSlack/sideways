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

  constructor() { }

  public generateFabricCanvas(id: string) {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");

    var context = canvas.getContext("2d");

    //initilise canvas to the size of the parent node, need to be done here as set scaling rather then streching contents

    var r = canvas.parentElement.getBoundingClientRect();
    canvas.width = r.width;
    canvas.height = r.height;

    context.fillStyle = "red";
    context.fillRect(0, 0, canvas.width, canvas.height);



    //Intialise fabricjs components
    let canvas_fab = new fabric.Canvas(id);
    canvas_fab.backgroundColor = '#C4CDE0';
    canvas_fab.renderAll();
    return canvas_fab;
  }

  public createReactingObj(canvas: any, x: number, y: number, length: number, identifer: string, type: string = "card") {
    // create a rectangle object
    var card = new fabric.Rect({
      left: x,
      top: y,
      width: length,
      height: length,
      //fill: '#ffb366', 
      originX: 'left',
      originY: 'top',
      centeredRotation: true,
      lockUniScaling: true,
      lockScalingY: true,
      lockScalingX: true,
      id: identifer,
    });

    card.colliding = "nuttin";

    card.type = type;
    /* Card interaction logic */
    card.on('mousedown', function (options) {
      card.setShadow({ color: "rgba(0,0,0,0.3)", blur: 20, offsetX: 2, offsetY: 2 });
      card.animate('angle', '4', { onChange: canvas.renderAll.bind(canvas) });
    });


    card.on('mouseup', function (options) {
      card.setShadow(null);
      card.animate('angle', '0', { onChange: canvas.renderAll.bind(canvas) });
    });


    //Intesection colissions ....
    canvas.on({
      'object:moving': onChange,
      'object:scaling': onChange,
      'object:rotating': onChange,
      //Touch:gesture
    });

    function onChange(options) {
      // if object is too big ignore
      if (options.target.currentHeight > options.target.canvas.height || options.target.currentWidth > options.target.canvas.width) {
        return;
      }

      let target = options.target;
      target.setCoords();

      //If the target card has a type of the card then bust a nut and be outie
      if (target.type == type) {
        return;
      }

      // top-left  corner
      if (target.getBoundingRect().top < 0 || target.getBoundingRect().left < 0) {
        target.top = Math.max(target.top, target.top - target.getBoundingRect().top);
        target.left = Math.max(target.left, target.left - target.getBoundingRect().left);
      }
      // bot-right corner
      if (target.getBoundingRect().top + target.getBoundingRect().height > target.canvas.height || target.getBoundingRect().left + target.getBoundingRect().width > target.canvas.width) {
        target.top = Math.min(target.top, target.canvas.height - target.getBoundingRect().height + target.top - target.getBoundingRect().top);
        target.left = Math.min(target.left, target.canvas.width - target.getBoundingRect().width + target.left - target.getBoundingRect().left);
      }

      //Have effect on each item
      canvas.forEachObject(function (obj) {
        if (obj === options.target) return;
        obj.set('opacity', options.target.intersectsWithObject(obj) ? 0.5 : 1);
      });


      

    }

    return card;
  }

  // public createGridBaseLines(canvas: any, gridSize: number) {
  //   this.box_length = canvas.width / gridSize;
  //   for (var i = 0; i < (canvas.width / this.box_length); ++i) {
  //     canvas.add(new fabric.Line([ i * this.box_length, 0, i * this.box_length, canvas.width], { stroke: '#ccc', selectable: false }));
  //     canvas.add(new fabric.Line([ 0, i * this.box_length, canvas.height, i * this.box_length], { stroke: '#ccc', selectable: false }))
  //   }
  // }


  public createGridBaseSquares(xPos: number, yPos: number, canvas: any, side_length: number, squares: number) {

    var square_length = side_length / squares;
    console.log(square_length);
    var start_x = 0;
    var start_y = 0;

    var squareSet = [];
    var id = 0; //All grid parts are id 0, ..., Squares. This to map nicely to a enum and therefore see specfic test enum for id tranlation.
    while (start_y < side_length) {
      while (start_x < side_length) {
        var rect = new fabric.Rect({
          left: xPos + start_x,
          top: yPos + start_y,
          width: square_length,
          height: square_length,
          selectable: false,
          id: id++,
          fill: '#FF69B4'
        });
        squareSet.push(rect);
        start_x += square_length;
        console.log("created square", rect.id);
        canvas.add(rect);
      }
      start_x = 0;
      start_y += square_length;
    }

    return squareSet;
  }


  public addIdentifyingImages(canvas: any, xPos: number, yPos: number, compass_length: number) {
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
        f(i)
        iter(i + 1)
      }
      return iter(0)
    }

    times(4)(i => {
      fabric.loadSVGFromURL(compass_url, (objects, options) => {
        var obj = fabric.util.groupSVGElements(objects, {
          left: xPos + (compass_length / 2) + (compass_length * (i + 1)),
          top: yPos + (compass_length / 2),
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
    times(4)(i => {
      fabric.loadSVGFromURL(compass_url, (objects, options) => {
        var obj = fabric.util.groupSVGElements(objects, {
          left: xPos + (compass_length / 2),
          top: yPos + ((compass_length / 2) + (compass_length * (i + 1))),
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
  Fabric draw arrow function
  https://stackoverflow.com/questions/31238010/arrows-in-fabricjs
  
  */
  public drawArrow(canvas: any, fromx: number, fromy: number, tox: number, toy: number) {

    var angle = Math.atan2(toy - fromy, tox - fromx);

    var headlen = 15;  // arrow head size

    // bring the line end back some to account for arrow head.
    tox = tox - (headlen) * Math.cos(angle);
    toy = toy - (headlen) * Math.sin(angle);

    // calculate the points.
    var points = [
      {
        x: fromx,  // start point
        y: fromy
      }, {
        x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
      }, {
        x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
      }, {
        x: tox - (headlen) * Math.cos(angle - Math.PI / 2),
        y: toy - (headlen) * Math.sin(angle - Math.PI / 2)
      }, {
        x: tox + (headlen) * Math.cos(angle),  // tip
        y: toy + (headlen) * Math.sin(angle)
      }, {
        x: tox - (headlen) * Math.cos(angle + Math.PI / 2),
        y: toy - (headlen) * Math.sin(angle + Math.PI / 2)
      }, {
        x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
      }, {
        x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
      }, {
        x: fromx,
        y: fromy
      }
    ];

    var pline = new fabric.Polyline(points, {
      fill: 'white',
      stroke: 'black',
      opacity: 1,
      strokeWidth: 2,
      originX: 'left',
      originY: 'top',
      selectable: true
    });

    canvas.add(pline);

    canvas.renderAll();
  }

  /*
  @deprecate why even even activate snapping though?
  */
  // public activateSnapping(canvas: any) {
  //   if (typeof this.box_length === "undefined") {
  //     console.log('Have not initilaised box_length');      
  //   } else {
  //     console.log('locking enabled');
  //     canvas.on('object:moving', function(options) { 
  //       options.target.set({
  //         left: Math.round(options.target.left / this.box_length) * this.box_length,
  //         top: Math.round(options.target.top / this.box_length) * this.box_length
  //       });
  //     });
  //   }
  // }

}


