import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpManagementRecordComponent } from './emp-management-record.component';

describe('EmpManagementRecordComponent', () => {
  let component: EmpManagementRecordComponent;
  let fixture: ComponentFixture<EmpManagementRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpManagementRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpManagementRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
