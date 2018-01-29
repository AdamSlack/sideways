import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadScenariosTestComponent } from './road-scenarios-test.component';

describe('RoadScenariosTestComponent', () => {
  let component: RoadScenariosTestComponent;
  let fixture: ComponentFixture<RoadScenariosTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadScenariosTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadScenariosTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
