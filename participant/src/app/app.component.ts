import { Component } from '@angular/core';
import { test_game_routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stroke Driving Test Assessment';
  game_routes =test_game_routes; 
}

