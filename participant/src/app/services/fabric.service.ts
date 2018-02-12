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
    canvas_fab.backgroundColor = '#ffffff';
    canvas_fab.renderAll();
    return canvas_fab;
  }

  public createBreakLine(fab: FabricService, canvas : any, x_start: number = 0, y_start: number = 0) {
    canvas.add(new fabric.Line([0, 0, canvas.width, 0], {
      left: x_start,
      top: y_start,
      stroke: 'black',
      strokeWidth: 5,
      selectable: false
    }));
  }


  public image_parser(oImg, img_length : any, canvas : any, id : any, hasReactingStyle : boolean) {

    oImg.scale(img_length).set({
      originX: 'left', 
      originY: 'top',
      centeredRotation: true,
      lockUniScaling: true,
      lockScalingY: true, 
      lockScalingX: true,
      hasControls: false,
      id: id.toString(), 
    },);

    //oImg.scaleToWidth(img_length);
    oImg.scaleToHeight(img_length);

    // Ok we have the image, can add to group/canvas
    if(oImg == undefined) {
      console.log("something went wrong createing image from asset...");
    } else {
      console.log("Adding canvas item")
    }

    var group = new fabric.Group([oImg], {
      originX: 'left', 
      originY: 'top',
      scaleY: img_length,
      scaleX: img_length,
      lockScalingY: true,
      lockScalingX: true,
      hasControls: false,
    });

    this.addInteractionObjLogic(group, canvas, id.toString() );

    if(hasReactingStyle) {    
      this.addRotatingStyle(group, canvas);
    }
    return group;
  }


  public createReactingObj(canvas: any, x: number, y: number, obj_length: number, identifer: string, type: string) {
    // create a rectangle object
    var card = new fabric.Rect({
      left: x,
      top: y,
      width: obj_length,
      height: obj_length,
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
    
    //this.addInteractionObjLogic(card, canvas, type);

    return card;
  }

public addRotatingStyle(card: any, canvas: any) {
      /* Card interaction logic */
      card.on('mousedown', function (options) {
        card.setShadow({ color: "rgba(0,0,0,0.3)", blur: 20, offsetX: 2, offsetY: 2 });
        card.animate('angle', '4', { onChange: canvas.renderAll.bind(canvas) });
      });
  
  
      card.on('mouseup', function (options) {
        card.setShadow(null);
        card.animate('angle', '0', { onChange: canvas.renderAll.bind(canvas) });
      });
}

public addInteractionObjLogic(card: any, canvas: any, type: any) {

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
        // if (target.type !== type) {
        //   console.log("Same type interaction: ", target.type, type);
        //   return;
        // }
  
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

        function get_distance_points(x1, y1, x2,y2){
          var dx = x2-x1;
          var dy = y2-y1;
          return Math.sqrt(dx*dx+dy*dy);
        }

        //Have effect on each item
        canvas.forEachObject(function (obj) {
          if (obj === options.target) return;

          if (options.target.intersectsWithObject(obj)) {
            //Top left corner to top left corner
            let coliding = obj;
            coliding. setCoords();
            
            // console.log("interacting corner: ", coliding.top, coliding.left);
            // console.log("From corner: ", coliding.top, target.left);
            let distance = get_distance_points(coliding.top , coliding.left, target.top, target.left);
            //obj.distance = distance;
            // console.log("Interacting block distance: ", distance);
            // console.log("Needs to be less than: ", target.width/2);

            if(distance < target.width/2) {
              obj.set('opacity', 0.5);
              // console.log(distance);
              obj.set( {fill: '#d3d3d3'});
            } else {
              obj.set('opacity', 1); 
              obj.set( {fill: '#ffffff'});
            }
          } else {
            obj.set('opacity', 1); 
            obj.set( {fill: '#ffffff'})
          }

          //TODO: Time then change again
        });

      }  
}

public get_distance_points(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

  public createGridBaseSquares(xPos: number, yPos: number, canvas: any, side_length: number, squares: number, padding : number) {

    var square_length = (side_length ) / squares;

    var start_x = 0;
    var start_y = 0;
    
    var squareSet = [];
    var id = 0; //All grid parts are id 0, ..., Squares. This to map nicely to a enum and therefore see specfic test enum for id tranlation.
    while (start_y < side_length) {
      while (start_x < side_length) {
        var rect = new fabric.Rect({
          left: xPos + start_x,
          top: yPos + start_y,
          width: square_length - padding,
          height: square_length - padding,
          selectable: false,
          id: id++,
          fill: '#ffffff',
          stroke: 'black',
          strokeWidth: 4
        });
        
        rect.type = "square"

        squareSet.push(rect);
        start_x += square_length ;
        console.log("created square", rect.id);
        canvas.add(rect);
      }
      start_x = 0;
      start_y += square_length;

    }

    return squareSet;
  }


  public addIdentifyingImages(canvas: any, xPos: number, yPos: number, compass_length: number) {

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
  public drawArrow(canvas: any, girth: number, fromx: number, fromy: number, tox: number, toy: number) {

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
      fill: 'black',
      stroke: 'black',
      opacity: 1,
      strokeWidth: girth,
      originX: 'left',
      originY: 'top',
      selectable: false
    });

    canvas.add(pline);

    canvas.renderAll();
  }

}


