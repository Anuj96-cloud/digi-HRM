import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollReportingComponent } from './payroll-reporting.component';

describe('PayrollReportingComponent', () => {
  let component: PayrollReportingComponent;
  let fixture: ComponentFixture<PayrollReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollReportingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayrollReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
