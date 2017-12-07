import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalisationCreatorComponent } from './localisation-creator.component';

describe('LocalisationCreatorComponent', () => {
  let component: LocalisationCreatorComponent;
  let fixture: ComponentFixture<LocalisationCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalisationCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalisationCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
