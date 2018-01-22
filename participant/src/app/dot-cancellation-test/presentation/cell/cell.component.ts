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
  
  @Input('dotOneXValue')
  public dotOneXValue=0; 

  @Input('dotOneYValue')
  public dotOneYValue=0; 
  
  @Input('dotTwoXValue')
  public dotTwoXValue=0; 
 
  @Input('dotTwoYValue')
  public dotTwoYValue=0; 
  
  @Input('dotThreeXValue')
  public dotThreeXValue=0;  

  @Input('dotThreeYValue')
  public dotThreeYValue=0; 
  
  @Input('dotFourXValue')
  public dotFourXValue=0;  

  @Input('dotFourYValue')
  public dotFourYValue=0; 
  
   @Input('dotFiveXValue')
  public dotFiveXValue=0;  

  @Input('dotFiveYValue')
  public dotFiveYValue=0; 
  
  
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
