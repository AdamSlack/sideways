import { Component } from '@angular/core';
import { test_game_routes } from './app-routing.module';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth : AuthenticationService) {}
  title = 'Stroke Driving Test Assessment';
  game_routes =test_game_routes; 
}

