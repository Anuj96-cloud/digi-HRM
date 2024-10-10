import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveComponent } from './leave.component';
import { LeaveDashboardComponent } from './leave-dashboard/leave-dashboard.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { AttendanceTrackComponent } from './attendance-track/attendance-track.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
  
const routes: Routes = [
  {
    path: '',
    component: LeaveComponent,
    children:[
      { path: 'leave-dashboard', component: LeaveDashboardComponent },
      { path: 'leave-request',   component: LeaveRequestComponent },
      { path: 'leave-approval',  component: LeaveApprovalComponent },
      { path: 'leave-balance',    component: LeaveReportComponent },
      { path: 'attendance-track', component: AttendanceTrackComponent },
      { path: 'attendance-report', component: AttendanceReportComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
