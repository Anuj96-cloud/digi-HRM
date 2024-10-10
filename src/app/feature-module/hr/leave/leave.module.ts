import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { AttendanceTrackComponent } from './attendance-track/attendance-track.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { LeaveDashboardComponent } from './leave-dashboard/leave-dashboard.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveComponent } from './leave.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LeaveComponent,
    LeaveDashboardComponent,
    LeaveRequestComponent,
    LeaveApprovalComponent,
    LeaveReportComponent,
    AttendanceTrackComponent,
    AttendanceReportComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    SharedModule
  ]
})
export class LeaveModule { }
