import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateFooterComponent } from './estimate-footer.component';

describe('EstimateFooterComponent', () => {
  let component: EstimateFooterComponent;
  let fixture: ComponentFixture<EstimateFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EstimateFooterComponent]
    });
    fixture = TestBed.createComponent(EstimateFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
