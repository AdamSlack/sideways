import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDirectionsTestComponent } from './car-directions-test.component';

describe('CarDirectionsTestComponent', () => {
  let component: CarDirectionsTestComponent;
  let fixture: ComponentFixture<CarDirectionsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDirectionsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDirectionsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
