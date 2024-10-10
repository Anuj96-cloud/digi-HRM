import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTrackComponent } from './attendance-track.component';

describe('AttendanceTrackComponent', () => {
  let component: AttendanceTrackComponent;
  let fixture: ComponentFixture<AttendanceTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceTrackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
