import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateTableComponent } from './estimate-table.component';

describe('EstimateTableComponent', () => {
  let component: EstimateTableComponent;
  let fixture: ComponentFixture<EstimateTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EstimateTableComponent]
    });
    fixture = TestBed.createComponent(EstimateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
