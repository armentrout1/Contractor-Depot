import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateHeaderComponent } from './estimate-header.component';

describe('EstimateHeaderComponent', () => {
  let component: EstimateHeaderComponent;
  let fixture: ComponentFixture<EstimateHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EstimateHeaderComponent]
    });
    fixture = TestBed.createComponent(EstimateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
