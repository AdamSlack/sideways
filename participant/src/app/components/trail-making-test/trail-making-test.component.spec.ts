import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailMakingTestComponent } from './trail-making-test.component';
import { AssetRetrievalService } from '../../services/asset-retrieval.service';

describe('TrailMakingTestComponent', () => {
  let component: TrailMakingTestComponent;
  let fixture: ComponentFixture<TrailMakingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailMakingTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailMakingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
