import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../modules/emoloyee';
import { routes } from 'src/app/core/core.index';
 
@Component({
  selector: 'app-emp-directory',
  templateUrl: './emp-directory.component.html',
  styleUrl: './emp-directory.component.scss'
})
export class EmpDirectoryComponent {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  employeeForm!: FormGroup;
  showModal: boolean = false;
  isEditMode: boolean = false;
  searchText: string = '';
  sortField: string = 'firstName';
  selectedEmployee: Employee | null = null;
  public routes = routes;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEmployees();
    this.applyFilter();
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  loadEmployees() {
    this.employees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        jobTitle: 'CEO',
        department: 'Management',
        employmentHistory: [],
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        jobTitle: 'CTO',
        department: 'Technology',
        employmentHistory: [],
      },
    ];
    this.filteredEmployees = [...this.employees];
  }

  openModal(mode: 'add' | 'edit', employee?: Employee) {
    this.showModal = true;
    this.isEditMode = mode === 'edit';
    if (this.isEditMode && employee) {
      this.selectedEmployee = employee;
      this.employeeForm.patchValue(employee);
    } else {
      this.selectedEmployee = null;
      this.employeeForm.reset();
    }
  }

  closeModal() {
    this.showModal = false;
  }

  addEmployee() {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = {
        id: this.employees.length + 1,
        ...this.employeeForm.value,
        employmentHistory: [],
      };
      this.employees.push(newEmployee);
      this.applyFilter();
      this.closeModal();
    }
  }

  updateEmployee() {
    if (this.employeeForm.valid && this.selectedEmployee) {
      Object.assign(this.selectedEmployee, this.employeeForm.value);
      this.applyFilter();
      this.closeModal();
    }
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    this.applyFilter();
  }

  applyFilter() {
    this.filteredEmployees = this.employees.filter((employee) =>
      (employee.firstName + ' ' + employee.lastName)
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
    this.sortEmployees();
  }

  sortEmployees() {
    this.filteredEmployees.sort((a, b) => {
      switch (this.sortField) {
        case 'firstName':
          return a.firstName.localeCompare(b.firstName);
        case 'lastName':
          return a.lastName.localeCompare(b.lastName);
        case 'jobTitle':
          return a.jobTitle.localeCompare(b.jobTitle);
        case 'department':
          return a.department.localeCompare(b.department);
        default:
          return 0; 
      }
    });
  }
  
}
