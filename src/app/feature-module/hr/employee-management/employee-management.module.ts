import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
 import { EmployeeManagementComponent } from './employee-management.component';
import { EmpDirectoryComponent } from './emp-directory/emp-directory.component';
import { EmpDocumentComponent } from './emp-document/emp-document.component';
import { EmpManagementRecordComponent } from './emp-management-record/emp-management-record.component';
import { ManagementComponent } from './management/management.component';
import { SharedModule } from 'src/app/shared/shared.module';
 

@NgModule({
  declarations: [
    EmployeeManagementComponent,
    ManagementComponent,
    EmpManagementRecordComponent,
    EmpDirectoryComponent,
    EmpDocumentComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    SharedModule
  ]
})
export class EmployeeManagementModule { }
