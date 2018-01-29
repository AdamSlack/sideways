import { Component, Input  } from '@angular/core';


@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
 
  @Input()
  state: string; 
  
  @Input('dotOne')
  dotOne: string;
  
  @Input('dotOneX')
  dotOneX: number;
  
  @Input('dotOneY')
  dotOneY: number;
  
  
  @Input('dotTwo')
  dotTwo: string;
  
  @Input('dotThree')
  dotThree: string;
  
  @Input('dotFour')
  dotFour: string;
  
  
  public myColor= "blue";
  
  randomcolor = "red";
  
  @Input('dotFive')
  dotFive: string;
  
  @Input('Fontcolor') 
  Fontcolor: string;
  
  @Input('hold') 
  hold: string;
  
  doRed()
  {
   document.getElementById("p2").style.color = "green";
  }
}
