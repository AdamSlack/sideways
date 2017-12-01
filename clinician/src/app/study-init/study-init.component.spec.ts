import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyInitComponent } from './study-init.component';

describe('StudyInitComponent', () => {
  let component: StudyInitComponent;
  let fixture: ComponentFixture<StudyInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
