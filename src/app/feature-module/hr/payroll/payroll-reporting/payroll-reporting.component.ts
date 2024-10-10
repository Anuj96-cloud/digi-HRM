import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { routes } from 'src/app/core/core.index';


interface PayrollReport {
  employee: string;
  department: string;
  totalPayroll: number;
  totalDeductions: number;
  netPay: number;
  date: string;
}
@Component({
  selector: 'app-payroll-reporting',
  templateUrl: './payroll-reporting.component.html',
  styleUrl: './payroll-reporting.component.scss'
})
export class PayrollReportingComponent {
  public routes = routes;
  reportFilterForm: FormGroup;
  editReportForm: FormGroup;
  filteredReports: PayrollReport[] = [];
  editMode: boolean = false;
  editIndex: number | null = null;

  // Mock data
  reports: PayrollReport[] = [
    { employee: 'John Doe', department: 'HR', totalPayroll: 5000, totalDeductions: 500, netPay: 4500, date: '2024-09-10' },
    { employee: 'Jane Smith', department: 'Engineering', totalPayroll: 6000, totalDeductions: 600, netPay: 5400, date: '2024-09-11' },
    // Additional mock data
  ];

  departments: string[] = ['HR', 'Engineering', 'Sales', 'Marketing'];
  employees: string[] = ['John Doe', 'Jane Smith', 'Bill Gates', 'Elon Musk'];

  constructor(private fb: FormBuilder) {
    // Initialize the filter form
    this.reportFilterForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      department: [''],
      employee: [''],
    });

    // Initialize the edit form
    this.editReportForm = this.fb.group({
      employee: ['', Validators.required],
      department: ['', Validators.required],
      totalPayroll: ['', [Validators.required, Validators.min(0)]],
      totalDeductions: ['', [Validators.required, Validators.min(0)]],
      netPay: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.filteredReports = this.reports; // Show all reports initially
  }

  // Filter Reports based on the form inputs
  filterReports() {
    const { startDate, endDate, department, employee } = this.reportFilterForm.value;
    this.filteredReports = this.reports.filter(report => {
      const withinDateRange = new Date(report.date) >= new Date(startDate) && new Date(report.date) <= new Date(endDate);
      const matchesDept = department ? report.department === department : true;
      const matchesEmp = employee ? report.employee === employee : true;
      return withinDateRange && matchesDept && matchesEmp;
    });
  }

  // Open Edit Modal
  openEditModal(report: PayrollReport, index: number) {
    this.editMode = true;
    this.editIndex = index;
    this.editReportForm.patchValue(report); // Load the selected report data into the form
  }

  // Save Report Changes
  saveReportChanges() {
    if (this.editReportForm.valid && this.editIndex !== null) {
      this.filteredReports[this.editIndex] = this.editReportForm.value;
      this.closeEditModal();
    }
  }

  // Close Edit Modal
  closeEditModal() {
    this.editMode = false;
    this.editIndex = null;
    this.editReportForm.reset(); // Clear the form
  }

  // Delete Report
  deleteReport(index: number) {
    this.filteredReports.splice(index, 1);
  }

  // Export functionality (placeholders for actual logic)
  exportToPDF() {
    // Logic for exporting to PDF
    alert('Export to PDF functionality coming soon!');
  }

  exportToExcel() {
    // Logic for exporting to Excel
    alert('Export to Excel functionality coming soon!');
  }


  // deleteReport(report: PayrollReport) {
  //   this.filteredReports = this.filteredReports.filter(r => r !== report);
  // }

  // Generate Charts
  generateCharts() {
    // Payroll Chart
    const payrollChartCtx = document.getElementById('payrollChart') as HTMLCanvasElement;
    new Chart(payrollChartCtx, {
      type: 'bar',
      data: {
        labels: this.reports.map(report => report.employee),
        datasets: [
          {
            label: 'Total Payroll',
            data: this.reports.map(report => report.totalPayroll),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      },
    });

    // Deductions Chart
    const deductionChartCtx = document.getElementById('deductionChart') as HTMLCanvasElement;
    new Chart(deductionChartCtx, {
      type: 'pie',
      data: {
        labels: this.reports.map(report => report.employee),
        datasets: [
          {
            label: 'Total Deductions',
            data: this.reports.map(report => report.totalDeductions),
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
          },
        ],
      },
    });
  }
}
