import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface EmployeeSalary {
  name: string;
  baseSalary: number;
  bonus: number;
}

interface EmployeeDeduction {
  name: string;
  taxes: number;
  insurance: number;
}

interface PayrollSummary {
  name: string;
  grossPay: number;
  totalDeductions: number;
}

import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-payroll-processing',
  templateUrl: './payroll-processing.component.html',
  styleUrl: './payroll-processing.component.scss'
})
export class PayrollProcessingComponent {
  public routes = routes;
  currentStep = 1;
  discrepancies = false;

  employeeSalaries: EmployeeSalary[] = [];
  employeeDeductions: EmployeeDeduction[] = [];
  payrollSummary: PayrollSummary[] = [];

  // Modals
  editSalaryModalOpen = false;
  editDeductionModalOpen = false;

  selectedEmployeeIndex: number | null = null;

  // Forms
  salaryForm: FormGroup;
  deductionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize forms
    this.salaryForm = this.fb.group({
      baseSalary: ['', [Validators.required, Validators.min(0)]],
      bonus: ['', [Validators.required, Validators.min(0)]],
    });

    this.deductionForm = this.fb.group({
      taxes: ['', [Validators.required, Validators.min(0)]],
      insurance: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Mock data for employees
    this.employeeSalaries = [
      { name: 'John Doe', baseSalary: 50000, bonus: 5000 },
      { name: 'Jane Smith', baseSalary: 60000, bonus: 4000 },
    ];

    this.employeeDeductions = [
      { name: 'John Doe', taxes: 8000, insurance: 3000 },
      { name: 'Jane Smith', taxes: 9000, insurance: 2000 },
    ];
  }

  // Modals - Salaries
  openEditSalaryModal(index: number) {
    this.selectedEmployeeIndex = index;
    const employee = this.employeeSalaries[index];
    this.salaryForm.setValue({
      baseSalary: employee.baseSalary,
      bonus: employee.bonus,
    });
    this.editSalaryModalOpen = true;
  }

  closeEditSalaryModal() {
    this.editSalaryModalOpen = false;
  }

  saveSalaryChanges() {
    if (this.selectedEmployeeIndex !== null) {
      this.employeeSalaries[this.selectedEmployeeIndex] = {
        ...this.employeeSalaries[this.selectedEmployeeIndex],
        ...this.salaryForm.value,
      };
      this.closeEditSalaryModal();
    }
  }

  deleteSalary(index: number) {
    this.employeeSalaries.splice(index, 1);
  }

  // Modals - Deductions
  openEditDeductionModal(index: number) {
    this.selectedEmployeeIndex = index;
    const deduction = this.employeeDeductions[index];
    this.deductionForm.setValue({
      taxes: deduction.taxes,
      insurance: deduction.insurance,
    });
    this.editDeductionModalOpen = true;
  }

  closeEditDeductionModal() {
    this.editDeductionModalOpen = false;
  }

  saveDeductionChanges() {
    if (this.selectedEmployeeIndex !== null) {
      this.employeeDeductions[this.selectedEmployeeIndex] = {
        ...this.employeeDeductions[this.selectedEmployeeIndex],
        ...this.deductionForm.value,
      };
      this.closeEditDeductionModal();
    }
  }

  deleteDeduction(index: number) {
    this.employeeDeductions.splice(index, 1);
  }

  // Navigation between steps
  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  finalizePayroll() {
    // Combine salary and deductions for summary
    this.payrollSummary = this.employeeSalaries.map((employee, index) => {
      const deduction = this.employeeDeductions[index];
      return {
        name: employee.name,
        grossPay: employee.baseSalary + employee.bonus,
        totalDeductions: deduction.taxes + deduction.insurance,
      };
    });
  }
}