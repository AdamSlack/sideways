import { Component, OnInit } from '@angular/core';
import { LocalisationService } from '../services/localisation.service';

@Component({
  selector: 'app-localisation-creator',
  templateUrl: './localisation-creator.component.html',
  styleUrls: ['./localisation-creator.component.scss']
})
export class LocalisationCreatorComponent implements OnInit {

  constructor(public locale : LocalisationService) { }

  ngOnInit() {
    console.log('Preset Name:' + this.locale.localePreset.name + '!');
    this.locale.localePreset.name = 'TEST';
    console.log('Preset Name:' + this.locale.localePreset.name + '!');    
  }

}
