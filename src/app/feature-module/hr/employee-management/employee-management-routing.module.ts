import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { EmpManagementRecordComponent } from './emp-management-record/emp-management-record.component';
import { EmpDirectoryComponent } from './emp-directory/emp-directory.component';
import { EmpDocumentComponent } from './emp-document/emp-document.component';
import { EmployeeManagementComponent } from './employee-management.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeManagementComponent,
    children:[

  { path:'management', component: ManagementComponent },
  { path:'emp-record', component: EmpManagementRecordComponent },
  { path:'emp-directory', component: EmpDirectoryComponent },
  { path:'emp-document', component: EmpDocumentComponent },
]

}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }
