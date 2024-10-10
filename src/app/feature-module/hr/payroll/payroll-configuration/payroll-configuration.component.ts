import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/core.index';

interface PayrollConfig {
  baseSalary: number;
  bonus: number;
  taxes: number;
  insurance: number;
  benefits: string;
  payCycle: string;
}

@Component({
  selector: 'app-payroll-configuration',
  templateUrl: './payroll-configuration.component.html',
  styleUrl: './payroll-configuration.component.scss'
})
export class PayrollConfigurationComponent {
  public routes = routes;
  payrollConfigForm!: FormGroup;
  payrollConfigs: PayrollConfig[] = [];
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.payrollConfigForm = this.fb.group({
      baseSalary: [null, [Validators.required, Validators.min(0)]],
      bonus: [null, Validators.min(0)],
      taxes: [null, Validators.min(0)],
      insurance: [null, Validators.min(0)],
      benefits: ['', Validators.required],
      payCycle: ['monthly', Validators.required],
    });
  }

  onSubmit() {
    if (this.payrollConfigForm.valid) {
      const formValue = this.payrollConfigForm.value;

      if (this.editIndex !== null) {
        // Update existing payroll config
        this.payrollConfigs[this.editIndex] = formValue;
        this.editIndex = null;
      } else {
        // Add new payroll config
        this.payrollConfigs.push(formValue);
      }

      this.payrollConfigForm.reset({
        payCycle: 'monthly',
      });
    }
  }

  editConfig(index: number) {
    this.editIndex = index;
    this.payrollConfigForm.patchValue(this.payrollConfigs[index]);
  }

  deleteConfig(index: number) {
    this.payrollConfigs.splice(index, 1);
  }

}
