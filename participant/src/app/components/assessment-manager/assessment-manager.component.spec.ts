import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentManagerComponent } from './assessment-manager.component';

describe('AssessmentManagerComponent', () => {
  let component: AssessmentManagerComponent;
  let fixture: ComponentFixture<AssessmentManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
