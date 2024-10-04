import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDirectoryComponent } from './emp-directory.component';

describe('EmpDirectoryComponent', () => {
  let component: EmpDirectoryComponent;
  let fixture: ComponentFixture<EmpDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpDirectoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
