import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { PayrollItemsComponent } from './payroll-items/payroll-items.component';
import { PayrollComponent } from './payroll.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { PayrollDashboardComponent } from './payroll-dashboard/payroll-dashboard.component';
import { PayrollConfigurationComponent } from './payroll-configuration/payroll-configuration.component';
import { PayrollProcessingComponent } from './payroll-processing/payroll-processing.component';
import { PayrollReportingComponent } from './payroll-reporting/payroll-reporting.component';

const routes: Routes = [
  { 
    path: '', 
    component: PayrollComponent,
    children: [ 
      { path: "payroll-dashboard", component: PayrollDashboardComponent },
      { path: "employee-salary", component: EmployeeSalaryComponent },
      { path: "payroll-items", component: PayrollItemsComponent },
      { path: "salary-view", component: SalaryViewComponent },
      { path: "payroll-config", component: PayrollConfigurationComponent },
      { path: "payroll-process", component: PayrollProcessingComponent },
      { path: "payroll-report", component: PayrollReportingComponent },

    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
