import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from 'src/app/core/services/local/local.service';
import { Sort } from '@angular/material/sort';
import {
  DataService,
  apiResultFormat,
  getPolicies,
  routes,
} from 'src/app/core/core.index';
import { OnboardingService } from '../../onboarding/onboarding.service';
 
declare var bootstrap: any;
interface employee {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
 
  department: string;
}
interface Reminder {
  name: string;
  date: string;
  time: string;
}



@Component({
  selector: 'app-emp-management-record',
  templateUrl: './emp-management-record.component.html',
  styleUrl: './emp-management-record.component.scss'
})
export class EmpManagementRecordComponent {

  @ViewChild('deleteModal') deleteModal!: ElementRef;
  employeeForm!: FormGroup;
  editForm!: FormGroup;
  selectedemployeeIndex: number | null = null;
  employeeToDelete: employee | null = null;
  dataSource!: MatTableDataSource<getPolicies>;
  employees: employee[] = [];
  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  role!: number;
  //** / pagination variables
  public allemployee: Array<getPolicies> = [];
  public routes = routes;
  private onboardingService = inject(OnboardingService);

  constructor(private fb: FormBuilder, private data: DataService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
    });
    this.reminderForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  // Add new employee to the table
  addemployee() {
    if (this.employeeForm.valid) {
      const newemployee: employee = this.employeeForm.value;
      this.employees.push(newemployee);
      this.employeeForm.reset();
    }
  }

  // Populate the edit form with selected employee data
  populateEditForm(employee: employee) {
    this.editForm.patchValue(employee);
    this.selectedemployeeIndex = this.employees.indexOf(employee);
  }

  // Update the employee with new data
  updateemployee() {
    if (this.editForm.valid && this.selectedemployeeIndex !== null) {
      this.employees[this.selectedemployeeIndex] = this.editForm.value;
      this.editForm.reset();
      this.selectedemployeeIndex = null;
    }
  }
  
  
  
  
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      this.onboardingService.scheduleEmployee(employeeData).subscribe(
        (response) => {
          // this.data = response;
          console.log('employee Scheduled Successfully', response);
        },
        (error) => {
          console.error('Error scheduling employee', error);
        }
      );
    }
  }

  // Method to open edit modal and populate the form
  // public populateEditForm(document: any): void {
  //   this.selectedDocument = document;
  //   this.editEmployeeForm.patchValue({
  //     client: document.type,
  //     status: document.status,
  //     file: document.file
  //   });
  // }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
  private getTableData(): void {
    this.allemployee = [];
    this.serialNumberArray = [];

    this.data.getPolicies().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getPolicies, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.allemployee.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getPolicies>(
        this.allemployee
      );
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public sortData(sort: Sort) {
    const data = this.allemployee.slice();

     
    if (!sort.active || sort.direction === '') {
      this.allemployee = data;
    } else {
      this.allemployee = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.allemployee = this.dataSource.filteredData;
  }
  public getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }
  // Function to delete an employee
  deleteemployee(employee: employee) {
    this.employeeToDelete = employee;
  }
  confirmDelete() {
    if (this.employeeToDelete) {
      const index = this.employees.indexOf(this.employeeToDelete);
      if (index > -1) {
        this.employees.splice(index, 1);
        this.employeeToDelete = null;
      } else {
        const modelElement = this.deleteModal.nativeElement;
        const modal = bootstrap.Modal.getInstance(modelElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }
  reminderForm!: FormGroup;
  reminders: Reminder[] = [];
  employeeToEdit: Reminder | null = null;

  addReminder(): void {
    if (this.reminderForm.valid) {
      const newReminder: Reminder = this.reminderForm.value;
      this.reminders.push(newReminder);
      this.reminderForm.reset();
    }
  }

  editReminder(reminder: Reminder): void {
    this.employeeToEdit = reminder;
    this.reminderForm.patchValue(reminder);
  }

  deleteReminder(reminder: Reminder): void {
    this.reminders = this.reminders.filter((r) => r !== reminder);
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
