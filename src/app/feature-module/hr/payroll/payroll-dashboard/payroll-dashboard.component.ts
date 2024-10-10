import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/core.index';
export interface Payroll {
  id: number;
  totalPayroll: number;
  payrollDate: Date;
  status: string;  // pending, processed, etc.
}
@Component({
  selector: 'app-payroll-dashboard',
  templateUrl: './payroll-dashboard.component.html',
  styleUrl: './payroll-dashboard.component.scss'
})
export class PayrollDashboardComponent {
  payrollConfigForm!: FormGroup;
  activeTab: string = 'dashboard';
  payrolls: Payroll[] = [];
  payrollForm!: FormGroup;
  showModal: boolean = false;
  isEditMode: boolean = false;
  selectedPayroll: Payroll | null = null;
  filteredPayrolls: Payroll[] = [];
  filterStatus: string = '';
  public routes = routes;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadPayrolls();
  }

  initializeForm() {
    this.payrollForm = this.fb.group({
      totalPayroll: ['', Validators.required],
      payrollDate: ['', Validators.required],
    });
  }
  saveConfig() {
    if (this.payrollConfigForm.valid) {
      // Save the configuration
      console.log('Configuration Saved', this.payrollConfigForm.value);
    }
  }
  applyFilter() {
    if (this.filterStatus) {
      this.filteredPayrolls = this.payrolls.filter((payroll) => payroll.status === this.filterStatus);
    } else {
      this.filteredPayrolls = this.payrolls;
    }
  }
  loadPayrolls() {
    this.payrolls = [
      { id: 1, totalPayroll: 50000, payrollDate: new Date(), status: 'Pending' },
      { id: 2, totalPayroll: 45000, payrollDate: new Date('2023-11-10'), status: 'Processed' },
    ];
  }

  openModal(mode: 'add' | 'edit', payroll?: Payroll) {
    this.showModal = true;
    this.isEditMode = mode === 'edit';
    if (this.isEditMode && payroll) {
      this.selectedPayroll = payroll;
      this.payrollForm.patchValue({ totalPayroll: payroll.totalPayroll, payrollDate: payroll.payrollDate });
    } else {
      this.selectedPayroll = null;
      this.payrollForm.reset();
    }
  }

  closeModal() {
    this.showModal = false;
  }

  addPayroll() {
    if (this.payrollForm.valid) {
      const newPayroll: Payroll = {
        id: this.payrolls.length + 1,
        totalPayroll: this.payrollForm.value.totalPayroll,
        payrollDate: new Date(this.payrollForm.value.payrollDate),
        status: 'Pending',
      };
      this.payrolls.push(newPayroll);
      this.closeModal();
    }
  }

  updatePayroll() {
    if (this.payrollForm.valid && this.selectedPayroll) {
      this.selectedPayroll.totalPayroll = this.payrollForm.value.totalPayroll;
      this.selectedPayroll.payrollDate = new Date(this.payrollForm.value.payrollDate);
      this.selectedPayroll.status = 'Pending';
      this.closeModal();
    }
  }

  deletePayroll(id: number) {
    this.payrolls = this.payrolls.filter((payroll) => payroll.id !== id);
  }

  calculateTotalPayroll(): number {
    return this.payrolls.reduce((acc, payroll) => acc + payroll.totalPayroll, 0);
  }

  getUpcomingPayroll(): Date | null {
    const futurePayrolls = this.payrolls.filter((payroll) => new Date(payroll.payrollDate) > new Date());
    return futurePayrolls.length > 0 ? futurePayrolls[0].payrollDate : null;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
