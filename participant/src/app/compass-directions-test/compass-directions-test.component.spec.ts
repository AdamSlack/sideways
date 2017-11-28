import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassDirectionsTestComponent } from './compass-directions-test.component';

describe('CompassDirectionsTestComponent', () => {
  let component: CompassDirectionsTestComponent;
  let fixture: ComponentFixture<CompassDirectionsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompassDirectionsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompassDirectionsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
