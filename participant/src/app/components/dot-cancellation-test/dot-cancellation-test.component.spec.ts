import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotCancellationTestComponent } from './dot-cancellation-test.component';

describe('DotCancellationTestComponent', () => {
  let component: DotCancellationTestComponent;
  let fixture: ComponentFixture<DotCancellationTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotCancellationTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotCancellationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
