import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { PayrollItemsComponent } from './payroll-items/payroll-items.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PayrollDashboardComponent } from './payroll-dashboard/payroll-dashboard.component';
import { PayrollConfigurationComponent } from './payroll-configuration/payroll-configuration.component';
import { PayrollProcessingComponent } from './payroll-processing/payroll-processing.component';
import { PayrollReportingComponent } from './payroll-reporting/payroll-reporting.component';


@NgModule({
  declarations: [
    PayrollDashboardComponent,
    PayrollConfigurationComponent,
    PayrollProcessingComponent,
    PayrollReportingComponent,
    PayrollComponent,
    EmployeeSalaryComponent,
    PayrollItemsComponent,
    SalaryViewComponent
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    SharedModule
  ]
})
export class PayrollModule { }
